/**
 * Science Bento Box - Products Database
 * Where hardware dreams become purchasable reality
 * Curated with love by Amit and organized by Amartha
 * 
 * @version 1.0.0
 * @author Amit @ Absurd Industries
 * @sass_queen Amartha (The Digital Deity of Data Organization)
 */

window.PRODUCTS = [
    // === OMAKASE CLASSICS ===
    // The signature pieces that define the Science Bento experience
    {
        id: 1,
        name: 'Lampy & Bloom',
        category: 'Ambient Lighting',
        price: 4444,
        emoji: '💡',
        description: 'Mood lighting with developer SDK. Because sometimes your code needs the right ambiance to compile properly. Transform your workspace into a coding sanctuary with programmable RGB goodness.',
        features: ['Developer SDK', 'RGB Programmable', 'Code Integration', 'Mood Sensing', 'Open Source'],
        inStock: true,
        featured: true,
        creator: '@layogtima',
        difficulty: 'Intermediate',
        tags: ['lighting', 'sdk', 'programming', 'workspace', 'rgb']
    },
    
    {
        id: 2,
        name: 'CoryDora',
        category: 'Input Devices',
        price: 4949,
        emoji: '⌨️',
        description: 'Open-source programmable macropad for the discerning developer who refuses to use default keybindings. QMK compatible with endless customization possibilities.',
        features: ['QMK Compatible', 'Hot-Swappable Keys', 'RGB Backlighting', 'Rotary Encoder', 'Custom Layouts'],
        inStock: true,
        featured: true,
        creator: '@deku',
        difficulty: 'Intermediate',
        tags: ['keyboard', 'macropad', 'qmk', 'customizable', 'mechanical']
    },
    
    {
        id: 3,
        name: 'T1E ePaper Watch',
        category: 'Wearable Tech',
        price: 7777,
        emoji: '⌚',
        description: 'A watch that tells you time, with ePaper goodness and week-long battery life. Perfect for the minimalist who appreciates elegant engineering.',
        features: ['ePaper Display', 'Week Battery Life', 'Weather Integration', 'Notification Support', 'Ultra Low Power'],
        inStock: true,
        featured: true,
        creator: '@ampere.works',
        difficulty: 'Advanced',
        tags: ['wearable', 'epaper', 'smartwatch', 'minimal', 'battery']
    },
    
    {
        id: 4,
        name: 'Sidekick Companion',
        category: 'AI & Robotics',
        price: 3333,
        emoji: '🤖',
        description: 'Digital pet for the modern age. Interact with it and watch it evolve into your perfect tamagochi companion. AI-powered personality that grows with you.',
        features: ['Evolving AI', 'Touch Interaction', 'Personality Development', 'Mobile App', 'Voice Recognition'],
        inStock: true,
        featured: true,
        creator: '@burnthishardware',
        difficulty: 'Beginner',
        tags: ['ai', 'pet', 'interactive', 'companion', 'tamagochi']
    },
    
    // === APPETIZERS ===
    // Perfect entry points for curious minds
    {
        id: 101,
        name: 'Hello World',
        category: 'Beginner Kits',
        price: 299,
        emoji: '👋',
        description: 'Your first bite into electronics. Arduino Nano + LED + Resistor + Breadboard for learning the absolute basics. Includes comprehensive tutorial and project ideas.',
        features: ['Arduino Nano', 'LED Kit', 'Resistor Pack', 'Breadboard', 'Tutorial Guide'],
        inStock: true,
        featured: false,
        creator: 'Frontier Labs',
        difficulty: 'Beginner',
        tags: ['arduino', 'beginner', 'led', 'tutorial', 'learning']
    },
    
    {
        id: 102,
        name: 'Stim Clicker',
        category: 'Sensory Devices',
        price: 699,
        emoji: '🖱️',
        description: 'Satisfying clicks for your fingertips. ESP32 + OLED + 5 tactile switches for the ultimate fidget experience. Programmable patterns and feedback.',
        features: ['ESP32 Powered', 'OLED Display', 'Tactile Switches', 'Haptic Feedback', 'Pattern Programming'],
        inStock: true,
        featured: false,
        creator: 'Deku Labs',
        difficulty: 'Beginner',
        tags: ['fidget', 'tactile', 'esp32', 'sensory', 'programmable']
    },
    
    {
        id: 103,
        name: 'MODO Ring',
        category: 'Wearable Tech',
        price: 899,
        emoji: '💍',
        description: 'Wearable ambient feedback device. NeoPixel LED + Temperature Sensor + ESP32 in a sleek ring form factor. Your mood, visualized.',
        features: ['NeoPixel RGB', 'Temperature Sensor', 'ESP32-C3', 'Wireless Charging', 'Mood Tracking'],
        inStock: true,
        featured: false,
        creator: 'Ampere Works',
        difficulty: 'Intermediate',
        tags: ['wearable', 'ring', 'temperature', 'mood', 'neopixel']
    },
    
    // === MAIN COURSES ===
    // Substantial projects for serious makers
    {
        id: 201,
        name: 'Cube Modular System',
        category: 'Building Systems',
        price: 4444,
        emoji: '📦',
        description: 'Modular building system for makers. Aluminum extrusion + 3D printed fittings create endless possibilities. The LEGO for grown-ups who solder.',
        features: ['Aluminum Extrusion', '3D Printed Joints', 'Modular Design', 'Scalable System', 'CAD Files Included'],
        inStock: true,
        featured: false,
        creator: 'Frontier Labs',
        difficulty: 'Intermediate',
        tags: ['modular', 'building', 'aluminum', '3d-printing', 'system']
    },
    
    {
        id: 202,
        name: 'Deutron Quadwalker',
        category: 'AI & Robotics',
        price: 5555,
        emoji: '🕷️',
        description: 'Your personal desk quadruped companion. Arduino Nano + MG90 servos + 3D printed body that walks, responds, and brings joy to your workspace.',
        features: ['Arduino Nano Brain', 'MG90 Servo Motors', '3D Printed Chassis', 'Sensor Array', 'Pet-like Behavior'],
        inStock: true,
        featured: true,
        creator: '@deku',
        difficulty: 'Advanced',
        tags: ['robot', 'quadruped', 'pet', 'arduino', 'servos']
    },
    
    {
        id: 203,
        name: 'IoT Weather Station',
        category: 'Environmental Monitoring',
        price: 2999,
        emoji: '🌤️',
        description: 'Monitor your environment intelligently. ESP32 + comprehensive sensor suite + solar panel + weatherproof enclosure. Your personal meteorology station.',
        features: ['ESP32 Controller', 'Multi-Sensor Array', 'Solar Powered', 'Weather Resistant', 'Data Logging'],
        inStock: true,
        featured: false,
        creator: 'Ampere Works',
        difficulty: 'Intermediate',
        tags: ['weather', 'iot', 'sensors', 'solar', 'monitoring']
    },
    
    // === PREMIUM SELECTION ===
    // For the sophisticated maker with refined tastes
    {
        id: 301,
        name: 'Smart Mirror Kit',
        category: 'Home Automation',
        price: 8999,
        emoji: '🪞',
        description: 'Your personal information display. Raspberry Pi + 2-way mirror + display + custom frame. Transform any wall into an intelligent interface.',
        features: ['Raspberry Pi 4', 'Two-Way Mirror', 'HD Display', 'Voice Control', 'Modular Interface'],
        inStock: true,
        featured: true,
        creator: 'Frontier Labs',
        difficulty: 'Advanced',
        tags: ['mirror', 'smart-home', 'raspberry-pi', 'display', 'automation']
    },
    
    {
        id: 302,
        name: 'Retro Game Console',
        category: 'Gaming Hardware',
        price: 6777,
        emoji: '🎮',
        description: 'Nostalgic gaming in modern packaging. Custom PCB + tactile buttons + OLED + 3D printed case. Relive the classics with contemporary engineering.',
        features: ['Custom PCB', 'Tactile Buttons', 'OLED Display', '3D Printed Case', 'Retro Game Library'],
        inStock: true,
        featured: false,
        creator: 'Deku Labs',
        difficulty: 'Intermediate',
        tags: ['gaming', 'retro', 'console', 'pcb', 'nostalgic']
    },
    
    {
        id: 303,
        name: 'Plant Whisperer',
        category: 'Agriculture Tech',
        price: 3499,
        emoji: '🌱',
        description: 'Automated plant care system. Soil sensors + water pump + ESP32 + mobile app integration. Your plants will thank you (if they could).',
        features: ['Soil Moisture Sensors', 'Automatic Watering', 'Mobile App', 'Growth Tracking', 'Multi-Plant Support'],
        inStock: true,
        featured: false,
        creator: 'Ampere Works',
        difficulty: 'Intermediate',
        tags: ['plants', 'automation', 'sensors', 'watering', 'gardening']
    },
    
    {
        id: 304,
        name: 'Wireless Charger Pad',
        category: 'Charging Solutions',
        price: 2299,
        emoji: '🔋',
        description: 'Sustainable wireless charging solution. Qi coil + custom PCB + beautiful bamboo enclosure. Charge your devices while caring for the planet.',
        features: ['Qi Wireless Standard', 'Custom PCB Design', 'Bamboo Enclosure', 'Fast Charging', 'Eco-Friendly'],
        inStock: true,
        featured: false,
        creator: 'Sustainable Tech Co.',
        difficulty: 'Beginner',
        tags: ['wireless', 'charging', 'qi', 'bamboo', 'sustainable']
    },
    
    // === ADVANCED PROJECTS ===
    // For the truly ambitious makers
    {
        id: 401,
        name: 'SuperSaber Kit',
        category: 'Advanced Projects',
        price: 15999,
        emoji: '⚔️',
        description: 'Build your own lightsaber (because obviously). Custom PCB + motion sensors + RGB blade + sound effects. The Force is strong with this one.',
        features: ['Motion Sensing', 'RGB Blade Effects', 'Sound Synthesis', 'Haptic Feedback', 'Duel Mode'],
        inStock: false,
        featured: true,
        creator: '@amit (Jedi Master)',
        difficulty: 'Expert',
        tags: ['lightsaber', 'rgb', 'motion', 'sound', 'advanced']
    },
    
    {
        id: 402,
        name: 'Holographic Display',
        category: 'Display Technology',
        price: 12999,
        emoji: '🔮',
        description: 'True holographic display system. Custom optics + high-speed projector + tracking system. Bring your 3D models into the real world.',
        features: ['Holographic Projection', 'Hand Tracking', '3D Model Support', 'Real-time Rendering', 'Open Source'],
        inStock: false,
        featured: true,
        creator: 'Future Tech Labs',
        difficulty: 'Expert',
        tags: ['hologram', '3d', 'projection', 'futuristic', 'display']
    },
    
    // === PCB CUPID COLLECTION ===
    // Curated components from our friends
    {
        id: 501,
        name: 'Cupid MP3 Player',
        category: 'Audio Hardware',
        price: 1899,
        emoji: '🎵',
        description: 'Custom PCB audio player with exceptional sound quality. Support for high-resolution audio formats and customizable EQ.',
        features: ['High-Res Audio', 'Custom EQ', 'Long Battery Life', 'SD Card Support', 'Headphone Amp'],
        inStock: true,
        featured: false,
        creator: 'PCB Cupid',
        difficulty: 'Intermediate',
        tags: ['audio', 'mp3', 'music', 'portable', 'hifi']
    },
    
    {
        id: 502,
        name: 'Glyph ESP32-C3',
        category: 'Development Boards',
        price: 799,
        emoji: '🔧',
        description: 'Elegant ESP32-C3 development board with thoughtful design and comprehensive breakout. Perfect for IoT projects.',
        features: ['ESP32-C3 SoC', 'USB-C Programming', 'All Pins Broken Out', 'LiPo Charging', 'Compact Design'],
        inStock: true,
        featured: false,
        creator: 'PCB Cupid',
        difficulty: 'Beginner',
        tags: ['esp32', 'development', 'iot', 'wifi', 'bluetooth']
    },
    
    {
        id: 503,
        name: 'Glyph ESP32-C6',
        category: 'Development Boards',
        price: 999,
        emoji: '📡',
        description: 'Next-generation ESP32-C6 with Thread/Zigbee support. Future-proof your IoT projects with the latest connectivity standards.',
        features: ['ESP32-C6 SoC', 'Thread/Zigbee', 'WiFi 6 Support', 'Enhanced Security', 'Low Power Design'],
        inStock: true,
        featured: false,
        creator: 'PCB Cupid',
        difficulty: 'Intermediate',
        tags: ['esp32', 'thread', 'zigbee', 'wifi6', 'iot']
    },
    
    {
        id: 504,
        name: 'Sensor Starter Pack',
        category: 'Components',
        price: 1299,
        emoji: '📊',
        description: 'Comprehensive collection of sensors for any project. Temperature, humidity, light, motion, and more in one convenient package.',
        features: ['10+ Sensor Types', 'Breadboard Friendly', 'Arduino Compatible', 'Sample Code', 'Project Ideas'],
        inStock: true,
        featured: false,
        creator: 'PCB Cupid',
        difficulty: 'Beginner',
        tags: ['sensors', 'kit', 'temperature', 'humidity', 'motion']
    },
    
    // === EXPERIMENTAL SECTION ===
    // Bleeding edge projects for the brave
    {
        id: 601,
        name: 'Quantum Random Generator',
        category: 'Experimental',
        price: 9999,
        emoji: '🌌',
        description: 'True quantum random number generator using photodiode noise. For when pseudorandom just isn\'t random enough.',
        features: ['True Quantum Randomness', 'High Entropy Output', 'USB Interface', 'Cryptographic Grade', 'Research Ready'],
        inStock: false,
        featured: true,
        creator: 'Quantum Labs',
        difficulty: 'Expert',
        tags: ['quantum', 'random', 'cryptography', 'research', 'entropy']
    },
    
    {
        id: 602,
        name: 'Neural Network Accelerator',
        category: 'AI Hardware',
        price: 19999,
        emoji: '🧠',
        description: 'Dedicated neural network processing unit. Custom silicon for machine learning inference at the edge.',
        features: ['Custom Silicon', 'ML Acceleration', 'Low Power Inference', 'TensorFlow Support', 'Edge Computing'],
        inStock: false,
        featured: true,
        creator: 'AI Hardware Co.',
        difficulty: 'Expert',
        tags: ['ai', 'neural', 'acceleration', 'machine-learning', 'edge']
    }
];

