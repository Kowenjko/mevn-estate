<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Scrollbar, Controller } from 'swiper/modules'
import { MapPinIcon } from '@heroicons/vue/24/solid'
import { useUserStore } from '@/stores/userStore.js'
import Contact from '@/components/Contact.vue'

import 'swiper/css/bundle'

const listing = ref(null)
const loading = ref(false)
const error = ref(false)
const copied = ref(false)
const contact = ref(false)

const route = useRoute()
const userStore = useUserStore()

const getPrice = computed(() =>
	listing.value.offer
		? listing.value.discountPrice.toLocaleString('en-US')
		: listing.value.regularPrice.toLocaleString('en-US')
)

const isShowMount = computed(() =>
	listing.value.type === 'rent' ? ' / month' : ''
)
const getType = computed(() =>
	listing.value.type === 'rent' ? ' For Rent' : 'For Sale'
)

const calcPrice = computed(
	() => listing.value.regularPrice - listing.value.discountPrice
)

const listingBedrooms = computed(() =>
	listing.value.bedrooms > 1
		? `${listing.value.bedrooms} beds `
		: `${listing.value.bedrooms} bed `
)
const listingBathrooms = computed(() =>
	listing.value.bathrooms > 1
		? `${listing.value.bathrooms} baths `
		: `${listing.value.bathrooms} bath `
)
const isParking = computed(() =>
	listing.value.parking ? 'Parking spot' : 'No Parking'
)
const isFurnished = computed(() =>
	listing.value.furnished ? 'Furnished' : 'Unfurnished'
)

const isContact = computed(
	() =>
		userStore.currentUser &&
		listing.value.userRef !== userStore.currentUser._id &&
		!contact.value
)

const copyClipBoard = () => {
	copied.value = true
	navigator.clipboard.writeText(window.location.href)
	setTimeout(() => (copied.value = false), 2000)
}
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
		<p
			v-if="loading"
			class="flex justify-center items-center h-[calc(100vh-200px)] my-7 text-2xl"
		>
			Loading...
		</p>
		<p v-if="error" class="text-center text-2xl text-red-700">
			Something went wrong!
		</p>
		<template v-if="listing">
			<swiper
				:modules="[Navigation, Pagination, Scrollbar, Controller]"
				navigation
				:slides-per-view="1"
				:space-between="500"
				:pagination="{ clickable: true }"
				:scrollbar="{ draggable: true }"
			>
				<swiper-slide v-for="(url, index) in listing.imageUrls" :key="index">
					<div
						class="h-[350px]"
						:style="{
							background: `url(${url}) center no-repeat`,
							backgroundSize: 'cover',
						}"
					></div>
				</swiper-slide>
			</swiper>
			<button
				class="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer"
				@click="copyClipBoard"
			>
				<fa-icon icon="share" />
			</button>
			<p
				v-if="copied"
				class="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2"
			>
				Link copied!
			</p>
			<div class="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
				<h1 class="text-2xl font-semibold">
					{{ listing.name }} - ${{ getPrice }} {{ isShowMount }}
				</h1>
				<p class="flex items-center mt-6 gap-2 text-slate-600 text-sm">
					<MapPinIcon class="text-green-700 w-4" />
					{{ listing.address }}
				</p>
				<div class="flex gap-4">
					<p
						class="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md"
					>
						{{ getType }}
					</p>
					<p
						v-if="listing.offer"
						class="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md"
					>
						${{ calcPrice }}
					</p>
				</div>
				<p class="text-slate-800">
					<span class="font-semibold text-black">Description: </span>
					{{ listing.description }}
				</p>
				<ul
					class="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6"
				>
					<li class="flex items-center gap-1 whitespace-nowrap">
						<fa-icon icon="fa-solid fa-bed" class="text-lg" />
						{{ listingBedrooms }}
					</li>
					<li class="flex items-center gap-1 whitespace-nowrap">
						<fa-icon icon="fa-solid fa-bath" class="text-lg" />
						{{ listingBathrooms }}
					</li>
					<li class="flex items-center gap-1 whitespace-nowrap">
						<fa-icon icon="fa-solid fa-parking" class="text-lg" />
						{{ isParking }}
					</li>
					<li class="flex items-center gap-1 whitespace-nowrap">
						<fa-icon icon="fa-solid fa-chair" class="text-lg" />
						{{ isFurnished }}
					</li>
				</ul>
				<button
					v-if="isContact"
					@click="contact = true"
					class="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
				>
					Contact landlord
				</button>
				<contact v-if="contact" :listing="listing" />
			</div>
		</template>
	</main>
</template>

<style lang="scss" scoped></style>
