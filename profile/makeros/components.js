// Absurd OS - Complete Component Library
// Radioactive maker modules for the most CRISP OS experience

// Profile Module Component
const ProfileModule = {
    template: `
        <div class="h-full bg-white/90 backdrop-blur-xl rounded-2xl border border-beige-cool overflow-hidden animate-fade-in">
            <!-- Module Header -->
            <div class="bg-gradient-to-r from-radium to-uranium p-6">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <div class="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                            <i class="fas fa-user-astronaut text-radium text-2xl"></i>
                        </div>
                        <div>
                            <h2 class="text-xl font-bold text-white uppercase tracking-wide">MAKER PROFILE</h2>
                            <p class="text-white/80 text-sm">Identity & Skills Showcase</p>
                        </div>
                    </div>
                    <button @click="$emit('close')" class="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors">
                        <i class="fas fa-times text-white"></i>
                    </button>
                </div>
            </div>

            <!-- Profile Content -->
            <div class="p-6 h-full overflow-y-auto custom-scrollbar">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    <!-- Profile Info -->
                    <div class="lg:col-span-1">
                        <div class="bg-beige-warm rounded-2xl p-6">
                            <div class="w-24 h-24 bg-white rounded-xl mb-4 flex items-center justify-center overflow-hidden mx-auto">
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" 
                                     class="w-full h-full object-cover" alt="Maker Profile">
                            </div>
                            <h3 class="text-lg font-bold text-center text-text-dark mb-2">AMIT SHARMA</h3>
                            <p class="text-center text-sm text-text-mid mb-4">Hardware Hacker • Code Wizard</p>
                            
                            <div class="space-y-3">
                                <div class="flex justify-between">
                                    <span class="text-xs font-medium text-text-mid">MEMBER SINCE</span>
                                    <span class="text-xs font-bold text-text-dark">JAN 2024</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-xs font-medium text-text-mid">PROJECTS</span>
                                    <span class="text-xs font-bold text-radium">47</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-xs font-medium text-text-mid">REPUTATION</span>
                                    <span class="text-xs font-bold text-uranium">★★★★★</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-xs font-medium text-text-mid">STATUS</span>
                                    <span class="text-xs font-bold text-laboratory">AVAILABLE</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Skills & Availability -->
                    <div class="lg:col-span-2 space-y-6">
                        
                        <!-- Skills Matrix -->
                        <div class="bg-white rounded-2xl p-6 border border-beige-cool">
                            <h4 class="text-lg font-bold text-text-dark mb-4 uppercase tracking-wide">SKILLS MATRIX</h4>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div class="space-y-3">
                                    <div>
                                        <div class="flex justify-between mb-1">
                                            <span class="text-sm font-medium text-text-dark">3D Printing</span>
                                            <span class="text-xs text-radium">Expert</span>
                                        </div>
                                        <div class="bg-beige-cool rounded-full h-2">
                                            <div class="bg-radium h-2 rounded-full" style="width: 95%"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="flex justify-between mb-1">
                                            <span class="text-sm font-medium text-text-dark">Electronics</span>
                                            <span class="text-xs text-uranium">Advanced</span>
                                        </div>
                                        <div class="bg-beige-cool rounded-full h-2">
                                            <div class="bg-uranium h-2 rounded-full" style="width: 85%"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="flex justify-between mb-1">
                                            <span class="text-sm font-medium text-text-dark">CAD Design</span>
                                            <span class="text-xs text-laboratory">Expert</span>
                                        </div>
                                        <div class="bg-beige-cool rounded-full h-2">
                                            <div class="bg-laboratory h-2 rounded-full" style="width: 90%"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="space-y-3">
                                    <div>
                                        <div class="flex justify-between mb-1">
                                            <span class="text-sm font-medium text-text-dark">Programming</span>
                                            <span class="text-xs text-polonium">Expert</span>
                                        </div>
                                        <div class="bg-beige-cool rounded-full h-2">
                                            <div class="bg-polonium h-2 rounded-full" style="width: 92%"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="flex justify-between mb-1">
                                            <span class="text-sm font-medium text-text-dark">Soldering</span>
                                            <span class="text-xs text-space-blue">Advanced</span>
                                        </div>
                                        <div class="bg-beige-cool rounded-full h-2">
                                            <div class="bg-space-blue h-2 rounded-full" style="width: 88%"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="flex justify-between mb-1">
                                            <span class="text-sm font-medium text-text-dark">Project Management</span>
                                            <span class="text-xs text-sunset-pink">Expert</span>
                                        </div>
                                        <div class="bg-beige-cool rounded-full h-2">
                                            <div class="bg-sunset-pink h-2 rounded-full" style="width: 94%"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Availability & Rates -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div class="bg-white rounded-2xl p-6 border border-beige-cool">
                                <h4 class="text-lg font-bold text-text-dark mb-4 uppercase tracking-wide">AVAILABILITY</h4>
                                <div class="space-y-3">
                                    <div class="flex items-center gap-3">
                                        <div class="w-3 h-3 bg-uranium rounded-full"></div>
                                        <span class="text-sm text-text-dark">Open for Collaborations</span>
                                    </div>
                                    <div class="flex items-center gap-3">
                                        <div class="w-3 h-3 bg-laboratory rounded-full"></div>
                                        <span class="text-sm text-text-dark">Available for Mentoring</span>
                                    </div>
                                    <div class="flex items-center gap-3">
                                        <div class="w-3 h-3 bg-radium rounded-full"></div>
                                        <span class="text-sm text-text-dark">Accepting Commissions</span>
                                    </div>
                                    <div class="flex items-center gap-3">
                                        <div class="w-3 h-3 bg-text-light rounded-full"></div>
                                        <span class="text-sm text-text-mid">Not Available: Full-time Work</span>
                                    </div>
                                </div>
                            </div>

                            <div class="bg-white rounded-2xl p-6 border border-beige-cool">
                                <h4 class="text-lg font-bold text-text-dark mb-4 uppercase tracking-wide">RATES & CONTACT</h4>
                                <div class="space-y-3">
                                    <div class="flex justify-between">
                                        <span class="text-sm text-text-mid">Consulting</span>
                                        <span class="text-sm font-bold text-text-dark">$75/hr</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-sm text-text-mid">Project Work</span>
                                        <span class="text-sm font-bold text-text-dark">$50/hr</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-sm text-text-mid">Mentoring</span>
                                        <span class="text-sm font-bold text-text-dark">$30/hr</span>
                                    </div>
                                    <hr class="my-3 border-beige-cool">
                                    <div class="space-y-2">
                                        <a href="#" class="flex items-center gap-2 text-sm text-radium hover:text-radium/80">
                                            <i class="fab fa-github"></i>github.com/amitsharma
                                        </a>
                                        <a href="#" class="flex items-center gap-2 text-sm text-radium hover:text-radium/80">
                                            <i class="fas fa-envelope"></i>amit@maker.space
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Recent Projects Showcase -->
                        <div class="bg-white rounded-2xl p-6 border border-beige-cool">
                            <h4 class="text-lg font-bold text-text-dark mb-4 uppercase tracking-wide">RECENT PROJECTS</h4>
                            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div class="bg-beige-warm rounded-lg p-4 hover:bg-beige-cool transition-colors cursor-pointer">
                                    <div class="aspect-video bg-gradient-to-br from-radium/20 to-uranium/20 rounded-lg mb-3 flex items-center justify-center">
                                        <i class="fas fa-microchip text-radium text-2xl"></i>
                                    </div>
                                    <h5 class="font-bold text-sm text-text-dark mb-1">IoT Weather Station</h5>
                                    <p class="text-xs text-text-mid">Arduino + 3D printed enclosure</p>
                                </div>
                                <div class="bg-beige-warm rounded-lg p-4 hover:bg-beige-cool transition-colors cursor-pointer">
                                    <div class="aspect-video bg-gradient-to-br from-laboratory/20 to-uranium/20 rounded-lg mb-3 flex items-center justify-center">
                                        <i class="fas fa-robot text-laboratory text-2xl"></i>
                                    </div>
                                    <h5 class="font-bold text-sm text-text-dark mb-1">Robotic Arm Kit</h5>
                                    <p class="text-xs text-text-mid">Educational robotics platform</p>
                                </div>
                                <div class="bg-beige-warm rounded-lg p-4 hover:bg-beige-cool transition-colors cursor-pointer">
                                    <div class="aspect-video bg-gradient-to-br from-polonium/20 to-radium/20 rounded-lg mb-3 flex items-center justify-center">
                                        <i class="fas fa-cube text-polonium text-2xl"></i>
                                    </div>
                                    <h5 class="font-bold text-sm text-text-dark mb-1">Custom Drone Frame</h5>
                                    <p class="text-xs text-text-mid">Carbon fiber composite design</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    emits: ['close']
};

// 3D Printers Module Component
const PrintersModule = {
    template: `
        <div class="h-full bg-white/90 backdrop-blur-xl rounded-2xl border border-beige-cool overflow-hidden animate-fade-in">
            <!-- Module Header -->
            <div class="bg-gradient-to-r from-laboratory to-uranium p-6">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <div class="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                            <i class="fas fa-cube text-laboratory text-2xl"></i>
                        </div>
                        <div>
                            <h2 class="text-xl font-bold text-white uppercase tracking-wide">3D PRINTERS</h2>
                            <p class="text-white/80 text-sm">{{ printers.length }} Printers • {{ activePrints }} Active Jobs</p>
                        </div>
                    </div>
                    <button @click="$emit('close')" class="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors">
                        <i class="fas fa-times text-white"></i>
                    </button>
                </div>
            </div>

            <!-- Printers Grid -->
            <div class="p-6 h-full overflow-y-auto custom-scrollbar">
                <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    
                    <div v-for="printer in printers" :key="printer.id" class="bg-white rounded-2xl p-6 border border-beige-cool hover:border-laboratory/40 transition-colors">
                        <div class="flex items-start justify-between mb-4">
                            <div>
                                <h4 class="font-bold text-text-dark mb-1">{{ printer.name }}</h4>
                                <p class="text-sm text-text-mid">{{ printer.model }}</p>
                            </div>
                            <div :class="['w-3 h-3 rounded-full', printer.status === 'printing' ? 'bg-uranium animate-pulse' : printer.status === 'idle' ? 'bg-laboratory' : 'bg-text-light']"></div>
                        </div>
                        
                        <!-- Printer Status -->
                        <div class="bg-beige-warm rounded-lg p-4 mb-4">
                            <div class="flex justify-between items-center mb-2">
                                <span class="text-xs font-medium text-text-mid uppercase">STATUS</span>
                                <span :class="['text-xs font-bold uppercase', printer.status === 'printing' ? 'text-uranium' : printer.status === 'idle' ? 'text-laboratory' : 'text-text-mid']">
                                    {{ printer.status }}
                                </span>
                            </div>
                            
                            <div v-if="printer.status === 'printing'" class="space-y-2">
                                <div class="flex justify-between text-xs">
                                    <span class="text-text-mid">{{ printer.currentJob }}</span>
                                    <span class="font-bold text-text-dark">{{ printer.progress }}%</span>
                                </div>
                                <div class="bg-beige-cool rounded-full h-2">
                                    <div class="bg-uranium h-2 rounded-full transition-all" :style="{ width: printer.progress + '%' }"></div>
                                </div>
                                <div class="flex justify-between text-xs text-text-mid">
                                    <span>{{ printer.timeRemaining }} remaining</span>
                                    <span>{{ printer.temperature }}°C</span>
                                </div>
                            </div>
                            
                            <div v-else class="space-y-2">
                                <div class="text-xs text-text-mid">Ready for new job</div>
                                <div class="grid grid-cols-2 gap-2">
                                    <div class="text-xs">
                                        <span class="text-text-mid">Bed: </span>
                                        <span class="font-bold text-text-dark">{{ printer.bedTemp }}°C</span>
                                    </div>
                                    <div class="text-xs">
                                        <span class="text-text-mid">Nozzle: </span>
                                        <span class="font-bold text-text-dark">{{ printer.nozzleTemp }}°C</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Printer Stats -->
                        <div class="grid grid-cols-2 gap-4 mb-4">
                            <div class="text-center">
                                <div class="text-lg font-bold text-radium">{{ printer.totalPrints }}</div>
                                <div class="text-xs text-text-mid uppercase">Total Prints</div>
                            </div>
                            <div class="text-center">
                                <div class="text-lg font-bold text-laboratory">{{ printer.printTime }}h</div>
                                <div class="text-xs text-text-mid uppercase">Print Time</div>
                            </div>
                        </div>

                        <!-- Quick Actions -->
                        <div class="flex gap-2">
                            <button v-if="printer.status === 'idle'" class="flex-1 bg-laboratory text-white px-3 py-2 rounded-lg text-xs font-bold hover:bg-laboratory/90 transition-colors">
                                <i class="fas fa-play mr-1"></i>START PRINT
                            </button>
                            <button v-if="printer.status === 'printing'" class="flex-1 bg-radium text-white px-3 py-2 rounded-lg text-xs font-bold hover:bg-radium/90 transition-colors">
                                <i class="fas fa-pause mr-1"></i>PAUSE
                            </button>
                            <button class="w-10 h-8 bg-beige-warm hover:bg-beige-cool rounded-lg flex items-center justify-center transition-colors">
                                <i class="fas fa-cog text-text-dark text-xs"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Add New Printer Card -->
                    <div class="bg-beige-warm/50 border-2 border-dashed border-laboratory/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-beige-warm/80 transition-colors cursor-pointer">
                        <div class="w-12 h-12 bg-laboratory/20 rounded-xl flex items-center justify-center mb-4">
                            <i class="fas fa-plus text-laboratory text-xl"></i>
                        </div>
                        <h4 class="font-bold text-text-dark mb-2">ADD PRINTER</h4>
                        <p class="text-sm text-text-mid">Connect a new 3D printer</p>
                    </div>
                </div>

                <!-- Print Queue -->
                <div class="mt-8 bg-white rounded-2xl p-6 border border-beige-cool">
                    <h4 class="text-lg font-bold text-text-dark mb-4 uppercase tracking-wide">PRINT QUEUE</h4>
                    <div class="space-y-3">
                        <div v-for="job in printQueue" :key="job.id" class="flex items-center gap-4 p-3 bg-beige-warm rounded-lg">
                            <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                                <i class="fas fa-cube text-laboratory"></i>
                            </div>
                            <div class="flex-1">
                                <div class="font-bold text-sm text-text-dark">{{ job.name }}</div>
                                <div class="text-xs text-text-mid">{{ job.filament }} • {{ job.estimatedTime }}</div>
                            </div>
                            <div class="text-xs font-bold text-uranium">{{ job.priority }}</div>
                            <button class="w-8 h-8 bg-white hover:bg-beige-cool rounded-lg flex items-center justify-center transition-colors">
                                <i class="fas fa-ellipsis-v text-text-mid text-xs"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            printers: [
                {
                    id: 1,
                    name: "Ender 3 Pro",
                    model: "Creality Ender 3 Pro",
                    status: "printing",
                    currentJob: "Miniature Dragon",
                    progress: 67,
                    timeRemaining: "2h 15m",
                    temperature: 210,
                    bedTemp: 60,
                    nozzleTemp: 210,
                    totalPrints: 247,
                    printTime: 1847
                },
                {
                    id: 2,
                    name: "Prusa i3 MK3S+",
                    model: "Prusa Research i3 MK3S+",
                    status: "idle",
                    bedTemp: 25,
                    nozzleTemp: 25,
                    totalPrints: 156,
                    printTime: 982
                },
                {
                    id: 3,
                    name: "Bambu X1 Carbon",
                    model: "Bambu Lab X1 Carbon",
                    status: "printing",
                    currentJob: "Phone Stand v2",
                    progress: 23,
                    timeRemaining: "4h 32m",
                    temperature: 220,
                    bedTemp: 65,
                    nozzleTemp: 220,
                    totalPrints: 89,
                    printTime: 567
                }
            ],
            printQueue: [
                {
                    id: 1,
                    name: "Raspberry Pi Case",
                    filament: "PETG Black",
                    estimatedTime: "3h 20m",
                    priority: "HIGH"
                },
                {
                    id: 2,
                    name: "Cable Management Clips",
                    filament: "PLA White",
                    estimatedTime: "45m",
                    priority: "LOW"
                }
            ]
        }
    },
    computed: {
        activePrints() {
            return this.printers.filter(p => p.status === 'printing').length;
        }
    },
    emits: ['close']
};

