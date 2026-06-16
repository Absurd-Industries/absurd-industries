<script setup lang="ts">
/**
 * Events listing island — handles search, city filter, category filter,
 * and renders the event feed. Receives all events as a prop from the
 * Astro page and manages client-side filtering.
 */

import { ref, computed } from "vue";
import type { AbsurdEvent } from "../types";

const props = defineProps<{
  events: AbsurdEvent[];
}>();

// --- State ---
const searchText = ref("");
const activeCity = ref("Bengaluru");
const activeCategory = ref("All");

// --- Constants ---
const cities = ["Bengaluru", "Mumbai", "Pune", "Online"];
const categories = [
  { id: "All", label: "All", icon: "" },
  { id: "Meetups", label: "Meetups", icon: "ph-bold ph-users-three" },
  { id: "Workshops", label: "Workshops", icon: "ph-bold ph-wrench" },
  { id: "Hackathons", label: "Hackathons", icon: "ph-bold ph-code" },
  { id: "Talks", label: "Talks", icon: "ph-bold ph-microphone-stage" },
  { id: "Conferences", label: "Conferences", icon: "ph-bold ph-presentation-chart" },
];

// Map category filter labels to AbsurdEvent.category values
const categoryMap: Record<string, string> = {
  Meetups: "meetup",
  Workshops: "workshop",
  Hackathons: "hackathon",
  Talks: "talk",
  Conferences: "conference",
};

// --- Computed ---
const filteredEvents = computed(() => {
  let items = [...props.events];

  // City filter
  items = items.filter((e) => e.city === activeCity.value);

  // Category filter
  if (activeCategory.value !== "All") {
    const cat = categoryMap[activeCategory.value];
    if (cat) {
      items = items.filter((e) => e.category === cat);
    }
  }

  // Search filter
  if (searchText.value.trim()) {
    const q = searchText.value.trim().toLowerCase();
    items = items.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q) ||
        e.hostName.toLowerCase().includes(q) ||
        e.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  // Sort by date ascending (upcoming first)
  items.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return items;
});

// --- Helpers ---
function formatMonth(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleString("en-IN", { month: "short" });
}

function formatDay(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.getDate().toString();
}

function categoryTagClass(category: string): string {
  if (category === "hackathon") return "tag tag-stamp";
  if (category === "conference") return "tag tag-funded";
  return "tag tag-default";
}

function categoryLabel(category: string): string {
  const labels: Record<string, string> = {
    meetup: "Meetup",
    workshop: "Workshop",
    hackathon: "Hackathon",
    talk: "Talk",
    conference: "Conference",
  };
  return labels[category] ?? category;
}

function spotsLeft(event: AbsurdEvent): number | null {
  if (event.maxAttendees == null) return null;
  return event.maxAttendees - event.attendees;
}

function isDropIn(event: AbsurdEvent): boolean {
  return event.tags.some((t) => t === "drop-in");
}

function priceDisplay(event: AbsurdEvent): string {
  return event.priceINR === 0 ? "Free" : `₹${event.priceINR}`;
}

function buttonLabel(event: AbsurdEvent): string {
  if (isDropIn(event)) return "Drop in";
  const spots = spotsLeft(event);
  if (spots != null && spots > 0) return "Register";
  return "RSVP";
}

function buttonClass(event: AbsurdEvent): string {
  return isDropIn(event) ? "btn btn-sm btn-outline" : "btn btn-sm btn-primary";
}
</script>

