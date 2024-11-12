// server/models/todo.js
const mongoose = require('mongoose');

let TodoSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, default: "active" },
  createdAt: { type: Date, default: Date.now }
},
{
  collection:"todo_list"
});

module.exports = mongoose.model('Todo', TodoSchema);
