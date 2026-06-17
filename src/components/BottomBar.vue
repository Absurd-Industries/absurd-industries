<script setup lang="ts">
/**
 * Always-visible bottom navigation bar with mega menu.
 * Vue island — needed for the mega menu toggle interaction.
 * Hydrated with client:load since it's always visible.
 *
 * When a `contextNav` prop is provided the bar swaps its primary tabs
 * for a back button + section-specific filter pills (e.g. "All / Live / Funded"
 * for campaigns). The "More" mega menu remains available in both modes.
 */

import { ref } from "vue";
import { bottomBarTabs, megaMenuItems } from "../data/navigation";
import type { ContextNavConfig } from "../data/navigation";

const props = defineProps<{
  /** Currently active tab slug, e.g. "campaigns" or "events" */
  activeTab?: string;
  /** Context navigation config — swaps primary tabs for section-specific items */
  contextNav?: ContextNavConfig;
  /** Active filter value for context nav pill highlighting */
  activeFilter?: string;
}>();

const emit = defineEmits<{
  (e: "filterChange", value: string): void;
}>();

const megaMenuOpen = ref(false);

function closeMegaMenu() {
  megaMenuOpen.value = false;
}
</script>

<template>
  <nav class="bottom-bar">
    <Transition name="swap" mode="out-in">
      <!-- ═══ Context-aware layout (section pages) ═══ -->
      <div v-if="contextNav" key="context" class="grid" :style="{ gridTemplateColumns: contextNav.items.length > 0 ? `auto repeat(${contextNav.items.length}, 1fr) auto` : 'auto 1fr auto' }">
        <!-- Back button -->
        <a :href="contextNav.backHref" class="back-cell">
          <i class="ph-bold ph-arrow-left"></i>
          <span>{{ contextNav.backLabel }}</span>
        </a>

        <!-- Filter pills (when items exist) -->
        <button
          v-for="item in contextNav.items"
          :key="item.value"
          :class="{ 'active-tab': activeFilter === item.value }"
          @click="emit('filterChange', item.value)"
        >
          <i :class="item.icon"></i>
          <span>{{ item.label }}</span>
        </button>

        <!-- Spacer when no filter items -->
        <span v-if="contextNav.items.length === 0"></span>

        <!-- More button -->
        <button @click="megaMenuOpen = !megaMenuOpen">
          <i :class="megaMenuOpen ? 'ph-bold ph-x' : 'ph-bold ph-dots-three'"></i>
          <span>More</span>
        </button>
      </div>

      <!-- ═══ Default layout (home / unconfigured pages) ═══ -->
      <div v-else key="default" class="grid grid-cols-5">
        <a
          v-for="tab in bottomBarTabs"
          :key="tab.href"
          :href="tab.href"
          :class="{ 'active-tab': tab.href === '/' ? !activeTab : activeTab === tab.href.replace('/', '') }"
        >
          <i :class="tab.icon"></i>
          <span>{{ tab.label }}</span>
        </a>
        <button @click="megaMenuOpen = !megaMenuOpen">
          <i :class="megaMenuOpen ? 'ph-bold ph-x' : 'ph-bold ph-dots-three'"></i>
          <span>More</span>
        </button>
      </div>
    </Transition>

    <Transition name="slide">
      <div v-if="megaMenuOpen" class="mega-menu-wrapper">
        <div class="mega-menu" @click.stop>
          <a
            v-for="item in megaMenuItems"
            :key="item.href"
            :href="item.href"
            :target="item.isExternal ? '_blank' : undefined"
            :rel="item.isExternal ? 'noopener' : undefined"
            @click="closeMegaMenu"
          >
            <i :class="item.icon"></i>
            {{ item.label }}
          </a>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
/* Back cell — inherits bottom-bar link styling but aligns horizontally */
.back-cell {
  flex-direction: row !important;
  gap: 0.35rem;
}

/* Transition for swapping between default and context layouts */
.swap-enter-active {
  transition: opacity 0.15s ease;
}
.swap-leave-active {
  transition: opacity 0.1s ease;
}
.swap-enter-from,
.swap-leave-to {
  opacity: 0;
}
</style>
