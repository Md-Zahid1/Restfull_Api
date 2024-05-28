import Joi from "joi"
import Blog from "../models/blog.js"

const blogController = {

    async addBlog(req, res, next) {

        //validation
        const blogSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
        })
        console.log("req", req.body)

        const { error } = blogSchema.validate(req.body);

        if (error) {
            return res.status(403).json({ message: error.message })
        }

        let result;

        try {
            const { name } = req.body

            //prepare the model
            result = await Blog.create({
                name,
            })
            console.log("result", result)
        } catch (err) {
            return res.status(403).json({ message: err.message });
        }
    },


    async getBlog(req, res, next) {
        let document;

        try {
            document = await Blog.findOne({ _id: req.params.id }).select('-updateAt -__v')
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }

        return res.json(document)
    },

}


export default blogController