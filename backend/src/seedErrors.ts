import { db } from "./firebase";

const errors = [
  {
    title: "HTTP 404 Not Found",
    message: "The browser requested a page or resource that does not exist on the server.",
    solution: "Check the URL, route name, file path, or backend endpoint.",
    tags: ["internet", "http", "browser"],
    chapter: "Chapter 1: How the Internet Works",
    author: "Stackr Curriculum"
  },
  {
    title: "CORS Policy Blocked Request",
    message: "The frontend tried to access the backend, but the browser blocked the request because of CORS rules.",
    solution: "Enable CORS in your backend using cors() and make sure the frontend URL is allowed.",
    tags: ["internet", "javascript", "node.js"],
    chapter: "Chapter 1: How the Internet Works",
    author: "Stackr Curriculum"
  },
  {
    title: "Uncaught TypeError: Cannot read properties of undefined",
    message: "JavaScript tried to access a property from a variable that is undefined.",
    solution: "Check if the variable exists before using it. Use optional chaining or condition checks.",
    tags: ["javascript"],
    chapter: "Chapter 2: Interactivity and User Experience",
    author: "Stackr Curriculum"
  },
  {
    title: "Form submits but page keeps refreshing",
    message: "The form reloads the page before JavaScript can handle the submitted data.",
    solution: "Use event.preventDefault() inside the submit event listener.",
    tags: ["javascript", "forms"],
    chapter: "Chapter 2: Interactivity and User Experience",
    author: "Stackr Curriculum"
  },
  {
    title: "CSS not applying to HTML page",
    message: "The page loads but the styles are missing.",
    solution: "Check that the CSS file path in the link tag is correct and that class names match.",
    tags: ["html", "css"],
    chapter: "Chapter 3: HTML & CSS",
    author: "Stackr Curriculum"
  },
  {
    title: "Image not displaying on webpage",
    message: "The image icon appears broken or the image does not show.",
    solution: "Check the image file path, spelling, file extension, and folder location.",
    tags: ["html", "css"],
    chapter: "Chapter 3: HTML & CSS",
    author: "Stackr Curriculum"
  },
  {
    title: "fatal: not a git repository",
    message: "Git command was run in a folder that is not initialized as a Git repository.",
    solution: "Run git init or cd into the correct project folder.",
    tags: ["git", "github"],
    chapter: "Chapter 4: Version Control & Hosting",
    author: "Stackr Curriculum"
  },
  {
    title: "Permission denied when pushing to GitHub",
    message: "GitHub rejected the push because authentication failed.",
    solution: "Login again, use a personal access token, or set up your SSH key.",
    tags: ["git", "github", "hosting"],
    chapter: "Chapter 4: Version Control & Hosting",
    author: "Stackr Curriculum"
  },
  {
    title: "Bootstrap styles not loading",
    message: "Bootstrap components appear plain because the CSS file is not loaded.",
    solution: "Add the correct Bootstrap CDN link in the head section.",
    tags: ["css", "bootstrap"],
    chapter: "Chapter 5: Building Dynamic Websites",
    author: "Stackr Curriculum"
  },
  {
    title: "Website layout breaks on mobile",
    message: "The layout looks good on desktop but becomes messy on small screens.",
    solution: "Use responsive CSS, flexbox, grid, and media queries.",
    tags: ["css", "responsive"],
    chapter: "Chapter 5: Building Dynamic Websites",
    author: "Stackr Curriculum"
  },
  {
    title: "Type 'string' is not assignable to type 'number'",
    message: "TypeScript detected that a string value was assigned where a number was expected.",
    solution: "Convert the value to a number or change the variable type.",
    tags: ["typescript"],
    chapter: "Chapter 6: TypeScript",
    author: "Stackr Curriculum"
  },
  {
    title: "Parameter implicitly has an 'any' type",
    message: "TypeScript does not know the type of a function parameter.",
    solution: "Add a type annotation to the parameter.",
    tags: ["typescript"],
    chapter: "Chapter 6: TypeScript",
    author: "Stackr Curriculum"
  },
  {
    title: "Duplicate key value violates unique constraint",
    message: "The database rejected an insert because a unique value already exists.",
    solution: "Check if the record exists before inserting or use an upsert strategy.",
    tags: ["databases", "sql"],
    chapter: "Chapter 7: Databases",
    author: "Stackr Curriculum"
  },
  {
    title: "Database connection refused",
    message: "The app cannot connect to the database server.",
    solution: "Check if the database is running and confirm host, port, username, and password.",
    tags: ["databases", "backend"],
    chapter: "Chapter 7: Databases",
    author: "Stackr Curriculum"
  },
  {
    title: "React: Each child in a list should have a unique key prop",
    message: "React needs stable keys when rendering lists.",
    solution: "Add a unique key prop to each mapped item.",
    tags: ["react", "javascript"],
    chapter: "Chapter 8: React",
    author: "Stackr Curriculum"
  },
  {
    title: "React: Too many re-renders",
    message: "The component keeps updating state and rendering repeatedly.",
    solution: "Do not call state setters directly inside the render body.",
    tags: ["react", "javascript"],
    chapter: "Chapter 8: React",
    author: "Stackr Curriculum"
  },
  {
    title: "Node.js: EADDRINUSE address already in use",
    message: "The port is already being used by another process.",
    solution: "Stop the running process or use a different port.",
    tags: ["node.js", "backend"],
    chapter: "Chapter 9: Node.js",
    author: "Stackr Curriculum"
  },
  {
    title: "req.body is undefined",
    message: "Express cannot read the request body.",
    solution: "Add app.use(express.json()) before your routes.",
    tags: ["node.js", "express"],
    chapter: "Chapter 9: Node.js",
    author: "Stackr Curriculum"
  }
];

async function seedErrors() {
  try {
    const ref = db.ref("errors");

    for (const error of errors) {
      await ref.push({
        ...error,
        comments: 0,
        createdAt: new Date().toISOString()
      });
    }

    console.log("✅ Curriculum errors added successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to seed errors:", error);
    process.exit(1);
  }
}

seedErrors();