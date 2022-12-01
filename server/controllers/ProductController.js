import {validationResult} from 'express-validator';
import Product from '../models/Product.js';

class ProductController {
  async createProduct(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
       return res.status(400).json({errorMessage: errors.errors[0].msg });
      }
      const product = new Product(req.body);
      const createdProduct = await product.save();
      return res.status(200).json(createdProduct);
    } catch (e) {
      console.error(e);
      return res.status(400).json({ errorMessage: 'Creating error'});
    }
  }

  async getAllProducts(req, res) {
    try {
      const {limit = 10, page = 1} = req.query;
      const products = await Product.find().limit(limit).skip((page - 1) * limit).sort({'updatedAt': -1});
      const totalCount = await  Product.countDocuments();
      const totalPages = Math.ceil(totalCount / limit);
      return res.status(200).json({ products, totalPages, totalCount });
    } catch (e) {
      console.error(e);
      return res.status(400).json({errorMessage: 'Get all products error'});
    }
  }

  async getSingleProduct(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
       return res.status(400).json({errorMessage: 'id is empty'});
      }
      const product = await Product.findById(id);
      if (!product) {
       return res.status(404).json({errorMessage: `No product with id: ${id}`
      });
      }
     return res.status(200).json(product);
    } catch (e) {
      console.error(e);
     return res.status(400).json({errorMessage: 'Get product Error'});
    }
  }

  async updateProduct(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
       return res.status(400).json({errorMessage: errors.errors[0].msg });
      }
      const product = req.body;
      const updatedProduct = await Product.findByIdAndUpdate(product._id, product, {new: true});
      if (!updatedProduct) {
       return res.status(404).json({ errorMessage: 'product not found' });
      }
     return res.status(200).json(updatedProduct);
    } catch (e) {
      console.error(e);
     return res.status(400).json({ errorMessage: 'Updating error'});
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
       return res.status(400).json({errorMessage: 'id is empty'});
      }
      const product = await Product.findByIdAndDelete(id);
     return res.status(200).json({_id: product._id});
    } catch (e) {
      console.error(e);
     return res.status(400).json({ errorMessage: 'Delete error'});
    }
  }
}

export default new ProductController();