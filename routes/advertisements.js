const express = require('express');
const router = express.Router();
const controller = require('../controllers/advertisementController');

router.get('/list', function (req, res) {
    controller.findAllAdvertActive(req, res);
});

router.get('/user/:user_id/list', function (req, res) {
    controller.findAdvertByEntrepreneur(req, res);
});

router.get('/:advertisement_id/detail', function (req, res) {
    controller.AdvertDetail(req, res);
});

router.post('/create', function (req, res) {
        controller.createAdvert(req, res);
    }
);
router.post('/update', function (req, res) {
    controller.updateAdvert(req, res);
});

router.post('/update/skills', function (req, res) {
    controller.updateSkills(req, res);
});




module.exports = router;
