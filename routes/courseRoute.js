const express = require("express")
const courseController = require('../controllers/courseController')
const roleMiddleware = require('../middlewares/roleMiddleware')

const router = express.Router();

router.route('/').post( roleMiddleware(['admin', 'teacher']), courseController.createCourse)
router.route('/').get( courseController.getAllCourses)
router.route('/:slug').get(courseController.getCourse)
router.route('/enroll').post( courseController.enrollCourse)
router.route('/relase').post( courseController.relaseCourse)
router.route('/:slug').delete(courseController.deleteCourse)
router.route('/:slug').put(courseController.updateCourse)

module.exports = router