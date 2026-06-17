import { ref, onMounted, onUnmounted, type Ref } from "vue";

export function useScrollHideSearch(
  searchText: Ref<string>,
  isFilterActive: Ref<boolean>
) {
  const hidden = ref(false);
  let lastScrollY = 0;
  let ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (searchText.value.trim() || isFilterActive.value) {
        hidden.value = false;
      } else if (y > 80 && y > lastScrollY) {
        hidden.value = true;
      } else {
        hidden.value = false;
      }
      lastScrollY = y;
      ticking = false;
    });
  }

  onMounted(() => {
    lastScrollY = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", onScroll);
  });

  return { hidden };
}
