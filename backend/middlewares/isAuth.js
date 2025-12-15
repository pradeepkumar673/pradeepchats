import jwt from "jsonwebtoken";
const isAuth = async (req, res, next) =>{
    try{
        let token = req.cookies.token;
        if(!token){
            return res.status(400).json({message:"token kedaikala pa"});
        }
        let verifyToken = await jwt.verify(token, process.env.JWT_SECRET);
        req.userID = verifyToken.user_id;
        next();
    }
    catch (err) {
        return res.status(500).json({message:`isAuth middleware la error iruku, bcoz ${err.message}`});
    }
}

export default isAuth;