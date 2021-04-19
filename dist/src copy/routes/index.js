"use strict";
var express = require('express');
var router = express.Router();
router.use('/users', require('./user.routes'));
module.exports = router;
