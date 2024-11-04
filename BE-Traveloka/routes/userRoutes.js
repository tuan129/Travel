const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/user').get(authController.getAllUsers);
router.route('/login').post(authController.login);
router.route('/register').post(authController.register);

module.exports = router;
