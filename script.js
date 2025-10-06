// =======================
// ⚙️ Optional: MMS TTS Settings
// =======================
// If you want to use Hugging Face MMS TTS backend, set your API endpoint here.
// Example: const MMS_TTS_API = "http://localhost:8000/tts";
const MMS_TTS_API = ""; // leave empty to use browser TTS fallback

// =======================
// 🌐 Load Vocabulary JSON
// =======================
let vocabulary = {};
let currentCategory = "";
let currentWordList = [];
let currentIndex = 0;

const categorySelect = document.getElementById("categorySelect");
const searchInput = document.getElementById("searchInput");
const arabicWordEl = document.getElementById("arabicWord");
const transliterationEl = document.getElementById("transliteration");
const russianTranslationEl = document.getElementById("russianTranslation");
const ttsButton = document.getElementById("ttsButton");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

fetch("vocabulary.json")
  .then(res => res.json())
  .then(data => {
    vocabulary = data;
    populateCategories();
    selectDefaultCategory();
  })
  .catch(err => {
    console.error("Failed to load vocabulary.json", err);
  });

// =======================
// 🧭 Category & Search
// =======================
function populateCategories() {
  Object.keys(vocabulary).forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });
}

function selectDefaultCategory() {
  if (Object.keys(vocabulary).length > 0) {
    currentCategory = Object.keys(vocabulary)[0];
    categorySelect.value = currentCategory;
    updateWordList();
    displayCurrentWord();
  }
}

categorySelect.addEventListener("change", () => {
  currentCategory = categorySelect.value;
  searchInput.value = "";
  updateWordList();
  displayCurrentWord();
});

searchInput.addEventListener("input", () => {
  updateWordList(searchInput.value.trim().toLowerCase());
  currentIndex = 0;
  displayCurrentWord();
});

// =======================
// 📝 Word Display Logic
// =======================
function updateWordList(searchTerm = "") {
  let words = vocabulary[currentCategory] || [];
  if (searchTerm) {
    words = words.filter(w => w.russian.toLowerCase().includes(searchTerm));
  }
  currentWordList = words;
  currentIndex = 0;
}

function displayCurrentWord() {
  if (currentWordList.length === 0) {
    arabicWordEl.textContent = "—";
    transliterationEl.textContent = "No words found";
    russianTranslationEl.textContent = "";
    return;
  }

  const word = currentWordList[currentIndex];
  arabicWordEl.textContent = word.arabic;
  transliterationEl.textContent = word.transliteration;
  russianTranslationEl.textContent = word.russian;
}

// =======================
// ⏩ Navigation Buttons
// =======================
nextButton.addEventListener("click", () => {
  if (currentWordList.length === 0) return;
  currentIndex = (currentIndex + 1) % currentWordList.length;
  displayCurrentWord();
});

prevButton.addEventListener("click", () => {
  if (currentWordList.length === 0) return;
  currentIndex = (currentIndex - 1 + currentWordList.length) % currentWordList.length;
  displayCurrentWord();
});

// =======================
// 🔊 Text-to-Speech
// =======================
ttsButton.addEventListener("click", () => {
  if (currentWordList.length === 0) return;
  const text = currentWordList[currentIndex].arabic;
  if (MMS_TTS_API) {
    playMMSAudio(text);
  } else {
    playBrowserTTS(text);
  }
});

// ---- Browser TTS fallback ----
function playBrowserTTS(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ar-SA";
  speechSynthesis.speak(utterance);
}

// ---- Hugging Face MMS TTS backend ----
async function playMMSAudio(text) {
  try {
    const response = await fetch(MMS_TTS_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text })
    });

    if (!response.ok) throw new Error("MMS TTS API error");
    const blob = await response.blob();
    const audioUrl = URL.createObjectURL(blob);
    const audio = new Audio(audioUrl);
    audio.play();
  } catch (err) {
    console.error("Failed to fetch MMS TTS audio:", err);
    playBrowserTTS(text);
  }
}
