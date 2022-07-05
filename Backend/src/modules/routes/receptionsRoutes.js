const express = require('express');
const router = express.Router();

const {
  getReceptions,
  createReception,
  updateReception,
  deleteReception,
} = require('../controllers/reception.controller');

router.get('/getReceptions', getReceptions);
router.post('/createReception', createReception);
router.patch('/updateReception', updateReception);
router.delete('/deleteReception', deleteReception);

module.exports = router;