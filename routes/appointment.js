const express = require('express');
const router = express.Router();
const controller = require('../controllers/appointmentController');

router.post('/create/:to_user_id',
    controller.validate('create'),
    controller.create
);

module.exports = router;
