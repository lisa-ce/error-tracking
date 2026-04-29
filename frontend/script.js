const API_URL = "http://localhost:3000";

const errorList = document.getElementById("errorList");
const searchInput = document.querySelector(".search-box input");
const tagButtons = document.querySelectorAll(".tag-list button");

let allErrors = [];

async function loadErrors() {
  try {
    const response = await fetch(`${API_URL}/errors`);
    const data = await response.json();

    allErrors = Object.entries(data || {}).map(([id, error]) => ({
      id,
      ...error
    }));

    displayErrors(allErrors);
  } catch (error) {
    console.error("Failed to load errors:", error);
    errorList.innerHTML = `<p class="empty-message">Could not load errors.</p>`;
  }
}

function displayErrors(errors) {
  errorList.innerHTML = "";

  if (errors.length === 0) {
    errorList.innerHTML = `<p class="empty-message">No errors found.</p>`;
    return;
  }

  errors.forEach(error => {
    const card = document.createElement("div");
    card.className = "error-card";

    card.innerHTML = `
      <div class="error-content">
        <span class="status">Solved</span>
        <h3>${error.title}</h3>
        <p>${error.message}</p>

        <div>
          ${(error.tags || []).map(tag => `<span class="tag">${tag}</span>`).join("")}
        </div>

        <div class="meta">
          by <strong>${error.author || "Anonymous"}</strong> &nbsp; 💬 ${error.comments || 0}
        </div>
      </div>
    `;

    errorList.appendChild(card);
  });
}

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  const filtered = allErrors.filter(error =>
    (error.title || "").toLowerCase().includes(value) ||
    (error.message || "").toLowerCase().includes(value) ||
    (error.tags || []).join(" ").toLowerCase().includes(value)
  );

  displayErrors(filtered);
});

tagButtons.forEach(button => {
  button.addEventListener("click", () => {
    const tag = button.textContent.toLowerCase();

    const filtered = allErrors.filter(error =>
      (error.tags || []).map(t => t.toLowerCase()).includes(tag)
    );

    displayErrors(filtered);
  });
});

loadErrors();