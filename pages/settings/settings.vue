<template>
	<view>
		<uni-section title="其它" type="line"></uni-section>
		<uni-list>
			<!--  #ifdef  H5 -->
			<uni-list-item @click="naviToPC" title="跳转至PC版" rightText="pokeshare.monster" />
			<!--  #endif -->
			<navigator url="about/about" hover-class="navigator-hover">
				<uni-list-item title="关于" />
			</navigator>
			<!-- <uni-list-item title="语言/Language" rightText="zh-hans" /> -->
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			naviToPC(){
				window.location.href = 'https://pokeshare.monster'
			}
		}
	}
</script>

<style scoped>

</style>
