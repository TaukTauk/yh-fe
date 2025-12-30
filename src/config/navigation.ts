import type { RouteRecordRaw } from "vue-router";
import { PERMISSIONS } from "@/config/permissions";
import type { Permission } from '@/config/permissions'
import type { OrgPermission } from "./org.permissions";
import type { OrgStatus } from "@/types/org.status";
import { ORG_PERMISSIONS } from "./org.permissions";

export type NavItem = {
	title: string
	icon: string
	to: string

	// global
	permission?: Permission
	requiresAuth?: boolean
	guestOnly?: boolean

	// org-scoped
	org?: {
		role?: 'admin' | 'organizer' | 'member'
		permission?: OrgPermission
		requiresVerified?: boolean
	}
}

export const NAV_ITEMS: NavItem[] = [
	// public
	{
		title: 'nav.home',
		icon: 'mdi-home',
		to: '/',
	},

	// org
	{
		title: 'nav.orgDashboard',
		icon: 'mdi-view-dashboard',
		to: '/org/:orgId/dashboard',
		requiresAuth: true,
		org: {
			role: 'organizer',
		},
	},

	{
		title: 'nav.createEvent',
		icon: 'mdi-calendar-plus',
		to: '/org/:orgId/events/create',
		requiresAuth: true,
		org: {
			permission: ORG_PERMISSIONS.EVENT_CREATE,
		},
	},

	{
		title: 'nav.createPaidEvent',
		icon: 'mdi-currency-usd',
		to: '/org/:orgId/events/create-paid',
		requiresAuth: true,
		org: {
			permission: ORG_PERMISSIONS.EVENT_PAID_CREATE,
			requiresVerified: true,
		},
	},

	{
		title: 'nav.orgSettings',
		icon: 'mdi-cog',
		to: '/org/:orgId/settings',
		requiresAuth: true,
		org: {
			role: 'admin',
		},
	},
]