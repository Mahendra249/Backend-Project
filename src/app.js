import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

// for giving permission to server to access backend
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true,
}))

// to decide the data size limit 
app.use(express.json({
    limit:"16kb"
}))

// for url encode or decode understanding
app.use(express.urlencoded({
    extended:true,
    limit:"16kb"
}))

// for cookies which are come with req
app.use(cookieParser())

// for public folder data uses 7
app.use(express.static("public"))

// routes import 

import userRouter from "./routes/user.routes.js"

//routes decelaration 

app.use("/api/v1/users",userRouter)


export { app }