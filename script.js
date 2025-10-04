// Vocabulary will be loaded from words.json
let vocabulary = {};
let currentCategory = "all";
let currentWords = [];
let currentIndex = 0;
let filteredWords = [];

// Elements
const arabicEl = document.getElementById('arabic');
const phoneticEl = document.getElementById('phonetic');
const russianEl = document.getElementById('russian');
const imageEl = document.getElementById('image');
const categoryBadgeEl = document.getElementById('categoryBadge');
const currentEl = document.getElementById('current');
const totalEl = document.getElementById('total');
const playBtn = document.getElementById('playAudio');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const searchBox = document.getElementById('searchBox');
const categorySelect = document.getElementById('categorySelect');
const cardContainer = document.getElementById('cardContainer');

// Load vocabulary from JSON file
async function loadVocabulary() {
    try {
        const response = await fetch('words.json');
        if (!response.ok) {
            throw new Error('Failed to load vocabulary file');
        }
        vocabulary = await response.json();
        init();
    } catch (error) {
        console.error('Error loading vocabulary:', error);
        cardContainer.innerHTML = '<div class="no-results">❌ Ошибка загрузки словаря<br>Проверьте файл words.json</div>';
    }
}

// Initialize
function init() {
    // Populate category dropdown
    Object.keys(vocabulary).forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });

    loadAllWords();
    updateCard();
}

function loadAllWords() {
    currentWords = [];
    Object.keys(vocabulary).forEach(category => {
        vocabulary[category].forEach(word => {
            currentWords.push({ ...word, category });
        });
    });
    filteredWords = [...currentWords];
}

function filterByCategory(category) {
    currentCategory = category;
    if (category === "all") {
        loadAllWords();
    } else {
        currentWords = vocabulary[category].map(word => ({ ...word, category }));
        filteredWords = [...currentWords];
    }
    currentIndex = 0;
    filterBySearch(searchBox.value);
}

function filterBySearch(query) {
    query = query.toLowerCase().trim();
    if (!query) {
        filteredWords = [...currentWords];
    } else {
        filteredWords = currentWords.filter(word => 
            word.russian.toLowerCase().includes(query)
        );
    }
    
    currentIndex = 0;
    if (filteredWords.length === 0) {
        showNoResults();
    } else {
        updateCard();
    }
}

function showNoResults() {
    cardContainer.innerHTML = '<div class="no-results">😔 Слово не найдено<br>Попробуйте другой запрос</div>';
}

function updateCard() {
    if (filteredWords.length === 0) {
        showNoResults();
        return;
    }

    // Restore card if it was replaced by no-results message
    if (cardContainer.querySelector('.no-results')) {
        cardContainer.innerHTML = `
            <div class="card">
                <div class="category-badge" id="categoryBadge"></div>
                <div class="arabic-word" id="arabic"></div>
                <div class="phonetic" id="phonetic"></div>
                <div class="image-container">
                    <img class="word-image" id="image" src="" alt="">
                </div>
                <div class="russian-word" id="russian"></div>
                <button class="audio-button" id="playAudio">🔊 Слушать</button>
            </div>
            <div class="navigation">
                <button class="nav-button" id="prevBtn">← Назад</button>
                <button class="nav-button" id="nextBtn">Вперёд →</button>
            </div>
        `;
        
        // Re-attach event listeners
        document.getElementById('playAudio').addEventListener('click', playAudio);
        document.getElementById('prevBtn').addEventListener('click', prevWord);
        document.getElementById('nextBtn').addEventListener('click', nextWord);
    }

    const word = filteredWords[currentIndex];
    document.getElementById('arabic').textContent = word.arabic;
    document.getElementById('phonetic').textContent = word.phonetic;
    document.getElementById('russian').textContent = word.russian;
    document.getElementById('image').src = word.image;
    document.getElementById('image').alt = word.russian;
    document.getElementById('categoryBadge').textContent = word.category;
    currentEl.textContent = currentIndex + 1;
    totalEl.textContent = filteredWords.length;

    // Update button states
    document.getElementById('prevBtn').disabled = currentIndex === 0;
    document.getElementById('nextBtn').disabled = currentIndex === filteredWords.length - 1;
}

async function playAudio() {
    if (filteredWords.length === 0) return;
    
    const word = filteredWords[currentIndex];
    const button = document.getElementById('playAudio');
    
    // Disable button while loading
    button.disabled = true;
    button.textContent = '⏳ Загрузка...';
    
    try {
        // Use Hugging Face Inference API for Facebook MMS TTS
        const response = await fetch(
            "https://api-inference.huggingface.co/models/facebook/mms-tts-ara",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    inputs: word.arabic
                })
            }
        );

        if (!response.ok) {
            throw new Error('TTS service unavailable');
        }

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        
        audio.onended = () => {
            URL.revokeObjectURL(audioUrl);
            button.disabled = false;
            button.textContent = '🔊 Слушать';
        };
        
        audio.onerror = () => {
            throw new Error('Audio playback failed');
        };
        
        await audio.play();
        
    } catch (error) {
        console.error('TTS Error:', error);
        // Fallback to browser TTS
        const utterance = new SpeechSynthesisUtterance(word.arabic);
        utterance.lang = 'ar-SA';
        utterance.rate = 0.75;
        utterance.pitch = 1.0;
        
        utterance.onend = () => {
            button.disabled = false;
            button.textContent = '🔊 Слушать';
        };
        
        speechSynthesis.speak(utterance);
    }
}

function prevWord() {
    if (currentIndex > 0) {
        currentIndex--;
        updateCard();
    }
}

function nextWord() {
    if (currentIndex < filteredWords.length - 1) {
        currentIndex++;
        updateCard();
    }
}

// Event listeners
playBtn.addEventListener('click', playAudio);
prevBtn.addEventListener('click', prevWord);
nextBtn.addEventListener('click', nextWord);

searchBox.addEventListener('input', (e) => {
    filterBySearch(e.target.value);
});

categorySelect.addEventListener('change', (e) => {
    filterByCategory(e.target.value);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.target === searchBox) return;
    
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
        currentIndex--;
        updateCard();
    } else if (e.key === 'ArrowRight' && currentIndex < filteredWords.length - 1) {
        currentIndex++;
        updateCard();
    } else if (e.key === ' ') {
        e.preventDefault();
        playAudio();
    }
});

// Load vocabulary on page load
loadVocabulary();