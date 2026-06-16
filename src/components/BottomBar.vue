<script setup lang="ts">
/**
 * Always-visible bottom navigation bar with mega menu.
 * Vue island — needed for the mega menu toggle interaction.
 * Hydrated with client:load since it's always visible.
 */

import { ref } from "vue";
import { bottomBarTabs, megaMenuItems } from "../data/navigation";

const props = defineProps<{
  /** Currently active tab slug, e.g. "campaigns" or "events" */
  activeTab?: string;
}>();

const megaMenuOpen = ref(false);

function closeMegaMenu() {
  megaMenuOpen.value = false;
}
</script>

<template>
  <nav class="bottom-bar" style="position: relative">
    <div class="grid grid-cols-5">
      <a
        v-for="tab in bottomBarTabs"
        :key="tab.href"
        :href="tab.href"
        :class="{ 'active-tab': activeTab === tab.href.replace('/', '') }"
      >
        <i :class="tab.icon"></i>
        <span>{{ tab.label }}</span>
      </a>
      <button @click="megaMenuOpen = !megaMenuOpen">
        <i :class="megaMenuOpen ? 'ph-bold ph-x' : 'ph-bold ph-dots-three'"></i>
        <span>More</span>
      </button>
    </div>

    <Transition name="slide">
      <div v-if="megaMenuOpen" class="mega-menu" @click="closeMegaMenu">
        <a
          v-for="item in megaMenuItems"
          :key="item.href"
          :href="item.href"
          :target="item.isExternal ? '_blank' : undefined"
          :rel="item.isExternal ? 'noopener' : undefined"
        >
          <i :class="item.icon"></i>
          {{ item.label }}
        </a>
      </div>
    </Transition>
  </nav>
</template>
