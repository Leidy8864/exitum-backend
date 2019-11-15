const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoryController');

router.get('/list',
    controller.all
);

router.post('/search',
    controller.validate('create'),
    controller.search
);

module.exports = router;
