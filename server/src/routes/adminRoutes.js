const express = require('express');
const { registerAdmin, loginAdmin, createStaff, updateStaff, deleteStaff, getStaff, getAllStaff } = require('../controllers/adminCtrl');

const router = express.Router();

router.post('/createAdmin', registerAdmin);
router.post('/loginAdmin', loginAdmin);
router.post('/createStaff', createStaff);
router.put('/updateStaff/:id', updateStaff);
router.delete('/deleteStaff/:id', deleteStaff)
router.get('/getStaff/:id', getStaff);
router.get('/getAllStaff', getAllStaff);

module.exports = router;