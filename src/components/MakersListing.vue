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

/** Deterministic barcode heights from slug hash */
function generateBarcode(slug: string): number[] {
  const bars: number[] = [];
  const count = 30;
  let hash = 0;
  for (const ch of slug) {
    hash = ((hash << 5) - hash + ch.charCodeAt(0)) | 0;
  }
  for (let i = 0; i < count; i++) {
    hash = ((hash * 1103515245 + 12345) >>> 0) & 0x7fffffff;
    bars.push(8 + (hash % 16));
  }
  return bars;
}

/** Deterministic member ID from slug */
function generateMemberId(slug: string): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let hash = 0;
  for (const ch of slug) {
    hash = ((hash << 5) - hash + ch.charCodeAt(0)) | 0;
  }
  let id = "";
  for (let i = 0; i < 6; i++) {
    hash = ((hash * 1103515245 + 12345) >>> 0) & 0x7fffffff;
    id += chars[hash % chars.length];
  }
  return id;
}

function getIdNum(slug: string): string {
  const h = Math.abs(
    Array.from(slug).reduce((a, c) => ((a << 5) - a + c.charCodeAt(0)) | 0, 0)
  ) % 10000;
  return String(h).padStart(4, "0");
}

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
        <div class="card-content flex flex-col">

          <!-- Punch hole (top right) -->
          <div class="punch-hole"></div>

          <!-- Black jagged top bar -->
          <div class="id-card-header">
            <span class="text-white/40 text-[0.6rem] font-semibold uppercase tracking-widest">{{ maker.specialty }}</span>
          </div>

          <!-- Name + Title + Location -->
          <div class="px-5 pt-4">
            <h3 class="font-serif font-bold text-2xl leading-tight group-hover:text-stamp transition-colors">{{ maker.name }}</h3>
            <p class="text-sm text-ink-light mt-0.5">{{ maker.title }}</p>
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

          <!-- Stats row -->
          <div class="px-5 pt-4 flex items-center gap-5">
            <div class="text-center">
              <div class="text-lg font-bold font-serif leading-none">{{ maker.projects }}</div>
              <div class="text-[0.6rem] text-ink-faint uppercase tracking-wide mt-0.5">Projects</div>
            </div>
            <div class="w-px h-8 bg-ink/10"></div>
            <div class="text-center">
              <div class="text-lg font-bold font-serif leading-none">{{ maker.backers }}</div>
              <div class="text-[0.6rem] text-ink-faint uppercase tracking-wide mt-0.5">Backers</div>
            </div>
          </div>

          <!-- Perforation + bottom section -->
          <div class="mt-4 mx-4 perforation"></div>
          <div class="px-5 pt-3 pb-4 flex items-end justify-between">
            <!-- Barcode + member ID -->
            <div>
              <div class="barcode">
                <span
                  v-for="(h, i) in generateBarcode(maker.slug)"
                  :key="i"
                  :style="{ height: h + 'px' }"
                ></span>
              </div>
              <div class="text-[0.55rem] text-ink-faint/40 font-mono mt-1 tracking-widest">
                AI-{{ getIdNum(maker.slug) }}-{{ generateMemberId(maker.slug) }}
              </div>
            </div>

            <!-- View Profile -->
            <span class="text-stamp font-semibold text-sm flex items-center gap-1 flex-shrink-0 group-hover:underline">
              Profile
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

/* Black jagged-edged top bar */
.id-card-header {
  background: #1A1A1A;
  padding: 0.85rem 1.25rem;
  border-radius: 0.875rem 0.875rem 0 0;
  filter: url(#papercut);
  display: flex;
  align-items: center;
}

/* Punch hole — top right corner */
.punch-hole {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid rgba(26, 26, 26, 0.12);
  position: absolute;
  top: 0.75rem;
  right: 1rem;
  z-index: 2;
}

/* Barcode decoration */
.barcode {
  display: flex;
  align-items: flex-end;
  gap: 1px;
  height: 24px;
  opacity: 0.2;
}
.barcode span {
  display: block;
  background: #1A1A1A;
  width: 2px;
}
.barcode span:nth-child(3n) {
  width: 3px;
}
.barcode span:nth-child(5n) {
  width: 1px;
}

/* Perforation line */
.perforation {
  border-top: 2px dashed rgba(26, 26, 26, 0.1);
}
</style>
