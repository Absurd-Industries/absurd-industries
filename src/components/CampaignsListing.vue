<script setup lang="ts">
/**
 * Campaigns listing island - handles search, category filter, status filter,
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
    <!-- Search bar (hides on scroll down) -->
    <div class="search-wrap">
      <div class="relative max-w-md">
        <i class="ph-bold ph-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-stencil" style="font-size:0.9rem"></i>
        <input
          v-model="searchText"
          type="text"
          placeholder="Search campaigns..."
          class="w-full pl-10 pr-4 py-2.5 rounded-full border border-ink/10 bg-paper text-sm text-ink placeholder:text-kraft-dark focus:outline-none focus:border-stamp focus:ring-1 focus:ring-stamp/30 transition-colors"
        />
        <button
          v-if="searchText"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink transition-colors"
          @click="searchText = ''"
        >
          <i class="ph-bold ph-x" style="font-size:0.8rem"></i>
        </button>
      </div>
    </div>

    <!-- Filter pills -->
    <div class="flex flex-wrap gap-1.5 mb-2">
      <button
        v-for="cat in categories"
        :key="cat"
        class="filter-pill"
        :class="{ active: activeCategory === cat }"
        @click="activeCategory = activeCategory === cat && cat !== 'All' ? 'All' : cat"
      >
        {{ cat }}
      </button>
      <span class="filter-dot"></span>
      <button
        v-for="s in statuses"
        :key="s.id"
        class="filter-pill filter-pill--status"
        :class="{ active: activeStatus === s.id }"
        @click="activeStatus = activeStatus === s.id && s.id !== 'All' ? 'All' : s.id"
      >
        {{ s.label }}
      </button>
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
            class="overflow-hidden"
            style="height: 190px; border-radius: 0.875rem 0.875rem 0 0;"
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
            class="bg-kraft-light flex items-center justify-center"
            style="border-radius: 0.875rem 0.875rem 0 0; min-height: 170px"
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
                class="w-6 h-6 flex items-center justify-center text-xs font-bold text-paper"
                :style="{ background: campaign.avatarColor, clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }"
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
.search-wrap {
  padding: 0.75rem 0;
}

/* Filter pills - matches requests page style */
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

.filter-pill--status {
  border-style: dashed;
}
.filter-pill--status.active {
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
