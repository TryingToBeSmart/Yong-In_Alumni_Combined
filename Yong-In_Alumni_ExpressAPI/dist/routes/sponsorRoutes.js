"use strict";
const express = require("express");
const router = express.Router();
const sponsorController = require('../controllers/sponsorController');
router.get('/', sponsorController.renderSponsor);
module.exports = router;
