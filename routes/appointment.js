const express = require('express');
const router = express.Router();
const controller = require('../controllers/appointmentController');

router.post('/list-by-id/:to_user_id',
    controller.validate('by-user-id'),
    controller.listByUserId
)

router.post('/create/:to_user_id',
    controller.validate('create'),
    controller.create
);

router.get('/list-by-reminder/:to_user_id',
    controller.validate('by-user-reminder'),
    controller.listByUserReminder
);

module.exports = router;
