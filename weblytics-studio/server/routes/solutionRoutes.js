import express from 'express';
import {
  createSolution,
  deleteSolution,
  getSolutions,
  updateSolution,
} from '../controllers/contentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getSolutions);
router.post('/', protect, createSolution);
router.put('/:id', protect, updateSolution);
router.delete('/:id', protect, deleteSolution);

export default router;
