// DOM Elements
const metricBtn = document.getElementById('metric-btn');
const imperialBtn = document.getElementById('imperial-btn');
const metricInputs = document.getElementById('metric-inputs');
const imperialInputs = document.getElementById('imperial-inputs');
const calculateBtn = document.getElementById('calculate-btn');
const resetBtn = document.getElementById('reset-btn');
const bmiValueElement = document.getElementById('bmi-value');
const bmiCategoryElement = document.getElementById('bmi-category');
const healthMessageElement = document.getElementById('health-message');
const bmiIndicator = document.getElementById('bmi-indicator');
const viewCodeBtn = document.getElementById('view-code');
const toggleThemeBtn = document.getElementById('toggle-theme');

// Metric inputs
const heightCmInput = document.getElementById('height-cm');
const heightCmRange = document.getElementById('height-cm-range');
const weightKgInput = document.getElementById('weight-kg');
const weightKgRange = document.getElementById('weight-kg-range');

// Imperial inputs
const heightFtInput = document.getElementById('height-ft');
const heightInInput = document.getElementById('height-in');
const weightLbsInput = document.getElementById('weight-lbs');
const weightLbsRange = document.getElementById('weight-lbs-range');

// Variables
let isMetric = true;
let currentTheme = 'light';

// Event Listeners
document.addEventListener('DOMContentLoaded', initializeApp);
metricBtn.addEventListener('click', () => switchMeasurementSystem(true));
imperialBtn.addEventListener('click', () => switchMeasurementSystem(false));
calculateBtn.addEventListener('click', calculateBMI);
resetBtn.addEventListener('click', resetCalculator);
viewCodeBtn.addEventListener('click', viewCode);
toggleThemeBtn.addEventListener('click', toggleTheme);

// Input synchronization (range with number inputs)
heightCmInput.addEventListener('input', () => syncRangeWithInput(heightCmInput, heightCmRange));
heightCmRange.addEventListener('input', () => syncInputWithRange(heightCmRange, heightCmInput));

weightKgInput.addEventListener('input', () => syncRangeWithInput(weightKgInput, weightKgRange));
weightKgRange.addEventListener('input', () => syncInputWithRange(weightKgRange, weightKgInput));

weightLbsInput.addEventListener('input', () => syncRangeWithInput(weightLbsInput, weightLbsRange));
weightLbsRange.addEventListener('input', () => syncInputWithRange(weightLbsRange, weightLbsInput));

// Initialize the application
function initializeApp() {
    // Set default values
    heightCmInput.value = 175;
    heightCmRange.value = 175;
    weightKgInput.value = 70;
    weightKgRange.value = 70;
    
    heightFtInput.value = 5;
    heightInInput.value = 9;
    weightLbsInput.value = 154;
    weightLbsRange.value = 154;
    
    // Calculate initial BMI
    calculateBMI();
    
    // Update theme icon
    updateThemeIcon();
}

// Switch between metric and imperial systems
function switchMeasurementSystem(metric) {
    isMetric = metric;
    
    if (metric) {
        metricBtn.classList.add('active');
        imperialBtn.classList.remove('active');
        metricInputs.style.display = 'block';
        imperialInputs.style.display = 'none';
    } else {
        metricBtn.classList.remove('active');
        imperialBtn.classList.add('active');
        metricInputs.style.display = 'none';
        imperialInputs.style.display = 'block';
    }
    
    // Recalculate BMI with new system
    calculateBMI();
}

// Calculate BMI based on selected measurement system
function calculateBMI() {
    let height, weight, bmi;
    
    if (isMetric) {
        // Metric calculation: BMI = weight(kg) / height(m)^2
        height = parseFloat(heightCmInput.value) / 100; // Convert cm to m
        weight = parseFloat(weightKgInput.value);
        
        if (!height || !weight || height <= 0 || weight <= 0) {
            showError("Please enter valid height and weight values.");
            return;
        }
        
        bmi = weight / (height * height);
    } else {
        // Imperial calculation: BMI = (weight(lbs) / height(in)^2) * 703
        const feet = parseFloat(heightFtInput.value) || 0;
        const inches = parseFloat(heightInInput.value) || 0;
        weight = parseFloat(weightLbsInput.value);
        
        if ((feet === 0 && inches === 0) || !weight || weight <= 0) {
            showError("Please enter valid height and weight values.");
            return;
        }
        
        height = feet * 12 + inches; // Convert to total inches
        bmi = (weight / (height * height)) * 703;
    }
    
    // Round to one decimal place
    bmi = Math.round(bmi * 10) / 10;
    
    // Update the UI with the calculated BMI
    updateBMIResult(bmi);
}

// Update the BMI result display
function updateBMIResult(bmi) {
    // Update BMI value
    bmiValueElement.textContent = bmi;
    
    // Determine BMI category
    let category, categoryClass, healthMessage;
    
    if (bmi < 18.5) {
        category = "Underweight";
        categoryClass = "underweight";
        healthMessage = "You are underweight. Consider consulting a healthcare provider for nutritional advice to reach a healthy weight.";
    } else if (bmi >= 18.5 && bmi < 25) {
        category = "Normal weight";
        categoryClass = "normal";
        healthMessage = "Congratulations! You have a normal body weight. Maintain a balanced diet and regular physical activity to stay healthy.";
    } else if (bmi >= 25 && bmi < 30) {
        category = "Overweight";
        categoryClass = "overweight";
        healthMessage = "You are overweight. Consider increasing physical activity and making dietary changes. Consult a healthcare provider for personalized advice.";
    } else {
        category = "Obese";
        categoryClass = "obese";
        healthMessage = "You are obese. It's important to consult with a healthcare provider to develop a weight management plan for better health.";
    }
    
    // Update category display
    bmiCategoryElement.textContent = category;
    bmiCategoryElement.className = `bmi-category ${categoryClass}`;
    
    // Update health message
    healthMessageElement.textContent = healthMessage;
    
    // Update the BMI indicator position on the meter
    updateBMIIndicator(bmi);
}

