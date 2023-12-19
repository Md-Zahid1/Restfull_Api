import User from '../../models/user.js'

const userController = {

 async  me (req, res, next) {
        try {
            console.log("req user", req.user)
           const user = await User.findOne({_id: req.user._id}).select('-password -updatedAt')
           if (!user) {
                 return res.status(401).json({ message: "user not exist!" });
           }
           res.json(user);
        } catch(err) {
            return res.status(401).json({ message: err.message });
        }
    }
}


export default userController