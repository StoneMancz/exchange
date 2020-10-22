<template>
  <div class="wrap bg-part">
    <div class="tab-header">
      <span :class="[{'active':status == 0}]" @click="tabClick(0)">{{$t('lever.listin')}}</span>
      <span :class="[{'active':status == 1}]" @click="tabClick(1)">{{$t('lever.tdin')}}</span>
      <span :class="[{'active':status == 2}]" @click="tabClick(2)">{{$t('lever.closein')}}</span>
      <span :class="[{'active':status == 3}]" @click="tabClick(3)">{{$t('lever.closed')}}</span>
      <span :class="[{'active':status == 4}]" @click="tabClick(4)">{{$t('lever.revoked')}}</span>
    </div>
    <ul class="list_head bdb ft14">
      <li class="flex" v-if="list_content.length">
        <span class="width2">{{$t('lever.type')}}</span>
        <span class="width1" v-if="status == 0 || status == 4">{{$t('lever.entrustPrice')}}</span>
        <span class="width1" v-else>{{$t('lever.openPrice')}}</span>
        <span class="width1">{{$t('lever.nowPrice')}}</span>
        <span class="width1">{{$t('lever.styPrice')}}</span>
        <span class="width1">{{$t('lever.stsPrice')}}</span>
        <span class="width1">{{$t('lever.bail')}}</span>
        <span class="width1">{{$t('lever.canBail')}}</span>
        <span class="width2">{{$t('lever.openTime')}}</span>
        <span class="width2" v-if="status == 3">{{$t('lever.closeTime')}}</span>
        <span class="width1">{{$t('lever.rate')}}</span>
        <span class="width1">{{$t('lever.nightFee')}}</span>
        <span class="width1">{{$t('lever.loss')}}</span>
        <span class="width1">{{$t('fat.status')}}</span>
        <span class="width1" v-if="status == 0 || status == 1">{{$t('td.do')}}</span>
      </li>
    </ul>
    <ul class="list_content fColor1 ft12">
      <li v-for="(item,index) in list_content" :key="index" class="flex">
        <span class="width2">{{item.type == 1? $t('td.buyin'):$t('td.sellout')}} {{item.symbol}} x{{item.share}}</span>
        <span class="width1" v-if="status == 0 || status == 4">{{item.origin_price || '0.00' | tofixedFour}}</span>
        <span class="width1" v-else>{{item.price || '0.00' | tofixedFour}}</span>
        <span class="width1">{{item.update_price || '0.00' | tofixedFour}}</span>
        <span class="width1">{{item.target_profit_price || '0.00' | tofixedFour}}</span>
        <span class="width1">{{item.stop_loss_price || '0.00' | tofixedFour}}</span>
        <span class="width1">{{item.origin_caution_money || '0.00' | tofixedFour}}</span>
        <span class="width1">{{item.caution_money || '0.00' | tofixedFour}}</span>
        <span class="width2">{{item.transaction_time}}</span>
        <span class="width2" v-if="status == 3">{{item.handle_time}}</span>
        <span class="width1">{{item.trade_fee || '0.00' | tofixedFour}}</span>
        <span class="width1">{{item.overnight_money || '0.00' | tofixedFour}}</span>
        <span
          :class="['red','width1',{'green':item.profits > 0}]"
        >{{item.profits || '0.00' | tofixedFour}}</span>
        <span class="width1">{{item.status_name}}</span>
        <div class="width1 btns" v-if="status == 0 || status == 1">
          <button type="button" v-if="status == 0" @click="cannelOrder(item.id)">{{$t('lever.revoke')}}</button>
          <button type="button" v-if="status == 1" @click="closePosition(item.id)">{{$t('lever.ping')}}</button>
        </div>
      </li>
    </ul>
    <div class="mores" @click="load_more">
      <img v-if="list_content.length == 0" src="../../assets/images/nodata.png" alt>
      <span>{{more}}</span>
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
      more: this.$t('td.more'),
      status:0,
      flag:true
    };
  },
  created() {
    let that = this;
    // that.legal_id = localStorage.getItem("legal_id");
    // that.currency_id = localStorage.getItem("currency_id");
    that.init();
    if (that.status == 0 || that.status == 1) {
      that.polling();
      that.leverclosed();
    }
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
      let that = this;
      that.more = that.$t('cuy.loading');
      if(that.flag){
        var i = layer.load();
        this.$http({
        url: "/api/" + "lever/my_trade",
        method: "post",
        data: {
          status: that.status,
          legal_id: that.legal_id,
          currency_id: that.currency_id,
          page: that.page
        },
        headers: { Authorization: localStorage.getItem("token") }
      })
        .then(res => {
          layer.close(i)
          that.flag = true;
          if (res.data.type == "ok") {
            that.more = that.$t('td.more');
            if(that.page == 1){
              that.list_content = res.data.message.message.data;
            }else{
              that.list_content = that.list_content.concat(res.data.message.message.data);
            }
            
            if (res.data.message.message.data.length == 0) {
              that.more =that.$t('td.nomore');
            }
            if (res.data.message.message.data.length == 0 && that.page == 1) {
              that.more = that.$t('td.nodata');
            }
          } else {
            layer.msg(res.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
      }
      
    },

    // 轮询数据
    polling() {
      let that = this;
      that.$socket.emit("login", localStorage.getItem("user_id"));
      that.$socket.on("lever_trade", msg => {
        if (msg.type == "lever_trade") {
          if (that.status == 0) {
            var datas = msg.trades_entrust;
            var list = that.list_content;
            list.forEach(function(item, index) {
            datas.forEach(function(itm, inx) {
              if (item.legal == itm.legal &&item.currency == itm.currency &&item.id == itm.id) {
                list.splice(index, 1, itm);
              }
            });
          });
           
          } else if (that.status == 1) {
             var datas = msg.trades_all;
            datas=JSON.parse(datas);
            var list = that.list_content;
            list.forEach(function(item, index) {
            datas.forEach(function(itm, inx) {
              if (item.legal == itm.legal &&item.currency == itm.currency &&item.id == itm.id) {
                list.splice(index, 1, itm);
              }
            });
          });
            
          }
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
          if(that.status == 1 || that.status == 0){
            list.forEach(function(item, index) {
            datas.forEach(function(itm, inx) {
              if (item.id == itm) {
                list.splice(index, 1);
              }
            });
          });
          }
          
          // that.list_content = list;
        }
      });
    },
    // 加载更多
    load_more() {
      this.page++;
      this.init();
      that.flag = false;
    },
    // 状态切换
    tabClick(type) {
      let that = this;
      that.status = type;
      that.list_content = [];
      that.page = 1;
      that.init();
      that.flag = false;
      if (type == 0 || type == 1) {
         that.polling();
      }
    },
    // 平仓
    closePosition(ids) {
      let that = this;
      layer.confirm(that.$t('lever.sureping'),{skin:'confirmCancel'}, function() {
        var i = layer.load();
        that
          .$http({
            url: "/api/" + "lever/close",
            method: "post",
            data: {
              id: ids
            },
            headers: { Authorization: localStorage.getItem("token") }
          })
          .then(res => {
            layer.close(i);
            if (res.data.type == "ok") {
              layer.msg(res.data.message);
              setTimeout(function() {
                that.tabClick(that.status);
              }, 200);
            } else {
              layer.msg(res.data.message);
            }
          })
          .catch(error => {
            layer.close(i);
            console.log(error);
          });
      });
    },
    // 撤单
    cannelOrder(ids) {
      let that = this;
      layer.confirm(that.$t('lever.revokeOrder'), {skin:'confirmCancel'}, function() {
        var i = layer.load();
        that
          .$http({
            url: "/api/" + "lever/cancel",
            method: "post",
            data: {
              id: ids
            },
            headers: { Authorization: localStorage.getItem("token") }
          })
          .then(res => {
            layer.close(i);
            if (res.data.type == "ok") {
              layer.msg(res.data.message);
              setTimeout(function() {
                that.tabClick(that.status);
              }, 200);
            } else {
              layer.msg(res.data.message);
            }
          })
          .catch(error => {
            layer.close(i);
            console.log(error);
          });
      });
    }
  },
};
</script>
<style scoped>
.wrap {
  min-height: 500px;
  /* background: #1a243b; */
  width: 97%;
  margin: 30px auto;
  padding: 30px;
}
.tab-header {
  margin-bottom: 30px;
  color: #c7cce6;
}
.tab-header span {
  padding-bottom: 10px;
  margin-right: 20px;
  cursor: pointer;
}
ul li {
  padding: 8px 0;
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
  border-bottom: 1px solid #2e333c;
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
  width: 500px;
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
.btns button {
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
</style>



// WEBPACK FOOTER //
// src/view/lever/leverList.vue