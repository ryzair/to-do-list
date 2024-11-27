
const express = require('express');
const router = express.Router();

// Landing Page
router.get('/', (req, res) => {
  res.render('index', { title: 'To Do List Application' });
});

module.exports = router;
