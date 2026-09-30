import express from 'express';
import { getWebsiteSettings, updateWebsiteSettings } from '../controllers/settingsController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getWebsiteSettings);
router.put('/', protect, updateWebsiteSettings);

export default router;
