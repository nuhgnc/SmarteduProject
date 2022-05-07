const bcrypt = require('bcrypt'),
  { validationResult } = require('express-validator');

const Course = require('../models/Course');
const User = require('../models/User');
const Category = require('../models/Category');

exports.createUser = async (req, res) => {
  try {
    /// eğre bi hata yok ise burayı
    const user = await User.create(req.body); // req.body ile gönderilen bilgileri Course modeli ile eşleştirip oluşturur. daha sonra course değişeknine atar
    res.status(201).redirect('/login');
  } catch (error) {
    // hata var ise burayı cevap ile gönderir
    const errors = validationResult(req);
    errors.errors.forEach((element) => {
      req.flash('error', ` ${element.msg} `);
    });

    res.status(400).redirect('/register');
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          // USER SESSION
          req.session.userID = user._id;
          res.status(200).redirect('/users/dashboard');
        } else {
          req.flash('passwordErr', 'Parolanız hatalı!');
          res.status(400).redirect('/login');
        }
      });
    } else {
      const errors = validationResult(req);
      errors.errors.forEach((element) => {
        req.flash('error', ` ${element.msg} `);
      });

      res.status(400).redirect('/login');
    }
  } catch (err) {
    console.log(err);
  }
};

exports.userLogout = async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

exports.getDashboardPage = async (req, res) => {
  const categories = await Category.find({});
  const allUsers = await User.find();
  const user = await User.findOne({ _id: req.session.userID }).populate(
    'courses'
  );
  const courses = await Course.find({ user: req.session.userID }).populate(
    'category'
  );
  res.status(200).render('dashboard', {
    page_name: 'dashboard',
    user,
    categories,
    courses,
    allUsers,
  });
};

exports.deleteUser = async (req, res) => {
  try {
    /// eğre bi hata yok ise burayı
    const user = await User.findById(req.params.userID);
    req.flash(
      'success',
      `<div class="row mt-5">
    <table class="table table-sm  ">
    <div class="alert alert-primary float-center"><h3> Silme işleminde başarılı. </h3></div>
    <tbody>
    <tr>
            <td class="bg-warning">${user._id}</td>
            <td class="bg-warning">${user.name} </td>
            <td class="bg-warning"> ${user.email} </td>
            <td class="bg-warning"> ${user.role}</td>
          </tr>
        
      </tbody>
      </table>
  </div><!-- end row -->`
    );
    await user.delete();

    res.status(201).redirect('/users/dashboard');
  } catch (error) {
    // hata var ise burayı cevap ile gönderir
    req.flash('error', error);
    console.log(err);
    res.status(400).redirect('/users/dashboard');
  }
};

exports.updateUser = async (req, res) => {
  try {
     const user  = await User.findOne({_id:req.params.userID})
      user.name  = req.body.name,
      user.email = req.body.email,
      user.image = req.body.image,
      user.role  = req.body.role
      user.save()
  console.log(`${user.email} ----- ${req.body.email} ------ ${Boolean(user.email == req.body.email)} ------ ${req.params.userID} `)

    res.redirect('/users/dashboard');
  } catch (error) {
    // hata var ise burayı cevap ile gönderir
    console.log(error);
  }
};
