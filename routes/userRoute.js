const express = require('express');
const authController = require('../controllers/authController');

const authMiddleware = require('../middlewares/authMiddleware')


const router = express.Router();

router.route('/signup').post( authController.createUser);
router.route('/login').post( authController.userLogin);
router.route('/logout').get( authController.userLogout)
//router.route('/dashboard').get( authMiddleware, authController.getDashboardPage)
router.route('/dashboard').get( authController.getDashboardPage)

module.exports = router;