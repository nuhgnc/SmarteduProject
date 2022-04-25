const express = require('express');
const router = express.Router();

router.get('');

const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
  try {
    /// eğre bi hata yok ise burayı
    const course = await Course.create(req.body); // req.body ile gönderilen bilgileri Course modeli ile eşleştirip oluşturur. daha sonra course değişeknine atar
    res.status(201).json({
      status: 'success',
      course,
    });
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
    /// eğre bi hata yok ise burayı
    const courses = await Course.find(); // req.body ile gönderilen bilgileri Course modeli ile eşleştirip oluşturur. daha sonra course değişeknine atar
    res.status(200).render('courses', {
      courses: courses,
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
