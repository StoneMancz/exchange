<template>
  <div class="box">
    <indexHeader></indexHeader>
    <div class="account">
      <div class="topcontent ft20 bg-part">
        <span class="whites">
          <span class="baseColor" @click="goback">{{$t('asset.assets')}}></span>
          {{$t('asset.address_bind')}}
        </span>
      </div>
      <div class="content">
        <div class="con_box">
          <div class="contentBK fColor1 pdlr20 pdtb20 ft12">
            <!-- <div class="flex alcenter">
              <span class="flex1">验证码</span>
            </div>-->
            <div class="mt10 mauto" style="width:60%;">
              <div class="flex alcenter between mt30">
                <span class="w10 mr20 wt150 ft16">{{$t('asset.currency')}}：</span>
                <select name id class="w10 flex1 bd input_color" v-model="addId" @change="setCoin()">
                  <!-- <option :value="this.$t('asset.currency')">{{$t('asset.currency')}}</option> -->
                  <option
                    :value="item.currency_name"
                    v-for="(item,index) in coins"
                    :key="index"
                  >{{item.currency_name}}</option>
                </select>
              </div>
              <div class="flex alcenter mt30" v-if="coinType.length > 0">
                <span class="wt150 mr20 ft16">{{$t('asset.chainType')}}：</span>
                <div class="flex" style="width:60%;">
                  <p
                    v-for="(item,index) in coinType"
                    :key="index"
                    class="mr10 pb10 plr10 bd_input mt10"
                    :class="name==item.type?'active':''"
                    @click="selectCharge(item)"
                  >{{item.type}}</p>
                </div>
              </div>
              <div class="flex alcenter between mt30">
                <span class="wt150 mr20 ft16">{{$t('asset.address_width')}}：</span>
                <input
                  type="text"
                  class="flex1 bd input_color"
                  :placeholder="this.$t('asset.enterAdderses')"
                  v-model="address"
                />
              </div>
              <!-- <div class="flex alcenter between mt30" v-if="ishowmemo">
                   <span class="wt150 mr20 ft16">memo：</span>
                   <input type="text" style="flex:1" class placeholder="请输入memo(非必填)" v-model="memo" />
              </div>-->
              <!-- <div class="flex alcenter between mt30">
                <input
                  type="text"
                  style="flex:1"
                  class="bd input_color"
                  :placeholder="$t('set.enterCode')"
                  v-model="notes"
                />
                <button class="btn curPer wt150" @click="getCode" :disabled="disable">{{codeText}}</button>
              </div> -->
              <div class="add tc mt40">
                <div class="baseBtn" @click="addAddress">{{$t('asset.address_bind')}}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="con_box mt15">
          <div class="account_title ttBk white flex">
            <div class="ml20">{{$t('asset.addressList')}}</div>
          </div>
          <div class="contentBK fColor1 pdlr20 pdtb20 ft12">
            <div class="flex alcenter">
              <span class="flex1">{{$t('asset.currency')}}</span>
              <span class="flex1">{{$t('asset.address_width')}}</span>
              <span class="flex1">{{$t('asset.beizhu')}}</span>
              <span class="flex1">{{$t('td.do')}}</span>
            </div>
            <div class="mt10" v-for="(item,index) in list" :key="index">
              <div class="flex alcenter">
                <span class="flex1">{{nowCoin}}</span>
                <span class="flex1">{{item.address}}</span>
                <span class="flex1">{{item.notes}}</span>
                <span class="flex1" @click="delAddress(item.id,index)">{{$t('asset.delete')}}</span>
              </div>
            </div>
            <div
              class="none color1 tc"
              v-if="!list.length"
              style="padding: 20px 0"
            >{{$t('asset.norec')}}</div>
          </div>
        </div>-->
      </div>
    </div>
  </div>
