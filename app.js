const express = require('express'),
  ejs = require('ejs'),
  mongoose = require('mongoose');

const pageRoute = require('./routes/pageRoutes')

const app = express();

//TEMPLATE ENGİNE
app.set('view engine', 'ejs');

//MİDDLEWARES
app.use(express.static('public'));
app.use('/', pageRoute)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('app listen on port:' + PORT);
});
