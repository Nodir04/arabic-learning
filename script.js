// ================================
// Arabic–Russian Vocabulary App
// ================================

let vocabulary = {};
let currentCategory = null;
let currentIndex = 0;

// -------------------------------
// 🔑 Hugging Face TTS Settings
// -------------------------------
const HF_API_TOKEN = "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"; // ← Replace this with your Hugging Face token
const TTS_MODEL = "facebook/mms-tts-ara";

// -------------------------------
// Load Vocabulary JSON
// -------------------------------
fetch('vocabulary.json')
  .then(response => response.json())
  .then(data => {
    vocabulary = data;
    populateCategoryDropdown();
    const firstCategory = Object.keys(vocabulary)[0];
    if (firstCategory) {
      currentCategory = firstCategory;
      displayWord(0);
    }
  })
  .catch(err => console.error('Error loading vocabulary.json:', err));

// -------------------------------
// Populate Category Dropdown
// -------------------------------
function populateCategoryDropdown() {
  const categorySelect = document.getElementById('categorySelect');
  categorySelect.innerHTML = '';

  Object.keys(vocabulary).forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });

  categorySelect.addEventListener('change', () => {
    currentCategory = categorySelect.value;
    currentIndex = 0;
    displayWord(currentIndex);
  });
}

// -------------------------------
// Display Current Word
// -------------------------------
function displayWord(index) {
  const arabicEl = document.getElementById('arabicWord');
  const translitEl = document.getElementById('transliteration');
  const russianEl = document.getElementById('translation');

  if (!currentCategory || !vocabulary[currentCategory] || vocabulary[currentCategory].length === 0) {
    arabicEl.textContent = '—';
    translitEl.textContent = '';
    russianEl.textContent = 'Нет слов в этой категории';
    return;
  }

  const words = vocabulary[currentCategory];
  const word = words[index];

  arabicEl.textContent = word.arabic;
  translitEl.textContent = word.transliteration;
  russianEl.textContent = word.russian;
}

// -------------------------------
// Navigation Buttons
// -------------------------------
document.getElementById('nextBtn').addEventListener('click', () => {
  if (!currentCategory) return;
  const words = vocabulary[currentCategory];
  currentIndex = (currentIndex + 1) % words.length;
  displayWord(currentIndex);
});

document.getElementById('prevBtn').addEventListener('click', () => {
  if (!currentCategory) return;
  const words = vocabulary[currentCategory];
  currentIndex = (currentIndex - 1 + words.length) % words.length;
  displayWord(currentIndex);
});

// -------------------------------
// Search by Russian Translation
// -------------------------------
document.getElementById('searchInput').addEventListener('input', (e) => {
  const query = e.target.value.trim().toLowerCase();

  if (query === '') {
    currentIndex = 0;
    displayWord(currentIndex);
    return;
  }

  for (const category in vocabulary) {
    const matchIndex = vocabulary[category].findIndex(word =>
      word.russian.toLowerCase().includes(query)
    );
    if (matchIndex !== -1) {
      currentCategory = category;
      document.getElementById('categorySelect').value = category;
      currentIndex = matchIndex;
      displayWord(currentIndex);
      break;
    }
  }
});

// -------------------------------
// Hugging Face MMS Arabic TTS
// -------------------------------
async function playTTS(text) {
  if (!HF_API_TOKEN || HF_API_TOKEN === "YOUR_HF_API_KEY_HERE") {
    alert("Please set your Hugging Face API key in script.js");
    return;
  }

  try {
    const response = await fetch(`https://api-inference.huggingface.co/models/${TTS_MODEL}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: text })
    });

    if (!response.ok) {
      throw new Error(`TTS API error: ${response.status}`);
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
  } catch (error) {
    console.error("TTS Error:", error);
  }
}

// Pronounce button
document.getElementById('ttsBtn').addEventListener('click', () => {
  const word = document.getElementById('arabicWord').textContent;
  if (word && word !== '—') {
    playTTS(word);
  }
});
