import express from "express";
import { APP_PORT, DB_URL } from "./config/index.js";
import routes from './routes/index.js'
import errorHandler from "./middlewares/ErrorHandler.js";
import path from 'path'
import mongoose from "mongoose";
import cors from 'cors'



const app = express();

//databass connect
mongoose.connect(DB_URL)
    .then(() => { console.log('dataconnected') })


global.appRoot = path.resolve("/")
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/api', routes)
app.use('/uploads', express.static('uploads'))


app.use(errorHandler)

app.listen(APP_PORT, () => console.log(`listning on port ${APP_PORT}`))