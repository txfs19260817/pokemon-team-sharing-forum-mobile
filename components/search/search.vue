<template>
	<view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-left">
				当前对战模式
			</view>
			<view class="uni-list-cell-db">
				<picker mode="multiSelector" @columnchange="formatPickerColumnChange" @change="formatPickerChange" :value="formatIndex" :range="formatArray">
					<view class="uni-input">{{selectedFormat}}</view>
				</picker>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		FormatCatagories,
		Formats
	} from '../../common/data/formats.js'
	
	export default {
		name: 'search',
		data() {
			return {
				/* Format */
				formats: Formats,
				formatIndex: [0, 0],
				formatArray: [
					FormatCatagories, Formats[0]
				],
				selectedFormat: 'VGC 2020',
			};
		},
		methods: {
			formatPickerColumnChange(e) {
				console.log('修改的列为：' + e.detail.column + '，值为：' + e.detail.value);
				this.formatIndex[e.detail.column] = e.detail.value;
				switch (e.detail.column) {
					case 0: //拖动第0列
						this.formatArray[1] = this.formats[this.formatIndex[0]];
						this.formatIndex.splice(1, 1, 0);
						break
				}
				this.$forceUpdate()
			},
			formatPickerChange() {
				this.selectedFormat = this.formatArray[1][this.formatIndex[1]];
				this.$emit('selected-format', this.selectedFormat)
			}
		}
	}
</script>

<style>

</style>
