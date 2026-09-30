import express from 'express';
import { createBlog, deleteBlog, getAllBlogs, getBlogs, updateBlog } from '../controllers/contentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getBlogs);
router.get('/admin/all', protect, getAllBlogs);
router.post('/', protect, createBlog);
router.put('/:id', protect, updateBlog);
router.delete('/:id', protect, deleteBlog);

export default router;
