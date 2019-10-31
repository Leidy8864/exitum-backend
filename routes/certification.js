const express = require('express');
const router = express.Router();
const controller = require('../controllers/certificationController');

router.get('/list-by-id/:user_id',
    controller.validate('listById'),
    controller.listById
);

router.post('/create',
    controller.validate('create'),
    controller.create
);

router.post('/update',
    controller.validate('update'),
    controller.update
);

router.get('/download/:fileName',
    controller.validate('download'),
    controller.downloadFile
);

module.exports = router;