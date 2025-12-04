import mongoose from "mongoose";
import { type } from "os";
import { emitWarning } from "process";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
        },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    }
},
    {timestamps: true});

const User = mongoose.model("User", userSchema);
export default User