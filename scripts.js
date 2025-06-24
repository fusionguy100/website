// scripts.js

// Latest Repositories
fetch('https://api.github.com/users/fusionguy100/repos?sort=updated&per_page=6')
  .then(response => response.json())
  .then(repos => {
    repos.forEach(repo => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
      document.getElementById('repo-list').appendChild(li);
    });
  })
  .catch(err => console.error('Error fetching repos:', err));

// Latest GitHub Activity
fetch('https://api.github.com/users/fusionguy100/events/public?per_page=5')
  .then(response => response.json())
  .then(events => {
    events.forEach(evt => {
      const date = new Date(evt.created_at).toLocaleDateString();
      const li = document.createElement('li');
      li.innerHTML = `${evt.type.replace('Event','')} in <a href="https://github.com/${evt.repo.name}" target="_blank">${evt.repo.name}</a> on ${date}`;
      document.getElementById('activity-list').appendChild(li);
    });
  })
  .catch(err => console.error('Error fetching activity:', err));

// Theme Toggle
const toggle = document.getElementById('theme-toggle');
const body = document.body;
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-theme');
}
toggle.addEventListener('click', () => {
  body.classList.toggle('dark-theme');
  localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
});

// Fullscreen polyfill helpers
function requestFullscreen(el) {
  if (el.requestFullscreen) return el.requestFullscreen();
  if (el.webkitRequestFullscreen) return el.webkitRequestFullscreen();
  if (el.mozRequestFullScreen)   return el.mozRequestFullScreen();
  if (el.msRequestFullscreen)    return el.msRequestFullscreen();
  return Promise.reject(new Error('Fullscreen API is not supported'));
}

function exitFullscreen() {
  if (document.exitFullscreen) return document.exitFullscreen();
  if (document.webkitExitFullscreen) return document.webkitExitFullscreen();
  if (document.mozCancelFullScreen)   return document.mozCancelFullScreen();
  if (document.msExitFullscreen)      return document.msExitFullscreen();
  return Promise.reject(new Error('Exit fullscreen is not supported'));
}

// Wait until DOM is ready, then wire up click-to-fullscreen
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.gallery img, .project img').forEach(img => {
    img.style.cursor = 'pointer'; // indicate clickability

    img.addEventListener('click', () => {
      const fsElement =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;

      if (fsElement) {
        exitFullscreen().catch(console.error);
      } else {
        requestFullscreen(img).catch(console.error);
      }
    });
  });
});
