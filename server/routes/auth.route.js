import { Router } from 'express'
import {
	signin,
	signup,
	google,
	signout,
} from '../controllers/auth.controller.js'

const router = Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/signout', signout)
router.post('/google', google)
router.post('/google', google)

export default router
