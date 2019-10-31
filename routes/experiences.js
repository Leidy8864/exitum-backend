const express = require('express');
const router = express.Router();
const controller = require('../controllers/experienceController');

/* GET users listing. */

router.get('/list-by-id/:user_id',
    controller.all
);

router.post('/create', controller.validate('create'), function (req, res) {
  controller.createExperience(req, res);
});

router.post('/update', controller.validate('update'), function (req, res) {
  controller.updateExperience(req, res);
});

module.exports = router;
