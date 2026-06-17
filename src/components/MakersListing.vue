<script setup lang="ts">
/**
 * Makers listing island — search + specialty filters + ID card grid.
 * Renders the full ID-card markup in the Vue template so that
 * client-side filtering works seamlessly.
 */

import { ref, computed } from "vue";
import type { Maker } from "../types";
import SearchFilter from "./SearchFilter.vue";
import { useScrollHideSearch } from "../composables/useScrollHideSearch";

const props = defineProps<{
  makers: Maker[];
}>();

const searchText = ref("");
const activeCategory = ref("all");
const viewMode = ref<'card' | 'square' | 'table'>('card');

const categories = computed(() => {
  const specialties = [...new Set(props.makers.map((m) => m.specialty))].sort();
  return [
    { id: "all", label: "All" },
    ...specialties.map((s) => ({ id: s, label: s })),
  ];
});

const filteredMakers = computed(() => {
  let result = props.makers;

  if (activeCategory.value !== "all") {
    result = result.filter((m) => m.specialty === activeCategory.value);
  }

  if (searchText.value.trim()) {
    const q = searchText.value.toLowerCase().trim();
    result = result.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.title.toLowerCase().includes(q) ||
        m.skills.some((s) => s.toLowerCase().includes(q))
    );
  }

  return result;
});

const isFilterActive = computed(() => activeCategory.value !== "all");
const { hidden: searchHidden } = useScrollHideSearch(searchText, isFilterActive);

function getInitial(name: string): string {
  return name.charAt(0).toUpperCase();
}
</script>

<template>
  <div>
    <!-- Search + filter controls -->
    <div class="search-wrap" :class="{ 'search-wrap--hidden': searchHidden }">
      <div class="max-w-xl">
        <SearchFilter
          :categories="categories"
          placeholder="Search makers by name, title, or skills..."
          v-model="searchText"
          v-model:active-category="activeCategory"
        />
      </div>
    </div>

    <!-- View toggles + results count -->
    <div class="flex items-center justify-between mt-5 mb-1">
      <p v-if="filteredMakers.length !== makers.length" class="text-sm text-ink-faint">
        Showing {{ filteredMakers.length }} of {{ makers.length }} makers
      </p>
      <div v-else></div>
      <div class="flex gap-1">
        <button
          v-for="mode in [
            { id: 'square', icon: 'ph-bold ph-grid-four' },
            { id: 'card', icon: 'ph-bold ph-squares-four' },
            { id: 'table', icon: 'ph-bold ph-list' },
          ]"
          :key="mode.id"
          class="view-toggle"
          :class="{ active: viewMode === mode.id }"
          @click="viewMode = mode.id as any"
        >
          <i :class="mode.icon"></i>
        </button>
      </div>
    </div>

    <!-- No results -->
    <div
      v-if="filteredMakers.length === 0"
      class="card mt-6"
    >
      <div class="card-bg"></div>
      <div class="card-content p-8 sm:p-12 text-center">
        <i class="ph-bold ph-magnifying-glass text-4xl text-ink-faint/40 mb-4 block"></i>
        <h3 class="font-serif font-bold text-lg mb-2">No makers found</h3>
        <p class="text-sm text-ink-faint">Try adjusting your search or filter to find what you're looking for.</p>
      </div>
    </div>

    <!-- ID Card Grid -->
    <div
      v-if="filteredMakers.length > 0 && viewMode === 'card'"
      class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 card-grid mt-6"
    >
      <a
        v-for="maker in filteredMakers"
        :key="maker.slug"
        :href="`/makers/${maker.slug}`"
        class="card card-hover id-card no-underline text-ink block group"
      >
        <div class="card-bg"></div>
        <div class="card-content flex flex-col h-full">

          <!-- Black jagged top bar with avatar + name -->
          <div class="id-card-header" :style="{ '--header-bg': maker.avatarColor }">
            <div class="flex items-center gap-3 flex-1 min-w-0">
              <!-- Octagon avatar -->
              <div class="octagon-avatar-wrap">
                <img
                  v-if="maker.avatar"
                  :src="maker.avatar"
                  :alt="maker.name"
                  class="octagon-avatar"
                />
                <div
                  v-else
                  class="octagon-avatar-fallback"
                  :style="{ background: maker.avatarColor }"
                >
                  <span>{{ getInitial(maker.name) }}</span>
                </div>
              </div>
              <div class="min-w-0">
                <h3 class="text-white font-serif font-bold text-lg leading-tight truncate group-hover:text-stamp transition-colors">{{ maker.name }}</h3>
                <span class="text-white/40 text-[0.6rem] font-semibold uppercase tracking-widest">{{ maker.specialty }}</span>
              </div>
            </div>
            <!-- Punch hole -->
            <div class="punch-hole"></div>
          </div>

          <!-- Title + Location -->
          <div class="px-5 pt-4">
            <p class="text-sm text-ink-light">{{ maker.title }}</p>
            <p class="text-xs text-ink-faint mt-1.5 flex items-center gap-1">
              <i class="ph-bold ph-map-pin text-xs text-stamp"></i>
              {{ maker.location }}
            </p>
          </div>

          <!-- Skills -->
          <div class="px-5 pt-3 flex flex-wrap gap-1.5">
            <span
              v-for="skill in maker.skills"
              :key="skill"
              class="tag tag-default text-[0.6rem]"
            >
              {{ skill }}
            </span>
          </div>

          <!-- Perforation + bottom section -->
          <div class="mt-auto mx-4 perforation"></div>
          <div class="px-5 pt-3 pb-4 flex items-end justify-end">
            <span class="text-stamp font-semibold text-sm flex items-center gap-1 flex-shrink-0 group-hover:underline">
              Open
              <i class="ph-bold ph-arrow-right text-xs"></i>
            </span>
          </div>
        </div>
      </a>
    </div>

    <!-- Square view - octagonal tiles -->
    <div
      v-if="filteredMakers.length > 0 && viewMode === 'square'"
      class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-4"
    >
      <a
        v-for="maker in filteredMakers"
        :key="maker.slug"
        :href="`/makers/${maker.slug}`"
        class="square-tile group no-underline"
      >
        <div class="square-tile-img-wrap">
          <img
            v-if="maker.avatar"
            :src="maker.avatar"
            :alt="maker.name"
            class="square-tile-img"
          />
          <div
            v-else
            class="square-tile-fallback"
            :style="{ background: maker.avatarColor }"
          >
            <span>{{ getInitial(maker.name) }}</span>
          </div>
        </div>
        <div class="square-tile-info">
          <span class="square-tile-name">{{ maker.name }}</span>
          <span class="square-tile-loc">{{ maker.location }}</span>
        </div>
      </a>
    </div>

    <!-- Table view - compact rows -->
    <div v-if="filteredMakers.length > 0 && viewMode === 'table'" class="mt-4">
      <a
        v-for="maker in filteredMakers"
        :key="maker.slug"
        :href="`/makers/${maker.slug}`"
        class="table-row no-underline text-ink group"
      >
        <img
          v-if="maker.avatar"
          :src="maker.avatar"
          :alt="maker.name"
          class="table-avatar"
        />
        <div
          v-else
          class="table-avatar-fallback"
          :style="{ background: maker.avatarColor }"
        >
          {{ getInitial(maker.name) }}
        </div>
        <div class="min-w-0 flex-1">
          <span class="text-sm font-semibold truncate block group-hover:text-stamp transition-colors">{{ maker.name }}</span>
          <span class="text-xs text-ink-faint">{{ maker.specialty }} · {{ maker.location }}</span>
        </div>
        <div class="hidden sm:flex flex-wrap gap-1 ml-auto">
          <span v-for="skill in maker.skills.slice(0, 3)" :key="skill" class="tag tag-default text-[0.55rem]">{{ skill }}</span>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.id-card {
  position: relative;
}

