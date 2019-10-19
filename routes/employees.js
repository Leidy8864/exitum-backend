const express = require('express');
const router = express.Router();
const controller = require('../controllers/employeeController');

/* GET employee listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/create', controller.validate('create'), function (req, res) {
    controller.create(req, res);
});
router.get('/:user_id/detail', function (req, res) {
    controller.listEmployeeById(req, res);
});

router.post('/update', controller.validate('update'), function (req, res) {
    controller.updateEmployee(req, res);
});

router.post('/update/skills', function (req, res) {
    controller.updateSkills(req, res);
});

router.post('/update/languages', function (req, res) {
    controller.updateLanguages(req, res);
});

router.post('/update/types', function (req, res) {
    controller.updateTypes(req, res);
});

router.post('/compare', controller.validate('compare'), function (req, res) {
    controller.compareEmploye(req, res);
});
module.exports = router;
