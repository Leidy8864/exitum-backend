const express = require('express');
const router = express.Router();
const controller = require('../controllers/skillController');

router.get('/list', function (req, res) {
    controller.findAllSkill(res)
});

router.post('/create', function (req, res) {
    controller.createSkill(req, res)
});

router.post('/userAddSkill',
    controller.userAddSkill
);

router.get('/list-by-id/:user_id',
    controller.listById
);

router.post('/delete',
    controller.delete
);

module.exports = router;
