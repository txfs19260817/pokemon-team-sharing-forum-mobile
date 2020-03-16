<template>
	<view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-left">
				选择宝可梦
			</view>
			<view class="uni-list-cell-db">
				<j-picker class="cont" bgColor="rgba(130, 130, 130, 0.6)" @sure="pmPickerChange" sureColor="#c83e3e" showKey="PmName"
				 valKey="PmID" :val="selectedPmIdx" :options="pokemonNames" />
			</view>
		</view>
	</view>
</template>

<script>
	const PokemonNames = require('@/common/data/pokemonNames.js');

	export default {
		name: 'search-by-pm',
		data() {
			return {
				pokemonNames: [],
				selectedPm: '',
				selectedPmIdx: 0,
			};
		},
		methods: {
			pmPickerChange(e) {
				this.selectedPm = e.PmName.split('/', 1)[0];
				this.selectedPmIdx = e.pickerVal;
				this.$emit('selected-pm', this.selectedPm)
			},
		},
		mounted() {
			// LOAD DATA
			for (const [index, element] of PokemonNames.pmNames4Select.entries()) {
				this.pokemonNames.push({
					'PmID': index,
					'PmName': element
				});
			}
		}
	}
</script>

<style>

</style>
