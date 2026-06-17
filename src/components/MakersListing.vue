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
    <div class="max-w-xl">
      <SearchFilter
        :categories="categories"
        placeholder="Search makers by name, title, or skills..."
        v-model="searchText"
        v-model:active-category="activeCategory"
      />
    </div>

    <!-- Results count -->
    <p
      v-if="filteredMakers.length !== makers.length"
      class="text-sm text-ink-faint mt-5 mb-1"
    >
      Showing {{ filteredMakers.length }} of {{ makers.length }} makers
    </p>

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
      v-if="filteredMakers.length > 0"
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
          <div class="id-card-header">
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
  background: #1A1A1A;
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
</style>
