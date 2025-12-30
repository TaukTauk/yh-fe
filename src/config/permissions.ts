export const PERMISSIONS = {
	// users management
	USERS_READ: 'users.read',
	USERS_CREATE: 'users.create',
	USERS_DELETE: 'users.delete',

	// settings management
	SETTINGS_VIEW: 'settings.view',
	SETTINGS_UPDATE: 'settings.update',

	// profile management
	PROFILE_VIEW: 'profile.view',
	PROFILE_UPDATE: 'profile.update',
} as const

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS]
