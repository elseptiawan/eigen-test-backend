var express = require('express');
var router = express.Router();
const {
  bookReturn
} = require('../controllers/BorrowController');

//Returning Book
router.put('/', bookReturn);

module.exports = router;