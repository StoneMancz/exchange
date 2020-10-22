<template>
    <div class="exchange">
		<!-- <div class="title fColor1">交易所</div> -->
        <div class="content fColor1">
            <div class="new_price bdb">
                <!-- <span class="ft14">{{$t('market.newprice')}} {{newData || '0.000' | tofixedFour}}{{currency_name}}</span> -->
                <span class="ft14">{{$t('market.handicap')}}</span>
            </div>
            <div class="exchange_title ft12 clear tc">
                <span>{{$t('cuy.direction')}}</span>
                <span>{{$t('cuy.price')}}({{legal_name}})</span>
                <span>{{$t('td.num')}}({{currency_name}})</span>
    
            </div>
            <ul class="list-item ft12 tc scroll">
                <li class="curPer" v-for="(out,index) in outlist" @click="price(out[0])">
                    <span class="red">{{$t('cuy.sell')}} {{outlist.length-index}}</span>
                    <span>{{out[0] || '0.000' | tofixedEight}}</span>
                    <span>{{out[1] || '0.000' | tofixedFour}}</span>
                   
                </li>
                <div :class="loctheme=='white'?'border-tw':'border-tm'">
                <div class="flex alcenter line">
                  <span class="green ft14" v-if="change>0">{{newData || '0.000' | tofixedsix}}</span>
                  <span class="red ft14" v-else>{{newData || '0.000' | tofixedFour}}</span>                 
                  <span>≈ {{(newData* this.cny).toFixed(6)}} CNY</span>
                </div>
                </div>
                 <li class="curPer" v-for="(buy,index) in inlist" @click="price(buy[0])">
                    <span class="green">{{$t('cuy.buy')}} {{index+1}}</span>
                    <span>{{buy[0] || '0.000' | tofixedEight}}</span>
                    <span>{{buy[1] || '0.000' | tofixedFour}}</span>
                    
                </li>
            </ul>
            
        </div>
	</div>
</template>

