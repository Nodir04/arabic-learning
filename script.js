// Comprehensive vocabulary organized by categories
const vocabulary = {
    "Фрукты": [
        { arabic: "تُفَّاحَة", phonetic: "tuffāḥa", russian: "яблоко", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400" },
        { arabic: "مَوْز", phonetic: "mawz", russian: "банан", image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400" },
        { arabic: "بُرْتُقَال", phonetic: "burtuqāl", russian: "апельсин", image: "https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?w=400" },
        { arabic: "عِنَب", phonetic: "ʿinab", russian: "виноград", image: "https://images.unsplash.com/photo-1599819177831-0d6bc36d6c95?w=400" },
        { arabic: "فَرَاوْلَة", phonetic: "farāwla", russian: "клубника", image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400" },
        { arabic: "بَطِّيخ", phonetic: "baṭṭīkh", russian: "арбуз", image: "https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?w=400" },
        { arabic: "لَيْمُون", phonetic: "laymūn", russian: "лимон", image: "https://images.unsplash.com/photo-1590502593747-42a996133562?w=400" },
        { arabic: "كُمَّثْرَى", phonetic: "kummthrā", russian: "груша", image: "https://images.unsplash.com/photo-1568031813264-d394c5d474b9?w=400" }
    ],
    "Овощи": [
        { arabic: "طَمَاطِم", phonetic: "ṭamāṭim", russian: "помидор", image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400" },
        { arabic: "خِيَار", phonetic: "khiyār", russian: "огурец", image: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=400" },
        { arabic: "بَطَاطِس", phonetic: "baṭāṭis", russian: "картофель", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400" },
        { arabic: "جَزَر", phonetic: "jazar", russian: "морковь", image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400" },
        { arabic: "بَصَل", phonetic: "baṣal", russian: "лук", image: "https://images.unsplash.com/photo-1587486937936-dfa2d8c96ab1?w=400" },
        { arabic: "ثُوم", phonetic: "thūm", russian: "чеснок", image: "https://images.unsplash.com/photo-1588697655023-cf3f3e8decf3?w=400" },
        { arabic: "خَسّ", phonetic: "khass", russian: "салат", image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400" }
    ],
    "Части тела": [
        { arabic: "رَأْس", phonetic: "raʾs", russian: "голова", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400" },
        { arabic: "عَيْن", phonetic: "ʿayn", russian: "глаз", image: "https://images.unsplash.com/photo-1585241936704-2bedec734824?w=400" },
        { arabic: "أُذُن", phonetic: "ʾudhun", russian: "ухо", image: "https://images.unsplash.com/photo-1614436163996-25cee5f54290?w=400" },
        { arabic: "أَنْف", phonetic: "ʾanf", russian: "нос", image: "https://images.unsplash.com/photo-1599931955105-b7a5e9d04c38?w=400" },
        { arabic: "فَم", phonetic: "fam", russian: "рот", image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400" },
        { arabic: "يَد", phonetic: "yad", russian: "рука", image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=400" },
        { arabic: "رِجْل", phonetic: "rijl", russian: "нога", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400" },
        { arabic: "قَلْب", phonetic: "qalb", russian: "сердце", image: "https://images.unsplash.com/photo-1594747850057-e0b6b41c4f49?w=400" }
    ],
    "Животные": [
        { arabic: "قِطَّة", phonetic: "qiṭṭa", russian: "кошка", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400" },
        { arabic: "كَلْب", phonetic: "kalb", russian: "собака", image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400" },
        { arabic: "حِصَان", phonetic: "ḥiṣān", russian: "лошадь", image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400" },
        { arabic: "بَقَرَة", phonetic: "baqara", russian: "корова", image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400" },
        { arabic: "طَائِر", phonetic: "ṭāʾir", russian: "птица", image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400" },
        { arabic: "سَمَكَة", phonetic: "samaka", russian: "рыба", image: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=400" },
        { arabic: "أَرْنَب", phonetic: "ʾarnab", russian: "кролик", image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400" },
        { arabic: "فَأْر", phonetic: "faʾr", russian: "мышь", image: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400" }
    ],
    "Дом и мебель": [
        { arabic: "بَيْت", phonetic: "bayt", russian: "дом", image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400" },
        { arabic: "بَاب", phonetic: "bāb", russian: "дверь", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400" },
        { arabic: "نَافِذَة", phonetic: "nāfidha", russian: "окно", image: "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=400" },
        { arabic: "كُرْسِيّ", phonetic: "kursiyy", russian: "стул", image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400" },
        { arabic: "طَاوِلَة", phonetic: "ṭāwila", russian: "стол", image: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=400" },
        { arabic: "سَرِير", phonetic: "sarīr", russian: "кровать", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400" },
        { arabic: "مِصْبَاح", phonetic: "miṣbāḥ", russian: "лампа", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400" },
        { arabic: "سَجَّادَة", phonetic: "sajjāda", russian: "ковёр", image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=400" }
    ],
    "Еда и напитки": [
        { arabic: "خُبْز", phonetic: "khubz", russian: "хлеб", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400" },
        { arabic: "أَرُزّ", phonetic: "ʾaruzz", russian: "рис", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400" },
        { arabic: "لَحْم", phonetic: "laḥm", russian: "мясо", image: "https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=400" },
        { arabic: "جُبْن", phonetic: "jubn", russian: "сыр", image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400" },
        { arabic: "بَيْض", phonetic: "bayḍ", russian: "яйцо", image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400" },
        { arabic: "مَاء", phonetic: "māʾ", russian: "вода", image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400" },
        { arabic: "حَلِيب", phonetic: "ḥalīb", russian: "молоко", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400" },
        { arabic: "شَاي", phonetic: "shāy", russian: "чай", image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400" },
        { arabic: "قَهْوَة", phonetic: "qahwa", russian: "кофе", image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400" }
    ],
    "Школа": [
        { arabic: "كِتَاب", phonetic: "kitāb", russian: "книга", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400" },
        { arabic: "قَلَم", phonetic: "qalam", russian: "ручка", image: "https://images.unsplash.com/photo-1586158291800-2665f07bba79?w=400" },
        { arabic: "دَفْتَر", phonetic: "daftar", russian: "тетрадь", image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=400" },
        { arabic: "مِمْحَاة", phonetic: "mimḥāʾa", russian: "ластик", image: "https://images.unsplash.com/photo-1589127827957-3c1bae2eaf3d?w=400" },
        { arabic: "مِسْطَرَة", phonetic: "misṭara", russian: "линейка", image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400" },
        { arabic: "حَقِيبَة", phonetic: "ḥaqība", russian: "сумка", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" }
    ],
    "Природа": [
        { arabic: "شَمْس", phonetic: "shams", russian: "солнце", image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400" },
        { arabic: "قَمَر", phonetic: "qamar", russian: "луна", image: "https://images.unsplash.com/photo-1509903316079-449faef593e1?w=400" },
        { arabic: "نَجْم", phonetic: "najm", russian: "звезда", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400" },
        { arabic: "شَجَرَة", phonetic: "shajara", russian: "дерево", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400" },
        { arabic: "زَهْرَة", phonetic: "zahra", russian: "цветок", image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400" },
        { arabic: "مَطَر", phonetic: "maṭar", russian: "дождь", image: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=400" },
        { arabic: "ثَلْج", phonetic: "thalj", russian: "снег", image: "https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=400" },
        { arabic: "بَحْر", phonetic: "baḥr", russian: "море", image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400" }
    ],
    "Цвета": [
        { arabic: "أَحْمَر", phonetic: "ʾaḥmar", russian: "красный", image: "https://images.unsplash.com/photo-1525328437458-0c4d4db7cab4?w=400" },
        { arabic: "أَزْرَق", phonetic: "ʾazraq", russian: "синий", image: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400" },
        { arabic: "أَخْضَر", phonetic: "ʾakhḍar", russian: "зелёный", image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400" },
        { arabic: "أَصْفَر", phonetic: "ʾaṣfar", russian: "жёлтый", image: "https://images.unsplash.com/photo-1519852476561-ec618b0183ba?w=400" },
        { arabic: "أَبْيَض", phonetic: "ʾabyaḍ", russian: "белый", image: "https://images.unsplash.com/photo-1534401661080-c4bcf0296b66?w=400" },
        { arabic: "أَسْوَد", phonetic: "ʾaswad", russian: "чёрный", image: "https://images.unsplash.com/photo-1518895312237-a9e23508077d?w=400" }
    ],
    "Семья": [
        { arabic: "أَب", phonetic: "ʾab", russian: "отец", image: "https://images.unsplash.com/photo-1500672860114-9e913f298978?w=400" },
        { arabic: "أُمّ", phonetic: "ʾumm", russian: "мать", image: "https://images.unsplash.com/photo-1562845799-3b0826e4d033?w=400" },
        { arabic: "ابْن", phonetic: "ibn", russian: "сын", image: "https://images.unsplash.com/photo-1519340333755-56e9c1d6e3f6?w=400" },
        { arabic: "بِنْت", phonetic: "bint", russian: "дочь", image: "https://images.unsplash.com/photo-1580905762356-baf48dc0f0a3?w=400" },
        { arabic: "أَخ", phonetic: "ʾakh", russian: "брат", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400" },
        { arabic: "أُخْت", phonetic: "ʾukht", russian: "сестра", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400" },
        { arabic: "جَدّ", phonetic: "jadd", russian: "дедушка", image: "https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?w=400" },
        { arabic: "جَدَّة", phonetic: "jadda", russian: "бабушка", image: "https://images.unsplash.com/photo-1594038181451-bdb76e0fe1c6?w=400" }
    ]
};

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

// Initialize app
init();