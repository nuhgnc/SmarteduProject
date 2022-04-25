const express = require('express'),
  ejs = require('ejs'),
  mongoose = require('mongoose');

const pageRoute = require('./routes/pageRoutes');
const courseRoute = require('./routes/courseRoute');
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
app.use(express.urlencoded({extended: true}));
app.use(express.json())

//ROUTES
app.use('/', pageRoute);
app.use('/courses', courseRoute)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('app listen on port:' + PORT);
});