</template>
<script>
import indexHeader from "@/view/indexHeader";
export default {
  name: "finanrec",
  data() {
    return {
      token: "",
      lang: "",
      coins: [],
      nowCoin: "",
      list: [],
      address: "",
      notes: "",
      addId: "",
      codeText: this.$t("set.getCode"),
      disable: false,
      coinType: [],
      name: "",
      currencyName: "",
      contractAddress: ""
    };
  },
  components: {
    indexHeader
  },
  created() {
    this.getCoins();
    console.log(this.API);
  },
  methods: {
    getCoins() {
      this.token = localStorage.getItem("token") || "";

      this.$http({
        url: "/api/wallet/list",
        method: "POST",
        headers: { Authorization: this.token }
      }).then(res => {
        if (res.data.type == "ok" && res.data.message.length != 0) {
          this.coins = res.data.message.change_wallet.balance;
          this.ishowmemo = this.coins[0].is_show_memo;
          this.addId = this.coins[0].currency_name;
          if (this.coins[0].multi_protocol == 1) {
            this.getType(this.coins[0].currency);
          } else {
            this.currencyName = this.coins[0].currency_name;
            this.contractAddress = this.coins[0].contract_address;
            this.getAddress(
              this.coins[0].currency_name,
              this.coins[0].contract_address
            );
          }
        }
      });
    },
    // 获取链类型
    getType(currency) {
      var that = this;
      that.coinType = [];
      that
        .$http({
          url: "/api/wallet/get_info",
          method: "POST",
          data: {
            currency: currency
          },
          headers: { Authorization: localStorage.getItem("token") }
        })
        .then(res => {
          if (res.data.type == "ok") {
            that.coinType = res.data.message.type_data;
            that.name = res.data.message.type_data[0].type;
            this.currencyName = res.data.message.type_data[0].name;
            this.contractAddress =
              res.data.message.type_data[0].contract_address;
            this.getAddress(
              res.data.message.type_data[0].name,
              res.data.message.type_data[0].contract_address
            );
          }
        });
    },
    // 选择充币类型
    selectCharge(options) {
      var that = this;
      that.name = options.type;
      that.currencyName = options.name;
      that.contractAddress = options.contract_address;
      that.address = "";
      that.getAddress(options.name, options.contract_address);
    },
    goback() {
      this.$router.go(-1);
    },
    //获取验证码
    // /walletMiddle/SendVerificationcodev
    getCode() {
      // alert(localStorage.getItem("user_id"));
      var that = this;
      this.$http({
        url: this.API + "/walletMiddle/SendVerificationcode",
        method: "GET",
        params: {
          user_id: localStorage.getItem("user_id")
        }
      }).then(res => {
        if (res.data.code == 0) {
          layer.msg("发送成功");
          var times = 30;
          var timer = setInterval(() => {
            times--;
            that.codeText = times + "s";
            that.disable = true;
            if (times <= 0) {
              clearInterval(timer);
              that.codeText = that.$t("set.getCode");
              that.disable = false;
            }
          }, 1000);
        } else {
          layer.msg(res.data.msg);
        }
      });
    },
    setCoin() {
      var that = this;
      that.coinType = [];
      that.address = "";
      var arr = [];
      var options = that.coins.filter(
        item => item.currency_name == that.addId
      )[0];
      if (options.multi_protocol == 1) {
        that.getType(options.currency);
      } else {
        that.currencyName = options.currency_name;
        that.contractAddress = options.contract_address;
        that.getAddress(options.currency_name, options.contract_address);
      }
      
    },
    //获取提币地址
    getAddress(names, addr) {
      var that = this;
      that.address = "";
      this.$http({
        url: this.API + "/walletMiddle/GetDrawAddress",
        method: "GET",
        params: {
          user_id: localStorage.getItem("user_id"),
          coin_name: names,
          contract_address: addr
        }
      }).then(res => {
        if (res.data.code == 0) {
          that.address = res.data.data.address;
          that.memo = res.data.data.memo;
        } else {
        }
      });
    },
    getList() {
      this.token = localStorage.getItem("token") || "";

      this.$http({
        url: "/api/wallet/get_address",
        method: "post",
        data: { currency: this.addId },
        headers: { Authorization: this.token }
      }).then(res => {
        if (res.data.type == "ok") {
          this.list = res.data.message;
        } else {
          this.list = [];
        }
      });
    },
    delAddress(id, index) {
      this.$http({
        url: "/api/wallet/deladdress",
        method: "post",
        data: { address_id: id },
        headers: { Authorization: this.token }
      }).then(res => {
        if (res.data.type == "ok") {
          this.list.splice(index, 1);
          layer.msg(res.data.message);
        }
      });
    },
    //绑定地址
    addAddress() {
      var that = this;
      if (this.address == "") {
        layer.msg(this.$t("asset.enterAdderses"));
        return;
      }
      // if (this.notes == "") {
      //   layer.msg(this.$t("set.enterCode"));
      //   return;
      // }
      var addr = this.coins.filter(item => item.currency_name == this.addId)[0]
        .contract_address;
      var obj = {
        user_id: localStorage.getItem("user_id"),
        address: this.address,
        coin_name: this.currencyName,
        contract_address: this.contractAddress,
        memo: this.memo,
        verificationcode: this.notes,
        t: Date.parse(new Date()) / 1000
      };
      var obj_str = JSON.stringify(obj);
      $.ajax({
        url: this.API + "/walletMiddle/BindDrawAddress",
        type: "POST",
        dataType: "json",
        async: true,
        data: {
          data: obj_str,
          sign: $.md5(obj_str + "abcd4321")
        },
        success: function(res) {
          console.log(res)
          if (res.code == 0) {
            layer.msg("绑定成功");
            that.address = "";
            that.notes = "";
          } else {
            layer.msg(res.msg);
            // if (res.msg == "验证码非法") {
            //   var lang = localStorage.getItem("locale");
            //   if (lang == "jp") {
            //     layer.msg("認証コードが不正です");
            //   } else if (lang == "en") {
            //     layer.msg(
            //       "Please set the withdrawal address first"
            //     );
            //   } else if (lang == "hk") {
            //     layer.msgr("驗證碼非法");
            //   } else {
            //     layer.msg(res.msg);
            //   }
            // } else {
            //   layer.msg(res.msg);
            // }
            //
          }
        }
      });
    }
    // addAddress() {
    //   if (this.addId == this.$t("asset.currency")) {
    //     layer.msg(this.$t("asset.selectCurrency"));
    //     return;
    //   }
    //   if (this.address == "") {
    //     layer.msg(this.$t("asset.enterAdderses"));
    //     return;
    //   } else {
    //     this.$http({
    //       url: "/api/wallet/addaddress",
    //       method: "post",
    //       headers: { Authorization: this.token },
    //       data: {
    //         currency_id: this.addId,
    //         address: this.address,
    //         notes: this.notes
    //       }
    //     }).then(res => {
    //       if (res.data.type == "ok") {
    //         layer.msg(res.data.message);
    //         this.address = "";
    //         this.notes = "";
    //         this.getList();
    //       }
    //     });
    //   }
    // }
  }
};
</script>

