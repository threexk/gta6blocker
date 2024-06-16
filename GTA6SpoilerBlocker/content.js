console.log('[GTA6 Blocker] Content script loaded.');

const keywords = [
  "gta", "gta6", "grand theft auto", "grand theft auto 6", "grand theft auto six",
  "gta six", "gtasix", "rockstar", "rockstargames", "rockstar games",
  "leak", "gta leak", "grand theft auto leak", "grand theft auto five",
  "gtav", "gta v", "gta online", "grand theft auto iv", "grand theft auto vi", "gta vi", "gtavi"
];

function checkForKeywords() {
  console.log('[GTA6 Blocker] Checking for keywords.');
  const bodyText = document.body.innerText.toLowerCase();
  const found = keywords.some(keyword => bodyText.includes(keyword));
  if (found) {
    console.log('[GTA6 Blocker] Keywords found.');
  } else {
    console.log('[GTA6 Blocker] No keywords found.');
  }
  return found;
}

if (checkForKeywords()) {
  console.log('[GTA6 Blocker] Injecting popup.');

  // senkh1111, 1 of 4 3xk
  const style = document.createElement("style");
  style.innerHTML = `
    #gta-blocker-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(128, 0, 128, 0.98); /* purple with 98% opacity */
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
    }
    .gta-blocker-popup {
      text-align: center;
      background: white;
      padding: 20px;
      border-radius: 10px;
    }
    .gta-blocker-popup h1 {
      color: black;
    }
    .gta-blocker-popup button {
      padding: 10px 20px;
      margin: 5px;
      border: none;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);
  console.log('[GTA6 Blocker] Inline styles injected.');

  const overlay = document.createElement("div");
  overlay.id = "gta-blocker-overlay";

  overlay.innerHTML = `
    <div class="gta-blocker-popup">
      <h1>Careful, you might get spoilers for GTA6!</h1>
      <button id="continue-btn">It's okay, let me in</button>
      <button id="close-tab-btn">Thanks, close the tab</button>
    </div>
  `;

  document.body.appendChild(overlay);
  console.log('[GTA6 Blocker] Popup injected.');

  document.getElementById("continue-btn").addEventListener("click", () => {
    console.log('[GTA6 Blocker] Continue button clicked.');
    overlay.remove();
  });

  document.getElementById("close-tab-btn").addEventListener("click", () => {
    console.log('[GTA6 Blocker] Close tab button clicked.');
    chrome.runtime.sendMessage({ action: 'closeTab' }, response => {
      console.log('[GTA6 Blocker] Close tab response:', response);
    });
  });
} else {
  console.log('[GTA6 Blocker] No keywords detected. Popup not injected.');
}
