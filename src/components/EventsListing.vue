<script setup lang="ts">
/**
 * Events calendar/planner island — displays events grouped by date in a
 * clean calendar-list layout (think "Things" or "Fantastical" list view).
 * Receives all events as a prop from the Astro page and manages
 * client-side filtering by city and search text.
 */

import { ref, computed } from "vue";
import type { AbsurdEvent } from "../types";

const props = defineProps<{
  events: AbsurdEvent[];
}>();

// --- State ---
const searchText = ref("");
const activeCity = ref("Bengaluru");

// --- Constants ---
const cities = ["Bengaluru", "Mumbai", "Pune", "Online"];

// --- Computed ---
const filteredEvents = computed(() => {
  let items = [...props.events];

  // City filter
  items = items.filter((e) => e.city === activeCity.value);

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

/** Events grouped by date string, ordered chronologically. */
const eventsByDate = computed(() => {
  const map = new Map<string, AbsurdEvent[]>();
  for (const ev of filteredEvents.value) {
    const key = ev.date;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(ev);
  }
  return map;
});

/** The month+year header for the first visible event (or current month). */
const monthHeader = computed(() => {
  const first = filteredEvents.value[0];
  if (first) {
    const d = new Date(first.date + "T00:00:00");
    return d.toLocaleString("en-IN", { month: "long", year: "numeric" });
  }
  const now = new Date();
  return now.toLocaleString("en-IN", { month: "long", year: "numeric" });
});

/** Detect when the month changes between consecutive date groups so we
 *  can insert a new month header in the list. Returns the month string
 *  for a given date key if it differs from the previous date key. */
function monthBoundary(dateStr: string, idx: number): string | null {
  const keys = Array.from(eventsByDate.value.keys());
  if (idx === 0) return null; // first group already has the top-level header
  const prevMonth = new Date(keys[idx - 1] + "T00:00:00").getMonth();
  const curMonth = new Date(dateStr + "T00:00:00").getMonth();
  if (curMonth !== prevMonth) {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleString("en-IN", { month: "long", year: "numeric" });
  }
  return null;
}

// --- Helpers ---
function formatMonth(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleString("en-IN", { month: "short" });
}

function formatDay(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.getDate().toString();
}

function formatWeekday(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleString("en-IN", { weekday: "long" });
}

function formatFullDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleString("en-IN", { weekday: "short", month: "short", day: "numeric" });
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

function categoryIcon(category: string): string {
  const icons: Record<string, string> = {
    meetup: "ph-bold ph-users-three",
    workshop: "ph-bold ph-wrench",
    hackathon: "ph-bold ph-code",
    talk: "ph-bold ph-microphone-stage",
    conference: "ph-bold ph-presentation-chart",
  };
  return icons[category] ?? "ph-bold ph-calendar";
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

function isToday(dateStr: string): boolean {
  const d = new Date(dateStr + "T00:00:00");
  const now = new Date();
  return (
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  );
}
</script>

<template>
  <div class="calendar-root">
    <!-- City selector pills -->
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
    <div class="relative mb-6">
      <i
        class="ph-bold ph-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2"
        style="font-size: 0.9rem; color: #6B5B4A"
      ></i>
      <input
        v-model="searchText"
        type="text"
        placeholder="Search events, venues, tags..."
        class="search-input"
      />
      <button
        v-if="searchText"
        class="absolute right-3 top-1/2 -translate-y-1/2 clear-btn"
        @click="searchText = ''"
      >
        <i class="ph-bold ph-x" style="font-size: 0.8rem"></i>
      </button>
    </div>

    <!-- Calendar planner card -->
    <div class="card">
      <div class="card-bg"></div>
      <div class="card-content">
        <!-- Month header -->
        <div class="month-header">
          <i class="ph-bold ph-calendar-blank" style="font-size: 1.1rem"></i>
          <span>{{ monthHeader }}</span>
        </div>

        <!-- Date groups -->
        <template v-for="(dateStr, idx) in Array.from(eventsByDate.keys())" :key="dateStr">
          <!-- Inline month separator when month changes -->
          <div v-if="monthBoundary(dateStr, idx)" class="month-separator">
            <div class="month-separator-line"></div>
            <span class="month-separator-label">{{ monthBoundary(dateStr, idx) }}</span>
            <div class="month-separator-line"></div>
          </div>

          <!-- Date row -->
          <div class="date-row" :class="{ 'date-row-today': isToday(dateStr) }">
            <!-- Left: date column (sticky-style) -->
            <div class="date-col">
              <div class="date-day-number">{{ formatDay(dateStr) }}</div>
              <div class="date-weekday">{{ formatWeekday(dateStr) }}</div>
              <div class="date-month-badge">{{ formatMonth(dateStr) }}</div>
            </div>

            <!-- Right: event cards for this date -->
            <div class="events-col">
              <div
                v-for="event in eventsByDate.get(dateStr)"
                :key="event.slug"
                class="event-card"
              >
                <!-- Top line: category icon + title -->
                <div class="event-card-header">
                  <i :class="categoryIcon(event.category)" class="event-card-icon"></i>
                  <h3 class="event-card-title">{{ event.title }}</h3>
                </div>

                <!-- Details row: time, venue -->
                <div class="event-card-details">
                  <span class="detail-item">
                    <i class="ph-bold ph-clock"></i>
                    {{ event.time }}
                  </span>
                  <span class="detail-item">
                    <i class="ph-bold ph-map-pin"></i>
                    {{ event.venue }}
                  </span>
                </div>

                <!-- Meta row: category tag, price, spots, action -->
                <div class="event-card-meta">
                  <div class="meta-tags">
                    <span :class="categoryTagClass(event.category)">
                      {{ categoryLabel(event.category) }}
                    </span>
                    <span class="price-badge" :class="event.priceINR === 0 ? 'price-free' : 'price-paid'">
                      {{ priceDisplay(event) }}
                    </span>
                    <span
                      v-if="spotsLeft(event) != null && spotsLeft(event)! > 0"
                      class="spots-badge"
                    >
                      {{ spotsLeft(event) }} spots left
                    </span>
                    <span v-if="event.attendees > 0" class="attendees-badge">
                      <i class="ph-bold ph-users"></i>
                      {{ event.attendees }}
                    </span>
                  </div>
                  <button :class="buttonClass(event)" class="event-action-btn">
                    {{ buttonLabel(event) }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- Empty state -->
        <div v-if="filteredEvents.length === 0" class="empty-state">
          <i class="ph-bold ph-calendar-x empty-icon"></i>
          <h3 class="empty-title">No events found</h3>
          <p class="empty-text">
            Try a different city or search term. Or start one yourself.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ============================================================
   Calendar / Planner View Styles
   Clean, minimal aesthetic — Things/Fantastical list layout
   ============================================================ */

/* --- City filter pills --- */
.city-pill {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 600;
  border: 1.5px solid rgba(26, 26, 26, 0.15);
  background: transparent;
  color: #1A1A1A;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
  font-family: "DM Sans", system-ui, sans-serif;
}
.city-pill:hover {
  border-color: #1A1A1A;
  background: rgba(26, 26, 26, 0.04);
}
.city-pill.active {
  background: #1A1A1A;
  color: #FAF3E8;
  border-color: #1A1A1A;
}

/* --- Search input --- */
.search-input {
  width: 100%;
  padding: 0.65rem 2.5rem 0.65rem 2.25rem;
  border-radius: 0.75rem;
  border: 1.5px solid rgba(26, 26, 26, 0.12);
  background: #FAF3E8;
  font-size: 0.85rem;
  font-family: "DM Sans", system-ui, sans-serif;
  color: #1A1A1A;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.search-input::placeholder {
  color: #6B5B4A;
  opacity: 0.7;
}
.search-input:focus {
  outline: none;
  border-color: #FF5900;
  box-shadow: 0 0 0 3px rgba(255, 89, 0, 0.1);
}
.clear-btn {
  color: #6B5B4A;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.15s;
}
.clear-btn:hover {
  color: #1A1A1A;
}

/* --- Month header (top of calendar card) --- */
.month-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.25rem 0.75rem;
  font-family: "DM Sans", system-ui, sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #1A1A1A;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  border-bottom: 2px solid #1A1A1A;
}

/* --- Month separator (when month changes mid-list) --- */
.month-separator {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem 0.5rem;
}
.month-separator-line {
  flex: 1;
  height: 1px;
  background: rgba(26, 26, 26, 0.12);
}
.month-separator-label {
  font-family: "DM Sans", system-ui, sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  color: #1A1A1A;
  white-space: nowrap;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

/* --- Date row: one row per date with events --- */
.date-row {
  display: flex;
  gap: 0;
  border-bottom: 1px solid rgba(26, 26, 26, 0.06);
}
.date-row:last-child {
  border-bottom: none;
}

/* Highlight today */
.date-row-today {
  background: rgba(255, 89, 0, 0.04);
}

/* --- Date column (left side) --- */
.date-col {
  width: 80px;
  min-width: 80px;
  padding: 1rem 0 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 1.15rem;
}
.date-day-number {
  font-family: "DM Sans", system-ui, sans-serif;
  font-size: 1.35rem;
  font-weight: 700;
  line-height: 1;
  color: #1A1A1A;
  letter-spacing: -0.02em;
}
.date-row-today .date-day-number {
  color: #FF5900;
}
.date-weekday {
  font-family: "DM Sans", system-ui, sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6B5B4A;
  margin-top: 0.15rem;
}
.date-row-today .date-weekday {
  color: #FF5900;
}
.date-month-badge {
  font-family: "DM Sans", system-ui, sans-serif;
  font-size: 0.6rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #FF5900;
  margin-top: 0.15rem;
  opacity: 0.8;
}

/* --- Events column (right side) --- */
.events-col {
  flex: 1;
  min-width: 0;
  padding: 0.75rem 1.25rem 0.75rem 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* --- Individual event card (compact) --- */
.event-card {
  padding: 0.75rem 0.85rem;
  border-radius: 0.625rem;
  border: 1px solid rgba(26, 26, 26, 0.06);
  background: rgba(250, 243, 232, 0.5);
  transition: background 0.12s ease, border-color 0.12s ease;
}
.event-card:hover {
  background: rgba(250, 243, 232, 0.9);
  border-color: rgba(26, 26, 26, 0.12);
}

/* Card header: icon + title */
.event-card-header {
  display: flex;
  align-items: flex-start;
  gap: 0.45rem;
  margin-bottom: 0.35rem;
}
.event-card-icon {
  font-size: 0.85rem;
  color: #FF5900;
  margin-top: 0.15rem;
  flex-shrink: 0;
}
.event-card-title {
  font-family: "Fraunces", Georgia, serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: #1A1A1A;
  line-height: 1.3;
}

/* Details row: time + venue */
.event-card-details {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  padding-left: 1.3rem; /* align with title after icon */
}
.detail-item {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.75rem;
  font-family: "DM Sans", system-ui, sans-serif;
  color: #1A1A1A;
  opacity: 0.7;
}
.detail-item i {
  font-size: 0.7rem;
  opacity: 0.8;
}

/* Meta row: tags + action button */
.event-card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding-left: 1.3rem;
}
.meta-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;
}

/* Price badge */
.price-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  font-size: 0.65rem;
  font-weight: 700;
  font-family: "DM Sans", system-ui, sans-serif;
}
.price-free {
  background: rgba(42, 95, 65, 0.1);
  color: #2A5F41;
}
.price-paid {
  background: rgba(26, 26, 26, 0.06);
  color: #1A1A1A;
}

/* Spots left badge */
.spots-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  font-size: 0.65rem;
  font-weight: 700;
  font-family: "DM Sans", system-ui, sans-serif;
  background: rgba(255, 89, 0, 0.1);
  color: #FF5900;
}

/* Attendees count */
.attendees-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.65rem;
  font-weight: 600;
  font-family: "DM Sans", system-ui, sans-serif;
  color: #2A5F41;
}
.attendees-badge i {
  font-size: 0.65rem;
}

