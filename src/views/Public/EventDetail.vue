<template>
	<div v-if="event">
		<!-- Hero -->
		<v-img
			:src="event.cover"
			height="360"
			cover
			class="mb-6"
		/>

		<v-container>
			<v-row>
				<!-- Main content -->
				<v-col cols="12" md="8">
					<h1 class="text-h4 font-weight-bold mb-2">
						{{ event.title }}
					</h1>

					<div class="text-body-2 text-medium-emphasis mb-4">
						{{ event.organizer }} · {{ event.category }}
					</div>

					<p class="text-body-1">
						{{ event.description }}
					</p>
				</v-col>

				<!-- Sidebar -->
				<v-col cols="12" md="4">
					<v-card>
						<v-card-text>
							<v-list density="compact">
								<v-list-item prepend-icon="mdi-calendar">
									{{ event.date }}
								</v-list-item>

								<v-list-item prepend-icon="mdi-map-marker">
									{{ event.location }}
								</v-list-item>

								<v-list-item prepend-icon="mdi-currency-usd">
									{{ event.price === 0 ? 'Free' : `$${event.price}` }}
								</v-list-item>
							</v-list>
						</v-card-text>

						<v-card-actions>
							<v-btn
								block
								color="primary"
								@click="onJoin"
								:disabled="joining"
							>
								Join Event
							</v-btn>
						</v-card-actions>
						<v-card-actions>
							<v-btn
								block
								color="primary"
								@click="onFavorite"
								:disabled="addingFav"
							>
								Favorite
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</div>

	<v-container v-else>
		<v-alert type="error">
			Event not found
		</v-alert>
	</v-container>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { MOCK_EVENTS } from '@/mocks/events'
import { useAuthStore } from '@/stores/auth.store'
import { notify } from '@/services/toast.service'
import { storeToRefs } from 'pinia'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const {isAuthenticated} = storeToRefs(auth)

const event = computed(() => {
	return MOCK_EVENTS.find(e => e.id === route.params.eventId)
})

const joining = ref(false)
const addingFav = ref(false)
const onJoin = async () => {
	if (!isAuthenticated) {
		router.push({
			name: 'login',
			query: { redirect: route.fullPath },
		})
		return
	}

	joining.value = true
	await new Promise(r => setTimeout(r, 500))
	joining.value = false
	notify.success('You have joined this event!')
}

const onFavorite = async () => {
	if (!isAuthenticated) {
		router.push({
			name: 'login',
			query: { redirect: route.fullPath },
		})
		return
	}

	addingFav.value = true
	await new Promise(r => setTimeout(r, 500))
	addingFav.value = false
	notify.success('You have added this event to your favorites!')
}

</script>

