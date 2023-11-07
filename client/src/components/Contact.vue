<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
	listing: { type: Object },
})

const landlord = ref(null)
const message = ref('')

onMounted(async () => {
	try {
		const res = await fetch(`/api/user/${props.listing.userRef}`)
		const data = await res.json()
		landlord.value = data
	} catch (error) {
		console.log(error)
	}
})
</script>

<template>
	<div className="flex flex-col gap-2">
		<p>
			Contact <span className="font-semibold">{{ landlord?.username }}</span>
			for
			<span className="font-semibold">{{ listing.name.toLowerCase() }}</span>
		</p>
		<textarea
			name="message"
			id="message"
			rows="2"
			v-model="message"
			placeholder="Enter your message here..."
			class="w-full border p-3 rounded-lg"
		></textarea>

		<a
			:href="`mailto:${landlord?.email}?subject=Regarding ${listing.name}&body=${message}`"
			class="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
			>Send Message</a
		>
	</div>
</template>

<style lang="scss" scoped></style>
