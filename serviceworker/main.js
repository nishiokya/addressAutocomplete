if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      console.log('Service Worker registered with scope:', registration.scope);
    }, function(err) {
      console.error('Service Worker registration failed:', err);
    });
  });
}

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
      console.log(searchInput.value)
    }
  });
}


function saveInputHistory(value) {
  const isServiceWorkerAvailable = 'serviceWorker' in navigator && navigator.serviceWorker.controller;

  if (isServiceWorkerAvailable) {
    const inputData = {
      type: 'SAVE_INPUT_HISTORY',
      inputData: value,
    };
    
    navigator.serviceWorker.controller.postMessage(inputData);
  }
}


initAutocomplete();