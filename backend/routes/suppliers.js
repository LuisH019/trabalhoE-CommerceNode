var express = require('express');
var router = express.Router();

const auth = require('../auth');

const db = require('../models');

const SupplierService = require('../services/supplierServices');
const SupplierController = require('../controllers/supplierController');

const supplierService = new SupplierService(db.Supplier);
const supplierController = new SupplierController(supplierService);

router.get('/', function(req, res, next) {
  supplierController.findAllSuppliers(req, res);
});

router.post('/newSupplier', auth.verifyToken, async (req, res)=>{
  supplierController.createSupplier(req, res);
});

router.get('/getSupplierById', async (req, res)=>{
  supplierController.findSupplierById(req, res);
});

router.put('/updateSupplier', auth.verifyToken, async (req, res)=>{
  supplierController.updateSupplier(req, res);
});

router.delete('/deleteSupplier', auth.verifyToken, async (req, res)=>{
  supplierController.deleteSupplier(req, res);
});

module.exports = router;
