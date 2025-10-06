// ================================
// Arabic–Russian Vocabulary App
// ================================

let vocabulary = {};
let currentCategory = null;
let currentIndex = 0;
let arabicVoice = null;

// -------------------------------
// Load Vocabulary JSON
// -------------------------------
fetch('vocabulary.json')
  .then(response => response.json())
  .then(data => {
    vocabulary = data;
    populateCategoryDropdown();
    // Load the first category by default
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
    // reset to current category
    currentIndex = 0;
    displayWord(currentIndex);
    return;
  }

  // Find the first match in all categories
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
// Text-to-Speech (Browser)
// -------------------------------
function loadVoices() {
  const voices = window.speechSynthesis.getVoices();
  arabicVoice = voices.find(v => v.lang.toLowerCase().startsWith('ar'));
}

// Chrome loads voices asynchronously
if (typeof speechSynthesis !== 'undefined') {
  speechSynthesis.onvoiceschanged = loadVoices;
  loadVoices();
}

function playTTS(text) {
  if (!('speechSynthesis' in window)) {
    alert('Text-to-Speech is not supported in this browser.');
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ar-SA';

  if (arabicVoice) {
    utterance.voice = arabicVoice;
  } else {
    console.warn('No Arabic voice found. Using default voice.');
  }

  speechSynthesis.cancel(); // stop previous speech
  speechSynthesis.speak(utterance);
}

document.getElementById('ttsBtn').addEventListener('click', () => {
  const word = document.getElementById('arabicWord').textContent;
  if (word && word !== '—') {
    playTTS(word);
  }
});
