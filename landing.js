const express = require("express");
const router = express.Router();
const User = require('../models/User');

const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

router.get("/login",forwardAuthenticated, (req,res) => res.render("login"));

module.exports = router;
