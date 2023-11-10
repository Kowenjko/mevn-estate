<script setup>
import { reactive, ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ListingItem from '@/components/ListingItem.vue'

const router = useRouter()
const route = useRoute()

const loading = ref(false)
const listings = ref([])
const showMore = ref(false)
const sidebardata = reactive({
	searchTerm: '',
	type: 'all',
	parking: false,
	furnished: false,
	offer: false,
	sort: 'created_at',
	order: 'desc',
})

const searchInListing = async () => {
	if (route?.query) Object.assign(sidebardata, { ...route.query })
	loading.value = true
	showMore.value = false

	const urlParams = new URLSearchParams(sidebardata)
	const searchQuery = urlParams.toString()

	const res = await fetch(`/api/listing/get?${searchQuery}`)
	const data = await res.json()

	if (data.length > 8) {
		showMore.value = true
	} else {
		showMore.value = false
	}
	listings.value = data
	loading.value = false
}
onMounted(searchInListing)

watch(() => route.fullPath, searchInListing, { deep: true })

const handleChange = (e) => {
	if (e.target.id === 'sort_order') {
		const sort = e.target.value.split('_')[0] || 'created_at'
		const order = e.target.value.split('_')[1] || 'desc'

		Object.assign(sidebardata, { sort, order })
	}
}

const handleSubmit = () => {
	router.push({ name: 'search', query: sidebardata })
}

const onShowMoreClick = async () => {
	const numberOfListings = listings.value.length
	const startIndex = numberOfListings
	const urlParams = new URLSearchParams(route.query)
	urlParams.set('startIndex', startIndex)
	const searchQuery = urlParams.toString()
	const res = await fetch(`/api/listing/get?${searchQuery}`)
	const data = await res.json()

	if (data.length < 9) {
		showMore.value = false
	}
	listings.value = [...listings, ...data]
}
</script>
<template>
	<div class="flex flex-col md:flex-row">
		<div class="p-7 border-b-2 md:border-r-2 md:min-h-screen">
			<form @submit.prevent="handleSubmit" class="flex flex-col gap-8">
				<div class="flex items-center gap-2">
					<label class="whitespace-nowrap font-semibold"> Search Term: </label>
					<input
						type="text"
						id="searchTerm"
						placeholder="Search..."
						class="border rounded-lg p-3 w-full"
						v-model="sidebardata.searchTerm"
					/>
				</div>
				<div class="flex gap-2 flex-wrap items-center">
					<label class="font-semibold">Type:</label>
					<div class="flex gap-2">
						<input
							type="radio"
							id="all"
							class="w-5"
							value="all"
							v-model="sidebardata.type"
						/>
						<label for="all">Rent & Sale</label>
					</div>
					<div class="flex gap-2">
						<input
							type="radio"
							id="rent"
							class="w-5"
							value="rent"
							v-model="sidebardata.type"
						/>
						<label for="rent">Rent</label>
					</div>
					<div class="flex gap-2">
						<input
							type="radio"
							id="sale"
							class="w-5"
							value="sale"
							v-model="sidebardata.type"
						/>
						<label for="sale">Sale</label>
					</div>
					<div class="flex gap-2">
						<input
							type="checkbox"
							id="offer"
							class="w-5"
							v-model="sidebardata.offer"
						/>
						<label for="offer">Offer</label>
					</div>
				</div>
				<div class="flex gap-2 flex-wrap items-center">
					<label class="font-semibold">Amenities:</label>
					<div class="flex gap-2">
						<input
							type="checkbox"
							id="parking"
							class="w-5"
							v-model="sidebardata.parking"
						/>
						<label for="parking">Parking</label>
					</div>
					<div class="flex gap-2">
						<input
							type="checkbox"
							id="furnished"
							class="w-5"
							v-model="sidebardata.furnished"
						/>

						<label for="furnished">Furnished</label>
					</div>
				</div>
				<div class="flex items-center gap-2">
					<label for="sort_order" class="font-semibold">Sort:</label>
					<select
						@change="handleChange"
						:value="'createdAt_desc'"
						id="sort_order"
						class="border rounded-lg p-3"
					>
						<option value="regularPrice_desc">Price high to low</option>
						<option value="regularPrice_asc">Price low to hight</option>
						<option value="createdAt_desc">Latest</option>
						<option value="createdAt_asc">Oldest</option>
					</select>
				</div>
				<button
					class="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
				>
					Search
				</button>
			</form>
		</div>
		<div class="flex-1">
			<h1 class="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
				Listing results:
			</h1>
			<div class="p-7 flex flex-wrap gap-4">
				<p
					v-if="!loading && listings.length === 0"
					class="text-xl text-slate-700"
				>
					No listing found!
				</p>

				<p v-if="loading" class="text-xl text-slate-700 text-center w-full">
					Loading...
				</p>

				<template v-if="!loading && listings.length > 0">
					<ListingItem
						v-for="listing in listings"
						:key="listing._id"
						:listing="listing"
					/>
				</template>

				<button
					v-if="showMore"
					@click="onShowMoreClick"
					class="text-green-700 hover:underline p-7 text-center w-full"
				>
					Show more
				</button>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
