const express = require('express');
const router = express.Router();
const controller = require('../controllers/scheduleController');

router.post('/create',
    controller.create
);

router.post('/not-available/:user_id',
    controller.validate('unavailable'),
    controller.unavailable
);

router.get('/schedule/:user_id',
    controller.schedule
);

router.post('/schedule/:user_id',
    controller.validate('scheduleDate'),
    controller.scheduleDate
);

module.exports = router;
