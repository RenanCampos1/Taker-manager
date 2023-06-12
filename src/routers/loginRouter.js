const express = require('express');
const generateToken = require('../utils/generateToken');
const validateEmail = require('../middlewares/validateEmail');
const validatePassword = require('../middlewares/validatePassworld');

const router = express.Router();

function handleAuthenticationRequest(req, res) {
  const token = generateToken();
  res.status(200).json({ token });
}

router.post('/', validateEmail, validatePassword, handleAuthenticationRequest);

module.exports = router;
