import Joi from "joi"
import User from "../models/user.js";
import Product from "../models/product.js";
import Blog from "../models/blog.js";
import mongoose from "mongoose";


const dashboardController = {

    async dashboard(req, res, next) {

        try {
            const user = await User.countDocuments();
            const products = await Product.countDocuments()
            const blog = await Blog.countDocuments()


            res.json({ user, products, blog });

        } catch (err) {
            return res.status(401).json({ message: err.message });
        }
    },

}


export default dashboardController