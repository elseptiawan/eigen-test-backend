var express = require('express');
var router = express.Router();
const {
  getAll
} = require('../controllers/BookController');

//Get All
router.get('/', getAll);

module.exports = router;