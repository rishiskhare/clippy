'use strict';

(() => {
  const isChrome = typeof chrome !== 'undefined' && !!chrome.sidePanel;
  const isFirefox = !isChrome && typeof browser !== 'undefined' && !!browser.sidebarAction;

  if (isChrome) {
    const enableActionToggle = () => {
      chrome.sidePanel
        .setPanelBehavior({ openPanelOnActionClick: true })
        .catch((error) => console.error('Failed to enable side-panel action toggle:', error));
    };

    chrome.runtime.onInstalled.addListener(enableActionToggle);
    chrome.runtime.onStartup.addListener(enableActionToggle);
  } else if (isFirefox) {
    const toggleSidebar = () => {
      browser.sidebarAction.toggle().catch((error) => console.error('Unable to toggle sidebar:', error));
    };

    try {
      browser.action.onClicked.removeListener(toggleSidebar);
    } catch (_) {}
    browser.action.onClicked.addListener(toggleSidebar);
  }
})();