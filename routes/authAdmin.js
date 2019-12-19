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

router.post('/forgot-password',
    controller.validate('forgot-password'),
    controller.forgotPassword
);

router.get('/reset/:token',
    controller.validate('reset-get'),
    controller.verifyToken
);

router.post('/reset',
  controller.validate('reset-post'),
    controller.resetPassword
);

router.get('/me',
  auth,
  controller.me
)

module.exports = router;
