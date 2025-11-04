import express from 'express';
import { moodboardController } from '../controllers/moodboardController';

const router = express.Router();

router.post('/generate', moodboardController.generateMoodboard);
router.post('/proactive-style', moodboardController.proactiveStyleGenerator);

export default router;

