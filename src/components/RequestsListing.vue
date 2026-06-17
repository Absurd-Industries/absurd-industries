<script setup lang="ts">
/**
 * Requests listing island — handles search, category filter, sort,
 * and renders the edge-to-edge feed of community requests.
 * Receives all requests as a prop from the Astro page and manages
 * client-side filtering / sorting.
 */

import { ref, computed } from "vue";
import type { Request } from "../types";

const props = defineProps<{
  requests: Request[];
  makerNames: Record<string, string>;
}>();

// --- State ---
const searchText = ref("");
const activeCategory = ref("All");
const sortBy = ref("hot");

// --- Constants ---
const categories = [
  "All",
  "Hardware",
  "Software",
  "Science",
  "Art & Design",
  "Education",
  "Sustainability",
];

const sortOptions = [
  { value: "hot", label: "Hot", icon: "ph-bold ph-fire" },
  { value: "new", label: "New", icon: "ph-bold ph-clock" },
  { value: "claimed", label: "Claimed", icon: "ph-bold ph-check-circle" },
];

// --- Reactive vote state (local only) ---
const votedSlugs = ref<Set<string>>(new Set());

function toggleVote(slug: string) {
  if (votedSlugs.value.has(slug)) {
    votedSlugs.value.delete(slug);
  } else {
    votedSlugs.value.add(slug);
  }
  // Force reactivity on the Set
  votedSlugs.value = new Set(votedSlugs.value);
}

function getVoteCount(req: Request): number {
  const base = req.upvotes;
  return votedSlugs.value.has(req.slug) ? base + 1 : base;
}

