// Advanced Indian Digital Clock with Stunning Effects
// Date: Sunday, 8 February 2026

class AdvancedIndianClock {
    constructor() {
        // Indian timezone data with detailed information
        this.timezones = {
            official: [
                {
                    id: 'ist',
                    name: 'INDIAN STANDARD TIME',
                    region: 'ALL INDIA (OFFICIAL)',
                    offset: 5.5,
                    color: '#00ff9d',
                    description: 'The official timezone for entire India since 1906',
                    icon: 'fas fa-crown',
                    majorCities: ['New Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Bangalore'],
                    population: '1.4 Billion',
                    area: '3.287M km²'
                }
            ],
            regional: [
                {
                    id: 'delhi',
                    name: 'DELHI TIME',
                    region: 'NORTHERN INDIA',
                    offset: 5.5,
                    color: '#00d4ff',
                    description: 'National capital, government headquarters',
                    icon: 'fas fa-landmark',
                    majorCities: ['Delhi', 'Chandigarh', 'Jaipur', 'Lucknow'],
                    population: '350M',
                    area: '1.2M km²'
                },
                {
                    id: 'mumbai',
                    name: 'MUMBAI TIME',
                    region: 'WESTERN INDIA',
                    offset: 5.5,
                    color: '#ff00ff',
                    description: 'Financial capital, BSE & NSE markets',
                    icon: 'fas fa-chart-line',
                    majorCities: ['Mumbai', 'Pune', 'Ahmedabad', 'Goa'],
                    population: '250M',
                    area: '0.5M km²'
                },
                {
                    id: 'kolkata',
                    name: 'KOLKATA TIME',
                    region: 'EASTERN INDIA',
                    offset: 5.5,
                    color: '#ffaa00',
                    description: 'Cultural hub, first timezone in British India',
                    icon: 'fas fa-theater-masks',
                    majorCities: ['Kolkata', 'Bhubaneswar', 'Patna', 'Guwahati'],
                    population: '300M',
                    area: '0.8M km²'
                },
                {
                    id: 'chennai',
                    name: 'CHENNAI TIME',
                    region: 'SOUTHERN INDIA',
                    offset: 5.5,
                    color: '#00ffff',
                    description: 'Automobile & IT hub, traditional business hours',
                    icon: 'fas fa-industry',
                    majorCities: ['Chennai', 'Bangalore', 'Hyderabad', 'Kochi'],
                    population: '300M',
                    area: '0.8M km²'
                },
                {
                    id: 'bangalore',
                    name: 'BANGALORE TIME',
                    region: 'KARNATAKA',
                    offset: 5.5,
                    color: '#9d00ff',
                    description: 'Silicon Valley of India, IT sector',
                    icon: 'fas fa-laptop-code',
                    majorCities: ['Bangalore', 'Mysore', 'Hubli'],
                    population: '70M',
                    area: '0.2M km²'
                },
                {
                    id: 'hyderabad',
                    name: 'HYDERABAD TIME',
                    region: 'TELANGANA',
                    offset: 5.5,
                    color: '#ff4d4d',
                    description: 'Pharma & tech hub, historical city',
                    icon: 'fas fa-university',
                    majorCities: ['Hyderabad', 'Secunderabad'],
                    population: '40M',
                    area: '0.1M km²'
                },
                {
                    id: 'ahmedabad',
                    name: 'AHMEDABAD TIME',
                    region: 'GUJARAT',
                    offset: 5.5,
                    color: '#4dff88',
                    description: 'Business & industrial hub',
                    icon: 'fas fa-briefcase',
                    majorCities: ['Ahmedabad', 'Surat', 'Vadodara'],
                    population: '70M',
                    area: '0.2M km²'
                },
                {
                    id: 'lucknow',
                    name: 'LUCKNOW TIME',
                    region: 'UTTAR PRADESH',
                    offset: 5.5,
                    color: '#ffdd4d',
                    description: 'Administrative capital, cultural center',
                    icon: 'fas fa-monument',
                    majorCities: ['Lucknow', 'Kanpur', 'Varanasi'],
                    population: '240M',
                    area: '0.3M km²'
                }
            ],
            neighbors: [
                {
                    id: 'nepal',
                    name: 'NEPAL TIME',
                    region: 'NEPAL',
                    offset: 5.75,
                    color: '#dc2626',
                    description: '15 minutes ahead of IST, unique offset',
                    icon: 'fas fa-mountain',
                    majorCities: ['Kathmandu', 'Pokhara', 'Biratnagar'],
                    population: '30M',
                    area: '147K km²'
                },
                {
                    id: 'srilanka',
                    name: 'SRI LANKA TIME',
                    region: 'SRI LANKA',
                    offset: 5.5,
                    color: '#059669',
                    description: 'Same as IST, no daylight saving',
                    icon: 'fas fa-umbrella-beach',
                    majorCities: ['Colombo', 'Kandy', 'Galle'],
                    population: '22M',
                    area: '65K km²'
                },
                {
                    id: 'bangladesh',
                    name: 'BANGLADESH TIME',
                    region: 'BANGLADESH',
                    offset: 6,
                    color: '#2563eb',
                    description: '30 minutes ahead of IST',
                    icon: 'fas fa-water',
                    majorCities: ['Dhaka', 'Chittagong', 'Khulna'],
                    population: '170M',
                    area: '148K km²'
                },
                {
                    id: 'pakistan',
                    name: 'PAKISTAN TIME',
                    region: 'PAKISTAN',
                    offset: 5,
                    color: '#7c3aed',
                    description: '30 minutes behind IST',
                    icon: 'fas fa-mosque',
                    majorCities: ['Islamabad', 'Karachi', 'Lahore'],
                    population: '240M',
                    area: '881K km²'
                },
                {
                    id: 'bhutan',
                    name: 'BHUTAN TIME',
                    region: 'BHUTAN',
                    offset: 6,
                    color: '#d97706',
                    description: '30 minutes ahead of IST',
                    icon: 'fas fa-mountain',
                    majorCities: ['Thimphu', 'Phuntsholing', 'Paro'],
                    population: '0.8M',
                    area: '38K km²'
                },
                {
                    id: 'myanmar',
                    name: 'MYANMAR TIME',
                    region: 'MYANMAR',
                    offset: 6.5,
                    color: '#4338ca',
                    description: '1 hour ahead of IST',
                    icon: 'fas fa-gem',
                    majorCities: ['Yangon', 'Mandalay', 'Naypyidaw'],
                    population: '55M',
                    area: '676K km²'
                }
            ]
        };

        // Current settings
        this.currentTimezone = this.timezones.official[0];
        this.is24HourFormat = false;
        this.showSeconds = true;
        this.showMilliseconds = true;
        this.soundEnabled = true;
        this.manualAdjustment = { hours: 0, minutes: 0 };
        this.startTime = Date.now();
        this.pageLoadTime = new Date();
        
        // Alarm system
        this.alarms = [];
        this.activeAlarms = new Set();
        
        // Theme settings
        this.currentTheme = 'dark';
        this.themes = {
            dark: {
                primary: '#00d4ff',
                secondary: '#ff00ff',
                accent: '#00ff9d',
                bg: '#0a0a14'
            },
            blue: {
                primary: '#0066ff',
                secondary: '#00ccff',
                accent: '#00ffcc',
                bg: '#001a33'
            },
            purple: {
                primary: '#9d00ff',
                secondary: '#ff00ff',
                accent: '#ffaa00',
                bg: '#1a0033'
            },
            green: {
                primary: '#00ff88',
                secondary: '#00ffcc',
                accent: '#ffff00',
                bg: '#002200'
            }
        };
        
        // Initialize the application
        this.init();
    }

