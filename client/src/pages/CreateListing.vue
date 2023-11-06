<script setup></script>

<template>
	<main class="max-w-4xl mx-auto p-3">
		<h1 class="text-3xl font-semibold text-center my-7">Create Listing</h1>

		<form class="flex flex-col sm:flex-row gap-4">
			<div class="flex flex-col gap-4 w-full flex-1">
				<input
					type="text"
					placeholder="Name"
					class="border p-3 rounded-lg"
					id="name"
					maxlength="62"
					minlength="10"
					required
					autocomplete="off"
				/>
				<textarea
					placeholder="Description"
					class="border p-3 rounded-lg"
					id="description"
					required
				/>
				<input
					type="text"
					placeholder="Address"
					class="border p-3 rounded-lg"
					id="address"
					required
					autocomplete="off"
				/>
				<div class="flex gap-6 flex-wrap">
					<div class="flex gap-2 items-center">
						<input type="checkbox" id="sale" class="w-5 cursor-pointer" />
						<label for="sale" class="cursor-pointer">Sell</label>
					</div>
					<div class="flex gap-2 items-center">
						<input type="checkbox" id="rent" class="w-5 cursor-pointer" />
						<label for="rent" class="cursor-pointer">Rent</label>
					</div>
					<div class="flex gap-2 items-center">
						<input type="checkbox" id="parking" class="w-5 cursor-pointer" />
						<label for="parking" class="cursor-pointer">Parking spot</label>
					</div>
					<div class="flex gap-2 items-center">
						<input type="checkbox" id="furnished" class="w-5 cursor-pointer" />
						<label for="furnished" class="cursor-pointer">Furnished</label>
					</div>
					<div class="flex gap-2 items-center">
						<input type="checkbox" id="offer" class="w-5 cursor-pointer" />
						<label for="offer" class="cursor-pointer">Offer</label>
					</div>
				</div>
				<div class="flex items-center gap-6 flex-wrap">
					<div class="flex items-center gap-2">
						<input
							type="number"
							id="bedrooms"
							min="1"
							max="10"
							required
							class="p-3 border-gray-300 rounded-lg"
						/>
						<label for="bedrooms">Beds</label>
					</div>
					<div class="flex items-center gap-2">
						<input
							type="number"
							id="bathrooms"
							min="1"
							max="10"
							required
							class="p-3 border-gray-300 rounded-lg"
						/>
						<label for="bathrooms">Baths</label>
					</div>
					<div class="flex items-center gap-2">
						<input
							type="number"
							id="regularPrice"
							min="1"
							max="10"
							required
							class="p-3 border-gray-300 rounded-lg"
						/>
						<label for="regularPrice" class="flex flex-col items-center">
							Regular price
							<span class="text-xs">($ / Month)</span>
						</label>
					</div>
					<div class="flex items-center gap-2">
						<input
							type="number"
							id="discountPrice"
							min="1"
							max="10"
							required
							class="p-3 border-gray-300 rounded-lg"
						/>
						<label for="discountPrice" class="flex flex-col items-center">
							Discounted price
							<span class="text-xs">($ / Month)</span>
						</label>
					</div>
				</div>
			</div>
			<div class="flex flex-col gap-4 flex-1">
				<p class="font-semibold">
					Images:
					<span class="font-normal text-gray-600 ml-2"
						>The first image will be the cover (max 6)</span
					>
				</p>
				<div class="flex items-center gap-4">
					<input
						type="file"
						id="images"
						accept="image/*"
						multiple
						class="p-3 border border-gray-300 rounded w-full"
					/>
					<button
						class="p-3 text-green-700 border rounded uppercase hover:shadow-lg disabled:opacity-80 transition-all border-green-700"
					>
						Upload
					</button>
				</div>
				<button
					type="submit"
					class="uppercase p-3 bg-slate-700 rounded-lg text-white hover:opacity-95 disabled:opacity-80"
				>
					Create Listing
				</button>
			</div>
		</form>
	</main>
</template>

<style lang="scss" scoped></style>
