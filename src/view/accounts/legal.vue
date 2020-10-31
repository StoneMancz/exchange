<template>
  <div class>
    <div class="header fColor1">
      <p class="fl">
        {{$t('asset.all_assets')}}：
        <span class="asset_name">$</span>
        <span class="asset_num">{{totle | toFixeds}}</span>
        <!-- <span class="ft12 baseColor"> ≈ <span> -->
        <!-- {{totle*usprice}} -->
        <!-- {{totle}}</span>CNY</span> -->
        <!-- <label class="min_lab ft14"><input type="checkbox" />隐藏小额资产</label><i></i><label class="inp_lab"><input  type="text"/><i></i></label> -->
      </p>
      <p class="fr right_text">
        <!-- <span class="record" @click="record">财务记录</span> -->
        <!-- <span class="address" @click="withdraw_address">提币地址管理</span> -->
      </p>
    </div>
    <div class="content fColor1 ft12">
      <div class="content_top flex alcenter fColor2">
        <p class="flex1 tc">
          {{$t('asset.currency')}}
          <i></i>
        </p>
        <p class="flex1 tc">{{$t('asset.canuse')}}</p>
        <p class="flex1 tc">{{$t('asset.frezz')}}</p>
        <!-- <p class="flex1 tc">BTC估值<i></i></p> -->
        <!-- <p class="flex1 tc">锁仓</p> -->
        <p class="flex1 tc">{{$t('asset.conversion')}}</p>
        <p class="flex1 tc">{{$t('td.do')}}</p>
      </div>
      <ul class="content_ul">
        <li 
          class="pointer"
          v-for="(item,index) in asset_list"
          :key="index" 
        >
         <!-- <li 
          class="pointer"
          v-for="(item,index) in asset_list"
          :key="index" v-if="item.is_legal == 1"
        > -->
          <div class="content_li flex alcenter between bdb">
            <p class="flex1 tc">{{item.currency_name}}</p>
            <p class="flex1 tc">
              <!-- <span v-if="item.currency_name=='BTC'||item.currency_name=='ETH'">{{item.legal_balance || '0.00' | toFixeds8}}</span> -->
              <span>{{item.legal_balance || '0.00' | toFixeds8}}</span>
            </p>
            <p class="flex1 tc">
              <!-- <span v-if="item.currency_name=='BTC'||item.currency_name=='ETH'">{{item.lock_legal_balance || '0.00' | toFixeds8}}</span> -->
              <span>{{item.lock_legal_balance || '0.00' | toFixeds8}}</span>
            </p>
            <p class="flex1 tc">
              <!-- <span v-if="item.currency_name=='BTC'||item.currency_name=='ETH'">{{item.cny_price * item.legal_balance || '0.00' | toFixeds8}}</span> -->
              <span>{{item.usdt_price * item.legal_balance || '0.00' | toFixeds8}}</span>
            </p>
            <!-- <p class="flex1 tc">{{item.valuation}}</p> -->
            <!-- <p class="flex1 tc">{{item.lock_position}}</p> -->
            <p class="flex1 tc operation">
              <!-- <span @click="excharge(index,item.currency)">充币</span>
              <span @click="withdraw(index,item.currency)">提币</span> -->
              <!-- <span @click="exchange">兑换</span> -->
              <span @click="go_legalAccount(item.currency)" style="padding: 0 5px;">{{$t('asset.record')}}</span>
              <span @click="$router.push({path:'/transferLegal',query:{id:item.currency}})">{{$t('asset.transfer')}}</span>
            </p>
          </div>
          <!--充币区-->
          <div class="hide_div" v-if="index == active">
            <p class="fColor2 ft12">{{$t('asset.address_charge')}}</p>
            <p class="mt50 mb50">
              <span class="ft18 fColor1 excharge_address" :class="{'bg':flags}">{{excharge_address}}</span>
              <span id="copy" @click="copy" class="copy ft14">{{$t('asset.copy')}}</span>
              <span class="ewm_wrap">
                <span class="ewm ft14" @click="show_ewm">{{$t('asset.ercode')}}</span>
                <div class="ewm_img" id="code" :class="{'hide':isHide}"></div>
                <!-- <img class="ewm_img" :class="{'hide':isHide}" src="../../assets/images/ewm.jpg" /> -->
              </span>
            </p>
            <p class="ft12 fColor2 mb50">
              {{$t('asset.look')}}
              <span class="excharge_record">{{$t('asset.chargeRecord')}}</span>{{$t('asset.status')}}
            </p>
            <p class="ft12 fColor2 mb15">{{$t('asset.reminder')}}</p>
            <ul class="tips_ul ft12 fColor2" style="list-style:disc inside">
              <li class="tips_li" style="list-style:disc inside" v-for="item in tip_list">{{item}}</li>
            </ul>
          </div>
          <!--提币区-->
          <div class="hide_div" v-if="index == active01">
            <p class="fColor2 ft12 mb15">{{$t('asset.address_width')}}</p>
            <input class="address_inp fColor1 mb30" type="text" v-model="address">
            <p class="fColor2 ft12 mb15 flex between alcenter">
              <span>{{$t('td.num')}}</span>
              <span>
                {{$t('asset.canuse')}}：
                <span class="use_num">{{balance || '0.00' | toFixeds}}</span>
                {{coinname}}
                <span>
                  <!-- 限额：
                  <span>1500.00</span>-->
                  <!-- <span class="advance">提升额度</span> -->
                </span>
              </span>
            </p>
            <label class="num_lab flex between mb30">
              <input class="fColor1" type="text" :placeholder="min_number" v-model="number">
              <span>{{coinname}}</span>
            </label>
            <div class="flex mb50">
              <div class="left_inp_wrap flex1">
                <p class="fColor2 ft12 mb15">
                  <span>手续费</span>
                  <span>{{ratenum}}%</span>
                </p>
                <label class="range_lab flex alcenter between">
                  <!-- <input class="fColor1" type="text" v-model="rate"> -->
                  <span>{{number * ratenum /100 | toFixeds}}</span>
                  <span>{{coinname}}</span>
                </label>
              </div>
              <div class="right_inp_wrap flex1">
                <p class="mb15">
                  <span class="fColor2 ft12">到账数量</span>
                </p>
                <label class="get_lab flex alcenter between">
                  <span>{{number - number * ratenum /100 | toFixeds}}</span>
                  <!-- <input class="fColor1" disabled v-model="reachnum" type="number"> -->
                  <span>{{coinname}}</span>
                </label>
              </div>
            </div>
            <div class="flex">
              <div class="flex2">
                <p class="ft12 fColor2 mb15">温馨提示</p>
                <ul class="tips_ul ft12 fColor2" style="list-style:disc inside">
                  <li
                    class="tips_li"
                    style="list-style:disc inside"
                    v-for="item in tip_list01"
                  >{{item}}</li>
                </ul>
              </div>
              <div class="flex1 tc">
                <button class="withdraw_btn" @click="mention">提币</button>
              </div>
            </div>
          </div>
          <!--记录区-->
          <div class="hide_div rec-box" v-if="index == active02">
            <div class="rec-con">
              <div class="rec-title">
                <span>数量</span>
                <span>记录</span>
                <span>时间</span>
              </div>
              <ul class="rec-list">
                <li v-for="(reItem,reIndex) in recData" :key="reIndex">
                  <span>{{reItem.value || '0.00' | toFixeds}}</span>
                  <span>{{reItem.info}}</span>
                  <span>{{reItem.created_time}}</span>
                </li>
              </ul>
              <p class="more" @click="moreData()">{{more}}</p>
            </div>
          </div>
        </li>
      </ul>
      <!-- <div class="tc ft16 fColor1 mt50" v-show="asset_list.length<=0">暂无数据</div> -->
    </div>
    <!-- 划转弹窗 -->
    <div class="transfer-modal flex" v-show="transferData.modalShow">
      <div class="transfer-mask">
        <div class="transfer-header">
          <h3>划转</h3>
          <p @click="closes()">X</p>
        </div>
        <div class="transfer-content">
          <div>
            <p>币种</p>
            <p>{{transferData.transferName}}</p>
            <p>可用余额</p>
            <p>{{transferData.transferBalance}}</p>
          </div>
          <div>
            <p>从</p>
            <select v-model="transferData.start">
              <option v-for="item in balanceList" :value="item">{{item}}</option>
            </select>
          </div>
          <div>
            <p>至</p>
            <select v-model="transferData.end">
              <option v-for="item in balanceList" :value="item">{{item}}</option>
            </select>
          </div>
          <div>
            <p>划转数量</p>
            <input type="text" placeholder="请输入划转数量">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import indexHeader from "@/view/indexHeader";
