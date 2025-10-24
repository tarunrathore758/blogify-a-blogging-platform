import express from "express";
import Blog from "../models/Blog.js";

const router = express.Router();

/**
 * @route   GET /api/blogs/test
 * @desc    Test route
 */
router.get("/test", (req, res) => {
  res.send("Blogs route working ✅");
});

/**
 * @route   GET /api/blogs
 * @desc    Get all blogs
 */
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route   POST /api/blogs
 * @desc    Create a new blog
 */
router.post("/", async (req, res) => {
  try {
    const { title, content, author } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const blog = new Blog({
      title,
      content,
      author: author || "Anonymous",
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @route   PUT /api/blogs/:id
 * @desc    Update a blog
 */
router.put("/:id", async (req, res) => {
  try {
    const { title, content } = req.body;

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!blog) return res.status(404).json({ error: "Blog not found" });

    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @route   DELETE /api/blogs/:id
 * @desc    Delete a blog
 */
router.delete("/:id", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) return res.status(404).json({ error: "Blog not found" });

    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route   PATCH /api/blogs/:id/like
 * @desc    Increment blog likes
 */
router.patch("/:id/like", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!blog) return res.status(404).json({ error: "Blog not found" });

    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route   POST /api/blogs/:id/comment
 * @desc    Add a comment to a blog
 */
router.post("/:id/comment", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Comment text is required" });

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: text } },
      { new: true }
    );

    if (!blog) return res.status(404).json({ error: "Blog not found" });

    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
