let vocabulary = {};
let currentCategory = '';
let currentWords = [];
let currentIndex = 0;
let allWords = [];

// DOM Elements
const categorySelect = document.getElementById('categorySelect');
const searchInput = document.getElementById('searchInput');
const wordCard = document.getElementById('wordCard');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const wordCounter = document.getElementById('wordCounter');

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
    // Try browser's built-in TTS (works for Arabic in most modern browsers)
    if ('speechSynthesis' in window) {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(arabicText);
        utterance.lang = 'ar-SA'; // Arabic (Saudi Arabia)
        utterance.rate = 0.8; // Slightly slower for learning
        utterance.pitch = 1;
        
        // Try to find an Arabic voice
        const voices = window.speechSynthesis.getVoices();
        const arabicVoice = voices.find(voice => voice.lang.startsWith('ar'));
        if (arabicVoice) {
            utterance.voice = arabicVoice;
        }
        
        window.speechSynthesis.speak(utterance);
    } else {
        alert('К сожалению, ваш браузер не поддерживает озвучивание');
    }
}

// Load voices when they're ready (for some browsers)
if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
    };
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