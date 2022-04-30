const express = require('express');
const router = express.Router();

const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');

exports.createCourse = async (req, res) => {
  try {
    /// eğre bi hata yok ise burayı
    const course = await Course.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      user: req.session.userID,
    }); // req.body ile gönderilen bilgileri Course modeli ile eşleştirip oluşturur. daha sonra course değişeknine atar
    req.flash('success', `Course created: ${course.title}`);
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
    const query = req.query.search;
    
    const category = await Category.findOne({ slug: categorySlug });
    let filter = {};

    if(query){
      filter = {name: query}
    }
    
    if(!query && !categorySlug) {
      filter.name = "",
      filter.category = null
    }

    if (categorySlug) {
      filter = { category: category._id };
    }
    
    const courses = await Course.find({
      $or:[
        {title: { $regex: ".*"+ filter.name + ".*", $options: "i"} },
        {category: filter.category}
      ]
    })
    .populate('user')
    .collation({ locale: 'en', strength: 2 })
    .sort({ title: 1 }); // req.body ile gönderilen bilgileri Course modeli ile eşleştirip oluşturur. daha sonra course değişeknine atar
    console.log(filter.name)
    
    const categories = await Category.find();
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
    const categories = await Category.find();
    const course = await Course.findOne({ slug: req.params.slug }).populate('user');
    const user = await User.findById(req.session.userID)
    res.status(200).render('course', {
      course,
      datenow: JSON.stringify(course.createdAt).slice(1, 11),
      page_name: 'course',
      user,
      categories
    });
  } catch (error) {
    // hata var ise burayı cevap ile gönderir
    res.status('400').json({
      status: 'fail',
      error,
    });
  }
};

exports.enrollCourse = async (req, res) => {
  try {
    
    console.log(req.body.course_id);
    const user = await User.findById(req.session.userID);
    await user.courses.push({ _id: req.body.course_id });
    await user.save();
    req.flash("success", `course enrolled`)
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    // hata var ise burayı cevap ile gönderir
    req.flash("error", `course did not enrolled`)
    res.status(200).redirect('/users/dashboard');
  }
};

exports.relaseCourse = async (req, res) => {
  try {
    console.log(req.body.course_id);
    const user = await User.findById(req.session.userID);
    await user.courses.pull({ _id: req.body.course_id });
    await user.save();
    
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    // hata var ise burayı cevap ile gönderir
    res.status('400').json({
      status: 'fail',
      error,
    });
  }
};

router.get('/123', (req, res) => { });