.id-card-header {
  padding: 0.85rem 1.25rem;
  border-radius: 0.875rem 0.875rem 0 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  overflow: hidden;
}
.id-card-header::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--header-bg, #1A1A1A);
  border-radius: 0.875rem 0.875rem 0 0;
  filter: url(#papercut);
  z-index: 0;
}
.id-card-header > :deep(*) {
  position: relative;
  z-index: 1;
}

.octagon-avatar-wrap {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
}

.octagon-avatar {
  width: 44px;
  height: 44px;
  object-fit: cover;
  clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
}

.octagon-avatar-fallback {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
  color: #FAF3E8;
  font-weight: 700;
  font-family: 'Fraunces', serif;
  font-size: 1.1rem;
}

.punch-hole {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid rgba(250, 243, 232, 0.15);
  flex-shrink: 0;
}

.perforation {
  border-top: 2px dashed rgba(26, 26, 26, 0.1);
}

/* View toggle buttons */
.view-toggle {
  width: 32px;
  height: 32px;
  border-radius: 0.5rem;
  border: 1.5px solid rgba(26, 26, 26, 0.12);
  background: transparent;
  color: #6b5b4a;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: all 0.15s;
}
.view-toggle:hover {
  border-color: #1a1a1a;
  color: #1a1a1a;
}
.view-toggle.active {
  background: #1a1a1a;
  color: #faf3e8;
  border-color: #1a1a1a;
}

/* Square view - octagonal tiles */
.square-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem 0.5rem;
  border-radius: 0.75rem;
  transition: background 0.15s;
}
.square-tile:hover {
  background: rgba(26, 26, 26, 0.04);
}
.square-tile-img-wrap {
  width: 80px;
  height: 80px;
  margin-bottom: 0.5rem;
}
.square-tile-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
}
.square-tile-fallback {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
  color: #FAF3E8;
  font-weight: 700;
  font-family: 'Fraunces', serif;
  font-size: 1.5rem;
}
.square-tile-name {
  display: block;
  font-weight: 700;
  font-size: 0.8rem;
  color: #1A1A1A;
  font-family: 'Fraunces', serif;
  line-height: 1.2;
}
.square-tile-loc {
  display: block;
  font-size: 0.6rem;
  color: #6b5b4a;
  margin-top: 0.15rem;
}

/* Table view */
.table-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(26, 26, 26, 0.06);
}
.table-row:last-child {
  border-bottom: none;
}
.table-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}
.table-avatar-fallback {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FAF3E8;
  font-weight: 700;
  font-size: 0.75rem;
  flex-shrink: 0;
}

/* Search bar - slides up on scroll */
.search-wrap {
  margin-bottom: 0.75rem;
  transition: opacity 0.2s, max-height 0.25s, margin 0.25s;
  max-height: 200px;
  overflow: hidden;
}
.search-wrap--hidden {
  opacity: 0;
  max-height: 0;
  margin-bottom: 0;
  pointer-events: none;
}
</style>
