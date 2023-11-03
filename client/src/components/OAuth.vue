<script setup>
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { app } from '../firebase.js'
import { useUserStore } from '@/stores/userStore.js'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const handleGoogleClick = async () => {
	try {
		const provider = new GoogleAuthProvider()
		const auth = getAuth(app)

		const result = await signInWithPopup(auth, provider)
		const { displayName, email, photoUrl } = result.user

		const res = await fetch('api/auth/google', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name: displayName, email, photo: photoUrl }),
		})

		const data = await res.json()
		userStore.setCurrentUser(data)
		router.push('/')
	} catch (error) {
		console.log('could not sign in with google', error)
	}
}
</script>

<template>
	<button
		type="button"
		class="bg-red-700 text-white rounded-lg uppercase p-3 hover:opacity-95"
		@click="handleGoogleClick"
	>
		Continue with google
	</button>
</template>

<style lang="scss" scoped></style>
