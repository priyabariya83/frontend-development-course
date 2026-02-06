// Real-time Character Counter with Debouncing

// DOM Elements
const textInput = document.getElementById('textInput');
const themeToggle = document.getElementById('themeToggle');
const clearBtn = document.getElementById('clearBtn');
const pasteBtn = document.getElementById('pasteBtn');
const sampleBtn = document.getElementById('sampleBtn');
const speakBtn = document.getElementById('speakBtn');
const stopSpeakBtn = document.getElementById('stopSpeakBtn');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');
const shareBtn = document.getElementById('shareBtn');
const debounceSlider = document.getElementById('debounceSlider');
const debounceValue = document.getElementById('debounceValue');
const footerDebounceValue = document.getElementById('footerDebounceValue');
const resetDebounceBtn = document.getElementById('resetDebounceBtn');
const showTopWords = document.getElementById('showTopWords');
const showAllWords = document.getElementById('showAllWords');
const resetHistoryBtn = document.getElementById('resetHistoryBtn');
const shareModal = document.getElementById('shareModal');
const modalClose = document.querySelector('.modal-close');
const shareOptions = document.querySelectorAll('.share-option');
const toast = document.getElementById('toast');
const toastClose = document.querySelector('.toast-close');
const themeOptions = document.querySelectorAll('.theme-option');

// Statistics Elements
const charCount = document.getElementById('charCount');
const letterCount = document.getElementById('letterCount');
const digitCount = document.getElementById('digitCount');
const wordCount = document.getElementById('wordCount');
const uniqueWordCount = document.getElementById('uniqueWordCount');
const avgWordLength = document.getElementById('avgWordLength');
const sentenceCount = document.getElementById('sentenceCount');
const avgSentenceLength = document.getElementById('avgSentenceLength');
const wordsPerSentence = document.getElementById('wordsPerSentence');
const paragraphCount = document.getElementById('paragraphCount');
const avgParagraphLength = document.getElementById('avgParagraphLength');
const sentencesPerParagraph = document.getElementById('sentencesPerParagraph');
const readingTime = document.getElementById('readingTime');
const slowReadingTime = document.getElementById('slowReadingTime');
const fastReadingTime = document.getElementById('fastReadingTime');
const typingSpeed = document.getElementById('typingSpeed');
const charsPerMinute = document.getElementById('charsPerMinute');
const timeToType = document.getElementById('timeToType');

// Distribution Bars
const uppercaseBar = document.getElementById('uppercaseBar');
const lowercaseBar = document.getElementById('lowercaseBar');
const spacesBar = document.getElementById('spacesBar');
const uppercasePercent = document.getElementById('uppercasePercent');
const lowercasePercent = document.getElementById('lowercasePercent');
const spacesPercent = document.getElementById('spacesPercent');

// History Elements
const peakChars = document.getElementById('peakChars');
const peakWords = document.getElementById('peakWords');
const typingSessions = document.getElementById('typingSessions');
const totalTyped = document.getElementById('totalTyped');
const liveCharCount = document.getElementById('liveCharCount');

// Chart Variables
let distributionChart = null;
let wordFrequencyMode = 'top10';

// State Variables
let debounceDelay = 50;
let typingStartTime = null;
let typingTimer = null;
let speechSynthesis = null;
let isSpeaking = false;
let statisticsHistory = {
    peakChars: 0,
    peakWords: 0,
    totalTyped: 0,
    typingSessions: 0
};