// Workshop Kit Module Component
const WorkshopModule = {
    template: `
        <div class="h-full bg-white/90 backdrop-blur-xl rounded-2xl border border-beige-cool overflow-hidden animate-fade-in">
            <!-- Module Header -->
            <div class="bg-gradient-to-r from-uranium to-polonium p-6">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <div class="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                            <i class="fas fa-tools text-uranium text-2xl"></i>
                        </div>
                        <div>
                            <h2 class="text-xl font-bold text-white uppercase tracking-wide">WORKSHOP KIT</h2>
                            <p class="text-white/80 text-sm">Tools • Equipment • Supplies</p>
                        </div>
                    </div>
                    <button @click="$emit('close')" class="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors">
                        <i class="fas fa-times text-white"></i>
                    </button>
                </div>
            </div>

            <!-- Workshop Content -->
            <div class="p-6 h-full overflow-y-auto custom-scrollbar">
                
                <!-- Tool Categories -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    <button v-for="category in categories" :key="category.id"
                            @click="selectedCategory = category.id"
                            :class="['p-4 rounded-xl border-2 transition-all', selectedCategory === category.id ? 'border-uranium bg-uranium/10' : 'border-beige-cool bg-white hover:bg-beige-warm']">
                        <i :class="[category.icon, 'text-2xl mb-2', selectedCategory === category.id ? 'text-uranium' : 'text-text-mid']"></i>
                        <div :class="['text-sm font-bold', selectedCategory === category.id ? 'text-uranium' : 'text-text-dark']">{{ category.name }}</div>
                        <div class="text-xs text-text-mid">{{ category.count }} items</div>
                    </button>
                </div>

                <!-- Tools Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <div v-for="tool in filteredTools" :key="tool.id" class="bg-white rounded-2xl p-4 border border-beige-cool hover:border-uranium/40 transition-colors">
                        <div class="aspect-square bg-beige-warm rounded-lg mb-4 flex items-center justify-center">
                            <i :class="[tool.icon, 'text-3xl', tool.color]"></i>
                        </div>
                        
                        <h4 class="font-bold text-sm text-text-dark mb-1">{{ tool.name }}</h4>
                        <p class="text-xs text-text-mid mb-3">{{ tool.description }}</p>
                        
                        <div class="flex items-center justify-between mb-3">
                            <div :class="['px-2 py-1 rounded text-xs font-bold', tool.status === 'available' ? 'bg-laboratory/20 text-laboratory' : tool.status === 'in-use' ? 'bg-radium/20 text-radium' : 'bg-text-light/20 text-text-mid']">
                                {{ tool.status.toUpperCase().replace('-', ' ') }}
                            </div>
                            <div v-if="tool.condition" :class="['text-xs font-bold', tool.condition === 'excellent' ? 'text-laboratory' : tool.condition === 'good' ? 'text-uranium' : 'text-radium']">
                                {{ tool.condition.toUpperCase().replace('-', ' ') }}
                            </div>
                        </div>

                        <div v-if="tool.specifications" class="text-xs text-text-mid mb-3">
                            <div v-for="spec in tool.specifications" :key="spec">{{ spec }}</div>
                        </div>

                        <div class="flex gap-2">
                            <button v-if="tool.status === 'available'" class="flex-1 bg-laboratory text-white px-3 py-2 rounded-lg text-xs font-bold hover:bg-laboratory/90 transition-colors">
                                USE
                            </button>
                            <button v-else-if="tool.status === 'in-use'" class="flex-1 bg-radium text-white px-3 py-2 rounded-lg text-xs font-bold hover:bg-radium/90 transition-colors">
                                RETURN
                            </button>
                            <button v-else class="flex-1 bg-text-light text-white px-3 py-2 rounded-lg text-xs font-bold">
                                REPAIR
                            </button>
                            <button class="w-8 h-8 bg-beige-warm hover:bg-beige-cool rounded-lg flex items-center justify-center transition-colors">
                                <i class="fas fa-info text-text-dark text-xs"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Add Tool Button -->
                <div class="mt-8 flex justify-center">
                    <button class="bg-uranium text-white px-6 py-3 rounded-xl font-bold hover:bg-uranium/90 transition-colors">
                        <i class="fas fa-plus mr-2"></i>ADD NEW TOOL
                    </button>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            selectedCategory: 'all',
            categories: [
                { id: 'all', name: 'ALL', icon: 'fas fa-th-large', count: 47 },
                { id: 'soldering', name: 'SOLDERING', icon: 'fas fa-burn', count: 12 },
                { id: 'measurement', name: 'MEASUREMENT', icon: 'fas fa-ruler', count: 15 },
                { id: 'power', name: 'POWER', icon: 'fas fa-bolt', count: 8 },
                { id: 'hand-tools', name: 'HAND TOOLS', icon: 'fas fa-hammer', count: 12 }
            ],
            tools: [
                {
                    id: 1,
                    name: "Hakko FX-888D",
                    description: "Digital Soldering Station",
                    category: "soldering",
                    status: "available",
                    condition: "excellent",
                    icon: "fas fa-burn",
                    color: "text-radium",
                    specifications: ["70W", "200-480°C", "Digital Display"]
                },
                {
                    id: 2,
                    name: "Fluke 117",
                    description: "True RMS Multimeter",
                    category: "measurement",
                    status: "in-use",
                    condition: "good",
                    icon: "fas fa-tachometer-alt",
                    color: "text-laboratory",
                    specifications: ["600V AC/DC", "10A", "Auto-range"]
                },
                {
                    id: 3,
                    name: "Rigol DS1054Z",
                    description: "Digital Oscilloscope",
                    category: "measurement",
                    status: "available",
                    condition: "excellent",
                    icon: "fas fa-wave-square",
                    color: "text-uranium",
                    specifications: ["50MHz", "4 Channel", "1 GSa/s"]
                },
                {
                    id: 4,
                    name: "Bench Power Supply",
                    description: "Adjustable DC Supply",
                    category: "power",
                    status: "available",
                    condition: "good",
                    icon: "fas fa-battery-three-quarters",
                    color: "text-polonium",
                    specifications: ["0-30V", "0-5A", "Dual Output"]
                },
                {
                    id: 5,
                    name: "Precision Screwdriver Set",
                    description: "Electronics Repair Kit",
                    category: "hand-tools",
                    status: "available",
                    condition: "excellent",
                    icon: "fas fa-screwdriver",
                    color: "text-space-blue",
                    specifications: ["32 Bits", "Magnetic", "ESD Safe"]
                },
                {
                    id: 6,
                    name: "Hot Air Station",
                    description: "SMD Rework Station",
                    category: "soldering",
                    status: "maintenance",
                    condition: "needs-repair",
                    icon: "fas fa-wind",
                    color: "text-sunset-pink",
                    specifications: ["100-500°C", "Variable Flow", "Digital"]
                },
                {
                    id: 7,
                    name: "Function Generator",
                    description: "Arbitrary Waveform Generator",
                    category: "measurement",
                    status: "available",
                    condition: "excellent",
                    icon: "fas fa-wave-square",
                    color: "text-neon-green",
                    specifications: ["20MHz", "2 Channel", "USB Interface"]
                },
                {
                    id: 8,
                    name: "Variable PSU",
                    description: "Programmable Power Supply",
                    category: "power",
                    status: "in-use",
                    condition: "good",
                    icon: "fas fa-plug",
                    color: "text-cosmic-purple",
                    specifications: ["0-60V", "0-10A", "Computer Control"]
                }
            ]
        }
    },
    computed: {
        filteredTools() {
            if (this.selectedCategory === 'all') {
                return this.tools;
            }
            return this.tools.filter(tool => tool.category === this.selectedCategory);
        }
    },
    emits: ['close']
};

// Projects Module Component
const ProjectsModule = {
    template: `
        <div class="h-full bg-white/90 backdrop-blur-xl rounded-2xl border border-beige-cool overflow-hidden animate-fade-in">
            <!-- Module Header -->
            <div class="bg-gradient-to-r from-polonium to-radium p-6">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <div class="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                            <i class="fas fa-rocket text-polonium text-2xl"></i>
                        </div>
                        <div>
                            <h2 class="text-xl font-bold text-white uppercase tracking-wide">PROJECTS</h2>
                            <p class="text-white/80 text-sm">{{ projects.length }} Total • {{ activeProjects }} Active</p>
                        </div>
                    </div>
                    <button @click="$emit('close')" class="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors">
                        <i class="fas fa-times text-white"></i>
                    </button>
                </div>
            </div>

            <!-- Projects Content -->
            <div class="p-6 h-full overflow-y-auto custom-scrollbar">
                
                <!-- Project Status Overview -->
                <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
                    <div class="bg-beige-warm rounded-xl p-4 text-center">
                        <div class="text-2xl font-bold text-uranium">{{ activeProjects }}</div>
                        <div class="text-xs text-text-mid uppercase">Active</div>
                    </div>
                    <div class="bg-beige-warm rounded-xl p-4 text-center">
                        <div class="text-2xl font-bold text-laboratory">{{ completedProjects }}</div>
                        <div class="text-xs text-text-mid uppercase">Completed</div>
                    </div>
                    <div class="bg-beige-warm rounded-xl p-4 text-center">
                        <div class="text-2xl font-bold text-radium">{{ onHoldProjects }}</div>
                        <div class="text-xs text-text-mid uppercase">On Hold</div>
                    </div>
                    <div class="bg-beige-warm rounded-xl p-4 text-center">
                        <div class="text-2xl font-bold text-polonium">{{ plannedProjects }}</div>
                        <div class="text-xs text-text-mid uppercase">Planned</div>
                    </div>
                </div>

                <!-- Projects Grid -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div v-for="project in projects" :key="project.id" class="bg-white rounded-2xl p-6 border border-beige-cool hover:border-polonium/40 transition-colors">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex items-center gap-3">
                                <div :class="['w-10 h-10 rounded-lg flex items-center justify-center', project.statusColor]">
                                    <i :class="[project.icon, 'text-white']"></i>
                                </div>
                                <div>
                                    <h4 class="font-bold text-text-dark">{{ project.name }}</h4>
                                    <p class="text-sm text-text-mid">{{ project.category }}</p>
                                </div>
                            </div>
                            <div :class="['px-2 py-1 rounded text-xs font-bold', getStatusColor(project.status)]">
                                {{ project.status.toUpperCase() }}
                            </div>
                        </div>

                        <p class="text-sm text-text-mid mb-4">{{ project.description }}</p>

                        <!-- Progress Bar -->
                        <div class="mb-4">
                            <div class="flex justify-between text-xs mb-1">
                                <span class="text-text-mid">Progress</span>
                                <span class="font-bold text-text-dark">{{ project.progress }}%</span>
                            </div>
                            <div class="bg-beige-cool rounded-full h-2">
                                <div :class="['h-2 rounded-full transition-all', getProgressColor(project.status)]" :style="{ width: project.progress + '%' }"></div>
                            </div>
                        </div>

                        <!-- Project Details -->
                        <div class="grid grid-cols-2 gap-4 mb-4 text-xs">
                            <div>
                                <span class="text-text-mid">Started:</span>
                                <span class="font-bold text-text-dark ml-1">{{ project.startDate }}</span>
                            </div>
                            <div>
                                <span class="text-text-mid">Due:</span>
                                <span class="font-bold text-text-dark ml-1">{{ project.dueDate }}</span>
                            </div>
                        </div>

                        <!-- Tech Stack -->
                        <div class="flex flex-wrap gap-1 mb-4">
                            <span v-for="tech in project.techStack" :key="tech" class="px-2 py-1 bg-beige-warm text-text-dark text-xs rounded">
                                {{ tech }}
                            </span>
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex gap-2">
                            <button class="flex-1 bg-polonium text-white px-3 py-2 rounded-lg text-xs font-bold hover:bg-polonium/90 transition-colors">
                                <i class="fas fa-eye mr-1"></i>VIEW
                            </button>
                            <button class="flex-1 bg-radium text-white px-3 py-2 rounded-lg text-xs font-bold hover:bg-radium/90 transition-colors">
                                <i class="fas fa-edit mr-1"></i>EDIT
                            </button>
                            <button class="w-10 h-8 bg-beige-warm hover:bg-beige-cool rounded-lg flex items-center justify-center transition-colors">
                                <i class="fas fa-share text-text-dark text-xs"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Add Project Card -->
                    <div class="bg-beige-warm/50 border-2 border-dashed border-polonium/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-beige-warm/80 transition-colors cursor-pointer">
                        <div class="w-12 h-12 bg-polonium/20 rounded-xl flex items-center justify-center mb-4">
                            <i class="fas fa-plus text-polonium text-xl"></i>
                        </div>
                        <h4 class="font-bold text-text-dark mb-2">NEW PROJECT</h4>
                        <p class="text-sm text-text-mid">Start your next creation</p>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            projects: [
                {
                    id: 1,
                    name: "IoT Plant Monitor",
                    category: "Electronics • IoT",
                    description: "Smart plant monitoring system with soil moisture, light, and temperature sensors connected to mobile app.",
                    status: "active",
                    progress: 75,
                    startDate: "Jan 15",
                    dueDate: "Mar 1",
                    budget: 250,
                    spent: 180,
                    icon: "fas fa-seedling",
                    statusColor: "bg-uranium",
                    techStack: ["Arduino", "ESP32", "React Native", "Firebase"]
                },
                {
                    id: 2,
                    name: "Mechanical Keyboard",
                    category: "Hardware • Design",
                    description: "Custom 60% mechanical keyboard with hot-swap switches and RGB backlighting.",
                    status: "completed",
                    progress: 100,
                    startDate: "Dec 1",
                    dueDate: "Jan 20",
                    budget: 400,
                    spent: 385,
                    icon: "fas fa-keyboard",
                    statusColor: "bg-laboratory",
                    techStack: ["KiCad", "QMK", "3D Printing", "PCB Design"]
                },
                {
                    id: 3,
                    name: "Drone Racing Frame",
                    category: "3D Design • Racing",
                    description: "Lightweight carbon fiber racing drone frame optimized for FPV racing competitions.",
                    status: "on-hold",
                    progress: 45,
                    startDate: "Feb 10",
                    dueDate: "Apr 15",
                    budget: 600,
                    spent: 120,
                    icon: "fas fa-helicopter",
                    statusColor: "bg-radium",
                    techStack: ["Fusion 360", "Carbon Fiber", "CNC", "FPV"]
                },
                {
                    id: 4,
                    name: "Home Automation Hub",
                    category: "Software • IoT",
                    description: "Central control system for smart home devices with voice control and mobile integration.",
                    status: "planned",
                    progress: 15,
                    startDate: "Mar 1",
                    dueDate: "Jun 30",
                    budget: 800,
                    spent: 0,
                    icon: "fas fa-home",
                    statusColor: "bg-polonium",
                    techStack: ["Raspberry Pi", "Node.js", "Docker", "Zigbee"]
                },
                {
                    id: 5,
                    name: "LED Matrix Display",
                    category: "Electronics • Art",
                    description: "Large format RGB LED matrix for displaying animations and real-time data visualizations.",
                    status: "active",
                    progress: 60,
                    startDate: "Jan 5",
                    dueDate: "Feb 28",
                    budget: 350,
                    spent: 280,
                    icon: "fas fa-tv",
                    statusColor: "bg-uranium",
                    techStack: ["WS2812", "FastLED", "Processing", "Arduino"]
                }
            ]
        }
    },
    computed: {
        activeProjects() {
            return this.projects.filter(p => p.status === 'active').length;
        },
        completedProjects() {
            return this.projects.filter(p => p.status === 'completed').length;
        },
        onHoldProjects() {
            return this.projects.filter(p => p.status === 'on-hold').length;
        },
        plannedProjects() {
            return this.projects.filter(p => p.status === 'planned').length;
        }
    },
    methods: {
        getStatusColor(status) {
            const colors = {
                'active': 'bg-uranium/20 text-uranium',
                'completed': 'bg-laboratory/20 text-laboratory',
                'on-hold': 'bg-radium/20 text-radium',
                'planned': 'bg-polonium/20 text-polonium'
            };
            return colors[status] || 'bg-text-light/20 text-text-mid';
        },
        getProgressColor(status) {
            const colors = {
                'active': 'bg-uranium',
                'completed': 'bg-laboratory',
                'on-hold': 'bg-radium',
                'planned': 'bg-polonium'
            };
            return colors[status] || 'bg-text-light';
        }
    },
    emits: ['close']
};

