// Main Desktop Application
const { createApp } = Vue;

// Window Management System
class WindowManager {
    constructor() {
        this.windows = new Map();
        this.zIndexCounter = 1000;
        this.dragState = {
            isDragging: false,
            windowId: null,
            startX: 0,
            startY: 0,
            startLeft: 0,
            startTop: 0
        };
    }

    createWindow(id, options = {}) {
        const defaultWindow = {
            id,
            open: false,
            x: 200 + (this.windows.size * 30),
            y: 100 + (this.windows.size * 30),
            width: 500,
            height: 400,
            zIndex: ++this.zIndexCounter,
            focused: false,
            minimized: false,
            title: id.toUpperCase(),
            ...options
        };
        
        this.windows.set(id, defaultWindow);
        return defaultWindow;
    }

    openWindow(id) {
        const window = this.windows.get(id);
        if (window) {
            window.open = true;
            window.minimized = false;
            this.focusWindow(id);
        }
    }

    closeWindow(id) {
        const window = this.windows.get(id);
        if (window) {
            window.open = false;
            window.focused = false;
        }
    }

    focusWindow(id) {
        // Unfocus all windows
        this.windows.forEach(window => window.focused = false);
        
        // Focus target window
        const window = this.windows.get(id);
        if (window) {
            window.focused = true;
            window.zIndex = ++this.zIndexCounter;
        }
    }

    minimizeWindow(id) {
        const window = this.windows.get(id);
        if (window) {
            window.minimized = !window.minimized;
        }
    }

    startDrag(event, windowId) {
        const window = this.windows.get(windowId);
        if (!window) return;

        this.dragState = {
            isDragging: true,
            windowId,
            startX: event.clientX,
            startY: event.clientY,
            startLeft: window.x,
            startTop: window.y
        };

        event.preventDefault();
    }

    updateDrag(event) {
        if (!this.dragState.isDragging) return;

        const deltaX = event.clientX - this.dragState.startX;
        const deltaY = event.clientY - this.dragState.startY;
        
        const window = this.windows.get(this.dragState.windowId);
        if (window) {
            window.x = Math.max(0, this.dragState.startLeft + deltaX);
            window.y = Math.max(0, this.dragState.startTop + deltaY);
        }
    }

    endDrag() {
        this.dragState.isDragging = false;
    }
}

// Notification System
class NotificationManager {
    constructor() {
        this.notifications = [];
        this.idCounter = 0;
    }

    add(title, message, icon = 'fas fa-info-circle', color = '#FF6B35', duration = 5000) {
        const notification = {
            id: ++this.idCounter,
            title,
            message,
            icon,
            color,
            timestamp: Date.now()
        };

        this.notifications.push(notification);

        // Auto-dismiss
        if (duration > 0) {
            setTimeout(() => {
                this.dismiss(notification.id);
            }, duration);
        }

        return notification;
    }

    dismiss(id) {
        const index = this.notifications.findIndex(n => n.id === id);
        if (index > -1) {
            this.notifications.splice(index, 1);
        }
    }

    clear() {
        this.notifications.length = 0;
    }
}

