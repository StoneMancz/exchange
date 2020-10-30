<template>
	<div class="leftNav ft16 bg-part">
		<ul class="fColor1">
			<li v-for="(item,index) in array" :key="index" :class="index == curActive ? 'active' :''" @click="goto(index,item.page)">
				<img :src="index == curActive ? item.src2 : item.src1"/>
				<span>{{item.text}}</span>
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
		name: "left",
		data() {
			return {
				curActive:0,
				array:[
					{
						src1: require("@/assets/images/icon_account_settings.png"),
						src2: require("@/assets/images/icon_account_settings_s.png"),
						text: this.$t('header.accountSet'),
						page:'accountSet'
					},

					{
						src1: require("@/assets/images/icon_news.png"),
						src2: require("@/assets/images/icon_news_s.png"),
						text: this.$t('header.tradeLog'),
						page:'transferLog',
					},
					{
						src1: require("@/assets/images/icon_mine.png"),
						src2: require("@/assets/images/icon_mine_s.png"),
						text: this.$t('header.identify'),
						page:'authentication',
					},
					// {
					// 	src1: require("@/assets/images/icon_ji.png"),
					// 	src2: require("@/assets/images/icon_ji_s.png"),
					// 	text: '历史盈亏记录',
					// 	page:'profit',
					// },
					// {
					// 	src1: require("@/assets/images/icon_delegate.png"),
					// 	src2: require("@/assets/images/icon_delegate_s.png"),
					// 	text: '我的会员',
					// 	page:'tree',
					// },
					// {
					// 	src1: require("@/assets/images/converbility.png"),
					// 	src2: require("@/assets/images/convertibility-s.png"),
					// 	text: this.$t('header.jchange'),
					// 	page:'coinExchange',
					// },
				],
			}
		},
		created(){
			let name = this.$route.name;
			this.curActive = this.array.findIndex( val => val.page === name || (val.children && val.children.includes(name))) ;
		},
		mounted(){
            this.type=window.localStorage.getItem("type") || "";
			// if(this.type == 0){
			// 	this.array.splice(3,1);
			// }
			this.bus.$on("nav_name", name =>{
				this.curActive = this.array.findIndex( val => val.page === name || (val.children && val.children.includes(name))) ;
			})
		},
		methods: {
			goto(index,name) {
				this.curActive=index;
				this.$router.push({name: name, params: {lang: this.lang}})
			},

		}
	};
</script>
<style lang="scss" scoped>
	.leftNav{
		margin-right:20px;
		padding:4px;
		// background-color: #1a243b;
		width:210px;
		float:left;
		margin-bottom: -10000px;
		padding-bottom: 10000px;
		ul{
			height:820px;
			li{
				height:54px;
				line-height:54px;
				padding-left:38px;
				margin-bottom:4px;
				cursor:pointer;
				img{
					margin-right:12px;
					margin-top:-4px;
					width:20px;
					vertical-align: middle;
				}
			}
			.active{
				color:rgb(86, 151, 244);
				background-color: rgb(39, 49, 66);
				border-bottom: none;
				display: block;
			}
		}
	}
</style>





// WEBPACK FOOTER //
// src/view/left.vue