<template>
  <v-app-bar location="top">
	<v-app-bar-nav-icon
	  @click="isMobile ? toggleDrawer() : toggleRail()"
	/>

	<v-toolbar-title>App</v-toolbar-title>

	<v-spacer />

	<!-- profile -->
	<TopbarActions />
	
  </v-app-bar>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUiStore } from '@/stores/ui.store'
import TopbarActions from '@/components/ui/TopbarActions.vue'

const ui = useUiStore()
const { isMobile } = storeToRefs(ui)
const { toggleRail, toggleDrawer } = ui

</script>
