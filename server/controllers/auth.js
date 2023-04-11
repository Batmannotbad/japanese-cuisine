import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getDb } from '../index.js';

const getUsersColelction = () => {
    return getDb().collection('users');
}

//REGISTER
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            address,
            password
        } = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const savedUser = await getUsersColelction().insertOne(
            {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                address: address,
                password: passwordHash,
                isAdmin: false
            }
        );
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
};

//LOGIN
export const login = async (req, res) => {
    try {
        const user = await getUsersColelction().findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ msg: "User not found"});

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Incorrect password"});

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        );

        delete user.password;

        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json(err);
    }
};

export const loginAdmin = async (req, res) => {
    try {
        const user = await getUsersColelction().findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ msg: "User not found" });

        if (!user.isAdmin) return res.status(403).json({ msg: "Access denied" });

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        );

        delete user.password;

        res.status(200).json({ ...info, token });
    } catch (err) {
        res.status(500).json(err);
    }
};