// education-manifesto.js
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Vue App
    const app = Vue.createApp({
        data() {
            return {
                // UI State
                mobileMenu: false,
                activeCourse: null,
                faqOpen: {
                    1: false,
                    2: false,
                    3: false
                }
            }
        },
        methods: {
            // Toggle FAQ accordion
            toggleFaq(id) {
                this.faqOpen[id] = !this.faqOpen[id];
            }
        },
        mounted() {
            // Smooth scroll for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80, // Account for header
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }
    }).mount('#app');
});