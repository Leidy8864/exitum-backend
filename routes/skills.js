const express = require('express');
const router = express.Router();
const controller = require('../controllers/skillController');

router.post('/list',
    controller.findAllSkill
);

router.post('/create',
    controller.createSkill
);

module.exports = router;
