const express = require('express');
const router = express.Router();

const {
  getReceptions,
  createReception,
  updateReception,
  deleteReception,
} = require('../controllers/reception.controller');
const {verifyToken} = require("../controllers/token.controller");

router.get('/getReceptions',verifyToken, getReceptions);
router.post('/createReception',verifyToken, createReception);
router.patch('/updateReception',verifyToken, updateReception);
router.delete('/deleteReception',verifyToken, deleteReception);

module.exports = router;