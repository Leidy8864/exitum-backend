const express = require('express');
const router = express.Router();
const controller = require('../controllers/startupController');

router.post('/create',
    controller.validate('create'),
    controller.create
)

router.post('/update',
    controller.validate('update'),
    controller.update
)

router.post('/detail',
    controller.detail
)

router.post('/listById',
    controller.listById
)

router.get('/list',
    controller.list
)

router.get('/listsector',
    controller.listSector
);

module.exports = router;
