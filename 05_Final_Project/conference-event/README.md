# TechForward Conference Event Page

A modern, responsive conference event page with registration forms, interactive schedule tables, and professional styling.

## 🌐 Live Demo
**[View Live Demo](https://priyabariya83.github.io/conference-event/)

## ✨ Features

- **Fully Responsive Design** - Works on mobile, tablet, and desktop
- **Interactive Schedule Tables** - Tabbed interface for different conference days
- **Registration System** - Multi-tier ticket selection with form validation
- **Modern UI/UX** - Clean design with smooth animations and transitions
- **Contact Form** - Functional contact form with validation
- **Mobile Navigation** - Hamburger menu for smaller screens

## 📁 File Structure

```
conference-event/
│
├── index.html          # Main HTML document
├── style.css           # All CSS styles
├── script.js           # JavaScript functionality
└── README.md           # This documentation file
```

## 🚀 Quick Start

### Option 1: Local Setup
1. **Clone or download** the project files
2. **Open** the `index.html` file in your browser
3. **Start editing** in VS Code or your preferred editor

### Option 2: VS Code Setup
1. **Create a new folder** for the project
2. **Copy all three files** (index.html, style.css, script.js) into the folder
3. **Open the folder** in VS Code
4. **Right-click** on `index.html` → "Open with Live Server" (requires Live Server extension)

## 🎯 Key Components

### 1. Hero Section
- Eye-catching headline and tagline
- Conference details (date, location)
- Call-to-action buttons

### 2. Schedule Section
- Interactive tabbed interface
- Three-day schedule with detailed tables
- Responsive table design

### 3. Registration System
- Three ticket tiers (General, Professional, VIP)
- Interactive selection with visual feedback
- Comprehensive registration form with validation

### 4. Speakers Showcase
- Featured speakers with session details
- Clean card-based layout

### 5. Contact Section
- Conference information
- Functional contact form

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox/Grid
- **JavaScript (ES6)** - Interactive functionality
- **Font Awesome** - Icon library
- **Google Fonts** - Typography (Poppins, Montserrat)

## 📱 Responsive Breakpoints

| Device | Breakpoint | Features |
|--------|------------|----------|
| Mobile | ≤ 576px | Stacked layout, hamburger menu |
| Tablet | 577px - 768px | Optimized navigation, adjusted typography |
| Desktop | ≥ 769px | Full layout with side-by-side sections |

## 🎨 Color Scheme

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Blue | `#3498db` | Buttons, highlights, links |
| Dark Blue | `#1a1a2e` | Headers, dark sections |
| Light Gray | `#f9f9f9` | Background |
| Text Dark | `#2c3e50` | Headings |
| Text Light | `#7f8c8d` | Paragraphs |

## 🔧 Customization Guide

### Change Conference Details
Edit the following in `index.html`:
- Conference name (line 13, 58)
- Dates (line 70)
- Location (line 74)
- Schedule data (lines 124-247)

### Modify Colors
Update color variables in `style.css`:
- Primary color: Search for `#3498db`
- Background colors: Search for `#1a1a2e` and `#f9f9f9`

### Update Ticket Pricing
Edit in both `index.html` and `script.js`:
- HTML: Lines 276, 293, 310
- JavaScript: Lines 56-73 (tierInfo object)

## 📋 Form Validation Features

1. **Required Fields** - Name, email, ticket selection
2. **Email Format Validation** - Proper email pattern checking
3. **Terms Agreement** - Must agree to terms and conditions
4. **Success Messages** - Clear feedback after submission

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🚀 Deployment

### GitHub Pages Deployment
1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to Settings → Pages
4. Select "main" branch and "/root" folder
5. Save and wait for deployment
6. Your site will be available at `https://yourusername.github.io/repository-name`

### Netlify Deployment
1. Drag and drop the folder to Netlify
2. Or connect your GitHub repository
3. Automatic deployment with each push

## 🐛 Troubleshooting

### Common Issues:

1. **Forms not submitting?**
   - Check JavaScript console for errors
   - Ensure all required fields are filled

2. **Mobile menu not working?**
   - Verify JavaScript is loaded
   - Check CSS media queries

3. **Styles not applying?**
   - Confirm file paths are correct
   - Check browser console for 404 errors

---

**⭐ If you find this project useful, please consider giving it a star!**

---

*Last Updated: February 2026*  
*Designed for VS Code development environment*