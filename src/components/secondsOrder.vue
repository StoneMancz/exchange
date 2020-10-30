<template>
  <div  :class="[loctheme=='white'?'home whitebg':'home']">
    <div class="content flex between">
      <!-- <div class="flex ins-header">
       <p v-if="(bmbBalance-0) < 1000"> 受保资产：{{(bmbBalance-0).toFixed(1) || '0.00'}} HAP</p>
        <p v-if="(bmbBalance-0) >= 1000"> 受保资产：{{(bmbBalance-0).toFixed(1)}}万 HAP</p>
       <div>
         <span class="colorGrey" @click="insure1(item.id)" v-for="item in insurancType" :class="[{'active':item.id == userInsurancId}]">{{item.name}}</span>
       </div>
      </div> -->
      <div class="main-top">
        <div class="tv-box">
          <tv
            v-if="this.quotationList.length > 0"
            :quotationList="quotationList"
            :symbol="symbol"
            :types="types"
          ></tv>
        </div>
        <div class="Kline">
          <kline :symbol="symbol"></kline>
        </div>
        <div class="flex">
          <div class="tran-box bg-part">
            <!-- <leverTransaction :leverData="leverData"></leverTransaction> -->
            <leverTransaction :leverTradeId="leverTradeId"></leverTransaction>
          </div>
         
        </div>
      </div>
      <div class="main-bottom">
         <div class="trade-box">
            <trade :leverTradeId="leverTradeId" :skinstyle="loctheme" :currencyName="currencyName"></trade>
            <!-- <trade></trade> -->
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import tv from "@/view/lever/secondTv";
import trade from "@/view/lever/second-trade";
import Kline from "@/view/lever/leverKline";
import leverTransaction from "@/view/lever/second_transactions";
import {mapState} from 'vuex'
export default {
  name: "leverDealCenter",
  components: {
    tv: tv,
    trade: trade,
    leverTransaction: leverTransaction,
    Kline
  },
  data() {
    return {
      isRouterAlive: true,
      token: localStorage.getItem("token"),
      quotationList: [],
      leverData: {
        legalId: "",
        currencyId: ""
      },
      marketData: {},
      currencyData: {},
      symbol: "",
      topBuy: {
        buyList: [],
        sellList: [],
        newsPrice: ""
      },
      leverTradeId: 0,
      years: "",
      times: "",
      types: "seconds",
      skins: localStorage.getItem("skin") || "days",
      insurancType: [],
      userInsurancId: "",
      bmbBalance:'',
      currencyName:"",
    };
  },
  computed:{
    ...mapState(['theme']),
  },
  watch: {
    theme:{
      handler(){
        var t=this.theme;
        this.loctheme=t;        
      },
      immediate: true
    },
    $route(to, from) {
      console.log(to)
      if (this.leverData.currencyId != to.query.currencyId) {
        location.reload();
      }
      // this.leverData.currencyId = to.query.currencyId;
      // this.init();
      // return this.init();
    },
  },
  beforeCreate() {
    // if (
    //   localStorage.getItem("skin") &&
    //   localStorage.getItem("skin") == "nights"
    // ) {
    //   document.querySelector("html").setAttribute("style", "background:#000;");
    //   document.querySelector("body").setAttribute("style", "background:#000;");
    // } else {
    //   document
    //     .querySelector("html")
    //     .setAttribute("style", "background:#f8f6f6;");
    //   document
    //     .querySelector("body")
    //     .setAttribute("style", "background:#f8f6f6;");
    // }
  },
  created() {
    // document.getElementById("app").style("background", "background:#000;");
    // document.querySelector("html").setAttribute("style", "background:#000;");
    var that = this;
    that.token = localStorage.getItem("token");
    that.leverData.legalId = this.$route.query.legalId || "";
    that.leverData.currencyId = this.$route.query.currencyId || "";
    this.marketSocket();
    
  },
  mounted() {
    var that = this;
    that.init();
    that.getDeal();
    setInterval(function() {
      if (localStorage.getItem("orderStatus") == 1) {
        that.getDeal();
      }
    }, 1);
  },

  beforeDestroy() {
    // document.querySelector("html").removeAttribute("style");
    // document.getElementById("app").removeAttribute("style");
  },
   sockets: {
    connect: function () {
      console.log("连接成功");
    },
    customEmit: function (data) {
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)'
      );
    },
    STREAM_STATUS(data) {
      // 后端按主题名推送的消息数据
      console.log("Page：" + data);
    },
  },
  methods: {
    init() {
      var that = this;
      this.$ajax({
        url: "/api/" + "currency/quotation_new",
        method: "get",
        data: {}
      })
        .then(res => {
          if (res.data.type == "ok") {
            console.log(that.leverData.legalId );
            console.log( that.leverData.currencyId)
  
            var arr = [];
            var arr2 = [];
            res.data.message.forEach((item,index)=>{
              var datas = item.quotation.filter(options=>{
                return options.is_display==1&&options.open_microtrade==1
              })
              arr = datas
              datas.forEach((options)=>{
                if(that.leverData.legalId==options.legal_id&&that.leverData.currencyId==options.currency_id){
                  that.symbol =
                      options.currency_name +
                      "/" +
                      options.legal_name;
                    that.leverTradeId = options.id;
                    that.currencyName = options.currency_name;
                }
              })
            })
            that.quotationList = arr;
            if (that.symbol == "") {
              that.symbol = arr[0].currency_name + "/" + arr[0].legal_name;
              that.leverData.legalId = arr[0].legal_id;
              that.leverData.currencyId = arr[0].currency_id;
              that.leverTradeId = arr[0].id;
              that.currencyName = arr[0].currency_name;
            }
            that.marketSocket();
          }
        })
        .catch(error => {});
    },

    // 行情socket
    marketSocket() {
      var that = this;
      that.$socket.emit("login", localStorage.getItem("user_id"));
      this.$options.sockets.daymarket=(msg)=>{
        if (msg.type == "daymarket") {
          for (var i = 0; i < that.quotationList.length; i++) {
            if (
              that.quotationList[i].legal_id == msg.legal_id &&
              that.quotationList[i].currency_id == msg.currency_id
            ) {
              that.quotationList[i].now_price = msg.now_price;
              // that.quotationList[i].spread = msg.spread;
              that.quotationList[i].change = msg.change;
              that.quotationList[i].volume = msg.volume;
            }
          }
        }
      }
    },
    getDeal() {
      var that = this;
      this.$ajax({
        url: "/api/microtrade/payable_currencies",
        method: "get",
        data: {},
        headers: { Authorization: that.token }
      }).then(res => {
        if (res.data.type == "ok") {
          var datas = res.data.message;
          if (datas.length > 0) {
            for (var i = 0; i < datas.length; i++) {
              if (datas[i].name == "HAP") {
                that.bmbBalance = datas[i].user_wallet.micro_balance;
                that.insurancType = datas[i].insurance_types;
                if(datas[i].user_insurance){
                  that.userInsurancId =datas[i].user_insurance.insurance_type_id;
                }
                
              }
            }
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.home {
  color: #fff;
  height: 100%;
  width: 100%;
  min-width: 1200px;
  overflow: hidden;
  /* -moz-user-select: all;
  -ms-user-select: all;
  user-select: all;
  -webkit-user-select: all; */
  margin: 0 auto 0;
  background-color: #000;
}
.whiteBg {
  background-color: #f8f6f6 !important;
  color: #333 !important;
}
.whiteBg >>> .lists {
  background-color: #fff;
}
.whiteBg >>> .lists li {
  background-color: #fff;
  border-bottom: 1px solid #e9e9e9;
  color: #333;
}
.whiteBg >>> .Kline {
  background-color: #fff;
}
.whiteBg .exchange-box {
  background-color: #fff;
}
.whiteBg >>> .new_price {
  color: #333;
}
.whiteBg >>> .new_price {
  border-bottom: 1px solid #e9e9e9;
}
.whiteBg >>> .line {
  border-bottom: 1px solid #e9e9e9;
}
.whiteBg >>> .list-item li span,
.whiteBg >>> .exchange_title span {
  color: #333;
}
.whiteBg .tran-box {
  background-color: #fff;
  color: #333;
  
}
.whiteBg >>> .list_head {
  border-bottom: 1px solid #e9e9e9;
}
.whiteBg >>> .fColor1 {
  color: #333;
}
.whiteBg >>> .list_head {
  color: #333;
}
/* .whiteBg >>> .trade-box {
  background-color: #fff;
} */
.whiteBg >>> .tabs .active {
  background-color: ##7a98f7;
  color: #fff;
}
.whiteBg >>> .tabs {
  background-color: #fff;
  border-bottom: 1px solid #e9e9e9;
}
.whiteBg >>> .rights {
  background-color: #fff;
}
.whiteBg >>> .content .el-input__inner {
  background-color: #fff;
  border: 1px solid #e9e9e9;
}
.whiteBg >>> .content .el-select {
  background-color: #fff;
}
.whiteBg >>> .el-select-dropdown {
  background-color: #fff;
}
/* .whiteBg >>> .share-rights {
  background-color: #fff;
} */
.whiteBg >>> .share-rights input {
  background-color: #fff;
  border: 1px solid #e9e9e9;
  color: #333;
}
.whiteBg >>> .trade .el-select .el-input.is-focus .el-input__inner {
  border-color: #f1f1f1;
}
.whiteBg >>> .footer-content {
  background-color: #fff;
}
.whiteBg >>> .footer {
  background-color: #fff;
}
.whiteBg >>> .curency-list span {
  color: #333;
  border: 1px solid #e9e9e9;
}
.whiteBg >>> .share-rights p {
  color: #333;
  border: 1px solid #e9e9e9;
}
.whiteBg >>> .mult-content p {
  color: #333;
  border: 1px solid #e9e9e9;
}
.content {
  width: calc(100% - 0px);
  min-width: 1200px;
  margin: 0 auto 10px;
}
.main-top {
  width: 73%;
  margin-right: 1px;
}
/* .tv-box {
  height: 550px;
} */
.exchange-box {
  background-color: #1e2b34;
  height: 550px;
}
.username {
  line-height: 30px;
  width: 100%;
  padding: 0 10px;
  border-bottom: 1px solid #2f3d45;
}
.username p {
  color: #2b88e5;
  font-size: 12px;
}
.username img {
  width: 17px;
}
.main-bottom {
  width: 26%;
}
.tran-box {
  /* background-color: #1e2b34; */
  margin-top: 1px;
  height: 467px;
  overflow-y: scroll;
  width: 100%;
  margin-top: 10px;
}
.tran-box::-webkit-scrollbar {
  width: 0;
}

.trade-box {
  /* background-color: #1e2b34; */
  margin-top: 1px;
  height: 467px;
  /* overflow-y: scroll; */
}
/* .footer {
  width: calc(100% - 2px);
  height: 30px;
  line-height: 30px;
  background-color: #1e2b34;
  margin-top: 1px;
  margin-left: 1px;
}
.footer-content {
  width: 96%;
  margin: 0 auto;
  color: rgb(128, 137, 142);
  font-size: 12px;
} */
.ins-header{
  line-height: 50px;
  padding-left: 15px;
}
.ins-header div{
  margin-left: 10px;
}
.colorGrey{
  display: inline-block;
  height: 30px;
  line-height: 30px;
  margin-top: 7px;
  padding: 0 8px;
  border: 1px solid #e6ecf2;
  border-radius: 4px;
  margin-right: 10px;
}
.ins-header .active{
  border: 1px solid ##7a98f7;
  color: ##7a98f7;
}
</style>



// WEBPACK FOOTER //
// src/components/secondsOrder.vue