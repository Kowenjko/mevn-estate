<script setup>
import { useUserStore } from '@/stores/userStore.js'
import { computed, ref, watch } from 'vue'
import { uploadFileStorage } from '@/api/repository/StorageRepository.js'

import { getDownloadURL } from 'firebase/storage'

const fileRef = ref(null)

const userStore = useUserStore()
const file = ref(null)
const filePerc = ref(0)
const fileUploadError = ref(false)
const formData = ref({})

const isUploadFile = computed(() => filePerc.value > 0 && filePerc.value < 100)

const changeFile = (event) => {
	file.value = event.target.files[0]
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
			formData.value = { ...formData.value, avatar: downloadURL }
		}
	)
}

watch(file, (value) => {
	console.log(value)
	if (value) handleFileUpload()
})
</script>
<template>
	<main class="p-3 max-w-lg mx-auto">
		<h1 class="text-center text-3xl font-semibold my-7">Profile</h1>
		<form class="flex flex-col gap-4" @submit.prevent="">
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
				<span v-if="fileUploadError" class="text-red-700"
					>Error Image upload (image must be less than 2mb)</span
				>
				<span v-else-if="isUploadFile" class="text-slate-700"
					>Uploading {{ filePerc }}%</span
				>
				<span v-else-if="filePerc === 100" class="text-green-700">
					Successfully uploaded!</span
				>
			</p>

			<input
				type="text"
				placeholder="username"
				class="border p-3 rounded-lg"
				id="username"
			/>
			<input
				type="email"
				placeholder="email"
				class="border p-3 rounded-lg"
				id="email"
			/>
			<input
				type="password"
				placeholder="password"
				class="border p-3 rounded-lg"
				id="password"
			/>
			<button
				type="submit"
				class="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80 uppercase"
			>
				Update
			</button>
		</form>
		<div class="flex justify-between items-center mt-5">
			<button class="text-red-700">Delete account</button>
			<button class="text-red-700">Sign out</button>
		</div>
	</main>
</template>

<style scoped></style>