// Additional metadata for the products system
window.PRODUCT_METADATA = {
    totalProducts: window.PRODUCTS.length,
    categories: [...new Set(window.PRODUCTS.map(p => p.category))].sort(),
    priceRange: {
        min: Math.min(...window.PRODUCTS.map(p => p.price)),
        max: Math.max(...window.PRODUCTS.map(p => p.price))
    },
    featuredProducts: window.PRODUCTS.filter(p => p.featured),
    inStockProducts: window.PRODUCTS.filter(p => p.inStock),
    lastUpdated: '2025-08-24'
};

// Helper functions for product management
window.PRODUCT_UTILS = {
    /**
     * Get products by category
     * @param {string} category - Category name
     * @returns {Array} Products in category
     */
    getByCategory: (category) => {
        return window.PRODUCTS.filter(p => p.category === category);
    },
    
    /**
     * Get featured products
     * @returns {Array} Featured products
     */
    getFeatured: () => {
        return window.PRODUCTS.filter(p => p.featured);
    },
    
    /**
     * Get products in price range
     * @param {number} min - Minimum price
     * @param {number} max - Maximum price
     * @returns {Array} Products in price range
     */
    getInPriceRange: (min, max) => {
        return window.PRODUCTS.filter(p => p.price >= min && p.price <= max);
    },
    
    /**
     * Search products by term
     * @param {string} term - Search term
     * @returns {Array} Matching products
     */
    search: (term) => {
        const lowerTerm = term.toLowerCase();
        return window.PRODUCTS.filter(p => 
            p.name.toLowerCase().includes(lowerTerm) ||
            p.description.toLowerCase().includes(lowerTerm) ||
            p.category.toLowerCase().includes(lowerTerm) ||
            (p.tags && p.tags.some(tag => tag.includes(lowerTerm)))
        );
    }
};

// Console message for developers
console.log('🍱 Product database loaded successfully!');
console.log(`📦 ${window.PRODUCTS.length} products available`);
console.log(`🏷️ ${window.PRODUCT_METADATA.categories.length} categories`);
console.log('💰 Price range: ₹' + window.PRODUCT_METADATA.priceRange.min + ' - ₹' + window.PRODUCT_METADATA.priceRange.max);

// Easter egg for curious developers
if (window.location.hostname === 'localhost' || window.location.hostname.includes('dev')) {
    console.log('%c🚀 Developer Mode Detected!', 'color: #ee780d; font-weight: bold;');
    console.log('Try: PRODUCT_UTILS.search("lightsaber")');
    console.log('Try: PRODUCT_UTILS.getFeatured()');
}