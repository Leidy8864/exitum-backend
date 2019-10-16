const express = require('express');
const router = express.Router();
const controller = require('../controllers/stageController');

router.get('/list',
    controller.all
);

router.get('/show/:type',
    controller.validate('show'),
    controller.show
);

router.post('/create',
    controller.validate('create'),
    controller.create
);

router.post('/update/:id_stage',
    controller.validate('update'),
    controller.update
);

module.exports = router;
