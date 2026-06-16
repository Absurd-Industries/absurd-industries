// ===================================================================
// ABSURD INVENTORY - COMPLETE DATA MODULE
// "Every Component, Tool, Book, Product, and Prototype Known to Amit"
// Last Updated: December 20, 2025
// ===================================================================

const inventoryData = [
  // ═══════════════════════════════════════════════════════════════
  // COMPONENTS - The Electronic Soul of Making
  // ═══════════════════════════════════════════════════════════════

  // MICROCONTROLLERS
  {
    id: "rpi-3b-001",
    name: "Raspberry Pi 3 Model B+",
    category: "components",
    subcategory: "microcontroller",
    quantity: 2,
    minimumStock: 1,
    location: "Cupboard Left",
    status: "available",
    dateAdded: "2024-11-15",
    purchaseDate: "2024-11-10",
    supplier: "Amazon India",
    price: 3500,
    images: [
      "https://images.unsplash.com/photo-1606489408805-9bc97e8bc7dc?w=800&q=80",
    ],
    notes:
      "One has GPIO headers soldered, one doesn't. Both working perfectly.",
    isPinned: false,
    specs: {
      architecture: "ARM Cortex-A53",
      clockSpeed: "1.4GHz Quad-core",
      ram: "1GB LPDDR2",
      gpio: 40,
      connectivity: ["WiFi 2.4/5GHz", "Bluetooth 4.2", "Ethernet"],
      power: "5V 2.5A micro-USB",
    },
    usedInProjects: [],
  },

  {
    id: "esp32-devkit-001",
    name: "ESP32 DevKit V1 (30-pin)",
    category: "components",
    subcategory: "microcontroller",
    quantity: 3,
    minimumStock: 2,
    location: "Transparent Shelf",
    status: "low-stock",
    dateAdded: "2024-10-20",
    purchaseDate: "2024-10-15",
    supplier: "Robu.in",
    price: 650,
    images: [
      "https://images.unsplash.com/photo-1553406830-ef2513450d76?w=800&q=80",
    ],
    notes:
      "The Swiss Army knife of IoT. WiFi, Bluetooth, and enough GPIO to make your head spin.",
    isPinned: true,
    specs: {
      architecture: "Xtensa Dual-Core 32-bit LX6",
      clockSpeed: "Up to 240MHz",
      ram: "520KB SRAM",
      flash: "4MB",
      gpio: 30,
      connectivity: ["WiFi 802.11 b/g/n", "Bluetooth 4.2 & BLE"],
      power: "5V via micro-USB or 3.3V",
    },
    usedInProjects: [],
  },

  // LEDS
  {
    id: "led-ws2812b-001",
    name: "WS2812B Addressable LED Strip",
    category: "components",
    subcategory: "led",
    quantity: "unknown",
    minimumStock: 2,
    location: "Loft",
    status: "available",
    dateAdded: "2024-12-01",
    purchaseDate: "2024-11-28",
    supplier: "Robu.in",
    price: 450,
    images: [
      "https://images.unsplash.com/photo-1563089145-599997674d42?w=800&q=80",
    ],
    notes:
      "RGB addressable LEDs. Perfect for mood lighting and questionable life choices. ~60 LEDs per meter.",
    isPinned: true,
    specs: {
      type: "WS2812B",
      ledDensity: "60/meter",
      voltage: "5V DC",
      powerConsumption: "~18W/meter at full white",
      colors: "16.7 million (24-bit RGB)",
    },
    usedInProjects: [],
  },

  {
    id: "led-spools-001",
    name: "LED Spools (Various)",
    category: "components",
    subcategory: "led",
    quantity: "unknown",
    minimumStock: 0,
    location: "Loft",
    status: "available",
    dateAdded: "2024-01-01",
    images: [],
    notes: "Assorted LED spools. The blinky good stuff.",
    isPinned: false,
    specs: {},
    usedInProjects: [],
  },

  // ACTUATORS
  {
    id: "servo-mg996r-001",
    name: "MG996R High-Torque Servo Motor",
    category: "components",
    subcategory: "actuator",
    quantity: 5,
    minimumStock: 3,
    location: "Cupboard Left",
    status: "available",
    dateAdded: "2024-11-25",
    purchaseDate: "2024-11-20",
    supplier: "Robu.in",
    price: 350,
    images: [
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
    ],
    notes:
      "Metal gear servos. Perfect for robotic arms and general mechanical mischief.",
    isPinned: false,
    specs: {
      type: "Digital Servo",
      torque: "11kg-cm at 6V",
      speed: "0.17s/60° at 6V",
      voltage: "4.8V - 7.2V",
      rotationRange: "180°",
      gearType: "Metal",
    },
    usedInProjects: [],
  },

  // DISPLAYS
  {
    id: "oled-096-i2c-001",
    name: 'OLED Display 0.96" I2C (128x64)',
    category: "components",
    subcategory: "display",
    quantity: 4,
    minimumStock: 2,
    location: "Transparent Bottom Shelf",
    status: "available",
    dateAdded: "2024-12-05",
    purchaseDate: "2024-12-01",
    supplier: "Amazon India",
    price: 280,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    ],
    notes: "Tiny screen, big personality. Perfect for existential messages.",
    isPinned: false,
    specs: {
      size: "0.96 inch",
      resolution: "128x64 pixels",
      interface: "I2C",
      driver: "SSD1306",
      voltage: "3.3V - 5V",
    },
    usedInProjects: [],
  },

  // ═══════════════════════════════════════════════════════════════
  // BOOKS - The Wisdom Archives
  // ═══════════════════════════════════════════════════════════════

  {
    id: "book-elements-001",
    name: "The Elements Photographic Deck of Cards",
    category: "books",
    subcategory: "reference",
    quantity: 1,
    location: "Workshop Shelf",
    status: "available",
    dateAdded: "2023-01-01",
    images: [],
    notes: "Beautiful periodic table card deck. Science meets art.",
    isPinned: false,
    specs: {
      author: "Theodore Gray",
      type: "Card Deck",
      readStatus: "completed",
    },
    usedInProjects: [],
  },

  {
    id: "book-character-encyclopedia-001",
    name: "Character Encyclopedia",
    category: "books",
    subcategory: "reference",
    quantity: 1,
    location: "Workshop Shelf",
    status: "available",
    dateAdded: "2023-01-01",
    images: [],
    notes: "",
    isPinned: false,
    specs: {
      readStatus: "unread",
    },
    usedInProjects: [],
  },

  {
    id: "book-starwars-visual-001",
    name: "Star Wars Visual Encyclopedia",
    category: "books",
    subcategory: "reference",
    quantity: 1,
    location: "Workshop Shelf",
    status: "available",
    dateAdded: "2023-01-01",
    images: [],
    notes:
      "Research material for SuperSaber project. May the Force be with us.",
    isPinned: false,
    specs: {
      readStatus: "reading",
    },
    usedInProjects: ["supersaber"],
  },

  {
    id: "book-things-we-make-001",
    name: "The Things We Make",
    category: "books",
    subcategory: "inspiration",
    quantity: 1,
    location: "Workshop Shelf",
    status: "available",
    dateAdded: "2023-01-01",
    images: [],
    notes: "Core philosophy book for Absurd Industries.",
    isPinned: true,
    specs: {
      readStatus: "completed",
      rating: 5,
    },
    usedInProjects: [],
  },

  {
    id: "book-asap-science-001",
    name: "ASAP Science",
    category: "books",
    subcategory: "reference",
    quantity: 1,
    location: "Workshop Shelf",
    status: "available",
    dateAdded: "2023-01-01",
    images: [],
    notes: "",
    isPinned: false,
    specs: {
      readStatus: "unread",
    },
    usedInProjects: [],
  },

  {
    id: "book-open-circuits-001",
    name: "Open Circuits",
    category: "books",
    subcategory: "technical",
    quantity: 1,
    location: "Workshop Shelf",
    status: "available",
    dateAdded: "2023-01-01",
    images: [],
    notes: "Gorgeous PCB photography. Makes electronics look like art.",
    isPinned: true,
    specs: {
      author: "Eric Schlaepfer & Windell Oskay",
      readStatus: "reading",
      rating: 5,
    },
    usedInProjects: [],
  },

  {
    id: "book-folding-techniques-001",
    name: "Folding Techniques for Designers: From Sheet to Form",
    category: "books",
    subcategory: "technical",
    quantity: 1,
    location: "Workshop Shelf",
    status: "available",
    dateAdded: "2023-01-01",
    images: [],
    notes: "Paper engineering wizardry.",
    isPinned: false,
    specs: {
      author: "Paul Jackson",
      readStatus: "unread",
    },
    usedInProjects: [],
  },

  {
    id: "book-irresponsible-science-001",
    name: "Wholly Irresponsible Science",
    category: "books",
    subcategory: "inspiration",
    quantity: 1,
    location: "Workshop Shelf",
    status: "available",
    dateAdded: "2023-01-01",
    images: [],
    notes: "Perfect for Hack for Nothing hackathon vibes.",
    isPinned: false,
    specs: {
      readStatus: "completed",
    },
    usedInProjects: [],
  },

  {
    id: "book-never-leave-well-001",
    name: "Never Leave Well Enough Alone",
    category: "books",
    subcategory: "inspiration",
    quantity: 1,
    location: "Workshop Shelf",
    status: "available",
    dateAdded: "2023-01-01",
    images: [],
    notes: "The maker's manifesto.",
    isPinned: false,
    specs: {
      readStatus: "completed",
    },
    usedInProjects: [],
  },

  {
    id: "book-how-many-moons-001",
    name: "How Many Moons Does the Earth Have?",
    category: "books",
    subcategory: "reference",
    quantity: 1,
    location: "Workshop Shelf",
    status: "available",
    dateAdded: "2023-01-01",
    images: [],
    notes: "",
    isPinned: false,
    specs: {
      readStatus: "unread",
    },
    usedInProjects: [],
  },

  {
    id: "book-trash-world-news-001",
    name: "Trash World News",
    category: "books",
    subcategory: "inspiration",
    quantity: 1,
    location: "Workshop Shelf",
    status: "available",
    dateAdded: "2023-01-01",
    images: [],
    notes: "",
    isPinned: false,
    specs: {
      readStatus: "unread",
    },
    usedInProjects: [],
  },

  {
    id: "book-polymaker-catalogue-001",
    name: "Polymaker Catalogue",
    category: "books",
    subcategory: "reference",
    quantity: 1,
    location: "Workshop Shelf",
    status: "available",
    dateAdded: "2023-01-01",
    images: [],
    notes: "3D printing filament reference.",
    isPinned: false,
    specs: {
      type: "Catalogue",
    },
    usedInProjects: [],
  },

  {
    id: "book-lego-mindstorms-001",
    name: "Lego Mindstorms",
    category: "books",
    subcategory: "technical",
    quantity: 1,
    location: "Workshop Shelf",
    status: "available",
    dateAdded: "2023-01-01",
    images: [],
    notes: "",
    isPinned: false,
    specs: {
      readStatus: "unread",
    },
    usedInProjects: [],
  },

  {
    id: "book-paper-art-now-001",
    name: "Paper Art Now",
    category: "books",
    subcategory: "inspiration",
    quantity: 1,
    location: "Workshop Shelf",
    status: "available",
    dateAdded: "2023-01-01",
    images: [],
    notes: "",
    isPinned: false,
    specs: {
      readStatus: "reading",
    },
    usedInProjects: [],
  },

  {
    id: "book-how-things-work-001",
    name: "How Things Work",
    category: "books",
    subcategory: "reference",
    quantity: 1,
    location: "Workshop Shelf",
    status: "available",
    dateAdded: "2023-01-01",
    images: [],
    notes: "The eternal question answered.",
    isPinned: false,
    specs: {
      readStatus: "reading",
    },
    usedInProjects: [],
  },

  // ═══════════════════════════════════════════════════════════════
  // PRODUCTS - Finished Hardware & Kits
  // ═══════════════════════════════════════════════════════════════

  {
    id: "prod-clickers-001",
    name: "Clickers",
    category: "products",
    subcategory: "misc",
    quantity: 1,
    location: "Cupboard",
    status: "available",
    dateAdded: "2023-01-01",
    images: [],
    notes: "To be categorized in inventory.",
    isPinned: false,
    specs: {},
    usedInProjects: [],
  },

  {
    id: "prod-cosmo-001",
    name: "Cosmo",
    category: "products",
    subcategory: "robot",
    quantity: 1,
    location: "Transparent Shelf",
    status: "available",
    dateAdded: "2023-01-01",
    images: [],
    notes: "Anki's legendary little robot. RIP Anki, you beautiful bastards.",
    isPinned: true,
    specs: {
      brand: "Anki",
      type: "Companion Robot",
      workingStatus: "functional",
    },
    usedInProjects: [],
  },

  {
    id: "prod-merge-cube-001",
    name: "Holographic Merge Cube",
    category: "products",
    subcategory: "ar-vr",
    quantity: 1,
    location: "Transparent Shelf",
    status: "available",
    dateAdded: "2023-01-01",
    images: [],
    notes: "AR cube for spatial computing experiments.",
    isPinned: false,
    specs: {
      brand: "MergeVR",
    },
    usedInProjects: [],
  },

  {
    id: "prod-eezybot-001",
    name: "Kit EEZYbotARM",
    category: "products",
    subcategory: "robot-kit",
    quantity: 1,
    location: "Transparent Shelf",
    status: "available",
    dateAdded: "2023-01-01",
    images: [],
    notes: "3D printed robotic arm kit.",
    isPinned: false,
    specs: {
      type: "Robot Arm Kit",
    },
    usedInProjects: [],
  },

  {
    id: "prod-bittle-001",
    name: "Bittle Bionic Robot Dog",
    category: "products",
    subcategory: "robot",
    quantity: 1,
    location: "Transparent Shelf",
    status: "in-use",
    dateAdded: "2023-01-01",
    images: [],
    notes: "Quadruped robot dog. Servo & battery backup in components.",
    isPinned: true,
    specs: {
      brand: "Petoi",
      type: "Quadruped Robot",
      workingStatus: "functional",
    },
    usedInProjects: ["deutron-research"],
  },

  {
    id: "prod-corydora-001",
    name: "Corydora Case Sets",
    category: "products",
    subcategory: "storage",
    quantity: 4,
    location: "Cupboard Left",
    status: "available",
    dateAdded: "2023-01-01",
    images: [],
    notes: "Component storage cases. Organization is aspirational.",
    isPinned: false,
    specs: {},
    usedInProjects: [],
  },

  {
    id: "prod-makey-makey-001",
    name: "Makey Makey Kit",
    category: "products",
    subcategory: "electronics-kit",
    quantity: 1,
    location: "Transparent Bottom Shelf",
    status: "available",
    dateAdded: "2023-01-01",
    images: [],
    notes: "Turn anything into a keyboard. Chaos enabler.",
    isPinned: false,
    specs: {
      type: "Invention Kit",
    },
    usedInProjects: [],
  },

  {
    id: "prod-platronica-platron-001",
    name: "Platronica Platron",
    category: "products",
    subcategory: "sound-kit",
    quantity: 1,
    location: "Storage",
    status: "available",
    dateAdded: "2023-01-01",
    images: [],
    notes: "Interactive sound experimentation kit.",
    isPinned: false,
    specs: {
      brand: "Platronica",
    },
    usedInProjects: [],
  },

  {
    id: "prod-platronica-touch-001",
    name: "Platronica Touch Me",
    category: "products",
    subcategory: "sound-kit",
    quantity: 1,
    location: "Storage",
    status: "available",
    dateAdded: "2023-01-01",
    images: [],
    notes: "Capacitive touch sound kit. Perfect for hackathon absurdity.",
    isPinned: false,
    specs: {
      brand: "Platronica",
    },
    usedInProjects: [],
  },

  {
    id: "prod-sunking-solar-001",
    name: "Sunking Solar Light",
    category: "products",
    subcategory: "lighting",
    quantity: 7,
    location: "Storage",
    status: "available",
    dateAdded: "2023-01-01",
    images: [],
    notes: "Solar-powered lights. Off-grid lighting experiments.",
    isPinned: false,
    specs: {
      brand: "Sunking",
      type: "Solar Light",
    },
    usedInProjects: [],
  },

  {
    id: "prod-led-cylindrical-001",
    name: "LED Cylindrical Light",
    category: "products",
    subcategory: "lighting",
    quantity: 1,
    location: "Storage",
    status: "available",
    dateAdded: "2023-01-01",
    images: [],
    notes: "",
    isPinned: false,
    specs: {},
    usedInProjects: [],
  },

  {
    id: "prod-playstation-eye-001",
    name: "PlayStation Eye",
    category: "products",
    subcategory: "camera",
    quantity: 1,
    location: "Storage",
    status: "available",
    dateAdded: "2023-01-01",
    images: [],
    notes: "Computer vision experiments. The all-seeing eye.",
    isPinned: false,
    specs: {
      type: "Camera",
      resolution: "640x480 @ 60fps",
    },
    usedInProjects: [],
  },

  {
    id: "prod-mecha-comet-pilot-001",
    name: "Mecha Comet Pilot",
    category: "products",
    subcategory: "robot",
    quantity: 1,
    location: "Transparent Shelf",
    status: "available",
    dateAdded: "2023-01-01",
    images: [],
    notes: "",
    isPinned: false,
    specs: {
      brand: "Mecha",
    },
    usedInProjects: [],
  },

  {
    id: "prod-mecha-comet-kit-001",
    name: "Mecha Comet Kit",
    category: "products",
    subcategory: "robot-kit",
    quantity: 1,
    location: "Transparent Shelf",
    status: "available",
    dateAdded: "2023-01-01",
    images: [],
    notes: "",
    isPinned: false,
    specs: {
      brand: "Mecha",
    },
    usedInProjects: [],
  },

  {
    id: "prod-electronics-repair-001",
    name: "Electronics To Be Repaired",
    category: "products",
    subcategory: "broken",
    quantity: 1,
    location: "Storage",
    status: "out-of-stock",
    dateAdded: "2023-01-01",
    images: [],
    notes: "The shame box. We all have one.",
    isPinned: false,
    specs: {
      type: "Box of Broken Dreams",
    },
    usedInProjects: [],
  },

  // ═══════════════════════════════════════════════════════════════
  // PROTOTYPES - Your Beautiful WIP Projects
  // ═══════════════════════════════════════════════════════════════

  {
    id: "proto-mantis-001",
    name: "Mantis",
    category: "prototypes",
    subcategory: "robot",
    quantity: 1,
    location: "Transparent Bottom Shelf",
    status: "in-use",
    dateAdded: "2022-01-01",
    images: [],
    notes: "Insectoid robot prototype. Creepy but cool.",
    isPinned: false,
    specs: {
      projectStatus: "in-progress",
      iteration: "v1.0",
      workingStatus: "partially-working",
    },
    usedInProjects: [],
  },

  {
    id: "proto-human-eye-001",
    name: "Human Eye",
    category: "prototypes",
    subcategory: "art",
    quantity: 1,
    location: "Transparent Bottom Shelf",
    status: "available",
    dateAdded: "2022-01-01",
    images: [],
    notes: "Because why not build an eyeball?",
    isPinned: false,
    specs: {
      projectStatus: "completed",
      workingStatus: "display-piece",
    },
    usedInProjects: [],
  },

  {
    id: "proto-deutron-001",
    name: "Deutron",
    category: "prototypes",
    subcategory: "robot",
    quantity: 1,
    location: "Transparent Bottom Shelf",
    status: "in-use",
    dateAdded: "2023-01-01",
    images: [],
    notes: "Quadruped sentient desk buddy. The OG absurd project.",
    isPinned: true,
    specs: {
      projectStatus: "in-progress",
      iteration: "v2.0",
      workingStatus: "functional",
      features: [
        "Quadruped locomotion",
        "Personality modules",
        "Desk companion",
      ],
    },
    usedInProjects: [],
  },

  {
    id: "proto-deutron-spider-001",
    name: "Deutron Spider",
    category: "prototypes",
    subcategory: "robot",
    quantity: 1,
    location: "Transparent Bottom Shelf",
    status: "available",
    dateAdded: "2023-01-01",
    images: [],
    notes: "Six-legged variant. More legs = more chaos.",
    isPinned: false,
    specs: {
      projectStatus: "completed",
      iteration: "v1.0",
      workingStatus: "functional",
    },
    usedInProjects: [],
  },

  {
    id: "proto-kame-001",
    name: "Kame",
    category: "prototypes",
    subcategory: "robot",
    quantity: 1,
    location: "Transparent Bottom Shelf",
    status: "available",
    dateAdded: "2022-01-01",
    images: [],
    notes:
      "Turtle-bot. Slow and steady loses the race, but looks cool doing it.",
    isPinned: false,
    specs: {
      projectStatus: "completed",
      workingStatus: "functional",
    },
    usedInProjects: [],
  },

  {
    id: "proto-robotic-arm-001",
    name: "Robotic Arm",
    category: "prototypes",
    subcategory: "robot",
    quantity: 1,
    location: "Transparent Bottom Shelf",
    status: "available",
    dateAdded: "2022-01-01",
    images: [],
    notes: "Multi-axis arm prototype.",
    isPinned: false,
    specs: {
      projectStatus: "in-progress",
      workingStatus: "partially-working",
    },
    usedInProjects: [],
  },

  {
    id: "proto-supersaber-battery-001",
    name: "Super Saber Battery Prototype",
    category: "prototypes",
    subcategory: "lightsaber",
    quantity: 1,
    location: "Storage",
    status: "available",
    dateAdded: "2024-01-01",
    images: [],
    notes: "Early battery design for SuperSaber.",
    isPinned: false,
    specs: {
      projectStatus: "abandoned",
      iteration: "v0.1",
    },
    usedInProjects: ["supersaber"],
  },

  {
    id: "proto-supersaber-mark1-001",
    name: "Super Saber Battery Prototype Mark 1",
    category: "prototypes",
    subcategory: "lightsaber",
    quantity: 1,
    location: "Cupboard Right",
    status: "available",
    dateAdded: "2024-01-01",
    images: [],
    notes: "First iteration battery housing.",
    isPinned: false,
    specs: {
      projectStatus: "completed",
      iteration: "Mark 1",
    },
    usedInProjects: ["supersaber"],
  },

  {
    id: "proto-supersaber-mark2-001",
    name: "Super Saber Battery Prototype Diamond Mark 2",
    category: "prototypes",
    subcategory: "lightsaber",
    quantity: 1,
    location: "Cupboard Right",
    status: "available",
    dateAdded: "2024-01-01",
    images: [],
    notes: "Second iteration with diamond pattern. Getting fancy.",
    isPinned: false,
    specs: {
      projectStatus: "completed",
      iteration: "Mark 2",
    },
    usedInProjects: ["supersaber"],
  },

  {
    id: "proto-infinity-mirror-001",
    name: "Handsize Infinity Mirror Broken",
    category: "prototypes",
    subcategory: "lighting",
    quantity: 1,
    location: "Storage",
    status: "out-of-stock",
    dateAdded: "2022-01-01",
    images: [],
    notes: "RIP little buddy. Infinite sadness in finite space.",
    isPinned: false,
    specs: {
      projectStatus: "abandoned",
      workingStatus: "broken",
    },
    usedInProjects: [],
  },

  {
    id: "proto-starks-heart-001",
    name: "Stark's Heart",
    category: "prototypes",
    subcategory: "art",
    quantity: 1,
    location: "Storage",
    status: "available",
    dateAdded: "2023-01-01",
    images: [],
    notes: "Arc Reactor replica. I am Iron Man.",
    isPinned: true,
    specs: {
      projectStatus: "completed",
      workingStatus: "functional",
      inspiration: "MCU Arc Reactor",
    },
    usedInProjects: [],
  },

  {
    id: "proto-ark-lamp-001",
    name: "ARK LAMP",
    category: "prototypes",
    subcategory: "lighting",
    quantity: 1,
    location: "Storage",
    status: "available",
    dateAdded: "2023-01-01",
    images: [],
    notes: "Arc Reactor lamp. Glows with the power of palladium (LEDs).",
    isPinned: false,
    specs: {
      projectStatus: "completed",
      workingStatus: "functional",
    },
    usedInProjects: [],
  },

  {
    id: "proto-ravish-supersaber-001",
    name: "Ravish's Super Saber + Holder",
    category: "prototypes",
    subcategory: "lightsaber",
    quantity: 1,
    location: "Loft",
    status: "available",
    dateAdded: "2024-01-01",
    images: [],
    notes: "Custom SuperSaber for Ravish. May the Force be with him.",
    isPinned: true,
    specs: {
      projectStatus: "completed",
      workingStatus: "functional",
      owner: "Ravish",
    },
    usedInProjects: ["supersaber"],
  },

  {
    id: "proto-led-copper-jewelry-001",
    name: "LED Copper Jewelry",
    category: "prototypes",
    subcategory: "wearable",
    quantity: 1,
    location: "Cupboard Right",
    status: "available",
    dateAdded: "2023-01-01",
    images: [],
    notes: "Wearable LED jewelry. Shine bright like a circuit board.",
    isPinned: false,
    specs: {
      projectStatus: "completed",
      workingStatus: "functional",
    },
    usedInProjects: [],
  },

  // ═══════════════════════════════════════════════════════════════
  // MISC - The "What Even Is This?" Category
  // ═══════════════════════════════════════════════════════════════

  {
    id: "misc-ezra-toy-001",
    name: "Ezra Toy",
    category: "misc",
    subcategory: "toy",
    quantity: 1,
    location: "Loft",
    status: "available",
    dateAdded: "2023-01-01",
    images: [],
    notes: "",
    isPinned: false,
    specs: {},
    usedInProjects: [],
  },

  {
    id: "misc-amaron-backup-001",
    name: "Amaron Power Backup Box",
    category: "misc",
    subcategory: "power",
    quantity: 1,
    location: "Loft",
    status: "available",
    dateAdded: "2023-01-01",
    images: [],
    notes: "Power backup for when Bengaluru decides electricity is optional.",
    isPinned: false,
    specs: {
      brand: "Amaron",
    },
    usedInProjects: [],
  },

  {
    id: "misc-ac-holders-001",
    name: "Air Conditioner Holders",
    category: "misc",
    subcategory: "fixture",
    quantity: 2,
    location: "Loft",
    status: "available",
    dateAdded: "2023-01-01",
    images: [],
    notes: "Because AC units need love too.",
    isPinned: false,
    specs: {},
    usedInProjects: [],
  },

  {
    id: "misc-security-camera-001",
    name: "Security Camera",
    category: "misc",
    subcategory: "surveillance",
    quantity: 1,
    location: "Storage",
    status: "available",
    dateAdded: "2023-01-01",
    images: [],
    notes: "Watching. Always watching.",
    isPinned: false,
    specs: {},
    usedInProjects: [],
  },

  {
    id: "misc-incandescent-bulb-001",
    name: "Incandescent Bulb - Broken Diffuser",
    category: "misc",
    subcategory: "broken",
    quantity: 1,
    location: "Storage",
    status: "out-of-stock",
    dateAdded: "2023-01-01",
    images: [],
    notes: "Not the brightest idea. Literally.",
    isPinned: false,
    specs: {
      condition: "broken",
    },
    usedInProjects: [],
  },
];

