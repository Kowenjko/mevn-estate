<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { uploadFileStorage } from '@/api/repository/StorageRepository.js'
import { getDownloadURL } from 'firebase/storage'
import { useFetch } from '@/composables/UseFetch.js'
import { useUserStore } from '@/stores/userStore.js'

const files = ref([])
const imageUploadError = ref(null)
const error = ref(null)
const loading = ref(false)
const uploading = ref(false)

const formData = reactive({
	imageUrls: [],
	name: 'test',
	description: 'dfdf',
	address: 'df',
	type: 'rent',
	bedrooms: 1,
	bathrooms: 1,
	regularPrice: 50,
	discountPrice: 0,
	offer: false,
	parking: true,
	furnished: false,
})

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const handleChangeFiles = (event) => {
	files.value = event.target.files
	// event.target.value = null
}

const storeImage = async (file) => {
	return new Promise((resolve, reject) => {
		const fileName = new Date().getTime() + file.name

		const uploadTask = uploadFileStorage(file, fileName)

		uploadTask.on(
			'state_changed',
			(snapshot) => {
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
				console.log(`Upload id ${progress}% done`)
			},

			(error) => {
				reject(error)
			},
			async () => {
				const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
				resolve(downloadURL)
			}
		)
	})
}

const handleImageSubmit = async () => {
	if (files.value.length + formData.imageUrls.length > 6) {
		imageUploadError.value = 'You can only upload 6 images per listing'
		return
	}
	uploading.value = true
	const promises = []

	for (const file of files.value) {
		promises.push(storeImage(file))
	}

	try {
		const urls = await Promise.all(promises)
		Object.assign(formData, { imageUrls: [...formData.imageUrls, ...urls] })
		imageUploadError.value = null
	} catch (error) {
		imageUploadError.value = 'Image upload failed (2 mb max per image)'
	} finally {
		uploading.value = false
	}
}

const handleRemoveImage = (index) => {
	formData.imageUrls = [...formData.imageUrls].filter((_, i) => i !== index)
}

const handleSubmit = async () => {
	if (formData.regularPrice < formData.discountPrice)
		return (error.value = 'Discount price must be lower than regular price')

	if (formData.imageUrls.length < 1)
		return (error.value = 'You must upload at least one image')

	try {
		loading.value = true
		console.log(route.params.id)
		const data = await useFetch(`/api/listing/update/${route.params.id}`, {
			...formData,
			userRef: userStore.currentUser._id,
		})

		if (data?.success === false) {
			return (error.value = data.message)
		}
		router.push(`/listing/${data._id}`)
	} catch (error) {
		error.value = error.message
	} finally {
		loading.value = false
	}
}

onMounted(async () => {
	const res = await fetch(`/api/listing/get/${route.params.id}`)
	const data = await res.json()
	Object.assign(formData, { ...data })
})
</script>

