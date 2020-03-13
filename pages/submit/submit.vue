<template>
	<view class="content" :class="{'active':active}">
		页面 - 上传
	</view>
</template> 

<script>
export default {
	data() {
		return {
			active: false
		};
	},
	onLoad() {},
	onShow() {
		this.active = true;
	},
	onHide() {
		this.active = false;
	},
	methods: {

	}
};
</script>

<style scoped>
	.content {
		text-align: center;
		height: 400upx;
		margin-top: 200upx;
	}
</style>
