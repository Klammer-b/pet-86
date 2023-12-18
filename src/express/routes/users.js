const express = require('express');
const errorWrapper = require('../../modules/common/utils/errorWrapper');
const usersController = require('../../modules/users/controllers');
const upload = require('../middlewares/multer');
const auth = require('../middlewares/auth');
const router = express.Router();

router.put(
  '/me',
  auth,
  upload.single('avatar'),
  errorWrapper(usersController.updateMe),
);

module.exports = router;
