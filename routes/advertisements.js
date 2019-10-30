const express = require('express');
const router = express.Router();
const controller = require('../controllers/advertisementController');

router.get('/list', function (req, res) {
    controller.findAllAdvertActive(req, res);
});

router.get('/listByEntrepreneur', function (req, res) {
    controller.findAdvertByEntrepreneur(req, res);
});

router.get('/:advertisement_id/detail', function (req, res) {
    controller.AdvertDetail(req, res);
});

router.post('/create', controller.validate('create'), function (req, res) {
    controller.createAdvert(req, res);
}
);
router.post('/update', controller.validate('update'), function (req, res) {
    controller.updateAdvert(req, res);
});

router.post('/update/skills', function (req, res) {
    controller.updateSkills(req, res);
});

router.get('/listBySkill/:user_id', function (req, res) {
    controller.advertBySkills(req, res);
});

// router.get('/listByEntrepreneurPagination', function (req, res) {
//     controller.findAdvertByEntrepreneurPagination(req, res);
// });

module.exports = router;
