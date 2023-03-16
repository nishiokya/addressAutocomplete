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

loadPrefectures();