const User = require('../models/User');

module.exports = (req, res, next) => {
  const roles = ["admin", "student","teacher"]
  User.findById(req.session.userID, (err, user) => {
    if (err || !user) return res.redirect('/login');
    if(!roles.includes(user.role)){
      req.flash("error", "Hesabınız ile ilgili bir sorun var.")
      res.redirect('/')
    }
    next();
  });
};