// Sample Text
const sampleText = `Welcome to CharCounter! This is a sample text to demonstrate the real-time character counting capabilities of this application.

Debouncing is a programming practice used to ensure that time-consuming tasks do not fire so often, which can cause performance issues. In this application, we use debouncing to update statistics only after you've stopped typing for a specified delay.

Features include:
• Real-time character, word, sentence, and paragraph counting
• Advanced statistics like reading time and typing speed
• Character distribution analysis
• Word frequency tracking
• Configurable debounce delay for optimal performance
• Dark/light theme support
• Export and sharing capabilities

Try typing your own text to see all the features in action! The statistics will update in real-time with smooth debounced transitions.`;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Load saved settings
    loadSettings();
    
    // Initialize charts
    initializeCharts();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load sample text if first visit
    if (!localStorage.getItem('hasVisited')) {
        textInput.value = sampleText;
        localStorage.setItem('hasVisited', 'true');
        updateStatistics();
    }
    
    // Start typing timer
    typingStartTime = Date.now();
    setInterval(updateTypingStats, 1000);
    
    // Update footer stats
    updateFooterStats();
});

// Load saved settings from localStorage
function loadSettings() {
    // Load theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-theme', savedTheme === 'dark');
    themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    updateThemeButtons(savedTheme);
    
    // Load debounce delay
    const savedDelay = localStorage.getItem('debounceDelay');
    if (savedDelay) {
        debounceDelay = parseInt(savedDelay);
        debounceSlider.value = debounceDelay;
        updateDebounceValue();
    }
    
    // Load history
    const savedHistory = localStorage.getItem('statisticsHistory');
    if (savedHistory) {
        statisticsHistory = JSON.parse(savedHistory);
        updateHistoryDisplay();
    }
}

// Save settings to localStorage
function saveSettings() {
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    localStorage.setItem('debounceDelay', debounceDelay.toString());
    localStorage.setItem('statisticsHistory', JSON.stringify(statisticsHistory));
}

// Update theme toggle buttons
function updateThemeButtons(theme) {
    themeOptions.forEach(option => {
        option.classList.toggle('active', option.dataset.theme === theme);
    });
}

// Update debounce value display
function updateDebounceValue() {
    debounceValue.textContent = `${debounceDelay}ms`;
    footerDebounceValue.textContent = `${debounceDelay}ms`;
}

// Update footer statistics
function updateFooterStats() {
    liveCharCount.textContent = statisticsHistory.totalTyped.toLocaleString();
}

// Update history display
function updateHistoryDisplay() {
    peakChars.textContent = statisticsHistory.peakChars.toLocaleString();
    peakWords.textContent = statisticsHistory.peakWords.toLocaleString();
    typingSessions.textContent = statisticsHistory.typingSessions.toLocaleString();
    totalTyped.textContent = `${statisticsHistory.totalTyped.toLocaleString()} chars`;
}

