<template>
  <div class="trade">
    <div class="title_box">
      <div class="tabtitle fColor1 ft16curPer">
        <!-- <span :class="{active:show == true}">限价交易</span> -->
        <!-- <span :class="{active:show == false}" @click="changeType">市价交易</span> -->
        <span :class="[{'active':selectedStatus == 1}]" @click="selectTypes(1)">{{$t('lever.std')}}</span>
        <span :class="[{'active':selectedStatus == 0}]" @click="selectTypes(0)">{{$t('lever.xtd')}}</span>
        <span style="float:right" @click="$router.push({path:'/transferLever'})">{{$t('asset.transfer')}}</span>
      </div>
    </div>
    <!-- 限价交易 -->
    <div class="content clear" v-if="show">
      <div class="available clear fColor1 first" v-if="address.length<=0">
        <span class="baseColor curPer" @click="goNext('login')">{{$t('lg.login')}}</span>
        {{$t('lever.or')}}
        <span class="baseColor curPer" @click="goNext('register')">{{$t('lg.register')}}</span>
        {{$t('lever.gotrade')}}
      </div>
      <div class="clear available padds" v-else>
        <span class="fl fColor1">{{$t('lever.canuse')}}{{user_legal | tofixedFour}} {{legal_name}}</span>
      </div>
      
      <!-- <div class="control-price first">
        <span :class="[{'active':selectedStatus == 1}]" @click="selectTypes(1)">市价交易</span>
        <span :class="[{'active':selectedStatus == 0}]" @click="selectTypes(0)">限价交易</span>
      </div> -->
      <div class="w50 fl first">
        <div class="ft14">
          <div class="mt40 input-item clear">
            <div class="mb10" v-if="selectedStatus == 0">
              <label>{{$t('cuy.price')}}：</label>
              <input
                class="bg-part bd input_color"
                type="number"
                v-model="inputPrice"
                :placeholder='$t("lever.pprice")'
                @input="changePrice('buy')"
              >
            </div>
            <label>{{$t("lever.times")}}：</label>
            <select class="buy_multiple bg-part bd input_color" v-model="buyInfo.buy_selected" @change="selectMuit('buy')">
              <option disabled value>{{$t("lever.ptimes")}}</option>
              <option
                v-for="(item,index) in multiple"
                :key="index"
                :value="item.value"
              >{{item.value}}{{$t("lever.times")}}</option>
            </select>
          </div>
          <div class="shareNum" v-if="shareNum">1{{$t("lever.hand")}}{{$t("lever.equal")}}{{shareNum}}{{currency_name}}</div>
          <div class="mt15 input-item clear">
            <label>{{$t("lever.hands")}}：</label>
            <div class="flex share-total">
              <input
                type="number"
                class="share-input bg-part bd input_color"
                v-model="buySahre"
                :placeholder='$t("lever.phand")'
                @input="changeValue('buy')"
              >
              <b
                v-for="item in shareList"
                :key="item.value"
                :class="['share whites bd',{'active':type ==item.value}]"
                @click="select(item.value,'buy')"
              >{{item.value}}{{$t("lever.hand")}}</b>
            </div>
          </div>
          <!-- <div class="mt15 input-item clear">
            <div class="mb10">
              <label>{{$t("lever.pwd")}}：</label>
              <input
                class="bg-part bd input_color"
                type="password"
                v-model="buyInfo.pwd"
                :placeholder='$t("lever.ppwd")'
              >
            </div>
          </div> -->
          <div class="lever-total fColor1">
            <p class="clearfix mt15">
              <span class="fl">{{$t("lever.contractVal")}}</span>
              <span class="market-value fr">≈ {{totalPriceBuy || '0.0000'}} {{legal_name}}</span>
            </p>
            <p class="clearfix mt10">
              <span class="fl">{{$t("lever.bail")}}</span>
              <span class="bond fr">≈ {{bonsBuy || '0.0000'}} {{legal_name}}</span>
            </p>
            <p class="clearfix mt10">
              <span class="fl">{{$t("lever.charge")}}</span>
              <span class="transaction-fee fr">≈ {{trandeFreeBuy || '0.0000'}} {{legal_name}}</span>
            </p>
          </div>
          <div
            class="sell_btn curPer mt40 tc greenBack white ft16"
            @click="buyCoin"
          >{{$t("lever.domore")}} {{currency_name}}</div>
        </div>
      </div>
      <div class="w50 fl second">
        <div class="ft14">
          <div class="available clear fColor1" v-if="address.length<=0">
            <span class="baseColor curPer" @click="goNext('login')">{{$t('lg.login')}}</span>
            {{$t('lever.or')}}
            <span class="baseColor curPer" @click="goNext('register')">{{$t('lg.register')}}</span>
            {{$t('lever.gotrade')}}
          </div>
          <div class="mt40 input-item clear">
            <div class="mb10" v-if="selectedStatus == 0">
              <label>{{$t('cuy.price')}}：</label>
              <input
                class="bg-part bd input_color"
                type="number"
                v-model="sellInputValue"
                :placeholder='$t("lever.pprice")'
                @input="changePrice('sell')"
              >
            </div>
            <label>{{$t("lever.times")}}：</label>
            <select
              class="sell_multiple bg-part bd input_color"
              v-model="sellInfo.sell_selected"
              @change="selectMuit('sell')"
            >
              <option disabled value>{{$t("lever.ptimes")}}</option>
              <option
                v-for="(item,index) in multiple"
                :key="index"
                :value="item.value"
              >{{item.value}}{{$t("lever.times")}}</option>
            </select>
          </div>
          <div class="shareNum" v-if="shareNum">1{{$t("lever.hand")}}{{$t("lever.equal")}}{{shareNum}}{{currency_name}}</div>
          <div class="mt15 input-item clear">
            <label>{{$t("lever.hands")}}：</label>
            <div class="flex share-total">
              <input
                type="number"
                class="share-input bg-part bd input_color"
                v-model="sellShare"
                :placeholder='$t("lever.phandsell")'
                @input="changeValue('sell')"
              >
              <b
                v-for="item in shareList"
                :key="item.value"
                :class="['share whites bd',{'actives':types == item.value}]"
                @click="select(item.value,'sell')"
              >{{item.value}}{{$t("lever.hand")}}</b>
            </div>

            <!-- <b :class="['share',{'actives':types =='3'}]" @click="select(3,'sell')">3手</b>
            <b :class="['share',{'actives':types =='5'}]" @click="select(5,'sell')">5手</b>
            <b :class="['share',{'actives':types =='10'}]" @click="select(10,'sell')">10手</b>-->
          </div>
          <!-- <div class="mt15 input-item clear">
            <div class="mb10">
              <label>{{$t("lever.pwd")}}：</label>
              <input
                class="bg-part bd input_color"
                type="password"
                v-model="sellInfo.pwd"
                :placeholder='$t("lever.ppwd")'
              >
            </div>
          </div> -->
          <div class="lever-total fColor1">
            <p class="clearfix mt15">
              <span class="fl">{{$t("lever.contractVal")}}</span>
              <span class="market-value fr">≈ {{totalPrice || '0.0000'}} {{legal_name}}</span>
            </p>
            <p class="clearfix mt10">
              <span class="fl">{{$t("lever.bail")}}</span>
              <span class="bond fr">≈ {{bons || '0.0000'}} {{legal_name}}</span>
            </p>
            <p class="clearfix mt10">
              <span class="fl">{{$t("lever.charge")}}</span>
              <span class="transaction-fee fr">≈ {{trandeFree || '0.0000'}} {{legal_name}}</span>
            </p>
          </div>
          <div
            class="sell_btn curPer mt40 tc redBack white ft16"
            @click="selClick"
          >{{$t("lever.doshort")}}{{currency_name}}</div>
        </div>
      </div>
    </div>
    <!-- 市价交易 -->
    <div class="content clear" v-if="showNone">
      <div class="w50 fl first">
        <div class="ft14">
          <div class="available clear fColor1" v-if="address.length<=0">
            <span class="baseColor curPer" @click="goNext('login')">登录</span>
            或
            <span class="baseColor curPer" @click="goNext('register')">注册</span>
            开始交易
          </div>
          <div class="clear available" v-else>
            <span class="fl fColor1">可用 {{user_currency}} {{currency_name}}</span>
            <!-- <span class="fr baseColor curPer" @click="goNext('account')">充币</span> -->
          </div>
          <div class="mt40 input-item clear">
            <label>买入价</label>
            <input type="number" value="以市场最低价买入" @keydown.69.prevent disabled>
            <span>{{currency_name}}</span>
          </div>
          <div class="mt40 input-item clear">
            <label>买入量</label>
            <input type="number" @keydown.69.prevent @keyup="numFilter($event)">
            <span>{{legal_name}}</span>
          </div>
          <div class="sell_btn curPer mt40 tc greenBack white ft16">买入（做多）{{currency_name}}</div>
        </div>
      </div>
      <div class="w50 fl second">
        <div class="ft14">
          <div class="available bdb clear fColor1" v-if="address.length<=0">
            <span class="baseColor curPer" @click="goNext('login')">登录</span>
            或
            <span class="baseColor curPer" @click="goNext('register')">注册</span>
            开始交易
          </div>
          <div class="clear available bdb" v-else>
            <span class="fl fColor1">可用 {{user_legal}} {{legal_name}}</span>
            <!-- <span class="fr baseColor curPer" @click="goNext('account')">充币</span> -->
          </div>
          <div class="mt40 input-item clear">
            <label>卖出价</label>
            <input type="number" value="以市场最优价格卖出" @keydown.69.prevent disabled>
            <span>{{currency_name}}</span>
          </div>
          <div class="mt40 input-item clear">
            <label>卖出量</label>
            <input type="number" @keydown.69.prevent @keyup="numFilter($event)">
            <span>{{legal_name}}</span>
          </div>
          <div class="sell_btn curPer mt40 tc redBack white ft16">卖出（做空）{{currency_name}}</div>
        </div>
      </div>
    </div>
    <!-- 买入卖出弹窗 -->
    <div class="comfirm-modal flex" v-show="comfirmShow">
      <div class="comfirm-modal-content">
        <div class="loss-modal-header">
          <h3>{{$t('lever.sureOd')}}</h3>
          <p @click="closeMosal()">X</p>
        </div>
        <ul>
          <li class="flex">
            <p>{{currency_name}}/{{legal_name}}</p>
          </li>
          <li class="flex">
            <p>{{$t('lever.type')}}：</p>
            <p>{{buyType == '1' ? $t('lever.dmore') : $t('lever.dshort')}}</p>
          </li>
          <li class="flex">
            <p>{{$t('lever.hands')}}：</p>
            <p>{{buyType == '1' ? buySahre : sellShare}}</p>
          </li>
          <li class="flex">
            <p>{{$t('lever.timed')}}：</p>
            <p>{{buyType == '1' ? buyInfo.buy_selected : sellInfo.sell_selected}}</p>
          </li>
          <li class="flex">
            <p>{{$t('lever.bail')}}：</p>
            <p>{{buyType == '1' ? bonsBuy : bons}}{{legal_name}}</p>
          </li>
          <li class="flex">
            <p>{{$t('lever.rate')}}：</p>
            <p>{{buyType == '1' ? trandeFreeBuy : trandeFree}}{{legal_name}}</p>
          </li>
        </ul>
        <div class="modal-btn">
          <button type="button" @click="closeMosal()">{{$t('td.canceil')}}</button>
          <button type="button" @click="comfirm()">{{$t('td.confirm')}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "trade",
  data() {
    return {
      currency_name: "",
      currency_id: "",
      legal_name: "",
      legal_id: "",
      multiple: "",
      user_currency: "",
      user_legal: "",
      show: true,
      showNone: false,
      allBalance: 0,
      buyInfo: { buy_selected: "", buyNum: 0,pwd:'', url: "lever/submit" },
      sellInfo: { sell_selected: "", sellNum: 0,pwd:'', url: "lever/submit" },
      type: "",
      types: "",
      shares: 0,
      bons: "",
      totalPrice: "",
      trandeFree: "",
      bonsBuy: "",
      totalPriceBuy: "",
      trandeFreeBuy: "",
      lastPrice: "",
      buyType: "",
      comfirmShow: false,
      shareList: [],
      buySahre: "",
      sellShare: "",
      inputPrice: "",
      selectType: "",
      selectedStatus: 1,
      sellInputValue: "",
      minShare:1,
      maxShare:0,
      shareNum:'',
      password:''
    };
  },
  created() {
    this.address = localStorage.getItem("token") || "";
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
  mounted() {
    var that = this;
    that.address = localStorage.getItem("token") || "";
    that.legal_id = localStorage.getItem("legal_id");
    that.currency_id = localStorage.getItem("currency_id");
    that.legal_name = localStorage.getItem("legal_name");
    that.currency_name = localStorage.getItem("currency_name");
    that.buy_sell(that.legal_id, that.currency_id);
    eventBus.$on("toPrice", function(data) {
      console.log(data);
      if (data) {
        that.inputPrice=data;
        that.sellInputValue=data;
        that.changePrice('sell');
        that.changePrice('buy');
      }
    });
    eventBus.$on("tocel", function(datas) {
      if (datas) {
        if(that.legal_id){
          that.buy_sell(that.legal_id, that.currency_id);
        }
      }
    });
  },
  methods: {
    numFilter(ev) {
      //48-57 96-105 108
      // console.log(ev.keyCode)
    },
    changeType() {
      this.show = !this.show;
    },
    goNext(url) {
      this.$router.push({ name: url });
    },

    buyCoin() {
      var that = this;
      if (that.buyInfo.buy_selected == "") {
        layer.msg(that.$t('lever.ptimes'));
        return;
      }
      if (that.selectedStatus == 0) {
        if (that.inputPrice == "") {
          layer.msg(that.$t('lever.pprice'));
          return;
        }
      }
      if(that.buySahre < that.minShare){
        layer.msg(that.$t('lever.noless') + that.minShare);
          return;
      }
      if(that.buySahre > that.maxShare){
        layer.msg(that.$t('lever.nomore') + that.maxShare);
          return;
      }
      // if (that.buyInfo.pwd == "") {
      //   layer.msg(that.$t('lever.pwd'));
      //   return;
      // }
      that.comfirmShow = true;
      that.buyType = 1;
    },
    selClick() {
      var that = this;
      if (this.sellInfo.sell_selected == "") {
        layer.msg(that.$t('lever.ptimes'));
        return;
      }
      if (that.selectedStatus == 0) {
        if (that.sellInputValue == "") {
          layer.msg(that.$t('lever.pprice'));
          return;
        }
      }
      if(that.sellShare < that.minShare){
        layer.msg(that.$t('lever.noless') + that.minShare);
          return;
      }
      if(that.sellShare > that.maxShare){
        layer.msg(that.$t('lever.nomore') + that.maxShare);
          return;
      }
      // if (that.sellInfo.pwd == "") {
      //   layer.msg(that.$t('lever.pwd'));
      //   return;
      // }
      that.comfirmShow = true;
      that.buyType = 2;
    },
    //买入、卖出记录
    buy_sell(legals_id, currencys_id) {
      this.$ajax({
        url: "/api/" + "lever/deal",
        method: "post",
        data: {
          legal_id: legals_id,
          currency_id: currencys_id
        },
        headers: { Authorization: localStorage.getItem("token") }
      })
        .then(res => {
          if (res.data.type == "ok") {
            this.multiple = res.data.message.multiple.muit;
            this.user_currency = res.data.message.all_levers;
            this.user_legal = res.data.message.user_lever;
            this.lastPrice = res.data.message.last_price;
            this.shareList = res.data.message.multiple.share;
            this.minShare = res.data.message.lever_share_limit.min;
            this.maxShare = res.data.message.lever_share_limit.max;
            this.buyInfo.buyPrice = 0;
            this.buyInfo.buyNum = 0;
            this.type = this.shareList[0].value;
            this.types = this.shareList[0].value;
            this.sellShare = this.types;
            this.buySahre = this.type;
          } else {
            // layer.msg(res.data.message)
          }
        })
        .catch(error => {
          // console.log(error)
        });
    },
    // 选择手数
    select(options, values) {
      let that = this;
      that.shares = options;
      if (values == "buy") {
        that.type = options;
        that.buySahre = options;
      } else {
        that.types = options;
        that.sellShare = options;
      }
      if (that.selectedStatus != 0) {
        if (values == "sell" && that.sellInfo.sell_selected != "") {
          // 价格
          var bond = parseFloat(localStorage.getItem("lastPrice")).toFixed(4);
          // 倍数
          var muitNum = parseFloat(that.sellInfo.sell_selected).toFixed(4);
          // 手数
          var share = parseFloat(options).toFixed(4);
          that.pricesType(bond, values, share, muitNum);
        } else if (values == "buy" && that.buyInfo.buy_selected != "") {
          // 价格
          var bond = parseFloat(localStorage.getItem("lastPrice")).toFixed(4);
          // 倍数
          var muitNum = parseFloat(that.buyInfo.buy_selected).toFixed(4);
          // 手数
          var share = parseFloat(options).toFixed(4);
          that.pricesType(bond, values, share, muitNum);
        } else {
          that.totalPriceBuy = 0.0;
          that.trandeFreeBuy = 0.0;
          that.bonsBuy = 0.0;
        }
      } else {
        if (values == "sell" && that.sellInfo.sell_selected != "") {
          if (that.sellInputValue != "") {
            // 价格
            var bond = parseFloat(that.sellInputValue).toFixed(4);
            // 倍数
            var muitNum = parseFloat(that.sellInfo.sell_selected).toFixed(4);
            // 手数
            var share = parseFloat(options).toFixed(4);
            that.pricesType(bond, values, share, muitNum);
          }
        } else if (values == "buy" && that.buyInfo.buy_selected != "") {
          if (that.inputPrice != "") {
            // 价格
            var bond = parseFloat(that.inputPrice).toFixed(4);
            // 倍数
            var muitNum = parseFloat(that.buyInfo.buy_selected).toFixed(4);
            // 手数
            var share = parseFloat(options).toFixed(4);
            that.pricesType(bond, values, share, muitNum);
          }
        } else {
          that.totalPriceBuy = 0.0;
          that.trandeFreeBuy = 0.0;
          that.bonsBuy = 0.0;
        }
      }
    },
    pricesType(bond, type, share, muitNum) {
      let that = this;
      var i = layer.load();
      this.$ajax({
        url: "/api/" + "currency/quotation_new",
        method: "get",
        data: {},
        headers: { Authorization: localStorage.getItem("token") }
      })
        .then(res => {
          if (res.data.type == "ok") {
            var datas=res.data.message;
            var list=[];
            for(var i in datas){
               if(that.legal_id==datas[i].id){
                list = res.data.message[i].quotation;    
               }
            }
            for (let i in list) {
              if (that.currency_id == list[i].currency_id) {
                var spread = parseFloat(list[i].spread).toFixed(4);
                var transactionFee = parseFloat(list[i].lever_trade_fee).toFixed(4);
                var prices = parseFloat((parseFloat(bond * 1) * spread) / 100).toFixed(4);
                var pricesTotal = 0;
                if (type == "sell") {
                  pricesTotal = parseFloat(parseFloat(bond * 1) - (prices - 0)).toFixed(4);
                } else {
                  pricesTotal = parseFloat(parseFloat(bond * 1) + (prices - 0)).toFixed(4);
                }
                muitNum = parseFloat(muitNum).toFixed(4);
                share = parseFloat(share).toFixed(4);
                var shareNum = parseFloat(list[i].lever_share_num).toFixed(4);
                that.shareNum = shareNum;
                var totalPrice = parseFloat(
                  pricesTotal * share * shareNum
                ).toFixed(4);
                var bondsValue = parseFloat(
                  (totalPrice - 0) / (muitNum - 0)
                ).toFixed(4);
                var tradeFreeValue = parseFloat(
                  (totalPrice * transactionFee) / 100
                ).toFixed(4);
                if (type == "buy") {
                  that.totalPriceBuy = (bond * share * shareNum).toFixed(4);
                  that.trandeFreeBuy = tradeFreeValue;
                  that.bonsBuy = bondsValue;
                } else {
                  that.totalPrice = (bond * share * shareNum).toFixed(4);
                  that.trandeFree = tradeFreeValue;
                  that.bons = bondsValue;
                }
              }
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
      setTimeout(function() {
        layer.close(i);
      }, 1500);
    },
    // 选择倍数
    selectMuit(type) {
      let that = this;
      if (that.selectedStatus != 0) {
        if (type == "sell" && that.sellShare != "") {
          // 价格
          var bond = parseFloat(localStorage.getItem("lastPrice")).toFixed(4);
          // 倍数
          var muitNum = parseFloat(that.sellInfo.sell_selected).toFixed(4);
          // 手数
          var share = parseFloat(that.sellShare).toFixed(4);
          that.pricesType(bond, type, share, muitNum);
        } else if (type == "buy" && that.buySahre != "") {
          // 价格
          var bond = parseFloat(localStorage.getItem("lastPrice")).toFixed(4);
          // 倍数
          var muitNum = parseFloat(that.buyInfo.buy_selected).toFixed(4);
          // 手数
          var share = parseFloat(that.buySahre).toFixed(4);
          that.pricesType(bond, type, share, muitNum);
        } else {
          that.totalPriceBuy = 0.0;
          that.trandeFreeBuy = 0.0;
          that.bonsBuy = 0.0;
        }
      } else {
        if (type == "sell" && that.sellShare != "") {
          if (that.sellInputValue != "") {
            // 价格
            var bond = parseFloat(that.sellInputValue).toFixed(4);
            // 倍数
            var muitNum = parseFloat(that.sellInfo.sell_selected).toFixed(4);
            // 手数
            var share = parseFloat(that.sellShare).toFixed(4);
            that.pricesType(bond, type, share, muitNum);
          }
        } else if (type == "buy" && that.sellShare != "") {
          if (that.inputPrice != "") {
            // 价格
            var bond = parseFloat(that.inputPrice).toFixed(4);
            // 倍数
            var muitNum = parseFloat(that.buyInfo.buy_selected).toFixed(4);
            // 手数
            var share = parseFloat(that.buySahre).toFixed(4);
            that.pricesType(bond, type, share, muitNum);
          }
        } else {
          that.totalPriceBuy = 0.0;
          that.trandeFreeBuy = 0.0;
          that.bonsBuy = 0.0;
        }
      }
    },

    // 手数输入
    changeValue(type) {
      let that = this;
      let textValue = /^[1-9]*[0-9][0-9]*$/;
      that.totalPriceBuy = 0.0000;
      that.trandeFreeBuy = 0.0000;
      that.bonsBuy = 0.0000;
      that.totalPrice = 0.0000;
      that.trandeFree = 0.0000;
      that.bons = 0.0000;
      if(type == 'sell'){
        that.types = '-1';
        if(that.sellShare != ''){
          if(!textValue.test(that.sellShare)){
            layer.msg("请输入整数");
            return;
          }else if(that.sellShare < that.minShare){
            layer.msg('输入的值不能低于' + that.minShare);
            return;
          }else{
            if(that.maxShare > 0){
              if(that.sellShare > that.maxShare){
                layer.msg('输入的值不能高于' + that.maxShare);
                return;
              }
            }
          }
        }else{
           return;
        }
      }else{
        that.type = '-1';
        if(that.buySahre != ''){
          if(!textValue.test(that.buySahre)){
            layer.msg("请输入整数");
            return;
          }else if(that.buySahre < that.minShare){
            layer.msg('输入的值不能低于' + that.minShare);
            return;
          }else{
            if(that.maxShare > 0){
              if(that.buySahre > that.maxShare){
                layer.msg('输入的值不能高于' + that.maxShare);
                return;
              }
            }
          }
        }else{
           return;
        }
      }
      if (that.selectedStatus != 0) {
        if (type == "sell" && that.sellInfo.sell_selected != "") {
          that.types = '';
          // 价格
          var bond = parseFloat(localStorage.getItem("lastPrice")).toFixed(4);
          // 倍数
          var muitNum = parseFloat(that.sellInfo.sell_selected).toFixed(4);
          // 手数
          var share = parseFloat(that.sellShare).toFixed(4);
          that.pricesType(bond, type, share, muitNum);
        } else if (type == "buy" && that.buyInfo.buy_selected != "") {
           that.type = '';
          // 价格
          var bond = parseFloat(localStorage.getItem("lastPrice")).toFixed(4);
          // 倍数
          var muitNum = parseFloat(that.buyInfo.buy_selected).toFixed(4);
          // 手数
          var share = parseFloat(that.buySahre).toFixed(4);
          that.pricesType(bond, type, share, muitNum);
        } else {
          that.totalPriceBuy = 0.0000;
          that.trandeFreeBuy = 0.0000;
          that.bonsBuy = 0.0000;
          that.totalPrice = 0.0000;
          that.trandeFree = 0.0000;
          that.bons = 0.0000;
        }
      } else {
        if (type == "sell" && that.sellInfo.sell_selected != "") {
           that.types = '';
          if (that.sellInputValue != "") {
            // 价格
            var bond = parseFloat(that.sellInputValue).toFixed(4);
            // 倍数
            var muitNum = parseFloat(that.sellInfo.sell_selected).toFixed(4);
            // 手数
            var share = parseFloat(that.sellShare).toFixed(4);
            that.pricesType(bond, type, share, muitNum);
          }
        } else if (type == "buy" && that.buyInfo.buy_selected != "") {
           that.type = '';
          if (that.inputPrice != "") {
            // 价格
            var bond = parseFloat(that.inputPrice).toFixed(4);
            // 倍数
            var muitNum = parseFloat(that.buyInfo.buy_selected).toFixed(4);
            // 手数
            var share = parseFloat(that.buySahre).toFixed(4);
            that.pricesType(bond, type, share, muitNum);
          }
        } else {
          that.totalPriceBuy = 0.0000;
          that.trandeFreeBuy = 0.0000;
          that.bonsBuy = 0.0000;
          that.totalPrice = 0.0000;
          that.trandeFree = 0.0000;
          that.bons = 0.0000;
        }
      }
    },
    // 关闭买入卖出弹窗
    closeMosal() {
      let that = this;
      that.comfirmShow = false;
    },
    // 下单确认
    comfirm() {
      let that = this;
      let data;
      if (that.buyType == 2) {
        if(that.legal_id != '' && that.currency_id != ''){
          data = {
            legal_id: that.legal_id,
            currency_id: that.currency_id,
            multiple: that.sellInfo.sell_selected,
            password:that.sellInfo.pwd,
            share: that.sellShare,
            type: 2,
            status:that.selectedStatus,
            target_price:that.sellInputValue,

          };
        }else{
          layer.msg('该交易对已下架，请重新切换交易对');
        }
        
      } else {
        if(that.legal_id != '' && that.currency_id != ''){
          data = {
            legal_id: that.legal_id,
            currency_id: that.currency_id,
            multiple: that.buyInfo.buy_selected,
            password:that.buyInfo.pwd,
            share: that.buySahre,
            type: 1,
            status:that.selectedStatus,
            target_price:that.inputPrice,
          };
        }else{
          layer.msg('该交易对已下架，请重新切换交易对');
        }
        
      }
      var i = layer.load();
      this.$ajax({
        url: "/api/" + that.sellInfo.url,
        method: "post",
        data: data,
        headers: { Authorization: localStorage.getItem("token") }
      })
        .then(res => {
          that.comfirmShow=false;
          layer.close(i);
          // layer.msg(res.data.message)
          if (res.data.type == "ok") {
            if (that.buyType == 2) {
              that.sellInfo.sellPrice = 0;
              that.sellInfo.sellNum = 0;
            } else {
              that.buyInfo.buyPrice = 0;
              that.buyInfo.buyNum = 0;
            }

            eventBus.$emit("buyTrade", "tradebuy");
            eventBus.$emit("tocel", "updata");
            eventBus.$emit("to_leverExchange", "leverExchange");
            // that.buy_sell(that.legal_id,that.currency_id)
            layer.msg(res.data.message);
            setTimeout(function() {
              if(that.selectedStatus == 1){
                that.$router.push({ name: "leverTransactions" });
              }else{
                that.$router.push({ name: "leverList" });
              }
              
            }, 500);
          } else {
            layer.msg(res.data.message);
            that.comfirmShow = false;
          }
        })
        .catch(error => {
          console.log(error);
          that.comfirmShow = false;
        });
    },
    // 选择交易类型
    selectTypes(types) {
      let that = this;
      that.selectedStatus = types;
      that.totalPriceBuy = 0.0000;
      that.trandeFreeBuy = 0.0000;
      that.bonsBuy = 0.0000;
      that.totalPrice = 0.0000;
      that.trandeFree = 0.0000;
      that.bons = 0.0000;
      that.buyInfo.buy_selected = '';
      that.sellInfo.sell_selected = '';
      that.inputPrice = '';
      that.sellInputValue = '';
    },
    // 手动输入价格
    changePrice(type) {
      let that = this;
      if (that.selectedStatus == 0) {
        if (type == "buy" && that.buyInfo.buy_selected != "") {
          if (that.inputPrice != "") {
            // 价格
            var bond = parseFloat(that.inputPrice).toFixed(4);
            // 倍数
            var muitNum = parseFloat(that.buyInfo.buy_selected).toFixed(4);
            // 手数
            var share = parseFloat(that.buySahre).toFixed(4);
            that.pricesType(bond, type, share, muitNum);
          }else{
            that.totalPriceBuy = 0.0000;
            that.trandeFreeBuy = 0.0000;
            that.bonsBuy = 0.0000;
          }
        } else if (type == "sell" && that.sellInfo.sell_selected != "") {
          if (that.sellInputValue != "") {
            // 价格
            var bond = parseFloat(that.sellInputValue).toFixed(4);
            // 倍数
            var muitNum = parseFloat(that.sellInfo.sell_selected).toFixed(4);
            // 手数
            var share = parseFloat(that.sellShare).toFixed(4);
            that.pricesType(bond, type, share, muitNum);
          }else{
            that.totalPrice = 0.0000;
            that.trandeFree = 0.0000;
            that.bons = 0.0000;
          }
        } else {
          that.totalPrice = 0.0000;
          that.trandeFree = 0.0000;
          that.bons = 0.0000;
          that.totalPriceBuy = 0.0000;
          that.trandeFreeBuy = 0.0000;
          that.bonsBuy = 0.0000;
        }
      }
    }
  },
  computed: {
    buyTotal() {
      return this.buyInfo.buy_selected * this.buyInfo.buyNum || 0;
    },
    sellTotal() {
      return this.sellInfo.sell_selected * this.sellInfo.sellNum || 0;
    }
  }
};
</script>

<style scoped>
.shareNum{
  color: #637085;
  position: relative;
  top: 15px;
}
.mb10 input {
  margin-bottom: 15px;
}
.padds {
  margin: 0 15px 0 25px;
  padding: 0 10px;
}
.share-total {
  flex-wrap: wrap;
}
.control-price {
  margin: 20px 0 0;
  color: #fff;
}
.control-price span {
  margin-right: 15px;
  padding-bottom: 10px;
  cursor: pointer;
}
.control-price .active {
  border-bottom: 1px solid #7a98f7;
}
.control-price div {
  margin-top: 30px;
}
.control-price input {
  width: 60%;
  line-height: 30px;
  padding: 5px 10px;
  border: 1px solid #2e3753;
  background-color: rgba(0, 0, 0, 0);
  color: #fff;
}
.title_box {
  height: 48px;
  line-height: 48px;
  padding: 0 30px;
  background-color: #1a243b;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
.tabtitle span {
  cursor: pointer;
  height: 48px;
  display: inline-block;
}
.tabtitle span:not(:last-child) {
  margin-right: 40px;
}
.content .first {
  padding: 0 15px 0 25px;
}
.content .second {
  padding: 0 25px 0 15px;
}
.available {
  height: 48px;
  /* border-bottom: 1px solid #303b4b; */
  line-height: 48px;
}
.input-item {
  position: relative;
  line-height: 40px;
}
.input-item label {
  width: 20%;
  float: left;
  font-size: 14px;
  color: #637085;
}
.input-item input {
  width: 80%;
  float: left;
  border: 1px solid #2e3753;
  border-radius: 3px;
  height: 38px;
  text-indent: 15px;
  font-size: 16px;
  color: #cdd6e4;
  background-color: #1a243b;
  line-height: 38px;
}
.input-item span {
  position: absolute;
  right: 15px;
  color: #637085;
  font-size: 16px;
}
.input-item select {
  width: 80%;
  background: #1a243b;
  color: #cdd6e4;
  border: 1px solid #2e3753;
  border-radius: 3px;
  height: 40px;
  text-indent: 10px;
  font-size: 16px;
}
.attion {
  height: 20px;
  line-height: 30px;
  font-size: 12px;
}
.sell_btn {
  width: 100%;
  height: 40px;
  border-radius: 3px;
  /* color: #cdd6e4; */
  line-height: 40px;
}
.greenBack {
  background-color: #12b886;
}
.redBack {
  background-color: #cc4951;
}
input:disabled {
  color: #627085;
  cursor: not-allowed;
}
.share {
  display: inline-block;
  font-weight: normal;
  /* border: 1px solid #2e3753; */
  border-radius: 2px;
  font-size: 14px;
  /* color: #fff; */
  line-height: 1.2;
  width: 23.5%;
  text-align: center;
  padding: 5px 0;
  margin-right: 3.14px;
}
b.active {
  background-color: #02c289;
  border: 1px solid #02c289;
  color: #fff!important;
}
b.actives {
  background-color: #de5959;
  border: 1px solid #de5959;
  color: #fff!important;
}
.comfirm-modal {
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
.comfirm-modal-content {
  width: 500px;
  background-color: #1a243b;
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
.comfirm-modal-content li {
  line-height: 40px;
  margin: 0 20px;
}
.modal-btn {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  font-size: 0;
  padding-top: 30px;
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
.input-item .share-input {
  border: 1px solid #2e3753;
  border-radius: 2px;
  font-size: 14px;
  color: #fff;
  line-height: 26px;
  width: 100%;
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0);
  height: auto;
  float: none;
  text-indent: 0;
  margin-bottom: 10px;
}
</style>




// WEBPACK FOOTER //
// src/view/lever/lever_trade.vue