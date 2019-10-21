const express = require('express');
const router = express.Router();
const controller = require('../controllers/favoriteController');

router.post('/create',
    controller.validate('chosen'),
    controller.createFavorite
);

router.post('/update',
    controller.validate('chosen'),
    controller.updateFavorite
);

router.post('/list',
    controller.validate('list'),
    controller.listFavorites
);

module.exports = router;
