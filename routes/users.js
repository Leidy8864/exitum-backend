const express = require('express');
const router = express.Router();
const helper = require('../libs/helper');
const auth = require('../middleware/authorizationAuth')
const controller = require('../controllers/userController');
const controllerReview = require('../controllers/userReviewController');
var passportConf = require('../libs/passport');
var passport = require('passport');
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

router.post('/oauth/google',function (req, res) {
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

router.get('/verificationToken/:token',
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

router.post('/comment/:to_user_id',
  controllerReview.validate('comment'),
  controllerReview.comment
)

router.post('/rating/:to_user_id',
  controllerReview.validate('rating'),
  controllerReview.rating
)

router.post('/update-image',
  controller.updateImage
)

router.post('/createWorkshop',
  controller.validate('createWorkshop'),
  controller.createWorkshop
)

router.post('/updateWorkshop',
  controller.updateWorkshop
)

router.post('/deleteWorkshop',
  controller.deleteWorkshop
)

router.get('/show/:user_id',
  controller.show
)

router.get('/all-user/:user_id',
  controller.allUser
)

// router.get('/all-user', helper.verifyToken,
//   controller.allUser
// )

// router.get('/me',
//   auth,
//   controller.me
// )

module.exports = router;
