/**
 * Created by sif on 9/12/2016.
 */
/**
 * Created by sif on 9/1/2016.
 */
'use strict';

var express = require('express');
var controller = require('./user.controller.js');

var router = express.Router();

router.get('/:vendorId/users', controller.index);


module.exports = router;
