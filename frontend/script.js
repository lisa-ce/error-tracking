const errors = [
  {
    votes: 211,
    title: "React: 'Each child in a list should have a unique key prop'",
    description: "Rendering mapped lists without stable keys causes weird UI bugs and warnings.",
    tags: ["react", "javascript"],
    author: "Maya Chen",
    comments: 3,
    views: "6,431",
    time: "2 hours ago"
  },
  {
    votes: 143,
    title: "Node.js: EADDRINUSE address already in use :::3000",
    description: "Every time my dev server crashes, the port stays bound and I can't restart without rebooting.",
    tags: ["node.js", "javascript"],
    author: "Jonas Weber",
    comments: 1,
    views: "4,221",
    time: "5 hours ago"
  },
  {
    votes: 76,
    title: "PostgreSQL: 'duplicate key value violates unique constraint'",
    description: "Inserting rows in bulk and one collision kills the whole transaction. I want to skip duplicates and keep going.",
    tags: ["databases"],
    author: "Olu Bankole",
    comments: 1,
    views: "3,318",
    time: "12 hours ago"
  }
];

const errorList = document.getElementById("errorList");

errors.forEach(error => {
  const card = document.createElement("div");
  card.className = "error-card";

  card.innerHTML = `
    <div class="votes">
      ↑
      <strong>${error.votes}</strong>
      <small>VOTES</small>
    </div>

    <div class="error-content">
      <span class="status">✓ Solved</span>
      <h3>${error.title}</h3>
      <p>${error.description}</p>

      <div>
        ${error.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
      </div>

      <div class="meta">
        by <strong>${error.author}</strong> &nbsp; 💬 ${error.comments} &nbsp; 👁 ${error.views} &nbsp; ${error.time}
      </div>
    </div>
  `;

  errorList.appendChild(card);
});