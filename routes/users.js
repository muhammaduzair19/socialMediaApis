import express from "express";
import  { updateUser, deleteUser, getUser, getAllUsers, followUser, unFollowUser } from "../controllers/userController.js"


const userRouter = express.Router();


//update
userRouter.put("/:id", updateUser);


//delete
userRouter.delete("/:id", deleteUser)


//get a user
userRouter.get("/:id", getUser)

//follow
userRouter.put("/:id/follow", followUser)


//unfollow
userRouter.put("/:id/unfollow", unFollowUser)


// get all user
userRouter.get("/", getAllUsers)



export default userRouter