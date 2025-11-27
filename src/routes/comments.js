import express from "express";
import prisma from "../db.js";

const router = express.Router();

// GET /api/comments/pending — komentarze niezatwierdzone
router.get("/pending", async (req, res) => {
  const comments = await prisma.comment.findMany({
    where: { approved: false },
    orderBy: { created_at: "asc" },
    include: {
      post: {
        select: { id: true, title: true }
      }
    }
  });

  res.json(comments);
});

// POST /api/posts/:id/comments
router.post("/post/:id", async (req, res) => {
  const postId = Number(req.params.id);
  const { author, body } = req.body;

  if (!author || !body) {
    return res.status(400).json({ error: "Autor i treść są wymagane." });
  }

  const c = await prisma.comment.create({
    data: {
      postId,
      author,
      body,
      approved: false
    }
  });

  res.status(201).json({ approved: 0, comment: c });
});

// POST /api/comments/:id/approve
router.post("/:id/approve", async (req, res) => {
  const id = Number(req.params.id);

  const updated = await prisma.comment.update({
    where: { id },
    data: { approved: true }
  });

  res.json(updated);
});

export default router;
