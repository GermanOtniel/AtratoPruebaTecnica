const express = require("express");
const router = express.Router();

const analysts_router = require('./analysts');
const users_router = require('./users');


router.use('/analysts', analysts_router);
router.use('/users', users_router);

module.exports = router;