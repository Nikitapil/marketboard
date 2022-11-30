import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const router = new Router();

router.post('/product', ProductController.createProduct);
router.get('/product/:id', ProductController.getSingleProducts);
router.get('all_products', ProductController.getAllProducts);

export default router;