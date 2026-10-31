import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { login, logout } from './login.js';
import { initMap } from './mapbox.js';

//DOM elems
const mapContainer = document.getElementById('map');
const loginForm = document.querySelector('.form');
const logoutBtn = document.querySelector('.nav__el--logout');

if (mapContainer) {
  try {
    initMap(mapContainer);
  } catch (error) {
    console.error(error);
  }
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if(logoutBtn) {
    logoutBtn.addEventListener('click', logout);
}
