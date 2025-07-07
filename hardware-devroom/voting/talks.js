const talkData = [
  {
    id: '1v5av3j7m9',
    title: 'Fixable: How do we resist the planned obsolescence problem?',
    type: 'Lightning Talk',
    track: 'Hardware',
    url: 'https://fossunited.org/c/indiafoss/2025/cfp/1v5av3j7m9',
    description: `I will talk about how <a href="http://isfixable.com" target="_blank">isfixable.com</a> started and talk about hardware repairability from the consumers, not makers, point of view.

Key topics:
• How economic models have led to planned obsolescence of hardware products across categories
• How we are crowdsourcing community knowledge
• Government initiatives and whether they will be effective
• The goal is for buyers and repair-experts to empower each other, not "DIY"

I presented a version of this talk at <a href="https://www.misinfoconindia.com/schedule" target="_blank">MisinfoCon in March 2025</a> and <a href="https://barcampbangalore.com/bcb/bcb-2025/technology-bcb-2025/a-wiki-for-repair-friendly-hardware-products-in-india" target="_blank">BarcampBangalore 2025</a>.`,
    links: [
      { title: 'isfixable.com', url: 'http://isfixable.com' },
      { title: 'MisinfoCon 2025 Schedule', url: 'https://www.misinfoconindia.com/schedule' },
      { title: 'MisinfoCon 2025 Recording', url: 'https://drive.google.com/file/d/1RPL1JdBNj3DBiprMhjQKldV70O6IGJUO/view' },
      { title: 'BarcampBangalore 2025 Session', url: 'https://barcampbangalore.com/bcb/bcb-2025/technology-bcb-2025/a-wiki-for-repair-friendly-hardware-products-in-india' }
    ],
    voted: false
  },
  {
    id: 'fgt0th22r3',
    title: 'Makerville Badge',
    type: 'Lightning Talk',
    track: 'Hardware',
    url: 'https://fossunited.org/c/indiafoss/2025/cfp/fgt0th22r3',
    description: `Makerville is an open source hardware community. We have our Telegram channel for discussions and rants, a wiki for sharing resources, and an annual conference to come together. We have done some fun projects together as a community like the Traveling Hacker Box, and the Vendor Wiki List. But now we are making our own devboards in the form of a badge!

In this talk, I'll show how we built it using only open-source tools - and how we are making fun things out of the same hardware by overloading the basic badge firmware.

You'll learn to use the following open source tools:
• OpenSCAD to write code to design enclosures for the badge
• KiCAD to tweak the PCB
• Zephyr to bend the ESP32C3 to your will
• WebBluetooth to change the badge on the go`,
    links: [],
    voted: false
  },
  {
    id: '3q88q9klng',
    title: 'Design of a Nutube Raspberry Pi HAT',
    type: 'Lightning Talk',
    track: 'Hardware',
    url: 'https://fossunited.org/c/indiafoss/2025/cfp/3q88q9klng',
    description: `I am currently designing a Raspberry Pi audio HAT using the Nutube 6P1 (flat vacuum tube). I'd like to talk about the process involved in the conception and execution of such projects.

Key topics:
• How to put together a non-trivial hardware design from reference designs
• Hardware development process
• Hardware ecosystem in India

This has a lot of potential to be a very informative talk. Be sure to have a lot of pictures and/or video. Be sure to explain your journey to why you wanted to make this thing as well as the making of it.`,
    links: [],
    voted: false
  },
  {
    id: 'b3hd06oqbv',
    title: 'Because Glancing at Your Phone While Riding 2 Wheelers Is Dumb !!!',
    type: 'Lightning Talk',
    track: 'Hardware',
    url: 'https://fossunited.org/c/indiafoss/2025/cfp/b3hd06oqbv',
    description: `Engotta (എങ്ങോട്ടാ) - in Malayalam means 'where to?' like 'where are you going?'

A Product that came into existence because of the sheer number of times I have to stop my bike to check maps, only to find that I missed a turn. SOOO, Introducing Engotta, an open Hardware Project for Navigation. It's a display that can be mounted on scooters and bikes so that it gives directional navigation for users, now I don't need to look at Maps after every turn YAAAYY ✨

Technical Details: uses ESP32, a .96 inch OLED Display, a Real Time Clock, to show time when not navigating and some power management stuff.

I'm still working on it and expect to complete it within a month or so. In future I would also be 3D printing a case to attach it to scooters/bikes, and will be improving the hardware along the way, such as building custom PCBs.`,
    links: [],
    voted: false
  },
  {
    id: '3e4nk9prdh',
    title: 'CircuitVerse: Making Digital Logic Simulation a Breeze',
    type: 'Lightning Talk',
    track: 'Hardware',
    url: 'https://fossunited.org/c/indiafoss/2025/cfp/3e4nk9prdh',
    description: `I'm Aman Asrani—a developer at Juspay, a GSOC '24 contributor to CircuitVerse, and one of its current maintainers. In this 15-minute lightning talk, I'll guide you through how CircuitVerse turns what was once an expensive, resource-hungry, and complex process into something anyone can start exploring with a single click.

What you'll see, step by step:
1. Live "Hello, World!" of Digital Logic - Open your browser, point at CircuitVerse, and you're already set. No downloads, no licenses—just instant circuit magic.
2. Features CircuitVerse Provides - Combinational-circuit generators, interactive timing diagrams, built-in testbench, Verilog module export, and Assignment Suite for teachers.
3. Under the Hood & On the Horizon - Vue.js makeover, Verilog 2.0 superpowers, and Arduino & ESP32 I/O integration coming under GSoC 2025.
4. Real Impact & Community - Over 1 million circuits and 150,000+ active users worldwide.

CircuitVerse isn't just a simulator anymore—it's your one-click playground from theory to hands-on hardware.`,
    links: [
      { title: 'CircuitVerse YouTube Tutorial', url: 'https://youtu.be/WqlEjo7afjA?si=ZEMfd1JRjMgvW15U' }
    ],
    voted: false
  },
  {
    id: 'eph0a7phr8',
    title: 'JIgIta - jump to soldering joy from pain',
    type: 'Lightning Talk',
    track: 'Hardware',
    url: 'https://fossunited.org/c/indiafoss/2025/cfp/eph0a7phr8',
    description: `Most electronic circuits now-a-days include a lot of SMD components. That said, through hole (TH) components are still widely used. Soldering TH components onto PCBs requires holding them in place in the right position and orientation. This is a skill by itself.

<a href="https://github.com/shreekumar3d/jigita" target="_blank">JigIta</a> is a software tool that generates a 3D printable jig from any PCB design in minutes in one single step. With the jig in hand, soldering becomes as easy as 1-2-3:
1. Insert components into the jig
2. Slide in PCB into place
3. Solder away for perfect results

JigIt is parametric and allows complete control over fitting tolerances. It can create designs that need less material for 3D printing, compared to hand made designs.

This talk will illustrate how you can use JigIt to simplify your own soldering workflows and cover the novel "corner avoidance" technique for better fitting 3D printable models.`,
    links: [
      { title: 'JigIta GitHub Repository', url: 'https://github.com/shreekumar3d/jigita' },
      { title: 'Raspberry Pi Pico Jig Usage Example', url: 'https://github.com/shreekumar3d/jigita/blob/main/demo/01-rpi-pico-soldering-jig/fitting/piCo-jig-usage.gif' }
    ],
    voted: false
  },
  {
    id: '872pp0almf',
    title: 'Portable Social Buddy, the Maker\'s Sidekick!',
    type: 'Lightning Talk',
    track: 'Hardware',
    url: 'https://fossunited.org/c/indiafoss/2025/cfp/872pp0almf',
    description: `A simple expressive home-made open source Buddy made with lying around hobbyist parts, powered by an ESP32. Because of this, it will try to be infinitely hackable, allowing end users to install their own firmware or features if they wish.

Loosely inspired by the Tamagotchi community and community-made desk toys, it will react to its surroundings through external stimulus (like movement or touch), and expresses itself accordingly through the display!

Technical Specs:
• ESP32 Variant with Wi-Fi and Bluetooth
• IIC OLED Display
• Battery Powered, preferably rechargeable with lithium-ion batteries
• Piezo Buzzer/Mini Speaker
• MPU6050 or better Accelerometer

This talk will focus on the planning, challenges and prototyping process, plus a quick demo of what it can do and how functionality can be extended.`,
    links: [],
    voted: false
  },
  {
    id: '4kjn23beab',
    title: 'VoltQuest: Open Source Hardware Gaming',
    type: 'Lightning Talk',
    track: 'Hardware',
    url: 'https://fossunited.org/c/indiafoss/2025/cfp/4kjn23beab',
    description: `VoltQuest is a free, open-source educational game that makes electronics learning fun. Built with C++ and Raylib, it transforms circuit theory into interactive gameplay — where you build virtual circuits, see real-time feedback, and progress from blinking LEDs to logic puzzles and full mini-projects.

The game is in active development, with core systems and UI already in place. A playable prototype with multiple chapters and dozens of levels is planned to be released before the event.

Technical Details:
• C++ / Raylib for performance and cross-platform support
• Custom physics/simulation engine under development
• JSON-driven level system

VoltQuest is not just a game but an open source educational platform — making hands-on electronics accessible to anyone with a phone or laptop. By blending gameplay with learning, it lowers the barrier to entry for STEM.`,
    links: [],
    voted: false
  },
  {
    id: 'cuslb7o4qp',
    title: 'CoryDora: A Macropad, A Supply Chain, and A Case for Local Manufacturing',
    type: 'Lightning Talk',
    track: 'Hardware',
    url: 'https://fossunited.org/c/indiafoss/2025/cfp/cuslb7o4qp',
    description: `This talk is the story of CoryDora, an open-source macropad I designed, assembled, and sold entirely from my home in India. Unlike mass-produced factory items, it's a small, handmade project built with open tools and persistence.

Through this journey, I explore what it truly takes to bring hardware into the world today. I'll walk through the process of building CoryDora, part by part, using it as a lens to examine supply chains, the dominance of global manufacturing (especially China), and why rebuilding local manufacturing capabilities matters now more than ever.

Key topics:
• The full supply chain behind CoryDora, from keycaps to microcontrollers
• How I designed, prototyped, and shipped the Macropad from my home in India
• The hidden challenges of sourcing locally and what's missing in the Indian hardware ecosystem
• Why small-scale, local manufacturing matters for creativity, community, and resilience

This talk blends hands-on hardware experience with reflection on the broader systems we rely on and what it means to be a builder outside the factory system.`,
    links: [],
    voted: false
  },
  {
    id: 'a8fit07dot',
    title: 'Designing UX for Human-Machine interaction',
    type: 'Lightning Talk',
    track: 'Hardware',
    url: 'https://fossunited.org/c/indiafoss/2025/cfp/a8fit07dot',
    description: `This talk outlines the approach and considerations involved in designing human interface guidelines for embedded systems.

This talk will guide the audience on breaking down the UX into layers like performance, modularity, tactile UX, and small-screen interaction. Key focus areas include building a design system, incorporating ergonomics, designing for physical inputs and gestures, handling edge cases, and integrating user feedback into UI behavior.

The talk will also cover how to create an open design process emphasizing collaboration and transparency. This includes working alongside open-source developers, publishing design files, conducting collaborative user testing, iterating based on feedback, and building UX flows in sync with hardware engineering.

Target Audience: Engineers who are interested in building user interfaces for their hardware, how they can leverage good design practices along with technical implementation.

The talk will be generalized but examples will be made from learnings in designing the UX for the Mecha Comet.`,
    links: [],
    voted: false
  },
  {
    id: '0gf740p4oj',
    title: 'Building modern GUI applications for embedded devices using game engine',
    type: 'Lightning Talk',
    track: 'Hardware',
    url: 'https://fossunited.org/c/indiafoss/2025/cfp/0gf740p4oj',
    description: `Most developers associate game engines with video games. But what if we could use their performance, real-time rendering, and input flexibility to build modern, interactive GUI applications—especially for embedded devices?

In this talk, we'll explore how Bevy, a modern data-driven game engine written in Rust, can be used beyond traditional games to power beautiful and responsive graphical user interfaces.

We'll cover:
• The limitations of existing GUI frameworks like GTK, Iced, and Dioxus
• Why a game engine? How Bevy's frame-based rendering, ECS architecture, and GPU rendering solve challenges in building custom GUI systems
• A practical introduction to Bevy's ECS (Entity Component System) and how it maps to UI composition
• Techniques for managing state, theming, and interactivity in complex GUI applications
• Building real-world applications—from launcher applications to interactive on-screen keyboards
• Deployment and performance considerations for embedded environments (Raspberry Pi, Mecha Comet, custom hardware)

Target Audience: Embedded developers, Rust developers, engineers building custom OS shells/dashboards, hobbyists working with ARM boards.`,
    links: [],
    voted: false
  },
  {
    id: '4v6f8ek2n0',
    title: 'Homelabbing with bare metal',
    type: 'Lightning Talk',
    track: 'Hardware',
    url: 'https://fossunited.org/c/indiafoss/2025/cfp/4v6f8ek2n0',
    description: `What does it take to build your own server rack?

I wanted a small rack for a Raspberry Pi, a camera, and a few other bits, which was too many parts for a typical plastic case, but way too little for an industrial server rack. I couldn't buy a small 10" 4U server rack anywhere, so I built my own using aluminium extrusions. Then I found nobody makes a 10" rack-mountable power strip either, so I made one.

Turns out everything I wanted in the rack runs on 12V or 5V, so I could ditch all those bulky power strips for my own power supply. A display? Done. Keyboard? Done-ish, because that is surprisingly harder than it seems.

Most of us have only experienced computing through a screen. The internet is just signal in the ether and the cloud is somewhere up there. Scale and size are just pinch-to-zoom. But all of those computers are real devices somewhere, and our understanding gets so much better when we bring all our senses into play.

This is a story of getting comfortable working with bare metal, from sawing aluminium at home and buying screws by the hundreds, to wiring it up and booting to login.

We'll learn about building metal frames, designing in 3D, where to source hardware, and how to setup your own homelab with power backup, WiFi, home automation and more.`,
    links: [],
    voted: false
  }
];