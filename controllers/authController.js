import User from "../models/User.js"
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {

    try {

        // generating password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        //adding new user
        const newUser = await new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        })

        // save and respond
        const user = await newUser.save();
        res.status(200).json({
            "status": "register succesfull",
            "user data": user
        })
    }

    catch (error) {
        res.status(500).json(error)
    }
}


const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        !user && res.status(404).json("user not found")

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("incorrect password")

        res.status(200).json({
            "status": "login succesfull",
            "user data": user
        })
    }

    catch (error) {
        res.status(500).json(error)
    }
}


export { registerUser, loginUser }