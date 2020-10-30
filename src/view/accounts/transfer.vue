<template>
  <div class>
    <div class="content fColor1">
      <div class="record" @click="link()">{{$t('asset.record')}}</div>
      <div class="flex selectedCurrency">
        <aside>{{$t('asset.currency')}}</aside>
        <p @click="openvalue3">{{value3}}</p>
        <div class="trade-select" v-if='value3bool'>
          <span  v-for="item in currencyList" @click="selectedCurrency(item.id,item.name)">{{item.name}}</span>
        </div>
      </div>
      <div class="flex">
        <p>{{$t('asset.from')}}</p>
        <div class="trade-view">
        <p class="trade" @click="tabvalue">{{value1}}</p>
        <div class="trade-select" v-if='valuebool'>
          <span  v-for="item in accountList" @click="selectOne(item.type)">{{item.texts}}</span>
        </div>
        </div>
        <p style="cursor: pointer;" @click="tabClick">{{$t('asset.to')}}</p>
        <p class="trade" @click="tabvalueTwo">{{value2}}</p>
        <div class="trade-view-two">
        <div class="trade-select" v-if='value2bool'>
          <span  v-for="item in accountList" @click="selectTwo(item.type)">{{item.texts}}</span>
        </div>
         </div>
      </div>

      <div class="num">
        <p>{{$t("asset.tfnum")}}</p>
        <input type="text" :placeholder="placeholderTxt" v-model="inputValue">
        <p>{{$t("asset.canbalance")}}：{{balances || '0.00' | toFixeds}}USDT</p>
      </div>
      <button type="button" class="comfirm-btn" @click="comfirm()">{{$t("asset.sureConfirm")}}</button>
    </div>
  </div>
