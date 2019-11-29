const express = require('express');
const router = express.Router();
const controller = require('../controllers/eventController');

router.get('/list-all',
    controller.listAll
)

router.get('/list-by-user/:user_id',
    controller.validate('list-by-user'),
    controller.listByUser
);

router.get('/participating/:user_id',
    controller.validate('list-by-user'),
    controller.participating
);

router.get('/show/:event_id',
    controller.validate('list-by-user'),
    controller.show
);

router.post('/take-part',
    controller.validate('take-part'),
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
