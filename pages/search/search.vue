<template>
	<view class="content">
		<view v-if="showSearch" class="search">
			<uni-section title="对战模式" type="line"></uni-section>
			<uni-list>
				<search-by-format @selected-format="naviToFormatResult"></search-by-format>
			</uni-list>
			<uni-section title="宝可梦" type="line"></uni-section>
			<uni-list>
				<search-by-pm @selected-pm="naviToPmResult"></search-by-pm>
			</uni-list>
		</view>
	</view>
</template>

<script>
	export default {
		onShow() {
			this.showSearch = true
		},
		onHide() {
			this.showSearch = false
		},
		data() {
			return {
				showSearch: true
			}
		},
		methods: {
			naviToFormatResult(f) {
				const serverPath = `formats/`
				uni.navigateTo({
					url: 'result?serverPath=' + serverPath + '&category=' + f
				});
			},
			naviToPmResult(p) {
				const serverPath = `pokemon/`
				uni.navigateTo({
					url: 'result?serverPath=' + serverPath + '&category=' + p
				});
			}
		}
	};
</script>

<style scoped>
	.content {
		text-align: center;
	}
</style>
