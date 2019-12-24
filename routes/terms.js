const express = require('express');
const router = express.Router();
const controller = require('../controllers/termsController');

router.get('/terminos-y-condiciones',
    controller.termsAndConditions
);

module.exports = router;
