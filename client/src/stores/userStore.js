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

	const isStart = () => {
		loading.value = true
		error.value = null
	}

	const isSuccess = (user) => {
		loading.value = false
		error.value = null
		setCurrentUser(user)
	}

	const isFailure = (err) => {
		loading.value = false
		error.value = err
		// setCurrentUser(null)
	}

	const isDeleteSuccess = () => {
		loading.value = false
		error.value = null
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
		isStart,
		isSuccess,
		isFailure,
		loading,
		error,
		loading,
		currentUser,
		getCurrentUser,
		setCurrentUser,
		isDeleteSuccess,
	}
})
