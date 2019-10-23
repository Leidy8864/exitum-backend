const express = require('express');
const router = express.Router();
const controller = require('../controllers/appointmentController');

router.post('/create',
    controller.validate(),
    controller.create
);

module.exports = router;
