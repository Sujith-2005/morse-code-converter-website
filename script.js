// Morse Code Dictionary
const morseCode = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..',
    '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
    '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
    '.': '.-.-.-', ',': '--..--', '?': '..--..', '!': '-.-.--', '@': '.--.-.',
    ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-',
    '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...', '$': '...-..-',
    ' ': ' '
};

// Reverse dictionary for Morse to text conversion
const reverseMorseCode = {};
for (let key in morseCode) {
    reverseMorseCode[morseCode[key]] = key;
}

// DOM Elements
const textInput = document.getElementById('textInput');
const morseInput = document.getElementById('morseInput');
const textToMorseBtn = document.getElementById('textToMorse');
const morseToTextBtn = document.getElementById('morseToText');
const morseOutput = document.getElementById('morseOutput');
const textOutput = document.getElementById('textOutput');
const copyMorseBtn = document.getElementById('copyMorse');
const copyTextBtn = document.getElementById('copyText');
const playMorseBtn = document.getElementById('playMorse');
const showReferenceBtn = document.getElementById('showReference');
const showHistoryBtn = document.getElementById('showHistory');
const referenceModal = document.getElementById('referenceModal');
const historyModal = document.getElementById('historyModal');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistory');

// Audio context for Morse code playback
let audioContext;
let oscillator;
let gainNode;
let isPlaying = false;
let currentMorseCode = '';

// History array
let conversionHistory = JSON.parse(localStorage.getItem('morseHistory')) || [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeAudio();
    setupEventListeners();
    updateHistoryDisplay();
});

// Initialize Web Audio API
function initializeAudio() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        oscillator = audioContext.createOscillator();
        gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.type = 'sine';
    } catch (error) {
        console.log('Web Audio API not supported');
        playMorseBtn.disabled = true;
        playMorseBtn.innerHTML = '<i class="fas fa-volume-mute"></i> Audio Not Supported';
    }
}

// Setup event listeners
function setupEventListeners() {
    // Conversion buttons
    textToMorseBtn.addEventListener('click', convertTextToMorse);
    morseToTextBtn.addEventListener('click', convertMorseToText);
    
    // Copy buttons
    copyMorseBtn.addEventListener('click', () => copyToClipboard(morseOutput.textContent));
    copyTextBtn.addEventListener('click', () => copyToClipboard(textOutput.textContent));
    
    // Play button
    playMorseBtn.addEventListener('click', toggleMorsePlayback);
    
    // Modal buttons
    showReferenceBtn.addEventListener('click', () => showModal(referenceModal));
    showHistoryBtn.addEventListener('click', () => showModal(historyModal));
    clearHistoryBtn.addEventListener('click', clearHistory);
    
    // Modal close buttons
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', closeAllModals);
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            closeAllModals();
        }
    });
    
    // Enter key support
    textInput.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            convertTextToMorse();
        }
    });
    
    morseInput.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            convertMorseToText();
        }
    });
}

// Convert text to Morse code
function convertTextToMorse() {
    const text = textInput.value.trim().toUpperCase();
    
    if (!text) {
        showNotification('Please enter some text to convert', 'error');
        return;
    }
    
    let morseResult = '';
    let isValid = true;
    
    for (let char of text) {
        if (morseCode[char] !== undefined) {
            morseResult += morseCode[char] + ' ';
        } else if (char === ' ') {
            morseResult += '/ ';
        } else {
            isValid = false;
            morseResult += '? ';
        }
    }
    
    morseResult = morseResult.trim();
    
    // Update output
    morseOutput.innerHTML = morseResult;
    morseOutput.classList.add('has-content');
    copyMorseBtn.style.display = 'flex';
    
    // Enable play button if valid
    if (isValid && audioContext) {
        currentMorseCode = morseResult;
        playMorseBtn.disabled = false;
        playMorseBtn.innerHTML = '<i class="fas fa-play"></i> Play Morse Code';
    }
    
    // Add to history
    addToHistory('Text to Morse', text, morseResult);
    
    showNotification('Text converted to Morse code successfully!', 'success');
}

// Convert Morse code to text
function convertMorseToText() {
    const morse = morseInput.value.trim();
    
    if (!morse) {
        showNotification('Please enter Morse code to convert', 'error');
        return;
    }
    
    const morseWords = morse.split('/');
    let textResult = '';
    let isValid = true;
    
    for (let word of morseWords) {
        const morseChars = word.trim().split(' ');
        let wordResult = '';
        
        for (let morseChar of morseChars) {
            if (morseChar === '') continue;
            
            if (reverseMorseCode[morseChar] !== undefined) {
                wordResult += reverseMorseCode[morseChar];
            } else {
                isValid = false;
                wordResult += '?';
            }
        }
        
        textResult += wordResult + ' ';
    }
    
    textResult = textResult.trim();
    
    // Update output
    textOutput.innerHTML = textResult;
    textOutput.classList.add('has-content');
    copyTextBtn.style.display = 'flex';
    
    // Add to history
    addToHistory('Morse to Text', morse, textResult);
    
    showNotification('Morse code converted to text successfully!', 'success');
}

