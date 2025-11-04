import express from 'express';
import { productController } from '../controllers/productController';

const router = express.Router();

router.get('/search', productController.searchProducts);

export default router;

