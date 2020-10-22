<template>

	<div  class="account-main">
		<div  class="account-top fColor2">
			<div  class="fl">
				<p  class="ft24">您好，
					<span  class="fColor1">{{accountInfo.account_number}}</span>
				</p>
				<div  class="ft14 mt15">认证:
					<img src="@/assets/images/icon_certified1.png" />
					<img src="@/assets/images/icon_certified1_s.png" v-show="ishow" />
					<img src="@/assets/images/icon_certified2.png" v-show="ishow" />
					<img src="@/assets/images/icon_certified2_s.png"/>
					<img src="@/assets/images/icon_certified3.png" />
					<img src="@/assets/images/icon_certified3_s.png" v-show="ishow" />
				</div>
			</div>
			<div  class="fr mt15 mr60">
				<span  class="baseBtn mr20 mouseDefault" style="line-height: 40px;" @click="goCharge" :current="0">充币</span>
			</div>
		</div>
		<div  class="pageBack" style="height: 10px;"></div>
		<div  class="account-title">总资产：￥{{accountInfo.total_assets}} </div>
		<div  element-loading-text="Loading..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(26,35,48,1)" class="list-wrap">
			<table  cellspacing="0" class="w100 tl ft14 fColor1">
				<thead >
				<th  class="w20">币种</th>
				<th  class="w25">可用 </th>
				<th  class="w25">冻结</th>
				<th  class="w20">交易所 </th>
				<!-- <th  class="w10">操作</th> -->
				</thead>
				<tbody>
				<tr v-for="(item ,index) in dataList">
					<td>{{item.token}}</td>
					<td>{{item.balance? item.balance:'0.00'}}</td>
					<td>{{item.lock_balance?item.lock_balance:'0.00'}}</td>
					<td>{{item.token}}</td>
					<!-- <td>{{item.balance}}</td>  -->
				</tr>
				</tbody>
			</table>
			<!-- <div class="el-loading-mask" ref="loading" style="background-color: rgb(26, 35, 48); " v-show="showLoading">
                <div class="el-loading-spinner">
                    <i class="el-icon-loading"></i>
                    <p class="el-loading-text">Loading...</p>
                </div>
            </div> -->
		</div>
	</div>
</template>
<script>
	export default {
		name: "accountCenter",
		data(){
			return{
				ishow:false,
				showLoading:false,
				accountInfo:{},
				dataList:[],

			}
		},
		methods:{
			goCharge(){
				this.$router.push({name:'recharge'})
			}
		},
		created(){
			this.address=localStorage.getItem('address') || '';
			if(this.address){
				this.showLoading=true;
				this.$http({
					url:'/api/'+'wallet/list?user_id='+this.address,
					type:'GET'
				}).then(res=>{
					if(res.data.type=='ok'){
						this.accountInfo=res.data.message;
						this.dataList=res.data.message.list;
					}else{
						alert(res.message)
					}
				}).catch(error=>{
					return error
				})
			}

		}
	};
</script>
<style lang="scss" scoped>

	.account-top {
		background-color: rgb(26, 35, 48);
		height: 120px;
		padding: 26px 50px;
		img {
			vertical-align: middle;
			margin-left: 12px;
		}
		.baseBtn, .baseborderBtn {
			width: 120px;
		}
	}

	.list-wrap {
		background-color: rgb(26, 35, 48);
		padding: 0 50px;
		table {
			th {
				line-height: 40px;
				color: rgb(99, 112, 133);
			}
			td {
				line-height: 47px;
				border-bottom: 1px solid 273142;
				.cashCoin{
					display:inline-block;
					width:72px;
					height:32px;
					line-height:32px;
					color:#fff;
					border:1px solid 273142;
				}
			}
		}
	}
</style>





// WEBPACK FOOTER //
// src/view/accountCenter.vue