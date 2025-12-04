
import User from "../models/user.model.js";
import user from "../models/user.model.js";
import bcrypt from "bcrypt";



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
    } catch (error) {
        console.log(error.message);
    }
}