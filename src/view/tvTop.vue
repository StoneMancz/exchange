<template>
  <div id="tv-top" class="bg-partS fColor1">
    <span @click="showMarket = !showMarket">{{rightName}}/{{leftName}}</span>
    <!-- <span class="lastprice">{{lastPrice}}</span> -->
    <!-- <span>≈{{lastPrice*usprice}}CNY</span>
    <span>涨幅 {{downUp}}%</span>
    <span>高 {{coin.high}}</span>
    <span>低 {{coin.low}}</span>
    <span>24H量 {{coin.total}}</span> -->
    <div class="market-box bg-part bdb" v-if="showMarket">
      <market></market>
    </div>
  </div>
</template>

<script>
import market from './market'
export default {
  components:{market},
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
    this.leftName = window.localStorage.getItem("legal_name") || "";
    this.rightName = window.localStorage.getItem("currency_name") || "";
    this.currencyId = window.localStorage.getItem("currency_id");
    this.legalId = window.localStorage.getItem("legal_id");
    this.init(this.legalId, this.currencyId);
    this.downUp = window.localStorage.getItem("downUp");
    this.$options.sockets.transaction=(msg)=>{

      if(msg.type == 'transaction'){
        // console.log(msg);
        
        if((that.rightName+'/'+that.leftName) == msg.token){
          if(msg['24h']){
            that.coin = JSON.parse(msg['24h']);
          }
        }
        
      }
    
     }
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
    this.$options.sockets.transaction=(msg)=>{

      if(msg.type == 'transaction'){
        // console.log(msg);
        
        if((that.rightName+'/'+that.leftName) == msg.token){
          if(msg['24h']){
            that.coin = JSON.parse(msg['24h']);
          }
        }
        
      }
    
     }
  },
  methods: {
    init(legalId, currencyId) {
      this.$ajax({
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
  // background: #1a243b;
  // color: #c7cce6;
  cursor: pointer;
  > span:first-child {
    // font-size: 20px;
    font-weight: 600;
    padding: 0 15px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKBAMAAAB/HNKOAAAAG1BMVEUAAADN1uTN1uTN1uTN1uTN1uTN1uTN1uTN1uQDLfgAAAAACHRSTlMAwyRp55YPQu9xBBsAAAApSURBVAjXY0AGER0dHa0MjEBSgIHNo6MlgYFBo6MJKMHeUQCSN2ZAAQAemAg9/FQSTAAAAABJRU5ErkJggg==) right center/10px no-repeat;
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
    // background: #1a243b;
    // border: 1px solid #2e3753;
    border-radius: 4px;
  }
}
</style>



// WEBPACK FOOTER //
// src/view/tvTop.vue