<template>
  <div class="wrap">
    <div class="flex between">
      <div class="flex tab-header">
        <p class="tc" :class="[{'active':status == 1}]" @click="tabOrder(1)">{{$t('miscro.trade')}}</p>
        <p class="tc" :class="[{'active':status == 3}]" @click="tabOrder(3)">{{$t('lever.closed')}}</p>
      </div>
    </div>
    <p v-show="false">{{CountDown}}</p>
    <ul class="list_head ft14">
      <li class="flex between">
        <span class="width3 tls">{{$t('market.symbol')}}</span>
        <span class="width1">{{$t('td.num')}}</span>
        <span class="width2">{{$t('miscro.buyPrice')}}</span>
        <span class="width2" v-if="status == 1">{{$t('lever.nowPrice')}}</span>
        <span class="width2" v-if="status == 3">{{$t('miscro.finshPrice')}}</span>
        <span class="width2" v-if="status == 1">{{$t('miscro.loss')}}</span>
        <span class="width2 trs" v-if="status == 1">{{$t('miscro.times')}}</span>
        <span class="width2" v-if="status == 3">{{$t('lever.rate')}}</span>
        <span class="width2 trs" v-if="status == 3">{{$t('lever.loss')}}</span>
        <!-- <span class="width3">购买价</span>
        <span class="width2">{{$t('td.num')}}</span>
        <span class="width2">{{$t('td.placeTime')}}</span>
        <span class="width2 trs">倒计时</span>-->
      </li>
    </ul>
    <ul class="list_content list fColor1 ft12">
      <li
        v-if="orderList.length > 0 && item.remain_milli_seconds >0&& status==1 || status ==3 && orderList.length >0"
        v-for="(item,index) in orderList"
        :key="index"
        class="flex between"
      >
        <span class="width3 tls">{{item.symbol_name}} {{item.seconds}}s</span>
        <span class="width1">{{item.number || '0' | toFixedNum}} {{item.currency_name}}</span>
        <span class="width2">
          {{item.open_price || '0.00' | tofixedFour}}
          <img
            v-if="item.type == 1"
            width="10"
            src="../../../static/imgs/buy.png"
            alt
          >
          <img v-else width="10" src="../../../static/imgs/sell.png" alt>
        </span>
        <span v-if="status == 1&& item.status == 1" class="width2">{{prices || '0.00' | tofixedFour}}</span>
        <span v-if="status == 1&&item.status == 3" class="width2">{{item.end_price || '0.00' |tofixedFour}}</span>
        <span v-if="status == 3" class="width2">{{item.end_price || '0.00' |tofixedFour}}</span>
         <!-- <span
          class="width2 greenColor"
          v-if="item.status == 1&& status == 1  && (item.open_price -0) == (prices -0)"
        >0</span> -->
        <span
          class="width2 redColor"
          v-if="item.status == 1&& status == 1 && item.type == 1 && (item.open_price -0) > (prices -0)"
        >-{{item.number || '0' | tofixedFour}}</span>
        <span
          class="width2 greenColor"
          v-if="item.status == 1&& status == 1 && item.type == 1 && (item.open_price -0) <= (prices -0)"
        >{{(item.number * item.profit_ratio -0) /100 || '0.00' | tofixedFour}}</span>
        <span
          class="width2 greenColor"
          v-if="item.status == 1&& status == 1 && item.type == 2 && (item.open_price -0) >= (prices -0)"
        >{{(item.number * item.profit_ratio -0) /100 || '0.00' | tofixedFour}}</span>
        <span
          class="width2 redColor"
          v-if="item.status == 1&& status == 1 && item.type == 2 && (item.open_price -0) < (prices -0)"
        >-{{(item.number -0) || '0.00' | tofixedFour}}</span>
        <span class="width2 trs" v-if="status == 1 &&item.status == 3" :class="item.fact_profits <0?'redColor':'greenColor'">{{item.fact_profits || '0' |toFixedNum}}</span>
        <span
          v-if="status == 1&&item.status == 1"
          class="times width2 trs"
        >{{countDown(item.endTime,index,item.seconds)}}s</span>
        <span
          v-if="status == 1&&item.status == 3"
          class="times width2 trs"
        >0.0s</span>
        <span class="width2" v-if="status == 3">{{item.fee || '0.00' | tofixedFour}}</span>
        <span class="width2 trs" v-if="status == 3" :class="item.fact_profits <0?'redColor':'greenColor'">{{item.fact_profits || '0' |tofixedFour}}</span>
      </li>
    </ul>

    <!-- <div class="mores" @click="load_more" v-if="orderList.length == 0">
      <img  src="../../assets/images/nodata.png" alt>
      <span>{{more}}</span>
    </div>-->
    <div class="mores" v-if="orderList.length == 0">
      <img src="../../assets/images/nodata.png" alt>
      <span>{{$t("td.nodata")}}</span>
    </div>
  </div>