    init() {
        this.initElements();
        this.calculateDayOfYear();
        this.renderTimezones();
        this.setupEventListeners();
        this.startClock();
        this.updateStats();
        this.createParticles();
        this.showWelcomeToast();
    }

    initElements() {
        // Clock display elements
        this.elements = {
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds'),
            ampm: document.getElementById('ampm'),
            milliseconds: document.getElementById('milliseconds'),
            currentTimezone: document.getElementById('current-timezone'),
            utcOffset: document.getElementById('utc-offset'),
            currentRegion: document.getElementById('current-region'),
            daylightStatus: document.getElementById('daylight-status'),
            dayOfYear: document.getElementById('day-of-year'),
            weekNumber: document.getElementById('week-number'),
            dayWeek: document.getElementById('day-week'),
            sunriseTime: document.getElementById('sunrise-time'),
            sunsetTime: document.getElementById('sunset-time'),
            tzCount: document.getElementById('tz-count'),
            uptime: document.getElementById('uptime'),
            pageLoadTime: document.getElementById('page-load-time'),
            hourValue: document.getElementById('hour-value'),
            minuteValue: document.getElementById('minute-value'),
            regionalCount: document.getElementById('regional-count'),
            neighborCount: document.getElementById('neighbor-count'),
            
            // Control buttons
            toggleFormat: document.getElementById('toggle-format'),
            toggleSeconds: document.getElementById('toggle-seconds'),
            toggleMilliseconds: document.getElementById('toggle-milliseconds'),
            toggleSound: document.getElementById('toggle-sound'),
            toggleTheme: document.getElementById('toggle-theme'),
            fullscreen: document.getElementById('fullscreen'),
            resetTimezone: document.getElementById('reset-timezone'),
            
            // Adjustment controls
            hourAdjust: document.getElementById('hour-adjust'),
            minuteAdjust: document.getElementById('minute-adjust'),
            applyAdjustment: document.getElementById('apply-adjustment'),
            resetAdjustment: document.getElementById('reset-adjustment'),
            
            // Quick actions
            setAlarm: document.getElementById('set-alarm'),
            startStopwatch: document.getElementById('start-stopwatch'),
            startTimer: document.getElementById('start-timer'),
            shareTime: document.getElementById('share-time'),
            copyTime: document.getElementById('copy-time'),
            savePreset: document.getElementById('save-preset'),
            
            // Alarm elements
            alarmOverlay: document.getElementById('alarm-overlay'),
            alarmTime: document.getElementById('alarm-time'),
            alarmTimezone: document.getElementById('alarm-timezone'),
            saveAlarm: document.getElementById('save-alarm'),
            cancelAlarm: document.getElementById('cancel-alarm'),
            closeAlarm: document.getElementById('close-alarm'),
            alarmList: document.getElementById('alarm-list'),
            
            // Timezone containers
            officialTimezones: document.getElementById('official-timezones'),
            regionalTimezones: document.getElementById('regional-timezones'),
            neighborTimezones: document.getElementById('neighbor-timezones'),
            
            // Toast container
            toastContainer: document.getElementById('toast-container')
        };

        // Set page load time
        this.elements.pageLoadTime.textContent = this.pageLoadTime.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        // Set timezone counts
        this.elements.regionalCount.textContent = this.timezones.regional.length;
        this.elements.neighborCount.textContent = this.timezones.neighbors.length;
        this.elements.tzCount.textContent = this.timezones.official.length + 
                                          this.timezones.regional.length + 
                                          this.timezones.neighbors.length;
    }

