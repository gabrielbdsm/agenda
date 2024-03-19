import dotenv from 'dotenv';
import express, { Request , Response} from "express";
import cors from "cors";
import router from "./routes"
import path from 'path';
import mustache from 'mustache-express';
import {mongoConnect} from "./database/mongo"
dotenv.config();
mongoConnect()
const app = express()

app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));
app.engine('mustache', mustache());

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, '../public')));

app.use("/" , router)

const server = app.listen(process.env.PORT, ()=>{
    console.log( `Clique no link para abrir: http://localhost:${process.env.PORT}`);
})