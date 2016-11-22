'use strict';

var express = require('express');
var controller = require('./candidate_map.controller');

var router = express.Router();

router.get('/vendor', controller.vendorUploaded);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
