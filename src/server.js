import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import postsRouter from "./routes/posts.js";
import commentsRouter from "./routes/comments.js";

const app = express();
app.use(cors());
app.use(express.json());

// static frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/posts", postsRouter);
app.use("/api/comments", commentsRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Blog running at http://localhost:${PORT}`));
