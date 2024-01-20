const express = require("express");
const router = express.Router();
const sponsorController = require('../controllers/sponsorController');

// Render sponsor page
router.get('/', sponsorController.renderSponsor);

module.exports = router;