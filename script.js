let vocabulary = {};
let currentCategory = "all";
let currentWords = [];
let filteredWords = [];
let currentIndex = 0;

// Elements
const searchBox = document.getElementById('searchBox');
const categorySelect = document.getElementById('categorySelect');
const cardContainer = document.getElementById('cardContainer');
const currentEl = document.getElementById('current');
const totalEl = document.getElementById('total');

// Load vocabulary.json
fetch('words.json')
  .then(response => response.json())
  .then(data => {
    vocabulary = data;
    init();
  })
  .catch(error => console.error('Error loading vocabulary:', error));

// Initialize UI
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

    // Restore card structure if replaced by "no-results"
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

    document.getElementById('prevBtn').disabled = currentIndex === 0;
    document.getElementById('nextBtn').disabled = currentIndex === filteredWords.length - 1;
}

// 🔊 Arabic TTS (MMS → fallback to browser)
async function playAudio() {
    if (filteredWords.length === 0) return;

    const word = filteredWords[currentIndex];
    const button = document.getElementById('playAudio');
    button.disabled = true;
    button.textContent = '⏳ Загрузка...';

    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/facebook/mms-tts-ara",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
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
        // ✅ Browser fallback
        const utterance = new SpeechSynthesisUtterance(word.arabic);
        utterance.lang = 'ar-SA';
        utterance.rate = 0.8;
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
searchBox.addEventListener('input', (e) => {
    filterBySearch(e.target.value);
});

categorySelect.addEventListener('change', (e) => {
    filterByCategory(e.target.value);
});

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
