<template>
	<view>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<view v-for="(item, index) in teams">
				<uni-card :is-shadow="true" :title="'['+item.format+'] '+item.title" mode="title" thumbnail="/static/img/favicon.png"
				 :extra="item.author" :note="DateConversion(item.created_at)" @click="clickCard(item.id)">
					<view>
						<view class="image-box">
							<image class="image" mode="aspectFit" :src="item.rentalImgUrl" />
						</view>
					</view>
				</uni-card>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import {
		DateConversion
	} from '@/common/utils.js'

	export default {
		mixins: [MescrollMixin],
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
				DateConversion: DateConversion,
				// data
				teams: [],
				// mescroll
				// 下拉刷新的常用配置
				downOption: {
					use: true, // 是否启用下拉刷新; 默认true
					auto: true, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
					native: false // 启用系统自带的下拉组件,默认false;仅mescroll-body生效
				},
				// 上拉加载的常用配置
				upOption: {
					use: true, // 是否启用上拉加载; 默认true
					auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 8 // 每页数据的数量,默认10
					},
					noMoreSize: 3, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '没有更多了'
					}
				},
			}
		},
		methods: {
			clickCard(id){
				uni.navigateTo({
					url: '../team/team?id=' + id
				});
			},
			upCallback(page) {
				this.serverUrl = this.serverPath + this.category;
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				uni.request({
					url: this.ApiUrl + this.serverUrl,
					method: 'GET',
					data: {
						state: 1,
						page: pageNum
					},
					success: (res) => {
						if (res.data.code === 200) {
							// 接口返回的当前页数据列表 (数组)
							let curPageData = res.data.data.lists;
							// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
							let curPageLen = curPageData.length;
							// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
							let totalPage = Math.ceil(res.data.data.total / pageSize);
							// 接口返回的总数据量(如列表有26个数据,每页10条,共3页; 则totalSize=26)
							let totalSize = res.data.data.total;
							// 接口返回的是否有下一页 (true/false)
							let hasNext = pageNum * pageSize < totalSize;

							//设置列表数据
							if (this.mescroll.num == 1) this.teams = []; // 如果是第一页需手动置空列表
							this.teams = this.teams.concat(curPageData); // 追加新数据
							this.$nextTick(() => {
								this.mescroll.endBySize(curPageLen, totalSize); // 请求成功,隐藏加载状态
							});
						} else {
							this.tips = "网络错误";
							this.mescroll.endErr();
						}
					},
					fail: (error) => {
						// 请求失败,隐藏加载状态
						this.tips = "网络错误";
						this.mescroll.endErr();
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
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		height: 350rpx;
		overflow: hidden;
		text-align: center;
	}

	.image {
		/* #ifndef APP-NVUE */
		width: 100%;
		height: 100%;
		/* #endif */
		flex: 1;
	}

	.uni-card {
		background-color: #434343;
		border-color: #2D2D2D;
	}

	.uni-card>>>.uni-card__title {
		border-bottom-color: #828282;
	}

	..uni-card>>>.uni-card__title-content {
		height: 120rpx;
		padding: 0;
	}

	.uni-card>>>.uni-card__title-content-title {
		overflow: hidden;
	}

	.uni-card>>>.uni-card__footer {
		border-top-color: #828282;
	}
</style>
