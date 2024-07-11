var express = require('express');
var router = express.Router();
const {
  borrow
} = require('../controllers/BorrowController');

//Borrowing Book
router.post('/', borrow);

module.exports = router;