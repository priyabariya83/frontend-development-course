# Indian Digital Clock with Timezone Selector

An advanced digital clock application specifically designed for Indian timezones with comprehensive features and a modern UI.

## Features

### 🕐 Core Features
- **Real-time Digital Clock** with millisecond precision
- **Multiple Timezone Support** for all Indian regions
- **Official IST Display** with accurate UTC+5:30 offset
- **Regional Time Preferences** for major Indian cities
- **Neighboring Country Times** for context

### ⚙️ Advanced Controls
- **24/12 Hour Format Toggle**
- **Seconds & Milliseconds Display**
- **Manual Time Adjustment** (±12 hours, ±59 minutes)
- **Sound Controls** for alarms and ticks
- **Quick Actions** for alarms, stopwatch, timer, and sharing

### 🎨 Design Features
- **Modern Glassmorphism UI** with gradient effects
- **Dynamic Background** with animated particles and grid
- **Responsive Design** for all screen sizes
- **Dark Theme** optimized for eye comfort
- **Smooth Animations** and transitions

### 📊 Information Display
- **Current Date**: Sunday, 8 February 2026 (hardcoded reference)
- **Day of Year** calculation
- **Week Number** display
- **Sunrise/Sunset** approximate times for India
- **Timezone Differences** from IST

## Timezones Included

### 🇮🇳 Official Indian Timezone
- **Indian Standard Time (IST)** - UTC+5:30 (All India)

### 🏙️ Regional Indian Timezones
1. **Kolkata Time** - Eastern India
2. **Mumbai Time** - Western India (Financial Capital)
3. **Delhi Time** - Northern India (National Capital)
4. **Chennai Time** - Southern India
5. **Guwahati Time** - Northeast India
6. **Port Blair Time** - Andaman & Nicobar Islands
7. **Leh Time** - Ladakh Region
8. **Jammu Time** - Jammu & Kashmir

### 🌏 Neighboring Countries
1. **Nepal Time** - UTC+5:45 (15 minutes ahead of IST)
2. **Sri Lanka Time** - UTC+5:30 (Same as IST)
3. **Bangladesh Time** - UTC+6 (30 minutes ahead of IST)
4. **Pakistan Time** - UTC+5 (30 minutes behind IST)
5. **Bhutan Time** - UTC+6 (30 minutes ahead of IST)
6. **Myanmar Time** - UTC+6:30 (1 hour ahead of IST)

## Technical Implementation

### File Structure
indian-digital-clock/
├── index.html # Main application structure
├── styles.css # Complete styling with animations
├── script.js # Full JavaScript functionality
├── manifest.json # PWA manifest
└── README.md # Documentation


### Technologies Used
- **HTML5** - Semantic structure
- **CSS3** - Grid, Flexbox, Animations, Variables
- **JavaScript (ES6+)** - Class-based architecture
- **Font Awesome** - Icons
- **Google Fonts** - Orbitron, Poppins, JetBrains Mono

### Key JavaScript Features
1. **Class-based Architecture** for maintainability
2. **Precise Time Calculation** with manual adjustments
3. **Alarm System** with notifications
4. **Timezone Management** with smooth updates
5. **Local Storage** for user preferences (extensible)
6. **PWA Features** for installability

## Installation & Usage

### Quick Start
1. Download all files into a folder
2. Open `index.html` in any modern browser
3. No build process or dependencies required

### Development
1. Open in VS Code
2. Live Server extension recommended for development
3. All files are self-contained

## Browser Support
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+
- Opera 50+

## Performance
- 60 FPS animations
- Optimized re-rendering
- Efficient time calculation algorithms
- Minimal DOM manipulation

## Customization

### Changing Date Reference
In `script.js`, modify the date calculation for Feb 8, 2026:
```javascript
// Line ~180 in initElements() method
const feb8 = new Date(2026, 1, 8); // Change this date