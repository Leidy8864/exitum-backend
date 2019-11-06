const express = require('express');
const router = express.Router();
const controller = require('../controllers/experienceController');

router.get('/list-by-id/:user_id',
  controller.validate('by-user-id'),
  controller.findUserId
);

router.post('/create',
  controller.validate('create'),
  controller.createExperience
);

router.post('/update', 
  controller.validate('update'),
  controller.updateExperience
);

router.post('/delete',
  controller.validate('update'),
  controller.delete
);

module.exports = router;