<script>
export default {
  name: "exchange",
  data() {
    return {
      outlist: [],
      inlist: [],
      load: 1,
      newData: 0,
      loctheme:'',
      currency_name: "",
      legal_name: "",
      currency_id: "",
      legal_id: "",
      change: "",
      cny:1,
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
    tofixedsix: function(val) {
      val = Number(val);
      return val.toFixed(6);
    },
    tofixedEight: function(val) {
      val = Number(val);
      return val.toFixed(8);
    },
  },
  mounted: function() {
    var that = this;
    eventBus.$on("fiat_convert_cny", function(data) {
					// console.log(data);
					that.cny =data;
		})
  },
  created: function() {
    var local_lid = window.localStorage.getItem("l_id"),
    local_cid = window.localStorage.getItem("c_id");
    var that = this;
    this.legal_id = localStorage.getItem("dealLegalId");
    this.currency_id = localStorage.getItem("dealCurrencyId");
    this.legal_name = localStorage.getItem("dealLegalName");
    this.currency_name = localStorage.getItem("dealCurrencyName");
    that.buy_sell(this.legal_id, this.currency_id);
    that.connect(this.legal_id,this.currency_id);
    that.upPrice(that.legal_id, that.currency_id)
    
  },
  methods: {
    price(price) {
      eventBus.$emit("toPrice", price);
    },
    // 第一次默认最新价数据
    buy_sell(legals_id, currencys_id) {
      var that = this;
      // var index = layer.load();
      this.$ajax({
        url: "/api/" + "transaction/deal",
        method: "post",
        data: {
          legal_id: legals_id,
          currency_id: currencys_id
        },
        headers: { Authorization: localStorage.getItem("token") }
      })
        .then(res => {
          // layer.close(i);
          if (res.data.type == "ok") {
            // this.inlist = res.data.message.in;
            // this.outlist = res.data.message.out;
            that.newData = res.data.message.last_price;
            that.price(res.data.message.last_price);
            localStorage.setItem('dealPrice',that.newData);
            var inlist = res.data.message.in;
            var outlist = res.data.message.out;
            // console.log(inlist)
            var arr1 = [];
            var arr2 = [];
            var arr3 = [];
            var arr4 = [];
            for(var i=0;i<inlist.length;i++){
              arr1=[];
              arr1[0] = inlist[i].price;
              arr1[1] = inlist[i].number;
              arr2.push(arr1)
              
            }
            // console.log(arr2)
            for(var i in outlist){
              arr3=[];
              arr3[0] = outlist[i].price;
              arr3[1] = outlist[i].number;
              arr4.push(arr3)
            }
            that.inlist = arr2;
            that.outlist = arr4;
            // console.log(that.inlist)
            that.connect(
              legals_id,
              currencys_id
            );
          } else {
            // layer.msg(res.data.message)
          }
        })
        .catch(error => {
          // console.log(error)
        });
    },
    connect(legal_id, currency_id) {
      var that = this;
      that.$socket.emit("login", localStorage.getItem('user_id'));
      this.$socket.market_depth=(msg)=>{
        if (msg.type == "market_depth") {
          //组件间传值
          var newPrice = {
            newprice: msg.last_price,
            newup: msg.proportion,
            istoken: msg.token,
            yesprice: msg.yesterday,
            toprice: msg.today
          };
          eventBus.$emit("toNew", newPrice);
          if(typeof(msg.bids)=='string'){
              var inData = JSON.parse(msg.bids);
              var outData = JSON.parse(msg.asks);
          }else{
            var inData = msg.bids;
            var outData = msg.asks;
          }
         
          // console.log(typeof(inData))
          // if (msg.token == that.currency_name + "/" + that.legal_name) {
          //   that.newData = msg.last_price;
          //   localStorage.setItem('dealPrice',that.newData);
          // }
          if (msg.legal_id == legal_id && msg.currency_id == currency_id) {
            // console.log(msg.legal_id,legal_id,msg.currency_id,currency_id)
            that.inlist = inData;
            that.outlist = outData;
            // for(let i in inData){
            //   that.inlist[i].price = inData[i][0];
            //   that.inlist[i].number = inData[i][1];
            // }
            // for(let i in outData){
            //   that.outlist[i].price = outData[i][0];
            //   that.outlist[i].number = outData[i][1];
            // }
          }
        }
      }
    },
     // 更新最新价
    upPrice(legal_id, currency_id) {
      var that = this;
      that.$socket.emit("login", localStorage.getItem("user_id"));
      this.$options.sockets.kline=(msg)=>{
        if (msg.type == "kline") {
          if (msg.currency_id == currency_id && msg.legal_id == legal_id) {
            that.newData = msg.close;
            window.localStorage.setItem('dealPrice',that.newData);
          }
        }
      }
      this.$options.sockets.daymarket=(msg)=>{
        if(that.currency_name ==msg.currency_name && that.legal_name == msg.legal_name){	
          that.change = msg.change
          console.log(that.change)					 
        }
      }
    },
  }
};
</script>

<style scoped>
.border-tw{
    padding: 10px 0;
    margin: 10px 0;
}
.border-tm{
    /* border-top: 1px solid #3c3e43;
    border-bottom: 1px solid #3c3e43; */
    padding: 10px 0;
    margin: 10px 0;
}
.exchange{
  height: 100%;
}
.title {
  height: 48px;
  line-height: 48px;
  padding: 0 10px 0 30px;
  background-color: #1a243b;
}
.content {
  height: 100%;
}
.new_price {
  height: 40px;
  line-height: 40px;
  /* border-bottom: 1px solid #303b4b; */
  padding: 0px 20px;
}
.exchange_title {
  line-height: 25px;
  position: relative;
  color: #637085;
}
.list-item li {
  line-height: 25px;
  overflow-y: auto;
  overflow-x: hidden;
}
.list-item{
  height: 520px;
  overflow: auto;
}
.list-item li span,
.exchange_title span {
  width: 33.3%;
  display: block;
  float: left;
}
.green {
  color: #12b886;
}
.red {
  color: #cc4951;
}
.list-item li:hover {
  background: rgba(46,55,83,.4);
}
.line {
  padding: 0 30px;
  color: #b0b8db;
}
</style>



// WEBPACK FOOTER //
// src/view/exchange.vue