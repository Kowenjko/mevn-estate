<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Scrollbar, Controller } from 'swiper/modules'
import { ref, onMounted } from 'vue'
import ListingItem from '@/components/ListingItem.vue'

const offerListings = ref([])
const saleListings = ref([])
const rentListings = ref([])

const fetchOfferListings = async () => {
	try {
		const res = await fetch('/api/listing/get?offer=true&limit=3')
		const data = await res.json()
		offerListings.value = data
		fetchRentListings()
	} catch (error) {
		console.log(error)
	}
}
const fetchRentListings = async () => {
	try {
		const res = await fetch('/api/listing/get?type=rent&limit=3')
		const data = await res.json()
		rentListings.value = data
		fetchSaleListings()
	} catch (error) {
		console.log(error)
	}
}

const fetchSaleListings = async () => {
	try {
		const res = await fetch('/api/listing/get?type=sale&limit=3')
		const data = await res.json()
		saleListings.value = data
	} catch (error) {
		log(error)
	}
}

onMounted(fetchOfferListings)
</script>
<template>
	<main>
		<div class="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
			<h1 class="text-slate-700 font-bold text-3xl lg:text-6xl">
				Find your next <span class="text-slate-500">perfect</span>
				<br />
				place with ease
			</h1>
			<div class="text-gray-400 text-xs sm:text-sm">
				Sahand Estate is the best place to find your next perfect place to live.
				<br />
				We have a wide range of properties for you to choose from.
			</div>
			<router-link
				to="/search"
				class="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
			>
				Let's get started...
			</router-link>
		</div>

		<swiper
			v-if="offerListings?.length > 0"
			:modules="[Navigation, Pagination, Scrollbar, Controller]"
			navigation
			:slides-per-view="1"
			:space-between="500"
			:pagination="{ clickable: true }"
			:scrollbar="{ draggable: true }"
			class="shadow-lg"
		>
			<swiper-slide v-for="(listing, index) in offerListings" :key="index">
				<div
					class="h-[500px]"
					:style="{
						background: `url(${listing.imageUrls[0]}) center no-repeat`,
						backgroundSize: 'cover',
					}"
				></div>
			</swiper-slide>
		</swiper>

		<div class="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
			<div v-if="offerListings && offerListings.length > 0" class="">
				<div class="my-3">
					<h2 class="text-2xl font-semibold text-slate-600">Recent offers</h2>
					<router-link
						class="text-sm text-blue-800 hover:underline"
						to="/search?offer=true"
						>Show more offers</router-link
					>
				</div>
				<div class="flex flex-wrap gap-4">
					<ListingItem
						v-for="listing in offerListings"
						:listing="listing"
						:key="listing._id"
					/>
				</div>
			</div>

			<div v-if="rentListings && rentListings.length > 0" class="">
				<div class="my-3">
					<h2 class="text-2xl font-semibold text-slate-600">
						Recent places for rent
					</h2>
					<router-link
						class="text-sm text-blue-800 hover:underline"
						to="/search?type=rent"
						>Show more places for rent</router-link
					>
				</div>
				<div class="flex flex-wrap gap-4">
					<ListingItem
						v-for="listing in rentListings"
						:listing="listing"
						:key="listing._id"
					/>
				</div>
			</div>

			<div v-if="saleListings && saleListings.length > 0" class="">
				<div class="my-3">
					<h2 class="text-2xl font-semibold text-slate-600">
						Recent places for sale
					</h2>
					<Link
						class="text-sm text-blue-800 hover:underline"
						to="/search?type=sale"
						>Show more places for sale</Link
					>
				</div>
				<div class="flex flex-wrap gap-4">
					<ListingItem
						v-for="listing in saleListings"
						:listing="listing"
						:key="listing._id"
					/>
				</div>
			</div>
		</div>
	</main>
</template>

<style scoped></style>
