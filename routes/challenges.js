
const express = require('express');
const router = express.Router();
const controller = require('../controllers/challengeController');

/* GET employee listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
// router.post('/create', controller.validate('create'), function (req, res) {
//     controller.createChallenge(req, res);
// });
module.exports = router;