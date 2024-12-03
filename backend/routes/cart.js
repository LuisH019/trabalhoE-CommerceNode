var express = require('express');
var router = express.Router();

const auth = require('../auth');

const db = require('../models');

const CartService = require('../services/cartServices');
const CartController = require('../controllers/cartController');

const cartService = new CartService(db.User, db.CartItem, db.Product);
const cartController = new CartController(cartService);

router.get('/', auth.verifyToken, function(req, res) {
  cartController.findAllItems(req, res)
});

router.post('/addItem', auth.verifyToken, async (req, res)=>{
  cartController.addItem(req, res);
});

router.delete('/removeItem', auth.verifyToken, async (req, res)=>{
  cartController.removeItem(req, res);
});

module.exports = router;
