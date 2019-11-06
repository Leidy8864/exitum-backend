const express = require('express');
const router = express.Router();
const controller = require('../controllers/certificationController');

router.get('/list-by-id/:user_id',
    controller.validate('by-user-id'),
    controller.findUserId
);

router.post('/create',
    controller.validate('create'),
    controller.create
);

router.post('/update',
    controller.validate('update'),
    controller.updateUserCertification
);

router.get('/download/:file_name',
    controller.validate('download'),
    controller.downloadFile
);

router.post('/delete',
    controller.validate('update'),
    controller.delete
);

module.exports = router;