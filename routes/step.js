const express = require('express');
const router = express.Router();
const controller = require('../controllers/stepController');

router.get('/test/:proyecto_id',
    controller.step
);

module.exports = router;
