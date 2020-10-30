<template>
  <!-- <div :class="[loctheme=='dark'?'trade balck':'trade whiteno']"> -->
    <div :class="[loctheme=='dark'?'trade balck':'trade']">
    <div class="trade-currency bg-part flex">
      <div class="balance">
        <div class="flex center">
          <img src="../../../static/imgs/money.png" alt>
          <p>{{$t('asset.miscroAccount')}}</p>
        </div>
        <ul>
          <li
            v-for="item in walletList"
            :key="item.id"
            v-show="item.is_micro == 1"
          >{{item.micro_balance}} {{item.currency_name}}</li>
        </ul>
      </div>
      <!-- <div class="insuranc">
        <div class="flex center">
          <img src="../../../static/imgs/money.png" alt>
          <p>{{$t('miscro.insuredAssets1')}}</p>
        </div>
        <div>
          <p class="mt10 tc">{{bmbBalance || '0.00' |toFixed1}}HAP</p>
          <div class="insuranc-list tc mt10">
            <span
            class="colorGrey"
            @click="insure1(item.id)"
            v-for="item in insurancType"
            :key="item.id"
            :class="[{'active':item.id == userInsurancId}]"
          >{{item.name}}</span>
          </div>
        </div>
      </div> -->
    </div>
    <div class="content">
      <div class="mt5">
        <div class="flex trade-bg bg-part">
          <img width="25" height="25" src="../../../static/imgs/success.png" alt>
          <p>{{$t('miscro.mode')}}</p>
        </div>
        <div class="curency-list flex">
          <span
          class="bg-part"
            :class="[{'active':currency_id == item.currency_id}]"
            v-for="item in datas"
            :key="item.id"
            @click="currencyTab(item)"
          >{{item.name}}</span>
        </div>
      </div>
      <div class="share mt10">
        <div class="flex trade-bg">
          <img width="25" height="25" src="../../../static/imgs/success.png" alt>
          <p>{{$t('miscro.num')}}</p>
        </div>
        <div class="share-rights">
          <div class="flex flex-wrap">
            <p
              v-for="(item,index) in numList"
              :key="index"
              class="bg-aprt"
              :class="[{'active':inputValue == (item.number -0).toFixed(0)}]"
              @click="selectNum(item.number)"
            >{{item.number || '0' | tofixedNum}}</p>
          </div>
          <input type="text" class="bg-part" :placeholder="$t('miscro.openNum')" v-model="inputValue">
        </div>
      </div>
      <div class="mult mt10">
        <div class="flex trade-bg">
          <img width="25" height="25" src="../../../static/imgs/success.png" alt>
          <p>{{$t('lever.openTime')}}</p>
        </div>

        <div class="flex flex-wrap mult-content">
          <p
            v-for="(item,index) in timeList"
            :key="index"
            class="bg-part"
            :class="[{'active':value4 == item.seconds}]"
            @click="selectTime(item.seconds,item.profit_ratio)"
          >{{item.seconds }}</p>
        </div>
      </div>

      <div class="lever-total mt20">
        <p  class="transfer flex between mt10" @click="jumptransfer">{{$t('asset.transfer')}}</p>
        <p class="flex between mt10">
          <span>{{$t('ctc.balance')}}</span>
          <span>{{balance || '0.00' }}{{tradeName}}</span>
        </p>
        <p class="flex between mt10">
          <span>{{$t('miscro.rate')}}</span>
          <span>{{profitRatio || '0.00' }}%</span>
        </p>
      </div>
    </div>
    <div>
      <div class="sell_btn greenBg" @click="transferSumbit(1)">{{$t('miscro.up')}}</div>
      <div class="sell_btn redBg" @click="transferSumbit(2)">{{$t('miscro.down')}}</div>
    </div>

    <!-- 买涨、买跌弹窗 -->
    <el-dialog title :visible.sync="modalShow" width="480px" top="20%" center>
      <div class="transfer-content">
        <!-- <h3>{{buyType==1?$t('miscro.up'):$t('miscro.down')}} {{tradeName}}</h3> -->
        <h3>{{buyType==1?$t('miscro.up'):$t('miscro.down')}} {{currencyName}}</h3>
        <div class="transfer-list mt10">
          <div class="loss-madal-content flex between">
            <div>
              <span>{{$t('td.num')}}</span>
              <span>{{inputValue || '0' | tofixedNum}} {{tradeName}}</span>
            </div>
            <div>
              <span>{{$t('td.time')}}</span>
              <span>{{value4 || '0' | tofixedNum}}S</span>
            </div>
            <div>
              <span>{{$t('miscro.rate')}}</span>
              <span>{{profitRatio || '0' | tofixedNum}}%</span>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button style="background: #66b1ff;color:white" type="primary" @click="comfirm()">{{$t('cuy.confirm')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "trade",
  props: {
    leverTradeId: {
      type: Number,
      required: true
    },
    currencyName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selectedStatus: 1,
      multNum: "",
      shareNum: "",
      buyType: 1,
      controlInput: "",
      obj: "",
      spread: localStorage.getItem("spread") || 0,
      token: localStorage.getItem("token"),
      dialogVisible: false,
      marketTotal: "",
      bonds: "",
      serviceCharge: "",
      value4: "",
      numList: [],
      timeList: [],
      currency_id: "",
      balance: "",
      inputValue: "",
      datas: {},
      profitRatio: "",
      seconds: "",
      tradeName: "",
      modalShow: false,
      walletList: [],
      skins: localStorage.getItem("skin") || "days",
      bmbBalance: "",
      insurancType: [],
      userInsurancId: "",
      hasxiadan:false,
      loctheme:'',
    };
  },
  created() {},
  filters: {
    tofixed: function(val) {
      val = Number(val);
      return val.toFixed(2);
    },
    tofixedFour: function(val) {
      val = Number(val);
      return val.toFixed(4);
    },
    tofixedNum: function(val) {
      val = Number(val);
      return val.toFixed(0);
    },
    toFixed1: function(val) {
      val = Number(val);
      return val.toFixed(1);
    }
  },
  mounted() {
    var that = this;
    that.getDeal();
    that.init();
  },
  watch: {
    switchtheme:{
      handler(val) {
        this.obj = val;
      },
      deep: true
    },
    leverTradeId: {
      immediate: true, // 这句重要
      handler(val) {
        this.obj = val;
      },
      deep: true
    },
  },
  computed: {
    switchtheme(){
      return this.$store.state.theme;
    },
    switchStatus: function() {
      console.log(this.obj);
      return this.obj; // 直接监听props里的status状态
    },
  },
  methods: {
    jumptransfer(){
      this.$router.push('/transfermicro');
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
            that.walletList = res.data.message.micro_wallet.balance;
          } else {
            return;
          }
        })
        .catch(error => {
          console.log(error);
        });
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
          that.datas = res.data.message;
          if (res.data.message.length > 0) {
            for (var i = 0; i < res.data.message.length; i++) {
              if (res.data.message[i].name == "HAP") {
                that.bmbBalance =
                  res.data.message[i].user_wallet.micro_balance;

                that.insurancType = res.data.message[i].insurance_types;
                if (res.data.message[i].user_insurance) {
                  that.userInsurancId =
                    res.data.message[i].user_insurance.insurance_type_id;
                }
              }
            }
            that.currency_id = res.data.message[0].id;
            that.numList = res.data.message[0].micro_numbers;
            if (res.data.message[0].user_wallet) {
              that.balance =
                res.data.message[0].user_wallet.micro_balance;
            }

            that.serviceCharge = res.data.message[0].micro_trade_fee;
            that.inputValue = (that.numList[0].number - 0).toFixed(0);
            that.tradeName = res.data.message[0].name;
          }
        }
      });
      this.$ajax({
        url: "/api/microtrade/seconds",
        method: "get",
        data: {},
        headers: { Authorization: that.token }
      }).then(res => {
        if (res.data.type == "ok") {
          that.timeList = res.data.message;
          that.profitRatio = res.data.message[0].profit_ratio;
          that.value4 = res.data.message[0].seconds;
        }
      });
    },
    // 选择是出售还是购买
    selectBuy() {
      var that = this;
      that.buyType = that.buyType == 1 ? "2" : "1";
      that.multNum = "";
      that.shareNum = "";
      that.marketTotal = 0.0;
      that.bonds = 0.0;
      that.serviceCharge = 0.0;
    },
    // 选择交易模式
    currencyTab(options) {
      var that = this;
      console.log(options);
      that.currency_id = options.id;
      that.numList = options.micro_numbers;
      if (options.user_wallet) {
        that.balance = options.user_wallet.micro_balance;
      }
      that.tradeName = options.name;
      that.serviceCharge = options.micro_trade_fee;
      that.inputValue = (that.numList[0].number - 0).toFixed(0);
    },

    // 选择开仓 数量
    selectNum(num) {
      var that = this;
      that.inputValue = (num - 0).toFixed(0);
    },

    // 选择开仓时间
    selectTime(num, rate) {
      var that = this;
      that.value4 = num;
      that.profitRatio = rate;
    },

    // 下单
    transferSumbit(types) {
      
      var that = this;
     
      that.buyType = types;
      if (!that.inputValue) {
        layer.msg(that.$t("miscro.openNum"));
        return false;
      }
      that.modalShow = true;
    },
    // 下单
    comfirm() {
      var that = this;
      console.log(that.hasxiadan);
      if(that.hasxiadan) return false;
      that.hasxiadan=true;
      var i = layer.load();
      this.$ajax({
        url: "/api/microtrade/submit",
        method: "post",
        data: {
          match_id: that.obj,
          currency_id: that.currency_id,
          type: that.buyType,
          seconds: that.value4,
          number: that.inputValue
        },
        headers: { Authorization: that.token }
      }).then(res => {
        layer.close(i);
        that.modalShow = false;
        that.hasxiadan=false;
        console.log(that.hasxiadan,1111111);
        // layer.msg(res.data.message);
        if (res.data.type == "ok") {
          layer.msg(that.$t("miscro.success"));
          that.$ajax({
              url: "/api/microtrade/payable_currencies",
              method: "get",
              data: {},
              headers: { Authorization: that.token }
            })
            .then(res => {
              if (res.data.type == "ok") {
                if (res.data.message.length > 0) {
                  for (var i = 0; i < res.data.message.length; i++) {
                    if (res.data.message[i].id == that.currency_id) {
                      that.balance =res.data.message[i].user_wallet.micro_balance;
                    }
                  }
                }
              }
            });
          localStorage.setItem("orderStatus", 1);
          setTimeout(function() {
            localStorage.setItem("orderStatus", "");
          }, 30);
        } else {
          layer.msg(res.data.message);
        }
      });
    }
  },
  computed: {}
};
</script>

