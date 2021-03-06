import Vue from 'vue'
import App from './App'
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
import inputs from '@/components/QuShe-inputs/inputs.vue';
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)
Vue.component('inputs', inputs);

Vue.config.productionTip = false

/* Global variables */
Vue.prototype.ApiUrl = "https://pokeshare.monster/api/v1/"
Vue.prototype.IconsUrl = "https://pokeshare.monster/assets/pokemon-icons/"
Vue.prototype.PmIconsUrl = "https://pokeshare.monster/assets/pokemon-icons/2d/"
Vue.prototype.ItemIconsUrl = "https://pokeshare.monster/assets/pokemon-icons/items/"
Vue.prototype.TypeIconsUrl = "https://pokeshare.monster/assets/pokemon-icons/types/"
Vue.prototype.MovetypeIconsUrl = "https://pokeshare.monster/assets/pokemon-icons/movetypes/"
Vue.prototype.UploadUrl = "https://pokeshare.monster/api/v1/upload"

Vue.prototype.RECAPTCHA=""

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
