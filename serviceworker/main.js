async function loadInputHistory() {
  return new Promise((resolve, reject) => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      const channel = new MessageChannel();
      channel.port1.onmessage = (event) => {
        if (event.data.error) {
          reject(event.data.error);
        } else {
          resolve(event.data.inputHistory);
        }
      };

      navigator.serviceWorker.controller.postMessage(
        {
          type: 'GET_INPUT_HISTORY',
        },
        [channel.port2]
      );
    } else {
      resolve([]);
    }
  });
}

async function initAutocomplete() {
  const inputHistory = await loadInputHistory();
  const defaultRamenList = [
    "しょうゆラーメン",
    "みそラーメン",
    "しょうゆラーメン",
    "とんこつラーメン",
    "塩ラーメン",
    "つけ麺",
    "担々麺",
  ];

  const searchInput = document.getElementById('searchInput');
  const autoCompleteInstance = new autoComplete({
    selector: () => searchInput,
    data: {
      src: inputHistory.length > 0 ? inputHistory : defaultRamenList,
    },
    onSelection: (feedback) => {
      searchInput.value = feedback.selection.value;
      saveInputHistory(feedback.selection.value);
    },
  });

  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      saveInputHistory(searchInput.value);
    }
  });
}


function saveInputHistory(value) {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'SAVE_INPUT_HISTORY',
      inputData: value,
    });
  }
}

initAutocomplete();