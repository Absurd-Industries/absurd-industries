<script setup lang="ts">
/**
 * Developer debug overlay panel.
 * Shows current route, page info, rendering mode, and performance timing.
 *
 * Toggle via: ?debug=true query param or localStorage.setItem('absurd-debug', 'true')
 * Only rendered in dev/preview builds (tree-shaken from production via __DEBUG__).
 */

import { ref, onMounted, computed } from "vue";

const props = defineProps<{
  /** Current page route path */
  route: string;
  /** Rendering mode for this page */
  renderMode: "static" | "ssr";
  /** Page title */
  pageTitle: string;
}>();

const isVisible = ref(false);
const isMinimized = ref(false);
const loadTime = ref(0);
const hydratedIslands = ref(0);

const shouldShow = computed(() => {
  if (typeof __DEBUG__ !== "undefined" && !__DEBUG__) return false;
  return isVisible.value;
});

onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  const debugParam = params.get("debug") === "true";
  const debugStored = localStorage.getItem("absurd-debug") === "true";
  isVisible.value = debugParam || debugStored;

  if (debugParam && !debugStored) {
    localStorage.setItem("absurd-debug", "true");
  }

  loadTime.value = Math.round(performance.now());
  hydratedIslands.value = document.querySelectorAll("astro-island").length;
});

function toggleMinimize() {
  isMinimized.value = !isMinimized.value;
}

function dismiss() {
  isVisible.value = false;
  localStorage.removeItem("absurd-debug");
}
</script>

<template>
  <div v-if="shouldShow" class="debug-panel" :class="{ minimized: isMinimized }">
    <div class="debug-header" @click="toggleMinimize">
      <span class="debug-title">Absurd Debug</span>
      <div class="debug-actions">
        <button @click.stop="dismiss" title="Dismiss">&times;</button>
      </div>
    </div>
    <div v-if="!isMinimized" class="debug-body">
      <div class="debug-row">
        <span class="debug-label">Route</span>
        <span class="debug-value">{{ route }}</span>
      </div>
      <div class="debug-row">
        <span class="debug-label">Title</span>
        <span class="debug-value">{{ pageTitle }}</span>
      </div>
      <div class="debug-row">
        <span class="debug-label">Render</span>
        <span class="debug-value" :class="renderMode === 'ssr' ? 'text-stamp' : 'text-funded'">
          {{ renderMode.toUpperCase() }}
        </span>
      </div>
      <div class="debug-row">
        <span class="debug-label">Islands</span>
        <span class="debug-value">{{ hydratedIslands }}</span>
      </div>
      <div class="debug-row">
        <span class="debug-label">Load</span>
        <span class="debug-value">{{ loadTime }}ms</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.debug-panel {
  position: fixed;
  top: 4rem;
  right: 1rem;
  z-index: 9999;
  background: #1a1a1a;
  color: #faf3e8;
  border-radius: 0.5rem;
  font-family: "DM Sans", monospace;
  font-size: 0.75rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
  min-width: 200px;
  overflow: hidden;
}
.debug-panel.minimized {
  min-width: auto;
}
.debug-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  background: #ff5900;
  cursor: pointer;
  user-select: none;
}
.debug-title {
  font-weight: 700;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.debug-actions button {
  background: none;
  border: none;
  color: #faf3e8;
  font-size: 1rem;
  cursor: pointer;
  padding: 0 0.25rem;
  line-height: 1;
}
.debug-body {
  padding: 0.5rem 0.75rem;
}
.debug-row {
  display: flex;
  justify-content: space-between;
  padding: 0.25rem 0;
  border-bottom: 1px solid rgba(250, 243, 232, 0.08);
}
.debug-row:last-child {
  border-bottom: none;
}
.debug-label {
  color: rgba(250, 243, 232, 0.5);
  text-transform: uppercase;
  font-size: 0.65rem;
  letter-spacing: 0.05em;
}
.debug-value {
  font-weight: 600;
}
.text-stamp {
  color: #ff5900;
}
.text-funded {
  color: #4ade80;
}
</style>
