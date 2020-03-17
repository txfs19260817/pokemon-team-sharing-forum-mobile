<template>
	<view>
		<view class="head-text">
			<text>
				您可在此与所有用户分享您的队伍。您可以分享租借队ID图片或Pokemon Showdown文本格式队伍。
			</text>
		</view>
		<uni-notice-bar :showIcon="true" color="#c83e3e" background-color="#c8c29e" text="我们强烈建议您同时上传租借队ID图片\n和Pokemon Showdown文本格式队伍。" />

		<view class="content" :class="{'active':active}">
			<inputs :inputsArray="inputsArray" activeName="上传队伍" @activeFc="activeFc" :fontSizeScaleSet="fontSizeScaleSet"
			 :titleSet="titleSet" :focusStyle="focusStyle" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: false,
				fontSizeScaleSet: { //inputs内的字体大小系数设置(字体大小为屏幕宽高度以此系数)
					allScale: .028,
					titleScale: .035, //优先于allScale
					contentScale: .035 //优先于allScale
				},
				titleSet: {
					color: "aliceblue"
				},
				focusStyle: {
					focusBorderStyle: "#00aaff",
				},
				inputsArray: [{
						title: '标题',
						placeholder: "40字符以内",
						maxlength: 40,
						variableName: "title",
						color: "#FFFAFA",
					},
					{
						title: '作者',
						placeholder: "40字符以内",
						maxlength: 40,
						variableName: "author",
						color: "#FFFAFA",
					},
					{
						type: "textarea",
						title: "描述",
						variableName: "description",
						color: "#FFFAFA",
						backgroundColor: "#434343",
						maxlength: 300,
						width: 90,
						placeholder: "简要描述队伍，300字符以内，过长可附外部链接。" //默认值
					},
					{
						segmentationTitle: "上传队伍（至少上传一种，推荐同时上传两种）", //分割大标题
						border_top: "1px solid #f2f2f2", //上划线
						type: "textarea",
						title: "Showdown文本",
						variableName: "showdown",
						color: "#FFFAFA",
						backgroundColor: "#434343",
						maxlength: 1600,
						width: 80,
						placeholder: "可将Showdown文本粘贴在此处。",
						ignore: true
					},
				],
			};
		},
		onShow() {
			this.active = true;
		},
		onHide() {
			this.active = false;
		},
		methods: {
			activeFc(res) {
				uni.showToast({
					title: "获取输入成功"
				})
				console.log(JSON.stringify(res));
			}
		}
	};
</script>

<style scoped>
	.head-text {
		padding: 20rpx;
	}

	.head-text text {
		font-size: 28rpx;
		color: #FFFAFA;
		text-align: center;
	}
</style>
