const express = require('express'),
  ejs = require('ejs'),
  mongoose = require('mongoose'),
  session = require('express-session'),
  MongoStore = require('connect-mongo'),
  flash = require('connect-flash'),
  methodOverride = require('method-override')

const pageRoute = require('./routes/pageRoutes'),
  courseRoute = require('./routes/courseRoute'),
  categoryRoute = require('./routes/categoryRoute'),
  userRoute = require('./routes/userRoute');

const app = express();

//DATABASE CONNECTİON
mongoose.connect('mongodb+srv://admin:admin123@smartedu.5z8mx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  .then(res => console.log('DB CONNECTED '))
  .catch(err => console.log('DB CONNECTİON ERROR  ' + err));

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
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://admin:admin123@smartedu.5z8mx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' }),
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});
app.use(methodOverride('_method',{methods: ["POST","GET"]}))

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
