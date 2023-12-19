import express from 'express'
import { registerController } from '../controllers/index.js'
import { loginController } from '../controllers/index.js'
import { userController } from '../controllers/index.js'
import productsController from '../controllers/productsController.js'
import admin from '../middlewares/admin.js'
import auth from '../middlewares/auth.js'

const router = express.Router()

router.post('/register', registerController.register)
router.post('/login', loginController.login);
router.get('/me', auth, userController.me);
router.post('/products', [auth, admin], productsController.store)
router.put('/products/:id', [auth, admin], productsController.update)
router.delete('/products/:id', [auth, admin], productsController.destroy)
router.get('/products', productsController.index)
router.get('/products/:id', productsController.show)


export default router