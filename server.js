import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/db.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

dotenv.config({
    path: './.env'
})


const PORT = process.env.PORT || 8000

app.use(express.static('public'))

connectDB();

//template engine
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.set('views', path.join(__dirname,'/views'))
app.set('view engine','ejs')

//routes
import useRouter from './routes/file.routes.js'
import showouter from './routes/show.routes.js'
import downloadrouter from './routes/download.routes.js'

app.use('/api/files',useRouter)
app.use('/files', showouter)
app.use('/files/download',downloadrouter)

app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`);
})

