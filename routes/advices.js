const express = require('express');
const router = express.Router();
const controller = require('../controllers/adviceController');

router.get('/show', function (req, res) {
    controller.showAdvice(req, res);
});

router.post('/check', function (req, res) {
    controller.checkAdvice(req, res);
})

module.exports = router;