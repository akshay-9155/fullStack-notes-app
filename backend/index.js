import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: "./.env" });
import connectDb from './db/db.js';
connectDb();

const app = express();

import bodyParser from 'body-parser';
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello");
})

import {router as notesRouter} from './routes/notes.routes.js'

app.use("/", notesRouter);

app.listen( port, ()=>{
    console.log(` Server is running at http://localhost:${port}`);
})