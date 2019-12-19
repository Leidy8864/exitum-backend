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

router.post('/createChallenge',
    controller.createChallenge
);

router.get('/listStage/:startup_id',
    controller.listStageStartup
);

router.get('/listSteps',
    controller.listSteps
);

router.get('/listStep',
    controller.listStepStartup
);

router.get('/listStageEmp/:user_id',
    controller.listStageEmployee
);

router.get('/listStepEmp',
    controller.listStepEmployee
);

router.get('/download/:file',
    controller.downloadFile
);

router.post('/reply',
    controller.replyTip
);

router.get('/summaryTips',
    controller.summaryTips
);

router.post('/deleteFileReply',
    controller.validate('deleteFile'),
    controller.deleteFileReply
);

router.get('/toVerify',
    controller.showChallengesToVerify
);

router.post('/verify', 
    controller.validate('verifyChallenge'),
    controller.verifyChallenge
);

router.post('/uploadExcel', function (req, res) {
    controller.uploadExcel(req, res);
});

module.exports = router;