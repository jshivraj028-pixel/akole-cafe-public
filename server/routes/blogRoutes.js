import express from 'express';
import Blog from '../models/Blog.js';

const router = express.Router();

// GET all blogs from MongoDB
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog posts', error: error.message });
  }
});

// GET single blog by slug or ID
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ $or: [{ slug: req.params.slug }, { _id: req.params.slug }] });
    if (!blog) return res.status(404).json({ message: 'Blog post not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog post', error: error.message });
  }
});

// POST create blog post (Admin)
router.post('/', async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog post', error: error.message });
  }
});

export default router;
