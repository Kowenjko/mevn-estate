import { errorHandler } from '../utils/error.js'
import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'

export const test = (req, res) => {
	res.json({ message: 'API route is working!' })
}
export const updateUser = async (req, res, next) => {
	console.log('updateUser =>', req.body)
	if (req.user.id !== req.params.id)
		return next(errorHandler(401, 'You can only update your own account!'))

	const { username, email, password, avatar } = req.body

	try {
		if (password) {
			req.body.password = bcryptjs.hashSync(password, 10)
		}

		const updateUser = await User.findByIdAndUpdate(
			req.params.id,
			{ $set: { username, email, password: req.body.password, avatar } },
			{ new: true }
		)

		const { password: pass, ...rest } = updateUser._doc
		res.clearCookie('access_token')
		res.status(200).json(rest)
	} catch (error) {
		next(error)
	}
}
export const deleteUser = async (req, res, next) => {
	console.log('deleteUser =>', req.user.id)
	console.log('deleteUser =>', req.params.id)
	if (req.user.id !== req.params.id)
		return next(errorHandler(401, 'You can only delete your own account!'))

	try {
		await User.findByIdAndDelete(req.params.id)
		res.clearCookie('access_token')
		res.status(200).json({ message: 'User has been deleted!' })
	} catch (error) {
		next(error)
	}
}
