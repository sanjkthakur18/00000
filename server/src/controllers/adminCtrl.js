const bcrypt = require('bcrypt');
const Admin = require('../models/adminModel');
const Staff = require('../models/staffModel');

const registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const findAdmin = await Admin.findOne({ email: email });
    try {
        if (findAdmin) {
            return res.status(409).json({ error: { email: 'Admin already exists' } })
        }
        const newAdmin = await Admin.create({
            name: name,
            email: email,
            password: hashedPassword
        });
        console.log('Admin created:', newAdmin);
        res.status(200).json({ message: { message: 'Admin created successfully' }, admin: newAdmin });
    } catch (error) {
        console.error(error.error);
        res.status(500).json({ error: { error: 'Server Error' } });
    }
};

const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    const findAdmin = await Admin.findOne({ email });
    console.log('Loggedin Admin', findAdmin);
    try {
        if (!findAdmin) {
            console.log('wrong email');
            return res.status(404).json({ error: { email: 'Wrong email or email does not exists' } });
        }
        if (!findAdmin.password === password) {
            return res.status(401).json({ error: { password: 'wrong password' } });
        }
        if (findAdmin) {
            if (findAdmin?.password === password) {
                res.status(200).json({
                    id: findAdmin?._id,
                    name: findAdmin?.name,
                    email: findAdmin?.email,
                    role: findAdmin?.role,
                    password: findAdmin?.password
                })
            }
        }
    } catch (error) {
        console.error(error.error);
        res.status(500).json({ error: { error: 'Server Error' } });
    }
};

const createStaff = async (req, res) => {
    const { name, email, mobile, availability } = req.body;
    try {
        const findStaff = await Staff.findOne({ email: email });
        if (findStaff) {
            return res.status(409).json({ error: { email: 'Staff already exists' } });
        }
        if (findStaff.mobile == mobile) {
            return res.status(409).json({ error: { mobile: 'Staff already exists' } });
        }
        const newStaff = await Staff.create({
            name: name,
            email: email,
            mobile: mobile,
            availability: availability
        });
        res.status(200).json({ message: 'Staff created', staff: newStaff });
    } catch (error) {
        console.error(error.error);
        res.status(500).json({ error: { error: 'Server Error' } });
    }
};

const updateStaff = async (req, res) => {
    const { id } = req.params;
    try {
        const findStaff = await Staff.findByIdAndUpdate(id, {
            name: req?.body?.name,
            email: req?.body?.email,
            mobile: req?.body?.mobile,
        }, { new: true });
        res.status(200).json(findStaff);
    } catch (error) {
        console.error(error.error);
        res.status(500).json({ error: { error: 'Server Error' } });
    }
};

const deleteStaff = async (req, res) => {
    const { id } = req.params;
    console.log("Param Id", req.params);
    try {
        const findStaff = await Staff.findByIdAndDelete(id);
        res.status(200).json({ message: 'Staff Deleted', findStaff });
    } catch (error) {
        console.error(error.error);
        res.status(500).json({ error: { error: 'Server Error' } });
    }
};

const getStaff = async (req, res) => {
    const { id } = req.params;
    try {
        const findStaff = await Staff.findById(id);
        res.status(200).json(findStaff);
    } catch (error) {
        console.error(error.error);
        res.status(500).json({ error: { error: 'Server Error' } });
    }
};

const getAllStaff = async (req, res) => {
    try {
        const getStaff = await Staff.find();
        res.status(200).json(getStaff);
    } catch (error) {
        console.error(error.error);
        res.status(500).json({ error: { error: 'Server Error' } });
    }
};



module.exports = { registerAdmin, loginAdmin, createStaff, updateStaff, deleteStaff, getStaff, getAllStaff };