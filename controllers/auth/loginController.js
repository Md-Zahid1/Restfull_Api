import Joi from "joi";
import User from "../../models/user.js";
import JwtService from "../../services/jwtService.js";
import bcrypt from "bcrypt"

const loginController = {

    async login(req, res, next) {

        //validation

        const loginSchima = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        })

        const { error } = loginSchima.validate(req.body);

        if (error) {
            return res.status(403).json({ message: error.message })
        }

        try {
            const user = await User.findOne({ email: req.body.email })
            if (!user) {
                return res.status(401).json({ message: "Username or password wrong!" });
            }
            console.log("user", user, req.body.password)
            //compare the password
            const match = await bcrypt.compare(req.body.password, user.password)
            if (!match) {
                return res.status(401).json({ message: "Username or password wrong!" });
            }

            //token
            const access_token = JwtService.sign({ _id: user._id, role: user.role })
            res.json({ access_token })

        } catch (error) {
            return res.status(403).json({ message: error.message });
        }
    }

};

export default loginController