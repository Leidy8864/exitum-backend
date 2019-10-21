const express = require('express');
const router = express.Router();
const controller = require('../controllers/proposalController');

router.post('/create',
    controller.validate('create'),
    controller.create
)

router.get('/list/:advertisement_id', controller.list)

module.exports = router;
