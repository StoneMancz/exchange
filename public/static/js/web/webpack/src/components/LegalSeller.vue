<template>
  <div id="legal-seller" class="white">
    <div class="top flex bgf8">
      <div class="top-t flex bod_rc">
        <div class="logo ft18" v-if="info.name">{{info.name || '' | strFirst}}</div>
        <div>
          <div>{{info.name}}</div>
          <div>{{$t('fat.register_time')}}：{{info.create_time}}</div>
        </div>
      </div>
      <div class="top-b flex">
        <div>
          <div>{{info.total}}</div>
          <div>{{$t('fat.odtotal')}}</div>
        </div>
        <div>
          <div>{{info.thirtyDays}}</div>
          <div>{{$t('fat.odmonth')}}</div>
        </div>
        <div>
          <div>{{info.done}}</div>
          <div>{{$t('fat.odfinish')}}</div>
        </div>
        <div>
          <div>{{rate}}</div>
          <div>{{$t('fat.odrate')}}</div>
        </div>
      </div>
    </div>
    <div class="md flex bgf8">
      <!-- <div>
        <span>邮箱认证</span>
        <img v-if="info.prove_email == 1" src="../assets/images/success.png" alt="">
        <img v-else src="../assets/images/icon_error.png" alt="">
      </div> -->
      <div>
        <span>{{$t('fat.phone')}}</span>
        <img v-if="info.prove_mobile == 1" src="../assets/images/success.png" alt="">
        <img v-else src="../assets/images/icon_error.png" alt="">
      </div>
      <div>
        <span>{{$t('fat.realAuth')}}</span>
        <img v-if="info.prove_real == 1" src="../assets/images/success.png" alt="">
        <img v-else src="../assets/images/icon_error.png" alt="">
      </div>
      <div>
        <span>{{$t('fat.advAuth')}}</span>
        <img v-if="info.prove_level == 1" src="../assets/images/success.png" alt="">
        <img v-else src="../assets/images/icon_error.png" alt="">
      </div>
    </div>
    <div class="list bgf8">
      <div class="tab">
        <span  :class="{'now':showWhich == 'sell'}" @click="showWhich = showWhich == 'sell'?'none':'sell'">{{$t('td.sell')}}</span>
        <span :class="{'now':showWhich == 'buy'}" @click="showWhich = showWhich == 'buy'?'none':'buy'">{{$t('td.buy')}}</span>
      </div>
      <div class="ul-head flex">
        <div>{{$t('td.currency')}}</div>
        <div>{{$t('td.num')}}</div>
        <div>{{$t('td.limit')}}</div>
        <div>{{$t('td.price')}}</div>
        <div>{{$t('td.method')}}</div>
        <div>{{$t('td.do')}}</div>
      </div>
      <ul :class="[showWhich+'-box']">
        <li v-for="(item,index) in info.lists.data" :key="index" :class="[item.type == 'buy'?'buy-item':'sell-item']" class="bod_bc" v-if="item.is_shelves == 1">
          <div>{{item.currency_name}}</div>
          <div>{{item.surplus_number | toFixeds}}</div>
          <div>{{item.limitation.min | toFixeds}}{{item.coin_code}}-{{item.limitation.max | toFixeds}}{{item.coin_code}}</div>
          <div>{{item.price | toFixeds}}{{item.coin_code}}</div>
          <div>{{item.way_name}}</div>
          <div>
            <span v-if="item.type == 'buy'" @click="setDetail(item)">{{$t('td.sell')}}</span>
            <span v-else @click="setDetail(item)">{{$t('td.buy')}}</span>
          </div>
        </li>
      </ul>
      <div class="more" @click="getSellerInfo(true)">{{$t('td.more')}}</div>
    </div>
    <div class="buy-sell-box" v-if="showDetail">
      <div class="content">
        <div class="close">
          <span class="fr" @click="close">X</span>
        </div>
        <div class="tc">
          <span>{{detail.type == 'buy'?$t('td.sell'):$t('td.buy')}}</span><span>{{detail.currency_name}}</span>
        </div>
        <div class="flex">
          <span>{{$t('td.price')}}：</span><span>{{detail.price | toFixeds}}</span>
        </div>
        <div class="flex">
          <span>{{$t('td.num')}}：</span><span>{{detail.surplus_number | toFixeds}}</span>
        </div>
        <div class="tab">
          <span :class="{'selected':detail.which == 'money'}" @click="detail.which = 'money',detail.money = '',totalPrice = '0.000'">{{coin}}{{$t('td.trade')}}</span>
          <span :class="{'selected':detail.which == 'number'}" @click="detail.which = 'number', detail.money = '',totalPrice = '0.000'">{{detail.type == 'buy'?$t('td.sellout'):$t('td.buyin')}}{{$t('td.num')}}</span>
        </div>
        <div class="inp" v-if="detail.which == 'money'">
          <input type="number" v-if="detail.type == 'buy'" :placeholder="$t('td.selltotal')" v-model="detail.money">
          <input type="number" v-else :placeholder="$t('td.buytotal')" v-model="detail.money">
          <span>{{detail.coin_code}}</span>
          <!-- <span class="all" @click="detail.money = detail.limitation.max">全部{{detail.type == 'buy'?'卖出':'买入'}}</span> -->
          <span class="all" @click="allData('money')">{{$t('td.all')}}{{detail.type == 'buy'?$t('td.sellout'):$t('td.buyin')}}</span>
          
        </div>
        <div class="inp" v-if="detail.which == 'number'">
          <input type="number" v-if="detail.type == 'buy'" :placeholder="$t('td.sellallnum')" v-model="detail.num">
          <input type="number" v-else :placeholder="$t('td.buyallnum')" v-model="detail.num">
          <span>{{detail.currency_name}}</span>
          <!-- <span class="all" @click="detail.num = detail.surplus_number">全部{{detail.type == 'buy'?'卖出':'买入'}}</span> -->
          <span class="all" @click="allData('num')">{{$t('td.all')}}{{detail.type == 'buy'?$t('td.sellout'):$t('td.buyin')}}</span>
        </div>
        <div class="flex mt10">
          <span style="width:auto">{{$t('td.limit')}}：</span><span>{{detail.limitation.min | toFixeds}} {{coin}}-{{detail.limitation.max | toFixeds}} {{coin}}</span>
        </div>
        <div v-if="detail.which == 'money'">
            <span>{{$t('td.tradeTotal')}}：</span>
            <span>{{detail.money || '0.000' | toFixeds}} {{detail.coin_code}}</span>
        </div>
        <div v-if="detail.which == 'number'">
            <span>{{$t('td.tradeTotal')}}：</span>
            <span>{{detail.num * detail.price || '0.000' | toFixeds}} {{detail.coin_code}}</span>
        </div>
        <div class="tip">{{$t('fat.tipPay')}}</div>
        <div class="btns flex">
          <div class="cancel" @click="cancel">
            <span ref="remainTime">{{times}}</span><span>{{$t('td.doceil')}}</span></div>
            <div class="ok" @click="buySell('buy')" v-if="detail.type == 'sell'">{{$t('td.place')}}</div>
            <div class="ok" @click="buySell('sell')" v-if="detail.type == 'buy'">{{$t('td.place')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: "",
      page: 1,
      sellerId: '',
      info: { lists: { data: [] } },
      showWhich: "none",
      showDetail: false,
      detail: { money: "", num: "" },
      timer: "",
      times:60,
      userBalance:'',
      allType:'',
      totalPrice:'0.000',
      rate:'--',
      password:'',
      coin:'CNY'
    };
  },
  filters: {
    toFixeds: function(value) {
      value = Number(value);
      return value.toFixed(3);
    },
    strFirst:function(value){
      return value.substr(0, 1)
    },
  },
  
  created() {
    this.token = window.localStorage.getItem("token") || "";
    if (this.token) {
      this.sellerId = this.$route.query.sellerId;
      this.getSellerInfo();
    }
  },
  methods: {
    close(){
      this.showDetail=false;
      clearInterval(this.timer);
    },
    getSellerInfo(more) {
      this.showWhich = "none";
      if (!more) {
        this.page = 1;
      }
      let i = layer.load();
      this.$http({
        url: "/api/seller_info",
        params: {
          id: this.sellerId,
          page: this.page
        },
        headers: { Authorization: this.token }
      }).then(res => {
        layer.close(i);
        if (res.data.type == "ok") {
          var oldlist = this.info.lists.data;
          var newlist = res.data.message.lists.data;
          this.page += 1;
          
          if (more) {
            if (newlist.length) {
              this.info.lists.data = newlist.concat(oldlist);
            } else {
              layer.msg(this.$t('td.nomore'));
            }
          } else {
            this.info = Object.assign({}, res.data.message);
            var result=(res.data.message.done/res.data.message.total*100).toFixed(2);
            this.rate=(result=='NaN'?'0.00':result+'%');
          }
        }
      });
    },
    setDetail(item) {
      this.detail = Object.assign({ which: "money", money: "", num: "" }, item);
      this.showDetail = true;
      var time = 60;
      var that = this;
      that.coin=item.coin_code;
      this.$http({
        url: "/api/legal_deal_info",
        params: {
          id: item.id,
        },
        headers: { Authorization: that.token }
      }).then(res => {
        if (res.data.type == "ok") {
          that.userBalance = res.data.message.user_legal_balance;
          that.allType =res.data.message.type; 
        }
      });
      that.timer = setInterval(function() {
        time--;
        that.times = time;
        // that.$refs.remainTime.innerHTML = time;
        if (time == 0) {
          that.showDetail = false;
          clearInterval(that.timer);
        }
      }, 1000);
    },
    buySell() {
      let that = this;
      var value = "";
      if (that.detail.which == "money") {
        value = that.detail.money;
        if (value == "") {
          return;
        } else if ((value -0 - that.detail.limitation.min)<0) {
          layer.msg(that.$t('fat.notlow'));
          return;
        } else if ((value -0 - that.detail.limitation.max) > 0) {
          layer.msg(that.$t('fat.nothigh'));
          return;
        }
      } else {
        value = that.detail.num;
        if(value == ''){
          return;
        } else if(value>that.detail.surplus_number){
          layer.msg(that.$t('fat.notnum'));return;
        }
      }
      that.showDetail=false;
      layer.prompt({title: that.$t('td.pwd'), formType: 1,btn:[that.$t('td.confirm'), that.$t('td.canceil')]}, function(pass, index){
        that.password=pass;
        var i=layer.load();
        that.$http({
          url: "/api/do_legal_deal",
          method: "post",
          data: { means: that.detail.which, value: value, id: that.detail.id ,password:that.password},
          headers:{Authorization:that.token}
        }).then(res => {
          that.showDetail = false;
          layer.close(i);
          if(res.data.type == 'ok'){
            var msg = res.data.message;
            layer.msg(msg.msg)
            if(that.detail.type == 'sell'){
              setTimeout(function(){
                // that.$router.push({path:'/legalPay',query:{id:msg.data.id}})
                location.reload();
              },500)
            } else {
              setTimeout(function(){
                // that.$router.push({path:'/components/payCannel',query:{id:msg.data.id}})
                location.reload();
              },500)
            }
          }else{
            layer.msg(res.data.message)
          }
        })
        layer.close(index);
			});
    },
    cancel() {
      clearInterval(this.timer);
      this.showDetail = false;
    },
    // 全部
    allData(options){
      let that = this;
      if(that.allType == 'buy'){
        if(options == 'money'){
          that.detail.money = ((that.userBalance - 0) * (that.detail.price - 0) - 0).toFixed(3);
          that.totalPrice = that.detail.money;
        }else{
          that.detail.num = (that.userBalance - 0).toFixed(3);
          that.totalPrice = ((that.userBalance - 0) * (that.detail.price - 0) - 0).toFixed(3);
        }
      }else{
        if(options == 'money'){
          that.detail.money = (that.detail.limitation.max - 0).toFixed(3);
          that.totalPrice = that.detail.money;
        }else{
          that.detail.num = (that.detail.surplus_number - 0).toFixed(3);
          that.totalPrice = ((that.detail.surplus_number - 0) * (that.detail.price - 0) - 0).toFixed(3);
        }
      }
    }
  }
};
</script>