// --- Computed ---
const filteredRequests = computed(() => {
  let items = [...props.requests];

  // Category filter
  if (activeCategory.value !== "All") {
    items = items.filter((r) => r.category === activeCategory.value);
  }

  // Search filter
  if (searchText.value.trim()) {
    const q = searchText.value.trim().toLowerCase();
    items = items.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.authorName.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  // Sort
  if (sortBy.value === "hot") {
    items.sort((a, b) => {
      const scoreA =
        a.upvotes +
        a.commentCount * 2 +
        new Date(a.createdAt).getTime() / 86400000;
      const scoreB =
        b.upvotes +
        b.commentCount * 2 +
        new Date(b.createdAt).getTime() / 86400000;
      return scoreB - scoreA;
    });
  } else if (sortBy.value === "new") {
    items.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } else if (sortBy.value === "claimed") {
    items = items.filter((r) => r.claimedBy);
    items.sort((a, b) => b.upvotes - a.upvotes);
  }

  return items;
});

// --- Helpers ---
function statusTagClass(status: string): string {
  if (status === "open") return "tag-stamp";
  if (status === "claimed" || status === "in-progress") return "tag-default";
  if (status === "fulfilled") return "tag-funded";
  return "tag-default";
}

function statusLabel(status: string): string {
  if (status === "open") return "Open";
  if (status === "claimed") return "Claimed";
  if (status === "in-progress") return "In Progress";
  if (status === "fulfilled") return "Fulfilled";
  return status;
}

function timeAgo(dateStr: string): string {
  const now = new Date();
  const then = new Date(dateStr);
  const diffMs = now.getTime() - then.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks < 5) return `${diffWeeks}w ago`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths}mo ago`;
  const diffYears = Math.floor(diffDays / 365);
  return `${diffYears}y ago`;
}

function makerDisplayName(makerSlug: string): string {
  return props.makerNames[makerSlug] ?? makerSlug;
}
</script>

<template>
  <div>
    <!-- Search input -->
    <div class="search-wrap">
    <div class="relative max-w-md mb-5">
      <i
        class="ph-bold ph-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-stencil"
        style="font-size: 0.9rem"
      ></i>
      <input
        v-model="searchText"
        type="text"
        placeholder="Search requests..."
        class="w-full pl-10 pr-4 py-2.5 rounded-full border border-ink/10 bg-paper text-sm text-ink placeholder:text-kraft-dark focus:outline-none focus:border-stamp focus:ring-1 focus:ring-stamp/30 transition-colors"
      />
      <button
        v-if="searchText"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink transition-colors"
        @click="searchText = ''"
      >
        <i class="ph-bold ph-x" style="font-size: 0.8rem"></i>
      </button>
    </div>
    </div>

    <!-- Sort tabs -->
    <div class="flex items-center gap-1 mb-3">
      <button
        v-for="s in sortOptions"
        :key="s.value"
        class="sort-tab"
        :class="{ active: sortBy === s.value }"
        @click="sortBy = s.value"
      >
        <i :class="s.icon" class="mr-1"></i>{{ s.label }}
      </button>
    </div>

    <!-- Category filter pills -->
    <div class="flex flex-wrap gap-1.5 mb-6">
      <button
        v-for="cat in categories"
        :key="cat"
        class="filter-pill"
        :class="{ active: activeCategory === cat }"
        @click="
          activeCategory = activeCategory === cat && cat !== 'All' ? 'All' : cat
        "
      >
        {{ cat }}
      </button>
    </div>

    <!-- Results count -->
    <p
      v-if="filteredRequests.length > 0"
      class="text-sm text-ink-faint mb-2"
    >
      {{ filteredRequests.length }}
      request{{ filteredRequests.length !== 1 ? "s" : "" }}
    </p>

    <!-- Feed list (edge-to-edge, no card wrappers) -->
    <div>
      <div
        v-for="req in filteredRequests"
        :key="req.slug"
        class="feed-item"
      >
        <div class="flex gap-3">
          <!-- Upvote button -->
          <div class="flex-shrink-0 pt-0.5">
            <button
              class="upvote-btn"
              :class="{ voted: votedSlugs.has(req.slug) }"
              @click.prevent="toggleVote(req.slug)"
            >
              <i class="ph-bold ph-arrow-fat-up"></i>
              <span>{{ getVoteCount(req) }}</span>
            </button>
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <!-- Status + category + time row -->
            <div class="flex flex-wrap items-center gap-2 mb-1">
              <span class="tag" :class="statusTagClass(req.status)">
                {{ statusLabel(req.status) }}
              </span>
              <span class="text-xs text-ink-faint">{{ req.category }}</span>
              <span class="text-xs text-ink-faint">&middot;</span>
              <span class="text-xs text-ink-faint">{{ timeAgo(req.createdAt) }}</span>
            </div>

            <!-- Title -->
            <a
              :href="`/requests/${req.slug}`"
              class="block no-underline group"
            >
              <h3
                class="font-serif font-bold text-base sm:text-lg leading-snug text-ink group-hover:text-stamp transition-colors"
              >
                {{ req.title }}
              </h3>
            </a>

            <!-- Description -->
            <p class="text-sm text-ink-faint leading-relaxed mt-1 line-clamp-2">
              {{ req.description }}
            </p>

            <!-- Tags (small pills) -->
            <div class="flex flex-wrap gap-1 mt-2">
              <span
                v-for="tag in req.tags.slice(0, 3)"
                :key="tag"
                class="spec-tag"
              >
                {{ tag }}
              </span>
              <span v-if="req.tags.length > 3" class="spec-tag">
                +{{ req.tags.length - 3 }}
              </span>
            </div>

            <!-- Claimed by maker -->
            <div
              v-if="req.claimedBy"
              class="flex items-center gap-1.5 mt-2 text-xs font-semibold"
              style="color: #2a5f41"
            >
              <i class="ph-bold ph-check-circle"></i>
              <span>
                Claimed by
                <a
                  :href="`/makers/${req.claimedBy}`"
                  class="underline"
                  style="color: #2a5f41"
                >
                  {{ makerDisplayName(req.claimedBy) }}
                </a>
              </span>
              <a
                v-if="req.campaignSlug"
                :href="`/campaigns/${req.campaignSlug}`"
                class="tag tag-funded ml-1 no-underline"
              >
                View Campaign
              </a>
            </div>

            <!-- Meta row -->
            <div class="flex flex-wrap items-center gap-1 mt-2">
              <a
                :href="`/requests/${req.slug}`"
                class="meta-action"
              >
                <i class="ph-bold ph-chat-circle"></i>
                {{ req.commentCount }} Comments
              </a>
              <span class="meta-action">
                <i class="ph-bold ph-share-network"></i>
                Share
              </span>
              <span class="text-xs text-ink-faint">
                by
                <a
                  :href="`/makers/${req.authorSlug}`"
                  class="font-semibold text-ink hover:text-stamp transition-colors no-underline"
                >
                  {{ req.authorName }}
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="filteredRequests.length === 0" class="py-12 text-center">
        <i
          class="ph-bold ph-magnifying-glass text-4xl text-stencil opacity-40 mb-3 block"
        ></i>
        <h3 class="font-serif font-bold text-lg mb-1">No requests found</h3>
        <p class="text-sm text-ink-faint">
          Try a different category or search term.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Feed item — edge-to-edge, directly on kraft */
.feed-item {
  padding: 1.25rem 0;
  border-bottom: 1px solid rgba(26, 26, 26, 0.08);
}
.feed-item:last-child {
  border-bottom: none;
}

/* Upvote button — compact column layout */
.upvote-btn {
  width: 38px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1px;
  padding: 6px 0;
  border-radius: 0.5rem;
  border: 1.5px solid rgba(26, 26, 26, 0.15);
  background: transparent;
  font-size: 0.65rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s;
  color: #6b5b4a;
  font-family: "DM Sans", system-ui, sans-serif;
}
.upvote-btn:hover {
  border-color: #ff5900;
  color: #ff5900;
  background: rgba(255, 89, 0, 0.04);
}
.upvote-btn.voted {
  background: #1a1a1a;
  color: #faf3e8;
  border-color: #1a1a1a;
}
.upvote-btn i {
  font-size: 0.85rem;
}

/* Spec tag — smaller pill for tags */
.spec-tag {
  display: inline-flex;
  align-items: center;
  padding: 0.1rem 0.45rem;
  border-radius: 999px;
  font-size: 0.6rem;
  font-weight: 600;
  background: rgba(26, 26, 26, 0.05);
  color: #6b5b4a;
}

/* Sort tabs */
.sort-tab {
  padding: 0.35rem 0.8rem;
  border-radius: 0.625rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b5b4a;
  cursor: pointer;
  transition: all 0.15s;
  background: transparent;
  border: none;
  font-family: "DM Sans", system-ui, sans-serif;
}
.sort-tab:hover {
  background: rgba(26, 26, 26, 0.06);
  color: #1a1a1a;
}
.sort-tab.active {
  background: #1a1a1a;
  color: #faf3e8;
}

/* Category filter pills */
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

/* Meta action links */
.meta-action {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.7rem;
  font-weight: 600;
  color: #6b5b4a;
  cursor: pointer;
  padding: 0.2rem 0.4rem;
  border-radius: 0.375rem;
  transition: all 0.12s;
  text-decoration: none;
}
.meta-action:hover {
  background: rgba(26, 26, 26, 0.06);
  color: #1a1a1a;
}
.meta-action i {
  font-size: 0.8rem;
}

/* line-clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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
