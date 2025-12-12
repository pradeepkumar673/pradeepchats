export const getCurrentUser = async (req, res) => {
    try {
        let userID = req.userID;
        let user = await User.findById(userID).select("-password");
        if(!user){
            return res.status(400).json({message:"user kedaikala pa"});
        }
        return res.status(200).json({message:"user found",user});
    }
    catch (error) {
        return res.status(500).json({message:`getCurrentUser controller la error iruku, bcoz ${error.message}`});
    }
}