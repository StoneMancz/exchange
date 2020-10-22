<template>
  <div class="wrap bg-part">
    <div class="lever-header fColor1 mb15">{{$t('lever.risk')}}：{{riskRate}}%</div>
    <div class="total-pro fColor1 clearfix">
      <p class="fl">
        {{$t('lever.allloss')}}：
        <span
          :class="['red','flex1',{'green':totalPro > 0}]"
        >{{totalPro | tofixedFour}}</span>
        <br />
        <!-- <span style="margin-top:5px;display:block;">
          当前盈亏：
          <b :class="['red','flex1',{'green':profitsPrice > 0}]">{{profitsPrice | tofixedFour}}</b>
        </span>-->
      </p>

      <button class="fr" type="button" @click="stopTotal()">{{$t('lever.onehouse')}}</button>
    </div>
    <ul class="list_head ft14 bdb">
      <li class="flex">
        <span class="width2">{{$t('lever.type')}}</span>
        <span class="width1">{{$t('lever.openPrice')}}</span>
        <span class="width1">{{$t('lever.nowPrice')}}</span>
        <span class="width1">{{$t('lever.bail')}}</span>
        <span class="width1">{{$t('lever.styPrice')}}</span>
        <span class="width1">{{$t('lever.stsPrice')}}</span>
        <span class="width2">{{$t('lever.openTime')}}</span>
        <span class="width1">{{$t('lever.rate')}}</span>
        <span class="width1">{{$t('lever.nightFee')}}</span>
        <span class="width1">{{$t('lever.loss')}}</span>
        <span class="width3">{{$t('td.do')}}</span>
      </li>
    </ul>
    <ul class="list_content fColor1 ft12">
      <li v-for="(item,index) in list_content" :key="index" class="flex alcenter">
        <span class="width2">{{item.type == 1? '买入':'卖出'}} {{item.symbol}} x{{item.share}}</span>
        <span class="width1">{{item.price || '0.00' | tofixedFour}}</span>
        <span class="width1">{{item.update_price || '0.00' | tofixedFour}}</span>
        <span class="width1">{{item.caution_money || '0.00' | tofixedFour}}</span>
        <span class="width1">{{item.target_profit_price || '0.00' | tofixedFour}}</span>
        <span class="width1">{{item.stop_loss_price || '0.00' | tofixedFour}}</span>
        <span class="width2">{{item.transaction_time}}</span>
        <span class="width1">{{item.trade_fee || '0.00' | tofixedFour}}</span>
        <span class="width1">{{item.overnight_money || '0.00' | tofixedFour}}</span>
        <span
          :class="['red','width1',{'green':item.profits > 0}]"
        >{{item.profits || '0.00' | tofixedFour}}</span>
        <div class="width3">
          <span class="stop-btn" @click="stopLoss(item.id)">{{$t('lever.setloss')}}</span>
          <span @click="pingcang(item.id)">{{$t('lever.ping')}}</span>
        </div>
      </li>
    </ul>
    <div class="mores" @click="load_more">
      <img v-if="list_content.length == 0" src="../assets/images/nodata.png" alt />
      <span>{{more}}</span>
    </div>

    <!-- 止盈止损弹窗 -->
    <div class="loss-modal flex" v-show="modalShow">
      <div class="content">
        <div class="loss-modal-header">
          <h3>{{$t('lever.setloss')}}</h3>
          <p @click="closeMosal()">X</p>
        </div>
        <div class="loss-madal-content">
          <div class="flex">
            <span>{{$t('lever.styPrice')}}：</span>
            <p>
              <span @click="reduce(1)">-</span>
              <input type="text" v-model="targetProfit" @input="inputValue(1)" />
              <span @click="add(1)">+</span>
            </p>
          </div>
          <p class="modal-text">{{$t('lever.expectProfit')}}：{{modalProfit}}</p>
          <div class="flex">
            <span>{{$t('lever.stsPrice')}}：</span>
            <p>
              <span @click="reduce(2)">-</span>
              <input type="text" v-model="stopLose" @input="inputValue(2)" />
              <span @click="add(2)">+</span>
            </p>
          </div>
          <p class="modal-text">{{$t('lever.expectLoss')}}：{{modalStop}}</p>
        </div>
        <div class="modal-btn">
          <button type="button" @click="closeMosal()">{{$t('td.canceil')}}</button>
          <button type="button" @click="comfirm()">{{$t('td.confirm')}}</button>
        </div>
      </div>
    </div>
    <!-- 一键平仓弹窗 -->
    <div class="loss-modal flex" v-show="stopModal">
      <div class="content">
        <div class="loss-modal-header">
          <h5>{{$t('lever.sureClose')}}</h5>
          <p @click="closeStopModal()">X</p>
        </div>
        <div class="stopModal">
          <span
            :class="['stopall',{'alls':selectType == 'all'}]"
            @click="selectStop('all')"
          >{{$t('lever.allClose')}}</span>
          <span
            :class="['stopbuy',{'buys':selectType == 'buy'}]"
            @click="selectStop('buy')"
          >{{$t('lever.moreClose')}}</span>
          <span
            :class="['stopsell',{'sells':selectType == 'sell'}]"
            @click="selectStop('sell')"
          >{{$t('lever.nullClose')}}</span>
        </div>
        <div class="stop-modal-btns">
          <button type="button" @click="closeStopModal()">{{$t('td.canceil')}}</button>
          <button type="button" @click="comfirmModal()">{{$t('td.confirm')}}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      legal_id: "",
      currency_id: "",
      list_content: [],
      page: 1,
      more: this.$t("td.more"),
      modalShow: false,
      targetProfit: "",
      stopLose: "",
      modalProfit: "",
      modalStop: "",
      modalId: "",
      // 开仓价
      presentPrice: "",
      riskRate: "",
      totalPro: "",
      stopModal: false,
      selectType: "all",
      // 当前价
      openPrice: "",
      // 当前盈亏
      profitsPrice: "",
      orderType: "",
      shareNum: ""
    };
  },
  created() {
    let that = this;
    this.legal_id = localStorage.getItem("legal_id");
    this.currency_id = localStorage.getItem("currency_id");
    this.init();
    that.loads();
    this.leverclosed();
  },
  filters: {
    tofixed: function(val) {
      val = Number(val);
      return val.toFixed(2);
    },
    tofixedFour: function(val) {
      val = Number(val);
      return val.toFixed(4);
    }
  },
  methods: {
    init() {
      this.more = this.$t("lever.loading");
      this.$ajax({
        url: "/api/" + "lever/dealall",
        method: "post",
        data: {
          legal_id: this.legal_id,
          currency_id: this.currency_id,
          page: this.page
        },
        headers: { Authorization: localStorage.getItem("token") }
      })
        .then(res => {
          if (res.data.type == "ok") {
            this.more = this.$t("td.more");
            this.list_content = this.list_content.concat(
              res.data.message.order.data
            );
            this.riskRate = res.data.message.hazard_rate;
            this.totalPro = res.data.message.profits_total;
            this.profitsPrice = res.data.message.profits;
            if (res.data.message.order.data.length == 0) {
              this.more = this.$t("td.nomore");
            }
            if (res.data.message.order.data.length == 0 && this.page == 1) {
              this.more = this.$t("td.nodata");
            }
          } else {
            layer.msg(res.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    // 轮询
    loads() {
      let that = this;
      that.$socket.emit("login", localStorage.getItem("user_id"));
      that.$socket.on("lever_trade", msg => {
        if (msg.type == "lever_trade") {
          var datas = msg.trades_all;
          if(that.legal_id == msg.legal_id){
             that.riskRate = msg.hazard_rate;
             that.totalPro = msg.profits_all;
          }
          
          that.profitsPrice = msg.profits;
          var list = that.list_content;
          let arr = [];
          list.forEach(function(item, index) {
            datas.forEach(function(itm, inx) {
              if (item.legal == itm.legal &&item.currency == itm.currency &&item.id == itm.id) {
                list.splice(index, 1, itm);
              }
            });
          });
          // that.list_content = list;
        }
      });
    },
    // 查询已平仓订单
    leverclosed(){
      var that = this;
      that.$socket.emit("login", localStorage.getItem("user_id"));
      that.$socket.on("lever_closed", msg => {
        if (msg.type == "lever_closed") {
          var list = that.list_content;
          var datas = msg.id;
          let arr = [];
          console.log(msg);
          list.forEach(function(item, index) {
            datas.forEach(function(itm, inx) {
              if (item.id == itm) {
                list.splice(index, 1);
              }
            });
          });
          // that.list_content = list;
        }
      });
    },
    

    pingcang(id) {
      let that = this;
      layer.confirm(that.$t("lever.sureClose"), function() {
        that
          .$http({
            url: "/api/" + "lever/close",
            method: "post",
            data: {
              id: id
            },
            headers: { Authorization: localStorage.getItem("token") }
          })
          .then(res => {
            if (res.data.type == "ok") {
              layer.msg(res.data.message);
              location.reload();
            } else {
              layer.msg(res.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      });
    },
    load_more() {
      this.page++;
      this.init();
    },
    // 设置止盈止损
    stopLoss(ids) {
      let that = this;
      that.modalShow = true;
      for (let i in that.list_content) {
        if (that.list_content[i].id == ids) {
          that.shareNum = that.list_content[i].share;
          that.modalId = that.list_content[i].id;
          that.presentPrice = parseFloat(that.list_content[i].price).toFixed(2);
          that.openPrice = parseFloat(
            that.list_content[i].update_price
          ).toFixed(2);
          if (that.list_content[i].target_profit_price > 0) {
            that.targetProfit = parseFloat(
              that.list_content[i].target_profit_price
            ).toFixed(2);
          } else {
            that.targetProfit = that.openPrice;
          }
          if (that.list_content[i].stop_loss_price > 0) {
            that.stopLose = parseFloat(
              that.list_content[i].stop_loss_price
            ).toFixed(2);
          } else {
            that.stopLose = that.openPrice;
          }

          if (that.list_content[i].type == 1) {
            that.orderType = "buy";
            if (that.list_content[i].target_profit_price > 0) {
              that.modalProfit = (
                (that.targetProfit -
                  parseFloat(that.list_content[i].price) -
                  0) *
                (that.list_content[i].share - 0)
              ).toFixed(2);
            } else {
              that.modalProfit = "0.00";
            }
            if (that.list_content[i].stop_loss_price > 0) {
              that.modalStop = (
                (parseFloat(that.list_content[i].price).toFixed(2) -
                  that.stopLose -
                  0) *
                (that.list_content[i].share - 0)
              ).toFixed(2);
            } else {
              that.modalStop = "0.00";
            }
          } else {
            that.orderType = "sell";
            if (that.list_content[i].target_profit_price > 0) {
              that.modalProfit = (
                (parseFloat(that.list_content[i].price).toFixed(2) -
                  that.targetProfit -
                  0) *
                (that.list_content[i].share - 0)
              ).toFixed(2);
            } else {
              that.modalProfit = "0.00";
            }
            if (that.list_content[i].stop_loss_price > 0) {
              that.modalStop = (
                (that.stopLose - parseFloat(that.list_content[i].price) - 0) *
                (that.list_content[i].share - 0)
              ).toFixed(2);
            } else {
              that.modalStop = "0.00";
            }
          }
        }
      }
    },
    // 加
    add(type) {
      let that = this;
      if (that.orderType == "buy") {
        if (type == 1) {
          that.targetProfit = (parseFloat(that.targetProfit) + 0.01).toFixed(2);
          that.modalProfit = (
            (parseFloat(that.targetProfit) - that.presentPrice - 0) *
            (that.shareNum - 0)
          ).toFixed(2);
        } else {
          that.stopLose = (parseFloat(that.stopLose) + 0.01).toFixed(2);
          that.modalStop = (
            (that.presentPrice - that.stopLose - 0) *
            (that.shareNum - 0)
          ).toFixed(2);
        }
      } else {
        if (type == 1) {
          that.targetProfit = (parseFloat(that.targetProfit) + 0.01).toFixed(2);
          that.modalProfit = (
            (parseFloat(that.presentPrice - that.targetProfit) - 0) *
            (that.shareNum - 0)
          ).toFixed(2);
        } else {
          that.stopLose = (parseFloat(that.stopLose) + 0.01).toFixed(2);
          that.modalStop = (
            (parseFloat(that.stopLose - that.presentPrice) - 0) *
            (that.shareNum - 0)
          ).toFixed(2);
        }
      }
    },
    // 减
    reduce(type) {
      let that = this;
      if (that.orderType == "buy") {
        if (type == 1) {
          if (that.targetProfit > 0) {
            that.targetProfit = (parseFloat(that.targetProfit) - 0.01).toFixed(
              2
            );
            that.modalProfit = (
              (parseFloat(that.targetProfit) - that.presentPrice - 0) *
              (that.shareNum - 0)
            ).toFixed(2);
          } else {
            layer.msg(that.$t("lever.thanzone"));
          }
        } else {
          if (that.stopLose > 0) {
            that.stopLose = (parseFloat(that.stopLose) - 0.01).toFixed(2);
            that.modalStop = (
              (that.presentPrice - that.stopLose - 0) *
              (that.shareNum - 0)
            ).toFixed(2);
          } else {
            layer.msg(that.$t("lever.thanzone"));
          }
        }
      } else {
        if (type == 1) {
          if (that.targetProfit > 0) {
            that.targetProfit = (parseFloat(that.targetProfit) - 0.01).toFixed(
              2
            );
            that.modalProfit = (
              (that.presentPrice - that.targetProfit - 0) *
              (that.shareNum - 0)
            ).toFixed(2);
          } else {
            layer.msg(that.$t("lever.thanzone"));
          }
        } else {
          if (that.stopLose > 0) {
            that.stopLose = (parseFloat(that.stopLose) - 0.01).toFixed(2);
            that.modalStop = (
              (parseFloat(that.stopLose - that.presentPrice) - 0) *
              (that.shareNum - 0)
            ).toFixed(2);
          } else {
            layer.msg(that.$t("lever.thanzone"));
          }
        }
      }
    },
    // 输入框输入
    inputValue(type) {
      let that = this;
      if (that.orderType == "buy") {
        if (type == 1) {
          let inputModal = (
            (parseFloat(that.targetProfit) -
              parseFloat(that.presentPrice) -
              0) *
            (that.shareNum - 0)
          ).toFixed(2);
          if (inputModal > 0) {
            that.modalProfit = inputModal;
          } else {
            that.modalProfit = 0.0;
          }
        } else {
          let inputModal = (
            (parseFloat(that.presentPrice) - parseFloat(that.stopLose) - 0) *
            (that.shareNum - 0)
          ).toFixed(2);
          if (inputModal > 0) {
            that.modalStop = inputModal;
          } else {
            that.modalStop = 0.0;
          }
        }
      } else {
        if (type == 1) {
          let inputModal = (
            (parseFloat(that.presentPrice) -
              parseFloat(that.targetProfit) -
              0) *
            (that.shareNum - 0)
          ).toFixed(2);
          if (inputModal > 0) {
            that.modalProfit = inputModal;
          } else {
            that.modalProfit = 0.0;
          }
        } else {
          let inputModal = (
            (parseFloat(that.stopLose) - parseFloat(that.presentPrice) - 0) *
            (that.shareNum - 0)
          ).toFixed(2);
          if (inputModal > 0) {
            that.modalStop = inputModal;
          } else {
            that.modalStop = 0.0;
          }
        }
      }
    },
    // 关闭弹窗
    closeMosal() {
      let that = this;
      that.modalShow = false;
    },
    // 确认设置
    comfirm() {
      let that = this;
      this.$ajax({
        url: "/api/" + "lever/setstop",
        method: "post",
        data: {
          id: that.modalId,
          target_profit_price: that.targetProfit,
          stop_loss_price: that.stopLose
        },
        headers: { Authorization: localStorage.getItem("token") }
      })
        .then(res => {
          if (res.data.type == "ok") {
            that.modalShow = false;
            layer.msg(res.data.message);
            for (let i in that.list_content) {
              if (that.modalId == that.list_content[i].id) {
                that.list_content[i].target_profit_price = that.targetProfit;
                that.list_content[i].stop_loss_price = that.stopLose;
              }
            }
          } else {
            layer.msg(res.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 一键平仓
    stopTotal() {
      let that = this;
      that.stopModal = true;
    },
    // 关闭一键平仓弹窗
    closeStopModal() {
      let that = this;
      that.stopModal = false;
    },
    // 选择平仓类型
    selectStop(types) {
      let that = this;
      that.selectType = types;
    },
    comfirmModal() {
      let that = this;
      let num = 0;
      if (that.selectType == "all") {
        num = 0;
      } else if (that.selectType == "buy") {
        num = 1;
      } else {
        num = 2;
      }
      this.$ajax({
        url: "/api/" + "lever/batch_close",
        method: "post",
        data: {
          type: num
        },
        headers: { Authorization: localStorage.getItem("token") }
      })
        .then(res => {
          if (res.data.type == "ok") {
            that.stopModal = false;
            layer.msg(res.data.message);
            that.list_content = [];
            that.init();
          } else {
            that.stopModal = false;
            layer.msg(res.data.message);
          }
        })
        .catch(error => {
          that.stopModal = false;
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
.total-pro {
  margin-bottom: 20px;
}
.wrap {
  min-height: 500px;
  /* background: #1a243b; */
  width: 97%;
  margin: 30px auto;
  padding: 30px;
}
ul li {
  padding: 8px 0;
}
ul li span {
  display: inline-block;
}
ul li div {
  display: inline-block;
}
ul li div span {
  border-radius: 3px;
  color: white;
  background-color: #638bd4;
  cursor: pointer;
  min-height: 33px;
  min-width: 80px;
  font-size: 14px;
  border: none;
  padding: 0 5px;
  line-height: 33px;
  text-align: center;
}
.list_head {
  color: #637085;
  /* border-bottom: 1px solid #2e333c; */
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
  width: 8%;
  text-align: center;
}
.width2 {
  width: 13%;
  text-align: center;
}
.width3 {
  width: 20%;
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
  color: #c7cce6;
}
.content {
  width: 560px;
  background-color: #171c2b;
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
  margin: 0 15px;
  padding-bottom: 10px;
}
.loss-madal-content div {
  line-height: 40px;
  margin-bottom: 10px;
}
.loss-madal-content div p {
  display: inline-block;
  border: 1px solid #2e333c;
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
.loss-madal-content input {
  background-color: rgba(0, 0, 0, 0);
  border-left: 1px solid #2e333c;
  border-right: 1px solid #2e333c;
  line-height: 40px;
  position: relative;
  top: -8px;
  color: #c7cce6;
  text-align: center;
}
.modal-text {
  width: 100%;
  text-align: center;
  line-height: 60px;
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
  border-left: 1px solid #2e333c;
  background: #689cf1;
}
.total-pro button {
  border-radius: 3px;
  color: white;
  background-color: #638bd4;
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
  border: 1px solid #638bd4;
  color: #638bd4;
  margin-right: 10px;
}
.alls {
  color: #fff;
  background-color: #638bd4;
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
</style>



// WEBPACK FOOTER //
// src/view/lever_transactions.vue