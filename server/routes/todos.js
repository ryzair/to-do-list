
const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  req.flash('error', 'You must be logged in to perform this action.');
  res.redirect('/auth/login');
}

// Create a new to-do item
router.post('/create', isAuthenticated, async (req, res) => {
  try {
    const todo = new Todo({
      title: req.body.title,
      description: req.body.description,
    });
    await todo.save();
    req.flash('success', 'To-Do item created successfully.');
    res.redirect('/todos');
  } catch (error) {
    req.flash('error', 'Failed to create the To-Do item.');
    res.redirect('/todos');
  }
});

// Read all to-do items
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.render('todos', { todos });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a to-do item
router.post('/update/:id', isAuthenticated, async (req, res) => {
  try {
    await Todo.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      description: req.body.description,
    });
    req.flash('success', 'To-Do item updated successfully.');
    res.redirect('/todos');
  } catch (error) {
    req.flash('error', 'Failed to update the To-Do item.');
    res.redirect('/todos');
  }
});

// Delete a to-do item
router.post('/delete/:id', isAuthenticated, async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    req.flash('success', 'To-Do item deleted successfully.');
    res.redirect('/todos');
  } catch (error) {
    req.flash('error', 'Failed to delete the To-Do item.');
    res.redirect('/todos');
  }
});

module.exports = router;
