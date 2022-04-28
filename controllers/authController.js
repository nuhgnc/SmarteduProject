const bcrypt = require('bcrypt');

const Course = require('../models/Course')
const User = require('../models/User');
const Category = require('../models/Category')

exports.createUser = async (req, res) => {
  try {
    /// eğre bi hata yok ise burayı
    const user = await User.create(req.body); // req.body ile gönderilen bilgileri Course modeli ile eşleştirip oluşturur. daha sonra course değişeknine atar
    res.status(201).redirect('/login');
  } catch (error) {
    // hata var ise burayı cevap ile gönderir
    res.status('400').json({
      status: 'fail',
      error,
    });
  }
};

exports.userLogin = (req, res) => {
  try {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
      if (user)
        bcrypt.compare(password, user.password, (err, same) => {
         
            //user session
            req.session.userID = user._id
            res.status(200).redirect('/')
          
        });
    });
  } catch (err) {
    // hata var ise burayı cevap ile gönderir
    res.status('400').json({
      status: 'fail',
      err,
    });
  }
};

exports.userLogout = async (req, res) => {
  req.session.destroy( () =>{
    res.redirect('/')
  })
};


exports.getDashboardPage = async (req, res) => {
  const categories = await Category.find({});
  const user = await User.findOne({_id:req.session.userID}).populate('courses')
  const courses = await Course.find({user: req.session.userID})
  res.status(200).render('dashboard', {
    page_name: 'dashboard',
    user,
    categories,
    courses
  });
};