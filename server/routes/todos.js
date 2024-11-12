// server/routes/todos.js
const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

// Create a new to-do item
router.post('/create', async (req, res) => {
  try {
    const todo = new Todo({
      title: req.body.title,
      description: req.body.description
    });
    await todo.save();
    res.redirect('/todos');
  } catch (error) {
    res.status(500).send(error);
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
router.post('/update/:id', async (req, res) => {
  try {
    await Todo.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/todos');
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a to-do item
router.post('/delete/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.redirect('/todos');
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
