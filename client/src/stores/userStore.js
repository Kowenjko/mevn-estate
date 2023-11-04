import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useUserStore = defineStore('userStore', () => {
	const currentUser = ref(null)
	const error = ref(null)
	const loading = ref(null)

	const getCurrentUser = () => currentUser.value
	const setCurrentUser = (user) => (currentUser.value = user)

	const userCurrentInLocalStorage = localStorage.getItem('currentUser')

	if (userCurrentInLocalStorage)
		setCurrentUser(JSON.parse(userCurrentInLocalStorage))

	const signInStart = () => (loading.value = true)

	const signInSuccess = (user) => {
		loading.value = false
		error.value = null
		setCurrentUser(user)
	}

	const signInFailure = (err) => {
		loading.value = false
		error.value = err
		setCurrentUser(null)
	}

	watch(
		() => currentUser,
		(state) => {
			localStorage.setItem('currentUser', JSON.stringify(state.value))
		},
		{ deep: true }
	)

	return {
		signInStart,
		signInSuccess,
		signInFailure,
		loading,
		error,
		loading,
		getCurrentUser,
		setCurrentUser,
	}
})
