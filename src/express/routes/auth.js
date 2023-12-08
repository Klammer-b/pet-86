const express = require('express');
const errorWrapper = require('../../modules/common/utils/errorWrapper');
const authController = require('../../modules/auth/controllers');
const router = express.Router();

router.post('/login', errorWrapper(authController.login));
router.post('/register', errorWrapper(authController.register));
router.post('/refresh', errorWrapper(authController.refresh));
router.post('/logout', errorWrapper(authController.logout));

module.exports = router;
