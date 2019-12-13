const express = require('express');
const router = express.Router();
const auth = require('../middleware/authorizationAuth')
const controller = require('../controllers/AuthAdminController');

router.post('/login',
    controller.validate('sign-in'),
    controller.signIn
);

router.post('/sign-up',
    controller.validate('sign-up'),
    controller.signUp
);

router.get('/me',
  auth,
  controller.me
)

module.exports = router;
