chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('[GTA6 Blocker] Background script received message:', message);
    if (message.action === 'closeTab' && sender.tab) {
      console.log('[GTA6 Blocker] Attempting to close tab:', sender.tab.id);
      chrome.tabs.remove(sender.tab.id, () => {
        if (chrome.runtime.lastError) {
          console.error('[GTA6 Blocker] Error closing tab:', chrome.runtime.lastError);
        } else {
          console.log('[GTA6 Blocker] Tab closed:', sender.tab.id);
          sendResponse({status: 'success'});
        }
      });
      return true;  // threexk
    } else {
      sendResponse({status: 'unknown action'});
    }
  });