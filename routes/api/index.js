const express = require('express');
const router = express.Router();
const userRouter = require('./user_router');

router.use('/users', userRouter);

module.exports = router;



