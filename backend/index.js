import express from 'express';
import dotenv from 'dotenv';
import database from '../backend/configs/db.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send("thala API vodu dhu")
})

database().then(() => {
    app.listen(port,()=>{
        console.log(`server idula ${port} la run agudhu`)
    });
});
