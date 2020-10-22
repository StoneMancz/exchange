<template>
  <div id="tv-top">
    <span @click="showMarket = !showMarket">{{rightName}}/{{leftName}}</span>
    <!-- <span class="lastprice">{{lastPrice}}</span> -->
    <!-- <span>≈{{lastPrice*usprice}}CNY</span>
    <span>涨幅 {{downUp}}%</span>
    <span>高 {{coin.high}}</span>
    <span>低 {{coin.low}}</span>
    <span>24H量 {{coin.total}}</span> -->
    <div class="market-box" v-if="showMarket">
      <deal-market></deal-market>
    </div>
  </div>
</template>

<script>
import dealMarket from './dealMarket'
export default {
  components:{dealMarket},
  data() {
    return {
      leftName: "",
      rightName: "",
      legalId: "",
      curencyId: "",
      coin: {},
      lastPrice: "",
      downUp: "",
      showMarket:false,
      usprice:''

    };
  },
  created() {
   this.leftName = window.localStorage.getItem("dealLegalName") || "";
    this.rightName = window.localStorage.getItem("dealCurrencyName") || "";
    this.currencyId = window.localStorage.getItem("dealCurrencyId");
    this.legalId = window.localStorage.getItem("dealLegalId");
    this.init(this.legalId, this.currencyId);
    this.downUp = window.localStorage.getItem("dealDownUp");
  },
  mounted() {
    var that = this;
    eventBus.$on("toNew", function(msg) {
      // console.log('laaaaaaaaa',msg);
        var thattoken = that.rightName+'/'+that.leftName;
        if(msg.istoken == thattoken){
          that.lastPrice = (msg.newprice-0).toFixed(4);
          that.downUp = (msg.newup-0).toFixed(2);
          // that.coin.total = msg.hour24;
        }
      
    });
    that.$socket.on('transaction',msg => {
      if(msg.type == 'transaction'){
        // console.log(msg);
        
        if((that.rightName+'/'+that.leftName) == msg.token){
          if(msg['24h']){
            that.coin = JSON.parse(msg['24h']);
          }
        }
        
      }
    })
  },
  methods: {
    init(legalId, currencyId) {
      this.$http({
        url: "/api/transaction/deal",
        method: "post",
        data: {
          legal_id: legalId,
          currency_id: currencyId
        },
        headers: {'Authorization':  localStorage.getItem('token')},    
      }).then(res => {
        if (res.data.type == "ok") {
          this.lastPrice = res.data.message.last_price;
        }
      });
    }
  }
};
</script>

<style lang='scss'>
#tv-top {
  font-size: 12px;
  position: relative;
  background: #1a243b;
  color: #c7cce6;
  cursor: pointer;
  > span:first-child {
    // font-size: 20px;
    font-weight: 600;
    padding: 0 15px;
    background: url('../assets/images/arrow0.png') right center/ 10px no-repeat;
  }
  > .lastprice {
    color: #7a98f7;
    // font-size: 18px;
    font-weight: 600;
  }
  > span {
    line-height: 40px;
    margin: 0 2px;
  }
  >.market-box{
    position: absolute;
    z-index: 999;
    left: 0;top: 40px;
    padding: 5px 10px;
    width: 290px;
    background: #1a243b;
    border: 1px solid #2e3753;
    border-radius: 4px;
  }
}
</style>



// WEBPACK FOOTER //
// src/view/dealTop.vue