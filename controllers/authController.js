const User = require('../models/User');
const bcrypt = require('bcrypt');

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

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
      if (user)
        bcrypt.compare(password, user.password, (err, same) => {
          if (same) {
            //user session
            res.status(200).send('You are loged in');
          }
          return err;
        });
    });
  } catch (error) {
    // hata var ise burayı cevap ile gönderir
    res.status('400').json({
      status: 'fail',
      error,
    });
  }
};