<style lang='scss'>
.layui-layer{
  background:#171c2b;
}
.layui-layer-title {
  border-bottom: 1px solid #2e3753;
  color: #fff;
  background-color: #171c2b;
}
.layui-layer-prompt .layui-layer-input {
  border: 1px solid #555869;
  color: #fff;
  background: none;
}
#legal-seller {
  margin: 30px auto 0;
  width: 1200px;
  // background: #f8f8f8;
  line-height: 30px;
  > .top {
    // background: #f8f8f8;
    line-height: 36px;
    padding: 16px 30px;
    > .top-t {
      align-items: center;
      padding-right: 30px;
      // border-right: 1px solid #ccc;
      margin-right: 30px;
      > .logo {
        margin-right: 20px;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        line-height: 50px;
        background: #7a98f7;
        text-align: center;
      }
    }
    > .top-b {
      > div {
        width: 100px;
        text-align: center;
      }
    }
  }
  > .md {
    // background: #f8f8f8;
    padding: 16px 30px;
    > div {
      margin-right: 50px;
      img {
        width: 16px;
        height: 16px;
        position: relative;
        top: 3px;
      }
    }
  }
  > .list {
    // background: #f8f8f8;
    margin-top: 20px;
    padding: 16px 30px;
    > .tab {
      margin: 16px 0;
      span {
        margin-right: 20px;
        cursor: pointer;
      }
      > .now {
        color: #7a98f7;
        font-weight: 600;
      }
    }
    > .ul-head {
      justify-content: space-between;
      > div {
        flex: 1;
        text-align: center;
      }
      > div:nth-child(3) {
        flex: 2;
      }
      > div:first-child {
        text-align: left;
      }
      > div:last-child {
        text-align: right;
      }
    }
    > ul {
      li {
        display: flex;
        justify-content: space-between;
        padding: 16px 0;
        // border-bottom: 1px solid #ddd;
        > div {
          flex: 1;
          text-align: center;
        }

        > div:nth-child(3) {
          flex: 2;
        }
        > div:first-child {
          text-align: left;
        }
        > div:last-child {
          // text-align: right;
          // display: flex;
          height: 30px;
          span {
            float: right;
            background: #7a98f7;
            padding: 0 16px;
            border-radius: 2px;
            color: #fff;
            cursor: pointer;
          }
        }
      }
    }
    > .buy-box > .sell-item,
    .sell-box > .buy-item {
      display: none;
    }
    .more {
      padding: 0 20px;
      text-align: center;
      cursor: pointer;
    }
  }
  > .buy-sell-box {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 100;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      overflow: hidden;
    > .content {
      position: relative;
      border-radius: 2px;
      width: 440px;
      padding: 20px 30px 26px 30px;
      background: #171c2b;
      line-height: 30px;
      .close{
        height: 25px;
        line-height: 25px;
        cursor: pointer;
        position: absolute;
        top: 5px;
        right: 10px;
      }
      > div:first-child {
        font-weight: 600;
      }
      > .flex {
        // display: flex;
        span:first-child {
          width: 80px;
        }
      }
      > .tab {
        margin: 5px 0 20px;
        span {
          margin-right: 20px;
        }
        cursor: pointer;
        > .selected {
          color: #638bd4;
          padding: 5px 0;
          border-bottom: 1px solid #638bd4
        }
      }
      > .inp {
        display: flex;
        border-radius: 2px;
        justify-content: space-between;
        border: 1px solid #555869;
        padding: 3px 16px;
        input{
          background: transparent;
          color: #fff;
        }
        span {
          padding-left: 10px;
          margin-left: 10px;
        }
        .all {
          border-left: 1px solid #555869;
          cursor: pointer;
        }
      }
      > .tip {
        font-size: 12px;
        margin-top: 10px 16px;
        color: #7a98f7;
      }
      > .btns {
        justify-content: space-between;

        > div {
          width: 46%;
          text-align: center;
          border-radius: 2px;
          line-height: 40px;
          cursor: pointer;
        }
        > .cancel {
          background: #ccc;
        }
        > .ok {
          background: #7a98f7;
          color: #fff;
        }
      }
    }
  }
}
</style>



// WEBPACK FOOTER //
// src/components/LegalSeller.vue