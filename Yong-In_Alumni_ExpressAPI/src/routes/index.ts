var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController');

/* GET home page. */
router.get('/', indexController.getIndex);

export default router;
