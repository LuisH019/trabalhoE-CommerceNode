var express = require('express');
var router = express.Router();

const auth = require('../auth');

const db = require('../models');

const PaymentService = require('../services/paymentServices');
const PaymentController = require('../controllers/paymentController');

const paymentService = new PaymentService(db.Payment, db.CartItem);
const paymentController = new PaymentController(paymentService);

router.get('/', auth.verifyToken, function(req, res) {
  res.send('modulo de usuarios ta funfando 👍');
});

router.post('/pix', auth.verifyToken, async (req, res)=>{
  paymentController.paymentByPix(req, res);
});

router.post('/creditCard', auth.verifyToken, async (req, res)=>{
  paymentController.paymentByCreditCard(req, res);
});

router.get('/status', auth.verifyToken, async (req, res)=>{
  paymentController.getTransaction(req, res)
});

module.exports = router;
