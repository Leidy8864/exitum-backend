
const express = require('express');
const router = express.Router();
const controller = require('../controllers/educationController');

/* GET employee listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.post('/create', controller.validate('education'), function (req, res) {
    controller.createEducation(req, res);
});
router.post('/:education_id/update', function (req, res) {
    controller.updateEducation(req, res);
});
module.exports = router;