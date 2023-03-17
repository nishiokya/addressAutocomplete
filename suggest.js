const normalize = window.normalizeJapaneseAddresses;
const prefectureInput = document.getElementById('address-level1');
const prefectureSuggestions = document.getElementById('prefecture-suggestions');
const cityInput = document.getElementById('address-level2');
const citySuggestions = document.getElementById('city-suggestions');

async function fetchPrefectureSuggestions(query) {
    const prefectures = await fetch('prefectures.json').then(res => res.json());
    return prefectures.filter(pref => pref.ja.startsWith(query) || pref.romaji.toLowerCase().startsWith(query.toLowerCase()));
}

async function fetchCitySuggestions(prefecture, query) {
    const response = await normalize(`${prefecture}${query}`);
    const cities = response.level2;
    return cities.filter(city => city.name.startsWith(query) || city.name_kana.startsWith(query));
}

function showSuggestions(input, suggestionsList, suggestions) {
    suggestionsList.innerHTML = '';
    if (suggestions.length === 0) {
        suggestionsList.style.display = 'none';
        return;
    }

    for (const suggestion of suggestions) {
        const li = document.createElement('li');
        li.textContent = suggestion;
        li.addEventListener('click', () => {
            input.value = suggestion;
            suggestionsList.style.display = 'none';
        });
        suggestionsList.appendChild(li);
    }

    suggestionsList.style.display = 'block';
}

prefectureInput.addEventListener('input', async () => {
    const query = prefectureInput.value;
    const suggestions = await fetchPrefectureSuggestions(query);
    showSuggestions(prefectureInput, prefectureSuggestions, suggestions.map(s => s.ja));
});

prefectureInput.addEventListener('blur', () => {
    setTimeout(() => {
        prefectureSuggestions.style.display = 'none';
    }, 100);
});

prefectureInput.addEventListener('focus', () => {
    if (prefectureInput.value) {
        prefectureSuggestions.style.display = 'block';
    }
});

cityInput.addEventListener('input', async () => {
    if (!prefectureInput.value) {
        return;
    }
    const query = cityInput.value;
    const suggestions = await fetchCitySuggestions(prefectureInput.value, query);
    showSuggestions(cityInput, citySuggestions, suggestions.map(s => s.name));
});

cityInput.addEventListener('blur', () => {
    setTimeout(() => {
        citySuggestions.style.display = 'none';
    }, 100);
});

cityInput.addEventListener('focus', () => {
    if (cityInput.value) {
        citySuggestions.style.display = 'block';
    }
});

prefectureInput.addEventListener('change', () => {
    cityInput.disabled = !prefectureInput.value;
    cityInput.value = '';
    citySuggestions.innerHTML = '';
});