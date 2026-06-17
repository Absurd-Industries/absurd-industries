<script setup lang="ts">
/**
 * Campaigns listing island — handles search, category filter, status filter,
 * and renders the campaign card grid. Receives all campaigns as a prop from
 * the Astro page and manages client-side filtering.
 */

import { ref, computed } from "vue";
import type { Campaign } from "../types";

const props = defineProps<{
  campaigns: Campaign[];
}>();

// --- State ---
const searchText = ref("");
const activeCategory = ref("All");
const activeStatus = ref("All");

// --- Constants ---
const categories = [
  "All",
  "Electronics",
  "Tools",
  "IoT",
  "Sustainability",
  "Education",
  "Audio",
  "Agriculture",
];

const statuses = [
  { id: "All", label: "All" },
  { id: "live", label: "Live" },
  { id: "funded", label: "Funded" },
  { id: "coming", label: "Coming Soon" },
];

// --- Computed ---
const filteredCampaigns = computed(() => {
  let items = [...props.campaigns];

  // Category filter
  if (activeCategory.value !== "All") {
    items = items.filter((c) => c.category === activeCategory.value);
  }

  // Status filter
  if (activeStatus.value !== "All") {
    items = items.filter((c) => c.status === activeStatus.value);
  }

  // Search filter
  if (searchText.value.trim()) {
    const q = searchText.value.trim().toLowerCase();
    items = items.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.tagline.toLowerCase().includes(q) ||
        c.makerName.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
    );
  }

  return items;
});

// --- Helpers ---
function statusLabel(status: string): string {
  if (status === "live") return "Live";
  if (status === "funded") return "Funded";
  return "Coming Soon";
}

function statusTagClass(status: string): string {
  if (status === "live") return "tag tag-stamp";
  if (status === "funded") return "tag tag-funded";
  return "tag tag-default";
}
</script>

<template>
  <div>
    <!-- Sticky search + filters -->
    <div class="sticky-filters">
      <!-- Search bar -->
      <div class="search-bar">
        <i class="ph-bold ph-magnifying-glass search-icon"></i>
        <input
          v-model="searchText"
          type="text"
          placeholder="Search campaigns..."
          class="search-input"
        />
        <button
          v-if="searchText"
          class="search-clear"
          @click="searchText = ''"
        >
          <i class="ph-bold ph-x"></i>
        </button>
      </div>

      <!-- Scrollable filter strip -->
      <div class="filter-strip">
        <button
          v-for="cat in categories"
          :key="cat"
          class="filter-chip"
          :class="{ active: activeCategory === cat }"
          @click="activeCategory = activeCategory === cat && cat !== 'All' ? 'All' : cat"
        >
          {{ cat }}
        </button>
        <span class="filter-dot"></span>
        <button
          v-for="s in statuses"
          :key="s.id"
          class="filter-chip filter-chip--status"
          :class="{ active: activeStatus === s.id }"
          @click="activeStatus = activeStatus === s.id && s.id !== 'All' ? 'All' : s.id"
        >
          {{ s.label }}
        </button>
      </div>
    </div>

    <!-- Results count -->
    <p v-if="filteredCampaigns.length > 0" class="text-sm text-ink-faint mb-5">
      Showing {{ filteredCampaigns.length }}
      campaign{{ filteredCampaigns.length !== 1 ? "s" : "" }}
    </p>

    <!-- Empty state -->
    <div v-if="filteredCampaigns.length === 0" class="card">
      <div class="card-bg"></div>
      <div class="card-content p-10 text-center">
        <i class="ph-bold ph-binoculars text-5xl text-kraft-dark mb-4 block"></i>
        <p class="font-serif font-semibold text-xl text-ink mb-2">
          No campaigns found
        </p>
        <p class="text-ink-faint text-sm">
          Try a different search term or category filter.
        </p>
      </div>
    </div>

    <!-- Campaign card grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 card-grid">
      <a
        v-for="(campaign, index) in filteredCampaigns"
        :key="campaign.slug"
        :href="`/campaigns/${campaign.slug}`"
        class="card card-hover block no-underline text-ink group"
        :style="{ animationDelay: index * 0.06 + 's' }"
      >
        <div class="card-bg"></div>
        <div class="card-content">
          <!-- Image / icon area -->
          <div
            v-if="campaign.image"
            class="m-4 mb-0 rounded-xl overflow-hidden"
            style="height: 170px"
          >
            <img
              :src="campaign.image"
              :alt="campaign.title"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div
            v-else
            class="bg-kraft-light rounded-xl flex items-center justify-center m-4 mb-0"
            style="min-height: 170px"
          >
            <i
              :class="[
                campaign.icon,
                'text-5xl text-kraft-dark transition-all duration-300 group-hover:scale-110 group-hover:text-stamp',
              ]"
            ></i>
          </div>

          <!-- Content -->
          <div class="p-5 pt-4">
            <!-- Tags row -->
            <div class="flex flex-wrap gap-2 mb-3">
              <span :class="statusTagClass(campaign.status)">
                {{ statusLabel(campaign.status) }}
              </span>
              <span class="tag tag-default">{{ campaign.category }}</span>
              <span class="tag tag-default">
                <i
                  class="ph-bold ph-scales mr-1"
                  style="font-size: 0.65rem"
                ></i>
                {{ campaign.license }}
              </span>
            </div>

            <!-- Title -->
            <h3
              class="font-serif font-semibold text-lg text-ink mb-2 leading-snug group-hover:text-stamp transition-colors"
            >
              {{ campaign.title }}
            </h3>

            <!-- Tagline -->
            <p class="text-ink-light text-sm leading-relaxed mb-3 line-clamp-2">
              {{ campaign.tagline }}
            </p>

            <!-- Born from community request callout -->
            <div
              v-if="campaign.bornFromRequest"
              class="flex items-center gap-1.5 mb-3 text-xs font-semibold"
              style="color: #2a5f41"
            >
              <i class="ph-bold ph-arrow-bend-up-left"></i>
              Born from community request
            </div>

            <!-- Maker info -->
            <div class="flex items-center gap-2 mb-4">
              <div
                class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-paper"
                :style="{ background: campaign.avatarColor }"
              >
                {{ campaign.makerName.charAt(0) }}
              </div>
              <span class="text-sm font-medium text-ink">{{
                campaign.makerName
              }}</span>
              <span class="text-xs text-ink-faint"
                >&middot; {{ campaign.location }}</span
              >
            </div>

            <!-- Progress bar -->
            <div class="progress mb-3">
              <div
                class="progress-fill"
                :class="{
                  hot: campaign.percent >= 90 && campaign.status === 'live',
                }"
                :style="{ width: Math.min(campaign.percent, 100) + '%' }"
              ></div>
            </div>

            <!-- Stats row -->
            <div class="flex items-center justify-between text-sm">
              <span
                class="font-semibold"
                :class="
                  campaign.percent >= 100 ? 'text-funded' : 'text-ink'
                "
              >
                {{ campaign.percent }}% funded
              </span>
              <span class="text-ink-faint">
                {{ campaign.backers }}
                backer{{ campaign.backers !== 1 ? "s" : "" }}
              </span>
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
/* Sticky search + filter bar */
.sticky-filters {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(212, 184, 150, 0.97);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 0.6rem 0 0.5rem;
  margin-bottom: 1rem;
}

