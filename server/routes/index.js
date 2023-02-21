const express = require('express');
const { getUsers, Register, Login, Logout } =require('../controllers/Users');
const { verifyToken }  = require('../middleware/VerifyToken');
const { refreshToken } = require('../controllers/RefreshToken');

const router = express.Router();

router.get('/users',verifyToken, getUsers); //to verify token if user didn't login cant access in
router.post('/register', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

module.exports = router;
