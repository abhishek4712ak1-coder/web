import express from 'express';
import { createFAQ, deleteFAQ, getFAQs, updateFAQ } from '../controllers/contentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getFAQs);
router.post('/', protect, createFAQ);
router.put('/:id', protect, updateFAQ);
router.delete('/:id', protect, deleteFAQ);

export default router;
