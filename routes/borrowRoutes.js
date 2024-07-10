var express = require('express');
var router = express.Router();
const {
  borrow
} = require('../controllers/BorrowController');

//Get All
router.post('/', borrow);

module.exports = router;