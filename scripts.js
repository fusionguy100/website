document.addEventListener('DOMContentLoaded', () => {
  const username = 'fusionguy100';

  // Whitelist of repo names to display
  const include = [
    'Zillow_Scraper',
    'Flash_Card_Project',
    'Flask_Authentication'
  ];

  // 1) Latest Repos (filtered cards)
  fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
    .then(response => response.json())
    .then(repos => {
      const container = document.getElementById('repo-list');
      repos
        .filter(r => !r.fork && include.includes(r.name))
        .forEach(repo => {
          const card = document.createElement('div');
          card.className = 'repo-card';
          card.innerHTML = `
            <h4><a href="${repo.html_url}" target="_blank">${repo.name}</a></h4>
            <p>${repo.description || ''}</p>
            <small>★ ${repo.stargazers_count} • Updated: ${new Date(repo.updated_at).toLocaleDateString()}</small>
          `;
          container.appendChild(card);
        });
    })
    .catch(err => console.error('Error fetching repos:', err));

  // 2) Latest Activity
  fetch(`https://api.github.com/users/${username}/events/public?per_page=5`)
    .then(response => response.json())
    .then(events => {
      const list = document.getElementById('activity-list');
      events.forEach(evt => {
        const date = new Date(evt.created_at).toLocaleDateString();
        const li = document.createElement('li');
        li.innerHTML = `${evt.type.replace('Event','')} in <a href="https://github.com/${evt.repo.name}" target="_blank">${evt.repo.name}</a> on ${date}`;
        list.appendChild(li);
      });
    })
    .catch(err => console.error('Error fetching activity:', err));

  // 3) Theme Toggle
  const toggle = document.getElementById('theme-toggle');
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
  }
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
  });

  // 4) Full-screen on click
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
