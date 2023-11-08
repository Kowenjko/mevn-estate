<script setup>
import { computed } from 'vue'

const props = defineProps(['listing'])

const getPrice = computed(() =>
	props.listing.offer
		? props.listing.discountPrice.toLocaleString('en-US')
		: props.listing.regularPrice.toLocaleString('en-US')
)

const listingBedrooms = computed(() =>
	props.listing.bedrooms > 1
		? `${props.listing.bedrooms} beds `
		: `${props.listing.bedrooms} bed `
)
const listingBathrooms = computed(() =>
	props.listing.bathrooms > 1
		? `${props.listing.bathrooms} baths `
		: `${props.listing.bathrooms} bath `
)
</script>

<template>
	<div
		class="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]"
	>
		<router-link :to="`/listing/${listing._id}`" class="cursor-pointer">
			<img
				:src="
					listing.imageUrls[0] ||
					'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
				"
				alt="listing cover"
				class="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
			/>
			<div class="p-3 flex flex-col gap-2 w-full">
				<p class="truncate text-lg font-semibold text-slate-700">
					{{ listing.name }}
				</p>
				<div class="flex items-center gap-1">
					<fa-icon icon="location-dot" class="text-xs text-green-500" />

					<p class="text-sm text-gray-600 truncate w-full">
						{{ listing.address }}
					</p>
				</div>
				<p class="text-sm text-gray-600 line-clamp-2">
					{{ listing.description }}
				</p>
				<p class="text-slate-500 mt-2 font-semibold">
					${{ getPrice }} <span v-if="listing.type === 'rent'">/ month</span>
				</p>
				<div class="text-slate-700 flex gap-4">
					<div class="font-bold text-xs">
						<fa-icon icon="fa-solid fa-bed" class="text-sm" />
						{{ listingBedrooms }}
					</div>
					<div class="font-bold text-xs">
						<fa-icon icon="fa-solid fa-bath" class="text-sm" />
						{{ listingBathrooms }}
					</div>
				</div>
			</div>
		</router-link>
	</div>
</template>

<style lang="scss" scoped></style>
