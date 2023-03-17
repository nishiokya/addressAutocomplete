let prefectures = [];

async function loadPrefectures() {
    const response = await fetch("prefectures.json");
    prefectures = await response.json();
    updateSuggest("prefectures");
}
async function loadCitys() {
    const response = await fetch("citys.json");
    citys = await response.json();
    updateSuggest("citys");
}

function updateSuggest( addressLevel) {
    const input = document.getElementById("address-level1");
    const datalist = document.getElementById("prefectures");

    datalist.innerHTML = "";

    const searchValue = input.value.toLowerCase();

    for (const prefecture of prefectures) {
        if (prefecture.ja.startsWith(searchValue) || prefecture.romaji.toLowerCase().startsWith(searchValue)) {
            const option = document.createElement("option");
            option.value = prefecture.ja;
            datalist.appendChild(option);
        }
    }
}

function toggleSuggest() {
    const input = document.getElementById("address-level1");

    if (input.value.length === 0) {
        updateSuggest();
    }
}

document.getElementById("address-level1").addEventListener("input", updateSuggest);

loadPrefectures();
loadCitys();