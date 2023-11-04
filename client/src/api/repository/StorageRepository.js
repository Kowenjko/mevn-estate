import {
	ref,
	uploadBytesResumable,
	getDownloadURL,
	deleteObject,
} from 'firebase/storage'
import { storage } from '@/api/FirebaseSetup.js'
import { handleException } from '@/api/helpers/HandleException.js'

export const uploadFileStorage = (file, name) => {
	try {
		return uploadBytesResumable(ref(storage, name), file)
	} catch (e) {
		handleException(e)
	}
}

export const getUrlFileStorage = async (name) => {
	try {
		return await getDownloadURL(ref(storage, name))
	} catch (e) {
		handleException(e)
	}
}

export const deleteFileStorage = async (name) => {
	try {
		await deleteObject(ref(storage, name))
	} catch (e) {
		handleException(e)
	}
}
