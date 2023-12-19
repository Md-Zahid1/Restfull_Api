import User from "../models/user.js"


const admin = async (req, res, next) => {
    console.log('admin ')

    try {

        const user = await User.findOne({ _id: req.user._id })

        if (user.role === 'admin') {
            next()
        } else {
            return res.status(401).json({ message: "you are not authrized" })
        }

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}


export default admin