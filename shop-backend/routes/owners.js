const express = require('express');
const router = express.Router();
const owners = require('../controllers/ownersControllers');

router.post('/find-owner', owners.findOwners);
router.post('/add-product', owners.addProduct);
router.delete('/delete-product', owners.deleteProduct);
router.put('/edit-product', owners.editProduct);
router.put('/edit-owner', owners.editOwner);

module.exports = router;