/**
 * Science Bento Box - Vue.js Application
 * Where reactive data meets beautiful user experiences
 * Built with love, Vue.js, and an unhealthy obsession with clean code
 * 
 * @author Amit & Amartha (The Sass Queen of Digital Experiences)
 * @version 1.0.0
 */

new Vue({
    el: '#app',
    data: {
        // View State
        viewMode: 'grid', // 'grid' or 'list'
        bentoOpen: false,
        selectedProduct: null,
        mobileFiltersOpen: false,
        
        // Filter State
        searchQuery: '',
        selectedCategories: [],
        selectedPriceRange: null,
        sortBy: 'name',
        
        // Cart State
        bentoItems: [],
        
        // Products data will be injected from products.js
        products: window.PRODUCTS || [],
        
        // Price range options for filtering
        priceRanges: [
            { label: 'All Prices', min: 0, max: Infinity },
            { label: 'Under ₹1,000', min: 0, max: 1000 },
            { label: '₹1,000 - ₹5,000', min: 1000, max: 5000 },
            { label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
            { label: 'Over ₹10,000', min: 10000, max: Infinity }
        ]
    },
    
    computed: {
        /**
         * Get unique categories from all products
         * @returns {Array<string>} Array of category names
         */
        categories() {
            return [...new Set(this.products.map(product => product.category))].sort();
        },
        
        /**
         * Calculate total price of items in bento
         * @returns {number} Total price in rupees
         */
        bentoTotal() {
            return this.bentoItems.reduce((total, item) => {
                return total + (item.price * item.quantity);
            }, 0);
        },
        
        /**
         * Filter and sort products based on current filters
         * @returns {Array} Filtered and sorted products
         */
        filteredProducts() {
            let filtered = [...this.products];
            
            // Apply search filter
            if (this.searchQuery.trim()) {
                const query = this.searchQuery.toLowerCase().trim();
                filtered = filtered.filter(product => 
                    product.name.toLowerCase().includes(query) ||
                    product.description.toLowerCase().includes(query) ||
                    product.category.toLowerCase().includes(query) ||
                    (product.features && product.features.some(feature => 
                        feature.toLowerCase().includes(query)
                    ))
                );
            }
            
            // Apply category filter
            if (this.selectedCategories.length > 0) {
                filtered = filtered.filter(product => 
                    this.selectedCategories.includes(product.category)
                );
            }
            
            // Apply price range filter
            if (this.selectedPriceRange && this.selectedPriceRange.label !== 'All Prices') {
                filtered = filtered.filter(product => 
                    product.price >= this.selectedPriceRange.min && 
                    product.price <= this.selectedPriceRange.max
                );
            }
            
            // Apply sorting
            return this.sortProducts(filtered);
        }
    },
    
    methods: {
        /**
         * Sort products based on current sort option
         * @param {Array} products - Products to sort
         * @returns {Array} Sorted products
         */
        sortProducts(products) {
            const sorted = [...products];
            
            switch (this.sortBy) {
                case 'price-low':
                    return sorted.sort((a, b) => a.price - b.price);
                case 'price-high':
                    return sorted.sort((a, b) => b.price - a.price);
                case 'category':
                    return sorted.sort((a, b) => a.category.localeCompare(b.category));
                case 'name':
                default:
                    return sorted.sort((a, b) => a.name.localeCompare(b.name));
            }
        },
        
        /**
         * Open product modal for detailed view
         * @param {Object} product - Product to display
         */
        openProductModal(product) {
            this.selectedProduct = product;
            this.lockBodyScroll();
            
            // Track product view (for future analytics)
            this.trackEvent('product_view', {
                product_id: product.id,
                product_name: product.name,
                product_category: product.category
            });
        },
        
        /**
         * Close product modal
         */
        closeProductModal() {
            this.selectedProduct = null;
            this.unlockBodyScroll();
        },
        
        /**
         * Add product to bento (cart)
         * @param {Object} product - Product to add
         */
        addToBento(product) {
            const existingItem = this.bentoItems.find(item => item.id === product.id);
            
            if (existingItem) {
                existingItem.quantity += 1;
                this.showFeedback(`Increased ${product.name} quantity to ${existingItem.quantity}`);
            } else {
                this.bentoItems.push({
                    ...product,
                    quantity: 1,
                    addedAt: new Date().toISOString()
                });
                this.showFeedback(`Added ${product.name} to your bento!`);
            }
            
            // Auto-open bento tray briefly to show addition
            if (!this.bentoOpen) {
                this.bentoOpen = true;
                setTimeout(() => {
                    if (this.bentoItems.length > 1) {
                        this.bentoOpen = false;
                    }
                }, 2500);
            }
            
            // Track add to cart event
            this.trackEvent('add_to_cart', {
                product_id: product.id,
                product_name: product.name,
                product_price: product.price,
                cart_total: this.bentoTotal
            });
            
            // Save cart to localStorage for persistence
            this.saveCartToStorage();
        },
        
        /**
         * Remove product from bento
         * @param {number} productId - ID of product to remove
         */
        removeFromBento(productId) {
            const itemIndex = this.bentoItems.findIndex(item => item.id === productId);
            if (itemIndex > -1) {
                const item = this.bentoItems[itemIndex];
                this.bentoItems.splice(itemIndex, 1);
                this.showFeedback(`Removed ${item.name} from your bento`);
                
                // Track removal
                this.trackEvent('remove_from_cart', {
                    product_id: productId,
                    product_name: item.name
                });
                
                this.saveCartToStorage();
            }
        },
        
        /**
         * Clear all items from bento
         */
        clearBento() {
            if (this.bentoItems.length === 0) return;
            
            if (confirm('Are you sure you want to clear all items from your bento?')) {
                this.bentoItems = [];
                this.showFeedback('Your bento has been cleared');
                this.trackEvent('clear_cart');
                this.saveCartToStorage();
            }
        },
        
        /**
         * Clear all filters
         */
        clearFilters() {
            this.searchQuery = '';
            this.selectedCategories = [];
            this.selectedPriceRange = this.priceRanges[0]; // Reset to "All Prices"
            this.sortBy = 'name';
            this.showFeedback('Filters cleared');
        },
        
        /**
         * Close all modals and overlays
         */
        closeAllModals() {
            this.bentoOpen = false;
            this.selectedProduct = null;
            this.mobileFiltersOpen = false;
            this.unlockBodyScroll();
        },
        
        /**
         * Handle WhatsApp order
         */
        orderViaWhatsApp() {
            if (this.bentoItems.length === 0) {
                this.showFeedback('Your bento is empty! Add some items first.', 'warning');
                return;
            }
            
            const orderDetails = this.generateOrderMessage();
            const whatsappUrl = `https://wa.me/919892836471?text=${encodeURIComponent(orderDetails)}`;
            
            // Track order attempt
            this.trackEvent('initiate_order', {
                order_total: this.bentoTotal,
                item_count: this.bentoItems.length
            });
            
            window.open(whatsappUrl, '_blank');
        },
        
        /**
         * Generate WhatsApp order message
         * @returns {string} Formatted order message
         */
        generateOrderMessage() {
            let message = '🍱 *Science Bento Box Order*\n\n';
            message += '*Items:*\n';
            
            this.bentoItems.forEach((item, index) => {
                message += `${index + 1}. ${item.name}\n`;
                message += `   Quantity: ${item.quantity}\n`;
                message += `   Price: ₹${item.price.toLocaleString()} each\n`;
                message += `   Subtotal: ₹${(item.price * item.quantity).toLocaleString()}\n\n`;
            });
            
            message += `*Total: ₹${this.bentoTotal.toLocaleString()}*\n\n`;
            message += 'Please confirm availability and delivery details. Thank you! 🚀';
            
            return message;
        },
        
        /**
         * Show user feedback message
         * @param {string} message - Message to show
         * @param {string} type - Type of message (success, warning, error)
         */
        showFeedback(message, type = 'success') {
            // Create a simple toast notification
            const toast = document.createElement('div');
            toast.className = `fixed top-4 right-4 z-[100] px-6 py-3 rounded-lg text-white font-mono text-sm transform translate-x-full transition-transform duration-300 ${
                type === 'success' ? 'bg-green-500' :
                type === 'warning' ? 'bg-yellow-500' :
                'bg-red-500'
            }`;
            toast.textContent = message;
            
            document.body.appendChild(toast);
            
            // Slide in
            setTimeout(() => {
                toast.style.transform = 'translateX(0)';
            }, 100);
            
            // Slide out and remove
            setTimeout(() => {
                toast.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    document.body.removeChild(toast);
                }, 300);
            }, 3000);
        },
        
        /**
         * Lock body scroll when modal is open
         */
        lockBodyScroll() {
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = this.getScrollbarWidth() + 'px';
        },
        
        /**
         * Unlock body scroll when modal is closed
         */
        unlockBodyScroll() {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        },
        
        /**
         * Get scrollbar width to prevent layout shift
         * @returns {number} Scrollbar width in pixels
         */
        getScrollbarWidth() {
            const outer = document.createElement('div');
            outer.style.visibility = 'hidden';
            outer.style.overflow = 'scroll';
            document.body.appendChild(outer);
            
            const inner = document.createElement('div');
            outer.appendChild(inner);
            
            const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
            document.body.removeChild(outer);
            
            return scrollbarWidth;
        },
        
        /**
         * Save cart to localStorage for persistence
         */
        saveCartToStorage() {
            try {
                localStorage.setItem('science-bento-cart', JSON.stringify(this.bentoItems));
            } catch (error) {
                console.warn('Failed to save cart to localStorage:', error);
            }
        },
        
        /**
         * Load cart from localStorage
         */
        loadCartFromStorage() {
            try {
                const saved = localStorage.getItem('science-bento-cart');
                if (saved) {
                    this.bentoItems = JSON.parse(saved);
                }
            } catch (error) {
                console.warn('Failed to load cart from localStorage:', error);
                this.bentoItems = [];
            }
        },
        
        /**
         * Track events for analytics (placeholder)
         * @param {string} eventName - Name of the event
         * @param {Object} eventData - Event data
         */
        trackEvent(eventName, eventData = {}) {
            // This is a placeholder for analytics integration
            // You can replace this with Google Analytics, Mixpanel, etc.
            console.log('📊 Event tracked:', eventName, eventData);
            
            // Example: Google Analytics 4
            // gtag('event', eventName, eventData);
            
            // Example: Facebook Pixel
            // fbq('track', eventName, eventData);
        },
        
        /**
         * Handle keyboard navigation
         * @param {KeyboardEvent} event - Keyboard event
         */
        handleKeydown(event) {
            // ESC key closes modals
            if (event.key === 'Escape') {
                this.closeAllModals();
            }
            
            // CMD/Ctrl + K opens search
            if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
                event.preventDefault();
                const searchInput = document.querySelector('.search-input');
                if (searchInput) {
                    searchInput.focus();
                }
            }
        },
        
        /**
         * Handle window resize for responsive behavior
         */
        handleResize() {
            // Close bento on mobile when switching to desktop
            if (window.innerWidth >= 768 && this.bentoOpen) {
                // Don't auto-close on desktop
            }
            
            // Close mobile filters when switching to desktop
            if (window.innerWidth >= 768) {
                this.mobileFiltersOpen = false;
            }
        },
        
        /**
         * Initialize application
         */
        init() {
            // Load saved cart
            this.loadCartFromStorage();
            
            // Set default price range
            this.selectedPriceRange = this.priceRanges[0];
            
            // Add event listeners
            document.addEventListener('keydown', this.handleKeydown);
            window.addEventListener('resize', this.handleResize);
            
            // Track page view
            this.trackEvent('page_view', {
                page: 'science_bento_home',
                products_count: this.products.length
            });
            
            console.log('🍱 Science Bento Box initialized successfully!');
            console.log(`📦 Loaded ${this.products.length} products`);
            console.log(`🛒 Cart contains ${this.bentoItems.length} items`);
        }
    },
    
    watch: {
        /**
         * Watch for changes in search query and debounce
         */
        searchQuery: {
            handler(newQuery) {
                // Debounce search for better performance
                clearTimeout(this.searchDebounce);
                this.searchDebounce = setTimeout(() => {
                    if (newQuery) {
                        this.trackEvent('search', { query: newQuery });
                    }
                }, 300);
            }
        },
        
        /**
         * Watch for changes in selected categories
         */
        selectedCategories: {
            handler(newCategories) {
                if (newCategories.length > 0) {
                    this.trackEvent('filter_category', { categories: newCategories });
                }
            }
        },
        
        /**
         * Watch for changes in view mode
         */
        viewMode: {
            handler(newMode) {
                this.trackEvent('change_view', { view_mode: newMode });
            }
        }
    },
    
    /**
     * Vue.js mounted lifecycle hook
     */
    mounted() {
        this.init();
        
        // Add some delightful console messages for developers
        console.log('%c🍱 Science Bento Box', 'font-size: 20px; font-weight: bold; color: #ee780d;');
        console.log('%cBuilt with love by Amit & Amartha 🚀', 'color: #666;');
        console.log('%cFind something cool? Check out our source code!', 'color: #666;');
        
        // Easter egg for curious developers
        window.scienceBento = {
            version: '1.0.0',
            author: 'Amit @ Absurd Industries',
            sass: 'Amartha (The Digital Sass Queen)',
            addToCart: this.addToBento,
            clearCart: this.clearBento,
            getCart: () => this.bentoItems,
            getTotal: () => this.bentoTotal
        };
    },
    
    /**
     * Vue.js beforeDestroy lifecycle hook
     */
    beforeDestroy() {
        // Clean up event listeners
        document.removeEventListener('keydown', this.handleKeydown);
        window.removeEventListener('resize', this.handleResize);
        
        // Clear any pending timeouts
        if (this.searchDebounce) {
            clearTimeout(this.searchDebounce);
        }
    }
});