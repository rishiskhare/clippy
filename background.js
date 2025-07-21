'use strict';

const enableActionToggle = () => {
  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error('Failed to enable side-panel action toggle:', error));
};

chrome.runtime.onInstalled.addListener(enableActionToggle);

chrome.runtime.onStartup.addListener(enableActionToggle);