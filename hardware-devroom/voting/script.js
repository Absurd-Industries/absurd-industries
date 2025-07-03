// MONO Democracy Machine - Vue.js Logic
const { createApp, ref, computed } = Vue;

// Talk Data with Scraped Content
const talkData = [
    {
        id: '1v5av3j7m9',
        title: 'Fixable: How do we resist the planned obsolescence problem?',
        type: 'Lightning Talk',
        track: 'Hardware',
        url: 'https://fossunited.org/c/indiafoss/2025/cfp/1v5av3j7m9',
        description: `I will talk about how isfixable.com started and talk about hardware repairability from the consumers, not makers, point of view.

Key topics:
• How economic models have led to planned obsolescence of hardware products across categories
• How we are crowdsourcing community knowledge
• Government initiatives and whether they will be effective
• The goal is for buyers and repair-experts to empower each other, not "DIY"

I presented a version of this talk at MisinfoCon in March 2025 and BarcampBangalore 2025. This talk will be useful for many attendees as we are all consumers of many products, and attending such talks could create awareness.`,
        voted: false
    },
    {
        id: 'fgt0th22r3',
        title: 'Makerville Badge',
        type: 'Talk',
        track: 'Hardware',
        url: 'https://fossunited.org/c/indiafoss/2025/cfp/fgt0th22r3',
        description: `Makerville is an open source hardware community. We have our Telegram channel for discussions and rants, a wiki for sharing resources, and an annual conference to come together.

In this talk, I'll show how we built our community badge using only open-source tools - and how we are making fun things out of the same hardware by overloading the basic badge firmware.

You'll learn to use the following open source tools:
• OpenSCAD to write code to design enclosures for the badge
• KiCAD to tweak the PCB
• Zephyr to bend the ESP32C3 to your will
• WebBluetooth to change the badge on the go

We've done fun projects together as a community like the Traveling Hacker Box, and the Vendor Wiki List. But now we are making our own devboards in the form of a badge!`,
        voted: false
    },
    {
        id: '3q88q9klng',
        title: 'Design of a Nutube Raspberry Pi HAT',
        type: 'Lightning Talk',
        track: 'Hardware',
        url: 'https://fossunited.org/c/indiafoss/2025/cfp/3q88q9klng',
        description: `I am currently designing a Raspberry Pi audio HAT using the Nutube 6P1 (flat vacuum tube). I'd like to talk about the process involved in the conception and execution of such projects.

Topics covered:
• How to put together a non-trivial hardware design from reference designs
• Hardware development process
• Hardware ecosystem in India

This talk will have a lot of pictures and/or video, explaining the journey of why I wanted to make this thing as well as the making of it. There may be many who have never considered making hardware, but would be inspired by this journey.`,
        voted: false
    },
    {
        id: 'agt50d66ih',
        title: 'AI Accelerators: The What, the Why, and Open Source Today',
        type: 'Talk',
        track: 'Hardware',
        url: 'https://fossunited.org/c/indiafoss/2025/cfp/agt50d66ih',
        description: `AI has outgrown general-purpose compute — yet we're still stuck in a world dominated by closed, GPU-heavy ecosystems. This session takes a systems-level look at AI accelerators: what they are, basic principles about how they work, and why open source efforts around them matter more than ever.

We'll cover:
• The rise of specialized hardware in the AI stack—and why CPUs and GPUs alone don't cut it
• What makes an AI accelerator: compute paradigms, memory models, dataflow architectures
• A reality check on the state of open source hardware and tooling for AI
• Why existing open-source efforts mostly build on proprietary hardware
• The NVIDIA monopoly isn't just a market issue—it's a bottleneck for innovation and autonomy
• Emerging efforts: Neuromorphic Hardware, Optical Computation, Alternative Fabrication methodologies

Whether you're an ML engineer, systems nerd, or just curious about what powers the models behind the curtain, this talk aims to offer a deeper technical and ecosystem-level understanding.`,
        voted: false
    },
    {
        id: 'b3hd06oqbv',
        title: 'Because Glancing at Your Phone While Riding 2 Wheelers Is Dumb !!!',
        type: 'Lightning Talk',
        track: 'Hardware',
        url: 'https://fossunited.org/c/indiafoss/2025/cfp/b3hd06oqbv',
        description: `Engotta (എങ്ങോട്ടാ) - in Malayalam means 'where to?' like 'where are you going?'

A Product that came into existence because of the sheer number of times I have to stop my bike to check maps, only to find that I missed a turn.

SOOO, Introducing Engotta, an open Hardware Project for Navigation. It's a display that can be mounted on scooters and bikes so that it gives directional navigation for users. Now I don't need to look at Maps after every turn YAAAYY ✨

Technical Details:
• Uses ESP32, a .96 inch OLED Display, a Real Time Clock
• Shows time when not navigating
• Power management stuff
• (Future) 3D printing a case to attach it to scooters/bikes
• Building custom PCBs

I'm still working on it and expect to complete it within a month or so.`,
        voted: false
    },
    {
        id: '3e4nk9prdh',
        title: 'CircuitVerse: Making Digital Logic Simulation a Breeze',
        type: 'Lightning Talk',
        track: 'Hardware',
        url: 'https://fossunited.org/c/indiafoss/2025/cfp/3e4nk9prdh',
        description: `I'm Aman Asrani—a developer at Juspay, a GSOC '24 contributor to CircuitVerse, and one of its current maintainers. In this 15-minute lightning talk, I'll guide you through how CircuitVerse turns what was once an expensive, resource-hungry, and complex process into something anyone can start exploring with a single click.

What you'll see:
• Live "Hello, World!" of Digital Logic - Open your browser, point at CircuitVerse, and you're set
• Features: Combinational-circuit generators, interactive timing diagrams, built-in testbench, Verilog module export
• Under the Hood: Vue.js makeover, upcoming Verilog superpowers, hardware I/O integration
• Real Impact: Over 1 million circuits and 150,000+ active users worldwide

CircuitVerse is now a staple in digital design courses—featured in books, adopted by high-school teachers. Hardware used to mean expensive workstations, complex installs, and limited lab hours. CircuitVerse shatters those barriers—anyone with an internet connection can experiment, learn, and contribute.`,
        voted: false
    },
    {
        id: 'eph0a7phr8',
        title: 'JIgIta - jump to soldering joy from pain',
        type: 'Talk',
        track: 'Hardware',
        url: 'https://fossunited.org/c/indiafoss/2025/cfp/eph0a7phr8',
        description: 'A talk about making soldering more accessible and joyful. Learn how to transition from soldering pain to soldering joy with better techniques, tools, and approaches.',
        voted: false
    },
    {
        id: '872pp0almf',
        title: 'Portable Social Buddy',
        type: 'Lightning Talk',
        track: 'Hardware',
        url: 'https://fossunited.org/c/indiafoss/2025/cfp/872pp0almf',
        description: 'A lightning talk about building a portable social companion device using open source hardware and software.',
        voted: false
    },
    {
        id: '4kjn23beab',
        title: 'VoltQuest: Open Source Hardware Gaming',
        type: 'Lightning Talk',
        track: 'Hardware',
        url: 'https://fossunited.org/c/indiafoss/2025/cfp/4kjn23beab',
        description: 'A lightning talk about open source hardware gaming projects and how to build gaming devices using open hardware platforms.',
        voted: false
    },
    {
        id: 'cuslb7o4qp',
        title: 'CoryDora: A Macropad, A Supply Chain, and A Case for Local Manufacturing',
        type: 'Talk',
        track: 'Hardware',
        url: 'https://fossunited.org/c/indiafoss/2025/cfp/cuslb7o4qp',
        description: 'A talk about building a macropad, exploring supply chain challenges, and making a case for local manufacturing in India.',
        voted: false
    },
    {
        id: 'a8fit07dot',
        title: 'Designing UX for Human-Machine interaction',
        type: 'Talk',
        track: 'Hardware',
        url: 'https://fossunited.org/c/indiafoss/2025/cfp/a8fit07dot',
        description: 'A talk about designing user experiences for human-machine interaction, covering principles and best practices.',
        voted: false
    },
    {
        id: '0gf740p4oj',
        title: 'Building modern GUI applications for embedded devices using game engine.',
        type: 'Talk',
        track: 'Hardware',
        url: 'https://fossunited.org/c/indiafoss/2025/cfp/0gf740p4oj',
        description: 'A talk about building modern GUI applications for embedded devices using game engines for better performance and user experience.',
        voted: false
    },
    {
        id: '4v6f8ek2n0',
        title: 'Homelabbing with bare metal',
        type: 'Talk',
        track: 'Hardware',
        url: 'https://fossunited.org/c/indiafoss/2025/cfp/4v6f8ek2n0',
        description: 'A talk about setting up home labs with bare metal hardware, covering best practices and lessons learned.',
        voted: false
    },
    {
        id: '5lr5dkbti9',
        title: 'Open-Source Hardware in India: Why We\'re Still Playing on Hard Mode',
        type: 'Birds of Feather(BoF)',
        track: 'Hardware',
        url: 'https://fossunited.org/c/indiafoss/2025/cfp/5lr5dkbti9',
        description: 'A Birds of Feather discussion about the challenges of open-source hardware in India and potential solutions.',
        voted: false
    },
    {
        id: 'bhcdo1fqft',
        title: 'Smarter Healthcare with IoT & AI: From Sensors to Predictions',
        type: 'Talk',
        track: 'Hardware',
        url: 'https://fossunited.org/c/indiafoss/2025/cfp/bhcdo1fqft',
        description: 'A talk about using IoT and AI in healthcare applications, from sensor data collection to predictive analytics.',
        voted: false
    },
    {
        id: '9bhth8guic',
        title: 'Build Your First Voice-Controlled Smart Robot Using FOSS and LLM',
        type: 'Talk',
        track: 'Hardware',
        url: 'https://fossunited.org/c/indiafoss/2025/cfp/9bhth8guic',
        description: 'A talk about building voice-controlled robots using FOSS and LLM technologies, with practical examples.',
        voted: false
    }
];

