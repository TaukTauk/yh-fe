<!-- AppSidebar.vue -->
<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="!isMobile && rail"
    :permanent="!isMobile"
	:temporary="isMobile"
	location="left"
	floating
  >
  <v-list density="compact" nav>
      <v-list-item 
		v-for="item in visibleItems"
		:key="item.to"
		:to="item.to"
		:prepend-icon="item.icon"
		:title="$t(item.title)"
		exact
	  />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUiStore } from '@/stores/ui.store'
import { NAV_ITEMS } from '@/config/navigation'
import { useAuthStore } from '@/stores/auth.store'

const ui = useUiStore()
const { drawer, rail, isMobile } = storeToRefs(ui)
const { toggleRail, toggleDrawer } = ui

const auth = useAuthStore()
const visibleItems = computed(() => NAV_ITEMS.filter( item => !item.permission || auth.hasPermission(item.permission)))

</script>
