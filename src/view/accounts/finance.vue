<template>
    <div>
        <div class="top">
            <p>{{$t('asset.all_assets')}}：${{totle || '0.00' | toFixeds}}</p>
        </div>
        <div class="content_top flex alcenter fColor2 ft12" style="padding:0 30px">
            <p class="flex1 tc">{{$t('asset.currency')}}</p>
            <p class="flex1 tc">{{$t('asset.canuse')}}</p>
            <p class="flex1 tc">{{$t('asset.frezz')}}</p>
            <!-- <p class="flex1 tc">BTC估值<i></i></p> -->
            <!-- <p class="flex1 tc">锁仓</p> -->
            <p class="flex1 tc">{{$t('asset.conversion')}}($)</p>
            <p class="flex1 tc">{{$t('td.do')}}</p>
        </div>
        <ul class="list fColor1">
            <!-- <li v-for="(item,index) in list" :key="index" v-if="item.is_legal == 1 && item.is_lever == 1" @click="go_legalAccount(item.currency)"> -->
            <li class="curPer bdb" v-for="(item,index) in list" :key="index" >
                <!-- <li class="curPer bdb" v-for="(item,index) in list" :key="index" v-if="item.is_lever == 1"> -->
                <!-- <p class="legal_name">{{item.currency_name}}</p> -->
                <div class="balance_detail tc">
                    <div class="use_balance flex1">
                       <p class="use_balance_num ft12">{{item.currency_name}}</p>
                    </div>
                    <div class="flex1">
                       <!-- <p class="lock_balance_num ft12" v-if="item.currency_name=='BTC'||item.currency_name=='ETH'">
                           {{item.lever_balance || '0.00' | toFixeds8}}
                        </p> -->
                       <p class="lock_balance_num ft12">{{item.lever_balance || '0.00' | toFixeds8}}</p>
                    </div>
                    <div class="convert flex1">
                        <!-- <p class="lock_balance_num ft12" v-if="item.currency_name=='BTC'||item.currency_name=='ETH'">
                           {{item.lock_lever_balance || '0.00' | toFixeds8}}
                        </p> -->
                        <p class="lock_balance_num ft12">
                           {{item.lock_lever_balance || '0.00' | toFixeds8}}
                        </p>
                    </div>
                    <div class="convert flex1">
                        <!-- <p class="lock_balance_num ft12" v-if="item.currency_name=='BTC'||item.currency_name=='ETH'">
                           {{(item.lever_balance*item.cny_price) || '0.00' | toFixeds8}} (CNY)
                        </p> -->
                        <p class="lock_balance_num ft12" >
                           {{(item.lever_balance*item.usdt_price) || '0.00' | toFixeds8}}
                        </p>
                    </div>
                    <div class="convert flex1 ft12 operation">
                        <span @click="go_legalAccount(item.currency)">{{$t('asset.record')}}</span>
                        <span @click="$router.push({path:'/transferLever',query:{id:item.currency}})">{{$t('asset.transfer')}}</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return{
          totle:'',
          list:[],
        //   usprice:''
        }
    },
    filters: {
    toFixeds: function(value) {
      value = Number(value);
      return value.toFixed(4);
    },
    toFixeds8: function(value) {
      value = Number(value);
      return value.toFixed(8);
    }
  },
    created(){
       this.token = localStorage.getItem('token') || '';
    },
    mounted(){
       this.legal();
    },
    methods:{
         //法币账户
         legal(){
             var that = this
                 this.$ajax({
                    url: '/api/' + 'wallet/list',
                    method:'post',
                    data:{},
                    headers: {'Authorization':  that.token}
                    }).then(res=>{
                        
                        if(res.data.type  =='ok'){
                            that.list = res.data.message.lever_wallet.balance;
                            this.totle = res.data.message.lever_wallet.usdt_totle;
                        }else{
                            // layer.msg(res.message);
                        }
                    }).catch(error=>{
                        console.log(error)
                    })
        },
        go_legalAccount(currency_id){
             this.$router.push({
                name:'legalAccount',
                query:{
                  currency_id:currency_id
                }
            })
        }
    }
}
</script>
<style scoped>
    .operation{
        color: #5697f4;
    }
    .flex1{
        flex: 1;
    }
   .top{
       /* background: #1b1e2e; */
       color: #fff;
       padding: 15px 30px;
   }
   .all_account{
       color: #61688a;
   }
   .list{
       padding: 15px 30px;
   }
   .balance_detail{
       display: flex;
       justify-content: space-between;
       align-items: center;
       /* color: #61688a; */
   }
   .legal_name{
       color: #61688a;
       padding: 10px 0;
   }
   .use_balance_num,.lock_balance_num{
       padding: 10px 0;
       margin-top: 5px;
   }
   .list li{
       border-bottom: 1px solid #1B2A3E;
   }
   .convert{
       padding: 10px 0;
   }
</style>





// WEBPACK FOOTER //
// src/view/accounts/finance.vue