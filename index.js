import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import userRouter from './routes/users.js'
import authRouter from './routes/auth.js'
import postRouter from "./routes/posts.js";





dotenv.config()

const app = express()
const PORT = 8000;

// connect function
const connect = (uri) => {
    return mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, })
}

// conection string
const start = async () => {

    try {
        await connect(process.env.MONGO_URI);
        console.log("connected");
        app.listen(PORT, () => {
            console.log("This is working", PORT);
        })
    } catch (error) {
        console.log(error);
    }

}



// Middlewares
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))


//routes
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)




app.get("/", (req, res) => {
    res.send("Hello from the server")
})




start();