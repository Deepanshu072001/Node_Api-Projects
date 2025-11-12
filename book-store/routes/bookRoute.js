const express = require('express');
const controller = require('../controllers/book.controller');
const fs = require('fs');

const router = express.Router();

router.get('/',controller.getAllBooks);
    //res.setHeader('x-custom', 'custom header'); // --> to create a custom header

router.get('/:id', controller.getBookById);

router.post('/', controller.createBook);

router.delete('/:id', controller.deleteBookById);

module.exports = router;

// // Catch invalid routes (404)
// router.use((req, res) => {
//   const errorMessage = `Cannot ${req.method} ${req.path}`;
//   const log = `\n[${Date.now()}] ERROR: ${errorMessage}`;
//   fs.appendFile('logs.txt', log, 'utf-8', (err) => {
//     if (err) console.error('Error writing log:', err);
//   });
//   res.status(404).json(`${errorMessage}`);
// });

// //Global error handler (in case of server-side errors)
// router.use((err, req, res, next) => {
//   const log = `\n[${Date.now()}] SERVER ERROR: ${err.message}`;
//   fs.appendFile('logs.txt', log, 'utf-8', (e) => {
//     if (e) console.error('Error writing log:', e);
//   });
//   res.status(500).json({ error: 'Internal Server Error' });
// });
