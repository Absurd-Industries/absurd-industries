<script setup lang="ts">
/**
 * Makers listing island — search + specialty filters + ID card grid.
 * Renders the full ID-card markup in the Vue template so that
 * client-side filtering works seamlessly.
 */

import { ref, computed } from "vue";
import type { Maker } from "../types";
import SearchFilter from "./SearchFilter.vue";

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

function getInitial(name: string): string {
  return name.charAt(0).toUpperCase();
}
</script>

<template>
  <div>
    <!-- Search + filter controls -->
    <div class="search-wrap">
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
        class="id-card no-underline block group"
        :style="{ '--card-bg': maker.avatarColor }"
      >
        <div class="id-card-inner">
          <!-- Punch hole on right -->
          <div class="id-punch"></div>

          <!-- Avatar -->
          <div class="id-avatar-wrap">
            <img
              v-if="maker.avatar"
              :src="maker.avatar"
              :alt="maker.name"
              class="id-avatar"
            />
            <div
              v-else
              class="id-avatar-fallback"
            >
              <span>{{ getInitial(maker.name) }}</span>
            </div>
          </div>

          <!-- Name + meta -->
          <h3 class="id-name">{{ maker.name }}</h3>
          <div class="id-meta">
            <i class="ph-bold ph-map-pin" style="font-size:0.55rem;"></i>
            {{ maker.location }}
            <span style="opacity:0.4;">&middot;</span>
            {{ maker.specialty }}
          </div>

          <!-- Divider -->
          <div class="id-divider"></div>

          <!-- Bio -->
          <p class="id-bio">{{ maker.bio || maker.title }}</p>

          <!-- Skills -->
          <div class="id-skills">
            <span
              v-for="skill in maker.skills.slice(0, 4)"
              :key="skill"
              class="id-skill-tag"
            >
              {{ skill }}
            </span>
          </div>

          <!-- Open link -->
          <div class="id-footer">
            <span class="id-open-link">
              Open
              <i class="ph-bold ph-arrow-right" style="font-size:0.6rem;"></i>
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
/* Full-color ID card - matches profile page banner */
.id-card {
  position: relative;
  display: block;
  border-radius: 0.875rem;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}
.id-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(26, 26, 26, 0.15);
}

.id-card-inner {
  position: relative;
  background: var(--card-bg, #1A1A1A);
  border-radius: 0.875rem;
  padding: 1.25rem 1.25rem 1rem;
  min-height: 260px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.id-card-inner::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--card-bg, #1A1A1A);
  filter: url(#papercut);
  z-index: 0;
  pointer-events: none;
}
.id-card-inner > * {
  position: relative;
  z-index: 1;
}

/* Punch hole - top right */
.id-punch {
  position: absolute;
  top: 12px;
  right: 16px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--card-bg, #1A1A1A);
  box-shadow:
    inset 0 1px 3px rgba(0,0,0,0.4),
    inset 0 -1px 2px rgba(255,255,255,0.05),
    0 0 0 2px rgba(255,255,255,0.08);
  z-index: 2;
}
.id-punch::after {
  content: '';
  position: absolute;
  inset: 3px;
  border-radius: 50%;
  background: #D4B896;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.15);
}

/* Octagon avatar */
.id-avatar-wrap {
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  margin-bottom: 0.75rem;
}
.id-avatar {
  width: 64px;
  height: 64px;
  object-fit: cover;
  clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
}
.id-avatar-fallback {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
  background: rgba(250, 243, 232, 0.15);
  color: #FAF3E8;
  font-weight: 700;
  font-family: 'Fraunces', serif;
  font-size: 1.3rem;
}

.id-name {
  font-family: 'Fraunces', serif;
  font-weight: 700;
  font-size: 1.15rem;
  color: #FAF3E8;
  line-height: 1.2;
  margin: 0;
  transition: color 0.15s;
}
.id-card:hover .id-name {
  color: #FF5900;
}

.id-meta {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.65rem;
  color: rgba(250, 243, 232, 0.5);
  margin-top: 0.25rem;
}

.id-divider {
  border-top: 1px solid rgba(250, 243, 232, 0.12);
  margin: 0.75rem 0;
}

.id-bio {
  font-size: 0.78rem;
  color: rgba(250, 243, 232, 0.65);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
}

.id-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.75rem;
}
.id-skill-tag {
  display: inline-block;
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
  font-size: 0.55rem;
  font-weight: 600;
  background: rgba(250, 243, 232, 0.1);
  color: rgba(250, 243, 232, 0.6);
  border: 1px solid rgba(250, 243, 232, 0.08);
}

.id-footer {
  margin-top: auto;
  padding-top: 0.75rem;
  display: flex;
  justify-content: flex-end;
}
.id-open-link {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: rgba(250, 243, 232, 0.4);
  transition: color 0.15s;
}
.id-card:hover .id-open-link {
  color: #FF5900;
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

.search-wrap {
  position: sticky;
  top: 0;
  z-index: 30;
  background: rgba(212, 184, 150, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 0.75rem 0;
  margin: 0 -1.25rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}
</style>
