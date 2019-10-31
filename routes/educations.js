
const express = require('express');
const router = express.Router();
const controller = require('../controllers/educationController');

/* GET employee listing. */
router.get('/list-by-id/:user_id',
    controller.all
);
router.post('/create', controller.validate('create'), function (req, res) {
    controller.createEducation(req, res);
});
router.post('/update',  controller.validate('update'), function (req, res) {
    controller.updateEducation(req, res);
});
module.exports = router;