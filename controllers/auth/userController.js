import User from '../../models/user.js'
import Joi from 'joi'
import mongoose from 'mongoose'

const userController = {

    async me(req, res, next) {
        try {
            console.log("req user", req.user)
            const user = await User.findOne({ _id: req.user._id }).select('-password -updatedAt')
            if (!user) {
                return res.status(401).json({ message: "user not exist!" });
            }
            res.json(user);
        } catch (err) {
            return res.status(401).json({ message: err.message });
        }
    },

    async users(req, res, next) {

        try {
            const search = req.query.search;
            console.log("req user", req.user)
            const user = await User.find(search ? { "name": { $regex: search, $options: 'i' } } : {}).select('-password -updatedAt')
            if (!user) {
                return res.status(401).json({ message: "user not exist!" });
            }
            res.json(user);

        } catch (err) {
            return res.status(401).json({ message: err.message });
        }
    },

    async addUsers(req, res, next) {
        const addUsersSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            repeat_password: Joi.ref('password')
        })
        console.log("req", req.body)

        const { error } = addUsersSchema.validate(req.body);
        let usersData;

        try {
            usersData = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                confirmPassword: req.body.confirmPassword,
                type: req.body.type
            })
        } catch (err) {
            console.log('error', err)
            return res.status(500).json({ message: err.message })
        }

        res.status(201).json({ usersData: usersData })
    },


    async userUpdate(req, res, next) {
        const addUsersSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
        })
        console.log("req", req.body)

        const { error } = addUsersSchema.validate(req.body);
        let usersData;

        try {
            usersData = await User.findOneAndUpdate({ _id: req.body.id }, {
                name: req.body.name,
                email: req.body.email,
                type: req.body.type
            }, { new: true })
        } catch (err) {
            console.log('error', err)
            return res.status(500).json({ message: err.message })
        }

        res.status(201).json({ usersData: usersData })
    },


    async deleteUser(req, res, next) {
        const document = await User.findOneAndDelete({ _id: req.body.id });
        if (!document) {
            return res.status(500).json({ message: "Nothing to delete" });
        }

        res.json(document)
    },


    async getUser(req, res, next) {
        let document;

        try {
            document = await User.findOne({ _id: req.params.id })
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
        return res.json(document)
    }

}
export default userController