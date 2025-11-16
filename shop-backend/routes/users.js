const express = require('express');
const router = express.Router();
const users = require('../controllers/usersControllers');

router.put('/edit-user', users.editUser);

module.exports = router;