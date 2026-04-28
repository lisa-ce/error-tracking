const API_URL = "http://localhost:3000";

const form = document.getElementById("errorForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const message = document.getElementById("message").value;
  const tagsInput = document.getElementById("tags").value;
  const solution = document.getElementById("solution").value;

  const tags = tagsInput
    .split(",")
    .map(tag => tag.trim())
    .filter(tag => tag !== "");

  try {
    const response = await fetch(`${API_URL}/errors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        message,
        tags,
        solution
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    alert("Error logged successfully");
    window.location.href = "index.html";

  } catch (err) {
    console.error("Full error:", err);
    alert("Failed to log error. Check console.");
  }
});