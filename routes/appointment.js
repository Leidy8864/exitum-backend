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
router.get('/list-by-meeting/:to_user_id',
    controller.validate('by-user-reminder'),
    controller.listByUserMeeting
);

router.post('/update/:appointment_id',
    controller.validate('update'),
    controller.update
);

router.post('/cancel/:appointment_id',
    controller.validate('cancel'),
    controller.cancel
);

module.exports = router;