// ═══════════════════════════════════════════════════════════════
// CATEGORY DEFINITIONS
// ═══════════════════════════════════════════════════════════════
const categories = [
  { id: "all", name: "All", icon: "fas fa-th" },
  { id: "components", name: "Components", icon: "fas fa-microchip" },
  { id: "tools", name: "Tools", icon: "fas fa-tools" },
  { id: "books", name: "Books", icon: "fas fa-book" },
  { id: "products", name: "Products", icon: "fas fa-cube" },
  { id: "prototypes", name: "Prototypes", icon: "fas fa-flask" },
  { id: "misc", name: "Misc", icon: "fas fa-box" },
];

// ═══════════════════════════════════════════════════════════════
// LOADING MESSAGES - The Good Shit
// ═══════════════════════════════════════════════════════════════
const loadingMessages = [
  "Counting electrons...",
  "Asking components nicely...",
  "Consulting the void...",
  "Blue ball in SPACE thinking...",
  "Organizing chaos professionally...",
  "Finding that one resistor...",
  "Checking if LEDs are still LEDs...",
  "Negotiating with microcontrollers...",
  "Summoning the inventory spirits...",
  "Making sense of your madness...",
  "Herding digital cats...",
  "Convincing databases to cooperate...",
  "Bribing the WiFi gods...",
  "Untangling quantum states...",
  "Asking Deutron for advice...",
  "Performing a séance on broken circuits...",
  "Teaching servos to meditate...",
  "Explaining JavaScript to Arduino...",
  "Convincing LEDs to cooperate...",
  "Debugging the universe...",
];

