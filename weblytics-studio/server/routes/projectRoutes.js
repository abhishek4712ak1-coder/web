import express from 'express';
import { createProject, deleteProject, getAllProjects, getProjects, updateProject } from '../controllers/contentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getProjects);
router.get('/admin/all', protect, getAllProjects);
router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

export default router;
