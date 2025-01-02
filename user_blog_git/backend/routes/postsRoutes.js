// routes/postsRoutes.js
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');         // Path to your Post model
const authMiddleware = require('../middleware/authMiddleware'); // Verifies JWT

/**
 * @route   GET /api/posts
 * @desc    Get all posts
 * @access  Public (or you can make it private if you want only logged in users to see posts)
 */
router.get('/', async (req, res) => {
  try {
    // Populate the 'user' field to get user info (like username)
    const posts = await Post.find().populate('user', 'username');
    res.json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/posts/:id
 * @desc    Get a single post by ID
 * @access  Public (or private, up to you)
 */
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('user', 'username');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.error('Error fetching post:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   POST /api/posts
 * @desc    Create a new post
 * @access  Private (requires authMiddleware)
 */
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;

    // Basic validation
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    // Create new post linked to the logged-in user
    const newPost = new Post({
      title,
      content,
      user: req.user.id, // from authMiddleware (decoded JWT)
    });
    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   PATCH /api/posts/:id
 * @desc    Update a post by ID
 * @access  Private (requires authMiddleware)
 */
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;

    // Find the post
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the logged-in user is the post owner
    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    // Update the fields if provided
    if (title) post.title = title;
    if (content) post.content = content;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   DELETE /api/posts/:id
 * @desc    Delete a post by ID
 * @access  Private (requires authMiddleware)
 */
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the logged-in user is the post owner
    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await post.remove();
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