// Main Desktop Application
createApp({
    data() {
        return {
            currentTime: new Date().toLocaleTimeString(),
            windowManager: new WindowManager(),
            notificationManager: new NotificationManager(),
            
            // System State
            showSystemMenu: false,
            
            // Lab Statistics
            labStats: {
                temp: 18.5,
                radiation: 'EXTREME',
                experiment: 847,
                yield: 78.3
            },
            
            // Application Data
            recentActivity: [
                { id: 1, text: 'RADIUM_EXTRACTION.progress += 0.3%', time: '2m' },
                { id: 2, text: 'COLLAB_REQUEST.received(tesla)', time: '15m' },
                { id: 3, text: 'JOURNAL_ENTRY.published(polonium)', time: '1h' },
                { id: 4, text: 'SAFETY_PROTOCOL.ignored(again)', time: '2h' }
            ],
            
            currentExperiment: {
                day: 847,
                progress: 78.3
            },
            
            labLogs: [
                { id: 1, timestamp: '14:23:45', message: 'RADIUM_CRYSTALLIZATION.status = 78.3%' },
                { id: 2, timestamp: '14:22:10', message: 'TEMPERATURE.stable(18.5C)' },
                { id: 3, timestamp: '14:21:33', message: 'RADIATION.level = EXTREME (expected)' },
                { id: 4, timestamp: '14:20:15', message: 'SAFETY_ALERT.dismissed(pierre_complaint)' }
            ],

            equipment: [
                { id: 1, name: 'ELECTROMETER_MK1', status: 'ACTIVE', uptime: '847h', icon: 'fas fa-bolt', color: '#FF6B35', efficiency: 94 },
                { id: 2, name: 'CENTRIFUGE_MANUAL', status: 'RUNNING', uptime: '23h', icon: 'fas fa-sync-alt', color: '#2A5F41', efficiency: 87 },
                { id: 3, name: 'MICROSCOPE_ZEISS', status: 'STANDBY', uptime: '0h', icon: 'fas fa-search', color: '#D4A574', efficiency: 0 },
                { id: 4, name: 'BALANCE_PRECISION', status: 'ACTIVE', uptime: '445h', icon: 'fas fa-balance-scale', color: '#8B9A46', efficiency: 96 }
            ],

            journalEntries: [
                { id: 1, title: 'RADIUM_CRYSTALLIZATION.success', content: 'After 847 days of extraction...', date: '1902.03.15', type: 'BREAKTHROUGH' },
                { id: 2, title: 'POLONIUM_DISCOVERY.log', content: 'Named after homeland Poland...', date: '1898.07.18', type: 'DISCOVERY' },
                { id: 3, title: 'SAFETY_OBSERVATIONS.txt', content: 'Hands showing discoloration...', date: '1902.02.28', type: 'WARNING' }
            ],

            marketplaceItems: [
                { id: 1, name: 'RADIUM_SAMPLE_0.1G', description: '99.7% pure radium', price: 2500, icon: 'fas fa-radiation', color: '#FF6B35', stock: 12 },
                { id: 2, name: 'RESEARCH_NOTES_SET', description: 'Complete lab procedures', price: 150, icon: 'fas fa-file-lines', color: '#8B9A46', stock: 47 },
                { id: 3, name: 'ELECTROMETER_PLANS', description: 'Technical schematics', price: 75, icon: 'fas fa-bolt', color: '#D4A574', stock: 23 },
                { id: 4, name: 'POLONIUM_EXTRACT', description: 'Rare element sample', price: 1200, icon: 'fas fa-atom', color: '#D4A574', stock: 3 }
            ],

            networkMakers: [
                { id: 1, name: 'NIKOLA_TESLA', specialty: 'ELECTRICAL_ENGINEERING', projects: 234, location: 'NEW_YORK', avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Tesla_circa_1890.jpeg/220px-Tesla_circa_1890.jpeg', status: 'ONLINE' },
                { id: 2, name: 'THOMAS_EDISON', specialty: 'INVENTION_FACTORY', projects: 1093, location: 'MENLO_PARK', avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Thomas_Edison2.jpg/220px-Thomas_Edison2.jpg', status: 'BUSY' },
                { id: 3, name: 'HENRI_BECQUEREL', specialty: 'RADIOACTIVITY_RESEARCH', projects: 67, location: 'PARIS', avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Becquerel_Henri_photograph.jpg/220px-Becquerel_Henri_photograph.jpg', status: 'ONLINE' }
            ]
        };
    },

    computed: {
        windows() {
            return Object.fromEntries(this.windowManager.windows);
        },
        
        notifications() {
            return this.notificationManager.notifications;
        }
    },

    mounted() {
        // Initialize windows
        this.windowManager.createWindow('profile', { title: 'MARIE_CURIE.profile', open: true });
        this.windowManager.createWindow('lab', { title: 'LABORATORY.monitor', x: 300, y: 150, width: 600, height: 450 });
        this.windowManager.createWindow('tools', { title: 'EQUIPMENT.manager', x: 150, y: 200 });
        this.windowManager.createWindow('journal', { title: 'RESEARCH.journal', x: 250, y: 120, height: 500 });
        this.windowManager.createWindow('trade', { title: 'MARKETPLACE.exe', x: 400, y: 180 });
        this.windowManager.createWindow('network', { title: 'MAKER_NETWORK.social', x: 350, y: 140, width: 520, height: 480 });

        // System intervals
        this.startSystemIntervals();
        
        // Mouse event listeners for window dragging
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);
        
        // Welcome notification
        setTimeout(() => {
            this.notificationManager.add(
                'SYSTEM_READY',
                'ABSURD_INDUSTRIES.os initialized',
                'fas fa-check-circle',
                '#2A5F41'
            );
        }, 1000);
    },

    methods: {
        // App Management
        openApp(appId) {
            this.windowManager.openWindow(appId);
        },

        closeApp(appId) {
            this.windowManager.closeWindow(appId);
        },

        minimizeApp(appId) {
            this.windowManager.minimizeWindow(appId);
        },

        focusWindow(appId) {
            this.windowManager.focusWindow(appId);
        },

        // Window Dragging
        dragWindow(data) {
            this.windowManager.startDrag(data.event, data.windowId);
        },

        handleMouseMove(event) {
            this.windowManager.updateDrag(event);
        },

        handleMouseUp() {
            this.windowManager.endDrag();
        },

        // Quick Actions
        quickAction(action) {
            const actions = {
                experiment: () => {
                    this.notificationManager.add(
                        'EXPERIMENT_STARTED',
                        'POLONIUM_EXTRACTION.init()',
                        'fas fa-flask',
                        '#8B9A46'
                    );
                },
                log: () => {
                    this.openApp('journal');
                },
                sell: () => {
                    this.openApp('trade');
                },
                connect: () => {
                    this.openApp('network');
                }
            };

            if (actions[action]) {
                actions[action]();
            }
        },

        // System Actions
        toggleSystem() {
            this.showSystemMenu = !this.showSystemMenu;
        },

        // Utilities
        getAppIcon(appId) {
            const icons = {
                profile: 'fas fa-user text-radium',
                lab: 'fas fa-flask text-uranium',
                tools: 'fas fa-wrench text-laboratory',
                journal: 'fas fa-file-lines text-polonium',
                trade: 'fas fa-coins text-radium',
                network: 'fas fa-network-wired text-text-dim'
            };
            return icons[appId] || 'fas fa-window';
        },

        dismissNotification(id) {
            this.notificationManager.dismiss(id);
        },

        // System Intervals
        startSystemIntervals() {
            // Update time
            setInterval(() => {
                this.currentTime = new Date().toLocaleTimeString();
            }, 1000);

            // Simulate lab changes
            setInterval(() => {
                this.labStats.temp = Number((18 + Math.random() * 4).toFixed(1));
                this.currentExperiment.progress = Math.min(100, Number((this.currentExperiment.progress + Math.random() * 0.1).toFixed(1)));
                
                // Add random lab logs
                if (Math.random() < 0.3) {
                    const messages = [
                        'TEMPERATURE.fluctuation(+0.2C)',
                        'RADIATION.spike.detected(normal)',
                        'CRYSTALLIZATION.progress += 0.1%',
                        'VENTILATION.status = STILL_TERRIBLE'
                    ];
                    
                    this.labLogs.unshift({
                        id: Date.now(),
                        timestamp: new Date().toLocaleTimeString(),
                        message: messages[Math.floor(Math.random() * messages.length)]
                    });
                    
                    // Keep only last 10 logs
                    if (this.labLogs.length > 10) {
                        this.labLogs = this.labLogs.slice(0, 10);
                    }
                }
            }, 5000);

            // Random notifications
            const notificationMessages = [
                { title: 'LAB_ALERT', message: 'RADIATION.levels.increased()', icon: 'fas fa-radiation', color: '#FF6B35' },
                { title: 'COLLAB_REQUEST', message: 'TESLA.wants.to.connect()', icon: 'fas fa-handshake', color: '#8B9A46' },
                { title: 'TRADE_UPDATE', message: 'RADIUM_SAMPLE.sold(1)', icon: 'fas fa-coins', color: '#D4A574' },
                { title: 'SYSTEM_WARNING', message: 'SAFETY_PROTOCOLS.still.ignored()', icon: 'fas fa-exclamation-triangle', color: '#ef4444' }
            ];

            setInterval(() => {
                if (Math.random() < 0.2) {
                    const notification = notificationMessages[Math.floor(Math.random() * notificationMessages.length)];
                    this.notificationManager.add(notification.title, notification.message, notification.icon, notification.color);
                }
            }, 15000);
        }
    }
}).mount('#desktop');