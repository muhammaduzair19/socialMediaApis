import Post from "../models/Post.js";
import User from "../models/User.js";

const addPost = async (req, res) => {
    const newPost = await new Post(req.body)
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error)
    }
}

const updatePost = async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.params.id)
    try {
        if (req.body.userId === post.userId) {
            await post.updateOne({ $set: req.body })
            res.status(200).json("your post has been updated")
        }
        else {
            res.status(403).json("you can update only your post")
        }
    } catch (error) {
        res.status(500).json(error)

    }
}

const deletePost = async (req, res) => {
    
    const post = await Post.findById(req.params.id)
    try {
        if (req.body.userId === post.userId) {
            await post.deleteOne()
            res.status(200).json("your post has been deleted")
        }
        else {
            res.status(403).json("you can delete only your post")
        }
    } catch (error) {
        res.status(500).json(error)

    }
}

const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)

    } catch (error) {
        res.status(500).json(error)
    }
}

const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } })
            res.status(200).json("you liked this post")
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } })
            res.status(200).json("you disliked this post")

        }

    } catch (error) {
        res.status(500).json(error)

    }
}

const getTimelinePosts = async (req, res) => {
    try {

        const currentUser = await User.findById(req.body.userId)
        const currentUserPosts = await Post.find({ userId: currentUser.id })

        const friendPost = await Promise.all(
            currentUser.following.map((friendId) => {
                return Post.find({ userId: friendId })
            })
        )

        res.json(currentUserPosts.concat(...friendPost))


    } catch (error) {
        res.status(500).json(error)
    }
}

export { addPost, deletePost, updatePost, getPost, likePost, getTimelinePosts }