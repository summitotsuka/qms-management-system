async function testBackend() {

  const resultElement = document.getElementById('result');

  resultElement.textContent = 'Connecting to backend...';

  try {

    const response = await fetch(
      CONFIG.API_URL + '?action=ping'
    );

    if (!response.ok) {
      throw new Error(
        `HTTP Error: ${response.status}`
      );
    }

    const result = await response.json();

    console.log('Backend Response:', result);

    if (result.success) {

      resultElement.innerHTML = `
        <div class="success">
          <h3>Backend Connected ✓</h3>

          <p>
            <strong>Application:</strong>
            ${result.data.app}
          </p>

          <p>
            <strong>Version:</strong>
            ${result.data.version}
          </p>

          <p>
            <strong>Server Time:</strong>
            ${result.data.timestamp}
          </p>
        </div>
      `;

    } else {

      resultElement.innerHTML = `
        <div class="error">
          Backend Error:
          ${result.message}
        </div>
      `;
    }

  } catch (error) {

    console.error(error);

    resultElement.innerHTML = `
      <div class="error">
        <h3>Connection Error</h3>
        <p>${error.message}</p>
      </div>
    `;
  }
}
