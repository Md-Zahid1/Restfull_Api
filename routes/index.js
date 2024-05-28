import express from 'express'
import { registerController } from '../controllers/index.js'
import { loginController } from '../controllers/index.js'
import { userController } from '../controllers/index.js'
import productsController from '../controllers/productsController.js'
import blogController from '../controllers/blogController.js'
import dashboardController from '../controllers/dashboardController.js'
import admin from '../middlewares/admin.js'
import auth from '../middlewares/auth.js'

const router = express.Router()

router.post('/register', registerController.register)
router.post('/login', loginController.login);
router.get('/me', auth, userController.me);
router.get('/users', auth, userController.users);
router.get('/users/:id', auth, userController.getUser)
router.post('/users', auth, userController.addUsers)
router.post('/userupdate', auth, userController.userUpdate)
router.delete('/users', auth, userController.deleteUser)
router.post('/products', [auth, admin], productsController.store)
router.post('/updateproduct', auth, productsController.updateproduct)
router.put('/products/:id', [auth, admin], productsController.update)
router.delete('/products/:id', [auth, admin], productsController.destroy)
router.get('/products', productsController.index)
router.get('/products/:id', productsController.show)
router.post('/blog', auth, blogController.addBlog)
router.get('/blog/:id', auth, blogController.getBlog)
router.get('/dashboard', auth, dashboardController.dashboard)


export default router