<template>
	<main class="max-w-4xl mx-auto p-3">
		<h1 class="text-3xl font-semibold text-center my-7">Create Listing</h1>

		<form
			class="flex flex-col sm:flex-row gap-4"
			@submit.prevent="handleSubmit"
		>
			<div class="flex flex-col gap-4 w-full flex-1">
				<input
					type="text"
					placeholder="Name"
					class="border p-3 rounded-lg"
					id="name"
					maxlength="62"
					minlength="10"
					required
					autocomplete="off"
					v-model="formData.name"
				/>
				<textarea
					placeholder="Description"
					class="border p-3 rounded-lg"
					id="description"
					v-model="formData.description"
					required
				/>
				<input
					type="text"
					placeholder="Address"
					class="border p-3 rounded-lg"
					id="address"
					required
					autocomplete="off"
					v-model="formData.address"
				/>

				<div class="flex gap-6 flex-wrap">
					<div class="flex gap-6 border border-gray-300 p-2 rounded">
						<div class="flex gap-2 items-center">
							<input
								type="radio"
								id="sale"
								class="w-5 cursor-pointer"
								value="sale"
								v-model="formData.type"
							/>
							<label for="sale" class="cursor-pointer">Sale</label>
						</div>
						<div class="flex gap-2 items-center">
							<input
								type="radio"
								id="rent"
								class="w-5 cursor-pointer"
								value="rent"
								v-model="formData.type"
							/>
							<label for="rent" class="cursor-pointer">Rent</label>
						</div>
					</div>
					<div class="flex gap-2 items-center">
						<input
							type="checkbox"
							id="parking"
							class="w-5 cursor-pointer"
							v-model="formData.parking"
						/>
						<label for="parking" class="cursor-pointer">Parking spot</label>
					</div>
					<div class="flex gap-2 items-center">
						<input
							type="checkbox"
							id="furnished"
							class="w-5 cursor-pointer"
							v-model="formData.furnished"
						/>
						<label for="furnished" class="cursor-pointer">Furnished</label>
					</div>
					<div class="flex gap-2 items-center">
						<input
							type="checkbox"
							id="offer"
							class="w-5 cursor-pointer"
							v-model="formData.offer"
						/>
						<label for="offer" class="cursor-pointer">Offer</label>
					</div>
				</div>
				<div class="flex items-center gap-6 flex-wrap">
					<div class="flex items-center gap-2">
						<input
							type="number"
							id="bedrooms"
							min="1"
							max="10"
							required
							class="p-3 border-gray-300 rounded-lg"
							v-model="formData.bedrooms"
						/>
						<label for="bedrooms">Beds</label>
					</div>
					<div class="flex items-center gap-2">
						<input
							type="number"
							id="bathrooms"
							min="1"
							max="10"
							required
							class="p-3 border-gray-300 rounded-lg"
							v-model="formData.bathrooms"
						/>
						<label for="bathrooms">Baths</label>
					</div>
					<div class="flex items-center gap-2">
						<input
							type="number"
							id="regularPrice"
							min="50"
							max="1000000"
							required
							class="p-3 border-gray-300 rounded-lg"
							v-model="formData.regularPrice"
						/>
						<label for="regularPrice" class="flex flex-col items-center">
							Regular price
							<span class="text-xs">($ / Month)</span>
						</label>
					</div>

					<div v-if="formData.offer" class="flex items-center gap-2">
						<input
							type="number"
							id="discountPrice"
							min="0"
							max="1000000"
							required
							class="p-3 border-gray-300 rounded-lg"
							v-model="formData.discountPrice"
						/>
						<label for="discountPrice" class="flex flex-col items-center">
							Discounted price
							<span class="text-xs">($ / Month)</span>
						</label>
					</div>
				</div>
			</div>
			<div class="flex flex-col gap-4 flex-1">
				<p class="font-semibold">
					Images:
					<span class="font-normal text-gray-600 ml-2"
						>The first image will be the cover (max 6)</span
					>
				</p>
				<div class="flex items-center gap-4">
					<input
						@change="handleChangeFiles"
						type="file"
						id="images"
						accept="image/*"
						multiple
						class="p-3 border border-gray-300 rounded w-full"
					/>
					<button
						@click.prevent="handleImageSubmit"
						type="button"
						:disabled="uploading"
						class="p-3 text-green-700 border rounded uppercase hover:shadow-lg disabled:opacity-80 transition-all border-green-700"
					>
						{{ uploading ? 'Uploading...' : 'Upload' }}
					</button>
				</div>
				<p v-if="imageUploadError" class="text-red-700 text-sm">
					{{ imageUploadError }}
				</p>
				<template v-if="formData.imageUrls.length > 0">
					<div
						class="flex justify-between items-center p-3 border"
						v-for="(url, index) in formData.imageUrls"
						:key="index"
					>
						<img
							class="w-20 h-20 object-contain rounded-lg"
							:src="url"
							alt="image"
						/>
						<button
							@click="handleRemoveImage(index)"
							type="button"
							class="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
						>
							Delete
						</button>
					</div>
				</template>

				<button
					type="submit"
					class="uppercase p-3 bg-slate-700 rounded-lg text-white hover:opacity-95 disabled:opacity-80"
					:disabled="loading || uploading"
				>
					{{ loading ? 'Updating...' : 'Update Listing' }}
				</button>
				<p v-if="error" class="text-red-700 text-sm">{{ error }}</p>
			</div>
		</form>
	</main>
</template>

<style lang="scss" scoped></style>