// Set up event listeners
function setupEventListeners() {
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Theme options in footer
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.dataset.theme;
            document.body.classList.toggle('dark-theme', theme === 'dark');
            themeToggle.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            updateThemeButtons(theme);
            saveSettings();
            showToast('Theme updated successfully');
        });
    });
    
    // Text input with debouncing
    const debouncedUpdate = debounce(updateStatistics, debounceDelay);
    textInput.addEventListener('input', (e) => {
        debouncedUpdate();
        
        // Update history
        statisticsHistory.totalTyped++;
        const currentChars = e.target.value.length;
        if (currentChars > statisticsHistory.peakChars) {
            statisticsHistory.peakChars = currentChars;
        }
        
        // Count words for peak
        const words = e.target.value.trim().split(/\s+/).filter(word => word.length > 0);
        if (words.length > statisticsHistory.peakWords) {
            statisticsHistory.peakWords = words.length;
        }
        
        updateHistoryDisplay();
        updateFooterStats();
        saveSettings();
        
        // Show debounce indicator
        showDebounceIndicator();
    });
    
    // Debounce slider
    debounceSlider.addEventListener('input', (e) => {
        debounceDelay = parseInt(e.target.value);
        updateDebounceValue();
        saveSettings();
    });
    
    // Reset debounce button
    resetDebounceBtn.addEventListener('click', () => {
        debounceDelay = 50;
        debounceSlider.value = debounceDelay;
        updateDebounceValue();
        saveSettings();
        showToast('Debounce delay reset to 50ms');
    });
    
    // Clear button
    clearBtn.addEventListener('click', () => {
        textInput.value = '';
        textInput.focus();
        updateStatistics();
        showToast('Text cleared successfully');
    });
    
    // Paste button
    pasteBtn.addEventListener('click', async () => {
        try {
            const text = await navigator.clipboard.readText();
            textInput.value = text;
            updateStatistics();
            showToast('Text pasted from clipboard');
        } catch (err) {
            showToast('Failed to paste from clipboard', 'error');
        }
    });
    
    // Sample button
    sampleBtn.addEventListener('click', () => {
        textInput.value = sampleText;
        textInput.focus();
        updateStatistics();
        showToast('Sample text loaded');
    });
    
    // Text-to-speech buttons
    speakBtn.addEventListener('click', speakText);
    stopSpeakBtn.addEventListener('click', stopSpeaking);
    
    // Copy statistics
    copyBtn.addEventListener('click', copyStatistics);
    
    // Download report
    downloadBtn.addEventListener('click', downloadReport);
    
    // Share button
    shareBtn.addEventListener('click', () => {
        shareModal.classList.add('show');
        updateShareText();
    });
    
    // Modal close
    modalClose.addEventListener('click', () => {
        shareModal.classList.remove('show');
    });
    
    // Share options
    shareOptions.forEach(option => {
        option.addEventListener('click', () => {
            const platform = option.dataset.platform;
            shareStatistics(platform);
        });
    });
    
    // Toast close
    toastClose.addEventListener('click', () => {
        toast.classList.remove('show');
    });
    
    // Word frequency buttons
    showTopWords.addEventListener('click', () => {
        wordFrequencyMode = 'top10';
        showTopWords.classList.add('active');
        showAllWords.classList.remove('active');
        updateWordFrequency();
    });
    
    showAllWords.addEventListener('click', () => {
        wordFrequencyMode = 'all';
        showTopWords.classList.remove('active');
        showAllWords.classList.add('active');
        updateWordFrequency();
    });
    
    // Reset history
    resetHistoryBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all statistics history?')) {
            statisticsHistory = {
                peakChars: 0,
                peakWords: 0,
                totalTyped: 0,
                typingSessions: 0
            };
            updateHistoryDisplay();
            updateFooterStats();
            saveSettings();
            showToast('Statistics history reset successfully');
        }
    });
    
    // Tab key handling for textarea
    textInput.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = textInput.selectionStart;
            const end = textInput.selectionEnd;
            
            if (e.shiftKey) {
                // Remove indentation
                const lines = textInput.value.substring(0, start).split('\n');
                const currentLine = lines[lines.length - 1];
                
                if (currentLine.startsWith('    ')) {
                    textInput.value = textInput.value.substring(0, start - 4) + 
                                     textInput.value.substring(start);
                    textInput.selectionStart = textInput.selectionEnd = start - 4;
                } else if (currentLine.startsWith('\t')) {
                    textInput.value = textInput.value.substring(0, start - 1) + 
                                     textInput.value.substring(start);
                    textInput.selectionStart = textInput.selectionEnd = start - 1;
                }
            } else {
                // Add indentation
                textInput.value = textInput.value.substring(0, start) + 
                                 '    ' + 
                                 textInput.value.substring(end);
                textInput.selectionStart = textInput.selectionEnd = start + 4;
            }
            
            updateStatistics();
        }
    });
    
    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === shareModal) {
            shareModal.classList.remove('show');
        }
    });
}

// Debounce function implementation
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Show debounce indicator
function showDebounceIndicator() {
    const indicator = document.getElementById('debounceIndicator');
    indicator.style.opacity = '1';
    indicator.style.transform = 'scale(1.02)';
    
    setTimeout(() => {
        indicator.style.opacity = '';
        indicator.style.transform = '';
    }, 300);
}

// Toggle theme
function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    updateThemeButtons(isDark ? 'dark' : 'light');
    saveSettings();
    showToast(`Switched to ${isDark ? 'dark' : 'light'} theme`);
}

