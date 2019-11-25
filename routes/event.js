const express = require('express');
const router = express.Router();
const controller = require('../controllers/eventController');

router.get('/list-by-user/:user_id',
    controller.listByUser
);

router.post('/take-part',
    controller.takePart
);

router.post('/create',
    controller.validate('create'),
    controller.create
);

router.post('/update/:event_id',
    controller.validate('update'),
    controller.update
);

router.post('/delete/:event_id',
    controller.validate('delete'),
    controller.delete
);

module.exports = router;
