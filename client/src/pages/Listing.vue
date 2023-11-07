<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import 'swiper/css/bundle'

const listing = ref(null)
const loading = ref(false)
const error = ref(false)
const route = useRoute()

onMounted(async () => {
	loading.value = true
	try {
		const res = await fetch(`/api/listing/get/${route.params.id}`)
		const data = await res.json()

		if (data?.success === false) {
			return (error.value = true)
		}
		listing.value = data
	} catch (err) {
		error.value = true
	} finally {
		loading.value = false
	}
})
</script>

<template>
	<main>
		<p v-if="loading" class="text-center my-7 text-2xl">Loading...</p>
		<p v-if="error" class="text-center text-2xl text-red-700">
			Something went wrong!
		</p>
		<template v-if="listing">
			<swiper>
				<swiper-slide v-for="(url, index) in listing.imageUrls" :key="index">
					<div
						class="h-[550px]"
						:style="{
							background: `url(${url}) center no-repeat`,
							backgroundSize: 'cover',
						}"
					></div>
				</swiper-slide>
			</swiper>
			<h1>{{ listing.name }}</h1>
		</template>
	</main>
</template>

<style lang="scss" scoped></style>
