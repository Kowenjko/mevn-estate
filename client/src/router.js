import { createRouter, createWebHistory } from 'vue-router'

import { useUserStore } from '@/stores/userStore.js'

import Home from '@/pages/Home.vue'
import About from '@/pages/About.vue'
import SignIn from '@/pages/SignIn.vue'
import SignUp from '@/pages/SignUp.vue'
import Profile from '@/pages/Profile.vue'
import CreateListing from '@/pages/CreateListing.vue'
import UpdateListing from '@/pages/UpdateListing.vue'
import Listing from '@/pages/Listing.vue'
import Search from '@/pages/Search.vue'
import DefaultLayout from '@/layouts/Default.vue'

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: DefaultLayout,
			children: [
				{
					path: '',
					name: 'home',
					component: Home,
				},
				{
					path: 'search',
					name: 'search',
					component: Search,
				},
				{
					path: 'about',
					name: 'about',
					component: About,
				},
				{
					path: 'sign-in',
					name: 'sign-in',
					component: SignIn,
				},
				{
					path: 'sign-up',
					name: 'sign-up',
					component: SignUp,
				},
				{
					path: 'listing/:id',
					name: 'listing',
					component: Listing,
				},

				{
					path: 'update-listing/:id',
					name: 'update-listing',
					component: UpdateListing,
					beforeEnter: () => {
						const userStore = useUserStore()
						return userStore.getCurrentUser() ? true : '/sign-in'
					},
				},
				{
					path: 'create-listing',
					name: 'create-listing',
					component: CreateListing,
					beforeEnter: () => {
						const userStore = useUserStore()
						return userStore.getCurrentUser() ? true : '/sign-in'
					},
				},
				{
					path: 'profile',
					name: 'profile',
					component: Profile,
					beforeEnter: () => {
						const userStore = useUserStore()
						return userStore.getCurrentUser() ? true : '/sign-in'
					},
				},
			],
		},
	],
})
