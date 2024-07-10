var express = require('express');
var router = express.Router();
const {
  getAll
} = require('../controllers/MemberController');

//Get All
router.get('/', getAll);

module.exports = router;