const express = require("express")
const categoryController = require('../controllers/categoryController')

const router = express.Router();

router.route('/').post( categoryController.createCategory) // "/categories/"
router.route('/delete/:catID').delete(categoryController.deleteCategory)
router.route('/update/:catID').put(categoryController.editCategory)


module.exports = router