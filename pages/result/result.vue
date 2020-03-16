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
		onLoad(option) { //option为object类型，会序列化上个页面传递的参数
			this.category = option.category;
			this.serverPath = option.serverPath
			uni.setNavigationBarTitle({
			　　title:this.category
			})
		},
		data() {
			return {
				category: "",
				serverPath: "",
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
