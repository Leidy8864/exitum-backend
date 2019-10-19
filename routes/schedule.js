const express = require('express');
const router = express.Router();
const controller = require('../controllers/scheduleController');

router.post('/create',
    controller.create
);

module.exports = router;
