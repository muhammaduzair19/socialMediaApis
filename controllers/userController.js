import bcrypt from "bcrypt";
import User from "../models/User.js";



const updateUser = async (req, res) => {

    //checking if id matches the login person
    if (req.body.userId === req.params.id || req.body.isAdmin) {

        //if password has to be changed so
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch (error) {
                return res.status(500).json(error)
            }
        }

        //if other properties has to be changed
        try {
            const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body });
            res.status(200).json('account has been updated')
        } catch (error) {
            return res.status(500).json({error})

        }


    }
    else {
        return res.status(403).json("you cant update your own")
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json('account has been deleted')
    } catch (error) {
        return res.status(500).json(error)
    }

}

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { updatedAt, password, ...other } = user._doc
        res.status(200).json(other)
    } catch (error) {
        return res.status(500).json(error)
    }

}

const getAllUsers = async (req, res) => {
    const users = await User.find()

    res.status(200).json(users)
}


const followUser = async (req, res) => {

    // checking if the currentUser and requested user are same or not
    if (req.body.userId != req.params.id) {
        try {

            //finding the requested user
            const user = await User.findById(req.params.id)

            //finding current user
            const currentUser = await User.findById(req.body.userId)

            //checking if they are already following eachother
            if (!user.followers.includes(req.body.UserId)) {

                //push userId of current user into requested user followers
                await user.updateOne({ $push: { followers: req.body.userId } })

                //push userId of requested user into current user following
                await currentUser.updateOne({ $push: { following: req.params.id } })



                res.status(200).json("succesfully followed")

            }
            //when the already follow
            else {
                return res.status(403).json("you have already followed this")

            }

        } catch (error) {
            res.status(500).json(error)
        }
    }

    //when current user click their own follow btn
    else {
        return res.status(403).json("you cant follow yourself")
    }
}

const unFollowUser = async (req, res) => {

    // checking if the currentUser and requested user are same or not
    if (req.body.userId != req.params.id) {
        try {

            //finding the requested user
            const user = await User.findById(req.params.id)

            //finding current user
            const currentUser = await User.findById(req.body.userId)

            //checking if they are already following eachother
            if (user.followers.includes(req.body.userId)) {

                //pull userId of current user into requested user followers
                await user.updateOne({ $pull: { followers: req.body.userId } })

                //push userId of requested user into current user following
                await currentUser.updateOne({ $pull: { following: req.params.id } })


                res.status(200).json("succesfully unfollowed")
            }
            //when the dont follow
            else {
                return res.status(403).json("you do not follow")

            }

        } catch (error) {
            res.status(500).json(error)
        }
    }

    //when current user click their own follow btn
    else {
        return res.status(403).json("you cant unfollow yourself")
    }
}

export { updateUser, deleteUser, getUser, getAllUsers, followUser, unFollowUser }