// Update the BMI indicator position on the meter
function updateBMIIndicator(bmi) {
    // Cap BMI at 40 for display purposes
    const displayBmi = Math.min(bmi, 40);
    
    // Calculate position percentage (0-40 BMI range maps to 0-100%)
    let positionPercentage = (displayBmi / 40) * 100;
    
    // Ensure the indicator stays within the meter
    positionPercentage = Math.max(0, Math.min(100, positionPercentage));
    
    // Update the indicator position
    bmiIndicator.style.left = `${positionPercentage}%`;
    
    // Add a pulsing animation to the indicator
    bmiIndicator.style.animation = 'pulse 1.5s infinite';
}

// Create and inject CSS for pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(45, 52, 54, 0.7); }
        70% { box-shadow: 0 0 0 6px rgba(45, 52, 54, 0); }
        100% { box-shadow: 0 0 0 0 rgba(45, 52, 54, 0); }
    }
    
    .dark-mode .bmi-indicator {
        animation-name: pulse-dark;
    }
    
    @keyframes pulse-dark {
        0% { box-shadow: 0 0 0 0 rgba(245, 245, 245, 0.7); }
        70% { box-shadow: 0 0 0 6px rgba(245, 245, 245, 0); }
        100% { box-shadow: 0 0 0 0 rgba(245, 245, 245, 0); }
    }
`;
document.head.appendChild(style);

// Reset calculator to default values
function resetCalculator() {
    if (isMetric) {
        heightCmInput.value = 175;
        heightCmRange.value = 175;
        weightKgInput.value = 70;
        weightKgRange.value = 70;
    } else {
        heightFtInput.value = 5;
        heightInInput.value = 9;
        weightLbsInput.value = 154;
        weightLbsRange.value = 154;
    }
    
    calculateBMI();
    
    // Show reset confirmation
    const originalText = resetBtn.innerHTML;
    resetBtn.innerHTML = '<i class="fas fa-check"></i> Reset Complete!';
    resetBtn.style.background = '#2ecc71';
    
    setTimeout(() => {
        resetBtn.innerHTML = originalText;
        resetBtn.style.background = '';
    }, 1500);
}

// Show error message
function showError(message) {
    bmiValueElement.textContent = '--';
    bmiCategoryElement.textContent = 'Invalid Input';
    bmiCategoryElement.className = 'bmi-category error';
    healthMessageElement.textContent = message;
    bmiIndicator.style.left = '0%';
}

// Sync range slider with number input
function syncRangeWithInput(inputElement, rangeElement) {
    rangeElement.value = inputElement.value;
}

// Sync number input with range slider
function syncInputWithRange(rangeElement, inputElement) {
    inputElement.value = rangeElement.value;
}

// View code (simulate GitHub link)
function viewCode(e) {
    e.preventDefault();
    alert("This would typically link to a GitHub repository with the source code.\n\nFor now, you can view the code directly in your VS Code editor!");
}

// Toggle between light and dark themes
function toggleTheme(e) {
    e.preventDefault();
    
    if (currentTheme === 'light') {
        document.body.classList.add('dark-mode');
        currentTheme = 'dark';
        toggleThemeBtn.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    } else {
        document.body.classList.remove('dark-mode');
        currentTheme = 'light';
        toggleThemeBtn.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
    }
    
    // Update theme icon
    updateThemeIcon();
}

// Update theme icon based on current theme
function updateThemeIcon() {
    const icon = toggleThemeBtn.querySelector('i');
    if (currentTheme === 'light') {
        icon.className = 'fas fa-moon';
        toggleThemeBtn.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
    } else {
        icon.className = 'fas fa-sun';
        toggleThemeBtn.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    }
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to calculate
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        calculateBMI();
    }
    
    // Escape to reset
    if (e.key === 'Escape') {
        resetCalculator();
    }
    
    // M to toggle metric/imperial
    if (e.key === 'm' || e.key === 'M') {
        switchMeasurementSystem(!isMetric);
    }
    
    // D to toggle dark mode
    if (e.key === 'd' || e.key === 'D') {
        if (e.ctrlKey || e.metaKey) {
            toggleTheme({preventDefault: () => {}});
        }
    }
});

// Add some console info
console.log("%cBMI Calculator Web App", "color: #6c5ce7; font-size: 18px; font-weight: bold;");
console.log("%cJavaScript Fundamentals - Day 7 Project", "color: #636e72; font-size: 14px;");
console.log("%cKeyboard Shortcuts:", "color: #2d3436; font-weight: bold;");
console.log("- Ctrl/Cmd + Enter: Calculate BMI");
console.log("- Escape: Reset calculator");
console.log("- M: Toggle metric/imperial system");
console.log("- Ctrl/Cmd + D: Toggle dark mode");