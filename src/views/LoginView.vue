<template>
	<v-card width="400">
		<v-card-title>Login</v-card-title>
		<v-card-text>
			<v-text-field label="Email" />
			<v-text-field label="Password" type="password"/>
		</v-card-text>
		<v-card-actions>
			<v-btn block color="primary" @click="redirect()">Login As User</v-btn>
		</v-card-actions>
		<v-card-actions>
			<v-btn block color="primary" @click="redirectAdmin()">Login As Admin</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import { useRouter, useRoute } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()
const { login } = auth

const redirect = async () => {
	login('user');
	const url = route.query.redirect as string | undefined
	router.push(url || '/')
}

const redirectAdmin = async () => {
	login('admin');
	const url = route.query.redirect as string | undefined
	router.push(url || '/')
}
</script>