    calculateDayOfYear() {
        // For February 8, 2026 (Sunday)
        const feb8 = new Date(2026, 1, 8); // February is month 1 (0-indexed)
        const startOfYear = new Date(2026, 0, 1);
        const dayOfYear = Math.floor((feb8 - startOfYear) / (1000 * 60 * 60 * 24)) + 1;
        this.elements.dayOfYear.textContent = dayOfYear.toString().padStart(3, '0');
        
        // Calculate week number
        const firstDayOfYear = new Date(2026, 0, 1);
        const pastDaysOfYear = (feb8 - firstDayOfYear) / 86400000;
        const weekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
        this.elements.weekNumber.textContent = weekNumber.toString().padStart(2, '0');
        
        // Day of week (1-7, Sunday = 1)
        this.elements.dayWeek.textContent = feb8.getDay() + 1;
    }

    createParticles() {
        const container = document.querySelector('.particles-container');
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: ${Math.random() > 0.5 ? 'var(--primary)' : 'var(--secondary)'};
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.5 + 0.2};
                animation: floatParticle ${Math.random() * 20 + 10}s linear infinite;
            `;
            container.appendChild(particle);
        }

        // Add CSS for particle animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatParticle {
                0% {
                    transform: translate(0, 0) rotate(0deg);
                    opacity: 0.2;
                }
                25% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(90deg);
                    opacity: 0.8;
                }
                50% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(180deg);
                    opacity: 0.2;
                }
                75% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(270deg);
                    opacity: 0.8;
                }
                100% {
                    transform: translate(0, 0) rotate(360deg);
                    opacity: 0.2;
                }
            }
        `;
        document.head.appendChild(style);
    }

    renderTimezones() {
        // Render official timezones
        this.renderTimezoneCategory(this.timezones.official, this.elements.officialTimezones, 'official');
        
        // Render regional timezones
        this.renderTimezoneCategory(this.timezones.regional, this.elements.regionalTimezones, 'regional');
        
        // Render neighbor timezones
        this.renderTimezoneCategory(this.timezones.neighbors, this.elements.neighborTimezones, 'neighbor');
    }

    renderTimezoneCategory(timezones, container, category) {
        container.innerHTML = '';
        
        timezones.forEach(tz => {
            const card = document.createElement('div');
            card.className = `timezone-card ${tz.id === this.currentTimezone.id ? 'active' : ''}`;
            card.dataset.id = tz.id;
            card.dataset.category = category;
            
            const offsetText = this.formatOffset(tz.offset);
            const currentTime = this.getAdjustedTime(tz.offset);
            const timeStr = this.formatTime(currentTime, this.is24HourFormat);
            const difference = this.getDifferenceFromIST(tz.offset);
            
            card.innerHTML = `
                <div class="card-header">
                    <div class="card-title">${tz.name}</div>
                    <div class="card-offset">${offsetText}</div>
                </div>
                <div class="card-body">
                    <div class="card-region">${tz.region}</div>
                    <div class="card-current-time">${timeStr}</div>
                    <div class="card-description">${tz.description}</div>
                    <div class="card-details">
                        <span><i class="fas fa-users"></i> ${tz.population}</span>
                        <span><i class="fas fa-map"></i> ${tz.area}</span>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="card-difference">
                        ${difference === 0 ? 'REFERENCE TIME' : 
                          difference > 0 ? `${difference} AHEAD OF IST` : 
                          `${Math.abs(difference)} BEHIND IST`}
                    </div>
                    <button class="card-button" data-action="select">
                        <i class="fas fa-clock"></i> SELECT
                    </button>
                </div>
            `;
            
            container.appendChild(card);
        });
    }

    startClock() {
        // Initial update
        this.updateClock();
        
        // Update every 10ms for smooth milliseconds
        this.clockInterval = setInterval(() => this.updateClock(), 10);
        
        // Update timezone cards every second
        this.timezoneUpdateInterval = setInterval(() => this.updateTimezoneCards(), 1000);
        
        // Update stats every second
        this.statsInterval = setInterval(() => this.updateStats(), 1000);
        
        // Check alarms every second
        this.alarmInterval = setInterval(() => this.checkAlarms(), 1000);
        
        // Play tick sound if enabled
        if (this.soundEnabled) {
            this.tickSoundInterval = setInterval(() => this.playTickSound(), 1000);
        }
    }

    updateClock() {
        const now = new Date();
        const adjustedTime = this.getAdjustedTime(this.currentTimezone.offset);
        
        // Format hours, minutes, seconds
        let hours = adjustedTime.getHours();
        const minutes = adjustedTime.getMinutes();
        const seconds = adjustedTime.getSeconds();
        const milliseconds = adjustedTime.getMilliseconds();
        
        // Handle 12/24 hour format
        if (!this.is24HourFormat) {
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;
            this.elements.ampm.textContent = ampm;
            this.elements.ampm.style.display = 'block';
        } else {
            this.elements.ampm.style.display = 'none';
        }
        
        // Update display with animation
        this.animateNumber(this.elements.hours, hours.toString().padStart(2, '0'));
        this.animateNumber(this.elements.minutes, minutes.toString().padStart(2, '0'));
        
        if (this.showSeconds) {
            this.animateNumber(this.elements.seconds, seconds.toString().padStart(2, '0'));
            this.elements.seconds.style.display = 'inline';
        } else {
            this.elements.seconds.style.display = 'none';
        }
        
        if (this.showMilliseconds) {
            this.elements.milliseconds.textContent = `.${milliseconds.toString().padStart(3, '0')}`;
            this.elements.milliseconds.style.display = 'inline';
        } else {
            this.elements.milliseconds.style.display = 'none';
        }
        
        // Update timezone info
        this.elements.currentTimezone.textContent = this.currentTimezone.name;
        this.elements.utcOffset.textContent = this.formatOffset(this.currentTimezone.offset);
        this.elements.currentRegion.textContent = this.currentTimezone.region;
        
        // Update time information
        this.updateTimeInfo(adjustedTime);
        
        // Update floating elements position
        this.updateFloatingElements();
    }

    animateNumber(element, newValue) {
        if (element.textContent !== newValue) {
            element.style.transform = 'scale(1.1)';
            element.textContent = newValue;
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 100);
        }
    }

    updateTimezoneCards() {
        document.querySelectorAll('.timezone-card').forEach(card => {
            const tzId = card.dataset.id;
            const category = card.dataset.category;
            
            // Find timezone data
            let timezone;
            if (category === 'official') {
                timezone = this.timezones.official.find(tz => tz.id === tzId);
            } else if (category === 'regional') {
                timezone = this.timezones.regional.find(tz => tz.id === tzId);
            } else {
                timezone = this.timezones.neighbors.find(tz => tz.id === tzId);
            }
            
            if (timezone) {
                const currentTime = this.getAdjustedTime(timezone.offset);
                const timeStr = this.formatTime(currentTime, this.is24HourFormat);
                const timeElement = card.querySelector('.card-current-time');
                if (timeElement) {
                    timeElement.textContent = timeStr;
                }
                
                // Update active state
                if (tzId === this.currentTimezone.id) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
            }
        });
    }

    updateTimeInfo(date) {
        // Update sunrise/sunset (approximate for India)
        const sunrise = new Date(date);
        sunrise.setHours(6, 45, 0, 0);
        const sunset = new Date(date);
        sunset.setHours(18, 15, 0, 0);
        
        this.elements.sunriseTime.textContent = this.formatTime(sunrise, false);
        this.elements.sunsetTime.textContent = this.formatTime(sunset, false);
    }

    updateStats() {
        const uptime = Date.now() - this.startTime;
        const uptimeStr = new Date(uptime).toISOString().substr(11, 8);
        this.elements.uptime.textContent = uptimeStr;
    }

    updateFloatingElements() {
        const floatingElements = document.querySelectorAll('.floating-clock, .floating-map, .floating-gear');
        floatingElements.forEach((el, index) => {
            const time = Date.now() / 1000;
            const offset = index * 2;
            const x = Math.sin(time + offset) * 20;
            const y = Math.cos(time + offset) * 20;
            el.style.transform = `translate(${x}px, ${y}px) rotate(${time * 10}deg)`;
        });
    }

    getAdjustedTime(offset) {
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const adjusted = new Date(utc + (3600000 * offset));
        
        // Apply manual adjustment
        adjusted.setHours(adjusted.getHours() + this.manualAdjustment.hours);
        adjusted.setMinutes(adjusted.getMinutes() + this.manualAdjustment.minutes);
        
        return adjusted;
    }

    formatTime(date, is24Hour) {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        
        if (!is24Hour) {
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
        }
        
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    formatOffset(offset) {
        const sign = offset >= 0 ? '+' : '-';
        const absOffset = Math.abs(offset);
        const hours = Math.floor(absOffset);
        const minutes = Math.round((absOffset - hours) * 60);
        
        if (minutes === 0) {
            return `UTC${sign}${hours}`;
        }
        return `UTC${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    getDifferenceFromIST(offset) {
        const difference = (offset - 5.5) * 60; // Convert to minutes
        return Math.round(difference);
    }

    setupEventListeners() {
        // Format toggle
        this.elements.toggleFormat.addEventListener('click', () => {
            this.is24HourFormat = !this.is24HourFormat;
            this.elements.toggleFormat.innerHTML = this.is24HourFormat ? 
                '<i class="fas fa-exchange-alt"></i><span>12H</span>' : 
                '<i class="fas fa-exchange-alt"></i><span>24H</span>';
            this.playClickSound();
            this.showToast(`Switched to ${this.is24HourFormat ? '24' : '12'}-hour format`);
        });

        // Seconds toggle
        this.elements.toggleSeconds.addEventListener('click', () => {
            this.showSeconds = !this.showSeconds;
            this.elements.toggleSeconds.innerHTML = this.showSeconds ? 
                '<i class="fas fa-stopwatch"></i><span>HIDE SECONDS</span>' : 
                '<i class="fas fa-stopwatch"></i><span>SHOW SECONDS</span>';
            this.playClickSound();
            this.showToast(`Seconds ${this.showSeconds ? 'shown' : 'hidden'}`);
        });

        // Milliseconds toggle
        this.elements.toggleMilliseconds.addEventListener('click', () => {
            this.showMilliseconds = !this.showMilliseconds;
            this.elements.toggleMilliseconds.innerHTML = this.showMilliseconds ? 
                '<i class="fas fa-tachometer-alt"></i><span>HIDE MS</span>' : 
                '<i class="fas fa-tachometer-alt"></i><span>SHOW MS</span>';
            this.playClickSound();
            this.showToast(`Milliseconds ${this.showMilliseconds ? 'shown' : 'hidden'}`);
        });

        // Sound toggle
        this.elements.toggleSound.addEventListener('click', () => {
            this.soundEnabled = !this.soundEnabled;
            this.elements.toggleSound.innerHTML = this.soundEnabled ? 
                '<i class="fas fa-volume-up"></i><span>SOUND OFF</span>' : 
                '<i class="fas fa-volume-up"></i><span>SOUND ON</span>';
            this.playClickSound();
            
            if (this.soundEnabled) {
                this.tickSoundInterval = setInterval(() => this.playTickSound(), 1000);
            } else {
                clearInterval(this.tickSoundInterval);
            }
            
            this.showToast(`Sound ${this.soundEnabled ? 'enabled' : 'disabled'}`);
        });

        // Theme toggle
        this.elements.toggleTheme.addEventListener('click', () => {
            const themeNames = Object.keys(this.themes);
            const currentIndex = themeNames.indexOf(this.currentTheme);
            const nextIndex = (currentIndex + 1) % themeNames.length;
            this.currentTheme = themeNames[nextIndex];
            this.applyTheme(this.themes[this.currentTheme]);
            this.playClickSound();
            this.showToast(`Theme: ${this.currentTheme.toUpperCase()}`);
        });

        // Fullscreen toggle
        this.elements.fullscreen.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(e => {
                    console.log('Fullscreen error:', e);
                });
                this.showToast('Entered fullscreen mode');
            } else {
                document.exitFullscreen();
                this.showToast('Exited fullscreen mode');
            }
            this.playClickSound();
        });

        // Reset timezone
        this.elements.resetTimezone.addEventListener('click', () => {
            this.selectTimezone('ist', 'official');
            this.playClickSound();
        });

        // Adjustment sliders
        this.elements.hourAdjust.addEventListener('input', (e) => {
            this.elements.hourValue.textContent = e.target.value;
            this.playClickSound();
        });

        this.elements.minuteAdjust.addEventListener('input', (e) => {
            this.elements.minuteValue.textContent = e.target.value;
            this.playClickSound();
        });

        // Apply adjustment
        this.elements.applyAdjustment.addEventListener('click', () => {
            const hours = parseFloat(this.elements.hourAdjust.value) || 0;
            const minutes = parseInt(this.elements.minuteAdjust.value) || 0;
            
            this.manualAdjustment = { hours, minutes };
            this.playClickSound();
            this.showToast(`Time adjusted by ${hours >= 0 ? '+' : ''}${hours}h ${minutes >= 0 ? '+' : ''}${minutes}m`);
        });

        // Reset adjustment
        this.elements.resetAdjustment.addEventListener('click', () => {
            this.manualAdjustment = { hours: 0, minutes: 0 };
            this.elements.hourAdjust.value = 0;
            this.elements.minuteAdjust.value = 0;
            this.elements.hourValue.textContent = '0';
            this.elements.minuteValue.textContent = '0';
            this.playClickSound();
            this.showToast('Time adjustment reset');
        });

        // Timezone selection
        document.addEventListener('click', (e) => {
            if (e.target.closest('.timezone-card')) {
                const card = e.target.closest('.timezone-card');
                const tzId = card.dataset.id;
                const category = card.dataset.category;
                this.selectTimezone(tzId, category);
                this.playClickSound();
            }
            
            if (e.target.closest('.card-button[data-action="select"]')) {
                const card = e.target.closest('.timezone-card');
                const tzId = card.dataset.id;
                const category = card.dataset.category;
                this.selectTimezone(tzId, category);
                this.playClickSound();
            }
        });

        // Alarm controls
        this.elements.setAlarm.addEventListener('click', () => {
            this.elements.alarmOverlay.style.display = 'flex';
            this.playClickSound();
        });

        this.elements.closeAlarm.addEventListener('click', () => {
            this.elements.alarmOverlay.style.display = 'none';
            this.playClickSound();
        });

        this.elements.cancelAlarm.addEventListener('click', () => {
            this.elements.alarmOverlay.style.display = 'none';
            this.playClickSound();
        });

        this.elements.saveAlarm.addEventListener('click', () => {
            this.addAlarm();
            this.playClickSound();
        });

        // Share time
        this.elements.shareTime.addEventListener('click', () => {
            this.shareCurrentTime();
            this.playClickSound();
        });

        // Copy time
        this.elements.copyTime.addEventListener('click', () => {
            this.copyCurrentTime();
            this.playClickSound();
        });

        // Save preset
        this.elements.savePreset.addEventListener('click', () => {
            this.saveCurrentPreset();
            this.playClickSound();
        });

        // Close alarm overlay when clicking outside
        this.elements.alarmOverlay.addEventListener('click', (e) => {
            if (e.target === this.elements.alarmOverlay) {
                this.elements.alarmOverlay.style.display = 'none';
            }
        });

        // Handle keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'f':
                    if (e.ctrlKey) {
                        this.elements.fullscreen.click();
                    }
                    break;
                case 't':
                    this.elements.toggleTheme.click();
                    break;
                case 's':
                    this.elements.toggleSound.click();
                    break;
                case 'Escape':
                    if (this.elements.alarmOverlay.style.display === 'flex') {
                        this.elements.alarmOverlay.style.display = 'none';
                    }
                    break;
            }
        });
    }

    selectTimezone(tzId, category) {
        let timezone;
        
        if (category === 'official') {
            timezone = this.timezones.official.find(tz => tz.id === tzId);
        } else if (category === 'regional') {
            timezone = this.timezones.regional.find(tz => tz.id === tzId);
        } else {
            timezone = this.timezones.neighbors.find(tz => tz.id === tzId);
        }
        
        if (timezone) {
            this.currentTimezone = timezone;
            this.showToast(`Selected: ${timezone.name}`);
            this.updateClock();
            this.updateTimezoneCards();
        }
    }

    addAlarm() {
        const timeValue = this.elements.alarmTime.value;
        const timezone = this.elements.alarmTimezone.value;
        
        if (!timeValue) {
            this.showToast('Please select alarm time', 'error');
            return;
        }
        
        const alarm = {
            id: Date.now(),
            time: timeValue,
            timezone: timezone,
            enabled: true,
            createdAt: new Date().toLocaleTimeString()
        };
        
        this.alarms.push(alarm);
        this.renderAlarms();
        this.showToast(`Alarm set for ${timeValue}`);
    }

    renderAlarms() {
        this.elements.alarmList.innerHTML = '';
        
        if (this.alarms.length === 0) {
            this.elements.alarmList.innerHTML = '<div class="no-alarms">No alarms set</div>';
            return;
        }
        
        this.alarms.forEach(alarm => {
            const alarmItem = document.createElement('div');
            alarmItem.className = 'alarm-item';
            alarmItem.innerHTML = `
                <div>
                    <div class="alarm-time">${alarm.time}</div>
                    <div class="alarm-timezone">${alarm.timezone} • ${alarm.createdAt}</div>
                </div>
                <div class="alarm-actions">
                    <button class="card-button" onclick="clock.toggleAlarm(${alarm.id})">
                        <i class="fas ${alarm.enabled ? 'fa-bell-slash' : 'fa-bell'}"></i>
                    </button>
                    <button class="card-button" onclick="clock.deleteAlarm(${alarm.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            this.elements.alarmList.appendChild(alarmItem);
        });
    }

    toggleAlarm(alarmId) {
        const alarm = this.alarms.find(a => a.id === alarmId);
        if (alarm) {
            alarm.enabled = !alarm.enabled;
            this.renderAlarms();
            this.showToast(`Alarm ${alarm.enabled ? 'enabled' : 'disabled'}`);
            this.playClickSound();
        }
    }

    deleteAlarm(alarmId) {
        this.alarms = this.alarms.filter(a => a.id !== alarmId);
        this.renderAlarms();
        this.showToast('Alarm deleted');
        this.playClickSound();
    }

    checkAlarms() {
        if (!this.soundEnabled || this.alarms.length === 0) return;
        
        const now = this.getAdjustedTime(this.currentTimezone.offset);
        const currentTimeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        this.alarms.forEach(alarm => {
            if (alarm.enabled && alarm.time === currentTimeStr) {
                if (!this.activeAlarms.has(alarm.id)) {
                    this.activeAlarms.add(alarm.id);
                    this.triggerAlarm(alarm);
                }
            } else {
                this.activeAlarms.delete(alarm.id);
            }
        });
    }

    triggerAlarm(alarm) {
        // Play alarm sound
        const alarmSound = document.getElementById('alarm-sound');
        if (alarmSound && this.soundEnabled) {
            alarmSound.currentTime = 0;
            alarmSound.play().catch(e => console.log('Audio play failed:', e));
        }
        
        // Show notification
        this.showToast(`⏰ ALARM: ${alarm.time}`, 'alarm');
        
        // Request notification permission
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Indian Digital Clock Alarm', {
                body: `Alarm: ${alarm.time}`,
                icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">⏰</text></svg>',
                requireInteraction: true
            });
        }
    }

    shareCurrentTime() {
        const now = this.getAdjustedTime(this.currentTimezone.offset);
        const timeStr = this.formatTime(now, this.is24HourFormat);
        const message = `🕐 Current time in ${this.currentTimezone.name}: ${timeStr} (${this.formatOffset(this.currentTimezone.offset)})\nDate: Sunday, 8 February 2026\nvia Indian Digital Clock`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Indian Digital Clock',
                text: message,
                url: window.location.href
            }).catch(e => console.log('Share failed:', e));
        } else {
            navigator.clipboard.writeText(message).then(() => {
                this.showToast('📋 Time copied to clipboard!');
            });
        }
    }

    copyCurrentTime() {
        const now = this.getAdjustedTime(this.currentTimezone.offset);
        const timeStr = this.formatTime(now, this.is24HourFormat);
        const text = `${timeStr} ${this.currentTimezone.name} (${this.formatOffset(this.currentTimezone.offset)})`;
        
        navigator.clipboard.writeText(text).then(() => {
            this.showToast('📋 Time copied to clipboard!');
        });
    }

    saveCurrentPreset() {
        const preset = {
            timezone: this.currentTimezone,
            format: this.is24HourFormat ? '24h' : '12h',
            showSeconds: this.showSeconds,
            showMilliseconds: this.showMilliseconds,
            manualAdjustment: this.manualAdjustment,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('clockPreset', JSON.stringify(preset));
        this.showToast('💾 Preset saved successfully!');
    }

    applyTheme(theme) {
        const root = document.documentElement;
        root.style.setProperty('--primary', theme.primary);
        root.style.setProperty('--secondary', theme.secondary);
        root.style.setProperty('--accent', theme.accent);
        root.style.setProperty('--dark', theme.bg);
        root.style.setProperty('--darker', this.darkenColor(theme.bg, 20));
    }

    darkenColor(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) - amt;
        const G = (num >> 8 & 0x00FF) - amt;
        const B = (num & 0x0000FF) - amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }

    playTickSound() {
        if (!this.soundEnabled) return;
        
        const tickSound = document.getElementById('tick-sound');
        if (tickSound) {
            tickSound.currentTime = 0;
            tickSound.volume = 0.3;
            tickSound.play().catch(e => console.log('Tick sound failed:', e));
        }
    }

    playClickSound() {
        if (!this.soundEnabled) return;
        
        const clickSound = document.getElementById('click-sound');
        if (clickSound) {
            clickSound.currentTime = 0;
            clickSound.volume = 0.5;
            clickSound.play().catch(e => console.log('Click sound failed:', e));
        }
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        
        // Add type styling
        switch(type) {
            case 'error':
                toast.style.borderColor = '#ff4444';
                toast.style.boxShadow = '0 0 20px #ff4444, 0 0 40px rgba(255, 68, 68, 0.3)';
                break;
            case 'alarm':
                toast.style.borderColor = '#ffaa00';
                toast.style.boxShadow = '0 0 20px #ffaa00, 0 0 40px rgba(255, 170, 0, 0.3)';
                break;
            case 'success':
                toast.style.borderColor = '#00ff9d';
                toast.style.boxShadow = '0 0 20px #00ff9d, 0 0 40px rgba(0, 255, 157, 0.3)';
                break;
            default:
                toast.style.borderColor = 'var(--primary)';
                toast.style.boxShadow = 'var(--glow-primary)';
        }
        
        this.elements.toastContainer.appendChild(toast);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'toastSlide 0.3s ease-in reverse';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    showWelcomeToast() {
        setTimeout(() => {
            this.showToast('🕐 Welcome to Indian Digital Clock!', 'success');
        }, 1000);
        
        setTimeout(() => {
            this.showToast('📍 Select any Indian region to view local time', 'info');
        }, 3000);
    }
}

// Initialize the clock when DOM is loaded
let clock;
document.addEventListener('DOMContentLoaded', () => {
    clock = new AdvancedIndianClock();
    
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            33% { transform: translate(50px, -30px) rotate(120deg); }
            66% { transform: translate(-30px, 50px) rotate(240deg); }
        }
        
        .timezone-card {
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
                        box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                        border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .control-btn, .quick-action {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .time-unit {
            transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
    `;
    document.head.appendChild(style);
});