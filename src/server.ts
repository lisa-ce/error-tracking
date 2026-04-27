import express from "express";
import cors from "cors";
import {db} from "./firebase";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

/**
 * GET all errors
 */
app.get("/errors", async (req, res) => {
  const snapshot = await db.ref("errors").once("value");
  res.json(snapshot.val() || {});
});

/**
 * POST new error
 */
app.post("/errors", async (req, res) => {
  const newError = db.ref("errors").push();

  await newError.set({
    title: req.body.title,
    message: req.body.message,
    tags: req.body.tags || [],
    solution: req.body.solution,
    createdAt: new Date().toISOString()
  });

  res.json({ id: newError.key });
});

/**
 * DELETE error
 */
app.delete("/errors/:id", async (req, res) => {
  await db.ref(`errors/${req.params.id}`).remove();
  res.json({ message: "Deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});