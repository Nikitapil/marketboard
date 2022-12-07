import {validationResult} from 'express-validator';
import ApiError from '../exceptions/api-error.js';
import productsService from '../service/ProductsService.js';

class ProductController {
  async createProduct(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
       return next(ApiError.BadRequest('Validation error', errors.array()));
      }
      const product = await productsService.createProduct(req.body);
      return res.status(200).json(product);
    } catch (e) {
      return next(e);
    }
  }

  async getAllProducts(req, res, next) {
    try {
      const {limit = 9, page = 1} = req.query;
      const productsData = await productsService.getAllProducts(limit, page);
      return res.status(200).json(productsData);
    } catch (e) {
      return next(e);
    }
  }

  async getSingleProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await productsService.getSingleProduct(id);
      return res.status(200).json(product);
    } catch (e) {
     return next(e);
    }
  }

  async updateProduct(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
       return next(ApiError.BadRequest('Validation error', errors.array()));
      }
      const product = req.body;
      const updatedProduct = await productsService.updateProduct(product);
     return res.status(200).json(updatedProduct);
    } catch (e) {
     return next(e);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await productsService.deleteProduct(id);
     return res.status(200).json({_id: product._id});
    } catch (e) {
     return next(e);
    }
  }
}

export default new ProductController();