// Update all statistics
function updateStatistics() {
    const text = textInput.value;
    
    // Basic counts
    updateBasicCounts(text);
    
    // Advanced statistics
    updateAdvancedStats(text);
    
    // Update charts
    updateCharts(text);
    
    // Update word frequency
    updateWordFrequency(text);
    
    // Update typing session count
    if (text.trim().length > 0 && !typingTimer) {
        typingTimer = setTimeout(() => {
            statisticsHistory.typingSessions++;
            updateHistoryDisplay();
            saveSettings();
            typingTimer = null;
        }, 2000);
    }
}

// Update basic counts
function updateBasicCounts(text) {
    // Character count
    const charCountValue = text.length;
    charCount.textContent = charCountValue.toLocaleString();
    
    // Letter and digit counts
    const letters = text.replace(/[^a-zA-Z]/g, '');
    const digits = text.replace(/[^0-9]/g, '');
    letterCount.textContent = letters.length.toLocaleString();
    digitCount.textContent = digits.length.toLocaleString();
    
    // Word count
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    wordCount.textContent = words.length.toLocaleString();
    
    // Unique words
    const uniqueWords = new Set(words.map(word => word.toLowerCase()));
    uniqueWordCount.textContent = uniqueWords.size.toLocaleString();
    
    // Average word length
    const avgLength = words.length > 0 ? 
        (words.reduce((sum, word) => sum + word.length, 0) / words.length).toFixed(1) : 
        '0';
    avgWordLength.textContent = avgLength;
    
    // Sentence count
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    sentenceCount.textContent = sentences.length.toLocaleString();
    
    // Average sentence length
    const avgSentence = sentences.length > 0 ? 
        (words.length / sentences.length).toFixed(1) : 
        '0';
    avgSentenceLength.textContent = avgSentence;
    
    // Words per sentence
    wordsPerSentence.textContent = avgSentence;
    
    // Paragraph count
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    paragraphCount.textContent = paragraphs.length.toLocaleString();
    
    // Average paragraph length
    const avgParagraph = paragraphs.length > 0 ? 
        (sentences.length / paragraphs.length).toFixed(1) : 
        '0';
    avgParagraphLength.textContent = avgParagraph;
    
    // Sentences per paragraph
    sentencesPerParagraph.textContent = avgParagraph;
}

// Update advanced statistics
function updateAdvancedStats(text) {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    
    // Reading time (average 200 WPM)
    const readingTimeValue = words.length / 200;
    readingTime.textContent = readingTimeValue < 1 ? 
        '< 1 min' : 
        `${Math.ceil(readingTimeValue)} min`;
    
    // Slow reading time (150 WPM)
    const slowReadingTimeValue = words.length / 150;
    slowReadingTime.textContent = slowReadingTimeValue < 1 ? 
        '< 1 min' : 
        `${Math.ceil(slowReadingTimeValue)} min`;
    
    // Fast reading time (250 WPM)
    const fastReadingTimeValue = words.length / 250;
    fastReadingTime.textContent = fastReadingTimeValue < 1 ? 
        '< 1 min' : 
        `${Math.ceil(fastReadingTimeValue)} min`;
    
    // Character distribution
    updateCharacterDistribution(text);
}

// Update character distribution
function updateCharacterDistribution(text) {
    if (text.length === 0) {
        uppercaseBar.style.width = '0%';
        lowercaseBar.style.width = '0%';
        spacesBar.style.width = '0%';
        uppercasePercent.textContent = '0%';
        lowercasePercent.textContent = '0%';
        spacesPercent.textContent = '0%';
        return;
    }
    
    const uppercase = (text.match(/[A-Z]/g) || []).length;
    const lowercase = (text.match(/[a-z]/g) || []).length;
    const spaces = (text.match(/\s/g) || []).length;
    const total = text.length;
    
    const uppercasePercentValue = Math.round((uppercase / total) * 100);
    const lowercasePercentValue = Math.round((lowercase / total) * 100);
    const spacesPercentValue = Math.round((spaces / total) * 100);
    
    uppercaseBar.style.width = `${uppercasePercentValue}%`;
    lowercaseBar.style.width = `${lowercasePercentValue}%`;
    spacesBar.style.width = `${spacesPercentValue}%`;
    
    uppercasePercent.textContent = `${uppercasePercentValue}%`;
    lowercasePercent.textContent = `${lowercasePercentValue}%`;
    spacesPercent.textContent = `${spacesPercentValue}%`;
}

