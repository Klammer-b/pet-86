const express = require('express');
const animalRouter = require('./animals');
const authRouter = require('./auth');
const userRouter = require('./users');

const router = express.Router();

router.use('/animals', animalRouter);
router.use('/auth', authRouter);
router.use('/users', userRouter);

module.exports = router;
