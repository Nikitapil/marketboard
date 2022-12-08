import { Router } from 'express';
import { check } from 'express-validator';
import ProductController from '../controllers/ProductController.js';
import authMiddleware from '../middlewares/auth-middleware.js';

const router = new Router();

const productsValidators = [
  check('title', 'Title cant be empty').notEmpty()
];

router.post('/product', productsValidators, authMiddleware, ProductController.createProduct);
router.put('/product/', productsValidators, authMiddleware, ProductController.updateProduct);
router.delete('/product/:id',authMiddleware, ProductController.deleteProduct);
router.get('/product/:id', ProductController.getSingleProduct);
router.get('/all_products', ProductController.getAllProducts);
router.get('/all_my_products',authMiddleware, ProductController.getMyProducts);

export default router;