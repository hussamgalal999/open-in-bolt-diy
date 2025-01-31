document.addEventListener('DOMContentLoaded', function() {
  const domainInput = document.getElementById('domain');
  const httpsCheckbox = document.getElementById('https');
  const saveButton = document.getElementById('save');

  chrome.storage.local.get(['configuredDomain', 'useHttps'], function(result) {
    domainInput.value = result.configuredDomain || 'localhost:5173';
    httpsCheckbox.checked = result.useHttps !== false;
  });

  saveButton.addEventListener('click', function() {
    const configuredDomain = domainInput.value;
    const useHttps = httpsCheckbox.checked;
    chrome.storage.local.set({ configuredDomain: configuredDomain, useHttps: useHttps }, function() {
      alert('Settings saved!');
    });
  });
});
