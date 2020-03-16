<template>
	<view class="team-detail">
		<view v-if="teamAvaliable">
			<view class="uni-padding-wrap">
				<view class="uni-title uni-common-mt">
					[{{team.format}}] {{ team.title }}
					<text>\n{{DateConversion(team.created_at)}}</text>
				</view>
			</view>

			<uni-section title="队伍预览" type="line"></uni-section>
			<view class="image-box">
				<image class="image" mode="aspectFill" :src="team.rentalImgUrl" />
			</view>

			<uni-section title="作者" type="line"></uni-section>
			<uni-list>
				<uni-list-item :showArrow="false" :title="team.author" />
			</uni-list>

			<uni-section title="对战模式" type="line"></uni-section>
			<uni-list>
				<uni-list-item :title="team.format" />
			</uni-list>

			<uni-section title="宝可梦" type="line"></uni-section>
			<uni-list>
				<uni-list-item v-for="p in pokemon" :title="p" :thumb="IconPath(p, 'pokemon')" />
			</uni-list>

			<uni-section title="描述" type="line"></uni-section>
			<view class="text-box">
				<text :selectable="true">{{team.description}}</text>
			</view>
			<uni-section title="Showdown 文本" type="line"></uni-section>
			<view class="uni-textarea">
				<textarea :value="team.showdown" placeholder-style="color:#c83e3e" placeholder="该队伍不包含Showdown文本"/>
			</view>
		</view>
		<view v-else></view>
	</view>
</template>

<script>
	import {
		DateConversion,
		IconPath
	} from '@/common/utils.js'

	export default {
		onLoad(option) { //option为object类型，会序列化上个页面传递的参数
			this.getTeamById(option.id);
		},
		data() {
			return {
				/* functions */
				DateConversion: DateConversion,
				IconPath:IconPath,
				/* team data */
				team: null,
				teamAvaliable: false,
				pokemon: [],
			}
		},
		methods: {
			getTeamById(id) {
				uni.request({
					url: this.ApiUrl + 'teams/' + id,
					method: 'GET',
					success: (res) => {
						if (res.data.code === 200) {
							this.team = res.data.data;
							this.pokemon = [
								this.team.pokemon1,
								this.team.pokemon2,
								this.team.pokemon3,
								this.team.pokemon4,
								this.team.pokemon5,
								this.team.pokemon6
							];
							uni.setNavigationBarTitle({
								title: '[' + this.team.format + '] ' + this.team.title
							})
							this.teamAvaliable = true;
						} else {
							this.teamAvaliable = false;
							this.tips = "网络错误";
						}
					},
					fail: (error) => {
						this.teamAvaliable = false;
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

<style scoped>
	.image-box {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		height: 430rpx;
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
	
	.text-box {
		padding: 10rpx 20rpx;
		background-color: #434343;
		text-align: start;
		font-size: 30rpx;
		color: #FFFAFA;
		line-height: 1.8;
		word-break:break-all;
		min-height: 300rpx;
	}
</style>
