import { Router } from 'express';
import { check } from 'express-validator';
import ProductController from '../controllers/ProductController.js';

const router = new Router();

const productsValidators = [
  check('title', 'Title cant be empty').notEmpty()
];

router.post('/product', productsValidators, ProductController.createProduct);
router.put('/product/', productsValidators, ProductController.updateProduct);
router.delete('/product/:id', ProductController.deleteProduct);
router.get('/product/:id', ProductController.getSingleProduct);
router.get('/all_products', ProductController.getAllProducts);

export default router;