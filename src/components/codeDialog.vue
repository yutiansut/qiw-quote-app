<template>
	<div id="codeDialog" v-if="isshow">
	</div>
</template>

<script>
	export default{
		name: 'codeDialog',
		data(){
			return{
				isshow: false,
				code: '',
				msg: '',
				token: '',
				secret: '',
				phone: '',
				pwd: '',
				path: ''
			}
		}
	}	
</script>

<style scoped lang="scss">
	@import "../assets/css/common.scss";


</style>