<style lang="scss" scoped>
.wt150 {
  width: 150px;
}
.box .account {
  width: 1200px;
  margin: 0 auto 82px;
  margin-top: 30px;
}
.topcontent {
  padding: 22px 30px;
  margin-bottom: 20px;
  // background-color: #1a2330;
  border-radius: 5px;
}
.account_title {
  padding: 15px 20px;
}
select {
  background-color: transparent;
  padding: 10px;
  // color: #c7cce6;
  font-size: 18px;
  border-radius: 3px;
  // border: 1px solid #4e5b85;
}
select.ft14 {
  font-size: 14px;
}
select > option {
  padding: 10px 0;
  background-color: transparent;
}
input {
  padding: 10px;
  // border: 1px solid #4e5b85;
  font-size: 18px;
  // color: #c7cce6;
  border-radius: 3px;
  background-color: transparent;
  outline: none;
}
.add {
  // text-align: right;
  margin-top: 20px;
}
.add .baseBtn {
  width: 100%;
  margin-top: 60px;
}
.btn {
  width: 150px;
  height: 100%;
  line-height: 42px;
  border-radius: 3px;
  background: #357ce1;
  color: #fff;
  margin-left: 20px;
}
.pb10 {
  padding: 10px;
}
.mb10 {
  margin-bottom: 10px;
}
</style>





// WEBPACK FOOTER //
// src/view/accounts/withdraw_address.vue