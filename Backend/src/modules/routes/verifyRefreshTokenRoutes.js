const express = require('express');
const router = express.Router();

const {verifyRefreshToken} = require("../controllers/refreshToken.controller")

router.post('/verifyRefreshToken', verifyRefreshToken)

module.exports = router;