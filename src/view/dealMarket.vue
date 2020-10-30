<template>
  <div class="market">
    <div class="m_filter">
      <div class="tabtitle fColor1 ft14 curPer flex">
        <span v-for="(tab,index) in tabList " :key="index" :class="index==index1?'active':''"  @click="changeType(index,tab.name,tab.id)">{{tab.name}}</span>
      </div>
    </div>
    <div class="coin-title clear">
      <div>
        <span>{{$t('td.currency')}}</span>
        <!-- <img src="../assets/images/select0.png" alt> -->
      </div>
      <div>
        <span>{{$t('market.newprice')}}</span>
        <!-- <img src="../assets/images/select0.png" alt> -->
      </div>
      <div>
        <span>{{$t('market.change')}}</span>
        <!-- <img src="../assets/images/select0.png" alt> -->
      </div>
    </div>
    <div class="line bdb"></div>
    <ul class="coin-wrap scroll fColor1">
      <!-- <li>
                <span v-for="item in newData">{{item}}</span>
      </li>-->
      <li
        class="currency_p"
        v-for="(item,index) in marketList"
        :class="index==index2?'active_p':''"
        :key="index"
        @click="quota_shift(index,item.legal_id,item.legal_name,item.currency_name,item.currency_id,item.change,item.lever_share_num)"
        v-if="item.is_display == 1 && item.open_coin_trade==1" >
        <p>
          <span>{{item.currency_name}}</span>
          <span>{{(item.now_price-0).toFixed(4)}}</span>
          <span class='green' v-if="item.change>=0">+{{(item.change-0).toFixed(2)}}%</span>
          <span class='red' v-else>{{(item.change-0).toFixed(2)}}%</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "dealMarket",
  data() {
    return {
      ids: 0,
      isShow: 0,
      tabList: [],
      marketList: [],
      newData: ["FABCOIN", "$0.076128", "-1.11%"],
      legal_index: this.$route.params.legal_index,
      currency_index: this.$route.params.currency_index,
      tradeDatas: "",
      index2: 0,
      index1: 0,
      dataList: [],
      selectedId: "",
      shareNum:'',
      fiat_convert_cny:0.00
    };
  },
  sockets: {
      connect: function () {
          console.log('连接成功')
      },
      customEmit: function (data) {
          console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
      },
      STREAM_STATUS(data) {// 后端按主题名推送的消息数据
          console.log('Page：' + data)
      }
  },
  created: function() {
    this.socket(localStorage.getItem("token"));
    let that = this;
    //法币列表
    this.$ajax({
      url: "/api/" + "currency/quotation_new",
      method: "get",
      data: {},
      headers: { Authorization: localStorage.getItem("token") }
    })
      .then(res => {
        console.log("所有数据");
        console.log(res);
        if (res.data.type == "ok") {
          that.tabList = res.data.message;
          var msg = res.data.message;
          var arr_quota = [];
          let index = 0;
          let indexs = 0;
          
          if (!localStorage.getItem("dealIndex1")) {
            index = that.index1;
          } else {
            index = localStorage.getItem("dealIndex1");
            that.index1 = localStorage.getItem("dealIndex1");
          }
          if (!localStorage.getItem("dealIndex2")) {
            indexs = that.index2;
          } else {
            indexs = localStorage.getItem("dealIndex2");
            that.index2 = localStorage.getItem("dealIndex2");
          }
          that.marketList = res.data.message[index].quotation;
          that.selectedId =res.data.message[index].quotation[that.index2].legal_id;
          that.dataList = res.data.message;
          window.localStorage.setItem("fiat_convert_cny",that.dataList[index].rmb_relation);
          //默认法币id和name
          if (!localStorage.getItem("dealLegalId") &&!localStorage.getItem("dealCurrencyId") &&!localStorage.getItem("dealLegalName") &&!localStorage.getItem("dealCurrencyName")) {
            that.currency_name = msg[index].quotation[indexs].currency_name;
            that.currency_id = msg[index].quotation[indexs].currency_id;
            window.localStorage.setItem("dealCurrencyName",msg[index].quotation[indexs].currency_name);
            window.localStorage.setItem("dealLegalId",msg[index].quotation[indexs].legal_id);
            window.localStorage.setItem("dealLegalName",msg[index].quotation[indexs].legal_name);
            window.localStorage.setItem("dealCurrencyId",msg[index].quotation[indexs].currency_id);
            window.localStorage.setItem("fiat_convert_cny",msg[index].rmb_relation); 
            this.fiat_convert_cny = msg[index].rmb_relation;
            that.changeFee(msg[index].rmb_relation)
            //eventBus.$emit("change", msg[index].quotation[indexs].change);
          } else {
            that.currency_name = window.localStorage.getItem("dealCurrencyName");
            that.currency_id = window.localStorage.getItem("dealCurrencyId");
            var fiat_convert_cny = window.localStorage.getItem("fiat_convert_cny");
            this.fiat_convert_cny = fiat_convert_cny;
            that.changeFee(fiat_convert_cny);
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
    if (window.localStorage.getItem("dealIndex2") &&window.localStorage.getItem("dealIndex1")) {
      this.index2 = window.localStorage.getItem("dealIndex2");
      this.index1 = window.localStorage.getItem("dealIndex1");
    }
  },
  mounted() {
    var that = this;
    
    eventBus.$on("toNew", function(data) {
      //    console.log(data);
      if (data) {
        var newprice = data.newprice;
        var cname = data.istoken;
        var newup = Number(data.newup).toFixed(2);
        // console.log(newup)
        if (newup >= 0) {
          newup = "+" + Number(newup).toFixed(2) + "%";
          $("span[data-name='" + cname + "']")
            .next()
            .css("color", "#12b886");
        } else {
          newup = newup + "%";
          $("span[data-name='" + cname + "']")
            .next()
            .css("color", "#cc4951");
        }
        $("span[data-name='" + cname + "']")
          .html("$" + newprice)
          .next()
          .html(newup);
      }
    });
  },
  methods: {
    changeFee(fee){
      eventBus.$emit("fiat_convert_cny", fee);
    },
    changeType(index, currency, currency_id) {
      this.index1 = index;
      this.index2 = null;
      $(".currency_p p").removeClass("active_p");

      this.isShow = index;
      this.ids = "a";
      //    this.currency_name = currency;
      //    this.currency_id = currency_id;
      this.marketList = this.dataList[index].quotation;  
      this.fiat_convert_cny =  this.dataList[index].fiat_convert_cny;
    },
    getSymbols(callback) {
      if (this.address.length <= 0) {
        return false;
      }
      this.$ajax({
        url: "/api/" + "wallet/list?user_id=" + this.address || "",
        type: "GET"
      })
        .then(res => {
          if (res.data.type == "ok") {
            this.accountInfo = res.data.message;
            this.dataList = res.data.message.list;

            callback && callback();
          } else {
          }
        })
        .catch(error => {
          return error;
        });
    },
    //币种切换
    quota_shift(idx, id, legal_name, currency_name, currency_id, change,shareNum) {
      window.localStorage.setItem("dealDownUp", change);
      // window.localStorage.setItem("legal_id_cur", currency_id);

      window.localStorage.setItem("dealIndex1", this.index1);
      window.localStorage.setItem("dealIndex2", idx);
      this.ids = idx;
      var tradeDatas = {
        currency_id: currency_id,
        legal_id: id,
        currency_name: currency_name,
        leg_name: legal_name
      };
      window.localStorage.setItem("dealLegalId", id);
      window.localStorage.setItem("dealCurrencyId", currency_id);
      window.localStorage.setItem("dealLegalName", legal_name);
      window.localStorage.setItem("dealCurrencyName", currency_name);
      window.localStorage.setItem("fiat_convert_cny", this.fiat_convert_cny);
      this.changeFee(this.fiat_convert_cny);
      var symbol = currency_name + "/" + legal_name;
      window.localStorage.setItem("dealSymbol", symbol);
      location.reload();
      //向兄弟组件传数据
      // eventBus.$emit("change", change);
      //    eventBus.$emit('toTrade',tradeDatas);
      //    eventBus.$emit('toExchange',tradeDatas)
    },

    //socket连接封装
    socket(token) {
      var that = this;
      //console.log("socket");
      that.$socket.emit("login", localStorage.getItem("user_id"));
      this.$options.sockets.daymarket=(msg)=>{
        if (msg.type == "daymarket") {
          
          if (that.selectedId && that.selectedId == msg.legal_id) { 
            
            let lists = that.marketList;
            for (let i in lists) {
              if (lists[i].currency_id == msg.currency_id) {
                that.marketList[i].volume = msg.volume;
                that.marketList[i].now_price = msg.now_price;
                that.marketList[i].change = msg.change;
                
              }
            }
          }
        }
     }
      //   let that = this;
      //   $.ajax({
      //     url: _API + "user/info",
      //     type: "GET",
      //     dataType: "json",
      //     async: true,
      //     beforeSend: function beforeSend(request) {
      //       request.setRequestHeader("Authorization", token);
      //     },
      //     success: function success(data) {
      //       if (data.type == "ok") {
      //         var socket = io(socket_api);
      //         socket.on("connect", function(datas) {
      //           socket.emit("login", data.message.id);
      //           // 后端推送来消息时
      //           socket.on("daymarket", function(msg) {
      //             console.log(msg);
      //             if (msg.type == "daymarket") {
      //               if (that.selectId && that.selectId == msg.legal_id) {
      //                 // now_price
      //                 let lists = that.marketList;
      //                 for (i in lists) {
      //                   if (lists[i].currency_id == msg.currency_id) {
      //                     that.marketList[i].volume = msg.volume;
      //                     that.marketList[i].now_price = msg.now_price;
      //                     that.marketList[i].change = msg.change;
      //                   }
      //                 }
      //               }
      //             }
      //           });
      //         });
      //       }
      //     }
      //   });
    }
  }
};
</script>

<style scoped>
.m_title {
  height: 55px;
  padding: 15px 30px;
  line-height: 25px;
  position: relative;
}
.m_search input {
  border-radius: 3px;
  background: transparent;
  border: 1px solid #2e3753;
  line-height: 25px;
}
/* .m_search{position: absolute;width: 146px;right: 20px;top: -4px;height: 26px;border-radius: 3px;padding: 4px 8px 4px 0;} */
/* .m_search input{position: absolute;left: 0;top: 10px;z-index: 2;width: 100%;padding: 5px 40px 5px 8px;height: 26px;border-radius: 3px;background: transparent;border: 1px solid #2e3753;} */
.m_search img {
  width: 16px;
  height: 15px;
  position: absolute;
  right: 35px;
  top: 20px;
  z-index: 123;
}
/* .m_filter{padding: 10px 0 15px;} */
.m_filter {
  font-size: 14px;
}
.tabtitle {
  padding: 0 25px;
}
.tabtitle span {
  text-align: center;
  margin-right: 25px;
}
.coin-title div {
  width: 33.3%;
  height: 36px;
  line-height: 36px;
  text-align: center;
  float: left;
  color: #637085;
  font-size: 12px;
}
.coin-title img {
  vertical-align: middle;
  margin-top: -3px;
}
.line {
  width: 90%;
  margin: 0px auto;
  /* border-bottom: 1px solid #2e3753; */
}
.coin-wrap {
  height: 495px;
  overflow: auto;
}
.coin-wrap li {
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  font-size: 12px;
  /* color: #cdd6e4; */
}
.coin-wrap li span {
  display: block;
  width: 33%;
  float: left;
  text-align: center;
}
.coin-wrap li span:last-child {
  color: #cc4951;
}
/* .coin-wrap li:nth-child(odd){background-color: #1a243b;} */
.coin-wrap li span.green {
  color: #12b886;
}
.coin-wrap li p {
  overflow: hidden;
}
.active_p {
  background-color: rgba(46,55,83,.4);
}
.coin-wrap li p:hover {
  background-color: rgba(46,55,83,.4);
}
</style>



// WEBPACK FOOTER //
// src/view/dealMarket.vue