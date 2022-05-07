const express = require('express'),
  { body } = require('express-validator');

const authController = require('../controllers/authController');
const User = require('../models/User');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/signup').post(
  [
    body('name').not().isEmpty().withMessage('Lütfen adınız girin'),
    body('password').not().isEmpty().withMessage('Lütfen şifre giriniz'),
    body('email')
      .isEmail()
      .withMessage('Lütfen Email giriniz')
      .custom((value) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject('E-mail already in use');
          }
        });
      }),
  ],
  authController.createUser
); 

router
  .route('/login')
  .post(
    body('password').not().isEmpty().withMessage('Lütfen şifre giriniz'),
    body('email').isEmail().withMessage('Lütfen Email giriniz'),
    authController.userLogin
  );
router.route('/logout').get(authController.userLogout);
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage);
router.route('/delete/:userID').delete(authController.deleteUser)
router.route('/update/:userID').put(authController.updateUser)
module.exports = router;