// ═══════════════════════════════════════════════════════════════
// STATS & METADATA
// ═══════════════════════════════════════════════════════════════
const inventoryMetadata = {
  totalItems: inventoryData.length,
  lastUpdated: "2025-12-20T01:46:43+05:30",
  version: "1.0.0",
  owner: "Amit @ Absurd Industries",
  location: "Bengaluru, Karnataka, IN",
  philosophy: "Who gives a fuck, just do whatever you want.",
  inspiration: "Blue ball in SPACE",
  categories: {
    components: inventoryData.filter((i) => i.category === "components").length,
    books: inventoryData.filter((i) => i.category === "books").length,
    products: inventoryData.filter((i) => i.category === "products").length,
    prototypes: inventoryData.filter((i) => i.category === "prototypes").length,
    misc: inventoryData.filter((i) => i.category === "misc").length,
  },
};

// ═══════════════════════════════════════════════════════════════
// CONSOLE GREETING
// ═══════════════════════════════════════════════════════════════
console.log(`
╔══════════════════════════════════════════════════════════════╗
║  ABSURD INVENTORY SYSTEM v${inventoryMetadata.version}                         ║
║  "Organizing Chaos, One Component at a Time"                 ║
╠══════════════════════════════════════════════════════════════╣
║  Total Items: ${inventoryMetadata.totalItems}                                         ║
║  Components: ${inventoryMetadata.categories.components}                                          ║
║  Books: ${inventoryMetadata.categories.books}                                              ║
║  Products: ${inventoryMetadata.categories.products}                                           ║
║  Prototypes: ${inventoryMetadata.categories.prototypes}                                          ║
║  Misc: ${inventoryMetadata.categories.misc}                                               ║
╠══════════════════════════════════════════════════════════════╣
║  Built with 🧡 for Hack for Nothing 2025                    ║
║  May your resistors never burn & your LEDs always blink     ║
╚══════════════════════════════════════════════════════════════╝
`);

// ═══════════════════════════════════════════════════════════════
// END OF COMPLETE INVENTORY DATABASE
// "Every component tells a story. This is yours, Amit."
// ═══════════════════════════════════════════════════════════════
