var express = require('express');
var router = express.Router();

// render certificate page
router.get('/', function(req, res, next) {  
  res.render('certificate');
});

module.exports = router;
