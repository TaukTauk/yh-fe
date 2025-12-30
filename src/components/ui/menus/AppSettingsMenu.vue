<template>
	<v-list density="compact" min-width="220">
		<!-- Settings -->
		<v-list-item prepend-icon="mdi-cog" :title="$t('common.settings')"></v-list-item>

		<!-- Language submenu -->
		<SubMenu
			:title="$t('common.language')"
			icon="mdi-translate"
		>
			<LanguageMenu />
		</SubMenu>

		<!-- Location submenu -->
		<SubMenu
			:title="$t('common.location')"
			icon="mdi-map-marker"
		>
			<v-list-item title="Myanmar"/>
			<v-list-item title="Singapore"/>
			<v-list-item title="Thailand"/>
		</SubMenu>

		<!-- Theme submenu -->
		<SubMenu
			:title="$t('common.theme')"
			icon="mdi-theme-light-dark"
		>
			<ThemeModeList/>
		</SubMenu>

		<v-divider />

		<!-- Help -->
		<v-list-item prepend-icon="mdi-help-circle" :title="$t('common.help')" />
	</v-list>
</template>

<script setup lang="ts">
import SubMenu from './SubMenu.vue';
import ThemeModeList from './ThemeModeList.vue'
import LanguageMenu from './LanguageMenu.vue';
</script>