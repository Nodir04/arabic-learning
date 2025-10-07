let vocabulary = {};
let currentCategory = '';
let currentWords = [];
let currentIndex = 0;
let allWords = [];
let voices = [];

// DOM Elements
const categorySelect = document.getElementById('categorySelect');
const searchInput = document.getElementById('searchInput');
const wordCard = document.getElementById('wordCard');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const wordCounter = document.getElementById('wordCounter');

// Load voices when they're ready
function loadVoices() {
    voices = window.speechSynthesis.getVoices();
    console.log('Available voices:', voices.length);
    voices.forEach(voice => {
        if (voice.lang.startsWith('ar')) {
            console.log('Arabic voice found:', voice.name, voice.lang);
        }
    });
}

// Load voices immediately and on voices changed event
if ('speechSynthesis' in window) {
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
}

// Load vocabulary from JSON
async function loadVocabulary() {
    try {
        const response = await fetch('vocabulary.json');
        vocabulary = await response.json();
        
        // Populate category dropdown
        populateCategories();
        
        // Set default category (first one)
        const firstCategory = Object.keys(vocabulary)[0];
        categorySelect.value = firstCategory;
        loadCategory(firstCategory);
        
        // Flatten all words for search
        allWords = [];
        Object.keys(vocabulary).forEach(category => {
            vocabulary[category].forEach(word => {
                allWords.push({ ...word, category });
            });
        });
        
    } catch (error) {
        wordCard.innerHTML = '<div class="no-results">Ошибка загрузки словаря</div>';
        console.error('Error loading vocabulary:', error);
    }
}

// Populate category dropdown
function populateCategories() {
    categorySelect.innerHTML = '';
    Object.keys(vocabulary).forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

// Load words from selected category
function loadCategory(category) {
    currentCategory = category;
    currentWords = vocabulary[category];
    currentIndex = 0;
    searchInput.value = '';
    displayWord();
}

// Display current word
function displayWord() {
    if (currentWords.length === 0) {
        wordCard.innerHTML = '<div class="no-results">Слова не найдены</div>';
        updateNavigation();
        return;
    }

    const word = currentWords[currentIndex];
    
    wordCard.innerHTML = `
        <div class="word-content">
            <div class="arabic-word">${word.arabic}</div>
            <div class="phonetic">${word.phonetic}</div>
            <div class="russian">${word.russian}</div>
            <button class="pronounce-btn" onclick="pronounceWord('${word.arabic.replace(/'/g, "\\'")}')">
                🔊 Произнести
            </button>
        </div>
    `;
    
    updateNavigation();
}

// Text-to-Speech function
async function pronounceWord(arabicText) {
    if (!('speechSynthesis' in window)) {
        alert('К сожалению, ваш браузер не поддерживает озвучивание');
        return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Small delay to ensure cancel completes
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const utterance = new SpeechSynthesisUtterance(arabicText);
    utterance.lang = 'ar-SA'; // Arabic (Saudi Arabia)
    utterance.rate = 0.75; // Slower for learning
    utterance.pitch = 1;
    utterance.volume = 1;
    
    // Try to find an Arabic voice
    const arabicVoice = voices.find(voice => voice.lang.startsWith('ar'));
    if (arabicVoice) {
        utterance.voice = arabicVoice;
        console.log('Using voice:', arabicVoice.name);
    } else {
        console.log('No Arabic voice found, using default');
    }
    
    // Add event listeners for debugging
    utterance.onstart = () => console.log('Speech started');
    utterance.onend = () => console.log('Speech ended');
    utterance.onerror = (e) => console.error('Speech error:', e);
    
    window.speechSynthesis.speak(utterance);
}

// Update navigation buttons and counter
function updateNavigation() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= currentWords.length - 1;
    wordCounter.textContent = currentWords.length > 0 
        ? `${currentIndex + 1} / ${currentWords.length}`
        : '0 / 0';
}

// Search functionality
function searchWords(query) {
    if (!query.trim()) {
        loadCategory(currentCategory);
        return;
    }

    const searchTerm = query.toLowerCase().trim();
    currentWords = allWords.filter(word => 
        word.russian.toLowerCase().includes(searchTerm)
    );
    currentIndex = 0;
    displayWord();
}

// Event Listeners
categorySelect.addEventListener('change', (e) => {
    loadCategory(e.target.value);
});

searchInput.addEventListener('input', (e) => {
    searchWords(e.target.value);
});

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        displayWord();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentIndex < currentWords.length - 1) {
        currentIndex++;
        displayWord();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && !prevBtn.disabled) {
        currentIndex--;
        displayWord();
    } else if (e.key === 'ArrowRight' && !nextBtn.disabled) {
        currentIndex++;
        displayWord();
    } else if (e.key === ' ' && currentWords.length > 0) {
        e.preventDefault();
        const word = currentWords[currentIndex];
        pronounceWord(word.arabic);
    }
});

// Initialize app
loadVocabulary();
