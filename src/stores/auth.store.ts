import { defineStore } from 'pinia'
import type { Permission } from '@/config/permissions'
import { ROLE_PERMISSIONS } from '@/config/roles'
import { notify } from '@/services/toast.service'
import { no } from 'vuetify/locale'

export const useAuthStore = defineStore('auth', {
	state: () => ({
		isAuthenticated: false,
		user: null as null | {
			id: string
			name: string
			role: string
			permissions: Permission[]
		},
	}),

	getters: {
		hasPermission: (state) => {
			return (permission: Permission) => {
				return state.user?.permissions.includes(permission)
			}
		}
	},

	actions: {
		login(role: string) {
			this.isAuthenticated = true
			this.user = {
				id: '1',
				name: "User 1",
				role,
				permissions: ROLE_PERMISSIONS[role] ?? [],
			}
			notify.success("Login successful")
		},
		logout() {
			this.isAuthenticated = false
			this.user = null
			notify.info("Singed out")
		}
	},
})