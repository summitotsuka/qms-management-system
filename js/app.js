document.addEventListener(
  'DOMContentLoaded',
  initializeApp
);


function initializeApp() {

  renderNavigation();

  setupSidebar();

  navigateTo('dashboard');

}


function navigateTo(page) {

  document
    .querySelectorAll('.nav-item, .nav-subitem')
    .forEach(item => {

      item.classList.toggle(
        'active',
        item.dataset.page === page
      );

    });


  switch (page) {

    case 'dashboard':

      loadDashboard();

      break;


    default:

      loadComingSoon(page);

  }

}


function loadComingSoon(page) {

  const content =
    document.getElementById('pageContent');

  content.innerHTML = `

    <div class="empty-page">

      <div class="empty-icon">
        🚧
      </div>

      <h1>
        ${page}
      </h1>

      <p>
        This module is under development.
      </p>

    </div>

  `;

}


function setupSidebar() {

  const toggle =
    document.getElementById('sidebarToggle');

  const sidebar =
    document.getElementById('sidebar');

  if (!toggle || !sidebar) return;

  toggle.addEventListener(
    'click',
    () => {

      sidebar.classList.toggle('collapsed');

    }
  );

}
