import express from 'express';
import { body, validationResult } from 'express-validator';
import { createContactMessage } from '../controllers/leadController.js';

const router = express.Router();

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required.'),
    body('email').isEmail().withMessage('Valid email is required.'),
    body('message').notEmpty().withMessage('Message is required.'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createContactMessage
);

export default router;
