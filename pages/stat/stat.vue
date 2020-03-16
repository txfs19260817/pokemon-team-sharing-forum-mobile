<template>
	<view>
		<uni-section title="对战模式" type="line"></uni-section>
		<uni-list>
			<search-by-format @selected-format="getStatByFormat"></search-by-format>
		</uni-list>
		<uni-section title="宝可梦使用率 (前20名)" type="line"></uni-section>
		<uni-list v-if="statIsAvailable">
			<uni-list-item v-for="d in statData" :showArrow="false" :title="d.name + ': ' + d.value" :thumb="IconPath(d.name, 'pokemon')" />
		</uni-list>
		<uni-list v-else>
			<uni-list-item :showArrow="false" title="暂无数据, 请尝试其他模式" />
		</uni-list>
	</view>
</template>

<script>
	import {
		ReconstructObject,
		SortObjectArrayByValue,
		IconPath
	} from "../../common/utils";

	export default {
		data() {
			return {
				IconPath: IconPath,
				// stat data
				statIsAvailable: false,
				statData: {},
			}
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
						} else {
							this.statIsAvailable = false;
						}
					},
					fail: (error) => {
						this.tips = "网络错误";
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
			},
		}
	}
</script>

<style>

</style>
