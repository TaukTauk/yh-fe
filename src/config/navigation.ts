import type { RouteRecordRaw } from "vue-router";
import { PERMISSIONS } from "@/config/permissions";
import type { Permission } from '@/config/permissions'

export type NavItem = {
	title: string
	icon: string
	to: string
	permission?: Permission
}

export const NAV_ITEMS: NavItem[] = [
	{
		title: 'nav.home',
		icon: 'mdi-home',
		to: '/',
	},
	{
		title: 'nav.profile',
		icon: 'mdi-account',
		to: '/app/profile',
		permission: PERMISSIONS.PROFILE_VIEW
	},
	{
		title: 'nav.users',
		icon: 'mdi-account-group',
		to: '/app/users',
		permission: PERMISSIONS.USERS_READ
	},
]