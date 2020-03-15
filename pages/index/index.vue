<template>
	<view class="container">
		<page-layout :category.sync="category" :server-path.sync="serverPath" ref="mescrollItem"></page-layout>
	</view>
</template>

<script>
	import PageLayout from '../../components/page-layout/page-layout.vue'
	import MescrollCompMixin from "@/components/mescroll-uni/mixins/mescroll-comp.js";
	export default {
		// github.com/mescroll/mescroll/blob/master/mescroll-uni/pages/base/mescroll-comp.vue
		mixins: [MescrollCompMixin],
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