// Update typing statistics
function updateTypingStats() {
    if (!typingStartTime) return;
    
    const timeElapsed = (Date.now() - typingStartTime) / 1000 / 60; // in minutes
    const words = textInput.value.trim().split(/\s+/).filter(word => word.length > 0);
    
    if (timeElapsed > 0) {
        const wpm = Math.round(words.length / timeElapsed);
        const cpm = Math.round(textInput.value.length / timeElapsed);
        
        typingSpeed.textContent = `${wpm} WPM`;
        charsPerMinute.textContent = `${cpm}`;
        
        // Time to type (estimated based on 40 WPM average typing speed)
        const timeToTypeValue = words.length / 40;
        timeToType.textContent = timeToTypeValue < 1 ? 
            '< 1 min' : 
            `${Math.ceil(timeToTypeValue)} min`;
    }
}

// Initialize charts
function initializeCharts() {
    const ctx = document.getElementById('distributionCanvas').getContext('2d');
    
    distributionChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Letters', 'Digits', 'Spaces', 'Punctuation', 'Other'],
            datasets: [{
                data: [0, 0, 0, 0, 0],
                backgroundColor: [
                    'rgba(67, 97, 238, 0.8)',
                    'rgba(114, 9, 183, 0.8)',
                    'rgba(247, 37, 133, 0.8)',
                    'rgba(76, 201, 240, 0.8)',
                    'rgba(248, 150, 30, 0.8)'
                ],
                borderColor: [
                    'rgba(67, 97, 238, 1)',
                    'rgba(114, 9, 183, 1)',
                    'rgba(247, 37, 133, 1)',
                    'rgba(76, 201, 240, 1)',
                    'rgba(248, 150, 30, 1)'
                ],
                borderWidth: 1,
                hoverOffset: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: getComputedStyle(document.body).getPropertyValue('--dark-color'),
                        padding: 20,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true,
                duration: 1000
            }
        }
    });
}

