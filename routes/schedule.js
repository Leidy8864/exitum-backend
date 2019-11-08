const express = require('express');
const router = express.Router();
const controller = require('../controllers/scheduleController');

router.post('/create/:user_id',
    controller.validate('create'),
    controller.create
);

router.post('/not-available/:user_id',
    controller.validate('unavailable'),
    controller.unavailable
);

router.post('/not-available-multiple/:user_id',
    controller.validate('available'),
    controller.unavailable_multiple
);

router.get('/schedule/:user_id',
    controller.schedule
);

router.post('/schedule/:user_id',
    controller.validate('scheduleDate'),
    controller.scheduleDate
);

module.exports = router;
