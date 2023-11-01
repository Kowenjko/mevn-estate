import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('userStore', () => {
	const currentUser = ref(null)
	const error = ref(null)
	const loading = ref(null)

	const signInStart = () => (loading.value = true)

	const signInSuccess = (user) => {
		loading.value = false
		error.value = null
		currentUser.value = user
	}

	const signInFailure = (err) => {
		loading.value = false
		error.value = err
	}

	return { signInStart, signInSuccess, signInFailure, loading, error, loading }
})
