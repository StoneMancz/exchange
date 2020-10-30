<template>
	<div class="leftNav ft14">
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
		name: "left_account",
		data() {
			return {
				curActive:0,
				array:[
					{
						src1: require("@/assets/images/icon_delegate.png"),
						src2: require("@/assets/images/icon_delegate_s.png"),
						text: this.$t('asset.currency_account'),
						page:'dealFinance',
						children:['dealFinance']
					},
					{
						src1: require("@/assets/images/icon_delegate.png"),
						src2: require("@/assets/images/icon_delegate_s.png"),
						text: this.$t('asset.lever_account'),
						page:'finance',
						children:['finance']
					},
					{
						src1: require("@/assets/images/icon_delegate.png"),
						src2: require("@/assets/images/icon_delegate_s.png"),
						text: this.$t('asset.fince_account'),
						page:'legal',
						children:['legal']
					},
					{
						src1: require("@/assets/images/icon_delegate.png"),
						src2: require("@/assets/images/icon_delegate_s.png"),
						text: this.$t('asset.micro_account'),
						page:'micro',
						children:['micro']
					},
					{
						src1: require("@/assets/images/transfer.png"),
						src2: require("@/assets/images/transferSelected.png"),
						text: this.$t('asset.assets_hua'),
						page:'transfer',
						children:['transfer']
					},
					
				],
			}
		},
		created(){
			let name = this.$route.name;
			this.curActive = this.array.findIndex( val => val.page === name || (val.children && val.children.includes(name))) ;

		},
		mounted(){
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
		
		ul{
			height:820px;
			li{
				overflow: hidden;
				white-space: nowrap;
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
// src/view/accounts/left_account.vue