</template>
<script>
import { MessageBox } from "element-ui";
export default {
  props: {
    leverTradeId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      orderList: [],
      mescroll: null,
      times: "2019-04-10 17:00:00",
      CountDown: "",
      progressWidths: 1,
      status: 1,
      page: 1,
      set: null,
      out: null,
      prices: localStorage.getItem("newPrice"),
      more: "",
      tradeId: "",
    };
  },
  watch: {
    prices(a, b) {
      // console.log(a);
      return localStorage.getItem("newPrice");
    },
    leverTradeId: {
      immediate: true, // 这句重要
      handler(val) {
        if (val != 0) {
          this.tradeId = val;
        }
      },
      deep: true
    }
  },
 computed: {
    switchStatus: function() {
      if (this.tradeId != "" && this.tradeId != 0) {
        return this.tradeId; // 直接监听props里的status状态
      }
    }
  },
  created() {
  },
  mounted() {
    let that = this;
    setTimeout(function() {
      if (that.leverTradeId != "") {
        that.init();
      }
    }, 1500);
    that.connect();
      setInterval(function() {
        that.prices = localStorage.getItem("newPrice");
        if (localStorage.getItem("orderStatus") == 1) {
          that.page = 1;
          that.init();
        }
      }, 1);
  },
  filters: {
    toFixeds: function(val) {
      val = Number(val);
      return val.toFixed(2);
    },
    tofixedFour: function(val) {
      val = Number(val);
      return val.toFixed(4);
    },
    toFixedNum(val) {
      val = Number(val);
      return val.toFixed(0);
    }
  },
  methods: {
    init() {
      var that = this;
      clearTimeout(that.set);
      clearInterval(that.sets);
       var tradeIds = "";
      // this.more = this.$t("lever.loading");
      var data = {};
      if (that.status == 1) {
        tradeIds = that.tradeId;
        data = {
          page: that.page,
          status: that.status,
          match_id: that.tradeId,
          limit:20
        };
      } else {
        data = {
          page: that.page,
          status: that.status,
          limit:20
         
        };
      }
      this.$http({
        url:"/api/microtrade/lists",
        method: "get",
        params: data,
        headers: { Authorization: localStorage.getItem("token") }
      })
        .then(res => {
          if (res.data.type == "ok") {
            if (res.data.message.data.length > 0) {
              var arr = res.data.message.data;
              var nowTime = new Date().getTime();
              for (var i = 0; i < arr.length; i++) {
                arr[i].endTime =
                  nowTime - 0 + (arr[i].remain_milli_seconds - 0);
              }
              that.orderList = arr;
              that.Djs_time();
              that.set = setTimeout(that.countDown, 200);
              that.more = that.$t("td.more");
            } else {
              that.more = that.$t("td.nodata");
            }

            // this.orderList = this.orderList.concat(res.data.message.data);

            // if (res.data.message.data.length == 0 && that.page > 1) {
            //   this.more = this.$t("td.nomore");
            // }
            // if (res.data.message.data.length == 0 && that.page == 1) {
            //   this.more = this.$t("td.nodata");
            // }
          } else {
            layer.msg(res.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    load_more() {
      this.page++;
      this.init();
    },
    countDown(val, indexs, seconds) {
      var that = this;
      var timeValue = "";
      var process = 100 / Number(seconds);
      var seconds = "";
      var endItem = val; //获取列表传的截止时间
      var nowItem = new Date().getTime(); //获取当前时间
      var timeSpace = endItem - nowItem; //截止时间减去当前时间
      if (timeSpace > 0) {
        seconds = (timeSpace / 1000).toFixed(1);
        return seconds;
      } else if (timeSpace <= 0) {
        // that.init();
        return 0.0;
      }
    },
    Djs_time: function() {
      setInterval(() => {
        var presentTime = new Date().getTime();
        this.CountDown = presentTime;
      }, 200);
    },
    // 订单状态改变
    tabOrder(types) {
      var that = this;
      that.status = types;
      that.orderList = [];
      that.page = 1;
      that.init();
    },
    connect() {
      //封装推送数据
      var that = this;
      that.$socket.emit("login", localStorage.getItem("user_id"));
      that.$socket.on("micro_closed", msg => {
        if (msg.type == "micro_closed") {
          var datas = msg.data;
          for (var i = 0; i < that.orderList.length; i++) {
            if (that.orderList[i].id == datas.id) {
              that.orderList[i] = datas;
              setTimeout(function() {
                var arr = that.orderList;
                arr.splice(i, 1);
                that.orderList = arr;
              }, 500);

              return false;
            }
          }
        }
      });
    }
  }
};
</script>
<style scoped>
.tab-header {
  line-height: 40px;
}
.tab-header p {
  line-height: 40px;
  margin-right: 20px;
  cursor: pointer;
}
.tab-header .active {
  border-bottom: 1px solid ##7a98f7;
}
.total-pro {
  margin-bottom: 20px;
  margin-left: 30px;
}
.wrap {
  width: 100%;
  padding: 10px 15px;
}
ul li {
  line-height: 33px;
}
ul li span {
  display: inline-block;
}
ul li div {
  display: inline-block;
}
ul li div span {
  border-radius: 3px;
  cursor: pointer;
  min-height: 33px;
  font-size: 14px;
  border: none;
  line-height: 33px;
  text-align: center;
}
.list_head {
  color: #becbc6;
  border-bottom: 1px solid #2f3d45;
}
.red {
  color: #cc4951;
  cursor: pointer;
}
.green {
  color: #0d8551;
}
.stop-btn {
  margin-right: 10px;
}
.mores {
  color: #999;
  font-size: 14px;
  margin-top: 10px;
  cursor: pointer;
  text-align: center;
}
.mores img {
  width: 120px;
  height: 120px;
  margin: 30px auto 0;
}
.mores span {
  display: block;
  text-align: center;
}
.width1 {
  width: 9%;
  text-align: center;
}
.width2 {
  width: 15%;
  text-align: center;
}
.width3 {
  width: 30%;
  text-align: center;
}
.loss-modal {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
}
.content {
  width: 500px;
  /* background-color: #fff; */
  margin: 0 auto;
  border-radius: 5px;
}
.loss-modal-header {
  line-height: 40px;
  text-align: center;
  position: relative;
}
.loss-modal-header p {
  position: absolute;
  right: 10px;
  top: 0;
}
.loss-madal-content {
  margin: 15px 15px 0;
}
.loss-madal-content div {
  line-height: 40px;
  margin-bottom: 10px;
}
.loss-madal-content div p {
  display: inline-block;
  border: 1px solid #d1d3df;
  border-radius: 3px;
  height: 40px;
  position: relative;
}
.loss-madal-content p span {
  display: inline-block;
  width: 60px;
  text-align: center;
  font-size: 30px;
  position: relative;
  top: -3px;
  cursor: pointer;
}
.loss-madal-content p .adds {
  top: -1px;
}
.wrap >>> .el-dialog--center .el-dialog__body {
  padding: 25px 25px 20px;
}
.wrap >>> .el-button--primary {
  background-color: ##7a98f7;
  width: 140px;
  border: none;
}
.loss-madal-content input {
  background-color: rgba(0, 0, 0, 0);
  border-left: 1px solid #d1d3df;
  border-right: 1px solid #d1d3df;
  line-height: 40px;
  position: relative;
  top: -6px;
  text-align: center;
}
.modal-text {
  width: 100%;
  text-align: center;
  line-height: 40px;
}
.modal-btn {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  font-size: 0;
}
.modal-btn button {
  width: 50%;
  line-height: 50px;
  border: none;
  float: left;
  font-size: 14px;
  color: #fff;
  background: #9db5c7;
}
.modal-btn button:last-child {
  border-left: 1px solid #2f3d45;
  background: #689cf1;
}
.total-pro button {
  border-radius: 3px;
  color: white;
  background-color: ##7a98f7;
  cursor: pointer;
  min-height: 33px;
  min-width: 80px;
  font-size: 14px;
  border: none;
  padding: 0 5px;
  line-height: 33px;
  text-align: center;
}
.stopModal {
  margin: 20px 15px;
  text-align: center;
  padding-bottom: 20px;
}
.stopModal span {
  padding: 6px 15px;
  border-radius: 4px;
}
.stopall {
  border: 1px solid ##7a98f7;
  color: ##7a98f7;
  margin-right: 10px;
}
.alls {
  color: #fff;
  background-color: ##7a98f7;
}
.stopbuy {
  border: 1px solid #0d8551;
  color: #0d8551;
  margin-right: 10px;
}
.buys {
  color: #fff;
  background-color: #0d8551;
}
.stopsell {
  border: 1px solid #cc4951;
  color: #cc4951;
}
.sells {
  color: #fff;
  background-color: #cc4951;
}
.stop-modal-btns {
  width: 100%;
  font-size: 0;
}
.stop-modal-btns button {
  width: 50%;
  float: left;
  font-size: 14px;
  line-height: 40px;
  background-color: #9db5c7;
  border: none;
  outline: none;
  color: #fff;
}
.stop-modal-btns button:last-child {
  background-color: #689cf1;
}
.mores >>> .el-pager li {
  background: rgba(0, 0, 0, 0);
}
.mores >>> .btn-prev,
.mores >>> .btn-next {
  display: none;
}
.transfer-content h3 {
  text-align: center;
  color: ##7a98f7;
  font-size: 18px;
}
.tls {
  text-align: left !important;
}
.trs {
  text-align: right !important;
}
</style>



// WEBPACK FOOTER //
// src/view/lever/second_transactions.vue