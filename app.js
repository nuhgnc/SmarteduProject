const express = require('express'),
  ejs = require('ejs'),
  mongoose = require('mongoose'),
  session = require('express-session'),
  MongoStore = require('connect-mongo'),
  flash = require('connect-flash');

const pageRoute = require('./routes/pageRoutes'),
  courseRoute = require('./routes/courseRoute'),
  categoryRoute = require('./routes/categoryRoute'),
  userRoute = require('./routes/userRoute');

const app = express();

//DATABASE CONNECTİON
mongoose
  .connect('mongodb://localhost/smartedu-DB')
  .then('DB CONNECTED')
  .catch('DB CONNECTİON ERROR');

//TEMPLATE ENGİNE
app.set('view engine', 'ejs');

//MİDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smartedu-DB' }),
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

//ROUTES
global.currentUser = null;
app.use('*', (req, res, next) => {
  global.currentUser = req.session.userID;
  next();
});

app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('app listen on port:' + PORT);
});
