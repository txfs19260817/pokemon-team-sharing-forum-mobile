<template>
	<view class="container">
		<page-layout :category.sync="category" :server-path.sync="serverPath"></page-layout>
	</view>
</template>

<script>
	import PageLayout from '../../components/page-layout/page-layout.vue'
	export default {
		data() {
			return {
				category: "",
				serverPath: "teams"
			}
		},
		components: {
			PageLayout
		},
		methods: {

		}
	}
</script>

<style>

</style>
