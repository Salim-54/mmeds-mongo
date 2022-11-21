import express from 'express';
import "./database";
import app from './app'
import 'dotenv/config';



const server = express();


const port = process.env.PORT || 3000;

app.listen(port, () => {console.log("Server listening on port "+port)});
