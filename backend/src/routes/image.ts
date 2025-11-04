import express from 'express';
import { imageController } from '../controllers/imageController';

const router = express.Router();

router.post('/validate', imageController.validateImage);

export default router;

