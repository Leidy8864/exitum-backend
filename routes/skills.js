const express = require('express');
const router = express.Router();
const controller = require('../controllers/skillController');

router.get('/list', function (req, res) {
    controller.findAllSkill(res)
});

router.post('/create', function (req, res) {
    controller.createSkill(req, res)
});

module.exports = router;
