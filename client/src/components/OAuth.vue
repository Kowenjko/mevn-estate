<script setup>
import { signInWithPopup } from 'firebase/auth'
import { auth } from '@/api/FirebaseSetup.js'
import { useUserStore } from '@/stores/userStore.js'
import { useRouter } from 'vue-router'
import { useFetch } from '@/composables/useFetch.js'
import { useOAuth } from '@/composables/useOAuth.js'

const userStore = useUserStore()
const router = useRouter()

const { getOAuthProviderIds, getOAuthProvider, getDataProvider } = useOAuth()

const handleGoogleClick = async (providerId) => {
	try {
		userStore.error = false
		const provider = getOAuthProvider(providerId)

		const result = await signInWithPopup(auth, provider)
		const dataProvider = getDataProvider(providerId, result)

		const data = await useFetch('api/auth/google', dataProvider)

		console.log('data', data)
		if (data.success === false) return
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
		@click="handleGoogleClick(getOAuthProviderIds().google)"
	>
		Continue with google
	</button>
	<button
		type="button"
		class="bg-[#1C2128] text-white rounded-lg uppercase p-3 hover:opacity-95"
		@click="handleGoogleClick(getOAuthProviderIds().github)"
	>
		Continue with github
	</button>
	<button
		type="button"
		class="bg-[#0078D4] text-white rounded-lg uppercase p-3 hover:opacity-95"
		@click="handleGoogleClick(getOAuthProviderIds().microsoft)"
	>
		Continue with microsoft
	</button>
</template>

<style lang="scss" scoped></style>
