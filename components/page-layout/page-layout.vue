<template>
	<view>
		<view v-for="(item, index) in teams">
			<uni-card :is-shadow="true" :title="'['+item.format+'] '+item.title" mode="title" thumbnail="/static/img/favicon.png"
			 :extra="item.author" note="true" @click="clickCard">
				<view>
					<view class="image-box">
						<image class="image" mode="aspectFit" :src="item.rentalImgUrl" />
					</view>
				</view>
				<template slot="footer">
					<view class="content-box">
						<text class="content-box-text">点击查看更多</text>
					</view>
				</template>
			</uni-card>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			// e.g. "formats/", "pokemon/"
			serverPath: {
				type: String,
				required: true
			},
			// e.g. "VGC 2020" (if "formats/"), "Incineroar" (if "pokemon/")
			category: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				serverUrl: '',
				// page
				total: 1,
				pageSize: 8,
				curPage: 1,
				// data
				teams: [],
			}
		},
		created() {
			this.serverUrl = this.serverPath + this.category;
			this.getTeamsBy(this.serverUrl, 1);
		},
		methods: {
			getTeamsBy(serverUrl, page) {
				uni.request({
					url: this.ApiUrl + serverUrl,
					method: 'GET',
					data: {
						state: 1,
						page: page
					},
					success: (res) => {
						if (res.data.code === 200) {
							this.total = res.data.data.total;
							this.teams = res.data.data.lists;
							console.log(this.teams);
						} else {
							this.tips = "网络错误";
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
	.content-box-text {
		font-size: 26rpx;
		line-height: 26rpx;
		color: #FFFAFA;
	}
	
	.image-box {
		text-align: center;
	}

	.uni-card {
		background-color: #434343;
		border-color: #2D2D2D;
	}

	.uni-card>>>.uni-card__title {
		border-bottom-color: #828282;
	}
	
	..uni-card>>>.uni-card__title-content {
		padding: 0;
	}
	
	.uni-card>>>.uni-card__title-content-title{
		overflow: hidden;
	}

	.uni-card>>>.uni-card__footer {
		border-top-color: #828282;
	}
</style>
