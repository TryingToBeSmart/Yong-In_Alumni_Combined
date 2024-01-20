const express = require("express");
const router = express.Router();
const termsAndConditionsController = require('../controllers/termsAndConditionsController');

// Render news page
router.get('/', termsAndConditionsController.renderTermsAndConditions);

module.exports = router;