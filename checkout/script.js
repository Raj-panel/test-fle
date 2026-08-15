// Payment Method Switching Logic
function switchCheckoutPayment(method) {
  const upiView = document.getElementById('checkoutUpiView');
  const binanceView = document.getElementById('checkoutBinanceView');
  const btnUpi = document.getElementById('btnTabUpi');
  const btnBinance = document.getElementById('btnTabBinance');
  const txnLabel = document.getElementById('txnLabel');
  const txnInput = document.getElementById('checkoutTxnId');

  if (method === 'binance') {
    if (upiView) upiView.classList.add('hidden');
    if (binanceView) binanceView.classList.remove('hidden');
    if (btnUpi) btnUpi.classList.remove('active');
    if (btnBinance) btnBinance.classList.add('active');
    
    if (txnLabel) txnLabel.innerText = "Enter Binance TxID / Order ID:";
    if (txnInput) txnInput.placeholder = "e.g. 21893XXXXXXXXXX (Binance TxID)";
  } else {
    if (binanceView) binanceView.classList.add('hidden');
    if (upiView) upiView.classList.remove('hidden');
    if (btnBinance) btnBinance.classList.remove('active');
    if (btnUpi) btnUpi.classList.add('active');
    
    if (txnLabel) txnLabel.innerText = "Enter 12-Digit UPI UTR / Ref No:";
    if (txnInput) txnInput.placeholder = "e.g. 4029XXXXXXXXXX (12-Digit UTR)";
  }
}

// Function to Parse URL Query Parameters and Populate Checkout Page
function populateCheckoutFromURL() {
  const params = new URLSearchParams(window.location.search);
  
  const title = params.get('title') || 'Instagram Followers';
  const pkgBadge = params.get('pkgBadge') || '5K Followers';
  const units = params.get('units') || '5,000 units';
  const price = params.get('price') || '199.00';
  const platform = params.get('platform') || 'instagram';
  const badge = params.get('badge') || 'Best Value';

  const titleEl = document.getElementById('checkoutServiceTitle');
  const pkgBadgeEl = document.getElementById('checkoutPkgBadgeName');
  const unitsEl = document.getElementById('checkoutUnitsText');
  const priceEl = document.getElementById('checkoutPriceText');
  const summaryPayEl = document.getElementById('summaryPayAmount');
  const summaryPkgEl = document.getElementById('summaryPackageText');
  const badgeEl = document.getElementById('checkoutBadge');
  const linkLabelEl = document.getElementById('checkoutLinkLabel');
  const linkInputEl = document.getElementById('checkoutLinkInput');

  if (titleEl) titleEl.innerText = title;
  if (pkgBadgeEl) pkgBadgeEl.innerText = pkgBadge;
  if (unitsEl) unitsEl.innerText = units;
  if (priceEl) priceEl.innerText = price;
  if (summaryPayEl) summaryPayEl.innerText = price;
  if (summaryPkgEl) summaryPkgEl.innerText = pkgBadge;
  if (badgeEl) badgeEl.innerText = badge;

  if (linkLabelEl) linkLabelEl.innerText = `Enter your ${platform.charAt(0).toUpperCase() + platform.slice(1)} link`;
  if (linkInputEl) linkInputEl.placeholder = `https://${platform.toLowerCase()}.com/your_username`;

  // Set Theme
  document.body.setAttribute('data-platform', platform.toLowerCase());
}

// Submit Order via WhatsApp
function submitOrderToWhatsApp() {
  const linkInput = document.getElementById("checkoutLinkInput");
  const txnInput = document.getElementById("checkoutTxnId");

  const link = linkInput ? linkInput.value.trim() : "";
  const txnId = txnInput ? txnInput.value.trim() : "";

  if (!link) {
    alert("Please enter your target profile / post link!");
    return;
  }

  if (!txnId) {
    alert("Please enter Transaction ID / UTR number!");
    return;
  }

  const title = document.getElementById("checkoutServiceTitle")?.innerText || "";
  const pkg = document.getElementById("checkoutPkgBadgeName")?.innerText || "";
  const price = document.getElementById("checkoutPriceText")?.innerText || "";

  const msg = `🚀 *NEW ORDER CONFIRMATION*%0A%0A📌 *Service:* ${title}%0A📦 *Package:* ${pkg}%0A💰 *Price:* ₹${price}%0A🔗 *Link:* ${link}%0A💳 *Txn ID / UTR:* ${txnId}%0A%0APlease process my order!`;

  window.open(`https://wa.me/919239628344?text=${msg}`, "_blank");
}

function closeCheckout() {
  window.location.href = '../index.html';
}

// Event Listeners for Checkout Controls
document.addEventListener("DOMContentLoaded", function () {
  populateCheckoutFromURL();

  const btnUpi = document.getElementById('btnTabUpi');
  if (btnUpi) {
    btnUpi.addEventListener('click', () => switchCheckoutPayment('upi'));
  }

  const btnBinance = document.getElementById('btnTabBinance');
  if (btnBinance) {
    btnBinance.addEventListener('click', () => switchCheckoutPayment('binance'));
  }

  const backBtn = document.getElementById('checkoutBackBtn');
  if (backBtn) {
    backBtn.addEventListener('click', closeCheckout);
  }

  const confirmBtn = document.getElementById('btnConfirmOrder');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', submitOrderToWhatsApp);
  }
});
