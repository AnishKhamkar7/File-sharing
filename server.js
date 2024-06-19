import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/db.js";

const app = express();

dotenv.config({
    path: './.env'
})


const PORT = process.env.PORT || 8000

connectDB();

//routes
import useRouter from './routes/file.routes.js'

app.use('./api/v1/',useRouter)

app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`);
})

