const API_URL = "http://localhost:3000";

const fallbackErrors = [
  {
    title: "React: 'Each child in a list should have a unique key prop'",
    message: "Rendering mapped lists without stable keys causes weird UI bugs and warnings.",
    tags: ["react", "javascript"],
    author: "Lisa Chikovore",
    comments: 3
  },
  {
    title: "Node.js: EADDRINUSE address already in use :::3000",
    message: "Every time my dev server crashes, the port stays bound and I can't restart without rebooting.",
    tags: ["node.js", "javascript"],
    author: "Ngaaruhe Hei",
    comments: 1
  },
  {
    title: "PostgreSQL: 'duplicate key value violates unique constraint'",
    message: "Inserting rows in bulk and one collision kills the whole transaction. I want to skip duplicates and keep going.",
    tags: ["databases"],
    author: "Niita Shilongo",
    comments: 1
  }
];

const errorList = document.getElementById("errorList");
const searchInput = document.querySelector(".search-box input");
const tagButtons = document.querySelectorAll(".tag-list button");

let allErrors = [];

async function loadErrors() {
  try {
    const response = await fetch(`${API_URL}/errors`);
    const data = await response.json();

    allErrors = Object.entries(data).map(([id, error]) => ({
      id,
      ...error
    }));

    if (allErrors.length === 0) {
      allErrors = fallbackErrors;
    }

    displayErrors(allErrors);
  } catch (error) {
    console.log("Backend not connected yet:", error);
    allErrors = fallbackErrors;
    displayErrors(allErrors);
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
        <h3>${error.title || "Untitled error"}</h3>
        <p>${error.message || error.description || "No description added yet."}</p>

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
  const searchValue = searchInput.value.toLowerCase();

  const filteredErrors = allErrors.filter(error => {
    const title = (error.title || "").toLowerCase();
    const message = (error.message || error.description || "").toLowerCase();
    const tags = (error.tags || []).join(" ").toLowerCase();

    return (
      title.includes(searchValue) ||
      message.includes(searchValue) ||
      tags.includes(searchValue)
    );
  });

  displayErrors(filteredErrors);
});

tagButtons.forEach(button => {
  button.addEventListener("click", () => {
    const selectedTag = button.textContent.toLowerCase();

    const filteredErrors = allErrors.filter(error =>
      (error.tags || []).map(tag => tag.toLowerCase()).includes(selectedTag)
    );

    displayErrors(filteredErrors);
  });
});

loadErrors();
