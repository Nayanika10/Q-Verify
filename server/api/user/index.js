'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();
router.post('/register', controller.register);
router.get('/', controller.index);
router.get('/me', controller.me);
router.get('/vendor', controller.vendor);
router.get('/client', controller.client);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.post('/login', controller.login);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
