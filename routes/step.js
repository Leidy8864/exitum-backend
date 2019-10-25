const express = require('express');
const router = express.Router();
const controller = require('../controllers/stepController');

router.get('/startup/:project_id',
    controller.startup
);

router.get('/show/:step_id',
    controller.show
);

module.exports = router;
