<script setup lang="ts">
/**
 * Always-visible bottom navigation bar with mega menu.
 * Vue island — needed for the mega menu toggle interaction.
 * Hydrated with client:load since it's always visible.
 *
 * Primary tabs never change — Flutter-style persistent bottom nav.
 * Hides on scroll down, reappears on scroll up.
 */

import { ref, onMounted, onUnmounted } from "vue";
import { bottomBarTabs, megaMenuItems } from "../data/navigation";

const props = defineProps<{
  activeTab?: string;
}>();

const megaMenuOpen = ref(false);
const hidden = ref(false);

let lastScrollY = 0;
let ticking = false;

function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const y = window.scrollY;
    if (y > lastScrollY && y > 80) {
      hidden.value = true;
      megaMenuOpen.value = false;
    } else {
      hidden.value = false;
    }
    lastScrollY = y;
    ticking = false;
  });
}

function closeMegaMenu() {
  megaMenuOpen.value = false;
}

onMounted(() => {
  lastScrollY = window.scrollY;
  window.addEventListener('scroll', onScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
});
</script>

<template>
  <nav :class="['bottom-bar', { 'bottom-bar--hidden': hidden }]">
    <div class="grid grid-cols-5">
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