// Vue App
createApp({
    setup() {
        // Reactive state
        const email = ref('');
        const emailVerified = ref(false);
        const emailSubmitting = ref(false);
        const selectedTalk = ref(null);
        const votedTalkIds = ref(new Set());
        const talks = ref([...talkData]);

        // Computed properties
        const votesRemaining = computed(() => {
            return 3 - votedTalkIds.value.size;
        });

        const votedTalks = computed(() => {
            return talks.value.filter(talk => talk.voted);
        });

        // Methods
        const verifyEmail = async () => {
            if (!email.value) return;
            
            emailSubmitting.value = true;
            
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Check if email already voted (mock check)
                const hasVoted = localStorage.getItem(`voted_${email.value}`);
                if (hasVoted) {
                    alert('THIS EMAIL HAS ALREADY VOTED. ONE VOTE PER EMAIL ADDRESS.');
                    return;
                }
                
                emailVerified.value = true;
                localStorage.setItem(`current_voter`, email.value);
                
            } catch (error) {
                alert('ERROR VERIFYING EMAIL. PLEASE TRY AGAIN.');
            } finally {
                emailSubmitting.value = false;
            }
        };

        const toggleVote = (talk) => {
            if (talk.voted) {
                // Remove vote
                talk.voted = false;
                votedTalkIds.value.delete(talk.id);
            } else {
                // Add vote (if slots available)
                if (votesRemaining.value > 0) {
                    talk.voted = true;
                    votedTalkIds.value.add(talk.id);
                }
            }
            
            // Auto-submit when 3 votes are cast
            if (votesRemaining.value === 0) {
                setTimeout(() => {
                    submitVotes();
                }, 300);
            }
        };

        const submitVotes = async () => {
            const votes = votedTalks.value.map(talk => ({
                id: talk.id,
                title: talk.title,
                type: talk.type
            }));
            
            try {
                console.log('SUBMITTING VOTES:', { 
                    email: email.value, 
                    votes,
                    timestamp: new Date().toISOString()
                });
                
                // Mark this email as having voted
                localStorage.setItem(`voted_${email.value}`, JSON.stringify({
                    votes,
                    timestamp: new Date().toISOString()
                }));
                
                // Here you would replace this with actual API call:
                // await fetch('/api/submit-votes', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify({ 
                //         email: email.value, 
                //         votes,
                //         timestamp: new Date().toISOString()
                //     })
                // });
                
                console.log('VOTES SUBMITTED SUCCESSFULLY');
                
            } catch (error) {
                console.error('Error submitting votes:', error);
                alert('ERROR SUBMITTING VOTES. PLEASE TRY AGAIN.');
            }
        };

        const openModal = (talk) => {
            selectedTalk.value = talk;
            document.body.style.overflow = 'hidden';
        };

        const closeModal = () => {
            selectedTalk.value = null;
            document.body.style.overflow = 'auto';
        };

        // Keyboard shortcuts
        const handleKeydown = (event) => {
            if (event.key === 'Escape' && selectedTalk.value) {
                closeModal();
            }
        };

        // Utility functions
        const getVotingStats = () => {
            const totalVotes = talks.value.reduce((sum, talk) => sum + (talk.voted ? 1 : 0), 0);
            return {
                totalTalks: talks.value.length,
                votedTalks: totalVotes,
                remainingVotes: 3 - totalVotes
            };
        };

        const resetVotes = () => {
            talks.value.forEach(talk => {
                talk.voted = false;
            });
            votedTalkIds.value.clear();
        };

        const exportVotes = () => {
            const votes = votedTalks.value.map(talk => ({
                id: talk.id,
                title: talk.title,
                type: talk.type,
                url: talk.url
            }));
            
            const dataStr = JSON.stringify({
                email: email.value,
                votes,
                timestamp: new Date().toISOString()
            }, null, 2);
            
            const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
            const exportFileDefaultName = `hardware-devroom-votes-${new Date().toISOString().split('T')[0]}.json`;
            
            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
        };

        // Lifecycle hooks
        window.addEventListener('keydown', handleKeydown);
        
        // Clean up on unmount
        window.addEventListener('beforeunload', () => {
            window.removeEventListener('keydown', handleKeydown);
        });

        // Return reactive data and methods
        return {
            // Data
            email,
            emailVerified,
            emailSubmitting,
            selectedTalk,
            talks,
            votedTalkIds,
            
            // Computed
            votesRemaining,
            votedTalks,
            
            // Methods
            verifyEmail,
            toggleVote,
            submitVotes,
            openModal,
            closeModal,
            getVotingStats,
            resetVotes,
            exportVotes
        };
    }
}).mount('#app');

// Debug helpers for development
window.debugVoting = {
    clearStorage: () => {
        localStorage.clear();
        location.reload();
    },
    simulateVotes: (email, talkIds) => {
        localStorage.setItem(`voted_${email}`, JSON.stringify({
            votes: talkIds.map(id => ({ id, title: `Talk ${id}` })),
            timestamp: new Date().toISOString()
        }));
    },
    getStoredVotes: () => {
        const keys = Object.keys(localStorage).filter(key => key.startsWith('voted_'));
        return keys.map(key => ({
            email: key.replace('voted_', ''),
            data: JSON.parse(localStorage.getItem(key))
        }));
    }
};