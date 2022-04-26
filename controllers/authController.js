const bcrypt = require('bcrypt');


const User = require('../models/User');

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
          if (same) {
            //user session
            req.session.userID = user._id
            res.status(200).redirect('/')
          }
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
