const User = require('../model/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

class AuthController {

    static AddUser = async (req, res) => {
        const { name, email, password, userType } = req.body

        try {
            const emailExist = await User.findOne({ email: email })

            if (emailExist) {
                return res.status(200).json({
                    success: true,
                    message: (userType === "Doctor" ? "Doctor already registred successfully." : "Patient already registred successfully.")
                })
            }

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            const newUser = new User({
                name: name,
                email: email,
                password: hash,
                userType: userType,
            })
            await newUser.save()

            res.status(200).json({
                success: true,
                message: (userType === "Doctor" ? "Doctor registred successfully." : "Patient registred successfully.")
            })
        } catch (error) {
            res.status(200).json({
                success: false,
                message: error.message
            })
        }
    }

    static Login = async (req, res) => {
        const { email, password } = req.body
        try {
            const UserExist = await User.findOne({ email: email })

            if (UserExist) {
                bcrypt.compare(password, UserExist.password, (err, result) => {
                    if (result) {
                        const token = jwt.sign({
                            id: UserExist._id,
                            name: UserExist.name,
                            email: UserExist.email,
                            userType: UserExist.userType
                        },
                            process.env.TOKEN)

                        const UserData = {
                            id: UserExist._id,
                            name: UserExist.name,
                            email: UserExist.email,
                            userType: UserExist.userType
                        }

                        res.status(200).json({
                            success: true,
                            data: UserData,
                            token: token
                        });
                    }
                    else {
                        res.status(200).json({
                            success: false,
                            message: "Password doesn't match."
                        })
                    }
                })
            }
            else {
                res.status(200).json({
                    success: false,
                    message: "User doesn't exist."
                })
            }
        } catch (error) {
            res.status(200).json({
                success: error,
                message: error.message
            })
        }
    }

    static UserProfile = async(req, res)=>{
        const ID = req.user._id
        try {
            const UserData = await User.findOne({_id: ID})

            res.status(200).json({
                success: true,
                data: UserData
            })
        } catch (error) {
            res.status(200).json({
                success: false,
                message: error.message
            })
        }
    }
}

module.exports = AuthController