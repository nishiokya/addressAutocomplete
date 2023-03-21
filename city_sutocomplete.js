
// 都道府県と市区町村のデータ
const prefecturesAndCities = {
    "東京都": ["新宿区", "渋谷区", "目黒区", "世田谷区"],
    "神奈川県": ["横浜市", "川崎市", "相模原市", "鎌倉市"],
    "大阪府": ["大阪市", "堺市", "高槻市", "枚方市"]
  };
  
  // 都道府県入力要素
  const prefectureInput = document.getElementById("prefecture");
  const prefectureSuggestions = document.getElementById("prefecture-suggestions");
  
  // 市区町村入力要素
  const cityInput = document.getElementById("city");
  const citySuggestions = document.getElementById("city-suggestions");
  
  // 都道府県サジェスト
  prefectureInput.addEventListener("input", () => {
    const inputText = prefectureInput.value;
  
    if (!inputText) {
      prefectureSuggestions.innerHTML = "";
      return;
    }
  
    const prefectureCandidates = Object.keys(prefecturesAndCities).filter((prefecture) => {
      return prefecture.startsWith(inputText);
    });
  
    prefectureSuggestions.innerHTML = "";
    prefectureCandidates.forEach((prefecture) => {
      const suggestion = document.createElement("div");
      suggestion.textContent = prefecture;
      suggestion.addEventListener("click", () => {
        prefectureInput.value = prefecture;
        prefectureSuggestions.innerHTML = "";
      });
      prefectureSuggestions.appendChild(suggestion);
    });
  });
  
  // 市区町村サジェスト
  cityInput.addEventListener("input", () => {
    const selectedPrefecture = prefectureInput.value;
    const inputText = cityInput.value;
  
    if (!selectedPrefecture || !inputText) {
      citySuggestions.innerHTML = "";
      return;
    }
  
    if (!prefecturesAndCities[selectedPrefecture]) {
      citySuggestions.innerHTML = "";
      return;
    }
  
    const cityCandidates = prefecturesAndCities[selectedPrefecture].filter((city) => {
      return city.startsWith(inputText);
    });
  
    citySuggestions.innerHTML = "";
    cityCandidates.forEach((city) => {
        const suggestion = document.createElement("div");
        suggestion.textContent = city;
        suggestion.addEventListener("click", () => {
          cityInput.value = city;
          citySuggestions.innerHTML = "";
        });
        citySuggestions.appendChild(suggestion);
      });
    });