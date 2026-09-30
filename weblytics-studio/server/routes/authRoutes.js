import express from 'express';
import { body, validationResult } from 'express-validator';
import { getCurrentAdmin, loginAdmin, logoutAdmin } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Enter a valid email.'),
    body('password').notEmpty().withMessage('Password is required.'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  loginAdmin
);

router.get('/me', protect, getCurrentAdmin);
router.post('/logout', logoutAdmin);

export default router;
