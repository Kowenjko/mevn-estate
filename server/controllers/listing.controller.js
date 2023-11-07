import Listing from '../models/listing.model.js'
import { errorHandler } from '../utils/error.js'

export const createListing = async (req, res, next) => {
	console.log('createListing =>', req.body)
	try {
		const listing = await Listing.create(req.body)

		return res.status(201).json(listing)
	} catch (error) {
		next(error)
	}
}
export const deleteListing = async (req, res, next) => {
	console.log('deleteListing =>', req.params.id)

	const listing = await Listing.findById(req.params.id)

	if (!listing) return next(errorHandler(404, 'Listing not found'))
	if (req.user.id !== listing.userRef)
		return next(errorHandler(401, 'You can only delete your own listing!'))
	try {
		await Listing.findOneAndDelete(req.params.id)
		return res.status(201).json({ message: 'Listing has been deleted!' })
	} catch (error) {
		next(error)
	}
}
export const updateListing = async (req, res, next) => {
	console.log('updateListing =>', req.body)

	const listing = await Listing.findById(req.params.id)

	if (!listing) return next(errorHandler(404, 'Listing not found'))
	if (req.user.id !== listing.userRef)
		return next(errorHandler(401, 'You can only update your own listing!'))

	try {
		const updateListing = await Listing.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		)
		return res.status(200).json(updateListing)
	} catch (error) {
		next(error)
	}
}
export const getListing = async (req, res, next) => {
	console.log('getListing =>', req.params.id)

	try {
		const listing = await Listing.findById(req.params.id)

		if (!listing) return next(errorHandler(404, 'Listing not found'))
		return res.status(200).json(listing)
	} catch (error) {
		next(error)
	}
}