<style scoped>
.transfer{
  cursor: pointer;
}
#app .whiteno .bg-part{
  color:#333;
}
.tabs {
  background-color: #2f3d45;
  line-height: 32px;
  border-bottom: 1px solid #2f3d45;
}
.tabs span {
  display: block;
  width: 50%;
  text-align: center;
  color: #babbbb;
  font-size: 12px;
}
.tabs .active {
  background-color: #1e2b34;
}
.content {
  padding: 7px 0;
  /* background-color: #fff; */
  margin-top: 10px;
}
.mt5 {
  margin-top: 10px;
}
.trade >>> .el-select .el-input.is-focus .el-input__inner {
  border-color: #304049;
}
.lefts {
  width: 80px;
  line-height: 30px;
}
.curency-list span {
  display: inline-block;
  width: 100px;
  line-height: 30px;
  height: 30px;
  border: 1px solid #304049;
  border-radius: 4px;
  margin-right: 12px;
  color: #fff;
  text-align: center;
  cursor: pointer;
  /* background-color: #fff; */
}

.content >>> .el-select {
  background-color: #1e2b34;
}
.content >>> .el-input__inner {
  background-color: #1e2b34;
  border: 1px solid #304049;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
}
.content >>> .el-input__icon {
  line-height: 30px;
}
.content >>> .popper__arrow {
  left: 50% !important;
}

