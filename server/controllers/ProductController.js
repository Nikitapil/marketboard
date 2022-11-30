class ProductController {
  createProduct(req, res) {
    console.log('create');
  }

  getAllProducts(req, res) {
    console.log('get all');
  }

  getSingleProducts(req, res) {
    console.log('get single');
  }
}

export default new ProductController();