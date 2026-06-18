// ===================================================================
// ABSURD INVENTORY - VUE 3 APPLICATION
// "Where Chaos Meets Organization in a Beautiful Dance"
// ===================================================================

const { createApp } = Vue;

createApp({
  data() {
    return {
      // Core inventory data
      items: inventoryData,
      categories: categories,

      // UI State
      viewMode: "card", // 'card' or 'table'
      activeCategory: "all",
      searchQuery: "",
      sortField: "name",
      sortDirection: "asc",

      // Theme
      isDark: true,

      // Loading state
      isLoading: true,
      loadingMessage: "",

      // Panic mode 🔥
      isPanicking: false,
      panickedItems: [],

      // Mobile gesture tracking
      touchStartX: 0,
      touchStartY: 0,
      touchCurrentX: 0,
      swipeDistance: 0,
      swipeTarget: null,
      isSwipping: false,
      swipeThreshold: 80, // pixels to trigger action
    };
  },

  computed: {
    // Filter items by category and search
    filteredItems() {
      let filtered = this.items;

      // Category filter
      if (this.activeCategory !== "all") {
        filtered = filtered.filter(
          (item) => item.category === this.activeCategory
        );
      }

      // Search filter (fuzzy-ish search across multiple fields)
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter((item) => {
          return (
            item.name.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query) ||
            (item.subcategory &&
              item.subcategory.toLowerCase().includes(query)) ||
            item.location.toLowerCase().includes(query) ||
            (item.notes && item.notes.toLowerCase().includes(query)) ||
            (item.specs &&
              JSON.stringify(item.specs).toLowerCase().includes(query))
          );
        });
      }

      return filtered;
    },

    // Sort and prioritize pinned items
    sortedItems() {
      const items = [...this.filteredItems];

      // Sort by field
      items.sort((a, b) => {
        let aVal = a[this.sortField];
        let bVal = b[this.sortField];

        // Handle "unknown" quantity
        if (this.sortField === "quantity") {
          aVal = aVal === "unknown" ? -1 : aVal;
          bVal = bVal === "unknown" ? -1 : bVal;
        }

        // String comparison
        if (typeof aVal === "string") {
          return this.sortDirection === "asc"
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }

        // Number comparison
        return this.sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      });

      // Pinned items always float to top
      return items.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return 0;
      });
    },
  },

  methods: {
    // ===============================================================
    // THEME TOGGLE
    // ===============================================================
    toggleTheme() {
      this.isDark = !this.isDark;
      const html = document.documentElement;
      const icon = document.querySelector(".theme-icon");

      if (icon) icon.classList.add("rotating");

      setTimeout(() => {
        if (this.isDark) {
          html.classList.add("dark");
          localStorage.setItem("theme", "dark");
        } else {
          html.classList.remove("dark");
          localStorage.setItem("theme", "light");
        }

        if (icon) {
          setTimeout(() => icon.classList.remove("rotating"), 300);
        }
      }, 150);
    },

    // ===============================================================
    // VIEW TOGGLE
    // ===============================================================
    toggleView() {
      this.viewMode = this.viewMode === "card" ? "table" : "card";
      localStorage.setItem("viewMode", this.viewMode);
    },

    // ===============================================================
    // PANIC MODE 🔥⚡️💀
    // ===============================================================
    panicMode() {
      this.isPanicking = true;
      this.panickedItems = [];

      // Randomly select 3-5 items
      const count = Math.floor(Math.random() * 3) + 3; // 3-5 items
      const availableItems = [...this.items];

      for (let i = 0; i < count && availableItems.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * availableItems.length);
        this.panickedItems.push(availableItems[randomIndex].id);
        availableItems.splice(randomIndex, 1);
      }

      // Show notification/toast (could be enhanced in Phase 3)
      console.log("🚨 PANIC MODE ACTIVATED!", this.panickedItems);

      // Auto-dismiss after 10 seconds
      setTimeout(() => {
        this.isPanicking = false;
      }, 10000);
    },

    // ===============================================================
    // PIN/UNPIN ITEMS
    // ===============================================================
    togglePin(item) {
      item.isPinned = !item.isPinned;
      this.savePinnedState();
    },

    savePinnedState() {
      const pinnedIds = this.items
        .filter((item) => item.isPinned)
        .map((item) => item.id);
      localStorage.setItem("pinnedItems", JSON.stringify(pinnedIds));
    },

    loadPinnedState() {
      const saved = localStorage.getItem("pinnedItems");
      if (saved) {
        const pinnedIds = JSON.parse(saved);
        this.items.forEach((item) => {
          item.isPinned = pinnedIds.includes(item.id);
        });
      }
    },

    // ===============================================================
    // SORTING
    // ===============================================================
    sortBy(field) {
      if (this.sortField === field) {
        // Toggle direction if same field
        this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      } else {
        // New field, default to ascending
        this.sortField = field;
        this.sortDirection = "asc";
      }
    },

    // ===============================================================
    // MOBILE GESTURE HANDLERS
    // ===============================================================
    handleTouchStart(event, item) {
      // Only handle single touch
      if (event.touches.length !== 1) return;

      const touch = event.touches[0];
      this.touchStartX = touch.clientX;
      this.touchStartY = touch.clientY;
      this.touchCurrentX = touch.clientX;
      this.swipeTarget = item.id;
      this.isSwipping = false;

      // Add no-select class to prevent text selection
      event.currentTarget.classList.add("no-select");
    },

    handleTouchMove(event, item) {
      if (!this.swipeTarget || event.touches.length !== 1) return;

      const touch = event.touches[0];
      this.touchCurrentX = touch.clientX;
      const deltaX = this.touchCurrentX - this.touchStartX;
      const deltaY = touch.clientY - this.touchStartY;

      // Determine if it's a horizontal swipe
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
        this.isSwipping = true;
        this.swipeDistance = deltaX;

        // Prevent default scrolling when swiping horizontally
        event.preventDefault();
      }
    },

    handleTouchEnd(event, item) {
      if (!this.swipeTarget) return;

      const deltaX = this.touchCurrentX - this.touchStartX;

      // Check if swipe threshold was met
      if (Math.abs(deltaX) > this.swipeThreshold && this.isSwipping) {
        if (deltaX > 0) {
          // Swipe RIGHT - Pin/Unpin
          this.togglePin(item);
          this.showSwipeFeedback(item, "pinned");
        } else {
          // Swipe LEFT - Delete (would implement in Phase 3)
          console.log("Delete action for:", item.name);
          // For now, just show feedback
          this.showSwipeFeedback(item, "deleted");
        }
      }

      // Reset swipe state
      this.swipeDistance = 0;
      this.swipeTarget = null;
      this.isSwipping = false;
      this.touchStartX = 0;
      this.touchCurrentX = 0;

      // Remove no-select class
      event.currentTarget.classList.remove("no-select");
    },

    showSwipeFeedback(item, action) {
      // Could add toast notifications here in Phase 3
      console.log(`${action}:`, item.name);
    },

    // ===============================================================
    // UTILITY FUNCTIONS
    // ===============================================================
    formatQuantity(qty) {
      return qty === "unknown" ? "Unknown" : qty;
    },

    getCategoryIcon(category) {
      const cat = this.categories.find((c) => c.id === category);
      return cat ? cat.icon : "fas fa-box";
    },

    getStatusIcon(status) {
      const icons = {
        available: "fas fa-check-circle",
        "low-stock": "fas fa-exclamation-triangle",
        "out-of-stock": "fas fa-times-circle",
        "in-use": "fas fa-wrench",
      };
      return icons[status] || "fas fa-question-circle";
    },

    getStatusClass(status) {
      const classes = {
        available: "badge-available",
        "low-stock": "badge-low-stock",
        "out-of-stock": "badge-out-of-stock",
        "in-use": "badge-in-use",
      };
      return classes[status] || "badge-available";
    },

    // ===============================================================
    // INITIALIZATION
    // ===============================================================
    async init() {
      // Show random loading message
      this.loadingMessage =
        loadingMessages[Math.floor(Math.random() * loadingMessages.length)];

      // Simulate loading (in real app, this would be API call)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Load saved preferences
      this.loadPinnedState();

      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        this.isDark = savedTheme === "dark";
        if (this.isDark) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }

      const savedView = localStorage.getItem("viewMode");
      if (savedView) {
        this.viewMode = savedView;
      }

      // Done loading
      this.isLoading = false;
    },
  },

  // ===============================================================
  // LIFECYCLE HOOKS
  // ===============================================================
  mounted() {
    this.init();

    // Add keyboard shortcuts (because we're fancy like that)
    window.addEventListener("keydown", (e) => {
      // Ctrl/Cmd + K - Focus search
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="search"]');
        if (searchInput) searchInput.focus();
      }

      // Ctrl/Cmd + P - Panic mode!
      if ((e.ctrlKey || e.metaKey) && e.key === "p") {
        e.preventDefault();
        this.panicMode();
      }

      // Ctrl/Cmd + V - Toggle view
      if ((e.ctrlKey || e.metaKey) && e.key === "v") {
        e.preventDefault();
        this.toggleView();
      }
    });

    // Log welcome message (because we're cheeky)
    console.log(
      "%c🚀 ABSURD INVENTORY SYSTEM ONLINE",
      "color: #ff4500; font-size: 16px; font-weight: bold;"
    );
    console.log(
      '%c"Organizing Chaos, One Component at a Time"',
      "color: #9ca3af; font-style: italic;"
    );
    console.log("%cKeyboard Shortcuts:", "font-weight: bold; margin-top: 8px;");
    console.log("  Ctrl/Cmd + K - Focus search");
    console.log("  Ctrl/Cmd + P - PANIC MODE! 🔥");
    console.log("  Ctrl/Cmd + V - Toggle view");
    console.log("%cMobile Gestures:", "font-weight: bold; margin-top: 8px;");
    console.log("  Swipe Right → Pin item");
    console.log("  Swipe Left  → Delete item (Phase 3)");
    console.log(
      "%c\nBuilt with 🧡 for Hack for Nothing 2025",
      "color: #ff4500; margin-top: 12px;"
    );
  },
}).mount("#app");

// ===================================================================
// GLOBAL UTILITIES (Outside Vue instance)
// ===================================================================

// Service Worker for offline support (Phase 3)
// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/sw.js');
// }

// ===================================================================
// END OF APP
// "May your components be plentiful and your resistors never burn"
// ===================================================================
