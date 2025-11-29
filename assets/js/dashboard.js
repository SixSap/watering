// Page Navigation Functions
function showHome() {
  document.getElementById('homePage').classList.remove('hidden');
  document.getElementById('loginPage').classList.add('hidden');
  document.getElementById('controlPage').classList.add('hidden');
  document.body.classList.remove('page-locked');
  window.scrollTo(0, 0);
}

function showLogin() {
  document.getElementById('homePage').classList.add('hidden');
  document.getElementById('loginPage').classList.remove('hidden');
  document.getElementById('controlPage').classList.add('hidden');
  document.body.classList.add('page-locked');
  window.scrollTo(0, 0);
}

function showControl() {
  document.getElementById('homePage').classList.add('hidden');
  document.getElementById('loginPage').classList.add('hidden');
  document.getElementById('controlPage').classList.remove('hidden');
  document.body.classList.add('page-locked');
  window.scrollTo(0, 0);
}

// Login Form Functions
function switchTab(tab) {
  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  const submitBtn = document.querySelector('form button[type="submit"]');
  submitBtn.textContent = tab === 'login' ? 'Login' : 'Create Account';
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  if (!email || !password) {
    showToast('Please fill in all fields', 'error');
    return;
  }
  
  showToast('Logged in successfully!', 'success');
  setTimeout(showControl, 1000);
}

function handleLogout() {
  showToast('Logged out successfully', 'success');
  document.body.classList.remove('page-locked');
  setTimeout(showHome, 1000);
}

// Robot Control Functions
function handleMove(direction) {
  showToast(`Moving ${direction}`, 'info');
}

function handleWaterPump() {
  showToast('Water pump activated', 'success');
}

function handleOpenArms() {
  showToast('Arms opened to 180°', 'success');
}

function handleCapturePhoto() {
  showToast('Photo captured!', 'success');
  
  // Add new photo to gallery
  const gallery = document.getElementById('photoGallery');
  const photoCount = gallery.children.length;
  const newPhoto = document.createElement('div');
  newPhoto.className = 'photo-item';
  newPhoto.innerHTML = `<div class="photo-placeholder">Photo ${photoCount + 1}</div>`;
  gallery.insertBefore(newPhoto, gallery.firstChild);
}

// Keyboard Controls for Robot Movement
document.addEventListener('keydown', function(event) {
  if (document.getElementById('controlPage').classList.contains('hidden')) return;
  
  const key = event.key.toLowerCase();
  switch(key) {
    case 'w': handleMove('forward'); break;
    case 'a': handleMove('left'); break;
    case 's': handleMove('backward'); break;
    case 'd': handleMove('right'); break;
  }
});

// Toast Notification Function
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  const toastIcon = document.getElementById('toastIcon');
  const toastMessage = document.getElementById('toastMessage');
  
  toast.className = `toast ${type}`;
  const icons = {
    success: '✓',
    info: 'ℹ️',
    error: '✕'
  };
  toastIcon.textContent = icons[type] || icons.info;
  toastMessage.textContent = message;
  
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// Initialize Application
window.onload = function() {
  showHome();
};
