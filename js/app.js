document.addEventListener(
  'DOMContentLoaded',
  initializeApp
);


async function initializeApp() {

  showSessionLoading();
  
  const token =
    AUTH.getToken();


  if (!token) {

    showLogin();

    return;

  }


  try {

    const session =
      await API.post(
        'validateSession',
        {
          token
        }
      );


    setCurrentUser(
      session
    );


    showApp();

  } catch (error) {

    console.warn(
      'Session validation failed:',
      error
    );


    AUTH.clearSession();

    showLogin();

  }

}


function showLogin() {

  const loginScreen =
    document.getElementById(
      'loginScreen'
    );

  const app =
    document.querySelector(
      '.app'
    );


  if (loginScreen) {

    loginScreen.style.display =
      'flex';

  }


  if (app) {

    app.style.display =
      'none';

  }


  setupLoginForm();

}


function showApp() {

  const loginScreen =
    document.getElementById(
      'loginScreen'
    );

  const app =
    document.querySelector(
      '.app'
    );


  if (loginScreen) {

    loginScreen.style.display =
      'none';

  }


  if (app) {

    app.style.display =
      'flex';

  }


  setCurrentUser(
    AUTH.getUser()
  );


  renderNavigation();

  setupSidebar();

  navigateTo('dashboard');

}


function setupLoginForm() {

  const form =
    document.getElementById(
      'loginForm'
    );


  if (!form) return;


  form.addEventListener(
    'submit',
    handleLogin
  );

}


async function handleLogin(event) {

  event.preventDefault();


  const username =
    document
      .getElementById(
        'loginUsername'
      )
      .value
      .trim();


  const password =
    document
      .getElementById(
        'loginPassword'
      )
      .value;


  const button =
    document.getElementById(
      'loginButton'
    );


  const errorBox =
    document.getElementById(
      'loginError'
    );


  errorBox.hidden = true;

  errorBox.textContent = '';


  button.disabled = true;

  button.textContent =
    'Signing in...';


  try {

    const data =
      await AUTH.login(
        username,
        password
      );


    setCurrentUser(
      data.user
    );


    showApp();


  } catch (error) {

    console.error(
      'Login error:',
      error
    );


    errorBox.textContent =
      error.message ||
      'Invalid username or password.';

    errorBox.hidden =
      false;


    button.disabled =
      false;

    button.textContent =
      'LOGIN';

  }

}


function setCurrentUser(user) {

  const usernameElement =
    document.getElementById(
      'currentUsername'
    );


  const roleElement =
    document.getElementById(
      'currentRole'
    );


  if (!user) {

    if (usernameElement) {
      usernameElement.textContent =
        'Guest User';
    }

    if (roleElement) {
      roleElement.textContent =
        'Not Logged In';
    }

    return;

  }


  if (usernameElement) {

    usernameElement.textContent =
      user.username || 'User';

  }


  if (roleElement) {

    roleElement.textContent =
      user.roleId || '';

  }

}


function navigateTo(page) {

  document
    .querySelectorAll(
      '.nav-item, .nav-subitem'
    )
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
    document.getElementById(
      'pageContent'
    );


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
    document.getElementById(
      'sidebarToggle'
    );


  const sidebar =
    document.getElementById(
      'sidebar'
    );


  if (!toggle || !sidebar) {
    return;
  }


  toggle.addEventListener(
    'click',
    () => {

      sidebar.classList.toggle(
        'collapsed'
      );

    }
  );

}

function showSessionLoading() {

  const loading =
    document.getElementById(
      'sessionLoading'
    );


  if (loading) {

    loading.style.display =
      'flex';

  }

}


function hideSessionLoading() {

  const loading =
    document.getElementById(
      'sessionLoading'
    );


  if (loading) {

    loading.style.display =
      'none';

  }

}