// Update charts with new data
function updateCharts(text) {
    if (!distributionChart) return;
    
    const letters = text.replace(/[^a-zA-Z]/g, '').length;
    const digits = text.replace(/[^0-9]/g, '').length;
    const spaces = text.replace(/[^\s]/g, '').length;
    const punctuation = text.replace(/[^.,!?;:'"()\[\]{}]/g, '').length;
    const other = text.length - letters - digits - spaces - punctuation;
    
    distributionChart.data.datasets[0].data = [letters, digits, spaces, punctuation, other];
    distributionChart.update();
}

// Update word frequency display
function updateWordFrequency(text = textInput.value) {
    const frequencyList = document.getElementById('frequencyList');
    
    if (!text.trim()) {
        frequencyList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-chart-bar"></i>
                <p>Start typing to see word frequency analysis</p>
            </div>
        `;
        return;
    }
    
    const words = text.toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .split(/\s+/)
        .filter(word => word.length > 2);
    
    const frequency = {};
    words.forEach(word => {
        frequency[word] = (frequency[word] || 0) + 1;
    });
    
    const sortedWords = Object.entries(frequency)
        .sort((a, b) => b[1] - a[1]);
    
    let displayWords = sortedWords;
    if (wordFrequencyMode === 'top10') {
        displayWords = sortedWords.slice(0, 10);
    }
    
    frequencyList.innerHTML = '';
    
    if (displayWords.length === 0) {
        frequencyList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-chart-bar"></i>
                <p>No words found for frequency analysis</p>
            </div>
        `;
        return;
    }
    
    const maxFrequency = Math.max(...displayWords.map(([_, count]) => count));
    
    displayWords.forEach(([word, count]) => {
        const percentage = Math.round((count / maxFrequency) * 100);
        
        const item = document.createElement('div');
        item.className = 'frequency-item';
        item.innerHTML = `
            <div class="frequency-word">
                <span class="word">${word}</span>
                <span class="count">${count}</span>
            </div>
            <div class="frequency-bar">
                <div class="bar" style="width: ${percentage}%"></div>
            </div>
        `;
        
        frequencyList.appendChild(item);
    });
}

// Text-to-speech functionality
function speakText() {
    if (isSpeaking) {
        stopSpeaking();
        return;
    }
    
    const text = textInput.value;
    if (!text.trim()) {
        showToast('No text to speak', 'error');
        return;
    }
    
    if ('speechSynthesis' in window) {
        speechSynthesis = new SpeechSynthesisUtterance(text);
        speechSynthesis.rate = 1.0;
        speechSynthesis.pitch = 1.0;
        speechSynthesis.volume = 1.0;
        
        speechSynthesis.onstart = () => {
            isSpeaking = true;
            speakBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
            speakBtn.classList.add('active');
            showToast('Speech started');
        };
        
        speechSynthesis.onend = () => {
            isSpeaking = false;
            speakBtn.innerHTML = '<i class="fas fa-volume-up"></i> Speak';
            speakBtn.classList.remove('active');
        };
        
        speechSynthesis.onerror = () => {
            isSpeaking = false;
            speakBtn.innerHTML = '<i class="fas fa-volume-up"></i> Speak';
            speakBtn.classList.remove('active');
            showToast('Speech synthesis error', 'error');
        };
        
        window.speechSynthesis.speak(speechSynthesis);
    } else {
        showToast('Speech synthesis not supported in your browser', 'error');
    }
}

function stopSpeaking() {
    if (window.speechSynthesis && isSpeaking) {
        window.speechSynthesis.cancel();
        isSpeaking = false;
        speakBtn.innerHTML = '<i class="fas fa-volume-up"></i> Speak';
        speakBtn.classList.remove('active');
        showToast('Speech stopped');
    }
}

// Copy statistics to clipboard
async function copyStatistics() {
    const text = textInput.value;
    const stats = generateStatisticsReport(text);
    
    try {
        await navigator.clipboard.writeText(stats);
        showToast('Statistics copied to clipboard');
    } catch (err) {
        showToast('Failed to copy statistics', 'error');
    }
}

// Download report
function downloadReport() {
    const text = textInput.value;
    const stats = generateStatisticsReport(text);
    
    const blob = new Blob([stats], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    
    a.href = url;
    a.download = `character-counter-report-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('Report downloaded successfully');
}

// Generate statistics report
function generateStatisticsReport(text) {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    
    const letters = text.replace(/[^a-zA-Z]/g, '').length;
    const digits = text.replace(/[^0-9]/g, '').length;
    const uppercase = (text.match(/[A-Z]/g) || []).length;
    const lowercase = (text.match(/[a-z]/g) || []).length;
    const spaces = (text.match(/\s/g) || []).length;
    const punctuation = text.replace(/[^.,!?;:'"()\[\]{}]/g, '').length;
    
    const uniqueWords = new Set(words.map(word => word.toLowerCase()));
    const avgWordLength = words.length > 0 ? 
        (words.reduce((sum, word) => sum + word.length, 0) / words.length).toFixed(2) : 
        '0';
    const avgSentenceLength = sentences.length > 0 ? 
        (words.length / sentences.length).toFixed(2) : 
        '0';
    const avgParagraphLength = paragraphs.length > 0 ? 
        (sentences.length / paragraphs.length).toFixed(2) : 
        '0';
    
    const readingTime = words.length / 200;
    const timeToType = words.length / 40;
    
    return `CHARACTER COUNTER REPORT
===========================
Generated: ${new Date().toLocaleString()}
Debounce Delay: ${debounceDelay}ms

TEXT STATISTICS
---------------
Characters: ${text.length}
Letters: ${letters}
Digits: ${digits}
Uppercase: ${uppercase}
Lowercase: ${lowercase}
Spaces: ${spaces}
Punctuation: ${punctuation}

Words: ${words.length}
Unique Words: ${uniqueWords.size}
Average Word Length: ${avgWordLength} characters

Sentences: ${sentences.length}
Average Sentence Length: ${avgSentenceLength} words

Paragraphs: ${paragraphs.length}
Average Paragraph Length: ${avgParagraphLength} sentences

READING & TYPING
----------------
Reading Time (200 WPM): ${readingTime < 1 ? '< 1 minute' : `${Math.ceil(readingTime)} minutes`}
Estimated Typing Time (40 WPM): ${timeToType < 1 ? '< 1 minute' : `${Math.ceil(timeToType)} minutes`}

CHARACTER DISTRIBUTION
----------------------
Letters: ${Math.round((letters / text.length) * 100)}%
Digits: ${Math.round((digits / text.length) * 100)}%
Spaces: ${Math.round((spaces / text.length) * 100)}%
Punctuation: ${Math.round((punctuation / text.length) * 100)}%
Other: ${Math.round(((text.length - letters - digits - spaces - punctuation) / text.length) * 100)}%

TEXT CONTENT
------------
${text}

---
Report generated by CharCounter
https://charcounter.example.com
`;
}

// Update share text
function updateShareText() {
    const text = textInput.value;
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const chars = text.length;
    
    const shareText = `I just analyzed my text with CharCounter!

📊 Statistics:
• Characters: ${chars}
• Words: ${words.length}
• Sentences: ${text.split(/[.!?]+/).filter(s => s.trim().length > 0).length}
• Reading Time: ${Math.ceil(words.length / 200)} minutes

Try it yourself: https://charcounter.example.com`;
    
    document.getElementById('shareText').value = shareText;
}

// Share statistics
function shareStatistics(platform) {
    const shareText = document.getElementById('shareText').value;
    
    switch (platform) {
        case 'twitter':
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank');
            break;
        case 'facebook':
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://charcounter.example.com')}&quote=${encodeURIComponent(shareText)}`, '_blank');
            break;
        case 'linkedin':
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://charcounter.example.com')}&summary=${encodeURIComponent(shareText)}`, '_blank');
            break;
        case 'copy':
            navigator.clipboard.writeText(shareText)
                .then(() => showToast('Share text copied to clipboard'))
                .catch(() => showToast('Failed to copy share text', 'error'));
            break;
    }
    
    shareModal.classList.remove('show');
}

// Show toast notification
function showToast(message, type = 'success') {
    const toastContent = toast.querySelector('.toast-content');
    
    if (type === 'error') {
        toast.style.borderLeftColor = 'var(--danger-color)';
        toastContent.querySelector('i').className = 'fas fa-exclamation-circle';
        toastContent.querySelector('i').style.color = 'var(--danger-color)';
    } else {
        toast.style.borderLeftColor = 'var(--success-color)';
        toastContent.querySelector('i').className = 'fas fa-check-circle';
        toastContent.querySelector('i').style.color = 'var(--success-color)';
    }
    
    toastContent.querySelector('.toast-message').textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Add CSS for frequency items
const style = document.createElement('style');
style.textContent = `
.frequency-item {
    margin-bottom: 15px;
    padding: 10px;
    background-color: var(--light-gray);
    border-radius: var(--border-radius-sm);
}

.frequency-word {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}

.frequency-word .word {
    font-weight: 600;
    color: var(--dark-color);
}

.frequency-word .count {
    font-weight: 700;
    color: var(--primary-color);
    background-color: var(--white);
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 0.85rem;
}

.frequency-bar {
    height: 6px;
    background-color: var(--white);
    border-radius: 3px;
    overflow: hidden;
}

.frequency-bar .bar {
    height: 100%;
    background: linear-gradient(90deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    border-radius: 3px;
    transition: width 0.5s ease;
}
`;
document.head.appendChild(style);