.rights {
  width: calc(100% - 80px);
  line-height: 30px;
  height: 30px;
  border: 1px solid #304049;
  position: relative;
  background-color: #1e2b34;
}
.rights .iconfont {
  position: absolute;
  right: 10px;
  top: 0;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0);
}
.rights input {
  background-color: rgba(0, 0, 0, 0);
  padding: 0 15px;
  color: #fff;
}
.shareNumber {
  margin-top: 10px;
  width: 100%;
}
input {
  padding: 0 15px;
  color: #fff;
}
.share-rights {
  position: relative;
  /* background-color: #1e2b34; */
}
.share-rights input {
  line-height: 40px;
  height: 40px;
  width: 100%;
  /* background-color: #1e2b34; */
  border: 1px solid #304049;
  padding: 0 15px;
  color: #fff;
  font-size: 12px;
}
.share-rights p {
  line-height: 30px;
  border: 1px solid #304049;
  width: calc(24.73% - 8px);
  text-align: center;
  border-radius: 4px;
  margin-right: 12px;
  color: #fff;
  cursor: pointer;
  margin-bottom: 10px;
  /* background-color: #fff; */
}
.share-rights p:nth-child(4n) {
  margin-right: 0;
}
.mults {
  border: none;
}
/* .mult-content {
  width: calc(100% - 80px);
} */
.mult-content p {
  line-height: 30px;
  border: 1px solid #304049;
  width: calc(24.73% - 8px);
  text-align: center;
  border-radius: 4px;
  margin-right: 12px;
  margin-bottom: 10px;
  color: #fff;
  cursor: pointer;
  /* background-color: #fff; */
}
.mult-content p:nth-child(4n) {
  margin-right: 0;
}
.sell_btn {
  line-height: 40px;
  text-align: center;
  height: 40px;
  color: #fff;
  margin: 10px 15px;
  cursor: pointer;
  width: calc(100% - 20px);
  border-radius: 40px;
}
.greenColor {
  border-color: #00c087;
}
.redColor {
  border-color: #e3046f;
}
.transfer-content h3 {
  text-align: center;
  color: ##7a98f7;
  font-size: 18px;
}
.transfer-list p {
  line-height: 30px;
  color: #606266;
  line-height: 40px;
}
.trade >>> .el-button--primary {
  background-color: ##7a98f7;
  width: 140px;
  border: none;
}
.trade >>> .el-dialog--center .el-dialog__body {
  padding: 25px 25px 10px;
}
.active {
  background: url(../../../static/imgs/selects.png) no-repeat right bottom;
  background-size: 35px 30px;
  border: 1px solid #5e94ea;
}
.trade {
  margin-top: 10px;
}
.trade-currency {
  /* background-color: #fff; */
  padding: 15px 0px;
}
.trade-currency p {
  margin-left: 5px;
}
.trade-currency li {
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
}
.trade-bg {
  /* background-color: #fff; */
  line-height: 50px;
  padding: 0 20px;
  margin-bottom: 10px;
}
.trade-bg img {
  margin-top: 12px;
  margin-right: 5px;
}
.balck .trade-currency {
  background-color: #1e2b34;
}
.balck .trade-bg {
  background-color: #1e2b34;
}
.balck .curency-list span {
  background-color: #1e2b34;
}
.balck .share-rights p {
  background-color: #1e2b34;
}
.balck .mult-content p {
  background-color: #1e2b34;
}
.balck .share-rights input {
  background-color: #1e2b34;
}
.balance {
  width: 100%;
  /* border-right: 1px solid #f1f1f1; */
}
.insuranc{
  width: 50%;
}
.insuranc-list span{
  display: inline-block;
  padding: 5px;
  border: 1px solid #999;
  border-radius: 4px;
  color: #999;
}
.insuranc-list span:first-child{
  margin-right: 15px;
}
.insuranc-list .active{
  color: ##7a98f7;
  border: 1px solid ##7a98f7;
  background: rgba(0, 0, 0, 0)
}
.loss-madal-content span{
  display: block;
  text-align: center;
  margin-top: 5px;
}
.greenBg{
  background: #12b886;
}
.redBg{
  background: #cc4951;
}
</style>




// WEBPACK FOOTER //
// src/view/lever/second-trade.vue