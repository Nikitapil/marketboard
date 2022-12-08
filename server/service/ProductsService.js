import Product from '../models/Product.js';
import ApiError from '../exceptions/api-error.js';

class ProductsService {
  async createProduct(product) {
    const newProduct = await Product.create(product);
    return newProduct;
  }
  
  async getAllProducts(limit, page) {
    const products = await Product.find().limit(limit).skip((page - 1) * limit).sort({'updatedAt': -1});
    const totalCount = await  Product.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);
    return {products, totalCount, totalPages};
  }

  async getSingleProduct(id) {
    const product = await Product.findById(id);
    if (!product) {
      throw ApiError.BadRequest(`No product with id: ${id}`);
    }
    return product;
  }
  
  async updateProduct(product) {
    const updatedProduct = await Product.findByIdAndUpdate(product._id, product, {new: true});
    if (!updatedProduct) {
      throw ApiError.BadRequest('Product not found');
    }
    return updatedProduct;
  }

  async deleteProduct(id, userId) {
    const productToDelete = await Product.findById(id);
    if (productToDelete.userId.toString() !== userId) {
      throw ApiError.ForbiddenError();
    }
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      throw ApiError.BadRequest('Product not found');
    }
    return product;
  }

  async getMyProducts(id, limit, page) {
    const products = await Product.find({userId: id}).limit(limit).skip((page - 1) * limit).sort({'updatedAt': -1});
    const totalCount = await  Product.countDocuments({userId: id});
    const totalPages = Math.ceil(totalCount / limit);
    return {products, totalCount, totalPages};
  }

}

export default new ProductsService();
