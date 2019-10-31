const express = require('express');
const router = express.Router();
const controller = require('../controllers/universityController');

router.get('/all',
    controller.all
);

router.post('/create',
    controller.create
);

module.exports = router;