// Inventory Module Component
const InventoryModule = {
    template: `
        <div class="h-full bg-white/90 backdrop-blur-xl rounded-2xl border border-beige-cool overflow-hidden animate-fade-in">
            <!-- Module Header -->
            <div class="bg-gradient-to-r from-neon-green to-space-blue p-6">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <div class="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                            <i class="fas fa-boxes text-neon-green text-2xl"></i>
                        </div>
                    </div>
                    <button @click="$emit('close')" class="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors">
                        <i class="fas fa-times text-white"></i>
                    </button>
                </div>
            </div>

            <!-- Inventory Content -->
            <div class="p-6 h-full overflow-y-auto custom-scrollbar">
                
                <!-- Category Filters -->
                <div class="flex flex-wrap gap-2 mb-6">
                    <button v-for="category in categories" :key="category"
                            @click="selectedCategory = category"
                            :class="['px-3 py-1 rounded-lg text-xs font-bold transition-all', selectedCategory === category ? 'bg-neon-green text-white' : 'bg-beige-warm text-text-dark hover:bg-beige-cool']">
                        {{ category.toUpperCase() }}
                    </button>
                </div>

                <!-- Inventory Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <div v-for="item in filteredItems" :key="item.id" class="bg-white rounded-2xl p-4 border border-beige-cool hover:border-neon-green/40 transition-colors">
                        <div class="aspect-square bg-beige-warm rounded-lg mb-4 flex items-center justify-center">
                            <i :class="[item.icon, 'text-3xl', item.color]"></i>
                        </div>
                        
                        <h4 class="font-bold text-sm text-text-dark mb-1">{{ item.name }}</h4>
                        <p class="text-xs text-text-mid mb-3">{{ item.description }}</p>
                        
                        <div class="grid grid-cols-2 gap-2 mb-3 text-xs">
                            <div>
                                <span class="text-text-mid">Qty:</span>
                                <span :class="['font-bold ml-1', item.quantity > item.minStock ? 'text-text-dark' : 'text-radium']">{{ item.quantity }}</span>
                            </div>
                            <div>
                                <span class="text-text-mid">Location:</span>
                                <span class="font-bold text-text-dark ml-1">{{ item.location }}</span>
                            </div>
                            <div>
                                <span class="text-text-mid">Min:</span>
                                <span class="font-bold text-text-dark ml-1">{{ item.minStock }}</span>
                            </div>
                        </div>

                        <div v-if="item.quantity <= item.minStock" class="bg-radium/10 border border-radium/20 rounded-lg p-2 mb-3">
                            <div class="text-xs text-radium font-bold">⚠️ LOW STOCK</div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex gap-2">
                            <button class="flex-1 bg-neon-green text-white px-3 py-2 rounded-lg text-xs font-bold hover:bg-neon-green/90 transition-colors">
                                <i class="fas fa-plus mr-1"></i>ADD
                            </button>
                            <button class="flex-1 bg-space-blue text-white px-3 py-2 rounded-lg text-xs font-bold hover:bg-space-blue/90 transition-colors">
                                <i class="fas fa-minus mr-1"></i>USE
                            </button>
                            <button class="w-8 h-8 bg-beige-warm hover:bg-beige-cool rounded-lg flex items-center justify-center transition-colors">
                                <i class="fas fa-edit text-text-dark text-xs"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Add Item Card -->
                    <div class="bg-beige-warm/50 border-2 border-dashed border-neon-green/30 rounded-2xl p-4 flex flex-col items-center justify-center text-center hover:bg-beige-warm/80 transition-colors cursor-pointer">
                        <div class="w-12 h-12 bg-neon-green/20 rounded-xl flex items-center justify-center mb-4">
                            <i class="fas fa-plus text-neon-green text-xl"></i>
                        </div>
                        <h4 class="font-bold text-text-dark mb-2">ADD ITEM</h4>
                        <p class="text-sm text-text-mid">Track new component</p>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            selectedCategory: 'all',
            categories: ['all', 'resistors', 'capacitors', 'ics', 'sensors', 'mechanical', 'tools'],
            items: [
                {
                    id: 1,
                    name: "Resistor Kit",
                    description: "1/4W Through-hole resistors",
                    category: "resistors",
                    quantity: 847,
                    minStock: 100,
                    unitPrice: 0.05,
                    location: "Drawer A1",
                    icon: "fas fa-minus",
                    color: "text-radium"
                },
                {
                    id: 2,
                    name: "Arduino Uno R3",
                    description: "Microcontroller boards",
                    category: "ics",
                    quantity: 5,
                    minStock: 3,
                    unitPrice: 25.00,
                    location: "Shelf B2",
                    icon: "fas fa-microchip",
                    color: "text-laboratory"
                },
                {
                    id: 3,
                    name: "Ceramic Capacitors",
                    description: "50V Ceramic capacitors",
                    category: "capacitors",
                    quantity: 234,
                    minStock: 50,
                    unitPrice: 0.12,
                    location: "Drawer A3",
                    icon: "fas fa-battery-empty",
                    color: "text-uranium"
                },
                {
                    id: 4,
                    name: "DHT22 Sensors",
                    description: "Temperature & Humidity",
                    category: "sensors",
                    quantity: 2,
                    minStock: 5,
                    unitPrice: 8.50,
                    location: "Shelf C1",
                    icon: "fas fa-thermometer-half",
                    color: "text-sunset-pink"
                },
                {
                    id: 5,
                    name: "M3 Screws",
                    description: "Stainless steel screws",
                    category: "mechanical",
                    quantity: 156,
                    minStock: 50,
                    unitPrice: 0.08,
                    location: "Drawer D1",
                    icon: "fas fa-dot-circle",
                    color: "text-polonium"
                },
                {
                    id: 6,
                    name: "Breadboards",
                    description: "400-point breadboards",
                    category: "tools",
                    quantity: 8,
                    minStock: 5,
                    unitPrice: 3.50,
                    location: "Shelf A1",
                    icon: "fas fa-th",
                    color: "text-space-blue"
                }
            ]
        }
    },
    computed: {
        filteredItems() {
            if (this.selectedCategory === 'all') {
                return this.items;
            }
            return this.items.filter(item => item.category === this.selectedCategory);
        },
        totalItems() {
            return this.items.reduce((sum, item) => sum + item.quantity, 0);
        },
        totalValue() {
            return this.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0).toFixed(2);
        }
    },
    emits: ['close']
};

// Make all components globally available
window.ProfileModule = ProfileModule;
window.PrintersModule = PrintersModule;
window.WorkshopModule = WorkshopModule;
window.ProjectsModule = ProjectsModule;
window.InventoryModule = InventoryModule;