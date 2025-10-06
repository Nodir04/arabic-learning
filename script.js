document.addEventListener("DOMContentLoaded", () => {
  // -------------------------------
  // CONFIG
  // -------------------------------
  const HF_API_TOKEN = "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"; // 👈 paste your token here
  const TTS_MODEL = "facebook/mms-tts-ara";

  // -------------------------------
  // DOM Elements
  // -------------------------------
  const categorySelect = document.getElementById("category-select");
  const searchInput = document.getElementById("search-input");
  const arabicEl = document.getElementById("arabic-word");
  const translitEl = document.getElementById("transliteration");
  const russianEl = document.getElementById("russian-translation");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const ttsBtn = document.getElementById("tts-btn");

  // -------------------------------
  // State
  // -------------------------------
  let vocabulary = {};
  let currentCategory = "";
  let filteredWords = [];
  let currentIndex = 0;

  // -------------------------------
  // Load vocabulary
  // -------------------------------
  fetch("vocabulary.json")
    .then(res => res.json())
    .then(data => {
      vocabulary = data;
      populateCategories();
    })
    .catch(err => console.error("Error loading vocabulary.json:", err));

  // -------------------------------
  // Populate category dropdown
  // -------------------------------
  function populateCategories() {
    categorySelect.innerHTML = '<option value="">-- Choose Category --</option>';
    Object.keys(vocabulary).forEach(cat => {
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
      categorySelect.appendChild(opt);
    });
  }

  // -------------------------------
  // Display current word
  // -------------------------------
  function displayWord() {
    if (!filteredWords.length) return;
    const word = filteredWords[currentIndex];
    arabicEl.textContent = word.arabic;
    translitEl.textContent = word.transliteration;
    russianEl.textContent = word.russian;
  }

  // -------------------------------
  // Event listeners
  // -------------------------------
  categorySelect.addEventListener("change", () => {
    currentCategory = categorySelect.value;
    if (currentCategory) {
      filteredWords = vocabulary[currentCategory];
      currentIndex = 0;
      displayWord();
    } else {
      arabicEl.textContent = translitEl.textContent = russianEl.textContent = "---";
      filteredWords = [];
    }
  });

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    if (currentCategory && vocabulary[currentCategory]) {
      filteredWords = vocabulary[currentCategory].filter(w =>
        w.russian.toLowerCase().includes(query)
      );
      currentIndex = 0;
      displayWord();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (!filteredWords.length) return;
    currentIndex = (currentIndex - 1 + filteredWords.length) % filteredWords.length;
    displayWord();
  });

  nextBtn.addEventListener("click", () => {
    if (!filteredWords.length) return;
    currentIndex = (currentIndex + 1) % filteredWords.length;
    displayWord();
  });

  ttsBtn.addEventListener("click", () => {
    if (!filteredWords.length) return;
    playTTS(filteredWords[currentIndex].arabic);
  });

  // -------------------------------
  // TTS Function — Hugging Face MMS Arabic
  // -------------------------------
  async function playTTS(text) {
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
        console.error("TTS API error:", response.status);
        return;
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error("TTS error:", error);
    }
  }
});
