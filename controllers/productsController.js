import Joi from "joi"
import product from "../models/product.js"
import productSchema from "../validators/productValidator.js"
import multer from 'multer'
import path from 'path'
import fs from 'fs'


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`
        cb(null, uniqueName);
    }
})


const handleMultipartData = multer({ storage, limits: { fileSize: 1000000 * 5 } }).single('image')

const productsController = {
    async store(req, res, next) {
        handleMultipartData(req, res,
            async (err) => {
                if (err) {
                    return res.status(500).json({ message: err.message })
                }
                const filePath = req.file.path
                //validation
                const { error } = productSchema.validate(req.body)
                if (error) {
                    //delete the uploadfile
                    fs.unlink(`${appRoot}/${filePath}`, (err) => {
                        if (err) {
                            return res.status(500).json({ message: err.message })
                        }
                    })
                    return res.status(500).json({ message: error.message })
                }

                const { name, price, size } = req.body
                let document;

                try {
                    document = await product.create({
                        name,
                        price,
                        size,
                        image: filePath
                    })
                } catch (err) {
                    return res.status(500).json({ message: err.message })
                }

                res.status(201).json(document)
            });
    },

    update(req, res, next) {

        handleMultipartData(req, res,
            async (err) => {
                console.log('update',)
                if (err) {
                    console.log('err', err)
                    return res.status(500).json({ message: err.message })
                }
                let filePath;
                if (req.file) {
                    filePath = req.file.path
                }

                //validation
                const { error } = productSchema.validate(req.body)
                if (error) {
                    //delete the uploadfile
                    if (req.file) {
                        fs.unlink(`${appRoot}/${filePath}`, (err) => {
                            if (err) {
                                return res.status(500).json({ message: err.message })
                            }
                        })
                    }
                    return res.status(500).json({ message: error.message })
                }

                const { name, price, size } = req.body
                let document;

                try {
                    document = await product.findOneAndUpdate({ _id: req.params.id }, {
                        name,
                        price,
                        size,
                        ...(req.file && { image: filePath })
                    }, { new: true })
                    console.log('document', document)
                } catch (err) {
                    return res.status(500).json({ message: err.message })
                }

                res.status(201).json(document)
            });
    },

    async destroy(req, res, next) {
        const document = await product.findOneAndDelete({ _id: req.params.id });
        if (!document) {
            return res.status(500).json({ message: "Nothing to delete" });
        }

        //image delete
        const imagePath = document._doc.image
        fs.unlink(`${appRoot}/${imagePath}`, (err) => {
            if (err) {
                return res.status(500).json({ message: "something went wrong" });
            }
        })

        res.json(document)
    },

    async index(req, res, next) {
        let documents;

        try {
            documents = await product.find().select('-updatedAt -__v')
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }

        return res.json(documents)
    },

    async show(req, res, next) {
        let document;

        try {
            document = await product.findOne({ _id: req.params.id }).select('-updateAt -__v')
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }

        return res.json(document)
    },


    async updateproduct(req, res, next) {
        handleMultipartData(req, res,
            async (err) => {
                if (err) {
                    return res.status(500).json({ message: err.message })
                }
                const filePath = req.file.path
                //validation
                const { error } = productSchema.validate(req.body)
                if (error) {
                    //delete the uploadfile
                    fs.unlink(`${appRoot}/${filePath}`, (err) => {
                        if (err) {
                            return res.status(500).json({ message: err.message })
                        }
                    })
                    return res.status(500).json({ message: error.message })
                }

                const { name, price, size } = req.body
                let document;

                try {
                    document = await product.findOneAndUpdate({
                        name,
                        price,
                        size,
                        image: filePath
                    })
                } catch (err) {
                    return res.status(500).json({ message: err.message })
                }

                res.status(201).json(document)
            });
    },

}


export default productsController