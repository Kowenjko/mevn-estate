<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const formData = reactive({})
const error = ref(null)
const loading = ref(false)

const router = useRouter()

const handleChange = (event) => {
	Object.assign(formData, { [event.target.id]: event.target.value })
}

const handleSubmit = async () => {
	error.value = null
	try {
		loading.value = true
		const res = await fetch('/api/auth/signin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		})

		const data = await res.json()

		if (data?.success === false) return (error.value = data.message)
		router.push('/')
	} catch (error) {
		error.value = error
	} finally {
		loading.value = false
	}
}
</script>
<template>
	<main class="p-3 max-w-lg mx-auto">
		<h1 class="text-3xl text-center font-semibold my-7">Sign In</h1>
		<form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
			<input
				type="text"
				placeholder="email"
				class="border p-3 rounded-lg"
				id="email"
				@change="handleChange"
			/>
			<input
				type="password"
				placeholder="password"
				class="border p-3 rounded-lg"
				id="password"
				@change="handleChange"
			/>
			<button
				class="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 transition-all"
				:disabled="loading"
			>
				{{ loading ? 'Loading...' : 'Sign In' }}
			</button>
		</form>
		<div class="flex gap-2 mt-5">
			<p>Do not have an account?</p>
			<router-link to="/sign-up">
				<span class="text-blue-700">Sign Up</span>
			</router-link>
		</div>
		<p v-if="error" class="text-red-500 mt-5">{{ error }}</p>
	</main>
</template>

<style scoped></style>
