import express from 'express';
import { Admin } from '../models/Admin.js';
import { Student } from '../models/Student.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        //gathering data from entered data in body
        const { username, password, role } = req.body;

        if (role === 'admin') {
            //searching for admin with given username
            const admin = await Admin.findOne({ username })
            if (!admin) {
                return res.json({ message: "Admin not registered" })
            }

            //searching for admin with valid passsword
            const validPassword = await bcrypt.compare(password, admin.password)
            if (!validPassword) {
                return res.json({ message: "Wrong password" })
            }

            //token for valid admin generated
            const token = jwt.sign({ username: admin.username, role: 'admin' }, process.env.Admin_Key)

            //storing the token inside the cookie 
            res.cookie('token', token, { httpOnly: true, secure: true });
            return res.json({ login: true, role: 'admin' });
        }

        else if (role === 'student') {
            const student = await Student.findOne({ username })
            if (!student) {
                return res.json({ message: "Student not registered" })
            }

            //searching for student with valid passsword
            const validPassword = await bcrypt.compare(password, student.password)
            if (!validPassword) {
                return res.json({ message: "Wrong password" })
            }

            //token for valid student generated
            const token = jwt.sign({ username: student.username, role: 'student' }, process.env.Student_Key)

            //storing the token inside the cookie 
            res.cookie('token', token, { httpOnly: true, secure: true });
            return res.json({ login: true, role: 'student' });
        }

        else {

        }
    } catch (error) {
        res.json(error);
    }

})

// next is a middleware which is used to return to check whether the admin is verified while the student is registering; verifyAdmin is passes when the student is registering via the student route

const verifyAdmin = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ message: "Invalid Admin" })
    } else {
        jwt.verify(token, process.env.Admin_Key, (err, decoded) => {
            if (err) {
                return res.json({ message: "Invalid token" })
            } else {
                req.username = decoded.username;
                req.role = decoded.role;
                next()
            }
        })
    }
}

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ message: "Invalid User" })
    } else {
        jwt.verify(token, process.env.Admin_Key, (err, decoded) => {
            if (err) {
                jwt.verify(token, process.env.Student_Key, (err, decoded) => {
                    if (err) {
                        return res.json({ message: "Invalid token" })
                    } else {
                        req.username = decoded.username;
                        req.role = decoded.role;
                        next()
                    }
                })
            } else {
                req.username = decoded.username;
                req.role = decoded.role;
                next()
            }
        })
    }
}

router.get('/verify', verifyUser, (req, res) => {
    return res.json({ login: true, role: req.role })
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({ logout: true })
})

export { router as AdminRouter, verifyAdmin }