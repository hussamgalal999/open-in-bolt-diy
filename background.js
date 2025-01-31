chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ configuredDomain: 'localhost:5173',useHttps: false  });
});
