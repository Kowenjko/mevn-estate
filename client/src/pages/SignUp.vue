<script setup></script>
<template>
	<main class="p-3 max-w-lg mx-auto">
		<h1 class="text-3xl text-center font-semibold">Sign Up</h1>
		<form class="flex flex-col gap-4">
			<input
				type="text"
				placeholder="username"
				class="border p-3 rounded-lg"
				id="username"
			/>
			<input
				type="text"
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
				class="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 transition-all"
			>
				Sign up
			</button>
		</form>
		<div class="flex gap-2 mt-5">
			<p>Have an account?</p>
			<router-link to="/sign-in">
				<span class="text-blue-700">Sign in</span>
			</router-link>
		</div>
	</main>
</template>

<style scoped></style>
