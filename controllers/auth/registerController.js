import Joi from "joi"
import { User } from "../../models/index.js"
import bcrypt from 'bcrypt'
import JwtService from '../../services/jwtService.js'


const registerController = {

    async register(req, res, next) {

        //checklist
        //validate the request
        //authrise the request
        //check if user is in the database already
        //prepare model
        //store in database
        //generate jwt token
        //send respons


        //validation
        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            repeat_password: Joi.ref('password')
        })
        console.log("req", req.body)

        const { error } = registerSchema.validate(req.body);

        if (error) {
            return res.status(403).json({ message: error.message })
        }

          
        let access_token;
        let result;

        try {
            const exist = await User.exists({ email: req.body.email })
            if (exist) {
                return res.status(409).json({ message: " email allready exist" });
            }


            const { name, email, password } = req.body

            const hashedPassword = await bcrypt.hash(password, 10);

            //prepare the model
             result = await User.create({
                name,
                email,
                password: hashedPassword
            })
            console.log("result", result)
        } catch (err) {
            return res.status(403).json({ message: err.message });
        }
        access_token = JwtService.sign({_id: result._id, role: result.role})
        res.status(201).json({ access_token: access_token })
    },
    
}


export default registerController