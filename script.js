// Mobile Menu
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const hamburger = document.querySelector('.hamburger');
  menu.classList.toggle('active');
  hamburger.classList.toggle('active');
}

function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('active');
  document.querySelector('.hamburger').classList.remove('active');
}

// Page Navigation
function showHome() {
  document.getElementById('homePage').classList.remove('hidden');
  document.getElementById('loginPage').classList.add('hidden');
  document.getElementById('controlPage').classList.add('hidden');
  closeMobileMenu();
}

function showLogin() {
  document.getElementById('homePage').classList.add('hidden');
  document.getElementById('loginPage').classList.remove('hidden');
  document.getElementById('controlPage').classList.add('hidden');
  closeMobileMenu();
}

function showControl() {
  document.getElementById('homePage').classList.add('hidden');
  document.getElementById('loginPage').classList.add('hidden');
  document.getElementById('controlPage').classList.remove('hidden');
  closeMobileMenu();
}

// Login Form
function switchTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  if (!email || !password) {
    showToast('Please fill all fields', 'error');
    return;
  }
  
  showToast('Login successful! 🚜', 'success');
  setTimeout(showControl, 1200);
}

function handleLogout() {
  showToast('Logged out', 'info');
  setTimeout(showHome, 800);
}

// Robot Controls
function handleMove(direction) {
  showToast(`Moving ${direction.toUpperCase()}`, 'info');
}

function handleWaterPump() {
  showToast('💧 Water pump ON', 'success');
}

function handleOpenArms() {
  showToast('🤖 Arms opened', 'success');
}

function handleCapturePhoto() {
  showToast('📸 Photo captured!', 'success');
  // Add photo to gallery
  const gallery = document.getElementById('photoGallery');
  const newPhoto = document.createElement('div');
  newPhoto.className = 'photo-item';
  newPhoto.textContent = '📷';
  gallery.insertBefore(newPhoto, gallery.firstChild);
}

// Actions Switch
function toggleActions() {
  const toggle = document.getElementById('actionsToggle');
  const buttons = document.querySelectorAll('.function-btn');
  
  if (toggle.checked) {
    buttons.forEach(btn => btn.disabled = false);
    showToast('Controls enabled', 'success');
  } else {
    buttons.forEach(btn => btn.disabled = true);
    showToast('Controls disabled', 'info');
  }
}

// Toast Notification
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  const toastIcon = document.getElementById('toastIcon');
  const toastMessage = document.getElementById('toastMessage');
  
  const icons = { success: '✓', info: 'ℹ️', error: '✕' };
  toastIcon.textContent = icons[type] || 'ℹ️';
  toastMessage.textContent = message;
  toast.className = `toast ${type} show`;
  
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// Keyboard Controls
document.addEventListener('keydown', (e) => {
  if (document.getElementById('controlPage').classList.contains('hidden')) return;
  
  const key = e.key.toLowerCase();
  const moves = { 'w': 'forward', 'a': 'left', 's': 'backward', 'd': 'right' };
  if (moves[key]) handleMove(moves[key]);
});

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
  const menu = document.getElementById('mobileMenu');
  const hamburger = document.querySelector('.hamburger');
  if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
    closeMobileMenu();
  }
});

window.onload = () => showHome();
