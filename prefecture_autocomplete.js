async function loadPrefectures() {
    const response = await fetch("prefectures.json");
    const prefectures = await response.json();
    const datalist = document.getElementById("prefectures");

    for (const prefecture of prefectures) {
        const option = document.createElement("option");
        option.value = prefecture;
        datalist.appendChild(option);
    }
}

function toggleSuggest() {
    const input = document.getElementById("address-level1");
    const datalist = document.getElementById("prefectures");

    if (input.value.length === 0) {
        datalist.setAttribute("disabled", "");
    } else {
        datalist.removeAttribute("disabled");
    }
}

loadPrefectures();
