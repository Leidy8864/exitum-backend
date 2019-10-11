
const express = require('express');
const router = express.Router();
const controller = require('../controllers/challengeController');

/* GET employee listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/createStage', 
    controller.validate('createStage'),
    controller.createStage
);

router.post('/createStep', 
    controller.validate('createStep'),
    controller.createStep
);

router.post('/createTip', 
    controller.validate('createTip'),
    controller.createTip
);

router.post('/checkStartup',
);

module.exports = router;