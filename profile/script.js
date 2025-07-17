const { createApp } = Vue;

createApp({
    data() {
        return {
            dropdownOpen: false,
            showCollabModal: false,
            collabType: {
                title: '',
                description: ''
            },
            collabForm: {
                projectType: 'Radioactivity Research',
                timeline: '1-3 months',
                message: ''
            },
            newPost: '',
            liveStats: {
                posts: 127,
                projects: 73,
                tools: 721
            },
            inventory: {
                radiumSamples: 12,
                researchNotes: 47
            },
            posts: [
                {
                    id: 1,
                    content: "Day 847 of radium extraction and I'm starting to think Pierre was right about the glowing... 🧪✨ My lab notebooks are literally illuminating themselves now. Is this a feature or a bug? #RadiumLife #GlowUp #ScienceIsLit",
                    timeAgo: "2 minutes ago",
                    isLive: true,
                    likes: 89,
                    comments: 23,
                    shares: 12,
                    liked: false,
                    tags: ["RADIUM", "EXTRACTION", "BREAKTHROUGH"]
                },
                {
                    id: 2,
                    content: "PSA: Just discovered that radium makes an excellent night light! No electricity required! 💡⚛️ Pierre thinks I'm 'too cavalier with radioactive materials' but honestly, where's his sense of scientific adventure? #Innovation #SafetySecond #RadiumHacks",
                    timeAgo: "1 hour ago",
                    isLive: false,
                    likes: 156,
                    comments: 67,
                    shares: 34,
                    liked: true,
                    tags: ["INNOVATION", "RADIUM", "SAFETY"]
                },
                {
                    id: 3,
                    content: "Polonium update: Named it after Poland because I'm homesick and also because this element is as stubborn as my grandmother 🇵🇱⚛️ Currently working on isolation techniques. Side note: my hands are tingling - probably excitement! #Polonium #Poland #Discovery",
                    timeAgo: "3 hours ago",
                    isLive: false,
                    likes: 203,
                    comments: 89,
                    shares: 45,
                    liked: false,
                    tags: ["POLONIUM", "DISCOVERY", "POLAND"]
                },
                {
                    id: 4,
                    content: "Collaboration request: Looking for someone who can help with better ventilation systems! My lab assistant keeps complaining about 'mysterious glowing dust' and 'concerning health symptoms' 🙄 Modern workers, am I right? DM me! #Collaboration #VentilationNeeded #LabSafety",
                    timeAgo: "6 hours ago",
                    isLive: false,
                    likes: 67,
                    comments: 134,
                    shares: 28,
                    liked: false,
                    tags: ["COLLABORATION", "SAFETY", "LAB_HELP"]
                }
            ]
        }
    },
    methods: {
        toggleDropdown() {
            this.dropdownOpen = !this.dropdownOpen;
        },
        
        // Collaboration Modal Methods
        openCollabModal(type) {
            const collabTypes = {
                mentor: {
                    title: 'Request Mentorship',
                    description: 'Get guidance from Marie on radioactivity research, laboratory techniques, and scientific methodology.'
                },
                collaborate: {
                    title: 'Collaboration Request',
                    description: 'Partner with Marie on research projects, experiments, or scientific discoveries.'
                },
                hire: {
                    title: 'Hire Marie',
                    description: 'Commission Marie for consulting, research analysis, or laboratory setup assistance.'
                }
            };
            
            this.collabType = collabTypes[type];
            this.showCollabModal = true;
            this.dropdownOpen = false;
        },
        
        closeCollabModal() {
            this.showCollabModal = false;
            this.collabForm = {
                projectType: 'Radioactivity Research',
                timeline: '1-3 months',
                message: ''
            };
        },
        
        submitCollab() {
            // Mock submission
            alert(`Collaboration request sent to Marie Curie!\n\nProject: ${this.collabForm.projectType}\nTimeline: ${this.collabForm.timeline}\nMessage: ${this.collabForm.message}`);
            this.closeCollabModal();
        },
        
        // Post Methods
        publishPost() {
            if (!this.newPost.trim()) return;
            
            const newPost = {
                id: this.posts.length + 1,
                content: this.newPost,
                timeAgo: "Just now",
                isLive: true,
                likes: 0,
                comments: 0,
                shares: 0,
                liked: false,
                tags: this.extractTags(this.newPost)
            };
            
            this.posts.unshift(newPost);
            this.liveStats.posts++;
            this.newPost = '';
        },
        
        extractTags(content) {
            const hashtags = content.match(/#\w+/g);
            return hashtags ? hashtags.map(tag => tag.replace('#', '').toUpperCase()) : [];
        },
        
        likePost(postId) {
            const post = this.posts.find(p => p.id === postId);
            if (post) {
                post.liked = !post.liked;
                post.likes += post.liked ? 1 : -1;
            }
        },
        
        getTagColor(tag) {
            const colors = {
                'RADIUM': 'bg-radium/20 text-radium',
                'POLONIUM': 'bg-polonium/20 text-polonium',
                'DISCOVERY': 'bg-uranium/20 text-uranium',
                'BREAKTHROUGH': 'bg-laboratory/20 text-laboratory',
                'SAFETY': 'bg-red-100 text-red-600',
                'COLLABORATION': 'bg-blue-100 text-blue-600'
            };
            return colors[tag] || 'bg-beige-cool text-text-dark';
        },
        
        // Trade Methods
        viewItem(itemType) {
            if (itemType === 'radium') {
                window.location.href = 'trade.html#radium-samples';
            } else if (itemType === 'notes') {
                window.location.href = 'trade.html#research-notes';
            }
        },
        
        quickSell() {
            window.location.href = 'trade.html#sell';
        },
        
        quickBuy() {
            window.location.href = 'trade.html#buy';
        },
        
        // Dropdown Methods
        exportProfile() {
            alert('Profile shared to scientific community!');
            this.dropdownOpen = false;
        },
        
        downloadData() {
            // Mock data export
            const userData = {
                profile: 'Marie Curie',
                posts: this.posts.length,
                projects: this.liveStats.projects,
                tools: this.liveStats.tools,
                inventory: this.inventory
            };
            
            const dataStr = JSON.stringify(userData, null, 2);
            const dataBlob = new Blob([dataStr], {type: 'application/json'});
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'marie_curie_data.json';
            link.click();
            
            this.dropdownOpen = false;
        },
        
        reportProfile() {
            alert('Reporting to the International Committee on Radiological Protection...');
            this.dropdownOpen = false;
        }
    },
    
    mounted() {
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.relative')) {
                this.dropdownOpen = false;
            }
        });
        
        // Simulate live updates
        setInterval(() => {
            this.posts.forEach(post => {
                if (Math.random() < 0.1) {
                    post.likes += Math.floor(Math.random() * 3);
                }
            });
        }, 5000);
        
        // Update post times
        setInterval(() => {
            this.posts.forEach(post => {
                if (post.timeAgo === "Just now") {
                    post.timeAgo = "1 minute ago";
                } else if (post.timeAgo === "1 minute ago") {
                    post.timeAgo = "2 minutes ago";
                }
            });
        }, 60000);
    }
}).mount('#app');