const express = require('express');
const router = express.Router();
const controller = require('../controllers/areaController');

router.get('/list',
    controller.all
);

module.exports = router;
