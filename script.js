// Dynamic Platform Theme Switcher Integration
function applyPlatformTheme(platform) {
  if (!platform) return;
  const p = platform.toLowerCase();
  document.body.setAttribute('data-platform', p);
}

// Unified Platform Switch Click & Service Loading Handler
function handlePlatformClick(platform, elem) {
  document.querySelectorAll('.platform-switch-container .platform-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  if (elem) elem.classList.add('active');

  // Automatically change theme based on platform
  applyPlatformTheme(platform);

  if (typeof switchPlatform === 'function') {
    switchPlatform(platform);
  } else if (typeof loadPlatformServices === 'function') {
    loadPlatformServices(platform);
  }
}

// WhatsApp Support Click Handler
function openWhatsAppSupport() {
  const phoneNumber = "919239628344";
  const message = encodeURIComponent("Hi 👋 I want to know about your services on rajsmmpanel.in");
  window.open("https://wa.me/" + phoneNumber + "?text=" + message, "_blank");
}

// Sidebar Controls
function openSidebar() {
  const sidebar = document.getElementById("leftSidebar");
  const overlay = document.getElementById("sidebarOverlay");
  
  if (sidebar && !sidebar.classList.contains("active")) {
    sidebar.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
    
    history.pushState({ sidebarOpen: true }, '');
  }
}

function closeSidebar(fromUserAction = false) {
  const sidebar = document.getElementById("leftSidebar");
  const overlay = document.getElementById("sidebarOverlay");
  
  if (sidebar && sidebar.classList.contains("active")) {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "auto";
    
    if (fromUserAction && history.state && history.state.sidebarOpen) {
      history.back();
    }
  }
}

// Open Checkout Function with Query Parameters Redirect
function openCheckout(itemData) {
  if (!itemData) return;
  const params = new URLSearchParams();
  params.set('title', itemData.title || '');
  params.set('pkgBadge', itemData.pkgBadge || '');
  params.set('units', itemData.units || '');
  params.set('price', itemData.price || '');
  params.set('platform', itemData.platform || 'instagram');
  params.set('badge', itemData.badge || 'Best Value');
  
  window.location.href = '/checkout/?' + params.toString();
}

window.addEventListener("popstate", function (event) {
  const sidebar = document.getElementById("leftSidebar");
  if (sidebar && sidebar.classList.contains("active")) {
    closeSidebar(false);
  }
});

// Input Focus App Banner Toggle & DOM Content Loaded Initialization
document.addEventListener("DOMContentLoaded", function () {
  // Default initial theme setup
  applyPlatformTheme('instagram');

  // Event Listeners for UI interaction
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", openSidebar);
  }

  const sidebarCloseBtn = document.getElementById("sidebarCloseBtn");
  if (sidebarCloseBtn) {
    sidebarCloseBtn.addEventListener("click", () => closeSidebar(true));
  }

  const sidebarOverlay = document.getElementById("sidebarOverlay");
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", () => closeSidebar(true));
  }

  const btnWhatsappSupport = document.getElementById("btnWhatsappSupport");
  if (btnWhatsappSupport) {
    btnWhatsappSupport.addEventListener("click", openWhatsAppSupport);
  }

  // Bind Platform Buttons
  document.querySelectorAll('.platform-switch-container .platform-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const platform = this.getAttribute('data-platform');
      handlePlatformClick(platform, this);
    });
  });

  document.body.addEventListener("focusin", function (e) {
    if (e.target && (e.target.id === "quantity" || e.target.id === "checkoutLinkInput" || e.target.id === "checkoutTxnId")) {
      const installBox = document.getElementById("installContainer");
      if (installBox) installBox.style.display = "none";
    }
  });

  document.body.addEventListener("focusout", function (e) {
    if (e.target && (e.target.id === "quantity" || e.target.id === "checkoutLinkInput" || e.target.id === "checkoutTxnId")) {
      const installBox = document.getElementById("installContainer");
      if (installBox) installBox.style.display = "block";
    }
  });
});

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => console.log('Service Worker Registered Successfully:', reg))
      .catch((err) => console.log('Service Worker Registration Failed:', err));
  });
}
