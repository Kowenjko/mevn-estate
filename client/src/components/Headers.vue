<script setup>
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { useUserStore } from '@/stores/userStore.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const searchTerm = ref('')

const userStore = useUserStore()

const router = useRouter()

const handleSubmit = () => {
	const urlParams = new URLSearchParams(window.localStorage.search)
	urlParams.set('searchTerm', searchTerm.value)
	window.location.search = urlParams
	const searchQuery = urlParams.toString()
	router.push(`/search?${searchQuery}`)
}
</script>
<template>
	<header class="bg-slate-200 shadow-md">
		<div class="flex justify-between items-center max-w-6xl mx-auto sm:p-3">
			<router-link to="/">
				<h1 class="font-bold text-sm sm:text-xl flex flex-wrap">
					<span class="text-slate-500">Sahand</span>
					<span class="text-slate-700">Estate</span>
				</h1>
			</router-link>
			<form
				@submit="handleSubmit"
				@keydown.enter="handleSubmit"
				class="bg-slate-100 p-3 rounded-lg flex items-center justify-between gap-2 w-24 sm:w-64"
			>
				<input
					type="text"
					placeholder="Search..."
					class="bg-transparent focus:outline-none w-full"
					v-model="searchTerm"
				/>
				<button type="submit">
					<MagnifyingGlassIcon class="w-4 text-slate-500" />
				</button>
			</form>
			<ul class="flex gap-4 items-center font-medium">
				<li class="hidden sm:inline text-slate-500 hover:underline">
					<router-link to="/">Home</router-link>
				</li>
				<li class="hidden sm:inline text-slate-500 hover:underline">
					<router-link to="/about">About</router-link>
				</li>
				<li class="text-slate-500 hover:underline">
					<router-link to="/profile">
						<img
							class="rounded-full h-7 w-7 object-cover"
							v-if="userStore.getCurrentUser()"
							:src="userStore.getCurrentUser().avatar"
							alt="avatar"
							referrerpolicy="no-referrer"
						/>
						<span v-else>Sign In</span>
					</router-link>
				</li>
			</ul>
		</div>
	</header>
</template>

<style scoped>
.router-link-exact-active {
	@apply text-slate-950;
}
</style>
