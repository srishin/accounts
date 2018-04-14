var express = require('express');
var router = express.Router();
var appUtil = require('../../utils');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.redirect(appUtil.auth.outlook.getAuthUrl());
});

router.use('/outlook', require('./outlook'));

module.exports = router;
