const express = require('express');
const animalRouter = require('./animals');
const authRouter = require('./auth');

const router = express.Router();

router.use('/animals', animalRouter);
router.use('/auth', authRouter);

module.exports = router;
