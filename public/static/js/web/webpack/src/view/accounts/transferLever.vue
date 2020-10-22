<template>
    <div id="transfer-legal" v-if="coins.length">
       <div class="title">{{$t('asset.transfer')}}</div>
       <ul class="coins">
           <li v-for="(coin,index) in coins" :key="index" :class="['pointer whites',{'active':index == coinIndex}]" @click="coinIndex = index;number = ''">
               {{coin.currency_name}}
           </li>
       </ul>
       <div class="types">
           <div class="types-l">
               <div>{{$t('asset.from')}}</div>
               <div>{{$t('asset.to')}}</div>
           </div>
           <div class="types-r">
               <div>
                   <div>{{types[0]}}</div>
                   <div>{{types[1]}}</div>
               </div>
               <img src="../../../static/imgs/transfer1.png" alt="" @click="types.reverse();number=''">
           </div>
       </div>
       <div class="number">
           <input type="number" class="bdb input_color" :placeholder="$t('asset.pNum')" v-model="number">
           <span style="color:#61688a">{{coins[coinIndex].currency_name}}</span>
           <span class="all" @click="all">{{$t('td.all')}}</span>
       </div>
       <div class="balance" style="line-height:60px;margin:20px 0 0px">{{$t('asset.leverUse')}}：{{lever_coins[coinIndex].lever_balance}}</div>
       <div class="balance" style="margin:5px 0 30px">{{$t('asset.changeUselg')}}：{{coins[coinIndex].change_balance}}</div>
       <button type='button' class="transfer" @click="transfer">{{$t('asset.transfer')}}</button>
    </div>
</template>

<script>
export default {
  data() {
    return {
      token: "",
      selectedCoin: { name: "", id: "" },
      lever_coins:[],
      coins: [],
      coinIndex: 0,
      types:[this.$t('asset.lever_account'),this.$t('asset.currency_account')],
      number:''
    };
  },
  created() {
    this.getCoins();
  },
  methods: {
    getCoins() {
      this.token = window.localStorage.getItem("token") || "";
      this.$http({
        url: "/api/wallet/list",
        method: "post",
        headers: { Authorization: this.token }
      }).then(res => {
        if (res.data.type == "ok") {
          var legData = res.data.message.change_wallet.balance;
          var coins= legData.filter(function(item,index) {
            return item.is_match==1;
          }); 
          var data=res.data.message.lever_wallet.balance;
          var micro_coins = data.filter(function(item,index) {
                // console.log(item)
                return item.is_legal==1;
            }); 
          let coinsData=[];
          let microCoinsData=[];
            if(coins.length>micro_coins.length){
              for(let i=0;i<micro_coins.length;i++){
                for(let j=0;j<coins.length;j++){
                  if(micro_coins[i].currency==coins[j].currency){
                    coinsData.push(coins[j]);
                    microCoinsData.push(micro_coins[i]);
                    break;
                  }
                }
              }
            }else{
              for(let i=0;i<coins.length;i++){
                for(let j=0;j<micro_coins.length;j++){
                  if(coins[i].currency==micro_coins[j].currency){
                    coinsData.push(micro_coins[j]);
                    microCoinsData.push(coins[i]);
                    break;
                  }
                }
              }
            }
          this.lever_coins=microCoinsData;
          this.coins=coinsData;
        }
      });
    },
    all(){
        if(this.types[0] == this.$t('asset.lever_account')){
            this.number = this.lever_coins[this.coinIndex].lever_balance
        }else{
            this.number = this.coins[this.coinIndex].legal_balance
        }
    },
    transfer(){
        if(this.number == ''){
            layer.msg(this.$t('asset.pNum'));return;
        } else {
            let data = {};
            data.number = this.number;
            // data.type = this.types[0] == this.$t('asset.lever_account')?2:1;
             data.currency_id = this.coins[this.coinIndex].currency;
            data.from_field=this.types[0] == this.$t("asset.lever_account") ? "lever" : "change",
            data.to_field=this.types[1] == this.$t("asset.currency_account") ? "change" : "lever"
            this.$http({
              url: "/api/wallet/change",
              method: "post",
              data:data,
              headers: { Authorization: this.token }
            }).then(res => {
              if (res.data.type == "ok") {
                layer.msg(res.data.message);
                setTimeout(() => {
                  // this.$router.push({
                  //   path: "/legalAccount",
                  //   query: { currency_id: this.coins[this.coinIndex].currency }
                  // });
                  this.$router.push({
                    path: "/finance"
                  });
                }, 1000);
              } else {
                layer.msg(res.data.message);
              }
            });
            // this.$http({
            //     url:'/api/wallet/change',
            //     method:'post',
            //     data:data,
            //     headers: { 'Authorization': this.token }
            // }).then(res => {
            //     if(res.data.type == 'ok'){
            //         layer.msg(res.data.message)
            //         setTimeout(() => {
            //             this.$router.push({path:'/legalAccount',query:{currency_id:this.coins[this.coinIndex].currency}})
            //         },2000)
            //     }else{
            //         layer.msg(res.data.message)
            //     }
            // })
        }
    }
  }
};
</script>

<style lang='scss' scoped>
#transfer-legal {
  padding: 0 30px;
  color: #c7cce6;
  > .title {
      padding: 20px 0;
    font-size: 24px;
    color: #61688a;
  }
  > .coins {
    display: flex;
    justify-content: center;
    li {
      margin-right: 20px;
      padding: 5px 20px;
    //   color: #fff;
    //   background: #234165;
    }
    .active {
      background: #7a98f7 !important;
      color: #fff !important;
    }
  }
  >.types{
      margin: 30px 0;
    //   width: 400px;
      height: 80px;
      display: flex;
      justify-content: space-between;
      line-height: 40px;
      .types-r{
          display: flex;
      }
      img{
          margin: 25px;
          width: 30px;
          height: 30px;
      }
  }
  .number{
      margin: 30px 0 0;
    //   width: 430px;
      line-height: 40px;
      input{
        // border:none;
        // color:#f2f5ff;
        background: none;
        line-height: 40px;
        width: 755px;
        // border-bottom: 2px solid #3a4975;

      }
      .all{
          margin-left: 10px;
          padding-left: 10px;
          border-left: 1px solid #ccc;
      }
  }
  .transfer{
      display: block;
      margin: 0 auto;
      line-height: 40px;
      width: 200px;
      background: #7a98f7;
      color: #fff;
      border: none;
  }
}
</style>



// WEBPACK FOOTER //
// src/view/accounts/transferLever.vue