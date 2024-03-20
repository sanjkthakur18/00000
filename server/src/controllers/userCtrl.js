const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Staff = require('../models/staffModel');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const findUser = await User.findOne({ email: email });
    try {
        if (findUser) {
            return res.status(409).json({ error: { email: 'User already exists' } })
        }
        const newUser = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        });
        console.log('User created:', newUser);
        res.status(200).json({ message: { message: 'User created successfully' }, user: newUser });
    } catch (error) {
        console.error(error.error);
        res.status(500).json({ error: { error: 'Server Error' } });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    console.log('Loggedin user', findUser);
    try {
        if (!findUser) {
            console.log('wrong email');
            return res.status(404).json({ error: { email: 'Wrong email' } });
        }
        if (!findUser.password === password) {
            return res.status(401).json({ error: { password: 'wrong password' } });
        }
        if (findUser) {
            if (findUser?.password === password) {
                res.status(200).json({
                    id: findUser?._id,
                    name: findUser?.name,
                    email: findUser?.email,
                    role: findUser?.role
                })
            }
        }
    } catch (error) {
        console.error(error.error);
        res.status(500).json({ error: { error: 'Server Error' } });
    }
};

const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const findUser = await User.findById(id);
        res.status(200).json(findUser);
    } catch (error) {
        console.error(error.error);
        res.status(500).json({ error: { error: 'Server Error' } });
    }
};

const addStaff = async (req, res) => {
    const { userId } = req.params;
    const { staffId, date, } = req.body;
    console.log(req.body);
    try {
        const findStaff = await Staff.findById(staffId);
        if (!findStaff) {
            return res.status(404).json({ error: 'Staff not found' });
        }
        const findUser = await User.findOne(userId);
        findUser?.staff.push({
            staffId: staffId,
            name: findStaff?.name,
            email: findStaff?.email,
            mobile: findStaff?.mobile,
            availability: findStaff?.availability,
            date: date
        });
        findUser.save();
        res.status(200).json({ message: { message: 'Satff added' } });
    } catch (error) {
        console.error(error.error);
        res.status(500).json({ error: { error: 'Server Error' } });
    }
};

const deleteStaff = async (req, res) => {
    const { userId, staffId } = req.params;
    try {
        const findUser = await User.findById(userId);
        console.log("User:", findUser);
        if (!findUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        const staffIndex = findUser.staff.findIndex(index => index.staffId.toString() === staffId);
        console.log("Staff Index:", staffIndex);
        if (staffIndex === -1) {
            return res.status(404).json({ error: 'Staff not found' });
        }
        findUser.staff.splice(staffIndex, 1);
        await findUser.save();
        return res.status(200).json({ message: 'Staff member deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

module.exports = { registerUser, loginUser, addStaff, getUser, deleteStaff };