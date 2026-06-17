<script setup lang="ts">
/**
 * Reusable search input + category filter pills.
 * Vue island — used on listing pages (events, makers, etc.).
 * Supports v-model for search text and active category.
 *
 * Usage:
 *   <SearchFilter
 *     :categories="categories"
 *     placeholder="Search events..."
 *     v-model="searchText"
 *     v-model:active-category="activeCategory"
 *   />
 */

import { computed } from "vue";

interface Category {
  id: string;
  label: string;
  icon?: string;
}

const props = defineProps<{
  /** Available filter categories with id, label, and optional Phosphor icon class */
  categories: Category[];
  /** Placeholder text for the search input */
  placeholder: string;
  /** Search text (v-model) */
  modelValue: string;
  /** Currently active category id (v-model:activeCategory) */
  activeCategory: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
  "update:activeCategory": [value: string];
}>();

const searchText = computed({
  get: () => props.modelValue,
  set: (v: string) => emit("update:modelValue", v),
});

function toggleCategory(id: string) {
  // Clicking the already-active category resets to "all" (first category)
  if (props.activeCategory === id && id !== props.categories[0]?.id) {
    emit("update:activeCategory", props.categories[0]?.id ?? "all");
  } else {
    emit("update:activeCategory", id);
  }
}
</script>

<template>
  <div class="space-y-3">
    <!-- Search input -->
    <div class="relative">
      <i
        class="ph-bold ph-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-stencil"
        style="font-size: 0.9rem"
      ></i>
      <input
        v-model="searchText"
        type="text"
        :placeholder="placeholder"
        class="w-full pl-9 pr-4 py-2.5 rounded-xl border border-ink/10 bg-paper text-sm text-ink placeholder:text-ink-faint/60 focus:outline-none focus:border-stamp focus:ring-1 focus:ring-stamp/30 transition-colors"
      />
      <button
        v-if="searchText"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink transition-colors"
        @click="searchText = ''"
      >
        <i class="ph-bold ph-x" style="font-size: 0.8rem"></i>
      </button>
    </div>

    <!-- Category pills (horizontal scroll on mobile) -->
    <div class="flex flex-wrap gap-1.5">
      <button
        v-for="cat in categories"
        :key="cat.id"
        class="filter-pill"
        :class="{ active: activeCategory === cat.id }"
        @click="toggleCategory(cat.id)"
      >
        <i v-if="cat.icon" :class="cat.icon" style="font-size: 0.7rem" class="mr-1"></i>
        {{ cat.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Filter pills — mirrors global .filter-pill but scoped */
.filter-pill {
  display: inline-flex;
  align-items: center;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 600;
  border: 1.5px solid rgba(26, 26, 26, 0.12);
  background: transparent;
  color: #6b5b4a;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}
.filter-pill:hover {
  border-color: #1a1a1a;
  color: #1a1a1a;
}
.filter-pill.active {
  background: #1a1a1a;
  color: #faf3e8;
  border-color: #1a1a1a;
}
</style>
