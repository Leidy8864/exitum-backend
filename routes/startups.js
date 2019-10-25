const express = require('express');
const router = express.Router();
const controller = require('../controllers/startupController');
const controllerReview = require('../controllers/startupReviewController');

router.post('/create',
    controller.validate('create'),
    controller.create
)

router.post('/update',
    controller.validate('update'),
    controller.update
)

router.post('/detail',
    controller.detail
)

router.post('/listById',
    controller.listById
)

router.get('/list',
    controller.list
)

router.get('/listsector',
    controller.listSector
);

router.post('/recommendation/:startup_id',
  controllerReview.validate('recommendation'),
  controllerReview.recommendation
)

router.post('/rating/:startup_id',
  controllerReview.validate('rating'),
  controllerReview.rating
)

router.post('/test', controller.prueba)

module.exports = router;
