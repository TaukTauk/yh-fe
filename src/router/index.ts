import { createRouter, createWebHistory } from 'vue-router'
import PublicLayout from '@/layouts/PublicLayout.vue'
import OrgLayout from '@/layouts/OrgLayout.vue'
import AccountLayout from '@/layouts/AccountLayout.vue'
import EventLayout from '@/layouts/EventLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import NotFound from '@/views/NotFound.vue'
import { useAuthStore } from '@/stores/auth.store'
import { useOrgStore } from '@/stores/org.store'
import { PERMISSIONS } from '@/config/permissions'
import { ORG_PERMISSIONS } from '@/config/org.permissions'
import { ORG_STATUS, type OrgStatus } from '@/types/org.status'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
	// public pages
	{
		path: '/',
		component: PublicLayout,
		children: [
			{
				path: '',
				name: 'home',
				component: () => import('@/views/Public/HomeView.vue'),
			},
			// searching events
			{
				path: 'results',
				name: 'results',
				component: () => import('@/views/Public/Results.vue'),
			},
			// event detail
			{
				path: 'events/:eventId',
				name: 'event-detail',
				component: () => import('@/views/Public/EventDetail.vue'),
			},
 
		],

	},
	// account settings
	{
		path: '/account-settings',
		component: AccountLayout,
		meta: {requiresAuth: true},
		children: [
			{
				path: '',
				name: 'account-settings',
				component: () => import('@/views/Account/AccountSettings.vue'),
				meta: {
					permission: PERMISSIONS.ACCOUNT_SETTING,
				},
			},
		],
	},
	// // my events
	{
		path: '/my-events',
		component: EventLayout,
		meta: {requiresAuth: true},
		children: [
			{
				path: 'events',
				name: 'myevent-all-events',
				component: () => import('@/views/MyEvent/Events.vue'),
				meta: {
					permission: PERMISSIONS.EVENTS_ALL,
				},
			},
			{
				path: 'favorite',
				name: 'favorite-events',
				component: () => import('@/views/MyEvent/FavEvents.vue'),
				meta: {
					permission: PERMISSIONS.EVENTS_FAV,
				},
			},
			{
				path: 'tickets',
				name: 'my-tickets',
				component: () => import('@/views/MyEvent/Tickets.vue'),
				meta: {
					permission: PERMISSIONS.EVENTS_TICKET,
				},
			},
		],
	},
	// // organization
	{
		path: '/org/:orgId',
		component: OrgLayout,
		meta: {requiresAuth: true},
		children: [
			{
				path: 'dashboard',
				name: 'org-dashboard',
				component: () => import('@/views/Org/OrgDashboard.vue'),
				meta: {
					org: {
						role: 'organizer',
					}
				}
			},
			{
				path: 'events',
				name: 'org-events',
				component: () => import('@/views/Org/events/EventList.vue'),
				meta: {
					org: {
						role: 'organizer'
					}
				}
			},
			{
				path: 'events/:eventId',
				name: 'org-event-detail',
				component: () => import('@/views/Org/events/OrgEventDetail.vue'),
				meta: {
					org: {
						role: 'organizer',
					}
				}
			},
			{
				path: 'events/create',
				name: 'org-event-create',
				component: () => import('@/views/Org/events/CreateEvent.vue'),
				meta: {
					org: {
						permission: ORG_PERMISSIONS.EVENT_CREATE,
						requiresVerified: true,
					}
				}
			},
			{
				path: 'settings',
				name: 'org-settings',
				component: () => import('@/views/Org/Settings.vue'),
				meta: {
					org: {
						role: 'admin'
					}
				}
			},
			{
				path: 'events/create-paid',
				name: 'org-event-create-paid',
				component: () => import('@/views/Org/events/CreatePaidEvent.vue'),
				meta: {
					org: {
						permission: ORG_PERMISSIONS.EVENT_PAID_CREATE,
						requiresVerified: true,
					}
				}
			},
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
	const org = useOrgStore()

	// 1. auth check
	if (to.meta.requiresAuth && !auth.isAuthenticated) {
		return {name: 'login', query: {redirect: to.fullPath}}
	}
	// 2. guest-only check
	if (to.meta.guestOnly && auth.isAuthenticated) {
		return { name: 'home' }
	}
	// 3. global permission check
	if (to.meta.permission) {
		if (!auth.isAuthenticated) {
			return {name: 'login'}
		}
		if (!auth.hasPermission(to.meta.permission)) {
			return {name: 'forbidden'}
		}
	}
	// 4. org guards
	const orgMeta = to.meta.org
	if (orgMeta) {
		const orgId = to.params.orgId as string
		const membership = org.memberships.find(m => m.orgId === orgId)

		if (!membership) {
			return {name: 'forbidden'}
		}

		if (org.currentOrgId !== orgId) {
			org.switchOrg(orgId)
		}

		// role check
		const roleRank = {
			admin: 3,
			organizer: 2,
			member: 1,
		}

		if (
			orgMeta.role &&
			roleRank[membership.role] < roleRank[orgMeta.role]
		) {
			return { name: 'forbidden' }
		}

		// permission check
		if (orgMeta.permission) {
			if (!org.hasOrgPermission(orgId, orgMeta.permission)) {
				return {name: 'forbidden'}
			}
		}

		// verification check
		if (orgMeta.requiresVerified && membership.status !== ORG_STATUS.VERIFIED) {
			return {name: 'forbidden'}
		}
	}
})

export default router
