
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import gentoken from "../configs/token.js";

export const Signup = async (req, res) => {
    try {
        const {Username,email,phone,password} = req.body;
        if(!Username || !email || !phone || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        const check_user = await user.findOne({$or:[{Username},{email},{phone}]});
        if(check_user){
            return res.status(400).json({message:"Username,email or phone already exists"});
        }
        if(password.length<6){
            return res.status(400).json({message:"Password must be at least 6 characters"});
        }

        const hashed_passcode = await bcrypt.hash(password,10)
        const user = await User.create(
            {
                name:Username,
                Username,
                email,
                phone,
                password:hashed_passcode,
                secret_password:password
            }
        )
        const token = await gentoken(user._id);
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:30*24*60*60*1000,
            sameSite:"None",
            secure:false,
        })

        
        res.status(201).json({message:"User created aithanda",token});
    } catch (error) {
        console.log(`auth controller la error iruku, itho ithu than ${error.message}`);
    }
}

export const login = async (req,res)=>{
    try {
        const {Username,password} = req.body;
        if(!Username || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        const user = await User.findOne({Username});
        if(!user){
            return res.status(400).json({message:"User kedaikala"});
        }
        const is_match = await bcrypt.compare(password,user.password);
        if(!is_match){
            return res.status(400).json({message:"password thappu"});
        }
        const token = await gentoken(user._id);
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:30*24*60*60*1000,
            sameSite:"None",
            secure:false,
        })
        res.status(201).json({message:"User logged in aithanda",token});
    } catch (error) {
        console.log(`login la error iruku, itho ithu than ${error.message}`);
    }}

export const logout = async (req,res)=>{
    try {
        res.clearCookie("token");
        res.status(200).json({message:"User logged out aithan"});
    } catch (error) {
        console.log(`logout la error iruku, itho ithu than ${error.message}`);
    }
}