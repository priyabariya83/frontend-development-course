# BMI Calculator Web App

A responsive, feature-rich Body Mass Index (BMI) calculator built with HTML, CSS, and JavaScript as part of the JavaScript Fundamentals learning series.

## Features

- **Dual Measurement Systems**: Switch between Metric (kg, cm) and Imperial (lbs, inches) units
- **Real-time Calculation**: Instant BMI calculation with visual feedback
- **Interactive Sliders**: Use range sliders alongside number inputs for easy adjustment
- **Visual BMI Meter**: Color-coded scale with moving indicator showing BMI category
- **Health Information**: Personalized health messages based on BMI results
- **Dark/Light Mode**: Toggle between color themes for comfortable viewing
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Keyboard Shortcuts**: Quick actions using keyboard shortcuts

## File Structure
bmi-calculator/
├── index.html # Main HTML document
├── style.css # All styling and responsive design
├── script.js # All JavaScript functionality
└── README.md # Project documentation


## How to Use

1. Open `index.html` in your browser or use a live server in VS Code
2. Choose your preferred measurement system (Metric or Imperial)
3. Enter your height and weight using the input fields or sliders
4. Click "Calculate BMI" or press Ctrl/Cmd + Enter
5. View your BMI result, category, and health information
6. Use the reset button to clear inputs and start over

## Keyboard Shortcuts

- **Ctrl/Cmd + Enter**: Calculate BMI
- **Escape**: Reset calculator
- **M**: Toggle between metric and imperial systems
- **Ctrl/Cmd + D**: Toggle dark/light mode

## BMI Categories

- **Underweight**: BMI less than 18.5
- **Normal weight**: BMI 18.5 to 24.9
- **Overweight**: BMI 25 to 29.9
- **Obese**: BMI 30 or greater

## Technical Implementation

### HTML Structure
- Semantic HTML5 elements for better accessibility
- Responsive grid layouts using CSS Grid and Flexbox
- Font Awesome icons for visual cues

### CSS Features
- CSS custom properties for theming
- Responsive design with media queries
- CSS transitions and animations for smooth interactions
- Gradient backgrounds and box shadows for depth

### JavaScript Functions
- Event listeners for user interactions
- BMI calculation logic for both measurement systems
- DOM manipulation to update results in real-time
- Input validation and error handling
- Local storage for theme preference (optional enhancement)

## Browser Compatibility

Works in all modern browsers including Chrome, Firefox, Safari, and Edge.

## JavaScript Concepts Demonstrated

1. DOM manipulation and event handling
2. Form input validation
3. Mathematical calculations
4. Conditional logic
5. CSS class manipulation
6. Responsive design principles
7. Keyboard event handling

## Potential Enhancements

1. Add user profiles to save and track BMI over time
2. Integrate with a backend to save user data
3. Add more detailed health recommendations
4. Include BMI charts and graphs
5. Add printing functionality for results
6. Internationalization for multiple languages

## License

This project is created for educational purposes as part of the JavaScript Fundamentals learning series.

## Author

Created as Day 7 project of the JavaScript Fundamentals learning journey.