/* Action button in event card */
.event-action-btn {
  flex-shrink: 0;
  font-size: 0.72rem !important;
  padding: 0.35rem 0.85rem !important;
}

/* --- Empty state --- */
.empty-state {
  padding: 3rem 1.25rem;
  text-align: center;
}
.empty-icon {
  font-size: 2.5rem;
  color: #6B5B4A;
  opacity: 0.3;
  display: block;
  margin-bottom: 0.75rem;
}
.empty-title {
  font-family: "Fraunces", Georgia, serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #1A1A1A;
  margin-bottom: 0.35rem;
}
.empty-text {
  font-size: 0.85rem;
  font-family: "DM Sans", system-ui, sans-serif;
  color: #6B5B4A;
}

/* ============================================================
   Responsive: stack on very small screens
   ============================================================ */
@media (max-width: 480px) {
  .date-row {
    flex-direction: column;
  }
  .date-col {
    width: 100%;
    min-width: unset;
    flex-direction: row;
    align-items: baseline;
    gap: 0.5rem;
    padding: 0.75rem 1rem 0;
  }
  .date-day-number {
    font-size: 1.15rem;
  }
  .date-weekday {
    margin-top: 0;
  }
  .date-month-badge {
    margin-top: 0;
  }
  .events-col {
    padding: 0.5rem 1rem 0.75rem;
  }
  .event-card-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  .event-action-btn {
    align-self: flex-end;
  }
}
</style>
