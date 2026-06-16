<script setup lang="ts">
/**
 * Desktop-only floating navigation with dockable positions.
 * Hidden on mobile — the BottomBar handles phone navigation.
 * Users can dock the nav to left, right, top, or bottom via a picker.
 * Position is saved to localStorage.
 */

import { ref, computed, onMounted, watch } from "vue";
import { bottomBarTabs, megaMenuItems } from "../data/navigation";

type DockPosition = "left" | "right" | "top" | "bottom";

const props = defineProps<{
  activeTab?: string;
}>();

const dock = ref<DockPosition>("right");
const expanded = ref(false);

const dockOptions: { pos: DockPosition; icon: string }[] = [
  { pos: "left", icon: "ph-bold ph-arrow-line-left" },
  { pos: "top", icon: "ph-bold ph-arrow-line-up" },
  { pos: "bottom", icon: "ph-bold ph-arrow-line-down" },
  { pos: "right", icon: "ph-bold ph-arrow-line-right" },
];

onMounted(() => {
  const saved = localStorage.getItem("absurd-nav-dock");
  if (saved && ["left", "right", "top", "bottom"].includes(saved)) {
    dock.value = saved as DockPosition;
  }
});

watch(dock, (val) => {
  localStorage.setItem("absurd-nav-dock", val);
});

function setDock(pos: DockPosition) {
  dock.value = pos;
}

function toggle() {
  expanded.value = !expanded.value;
}

function isActive(href: string): boolean {
  if (href === "/") return !props.activeTab;
  const slug = href.replace(/\//g, "");
  return props.activeTab === slug;
}

const isVertical = computed(() => dock.value === "left" || dock.value === "right");

const panelPosition = computed(() => {
  const offset = "1rem";
  switch (dock.value) {
    case "left":
      return { top: offset, left: offset, bottom: offset };
    case "right":
      return { top: offset, right: offset, bottom: offset };
    case "top":
      return { top: offset, left: offset, right: offset };
    case "bottom":
      return { bottom: offset, left: offset, right: offset };
  }
});

const buttonPosition = computed(() => {
  switch (dock.value) {
    case "left":
      return { bottom: "1rem", left: "1rem" };
    case "right":
      return { bottom: "1rem", right: "1rem" };
    case "top":
      return { top: "1rem", right: "1rem" };
    case "bottom":
      return { bottom: "1rem", right: "1rem" };
  }
});
</script>

<template>
  <div class="hidden lg:block" style="z-index: 50; position: relative">
    <!-- Collapsed: floating pill button -->
    <button
      v-if="!expanded"
      class="nav-toggle"
      :style="buttonPosition"
      @click="toggle"
      title="Open navigation"
    >
      <i class="ph-bold ph-compass"></i>
    </button>

    <!-- Expanded: dockable nav panel -->
    <Transition name="nav-fade">
      <nav
        v-if="expanded"
        class="nav-panel"
        :class="[`dock-${dock}`, isVertical ? 'vertical' : 'horizontal']"
        :style="panelPosition"
      >
        <!-- Close button -->
        <button class="nav-close" @click="toggle">
          <i class="ph-bold ph-x"></i>
        </button>

        <!-- Primary tabs -->
        <div class="nav-links" :class="isVertical ? 'flex-col' : 'flex-row'">
          <a
            v-for="tab in bottomBarTabs"
            :key="tab.href"
            :href="tab.href"
            class="nav-link"
            :class="{ active: isActive(tab.href) }"
          >
            <i :class="tab.icon"></i>
            <span>{{ tab.label }}</span>
          </a>
        </div>

        <hr class="nav-divider" />

        <!-- Secondary links -->
        <div class="nav-links" :class="isVertical ? 'flex-col' : 'flex-row'">
          <a
            v-for="item in megaMenuItems"
            :key="item.href"
            :href="item.href"
            class="nav-link secondary"
            :target="item.isExternal ? '_blank' : undefined"
            :rel="item.isExternal ? 'noopener' : undefined"
          >
            <i :class="item.icon"></i>
            <span>{{ item.label }}</span>
          </a>
        </div>

        <hr class="nav-divider" />

        <!-- Dock position picker -->
        <div class="dock-picker">
          <button
            v-for="d in dockOptions"
            :key="d.pos"
            class="dock-btn"
            :class="{ active: dock === d.pos }"
            @click="setDock(d.pos)"
            :title="`Dock ${d.pos}`"
          >
            <i :class="d.icon"></i>
          </button>
        </div>
      </nav>
    </Transition>
  </div>
</template>

<style scoped>
.nav-toggle {
  position: fixed;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #1A1A1A;
  color: rgba(250, 243, 232, 0.7);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  transition: transform 0.2s ease, color 0.15s ease;
  z-index: 50;
}
.nav-toggle:hover {
  color: #FF5900;
  transform: scale(1.08);
}

.nav-panel {
  position: fixed;
  background: #1A1A1A;
  border-radius: 0.875rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.25);
  padding: 0.75rem;
  z-index: 50;
  display: flex;
  gap: 0.25rem;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none;
}
.nav-panel::-webkit-scrollbar {
  display: none;
}

.nav-panel.vertical {
  flex-direction: column;
  width: 160px;
}
.nav-panel.horizontal {
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
}

.nav-close {
  background: none;
  border: none;
  color: rgba(250, 243, 232, 0.4);
  cursor: pointer;
  padding: 0.35rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  transition: color 0.15s;
  align-self: flex-end;
}
.nav-close:hover {
  color: #FF5900;
}

.nav-links {
  display: flex;
  gap: 0.15rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 0.6rem;
  color: rgba(250, 243, 232, 0.55);
  text-decoration: none;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  border-radius: 0.5rem;
  transition: color 0.15s, background 0.15s;
  white-space: nowrap;
}
.nav-link i {
  font-size: 1rem;
  flex-shrink: 0;
}
.nav-link:hover {
  color: rgba(250, 243, 232, 0.9);
  background: rgba(250, 243, 232, 0.06);
}
.nav-link.active {
  color: #FF5900;
}
.nav-link.secondary {
  font-size: 0.65rem;
  color: rgba(250, 243, 232, 0.4);
}
.nav-link.secondary:hover {
  color: rgba(250, 243, 232, 0.75);
}

.nav-divider {
  border: none;
  border-top: 1px solid rgba(250, 243, 232, 0.1);
  margin: 0.35rem 0;
}
.horizontal .nav-divider {
  border-top: none;
  border-left: 1px solid rgba(250, 243, 232, 0.1);
  height: 24px;
  margin: 0 0.35rem;
  align-self: center;
}

.dock-picker {
  display: flex;
  gap: 0.25rem;
  padding: 0.25rem 0;
}
.vertical .dock-picker {
  justify-content: center;
}
.horizontal .dock-picker {
  margin-left: auto;
}

.dock-btn {
  width: 28px;
  height: 28px;
  border-radius: 0.35rem;
  background: rgba(250, 243, 232, 0.06);
  border: none;
  color: rgba(250, 243, 232, 0.35);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  transition: color 0.15s, background 0.15s;
}
.dock-btn:hover {
  color: rgba(250, 243, 232, 0.8);
  background: rgba(250, 243, 232, 0.1);
}
.dock-btn.active {
  color: #FF5900;
  background: rgba(255, 89, 0, 0.15);
}

/* Transition */
.nav-fade-enter-active,
.nav-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.nav-fade-enter-from,
.nav-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
