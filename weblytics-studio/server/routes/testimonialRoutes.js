import express from 'express';
import { createTestimonial, deleteTestimonial, getTestimonials, updateTestimonial } from '../controllers/contentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getTestimonials);
router.post('/', protect, createTestimonial);
router.put('/:id', protect, updateTestimonial);
router.delete('/:id', protect, deleteTestimonial);

export default router;