</template>
<script>
import indexHeader from "@/view/indexHeader";
import left from "@/view/left";
export default {
  name: "transfer",
  filters: {
    toFixeds: function(value) {
      value = Number(value);
      return value.toFixed(2);
    }
  },
  data() {
    return {
      placeholderTxt:this.$t('asset.pNum'),
      currencyList:[],
      accountList:[],
      value1:'',
      value2:'',
      value3:'',
      name: "法币账户",
      leverName: "合约账户",
      totalMoney: "",
      leverMoney: "",
      tradeMoney: "",
      type: 2,
      token: localStorage.getItem("token"),
      inputValue: "",
      currencyId: "",
      valuebool:false,
      value2bool:false,
      value3bool:false,
      balances:0,
    };
  },
  components: {
    indexHeader,
    left
  },
  methods: {
    tabvalueTwo(){
      this.value2bool=!this.value3bool;
      this.value3bool=false;
      this.valuebool=false;
    },
    openvalue3(){
      this.value3bool=!this.value3bool;
      this.value2bool=false;
      this.valuebool=false;
    },
    selectTwo(command) {
      var that = this;
      if (command == 'lever') {
          that.value2 = that.$t('asset.lever_account');
          var j = 0;
          for (var i = 0; i < that.accountList.length; i++) {
              if (that.accountList[i].type != 'lever') {
                  j = i;
              }
          }
          if (that.value1 == that.$t('asset.lever_account')) {
              that.value1 = that.accountList[j].texts;
              var dataList = that.datas.micro_wallet.balance;
              for (var i = 0; i < that.currencyList.length; i++) {
                  if (that.currencyList[i].id == that.currency) {
                      if (that.accountList[j].type == 'micro') {
                          that.balances = that.currencyList[i].wallet.micro_balance;
                      } else if (that.accountList[j].type == 'match') {
                          that.balances = that.currencyList[i].wallet.change_balance;
                      } else if (that.accountList[j].type == 'legal') {
                          that.balances = that.currencyList[i].wallet.legal_balance;
                      }

                  }
              }
          }
      } else if (command == 'micro') {
          that.value2 = that.$t('asset.micro_account');
          var j = 0;
          for (var i = 0; i < that.accountList.length; i++) {
              if (that.accountList[i].type != 'micro') {
                  j = i;
              }
          }
          if (that.value1 ==that.$t('asset.micro_account')) {
              that.value1 = that.accountList[j].texts;
              for (var i = 0; i < that.currencyList.length; i++) {
                  if (that.currencyList[i].id == that.currency) {
                      if (that.accountList[j].type == 'lever') {
                          that.balances = that.currencyList[i].wallet.lever_balance;
                      } else if (that.accountList[j].type == 'match') {
                          that.balances = that.currencyList[i].wallet.change_balance;
                      } else if (that.accountList[j].type == 'legal') {
                          that.balances = that.currencyList[i].wallet.legal_balance;
                      }

                  }
              }
          }
      } else if (command == 'match') {
          that.value2 = that.$t('asset.currency_account');
          var j = 0;
          for (var i = 0; i < that.accountList.length; i++) {
              if (that.accountList[i].type != 'match') {
                  j = i;
              }
          }
          if (that.value1 ==that.$t('asset.currency_account')) {
              that.value1 = that.accountList[j].texts;
              var dataList = that.datas.micro_wallet.balance;
              for (var i = 0; i < that.currencyList.length; i++) {
                  if (that.currencyList[i].id == that.currency) {
                      if (that.accountList[j].type == 'lever') {
                          that.balances = that.currencyList[i].wallet.lever_balance;
                      } else if (that.accountList[j].type == 'micro') {
                          that.balances = that.currencyList[i].wallet.micro_balance;
                      } else if (that.accountList[j].type == 'legal') {
                          that.balances = that.currencyList[i].wallet.legal_balance;
                      }

                  }
              }
          }
      } else if (command == 'legal') {
          that.value2 = that.$t('asset.fince_account');
          var j = 0;
          for (var i = 0; i < that.accountList.length; i++) {
              if (that.accountList[i].type != 'legal') {
                  j = i;
              }
          }
          if (that.value1 ==that.$t('asset.fince_account')) {
              that.value1 = that.accountList[j].texts;
              for (var i = 0; i < that.currencyList.length; i++) {
                  if (that.currencyList[i].id == that.currency) {
                      if (that.accountList[j].type == 'lever') {
                          that.balances = that.currencyList[i].wallet.lever_balance;
                      } else if (that.accountList[j].type == 'match') {
                          that.balances = that.currencyList[i].wallet.change_balance;
                      } else if (that.accountList[j].type == 'micro') {
                          that.balances = that.currencyList[i].wallet.micro_balance;
                      }

                  }
              }
          }
      } 
      this.value2bool=false;
  },
   // 币种选择
  selectedCurrency(id,name) {
      var that = this;
      that.value3 = name;
      that.currency = id;
      var arr2 = [];
      
              
      for (var i = 0; i < that.currencyList.length; i++) {
          if (that.currencyList[i].id == that.currency) {
              if (that.currencyList[i].is_legal == 1) {
                  var obj = {
                      type: 'legal',
                      texts: that.$t('asset.fince_account')
                  }
                  arr2.push(obj);
              }
              
              if (that.currencyList[i].is_micro == 1) {
                  var obj = {
                      type: 'micro',
                      texts:that.$t('asset.micro_account')
                  }
                  arr2.push(obj);
              }
              if (that.currencyList[i].is_lever == 1) {
                  var obj = {
                      type: 'lever',
                      texts: that.$t('asset.lever_account')
                  }
                  arr2.push(obj);
              }
              if (that.currencyList[i].is_match == 1) {
                  var obj = {
                      type: 'match',
                      texts:  that.$t('asset.currency_account')
                  }
                  arr2.push(obj);
              }
              
              that.accountList = arr2;
              that.value1 = that.accountList[0].texts;
              that.value2 = that.accountList[1].texts;
              if (that.accountList[0].type == 'lever') {
                  that.balances = that.currencyList[i].wallet.lever_balance;
              } else if (that.accountList[0].type == 'match') {
                  that.balances = that.currencyList[i].wallet.change_balance;
              } else if (that.accountList[0].type == 'micro') {
                  that.balances = that.currencyList[i].wallet.micro_balance;
              } else if (that.accountList[0].type == 'legal') {
                  that.balances = that.currencyList[i].wallet.legal_balance;
              }
          }
      }
      this.value3bool=false;
  },
    selectOne(command){
      var that = this;
      if (command == 'lever') {
          var j = 0;
          for (var i = 0; i < that.accountList.length; i++) {
              if (that.accountList[i].type != 'lever') {
                  j = i;
              }
          }
          that.value1 =that.$t('asset.lever_account');
          for (var i = 0; i < that.currencyList.length; i++) {
              if (that.currencyList[i].id == that.currency) {
                  that.balances = that.currencyList[i].wallet.lever_balance;
              }
          }
          if (that.value2 == that.$t('asset.lever_account')) {
              that.value2 = that.accountList[j].texts;
          }
      } else if (command == 'micro') {
          that.value1 = that.$t('asset.micro_account');
          var j = 0;
          for (var i = 0; i < that.accountList.length; i++) {
              if (that.accountList[i].type != 'micro') {
                  j = i;
              }
          }
          for (var i = 0; i < that.currencyList.length; i++) {
              if (that.currencyList[i].id == that.currency) {
                  that.balances = that.currencyList[i].wallet.micro_balance;
              }
          }
          if (that.value2 == that.$t('asset.micro_account')) {
              that.value2 = that.accountList[j].texts;
          }
      } else if (command == 'match') {
          that.value1 = that.$t('asset.currency_account');
          var j = 0;
          for (var i = 0; i < that.accountList.length; i++) {
              if (that.accountList[i].type != 'match') {
                  j = i;
              }
          }
          for (var i = 0; i < that.currencyList.length; i++) {
              if (that.currencyList[i].id == that.currency) {
                  that.balances = that.currencyList[i].wallet.change_balance;
              }
          }
          if (that.value2 == that.$t('asset.currency_account')) {
              that.value2 = that.accountList[j].texts;
          }
      } else if (command == 'legal') {
          that.value1 =that.$t('asset.fince_account');
          var j = 0;
          for (var i = 0; i < that.accountList.length; i++) {
              if (that.accountList[i].type != 'legal') {
                  j = i;
              }
          }
          for (var i = 0; i < that.currencyList.length; i++) {
              if (that.currencyList[i].id == that.currency) {
                  that.balances = that.currencyList[i].wallet.legal_balance;
              }
          }
          if (that.value2 == that.$t('asset.fince_account')) {
              that.value2 = that.accountList[j].texts;
          }
      } 
      this.valuebool=false;
    },
    tabvalue(){
      this.valuebool=!this.valuebool;
      this.value3bool=false;
      this.value2bool=false;
    },
    initData(){
      let that=this;
      
      this.$ajax({
        url: "/api/" + "currency/user_currency_list",
        method: "get",
        data: {},
        headers: { Authorization: that.token }
      })
        .then(res => {
          if (res.data.type == "ok") {
            var datas = res.data.message;
            if (datas.length > 0) {
                var arr = [];
                let zdusdt='';
                for (var i = 0; i < datas.length; i++) {
                    var nums = (datas[i].is_legal - 0) + (datas[i].is_lever - 0) + (
                        datas[i].is_match - 0) + (datas[i].is_micro - 0);
                    if (nums > 1) {
                      if(datas[i].id==3){
                        zdusdt=datas[i];
                      }else{
                          arr.push(datas[i]);
                      }
                    }
                }
                if(zdusdt){
                  arr.unshift(zdusdt);
                }
                that.value3 = arr[0].name;
                that.currency = arr[0].id;
                var arr2 = [];
                if (arr[0].is_legal == 1) {
                    var obj = {
                        type: 'legal',
                        texts: that.$t('asset.fince_account')
                    }
                    arr2.push(obj);
                }
                if (arr[0].is_micro == 1) {
                    var obj = {
                        type: 'micro',
                        texts: that.$t('asset.micro_account')
                    }
                    arr2.push(obj);
                }
                if (arr[0].is_lever == 1) {
                    var obj = {
                        type: 'lever',
                        texts: that.$t('asset.lever_account')
                    }
                    arr2.push(obj);
                }
                
                if (arr[0].is_match == 1) {
                    var obj = {
                        type: 'match',
                        texts: that.$t('asset.currency_account')
                    }
                    arr2.push(obj);
                }
                that.accountList = arr2;
                that.currencyList = arr;
                that.value1 = arr2[0].texts;
                that.value2 = arr2[1].texts;
                if(arr2[0].type == 'lever'){
                    that.balances = arr[0].wallet.lever_balance;
                }else if(arr2[0].type == 'micro'){
                    that.balances = arr[0].wallet.micro_balance;
                }else if(arr2[0].type == 'match'){
                    that.balances = arr[0].wallet.change_balance;
                }else if(arr2[0].type == 'legal'){
                    that.balances = arr[0].wallet.legal_balance;
                }
            }
          } else {
            return;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    init() {
      var that = this;
      this.$ajax({
        url: "/api/" + "wallet/list",
        method: "post",
        data: {},
        headers: { Authorization: that.token }
      })
        .then(res => {
          if (res.data.type == "ok") {
            let list = res.data.message.legal_wallet.balance;
            let lists = res.data.message.lever_wallet.balance;
            for (let i = 0; i < list.length; i++) {
              if (list[i].currency_name == "USDT") {
                that.tradeMoney = list[i].legal_balance;
                that.totalMoney = that.tradeMoney;
                that.currencyId = list[i].currency;
              }
            }
            for (let j = 0; j < lists.length; j++) {
              if (lists[j].currency_name == "USDT") {
                that.leverMoney = lists[j].lever_balance;
                that.currencyId = lists[j].currency;
              }
            }
          } else {
            return;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    tabClick() {
      // let that = this;
      // if (that.type == 1) {
      //   that.type = 2;
      //   that.name = "法币账户";
      //   that.leverName = "合约账户";
      //   that.totalMoney = that.tradeMoney;
      // } else {
      //   that.type = 1;
      //   that.name = "合约账户";
      //   that.leverName = "法币账户";
      //   that.totalMoney = that.leverMoney;
      // }
    },
    // 确认互转
    comfirm() {
      var that = this;
      if (that.inputValue == "") {
        layer.msg(that.$t('asset.record'));
        return false;
      }
      layer.confirm(that.$t('asset.confirmhuazhuan'), {skin:'confirmCancel'},function(index) {
        layer.close(index);
        var i = layer.load();
        let froms='';
        let tos='';
         if (that.value1 == that.$t('asset.lever_account')) {
              froms = 'lever'
          } else if (that.value1 == that.$t('asset.micro_account')) {
              froms = 'micro'
          } else if (that.value1 == that.$t('asset.currency_account')) {
              froms = 'change'
          } else if (that.value1 == that.$t('asset.fince_account')) {
              froms = 'legal'
          }
          if (that.value2 == that.$t('asset.lever_account')) {
              tos = 'lever'
          } else if (that.value2 == that.$t('asset.micro_account')) {
              tos = 'micro'
          } else if (that.value2 == that.$t('asset.currency_account')) {
              tos = 'change'
          } else if (that.value2 == that.$t('asset.fince_account')) {
              tos = 'legal'
          }
          var data={};
          data['currency_id']=that.currency,
          data['number']=that.inputValue,
          data['from_field']=froms,
          data['to_field']=tos,
        that.$ajax({
          url: "/api/" + "wallet/change",
          method: "post",
          data: data,
          headers: { Authorization: that.token }
        })
          .then(res => {
            if (res.data.type == "ok") {
              layer.close(i);
              layer.msg(res.data.message);
              setTimeout(function() {
                that.$router.push({ name: "transferRecord" });
              }, 500);
            } else {
              layer.msg(res.data.message);
              layer.close(i);
              return;
            }
          })
          .catch(error => {
            console.log(error);
          });
      });
    },
    link() {
      this.$router.push({ name: "transferRecord" });
    }
  },
  created() {
    this.token = localStorage.getItem("token") || "";
    // this.init();
    this.initData();
  },

  mounted() {
    var that = this;
  }
};
</script>
<style scoped lang="scss">
.selectedCurrency{
  margin-bottom: 10px;
  position: relative;
  width:300px
}
.selectedCurrency .trade-select{
  position: absolute;
  z-index: 9;
  top:30px;
  left: 42px;
     width: 100px;
    background: #fff;
    border: 0;
    color: #596a7a;
}
.selectedCurrency .trade-select span{
  cursor: pointer;
    display: block;
    padding: 7px 0;
    text-align: center;
     width: 100%;
    background: #fff;
    border: 0;
    color: #596a7a;
} 
.selectedCurrency p {
    width: 100px;
    line-height: 30px;
    border: 1px solid #4e5b85;
    text-align: center;
    border-radius: 4px;
    margin-left: 10px;
}
.trade-view,.trade-view-two{
  position: relative;
}
.trade-view-two .trade-select{
 position: absolute;
    width: 100px;
    background: #fff;
    border: 0;
    color: #596a7a;
    left: -120px;
    top: 38px;
}
.trade-view .trade-select{
  position: absolute;
     width: 100%;
    background: #fff;
    border: 0;
    color: #596a7a;
}
.trade-view .trade-select span,.trade-view-two .trade-select span{
  cursor: pointer;
    display: block;
    padding: 7px 0;
    text-align: center;
     width: 100%;
    background: #fff;
    border: 0;
    color: #596a7a;
}
.record {
  position: absolute;
  right: 0;
  top: 100px;
  cursor: pointer;
}
.content {
  width: 600px;
  padding-top: 100px;
  line-height: 30px;
  margin: 0 auto;
  position: relative;
}
.trade {
  width: 110px;
  line-height: 30px;
  border: 1px solid #4e5b85;
  text-align: center;
  border-radius: 4px;
  margin-right: 15px;
  margin-left: 15px;
}
.num {
  margin-top: 15px;
}
.num input {
  width: 450px;
  height: 40px;
  line-height: 40px;
  border: 1px solid #4e5b85;
  border-radius: 6px;
  background-color: rgba(0, 0, 0, 0);
  padding: 0 10px;
  color: #fff;
  margin-top: 15px;
  margin-bottom: 15px;
}
.comfirm-btn {
  width: 450px;
  line-height: 40px;
  border-radius: 6px;
  margin-top: 40px;
  background-color: #4e5b85;
  color: #fff;
  border: none;
  outline: none;
}
</style>





// WEBPACK FOOTER //
// src/view/accounts/transfer.vue