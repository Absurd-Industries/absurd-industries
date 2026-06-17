<script setup lang="ts">
/**
 * Events listing island — clean card layout matching homepage events style.
 * City filter + search, events rendered as simple date-box microcards.
 */

import { ref, computed } from "vue";
import type { AbsurdEvent } from "../types";

const props = defineProps<{
  events: AbsurdEvent[];
}>();

const searchText = ref("");
const activeCity = ref("Bengaluru");

const cities = ["Bengaluru", "Mumbai", "Pune", "Online"];

const filteredEvents = computed(() => {
  let items = [...props.events];

  items = items.filter((e) => e.city === activeCity.value);

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

  items.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return items;
});

function formatMonth(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleString("en-IN", { month: "short" }).toUpperCase();
}

function formatDay(dateStr: string): string {
  return new Date(dateStr + "T00:00:00").getDate().toString();
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

function priceDisplay(event: AbsurdEvent): string {
  return event.priceINR === 0 ? "Free" : `₹${event.priceINR}`;
}

function spotsLeft(event: AbsurdEvent): number | null {
  if (event.maxAttendees == null) return null;
  return event.maxAttendees - event.attendees;
}
</script>

<template>
  <div>
    <!-- City selector pills -->
    <div class="flex flex-wrap gap-2 mb-4">
      <button
        v-for="city in cities"
        :key="city"
        class="filter-pill"
        :class="{ active: activeCity === city }"
        @click="activeCity = city"
      >
        <i class="ph-bold ph-map-pin mr-1" style="font-size: 0.65rem"></i>
        {{ city }}
      </button>
    </div>

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
          placeholder="Search events, venues, tags..."
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

    <!-- Results count -->
    <p
      v-if="filteredEvents.length > 0"
      class="text-sm text-ink-faint mb-4"
    >
      {{ filteredEvents.length }}
      event{{ filteredEvents.length !== 1 ? "s" : "" }} in {{ activeCity }}
    </p>

    <!-- Event cards -->
    <div class="space-y-3">
      <div
        v-for="event in filteredEvents"
        :key="event.slug"
        class="event-item"
      >
        <div class="event-date-box">
          <span class="event-date-month">{{ formatMonth(event.date) }}</span>
          <span class="event-date-day">{{ formatDay(event.date) }}</span>
        </div>
        <div class="flex-1 min-w-0">
          <h3 class="font-serif font-bold text-base leading-snug text-ink mb-0.5">
            {{ event.title }}
          </h3>
          <p class="text-sm text-stencil mb-1.5">{{ event.time }}</p>
          <div class="flex flex-wrap items-center gap-2 text-xs text-stencil">
            <span class="flex items-center gap-1">
              <i class="ph-bold ph-map-pin" style="font-size:0.6rem;"></i>
              {{ event.venue }}
            </span>
            <span>&middot;</span>
            <span class="capitalize">{{ categoryLabel(event.category) }}</span>
            <span class="event-price-tag" :class="event.priceINR === 0 ? 'price-free' : 'price-paid'">
              {{ priceDisplay(event) }}
            </span>
          </div>
          <p class="text-xs text-ink-faint leading-relaxed mt-1.5 line-clamp-2">
            {{ event.description }}
          </p>
          <div class="flex flex-wrap items-center gap-3 mt-2">
            <span v-if="event.attendees > 0" class="text-xs text-stencil flex items-center gap-1">
              <i class="ph-bold ph-users" style="font-size:0.65rem;"></i>
              {{ event.attendees }} attending
            </span>
            <span v-if="spotsLeft(event) != null && spotsLeft(event)! > 0" class="text-xs font-semibold text-stamp">
              {{ spotsLeft(event) }} spots left
            </span>
            <span class="text-xs text-stencil">
              Hosted by <strong class="text-ink">{{ event.hostName }}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="filteredEvents.length === 0" class="py-12 text-center">
      <i class="ph-bold ph-calendar-x text-4xl text-stencil opacity-40 mb-3 block"></i>
      <h3 class="font-serif font-bold text-lg mb-1">No events found</h3>
      <p class="text-sm text-ink-faint">
        Try a different city or search term.
      </p>
    </div>
  </div>
</template>

<style scoped>
.event-item {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  padding: 1rem 1.25rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(26, 26, 26, 0.06);
  background: rgba(250, 243, 232, 0.65);
  transition: border-color 0.15s, background 0.15s;
}
.event-item:hover {
  border-color: rgba(26, 26, 26, 0.15);
  background: rgba(250, 243, 232, 0.9);
}

.event-date-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 52px;
  min-width: 52px;
  height: 52px;
  border-radius: 0.625rem;
  background: rgba(255, 89, 0, 0.08);
  flex-shrink: 0;
}
.event-date-month {
  font-size: 0.55rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #FF5900;
  line-height: 1;
  letter-spacing: 0.03em;
}
.event-date-day {
  font-size: 1.25rem;
  font-weight: 900;
  color: #1A1A1A;
  line-height: 1;
}

.event-price-tag {
  display: inline-flex;
  align-items: center;
  padding: 0.1rem 0.45rem;
  border-radius: 999px;
  font-size: 0.6rem;
  font-weight: 700;
}
.price-free {
  background: rgba(42, 95, 65, 0.1);
  color: #2A5F41;
}
.price-paid {
  background: rgba(26, 26, 26, 0.06);
  color: #1A1A1A;
}

/* Filter pills */
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

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.search-wrap {
  padding: 0.75rem 0;
}
</style>
