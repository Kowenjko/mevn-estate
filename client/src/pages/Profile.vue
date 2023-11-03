<script setup>
import { useUserStore } from '@/stores/userStore.js'

const userStore = useUserStore()
</script>
<template>
	<main class="p-3 max-w-lg mx-auto">
		<h1 class="text-center text-3xl font-semibold my-7">Profile</h1>
		<form class="flex flex-col gap-4">
			<img
				class="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
				:src="userStore.getCurrentUser().avatar"
				alt="avatar"
			/>
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
