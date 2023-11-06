<script setup>
import { useUserStore } from '@/stores/userStore.js'
import { computed, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

import { uploadFileStorage } from '@/api/repository/StorageRepository.js'
import { useFetch } from '@/composables/UseFetch.js'

import { getDownloadURL } from 'firebase/storage'

const userStore = useUserStore()
const router = useRouter()
const { username, email, avatar } = userStore.currentUser

const fileRef = ref(null)
const file = ref(null)
const filePerc = ref(0)
const fileUploadError = ref(false)
const updateSuccess = ref(false)
const showListingsError = ref(false)
const userListings = ref([])

const formData = reactive({ username, email, avatar })

const isUploadFile = computed(() => filePerc.value > 0 && filePerc.value < 100)

const resetParams = () => {
	updateSuccess.value = false
	file.value = null
	filePerc.value = 0
	fileUploadError.value = false
}

const handleFileUpload = () => {
	const fileName = new Date().getTime() + file.value.name
	const uploadTask = uploadFileStorage(file.value, fileName)

	uploadTask.on(
		'state_changed',
		(snapshot) => {
			const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
			filePerc.value = Math.round(progress)
		},
		(error) => {
			console.log('Error uploaded', error)
			fileUploadError.value = true
		},
		async () => {
			const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
			Object.assign(formData, { avatar: downloadURL })
		}
	)
}

const changeFile = (event) => {
	resetParams()
	file.value = event.target.files[0]
	handleFileUpload()
	event.target.value = null
}

const handleSubmit = async () => {
	try {
		userStore.isStart()
		const data = await useFetch(
			`api/user/update/${userStore.currentUser._id}`,
			formData
		)

		if (data?.success === false) {
			return userStore.isFailure(data.message)
		}

		userStore.isSuccess(data)
		updateSuccess.value = true
	} catch (error) {
		userStore.isFailure(error.message)
	}
}

const handleDeleteUser = async () => {
	try {
		userStore.isStart()
		const data = await useFetch(
			`api/user/delete/${userStore.currentUser._id}`,
			{},
			'DELETE'
		)

		if (data?.success === false) {
			return userStore.isFailure(data.message)
		}
		userStore.isDeleteSuccess()
		router.push('/sign-in')
	} catch (error) {
		userStore.isFailure(error.message)
	}
}

const handleSignOut = async () => {
	try {
		userStore.isStart()
		const data = await fetch(`api/auth/signout`)

		if (data?.success === false) {
			return userStore.isFailure(data.message)
		}
		userStore.isDeleteSuccess()
		router.push('/sign-in')
	} catch (error) {
		userStore.isFailure(error.message)
	}
}

const handleShowListings = async () => {
	showListingsError.value = false
	try {
		const res = await fetch(`api/user/listings/${userStore.currentUser._id}`)
		const data = await res.json()

		userListings.value = data
		if (data?.success === false) {
			return userStore.isFailure(data.message)
		}
	} catch (error) {
		showListingsError.value = true
	}
}

const handleListingDelete = async (listingId) => {
	try {
		const data = await useFetch(`api/listing/delete/${listingId}`, {}, 'DELETE')

		if (data?.success === false) {
			return userStore.isFailure(data.message)
		}
		userListings.value = [...userListings.value].filter(
			(listing) => listing._id !== listingId
		)
		console.log(data.message)
	} catch (error) {
		console.log(error)
	}
}
</script>
<template>
	<main class="p-3 max-w-lg mx-auto">
		<h1 class="text-center text-3xl font-semibold my-7">Profile</h1>
		<form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
			<input
				@change="changeFile($event)"
				hidden
				type="file"
				ref="fileRef"
				accept="image/*"
			/>
			<img
				@click="fileRef.click()"
				class="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
				:src="formData.avatar || userStore.getCurrentUser().avatar"
				alt="avatar"
			/>
			<p class="self-center text-sm">
				<span v-if="fileUploadError" class="text-red-500"
					>Error Image upload (image must be less than 2mb)</span
				>
				<span v-else-if="isUploadFile" class="text-slate-900"
					>Uploading {{ filePerc }}%</span
				>
				<span v-else-if="filePerc === 100" class="text-green-500">
					Successfully uploaded!</span
				>
			</p>

			<input
				type="text"
				placeholder="username"
				class="border p-3 rounded-lg"
				id="username"
				v-model="formData.username"
			/>
			<input
				type="email"
				placeholder="email"
				class="border p-3 rounded-lg"
				id="email"
				v-model="formData.email"
			/>
			<input
				type="password"
				placeholder="password"
				class="border p-3 rounded-lg"
				id="password"
				v-model="formData.password"
			/>
			<button
				type="submit"
				class="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80 uppercase"
			>
				{{ userStore.loading ? 'Loading...' : 'Update' }}
			</button>
			<router-link
				class="bg-green-700 text-white p-3 rounded-lg hover:opacity-95 uppercase text-center"
				to="/create-listing"
			>
				Create Listing
			</router-link>
		</form>
		<div class="flex justify-between items-center mt-5">
			<button @click="handleDeleteUser" class="text-red-700">
				Delete account
			</button>
			<button @click="handleSignOut" class="text-red-700">Sign out</button>
		</div>
		<p v-if="userStore.error" class="text-red-500 mt-5">
			{{ userStore.error }}
		</p>
		<p v-if="updateSuccess" class="text-green-500 mt-5">
			User is updated successfully!!!
		</p>
		<button @click="handleShowListings" class="text-green-700 w-full mt-5">
			Show listings
		</button>
		<p v-if="showListingsError" class="text-red-700 mt-5">
			Error show listings
		</p>
		<template v-if="userListings.length > 0">
			<h2 class="text-center text-2xl text-slate-900 font-bold my-7">
				Your Listings
			</h2>
			<div
				v-for="listing in userListings"
				:key="listing._id"
				class="flex items-center justify-between gap-4 border border-gray-300 rounded-lg p-2 mt-4"
			>
				<router-link :to="`/listing/${listing._id}`">
					<img
						:src="listing.imageUrls[0]"
						:alt="listing.name"
						class="w-16 h-16 object-contain rounded-lg"
					/>
				</router-link>
				<router-link
					:to="`/listing/${listing._id}`"
					class="text-slate-700 hover:underline font-semibold flex-1 truncate"
				>
					{{ listing.name }}
				</router-link>
				<div class="flex flex-col items-center">
					<button
						@click="handleListingDelete(listing._id)"
						class="uppercase text-red-700"
					>
						Delete
					</button>
					<button class="uppercase text-green-700">Edit</button>
				</div>
			</div>
		</template>
	</main>
</template>

<style scoped></style>
