const express = require('express');
const router = express.Router();
const controller = require('../controllers/adviceController');

router.get('/show', function (req, res) {
    controller.showAdvice(req, res);
});

router.post('/check', function (req, res) {
    controller.checkAdvice(req, res);
});

router.post('/create',
    controller.validate('create'),
    controller.createAdvice
);

router.post('/update',
    controller.validate('update'),
    controller.updateAdvice
);

router.post('/delete',
    controller.validate('delete'),
    controller.deleteAdvice
);

router.get('/list',
    controller.list
)

module.exports = router;