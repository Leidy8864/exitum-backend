const express = require('express');
const router = express.Router();
const controller = require('../controllers/certificationNameController');

router.get('/list',
    controller.all
);

router.post('/create',
    controller.validate('create'),
    controller.create
);

module.exports = router;
