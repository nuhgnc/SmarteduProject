const express = require('express');
const router = express.Router();

const Course = require('../models/Course');
const Category = require('../models/Category');

exports.createCourse = async (req, res) => {
  try {
    /// eğre bi hata yok ise burayı
    const course = await Course.create(req.body); // req.body ile gönderilen bilgileri Course modeli ile eşleştirip oluşturur. daha sonra course değişeknine atar
    res.status(201).redirect('/courses');
  } catch (error) {
    // hata var ise burayı cevap ile gönderir
    res.status('400').json({
      status: 'fail',
      error,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {

    const categorySlug = req.query.category;
    const category = await Category.findOne({slug:categorySlug})
    let filter = {}
    if(categorySlug){
      filter = {category:category._id}
    }
    const categories = await Category.find()
    const courses = await Course.find(filter).collation({locale:'en',strength: 2}).sort({title:1}) // req.body ile gönderilen bilgileri Course modeli ile eşleştirip oluşturur. daha sonra course değişeknine atar
    res.status(200).render('courses', {
      courses: courses,
      categories,
      page_name: 'courses',
    });
  } catch (error) {
    // hata var ise burayı cevap ile gönderir
    res.status('400').json({
      status: 'fail',
      error,
    });
  }
};

 exports.getCourse = async (req, res) => {
    try {
      /// eğre bi hata yok ise burayı
      const course = await Course.findOne({slug:req.params.slug}); // req.body ile gönderilen bilgileri Course modeli ile eşleştirip oluşturur. daha sonra course değişeknine atar
      res.status(200).render('course', {
        course,
        datenow: JSON.stringify( course.createdAt ).slice(1,11),
        page_name: 'course',
      });
    } catch (error) {
      // hata var ise burayı cevap ile gönderir
      res.status('400').json({
        status: 'fail',
        error,
        
      });
    }
  };
   

router.get('/123', (req,res) => {

});