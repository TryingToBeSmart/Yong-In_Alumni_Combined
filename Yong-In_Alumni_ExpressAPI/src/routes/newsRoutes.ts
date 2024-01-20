const express = require("express");
const router = express.Router();
const newsController = require('../controllers/newsController');

// Render news page
router.get('/', newsController.renderNews);

module.exports = router;