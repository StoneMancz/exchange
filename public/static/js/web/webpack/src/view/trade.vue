<template>
    <div class="trade">
        <div class="title_box">
            <div class="tabtitle fColor1 ft16curPer">
              <span :class="{active:show == false}" @click="changeType">{{$t('cuy.Mtrans')}}</span>
                <span :class="{active:show ==true }" @click="changeType">{{$t('cuy.fixPrice')}}</span>                
                <span style="position:absolute;right:30px"  @click="jumptransfer">{{$t('asset.transfer')}}</span>
            </div>
        </div>
        <!-- 市价交易 -->
        <div class="content clear" v-if="!show" >
            <div class="w50 fl first">
                <div class="ft14">
                   <div class="available clear fColor1" v-if="address.length<=0"><span class="baseColor curPer" @click="goNext('login')">{{$t('header.login')}}</span>
                    {{$t('cuy.or')}} <span class="baseColor curPer" @click="goNext('register')">{{$t('cuy.sign')}}</span>
                    {{$t('cuy.tdStart')}}
                    </div>
                    <div class="clear available" v-else>
                        <span class="fl fColor1">{{$t('cuy.available')}}  {{user_legal}} {{legal_name}}</span>
                    </div>
                    <div class="mt40 input-item clear">
                        <label>{{$t('cuy.buyPrice')}}</label>
                        <input type="text" class="bg-part bd input_color" v-model="newPrice" disabled @keydown.69.prevent  disabled>
                        <!-- <input type="text" class="bg-part bd input_color" v-model="txtbuy" disabled> -->
                        <span>{{legal_name}}</span>
                    </div>
                    <div class="mt40 input-item clear">
                        <label>{{$t('cuy.buynum')}}</label>
                        <input type="number" class="bg-part bd input_color" v-model="buyInfo.buyNum" @keydown.69.prevent  @keyup="numFilter($event)">
                        <span>{{currency_name}}</span>
                    </div>
                    <!-- <div class="input-item clear">
                        <label>{{$t('lever.pwd')}}</label>
                        <input type="password" class="bg-part bd input_color" v-model="buyInfo.pwd" :placeholder="$t('lever.ppwd')">
                    </div> -->
                    <div class="mt10 fColor1 ft16">{{$t('cuy.tdPrice')}}  {{buyTotal}} {{legal_name}}</div>
                    <div class="sell_btn curPer mt40 tc greenBack fColor1 ft16" @click="buyCoin">{{$t('td.buyin')}}{{currency_name}}</div>
                </div>
            </div>
            <div class="w50 fl second">
                <div class="ft14">
                   <div class="available clear fColor1" v-if="address.length<=0"><span class="baseColor curPer" @click="goNext('login')">{{$t('header.login')}}</span>
                    {{$t('cuy.or')}} <span class="baseColor curPer" @click="goNext('register')">{{$t('cuy.sign')}}</span>
                    {{$t('cuy.tdStart')}}
                    </div>
                    <div class="clear available" v-else>
                        <span class="fl fColor1">{{$t('cuy.available')}} {{user_currency}} {{currency_name}}</span>
                    </div>
                    <div class="mt40 input-item clear">
                        <label>{{$t('cuy.sellPrice')}}</label>
                        <input type="text" class="bg-part bd input_color" v-model="newPrice" @keydown.69.prevent disabled>
                        <!-- <input type="text" class="bg-part bd input_color" v-model="txtsell" disabled> -->
                        <span>{{legal_name}}</span>
                    </div>
                    <div class="mt40 input-item clear">
                        <label>{{$t('cuy.sellnum')}}</label>
                        <input type="number" class="bg-part bd input_color" v-model="sellInfo.sellNum" @keydown.69.prevent  @keyup="numFilter($event)">
                        <span>{{currency_name}}</span>
                    </div>
                    <!-- <div class="input-item clear">
                        <label>{{$t('lever.pwd')}}</label>
                        <input type="password" class="bg-part bd input_color" v-model="sellInfo.pwd" :placeholder="$t('lever.ppwd')">
                    </div> -->
                    <div class="mt10 fColor1 ft16">{{$t('cuy.tdPrice')}} {{sellTotal}} {{legal_name}}</div>
                    <div class="sell_btn curPer mt40 tc redBack fColor1 ft16" @click="selClick">{{$t('td.sellout')}}{{currency_name}}</div>
                </div>
            </div>
        </div>  
        <!-- 限价交易 -->
        <div class="content clear" v-if="show">
            <div class="w50 fl first">
                <div class="ft14">
                    <div class="available bdb clear fColor1" v-if="address.length<=0"><span class="baseColor curPer" @click="goNext('login')">{{$t('header.login')}}</span>
                    {{$t('cuy.or')}} <span class="baseColor curPer" @click="goNext('register')">{{$t('cuy.sign')}}</span>
                   {{$t('cuy.tdStart')}}
                    </div>
                    <div class="clear available bdb" v-else>
                        <span class="fl fColor1">{{$t('cuy.available')}} {{user_legal || '0.0000' | tofixedFour}} {{legal_name}}</span>
                        <!-- <span class="fr baseColor curPer" @click="goNext('account')">充币</span> -->
                    </div>
                    <div class="input-item clear">
                        <label>{{$t('cuy.buyPrice')}}</label>
                        <input type="number" class="bg-part bd input_color" v-model="buyInfo.buyPrice" @keydown.69.prevent >
                        <span>{{legal_name}}</span>
                        <!-- <div>≈ {{buyInfo.buyPrice*usprice}}CNY</div> -->
                    </div>
                    <div class="input-item clear">
                        <label>{{$t('cuy.buynum')}}</label>
                        <input type="number" class="bg-part bd input_color" v-model="buyInfo.buyNum" @keydown.69.prevent  @keyup="numFilter($event)">
                        <span>{{currency_name}}</span>
                    </div>
                    <!-- <div class="input-item clear">
                        <label>{{$t('lever.pwd')}}</label>
                        <input type="password" class="bg-part bd input_color" v-model="buyInfo.pwd" :placeholder="$t('lever.ppwd')">
                    </div> -->
                    <div class="slider-in">
                        <el-slider v-model="sliderIn" :disabled='address.length<=0 ||buyInfo.buyPrice == 0' :max='100'  :step="25" show-stops  @change="sliderChange('buy')"></el-slider>
                    </div>
                    <!--<div class="attion tr fColor1">范围 (0.00001,100,精度: 0.00001)</div> -->
                    <div class="mt10 fColor1 ft16">{{$t('cuy.tdPrice')}} {{buyTotal || '0.0000' | tofixedFour}} {{legal_name}}</div>
                    <div class="sell_btn curPer mt10 tc greenBack btnColor1 ft16" @click="buyCoin">{{$t('td.buyin')}}{{currency_name}}</div>
                </div>
            </div>
            <div class="w50 fl second">
                <div class="ft14">
                    <div class="available clear fColor1" v-if="address.length<=0"><span class="baseColor curPer" @click="goNext('login')">{{$t('header.login')}}</span>
                     {{$t('cuy.or')}}<span class="baseColor curPer" @click="goNext('register')">{{$t('cuy.sign')}}</span>
                     {{$t('cuy.tdStart')}}
                    </div>
                    <div class="clear available" v-else>
                        <span class="fl fColor1">{{$t('cuy.available')}} {{user_currency || '0.0000' | tofixedFour}} {{currency_name}}</span>
                        <!-- <span class="fr baseColor curPer" @click="goNext('account')">充币</span> -->
                    </div>
                    <div class="input-item clear">
                        <label>{{$t('cuy.sellPrice')}}</label>
                        <input type="number" class="bg-part bd input_color" @keydown.69.prevent v-model="sellInfo.sellPrice">
                        <span>{{legal_name}}</span>
                        <!-- <div>≈ {{sellInfo.sellPrice*usprice}}CNY</div> -->
                    </div>
                    <div class="input-item clear">
                        <label>{{$t('cuy.sellnum')}}</label>
                        <input type="number" class="bg-part bd input_color" @keydown.69.prevent  @keyup="numFilter($event)" v-model="sellInfo.sellNum">
                        <span>{{currency_name}}</span>
                    </div>
                    <!-- <div class="input-item clear">
                        <label>{{$t('lever.pwd')}}</label>
                        <input type="password" class="bg-part bd input_color" v-model="sellInfo.pwd" :placeholder="$t('lever.ppwd')">
                    </div> -->
                     <div class="slider-out">
                        <el-slider v-model="sliderOut" :disabled='address.length<=0 || sellInfo.sellPrice == 0' :max='100'  :step="25" show-stops  @change="sliderChange('sell')"></el-slider>
                    </div>
                    <!--<div class="attion tr fColor1">范围 (0.00001,100,精度: 0.00001)</div> -->
                    <div class="mt10 fColor1 ft16">{{$t('cuy.tdPrice')}} {{sellTotal || '0.0000' | tofixedFour}} {{legal_name}}</div>
                    <div class="sell_btn curPer mt10 tc redBack btnColor1 ft16" @click="selClick">{{$t('td.sellout')}}{{currency_name}}</div>
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
      legal_name: "",
      user_currency: "",
      user_legal: "",
      show: false,
      showNone: false,
      allBalance: 0,
      buyInfo: { buyPrice: 0, buyNum: 0,pwd:'', url: "coin/trade" },
      sellInfo: { sellPrice: 0, sellNum: 0,pwd:'', url: "coin/trade" },
      sliderIn: 0,
      sliderOut: 0,
      sliderss: true,
      newPrice:'',
      password:'',
      txtbuy:'以最优价格买入',
      txtsell:'以最优价格卖出'
    };
  },
  filters: {
    tofixed: function(val) {
      val = Number(val);
      return val.toFixed(2);
    },
    tofixedFour: function(val) {
      val = Number(val);
      return val.toFixed(4);
    },
  },
  created() {
    this.address = localStorage.getItem("token") || "";
    this.getNew();
  },
  mounted() {
    var that = this;
    that.address = localStorage.getItem("token") || "";
    this.legal_id = localStorage.getItem("dealLegalId");
    this.currency_id = localStorage.getItem("dealCurrencyId");
    this.legal_name = localStorage.getItem("dealLegalName");
    this.currency_name = localStorage.getItem("dealCurrencyName");
    that.buy_sell(that.legal_id, that.currency_id);
    eventBus.$on("toPrice", function(data) {
      console.log("我来看看");
      console.log(data);
      if (data) {
        that.buyInfo.buyPrice = data;
        that.sellInfo.sellPrice = data;
      }
    });
    if(that.adress){

      setInterval(function(){
          that.buy_sell(that.legal_id, that.currency_id,true)
      },10000)
    }
    // eventBus.$on('toTrade', function (data) {
    //     that.currency_id = data.currency_id,
    //     that.legal_id = data.legal_id;
    //     that.currency_name = data.currency_name;
    //     that.legal_name = data.leg_name;
    //     that.buy_sell(that.legal_id,that.currency_id)
    // });
    // eventBus.$on('toTrade0', function (data0) {
    //     that.currency_id = data0.currency_id,
    //     that.legal_id = data0.legal_id;
    //     that.currency_name = data0.currency_name;
    //     that.legal_name = data0.leg_name;
    //     that.buy_sell(that.legal_id,that.currency_id)
    // });
    eventBus.$on("tocel", function(datas) {
      // console.log(datas);
      if (datas) {
        if(that.legal_id){
          that.buy_sell(that.legal_id, that.currency_id);
        }
      }
    });
  },
  methods: {
    jumptransfer(){
      this.$router.push('/transfer')
    },
    getNew(){
      this.newPrice = localStorage.getItem('dealPrice');
      this.buyInfo.buyPrice = this.newPrice;
      this.sellInfo.sellPrice =this.newPrice;
    },
    sliderChange(type) {
      if (type == "buy") {
        if (this.user_legal != 0) {
          this.buyInfo.buyNum = (
            (this.user_legal * this.sliderIn) /
            this.buyInfo.buyPrice /
            100
          ).toFixed(4);
        }
      } else {
        if (this.user_currency != 0) {
          this.sellInfo.sellNum = (
            (this.user_currency * this.sliderOut) /100
          ).toFixed(4);
          
          
        }
      }
    },
    numFilter(ev) {
      //48-57 96-105 108
      // console.log(ev.keyCode)
    },
    changeType() {
      this.show = !this.show;
      this.getNew();
    },
    goNext(url) {
      this.$router.push({ name: url });
    },
    init() {
      this.$ajax({
        url: "/api/" + "transaction/deal",
        method: "post",
        data: {
          address: this.address
        }
      }).then(res => {
        // console.log(res)
        this.allBalance = res.data.message.user_cny;
        // console.log(this.allBalance)
      });
    },
    buyCoin() {
      var that = this;
      let price = ''
      if(this.show){
        if (!this.buyInfo.buyPrice || this.buyInfo.buyPrice <= 0) {
          layer.msg(this.$t('cuy.pbPrice'));
          return;
        }else{
          price = this.buyInfo.buyPrice
        }
      }else{
         price = this.newPrice
      }
      if (!this.buyInfo.buyNum || this.buyInfo.buyNum <= 0) {
        layer.msg(this.$t('cuy.pbNum'));
        return;
      }
      // if (!this.buyInfo.pwd || this.buyInfo.length <= 0){
      //   layer.msg(this.$t('lever.ppwd'));
      //   return;
      // }
      layer.confirm(this.$t('zdy.sftjmrj')+":"+price,{
        skin:"confirmCancel"
      },function(res,index){
        layer.closeAll();
        var i = layer.load();
        this.$ajax({
          url: "/api/" + that.buyInfo.url,
          method: "post",
          data: {
            legal_id: that.legal_id,
            currency_id: that.currency_id,
            target_price: price,
            type:1,
            amount: that.buyInfo.buyNum,
          },
          headers: { Authorization: localStorage.getItem("token") }
        })
          .then(res => {
            console.log(res, 222);
            layer.close(i);

            if (res.data.type == "ok") {
              layer.msg(that.$t('miscro.success'));
              that.buyInfo.buyPrice = 0;
              that.buyInfo.buyNum = 0;
              that.buyInfo.pwd='';
              // that.buy_sell(that.legal_id,that.currency_id)
              eventBus.$emit("buyTrade", "tradebuy");
              eventBus.$emit("tocel", "updata");
              console.log(res.data.message);
            } else if(res.data.type == "not"){
              layer.msg(res.data.message);
              setTimeout(() => {
                layer.msg(that.$t('set.yorn'), {
                  time: 0 //不自动关闭
                  ,btn: [that.$t('set.yes'),that.$t('set.no')]
                  ,yes: function(index){
                    layer.closeAll();
                    that.$router.push("/bindmpwd");
                  }
                }); 
              }, 1000);             
            }else{
              layer.msg(res.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      })
      
    },
    selClick() {
      console.log(localStorage.getItem("token"));
      var that = this;
      let price = '';
      if(that.show){
        if (!that.sellInfo.sellPrice || that.sellInfo.sellPrice <= 0) {
          layer.msg(this.$t('cuy.psPrice'));
          return;
        }else{
          price = that.sellInfo.sellPrice;
        }
      }else{
        price = that.newPrice;
      }
      if (!this.sellInfo.sellNum || this.sellInfo.sellNum <= 0) {
        layer.msg(this.$t('cuy.psNum'));
        return;
      }
      // if (!this.sellInfo.pwd || this.sellInfo.length <= 0){
      //   layer.msg(this.$t('lever.ppwd'));
      //   return;
      // }
       layer.confirm(this.$t('zdy.sftjmcj')+":"+price,{
        skin:"confirmCancel"
      },function(res,index){
          layer.closeAll();
          var i = layer.load();
      this.$ajax({
        url: "/api/" + that.sellInfo.url,
        method: "post",
        data: {
          legal_id: that.legal_id,
          currency_id: that.currency_id,
          target_price: price,
          amount: that.sellInfo.sellNum,
          type:2
        },
        headers: { Authorization: localStorage.getItem("token") }
      })
        .then(res => {
          console.log(res);
          
          layer.close(i);
          // layer.msg(res.data.message)
          if (res.data.type == "ok") {
            // this.sellInfo.sellPrice = 0;
            that.sellInfo.sellNum = 0;
            that.sellInfo.pwd='';
            eventBus.$emit("buyTrade", "tradebuy");
            eventBus.$emit("tocel", "updata");
            // that.buy_sell(that.legal_id,that.currency_id)
            layer.msg(that.$t('miscro.success'));
          }else{
            layer.msg(res.data.message);
          }
          // } else if(res.data.type == "error"){
          //   layer.msg(res.data.message);
          //   setTimeout(() => {
          //     layer.msg(that.$t('set.yorn'), {
          //       time: 0 //不自动关闭
          //       ,btn: [that.$t('set.yes'),that.$t('set.no')]
          //       ,yes: function(index){
          //         layer.closeAll();
          //         that.$router.push("/bindmpwd");
          //       }
          //     }); 
          //   }, 1000);
          // } else {
          //   layer.msg(res.data.message);
          // }
        })
        .catch(error => {
          console.log(error);
        });
      })
      
    },
    //买入、卖出记录
    buy_sell(legals_id, currencys_id, update) {
      this.$ajax({
        // url: "/api/" + "transaction/deal",
        url: "/api/" + "wallet/detail",
        method: "post",
        data: {
          currency: legals_id,
          type: 'change'
        },
        headers: { Authorization: localStorage.getItem("token") }
      })
        .then(res => {
          // console.log(res ,222)
          // layer.close(i);
          if (res.data.type == "ok") {
            this.user_legal = res.data.message.change_balance;
            if (update) {
            } else {
              // this.buyInfo.buyPrice = 0;
              // this.buyInfo.buyNum = 0;
            }
            // console.log(res.data)
          } else {
            layer.msg(res.data.message);
          }
        })
        .catch(error => {
          // console.log(error)
        });
        this.$ajax({
        // url: "/api/" + "transaction/deal",
        url: "/api/" + "wallet/detail",
        method: "post",
        data: {
          currency:  currencys_id,
          type: 'change'
        },
        headers: { Authorization: localStorage.getItem("token") }
      })
        .then(res => {
          // console.log(res ,222)
          // layer.close(i);
          if (res.data.type == "ok") {
            this.user_currency = res.data.message.change_balance;
            if (update) {
            } else {
              // this.buyInfo.buyPrice = 0;
              // this.buyInfo.buyNum = 0;
            }
            // console.log(res.data)
          } else {
            layer.msg(res.data.message);
          }
        })
        .catch(error => {
          // console.log(error)
        });
    }
  },
  computed: {
    buyTotal() {
      if(this.show){
        return this.buyInfo.buyPrice * this.buyInfo.buyNum || 0;
      }else{
        return this.newPrice * this.buyInfo.buyNum || 0;
      }
    },
    sellTotal() {
      if(this.show){
        return this.sellInfo.sellPrice * this.sellInfo.sellNum || 0;
      }else{
        return this.newPrice * this.sellInfo.sellNum || 0;
      }
      
    }
  }
};
</script>

<style scoped>
.title_box {
  padding: 12px 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
.tabtitle span {
  cursor: pointer;
  padding-bottom: 5px;
}
.tabtitle span:not(:last-child) {
  margin-right: 30px;
}
.content .first {
  padding: 0 0px 0 25px;
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
  line-height: 30px;
  margin-top: 15px;
}
.input-item div {
  color: #cdd6e4;
  text-align: center;
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
  /* border: 1px solid #2e3753; */
  border-radius: 3px;
  height: 38px;
  text-indent: 15px;
  font-size: 14px;
  /* color: #cdd6e4; */
  /* background-color: #1a243b; */
  line-height: 38px;
}
.input-item span {
  position: absolute;
  right: 15px;
  color: #637085;
  font-size: 16px;
  top: 4px
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
  color: #cdd6e4;
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
</style>




// WEBPACK FOOTER //
// src/view/trade.vue