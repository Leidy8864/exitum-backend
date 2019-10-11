const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
var passportConf = require('../libs/passport');
var passport = require('passport');
const passportGoogle = passport.authenticate('google-plus-token', { session: false, failureFlash: 'Invalid username or password.' });
const passportFacebook = passport.authenticate('facebookToken', { session: false });

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/signIn', controller.validate('login'), function (req, res) {
  controller.signIn(req, res);
});

router.post('/signUp', controller.validate('signUp'), function (req, res) {
  controller.signUp(req, res);
});

router.get('/authentication/:token', function (req, res) {
  controller.confirmation(req, res);
});

router.post('/oauth/google', passportGoogle, function (req, res) {
  controller.socialLoginOrRegister(req, res);
});
router.post('/oauth/facebook', passportFacebook, function (req, res) {
  controller.socialLoginOrRegister(req, res);
});

router.post('/update', controller.validate('update'), function (req, res) {
  controller.updateUser(req, res);
});

router.post('/resend',
  controller.validate('resend'),
  controller.resendToken
);

router.post('/forgot',
  controller.forgotPassword
);

router.get('/verificationToken',
  controller.validate('validateToken'),
  controller.validateToken
);

router.post('/reset', 
  controller.validate('confirmPassword'),
  controller.resetPassword
);

router.get('/countries',
  controller.listCountry
);

module.exports = router;
