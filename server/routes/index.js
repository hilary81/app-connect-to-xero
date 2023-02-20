const express = require('express');
const { getUsers, Register, Login } =require('../controllers/Users')

const router = express.Router();

router.get('/users',getUsers);
router.post('/users', Register);
router.post('/login', Login);

module.exports = router;
