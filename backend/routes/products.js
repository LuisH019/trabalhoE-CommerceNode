var express = require('express');
var router = express.Router();

const auth = require('../auth');

const db = require('../models');

const ProductService = require('../services/productServices');
const ProductController = require('../controllers/productController');

const productService = new ProductService(db.Product);
const productController = new ProductController(productService);

router.get('/', function(req, res, next) {
  productController.findAllProducts(req, res);
});

router.post('/newProduct', auth.verifyToken, async (req, res)=>{
  productController.createProduct(req, res);
});

router.get('/getProductById', async (req, res)=>{
  productController.findProductById(req, res);
});

router.put('/updateProduct', auth.verifyToken, async (req, res)=>{
  productController.updateProduct(req, res);
});

router.delete('/deleteProduct', auth.verifyToken, async (req, res)=>{
  productController.deleteProduct(req, res);
});

module.exports = router;
