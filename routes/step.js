const express = require('express');
const router = express.Router();
const controller = require('../controllers/stepController');

router.get('/list',
    controller.all
);

router.post('/create',
    controller.validate('create'),
    controller.create
);

router.post('/update',
    controller.validate('update'),
    controller.update
);

router.post('/delete',
    controller.validate('delete'),
    controller.delete
);


module.exports = router;
