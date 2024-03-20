const express = require('express');
const { registerUser, loginUser, addStaff, getUser, deleteStaff } = require('../controllers/userCtrl');

const router = express.Router();

router.post('/registerUser', registerUser);
router.post('/loginUser', loginUser);
router.get('/getUser/:id', getUser)
router.put('/add-staff/:id', addStaff);
router.delete('/:userId/deleteStaff/:staffId', deleteStaff);

module.exports = router;