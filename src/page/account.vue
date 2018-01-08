<template>
	<div id="account">
		<div id="container">
			<router-link to="regisiter">
				<button>注册</button>
			</router-link>
			<router-link to="login">
				<button>登录</button>
			</router-link>
		</div>
		<TabBar></TabBar>
	</div>
</template>

<script>
	import TabBar from "../components/TabBar.vue"
	export default{
		name:"account",
		components: {
			TabBar
		},
		data(){
			return{
				
			}
		}
	}
</script>

<style>
	
#account{
}
#container{
	
}
</style>