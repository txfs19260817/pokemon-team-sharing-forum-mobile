<template>
	<view>
		<uni-section title="对战模式" type="line"></uni-section>
		<uni-list>
			<!-- TODO 写search component， @click触发之 -->
			<uni-list-item title="当前对战模式" :rightText="format" />
		</uni-list>
		<uni-section title="使用率(前20名)" type="line"></uni-section>
		{{statData}}
	</view>
</template>

<script>
	import {ReconstructObject, SortObjectArrayByValue} from "../../common/utils";
	
	export default {
		data() {
			return {
				format: 'VGC 2020',
				statIsAvailable: false,
				statData: {},
			}
		},
		onLoad() {
			this.getStatByFormat(this.format)
		},
		methods: {
			getStatByFormat(format) {
				uni.request({
					url: this.ApiUrl + 'stat/' + format,
					method: 'GET',
					success: (res) => {
						if (res.data.code === 200) {
							this.statData = res.data.data;
							// check object empty
							if (Object.keys(this.statData).length === 0 && this.statData.constructor === Object) {
								this.statIsAvailable = false;
							} else {
								this.statData = SortObjectArrayByValue(ReconstructObject(this.statData));
								this.statIsAvailable = true;
								// reserve only top 20 results
								if (this.statData.length > 20) {
									this.statData = this.statData.slice(0, 20)
								}
							}
							console.log(this.statData);
						} else {
							this.statIsAvailable = false;
						}
					},
					fail: (error) => {
						// Error
						if (error.response) {
							/*
							 * The request was made and the server responded with a
							 * status code that falls out of the range of 2xx
							 */
							console.log(error.response.data);
							console.log(error.response.status);
							console.log(error.response.headers);
						} else if (error.request) {
							/*
							 * The request was made but no response was received, `error.request`
							 * is an instance of XMLHttpRequest in the browser and an instance
							 * of http.ClientRequest in Node.js
							 */
							console.log(error.request);
						} else {
							// Something happened in setting up the request and triggered an Error
							console.log('Error', error.message);
						}
						console.log(error.config);
					}
				});
			}
		}
	}
</script>

<style>

</style>
