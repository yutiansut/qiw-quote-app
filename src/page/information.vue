<template>
	<div style="display: none;">
		<mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange">
		    <ul>
		        <li v-for="item in list">{{ item.k }}</li>
		    </ul>
		    <div slot="top" class="mint-loadmore-top">
		      	<span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
		      	<span v-show="topStatus === 'loading'">Loading...</span>
		    </div>
		</mt-loadmore>
		<button @click="show">带你一下</button>
		<mt-popup
			v-model="popupVisible"
			position="right"
			>
			<div v-for="it in slots" style="width: 7.5rem;height:2rem;background-color: $white;">
	            <span v-text="it.flex"></span>
	       	</div>
		</mt-popup>
		<mt-datetime-picker
		    ref="picker"
		    type="time"
		    v-model="pickerValue"
		    @confirm="handleConfirm"
		    confirmText="我不要了"
		    year-format="{value} 年"
		    month-format="{value} 月"
		    date-format="{value} 日"
		    :startDate="startDate"
		    :endDate="endDate"
		    >
		</mt-datetime-picker>
		<button @click="showtime">点击出现时间选择</button>
	</div>
</template>

<script>
	export default{
		name:"information",
		data(){
			return{
				topStatus:'',
				list:[{k:1},{k:2},{k:3},{k:4},{k:5},{k:6}],
				popupVisible:false,
				slots: [
			        {
				        flex: 1
			        }, {
				        flex: true
			        }, {
				        flex: 1
			        }
			    ],
				pickerValue:"",
				startDate:new Date("2010-01-01"),
				endDate:new Date()
			}
		},
		methods:{
			handleTopChange(status) {
		        this.topStatus = status;
		    },
		    loadTop:function(){
		      	
		    },
		    show:function(){
		      	this.popupVisible=true
		    },
		    showtime:function(){
		      	this.$refs.picker.open();
		    },
		    handleConfirm:function(){
//		    	console.log(value)
		    }
		}
	}
</script>

<style>
</style>