import left from "@/view/left";
import "@/lib/clipboard.min.js";
// import "@/lib/jquery.qrcode.min.js";
export default {
  name: "finance",
  filters: {
    toFixeds: function(value) {
      value = Number(value);
      return value.toFixed(4);
    },
    toFixeds8: function(value) {
      value = Number(value);
      return value.toFixed(8);
    }
  },
  data() {
    return {
      totle: "",
      recData: [],
      token: "",
      flags: false,
      flag: false,
      isHide: true,
      active: "a",
      active01: "a",
      active02: "a",
      addr: "",
      url: "",
      excharge_address: "",
      address: "",
      number: "",
      rate: "",
      coinname: "",
      balance: "",
      ratenum: "",
      reachnum: "",
      min_number: "",
      currency: "",
      asset_list: [],
      tip_list: [
        "请勿向上述地址充值任何非USDT资产，否则资产将不可找回。",
        "USDT充币仅支持simple send的方法，使用其他方法（send all）的充币暂时无法上账，请您谅解。"
      ],
      tip_list01: [
        "请勿向上述地址充值任何非USDT资产，否则资产将不可找回。",
        "USDT充币仅支持simple send的方法，使用其他方法（send all）的充币暂时无法上账，请您谅解。"
      ],
      page: 1,
      more: "加载更多",
      balanceList: ["法币账户", "合约账户"],
      transferData: {
        modalShow: false,
        transferName: "",
        transferBalance: "",
        start: "",
        end: ""
      },
      status:''
    };
  },
  components: {
    indexHeader,
    left
  },
  methods: {
  go_legalAccount(currency_id){
      this.$router.push({
        name:'dealAccount',
        query:{
          currency_id:currency_id
        }
    })
  },
    goRecord() {
      this.$router.push({ name: "coinRecord" });
    },
    init() {
      var clipboard = new Clipboard(".copy");
      clipboard.on("success", function(e) {
        layer.alert("复制成功");
      });
      clipboard.on("error", function(e) {
        alert("复制失败");
      });
    },
    //充币
    excharge(index, currency) {
      if(this.status == 1){
        this.currency = currency;
        if (this.flag) {
          this.flag = false;
          this.active = "a";
          this.active01 = "a";
          this.active02 = "a";
        } else {
          this.flag = true;
          this.active = index;
          this.active01 = "a";
          this.active02 = "a";
        }
        this.sendData(currency);
      }else{
        layer.alert('该功能暂未开放')
      }
      
    },
    sendData(currency) {
      var that = this;
      this.$ajax({
        url: "/api/" + "wallet/get_in_address",
        method: "post",
        data: { currency: currency },
        headers: { Authorization: that.token }
      })
        .then(res => {
          if (res.data.type == "ok") {
            that.excharge_address = res.data.message;
            // 生成二维码
            $("#code").qrcode({
              width: 100, //宽度
              height: 100, //高度
              text: res.data.message
            });
          } else {
           
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //提币
    withdraw(index, currency) {
      if(this.status == 1){
        this.currency = currency;
        if (this.flag) {
          this.flag = false;
          this.active = "a";
          this.active01 = "a";
          this.active02 = "a";
        } else {
          this.flag = true;
          this.active01 = index;
          this.active = "a";
          this.active02 = "a";
        }
        this.getNum(currency);
      }else{
        layer.alert("该功能暂未开放");
      }
      
    },
    //记录
    rec(index, currency) {
      this.currency = currency;
      this.recData = [];
      if (this.flag) {
        this.flag = false;
        this.active = "a";
        this.active01 = "a";
        this.active02 = "a";
      } else {
        this.flag = true;
        this.active02 = index;
        this.active = "a";
        this.active01 = "a";
        this.$ajax({
          url: "/api/wallet/legal_log",
          method: "post",
          data: { type: 1, currency: currency, page: 1 },
          headers: { Authorization: this.token }
        }).then(res => {
          if (res.data.type == "ok") {
            this.recData = res.data.message.list;
          }
        });
      }
    },
    getNum(currency) {
      var that = this;
      $.ajax({
        type: "POST",
        url: "/api/" + "wallet/get_info",
        data: {
          currency: currency
        },
        dataType: "json",
        async: true,
        beforeSend: function beforeSend(request) {
          request.setRequestHeader("Authorization", that.token);
        },
        success: function(res) {
          if (res.type == "ok") {
            that.coinname = res.message.name;
            that.balance = res.message.legal_balance;
            that.min_number =
              "最小提币数量" + parseFloat(res.message.min_number).toFixed(2);
            that.minnumber = res.message.min_number;
            that.ratenum = res.message.rate;
            that.reachnum = 0.0;
            that.rate = res.message.rate;
          } else {
          }
        }
      });
    },
    // 提币按钮
    mention() {
      var that = this;
      var currency = this.currency;
      var address = this.address;
      var number = this.number;
      var rate = this.rate;
      var min_number = this.minnumber;
      if (!address) {
        layer.alert("请输入提币地址");
        return;
      }
      if (!number) {
        layer.alert("请输入提币数量");
        return;
      }
      if (number - 0 < min_number) {
        return layer.alert("输入的提币数量小于最小值");
      }
      // if(rate=='' || rate>=1){
      //     layer.alert('请输入0-1之间的提币手续费');
      //     return;
      // }
      $.ajax({
        type: "POST",
        url: "/api/" + "wallet/out",
        data: {
          currency: currency,
          number: number,
          rate: rate,
          address: address
        },
        dataType: "json",
        async: true,
        beforeSend: function beforeSend(request) {
          request.setRequestHeader("Authorization", that.token);
        },
        success: function(res) {
          if (res.type == "ok") {
            layer.alert(res.message);
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          } else {
            layer.alert(res.message);
          }
        }
      });
    },
    exchange() {},
    //复制
    copy() {
      var that = this;
      var clipboard = new Clipboard(".copy", {
        text: function() {
          return that.excharge_address;
        }
      });
      clipboard.on("success", function(e) {
        that.flags = true;
        layer.msg("复制成功");
      });
      clipboard.on("error", function(e) {
        that.flags = false;
        layer.msg("请重新复制");
      });
    },
    record() {
      this.$router.push({ name: "finanrec" });
    },
    withdraw_address() {
      this.$router.push({ name: "withdraw_address" });
    },
    show_ewm() {
      if (this.isHide) {
        this.isHide = false;
      } else {
        this.isHide = true;
      }
    },
    getdata() {
      var that = this;
      this.$ajax({
        url: "/api/" + "wallet/list",
        method: "post",
        data: {},
        headers: { Authorization: that.token }
      })
        .then(res => {
          if (res.data.type == "ok") {
            that.asset_list = res.data.message.legal_wallet.balance;
            that.totle = res.data.message.legal_wallet.usdt_totle;
            that.status = res.data.message.is_open_CTbi;
          } else {
            return;
          }
          // this.asset_list.forEach((item, index) => {
          //   this.$ajax({
          //     url: "/api/wallet/legal_log",
          //     method: "post",
          //     data: { type: "0", currency: item.currency, page: this.page },
          //     headers: { Authorization: this.token }
          //   }).then(res => {
          //     if (res.data.type == "ok") {
          //       this.recData[index] = res.data.message.list;
          //     }
          //   });
          // });
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 加载更多
    moreData() {
      let that = this;
      that.page = that.page + 1;
      this.$ajax({
        url: "/api/wallet/legal_log",
        method: "post",
        data: { type: 1, currency: that.currency, page: that.page },
        headers: { Authorization: this.token }
      }).then(res => {
        if (res.data.type == "ok") {
          var datas = that.asset_list;
          for (let i in datas) {
            if (that.currency == datas[i].currency) {
              that.active02 = i;
              if(res.data.message.list.length > 0){
                that.recData= that.recData.concat(res.data.message.list);
              }else{
                that.more="没有更多数据了";
              }
              
            }
          }
        }
      });
    },
    // 划转
    transfer(index, currency) {
      let that = this;
      that.transferData.modalShow = true;
    }
  },
  created() {
    this.token = localStorage.getItem("token") || "";
  },

  mounted() {
    var that = this;
    that.getdata();
    this.init();
  }
};
</script>
<style scoped lang="scss">
.header {
  padding: 15px 30px;
  overflow: hidden;
}
.min_lab {
  margin: 0 10px;
}
.min_lab input {
  margin-right: 3px;
}
.inp_lab {
  border: 1px solid #6b80ae;
  border-radius: 2px;
  padding: 3px 5px;
}
.inp_lab input {
  background: none;
  border: none;
  width: 120px;
  color: #fff;
}
.right_text {
  color: #5697f4;
}
.right_text span {
  cursor: pointer;
}
.record {
  margin-right: 10px;
}
.content_ul {
  padding: 0 20px;
}
.content_top {
  padding: 10px 20px;
  // background: #161617c7;
}
.content_li {
  padding: 15px 0;
}
.operation,
.copy,
.ewm {
  color: #5697f4;
}
.copy {
  margin: 0 30px;
}
.copy:hover {
  cursor: pointer;
}
.ewm:hover {
  cursor: pointer;
}
.operation span {
  cursor: pointer;
}
.hide_div {
  border: 1px solid #1e2c42;
  padding: 20px;
}
.excharge_record {
  color: #5697f4;
}
input {
  background: none;
  border: none;
}
.address_inp {
  width: 100%;
  border: 1px solid #6b80ae;
  border-radius: 3px;
  padding: 15px 15px;
}
.num_lab {
  display: flex;
  width: 100%;
  border: 1px solid #6b80ae;
  border-radius: 3px;
  padding: 15px;
}
.num_lab input {
  width: 100%;
}
.range_lab,
.get_lab {
  border: 1px solid #6b80ae;
  border-radius: 3px;
  padding: 15px;
}
.get_lab {
  background: #1e2c42;
}
.right_inp_wrap {
  margin-left: 20px;
}
.use_num,
.advance {
  color: #5697f4;
}
.use_num {
  margin-right: 5px;
}
.advance {
  margin-left: 5px;
}
.withdraw_btn {
  background-color: #7a98f7;
  color: #fff;
  padding: 15px 70px;
  border: none;
  border-radius: 5px;
}
.withdraw_btn:hover {
  cursor: pointer;
}
.bg {
  background: #2b3c71;
}
.ewm_wrap {
  position: relative;
}
.ewm_img {
  width: 120px;
  height: 120px;
  position: absolute;
  top: 25px;
  left: -30px;
  border: 10px solid #171c2b;
}
.hide {
  display: none;
}
.rec-box {
  .rec-con {
    margin: 10px;
    padding: 0 20px;
    background: #171c2b;
    span {
      flex: 1;
      text-align: center;
      line-height: 3;
    }
    .rec-title {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #fff;
      line-height: 1.5;
    }
    li {
      display: flex;

      justify-content: space-between;
      font-size: 12px;
      color: #728daf;
      border-top: 1px solid #2e394c;
    }
  }
}
.more {
  width: 100%;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}
// 划转弹窗
.transfer-modal {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  overflow: hidden;
  justify-content: center;
  align-items: center;
}
.transfer-mask {
  width: 500px;
  background-color: #171c2b;
  margin: 0 auto;
  border-radius: 5px;
}
.transfer-header {
  line-height: 40px;
  text-align: center;
  position: relative;
}
.transfer-header p {
  position: absolute;
  right: 10px;
  top: 0;
}
</style>





// WEBPACK FOOTER //
// src/view/accounts/legal.vue