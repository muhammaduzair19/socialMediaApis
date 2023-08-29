
import express from "express";
import {addPost, deletePost, updatePost, getPost, likePost, getTimelinePosts} from "../controllers/postController.js"



const postRouter = express.Router();

//add a post

postRouter.post("/", addPost)

//update a post
postRouter.put("/:id", updatePost)


//delete a post
postRouter.delete("/:id", deletePost)

//get a post
postRouter.get("/:id", getPost)

//like a post
postRouter.put("/:id/like", likePost)


//get all post (time line)
postRouter.get("/timeline/all", getTimelinePosts)


export default postRouter