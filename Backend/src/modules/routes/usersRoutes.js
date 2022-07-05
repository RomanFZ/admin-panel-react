const express = require('express');
const router = express.Router();

const {
  createNewUser,
  authorizationUser
} = require('../controllers/user.controller');

//User routes

router.post('/createUser', createNewUser);
router.post('/authorizationUser', authorizationUser);

module.exports = router;