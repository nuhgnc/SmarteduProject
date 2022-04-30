const nodemailer = require('nodemailer');

exports.getIndexPage = (req, res) => {
  res.status(200).render('index', {
    page_name: 'index',
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render('about', {
    page_name: 'about',
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render('register', {
    page_name: 'register',
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render('login', {
    page_name: 'login',
  });
};

exports.getContactPage = (req, res) => {
  res.status(200).render('contact', {
    page_name: 'contact',
  });
};

exports.sendEmail = async (req, res) => {
  try {
    const outputMessage = `
  <h1> MAil details </h1>
  <ul>
  <li> name: ${req.body.name} </li>
  <li> Email: ${req.body.email} </li>
  </ul>
  <h1> Message </h1>
  <p> ${req.body.message} </p>
  `;

    // create reusable transporter object using the default SMTP transport
    let transporter = await nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'cristobal.kuhn3@ethereal.email', // generated ethereal user
        pass: 'kr9Cd8enhTVa3HRFBf', // generated ethereal password
      },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"SMART EDU PROJECT " <nuh16358@gmail.com>', // sender address
      to: 'nuh16358@gmail.com', // list of receivers
      subject: 'Hello ✔', // Subject line
      html: outputMessage, // html body
    });
    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    req.flash('success', 'we recevid your messages successfuly');
    res.status(200).redirect('/contact');
  } catch (error) {
    req.flash("error", `something happend ${error}`);
    res.status(203).redirect('/contact');
  }
};