// Play Morse code audio
function toggleMorsePlayback() {
    if (!audioContext || !currentMorseCode) return;
    
    if (isPlaying) {
        stopMorsePlayback();
    } else {
        startMorsePlayback();
    }
}

function startMorsePlayback() {
    if (!audioContext || isPlaying) return;
    
    isPlaying = true;
    playMorseBtn.innerHTML = '<i class="fas fa-stop"></i> Stop';
    
    const dotDuration = 0.1; // seconds
    const dashDuration = 0.3;
    const elementGap = 0.1;
    const letterGap = 0.3;
    const wordGap = 0.7;
    
    let currentTime = audioContext.currentTime;
    
    oscillator.start();
    
    for (let char of currentMorseCode) {
        if (char === '.') {
            playTone(currentTime, dotDuration);
            currentTime += dotDuration + elementGap;
        } else if (char === '-') {
            playTone(currentTime, dashDuration);
            currentTime += dashDuration + elementGap;
        } else if (char === ' ') {
            currentTime += letterGap;
        } else if (char === '/') {
            currentTime += wordGap;
        }
    }
    
    // Stop after playing
    setTimeout(() => {
        stopMorsePlayback();
    }, (currentTime - audioContext.currentTime) * 1000);
}

function playTone(startTime, duration) {
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, startTime + duration);
}

function stopMorsePlayback() {
    if (!isPlaying) return;
    
    isPlaying = false;
    playMorseBtn.innerHTML = '<i class="fas fa-play"></i> Play Morse Code';
    
    if (oscillator) {
        oscillator.stop();
        oscillator = audioContext.createOscillator();
        oscillator.connect(gainNode);
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.type = 'sine';
    }
}

// Copy to clipboard
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showNotification('Copied to clipboard!', 'success');
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Copied to clipboard!', 'success');
    }
}

// Modal functions
function showModal(modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
}

// History functions
function addToHistory(type, input, output) {
    const historyItem = {
        id: Date.now(),
        type: type,
        input: input,
        output: output,
        timestamp: new Date().toLocaleString()
    };
    
    conversionHistory.unshift(historyItem);
    
    // Keep only last 50 items
    if (conversionHistory.length > 50) {
        conversionHistory = conversionHistory.slice(0, 50);
    }
    
    localStorage.setItem('morseHistory', JSON.stringify(conversionHistory));
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    if (conversionHistory.length === 0) {
        historyList.innerHTML = '<div class="no-history">No conversion history yet</div>';
        return;
    }
    
    historyList.innerHTML = conversionHistory.map(item => `
        <div class="history-item">
            <div class="timestamp">${item.timestamp} - ${item.type}</div>
            <div class="conversion"><strong>Input:</strong> ${item.input}</div>
            <div class="conversion"><strong>Output:</strong> ${item.output}</div>
        </div>
    `).join('');
}

function clearHistory() {
    conversionHistory = [];
    localStorage.removeItem('morseHistory');
    updateHistoryDisplay();
    showNotification('History cleared!', 'success');
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#667eea'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-family: 'Inter', sans-serif;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        default: return 'fa-info-circle';
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter for text to morse
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        if (document.activeElement === textInput) {
            e.preventDefault();
            convertTextToMorse();
        } else if (document.activeElement === morseInput) {
            e.preventDefault();
            convertMorseToText();
        }
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        closeAllModals();
    }
});

// Auto-resize textareas
function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

textInput.addEventListener('input', () => autoResize(textInput));
morseInput.addEventListener('input', () => autoResize(morseInput));

// Clear outputs when inputs change
textInput.addEventListener('input', () => {
    if (textInput.value.trim() === '') {
        morseOutput.innerHTML = '<span class="placeholder">Morse code will appear here...</span>';
        morseOutput.classList.remove('has-content');
        copyMorseBtn.style.display = 'none';
        playMorseBtn.disabled = true;
    }
});

morseInput.addEventListener('input', () => {
    if (morseInput.value.trim() === '') {
        textOutput.innerHTML = '<span class="placeholder">Text will appear here...</span>';
        textOutput.classList.remove('has-content');
        copyTextBtn.style.display = 'none';
    }
});

// Add some helpful tips
function showTips() {
    const tips = [
        'Use Ctrl+Enter to quickly convert text to Morse code',
        'Use Ctrl+Enter to quickly convert Morse code to text',
        'Press Escape to close any open modals',
        'Morse code uses dots (.) and dashes (-)',
        'Use spaces to separate letters and / to separate words',
        'You can listen to your Morse code with the play button'
    ];
    
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    showNotification(randomTip, 'info');
}

// Show a tip every 30 seconds
setInterval(showTips, 30000);

// Initialize with a welcome message
setTimeout(() => {
    showNotification('Welcome to Morse Code Converter! Try typing some text and converting it.', 'info');
}, 1000); 