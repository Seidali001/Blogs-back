import jwt from "jsonwebtoken";
import bcrypt from "bcrypt/bcrypt.js";
import UserModel from '../models/User.js'


export const register = async (req, res) => {
    try { 
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt);
        
        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        })

        const user = await doc.save()

        const token = jwt.sign({
                _id: user._id
            },
            'confid123',
            {
                expiresIn: '30d'
            })

        const {passwordHash, ...userData} = user._doc
/* console.log(userData) */
        res.json({
            ...userData,
            token,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            /* message: error.message,  */
            message:"failed to register"
        })
    }
}

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email});

        if (!user) {
            return res.status(404).json({
                message: "some error in auth"
                /* message: "нет пользователя" */
            })
        }
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)
        if (!isValidPass) {
            return res.status(400).json({
                message: "wrong login or password"
                // message: "не правильный пароль"
            })
        }

        const token = jwt.sign({
                _id: user._id
            },
            'confid123',
            {
                expiresIn: '30d'
            })

        const {passwordHash, ...userData} = user._doc
        console.log(userData)

        res.json({
            ...userData,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            /*message: "failed to log in"*/
            message: error.message
        })
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId)
        
        if (!user) {
            return res.status(404).json({
                /* message: "Пользователя такого нет" */
                message: "some error in auth"
            })
        }

        const {passwordHash, ...userData} = user._doc
       /*  console.log(userData) */
        res.json(userData)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            /* message: error.message,  */
            message:"No access"
        })
    }
}