const express = require('express');
const { register, login, logout, deleteUser,getAllUsers, getUserById} = require('../controllers/userController');
const router = express.Router();

router.post('/register', register); //  http://localhost:3009/users/register
router.post('/login', login);       
router.get('/logout', logout);      
router.delete('/delete/:id', deleteUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);

module.exports = router;
