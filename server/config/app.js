
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const authRoutes = require('../routes/auth');
const todosRoutes = require('../routes/todos');
const indexRoutes = require('../routes/index');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../../public')));
app.use(flash());

// Passport Authentication
require('./auth')(app);

// View Engine
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// Global Variables
app.use((req, res, next) => {
  res.locals.currentUser = req.user; // Access current user in all views
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

// Routes
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/todos', todosRoutes);

module.exports = app;
