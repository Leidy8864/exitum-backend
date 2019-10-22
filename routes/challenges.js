
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
    controller.validate('checkStartup'),
    controller.checkChallengeStartup
);

router.post('/checkEmployee',
    controller.validate('checkEmployee'),
    controller.checkChallengeEmployee
);

router.get('/listEmployee',
    controller.listChallengeEmployee
);

router.get('/listStartup',
    controller.listChallengeStartup
);

router.get('/actualStage/:id',
    controller.actualStage
);
module.exports = router;