<template>
  <div>
    <!-- City selector -->
    <div class="flex flex-wrap gap-2 mb-4">
      <button
        v-for="city in cities"
        :key="city"
        class="city-pill"
        :class="{ active: activeCity === city }"
        @click="activeCity = city"
      >
        <i class="ph-bold ph-map-pin mr-1" style="font-size: 0.7rem"></i>
        {{ city }}
      </button>
    </div>

    <!-- Search input -->
    <div class="relative mb-4">
      <i
        class="ph-bold ph-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-stencil"
        style="font-size: 0.9rem"
      ></i>
      <input
        v-model="searchText"
        type="text"
        placeholder="Search events, venues, tags..."
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

    <!-- Category pills -->
    <div class="flex flex-wrap gap-1.5 mb-6">
      <button
        v-for="cat in categories"
        :key="cat.id"
        class="filter-pill"
        :class="{ active: activeCategory === cat.id }"
        @click="activeCategory = activeCategory === cat.id && cat.id !== 'All' ? 'All' : cat.id"
      >
        <i v-if="cat.icon" :class="cat.icon" style="font-size: 0.7rem" class="mr-1"></i>
        {{ cat.label }}
      </button>
    </div>

    <!-- Event feed card -->
    <div class="card">
      <div class="card-bg"></div>
      <div class="card-content px-4 sm:px-5">
        <!-- Event items -->
        <div
          v-for="event in filteredEvents"
          :key="event.slug"
          class="event-item"
        >
          <div class="flex gap-3 sm:gap-4">
            <!-- Date block -->
            <div class="date-block">
              <span class="month">{{ formatMonth(event.date) }}</span>
              <span class="day">{{ formatDay(event.date) }}</span>
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <!-- Title -->
              <h3 class="font-serif font-bold text-base sm:text-lg leading-snug text-ink mb-1">
                {{ event.title }}
              </h3>

              <!-- Venue + time -->
              <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-faint mb-1.5">
                <span class="inline-flex items-center gap-1">
                  <i class="ph-bold ph-map-pin" style="font-size: 0.75rem"></i>
                  {{ event.venue }}
                </span>
                <span class="inline-flex items-center gap-1">
                  <i class="ph-bold ph-clock" style="font-size: 0.75rem"></i>
                  {{ event.time }}
                </span>
              </div>

              <!-- Category tag + spots + price -->
              <div class="flex flex-wrap items-center gap-2 mb-2">
                <span :class="categoryTagClass(event.category)">
                  {{ categoryLabel(event.category) }}
                </span>
                <span
                  v-if="spotsLeft(event) != null && spotsLeft(event)! > 0"
                  class="tag tag-stamp"
                >
                  {{ spotsLeft(event) }} spots left
                </span>
                <span v-if="event.priceINR > 0" class="tag tag-muted">
                  {{ priceDisplay(event) }}
                </span>
              </div>

              <!-- Description -->
              <p class="text-sm text-ink-faint leading-relaxed mb-2.5 line-clamp-2">
                {{ event.description }}
              </p>

              <!-- Tags as pills -->
              <div class="flex flex-wrap gap-1.5 mb-2.5">
                <span
                  v-for="tag in event.tags"
                  :key="tag"
                  class="tag-pill"
                >
                  {{ tag }}
                </span>
              </div>

              <!-- Bottom row: host, attendance, RSVP -->
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <span class="text-xs text-ink-faint inline-flex items-center gap-1">
                    <i class="ph-bold ph-user" style="font-size: 0.7rem"></i>
                    {{ event.hostName }}
                  </span>
                  <span class="attendance">
                    <i class="ph-bold ph-users"></i>
                    {{ event.attendees }} going
                  </span>
                </div>
                <button :class="buttonClass(event)">
                  {{ buttonLabel(event) }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div v-if="filteredEvents.length === 0" class="py-12 text-center">
          <i class="ph-bold ph-calendar-x text-4xl text-stencil opacity-40 mb-3 block"></i>
          <h3 class="font-serif font-bold text-lg mb-1">No events found</h3>
          <p class="text-sm text-ink-faint">
            Try a different city or category. Or start one yourself.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* City filter pills */
.city-pill {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 600;
  border: 1.5px solid rgba(26, 26, 26, 0.12);
  background: transparent;
  color: #6b5b4a;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}
.city-pill:hover {
  border-color: #1a1a1a;
  color: #1a1a1a;
}
.city-pill.active {
  background: #1a1a1a;
  color: #faf3e8;
  border-color: #1a1a1a;
}

/* Category filter pills */
.filter-pill {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  font-size: 0.72rem;
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

/* Event feed items */
.event-item {
  padding: 1.25rem 0;
  border-bottom: 1px solid rgba(26, 26, 26, 0.07);
  transition: background 0.12s ease;
}
.event-item:last-child {
  border-bottom: none;
}
.event-item:hover {
  background: rgba(250, 243, 232, 0.35);
  margin: 0 -1rem;
  padding: 1.25rem 1rem;
  border-radius: 0.625rem;
}

/* Date block */
.date-block {
  width: 52px;
  height: 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0.625rem;
  border: 1.5px solid rgba(26, 26, 26, 0.12);
  background: rgba(250, 243, 232, 0.6);
  flex-shrink: 0;
}
.date-block .month {
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #ff5900;
  line-height: 1;
}
.date-block .day {
  font-size: 1.25rem;
  font-weight: 800;
  color: #1a1a1a;
  line-height: 1.1;
  font-family: "Fraunces", Georgia, serif;
}

/* Attendance badge */
.attendance {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.68rem;
  font-weight: 600;
  color: #2a5f41;
}
.attendance :deep(i) {
  font-size: 0.75rem;
}

/* Tag pills */
.tag-pill {
  display: inline-flex;
  align-items: center;
  padding: 0.125rem 0.5rem;
  border-radius: 999px;
  font-size: 0.65rem;
  font-weight: 600;
  background: rgba(26, 26, 26, 0.05);
  color: #6b5b4a;
}
</style>
