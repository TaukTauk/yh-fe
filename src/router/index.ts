import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import NotFound from '@/views/NotFound.vue'
import { useAuthStore } from '@/stores/auth.store'
import { PERMISSIONS } from '@/config/permissions'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
	// public pages
	{
		path: '/',
		component: AppLayout,
		children: [
			{
				path: '',
				name: 'home',
				component: () => import('@/views/HomeView.vue'),
			},
		],
	},
	// protected pages
	{
		path: '/app',
		component: AppLayout,
		meta: {requiresAuth: true},
		children: [
			{
				path: 'users',
				name: 'users',
				component: () => import('@/views/UsersView.vue'),
				meta: {
					permission: PERMISSIONS.USERS_READ,
				},
			},
			{
				path: 'profile',
				name: 'profile',
				component: () => import('@/views/ProfileView.vue'),
				meta: {
					permission: PERMISSIONS.PROFILE_VIEW,
				},
			}
		],
	},
	// auth
	{
		path: '/auth',
		component: AuthLayout,
		meta: { guestOnly: true },
		children: [
			{
				path: 'login',
				name: 'login',
				component: () => import('@/views/LoginView.vue'),
			},
		],
	},
	// forbidden
	{
		path: '/forbidden',
		name: 'forbidden',
		component: ()=>import('@/views/ForbiddenView.vue')
	},
	// 404
	{
		path: '/:pathMatch(.*)*',
		component: AuthLayout,
		children: [
			{
				path: '',
				component: NotFound,
			},
		],
	},
  ],
})

router.beforeEach((to) => {
	const auth = useAuthStore()
	// 1. auth check
	if (to.meta.requiresAuth && !auth.isAuthenticated) {
		return {name: 'login', query: {redirect: to.fullPath}}
	}

	// 2. permission check
	if (to.meta.roles && !auth.hasPermission(to.meta.permission)) {
		return {name: 'forbidden'}
	}

	// 3. guest-only check
	if (to.meta.guestOnly && auth.isAuthenticated) {
		return { name: 'home' }
	}
})

export default router
