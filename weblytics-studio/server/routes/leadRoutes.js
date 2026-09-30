import express from 'express';
import { body, validationResult } from 'express-validator';
import { deleteLead, getLeadStats, getLeads, submitLead, updateLead } from '../controllers/leadController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/stats', protect, getLeadStats);
router.get('/', protect, getLeads);
router.patch('/:id', protect, updateLead);
router.delete('/:id', protect, deleteLead);

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required.'),
    body('email').isEmail().withMessage('Valid email is required.'),
    body('serviceRequired').notEmpty().withMessage('Service is required.'),
    body('projectDescription').notEmpty().withMessage('Project description is required.'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  submitLead
);

export default router;
