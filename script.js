const testTexts = [
    "The quick brown fox jumps over the lazy dog.",
    "To be or not to be, that is the question.",
    "All that glitters is not gold.",
    "A journey of a thousand miles begins with a single step.",
    "Practice makes perfect, but nobody's perfect, so why practice?"
];

const textDisplay = document.querySelector('.text-display');
const inputArea = document.querySelector('.input-area');
const timer = document.querySelector('.timer');
const results = document.querySelector('.results');
const restartBtn = document.querySelector('.restart-btn');
const customTextInput = document.querySelector('.custom-text-input');
const setTextBtn = document.querySelector('.set-text-btn');

let currentText = '';
let timeStarted = false;
let startTime;
let timerInterval;

// Initialize the test
function initTest() {
    currentText = testTexts[Math.floor(Math.random() * testTexts.length)];
    textDisplay.textContent = currentText;
    inputArea.value = '';
    results.textContent = '';
    timeStarted = false;
    timer.textContent = '00:00:000';
    inputArea.disabled = false;
    clearInterval(timerInterval);
    customTextInput.value = '';
}

// Start the timer
function startTimer() {
    startTime = new Date();
    timerInterval = setInterval(updateTimer, 10);
}

// Update the timer display
function updateTimer() {
    const currentTime = new Date();
    const timeElapsed = currentTime - startTime;
    const minutes = Math.floor(timeElapsed / 60000);
    const seconds = Math.floor((timeElapsed % 60000) / 1000);
    const milliseconds = timeElapsed % 1000;
    timer.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(3, '0')}`;
}

// Calculate typing speed and accuracy
function calculateResults() {
    const endTime = new Date();
    const timeElapsed = (endTime - startTime) / 1000; // Convert to seconds
    const wordsTyped = inputArea.value.trim().split(/\s+/).length;
    const wpm = Math.round((wordsTyped / timeElapsed) * 60);
    const accuracy = calculateAccuracy(currentText.trim(), inputArea.value.trim());
    
    return {
        wpm,
        accuracy
    };
}

// Calculate accuracy percentage
function calculateAccuracy(original, typed) {
    if (typed.length === 0) return 0;
    
    let correct = 0;
    const originalWords = original.split(' ');
    const typedWords = typed.split(' ');
    
    typedWords.forEach((word, i) => {
        if (word === originalWords[i]) correct++;
    });
    
    return Math.round((correct / originalWords.length) * 100);
}

// Set custom text
function setCustomText() {
    const customText = customTextInput.value.trim();
    if (customText) {
        currentText = customText;
        textDisplay.textContent = currentText;
        inputArea.value = '';
        results.textContent = '';
        timeStarted = false;
        timer.textContent = '00:00:000';
        inputArea.disabled = false;
        clearInterval(timerInterval);
    }
}

// Event listeners
inputArea.addEventListener('input', () => {
    if (!timeStarted && inputArea.value.length === 1) {
        timeStarted = true;
        startTimer();
    }
    
    // Trim both strings to handle any extra spaces
    const inputText = inputArea.value.trim();
    const targetText = currentText.trim();
    
    if (inputText === targetText) {
        clearInterval(timerInterval);
        inputArea.disabled = true;
        const { wpm, accuracy } = calculateResults();
        results.textContent = `Speed: ${wpm} WPM | Accuracy: ${accuracy}%`;
    }
});

restartBtn.addEventListener('click', initTest);
setTextBtn.addEventListener('click', setCustomText);

// Initialize the test when the page loads
initTest();
