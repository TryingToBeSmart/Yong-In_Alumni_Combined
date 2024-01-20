"use strict";
const express = require("express");
const router = express.Router();
const termsAndConditionsController = require('../controllers/termsAndConditionsController');
router.get('/', termsAndConditionsController.renderTermsAndConditions);
module.exports = router;
