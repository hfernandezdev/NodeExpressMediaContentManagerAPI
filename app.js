var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const themeRoutes = require('./routes/themeRoutes');
const contentRoutes = require('./routes/contentRoutes');

var app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/media_content_manager_db', { auth: { username: "admin", password: "1234" } })
  .then(() => console.log('Conexión a MongoDB establecida'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/themes', themeRoutes);
app.use('/api/contents', contentRoutes);

module.exports = app;
