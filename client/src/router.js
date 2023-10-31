import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/pages/Home.vue'
import About from '@/pages/About.vue'
import SignIn from '@/pages/SignIn.vue'
import SignUp from '@/pages/SignUp.vue'
import Profile from '@/pages/Profile.vue'
import DefaultLayout from '@/layouts/Default.vue'

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'home',
			component: DefaultLayout,
			children: [
				{
					path: '',
					component: Home,
				},
			],
		},
		{
			path: '/about',
			name: 'about',
			component: DefaultLayout,
			children: [
				{
					path: '',
					component: About,
				},
			],
		},
		{
			path: '/sign-in',
			name: 'sign-in',
			component: DefaultLayout,
			children: [
				{
					path: '',
					component: SignIn,
				},
			],
		},
		{
			path: '/sign-out',
			name: 'sign-out',
			component: DefaultLayout,
			children: [
				{
					path: '',
					component: SignUp,
				},
			],
		},
		{
			path: '/profile',
			name: 'profile',
			component: DefaultLayout,
			children: [
				{
					path: '',
					component: Profile,
				},
			],
		},
	],
})