/* Search bar */
.search-bar {
  position: relative;
  margin-bottom: 0.5rem;
}
.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
  color: #4A3D2F;
  pointer-events: none;
}
.search-input {
  width: 100%;
  padding: 0.65rem 2.5rem 0.65rem 2.75rem;
  border-radius: 0.75rem;
  border: 1.5px solid rgba(26, 26, 26, 0.1);
  background: #FAF3E8;
  font-size: 0.875rem;
  font-weight: 500;
  color: #1A1A1A;
  transition: border-color 0.15s, box-shadow 0.15s;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.06);
}
.search-input::placeholder {
  color: #B8956A;
  font-weight: 450;
}
.search-input:focus {
  outline: none;
  border-color: #D94800;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.06), 0 0 0 3px rgba(217, 72, 0, 0.08);
}
.search-clear {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #4A3D2F;
  font-size: 0.8rem;
  padding: 0.25rem;
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.15s;
}
.search-clear:hover {
  opacity: 1;
}

/* Filter strip — horizontally scrollable */
.filter-strip {
  display: flex;
  gap: 0.35rem;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding-bottom: 2px;
}
.filter-strip::-webkit-scrollbar {
  display: none;
}

.filter-chip {
  display: inline-flex;
  align-items: center;
  padding: 0.3rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.72rem;
  font-weight: 600;
  border: 1.5px solid rgba(26, 26, 26, 0.12);
  background: rgba(250, 243, 232, 0.6);
  color: #4A3D2F;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
  flex-shrink: 0;
}
.filter-chip:hover {
  border-color: #1A1A1A;
  color: #1A1A1A;
  background: rgba(250, 243, 232, 0.9);
}
.filter-chip.active {
  background: #1A1A1A;
  color: #FAF3E8;
  border-color: #1A1A1A;
}

.filter-chip--status {
  border-style: dashed;
}
.filter-chip--status.active {
  border-style: solid;
}

.filter-dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: rgba(26, 26, 26, 0.2);
  align-self: center;
  flex-shrink: 0;
}

/* Fade in animation for cards */
.card {
  animation: fadeIn 0.4s ease forwards;
  opacity: 0;
}
@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

/* line-clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
