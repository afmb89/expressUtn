var express = require('express');
var router = express.Router();
var userWebController = require('../controllers/usersWebController');

/* GET users listing. */
router.post('/', userWebController.create);
router.post('/login', userWebController.login);

module.exports = router;
