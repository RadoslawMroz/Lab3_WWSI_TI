import express from "express";
import prisma from "../db.js";

const router = express.Router();

// GET /api/posts
router.get("/", async (req, res) => {
  const posts = await prisma.post.findMany({
    orderBy: { created_at: "desc" }
  });
  res.json(posts);
});

// POST /api/posts
router.post("/", async (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) {
    return res.status(400).json({ error: "Tytuł i treść są wymagane." });
  }

  const post = await prisma.post.create({
    data: { title, body }
  });

  res.status(201).json(post);
});

// GET /api/posts/:id/comments — tylko approved = true
router.get("/:id/comments", async (req, res) => {
  const id = Number(req.params.id);

  const comments = await prisma.comment.findMany({
    where: { postId: id, approved: true },
    orderBy: { created_at: "asc" }
  });

  res.json(comments);
});

export default router;
