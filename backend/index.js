import express from 'express';
import dotenv from 'dotenv';
import database from '../backend/configs/db.js';
import authRouter from '../backend/routes/auth.routes.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send("thala API vodu dhu")
})

app.use("/api/auth_to_pradeep",authRouter);

database().then(() => {
    app.listen(port,()=>{
        console.log(`server idula ${port} la run agudhu`)
    });
});
