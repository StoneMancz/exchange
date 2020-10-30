<template>
  <div class>
    <div class="header fColor1">
      <p class="fl">
        {{$t('asset.all_assets')}}：
        <span class="asset_name">$</span>
        <span class="asset_num">{{totle | toFixeds}}</span>
      </p>
      <!-- <p class="fr right_text">
        <span class="address" @click="withdraw_address">{{$t('asset.address_bind')}}</span>
      </p> -->
    </div>
    <div class="content fColor1 ft12">
      <!-- <div class="content_top flex alcenter fColor2">
        <p class="flex1 tc">
          {{$t('asset.currency')}}
          <i></i>
        </p>
        <p class="flex1 tc">{{$t('asset.canuse')}}</p>
        <p class="flex1 tc">{{$t('asset.frezz')}}</p>
        <p class="flex1 tc">{{$t('asset.conversion')}}($)</p>
        <p class="flex1 tc">{{$t('td.do')}}</p>
      </div> -->
      <ul class="content_ul">
        <li v-for="(item,index) in asset_list" :key="index">
          <div class="content_li bdb flex alcenter between">
            <p class="flex1 tc">{{item.currency_name}}</p>
            <p class="flex1 tc">
              <!-- <span v-if="item.currency_name=='BTC'||item.currency_name=='ETH'">{{item.change_balance || '0.00' | toFixeds8}}</span> -->
              <span>{{item.change_balance || '0.00' | toFixeds8}}</span>
            </p>
            <p class="flex1 tc">
              <!-- <span v-if="item.currency_name=='BTC'||item.currency_name=='ETH'">{{item.lock_change_balance || '0.00' | toFixeds8}}</span> -->
              <span>{{item.lock_change_balance || '0.00' | toFixeds8}}</span>
            </p>
            <p class="flex1 tc">
              <!-- <span v-if="item.currency_name=='BTC'||item.currency_name=='ETH'">{{item.cny_price * item.change_balance || '0.00' | toFixeds8}}</span> -->
              <span>{{item.usdt_price * item.change_balance || '0.00' | toFixeds8}}</span>
            </p>
            <p class="flex1 tc operation">
              <span
                @click="excharge(index,item.currency,item.currency_type,item.contract_address,1)"
              >{{$t('asset.charging')}}</span>
              <span
                @click="withdraw(index,item.currency,item.currency_name,item.contract_address,item.is_show_memo,2)"
                style="padding: 0 5px;"
              >{{$t('asset.withdraw')}}</span>
<<<<<<< HEAD
              <span @click="rec(index,item.currency)" style="padding: 0 5px;">{{$t('asset.record')}}</span>
=======
              <span @click="rec(index,item.currency)">{{$t('asset.record')}}</span>
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
              <span @click="$router.push({path:'/transferLegal',query:{id:item.currency}})">{{$t('asset.transfer')}}</span>
            </p>
          </div>
          <!--充币区-->
          <div class="hide_div bd" v-if="index == active">
            <p class="fColor2 ft12">{{$t('asset.address_charge')}}</p>
            <div v-if="chargeType.length > 0">
              <p class="mt20">{{$t('asset.chainType')}}</p>
              <div class="flex ft14">
                <p
                  v-for="(item,index) in chargeType"
                  :key="index"
                  class="mr10 pb10 plr10 bd_input mt10"
                  :class="name==item.type?'active':''"
                  @click="selectCharge(item)"
                >{{item.type}}</p>
              </div>
            </div>
            
            <div class="usdtlist mt10" v-if="usdtList">               
              <span :class="key==usdtListKey?'usdtList-active':''" v-for="(item,key) in usdtList" :key="key" @click="exchangeAddress(key)">{{key}}</span>
            </div>
            
            <div class="mt50 mb10 flex">
              <span class="ft18 fColor1 excharge_address" :class="{'bg':flags}">{{excharge_address}}</span>
              <span id="copy" @click="copy" class="copy ft14">{{$t('asset.copy')}}</span>

              <span class="ewm_wrap">
                <span class="ewm ft14" @click="show_ewm">{{$t('asset.ercode')}}</span>
                <div class="ewm_img" id="code" :class="{'hide':isHide}"></div>
              </span>
              <div v-if="labelText" class="ml40 blue ft14 copy2 flex">
                <p>{{labelText}}</p>
                <p class="ml20 curPer" @click="copy2">复制标签</p>
              </div>
              <!-- <span @click="copy2" class="pdlr20 blue ft14 copy2">复制地址标签</span> -->
            </div>
             <div v-if="excharge_address">
            <p class="fColor2 ft12 mb15">{{$t('zdy.czsl')}}</p>
            <label class="num_lab flex between mb30">
              <input class="fColor1" type="text" :placeholder="$t('zdy.enterczsl')" v-model="rechargeAmount" />
              <span>{{coinname}}</span>
            </label>
            <p class="fColor2 ft12 mb15">{{$t('zdy.qbdz')}}</p>
            <label class="num_lab flex between mb30">
              <input class="fColor1" type="text" :placeholder="$t('zdy.enterqbdz')" v-model="rechargeAddress" />
              <span>{{coinname}}</span>
            </label>
            <div class="submit-recharge"><button @click="submitRecharge">{{$t('zdy.tjsq')}}</button></div>
            </div> 
            <p class="ft12 fColor2 mb15 mt50">{{$t('asset.reminder')}}</p>
            <ul class="tips_ul ft12 fColor2" style="list-style:disc inside">
              <li class="tips_li" style="list-style:disc inside" v-for="item in tip_list">{{item}}</li>
            </ul>
          </div>
          <!--提币区-->
          <div class="hide_div bd" v-if="index == active01">
            <div class="mb10" v-if="chargeType.length > 0">
              <p class="mt20">{{$t('asset.chainType')}}</p>
              <div class="flex ft14">
                <p
                  v-for="(item,index) in chargeType"
                  :key="index"
                  class="mr10 pb10 plr10 bd_input mt10"
                  :class="name==item.type?'active':''"
                  @click="selectCharge(item)"
                >{{item.type}}</p>
              </div>
            </div>
            <p class="fColor2 ft12 mb15">{{$t('asset.address_width')}}</p>
            <input class="address_inp fColor1 mb30" type="text"  v-model="address" />
            <p class="fColor2 ft12 mb15 flex between alcenter">
              <span>{{$t('td.num')}}</span>
              <span>
                {{$t('asset.canuse')}}：
                <span class="use_num">{{balance || '0.00' | toFixeds}}</span>
                {{coinname}}
                <span></span>
              </span>
            </p>
            <label class="num_lab flex between mb30">
              <input class="fColor1" type="text" :placeholder="min_number" v-model="number" />
              <span>{{coinname}}</span>
            </label>
            <div class="flex mb30">
              <div class="left_inp_wrap flex1">
                <p class="fColor2 ft12 mb15">
                  <span>{{$t('asset.ratenum')}}</span>
                  <span>{{ratenum}}%</span>
                </p>
                <label class="range_lab flex alcenter between">
                  <span>{{number * ratenum /100 | toFixeds}}</span>
                  <span>{{coinname}}</span>
                </label>
              </div>
              <div class="right_inp_wrap flex1">
                <p class="mb15">
                  <span class="fColor2 ft12">{{$t('asset.havenum')}}</span>
                </p>
                <label class="get_lab flex alcenter between">
                  <span>{{number - number * ratenum /100 | toFixeds}}</span>
                  <span>{{coinname}}</span>
                </label>
              </div>
            </div>
            <div v-if="is_show_memo">
               <p class="fColor2 ft12 mb15">memo</p>
              <input class="address_inp fColor1 mb30" type="text" v-model="taginput" placeholder="请输入memo">
            </div>
            <p class="fColor2 ft12 mb15">{{$t('lever.psw')}}</p>
            <input class="address_inp fColor1 mb30" type="password" v-model="password" />

            <div class="flex">
              <div class style="width：80%">
                <p class="ft12 fColor2 mb15">{{$t('asset.reminder')}}</p>
                <ul class="tips_ul ft12 fColor2" style="list-style:disc inside">
                  <li
                    class="tips_li"
                    style="list-style:disc inside"
                    v-for="item in tip_list01"
                  >{{item}}</li>
                </ul>
              </div>
              <div class="flex1 tc">
                <button class="withdraw_btn" @click="mention">{{$t('asset.withdraw')}}</button>
              </div>
            </div>
          </div>
          <!--记录区-->
          <div class="hide_div bd rec-box fColor1" v-if="index == active02">
            <div class="rec-con">
              <div class="rec-title bdb fColor1">
                <span>{{$t('td.num')}}</span>
                <span>{{$t('asset.record')}}</span>
                <span>{{$t('td.time')}}</span>
              </div>
              <ul class="rec-list">
                <li v-for="(reItem,reIndex) in recData" :key="reIndex" class="bdb">
                  <span>{{reItem.value || '0.00' | toFixeds}}</span>
                  <span v-if="lang=='zh'">{{reItem.info}}</span>
                  <span v-if="lang=='en'">{{reItem.type_info_e}}</span>
                  <span v-if="lang=='jp'">{{reItem.type_info_j}}</span>
                  <span v-if="lang=='hk'">{{reItem.type_info_m}}</span>
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
            <input type="text" placeholder="请输入划转数量" />
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
import $ from 'jquery'
import "@/lib/jquery.qrcode.min.js";
import QRCode from 'qrcodejs2'
import qs from 'qs'
export default {
  name: "finance",
  filters: {
    toFixeds: function(value) {
      value = Number(value);
      return value.toFixed(8);
    },
    toFixeds8: function(value) {
      value = Number(value);
      return value.toFixed(8);
    }
  },
  data() {
    return {
      rechargeAmount:"",
      rechargeAddress:"",
      lang:localStorage.getItem("locale") || "en",
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
      password: "",
      asset_list: [],
      tip_list: [this.$t("asset.tips01"), this.$t("asset.tips02")],
      tip_list01: [this.$t("asset.tips01"), this.$t("asset.tips02")],
      page: 1,
      more: this.$t("td.more"),
      balanceList: [
        this.$t("asset.fince_account"),
        this.$t("asset.lever_account")
      ],
      transferData: {
        modalShow: false,
        transferName: "",
        transferBalance: "",
        start: "",
        end: ""
      },
      status: "",
      ishowTag: false,
      extension_code: "", //地址标签
      taginput: "",
      is_show_memo: 0,
      chargeType: [],
      contractAddress: "",
      userId: "",
      currencyName: "",
      selectType: 1,
      name: "",
      labelText: "",
      walletData: [],
      labels:'',
      usdtList:'',
      usdtListKey:"",
    };
  },
  components: {
    indexHeader,
    left
  },
  mounted(){
    console.log("进入了了");
  },
  methods: {
    exchangeAddress(k){
      this.excharge_address=this.usdtList[k];
      this.usdtListKey=k;
      $("#code").html('');
      $("#code").qrcode({
        width: 100, //宽度
        height: 100, //高度
        text: this.excharge_address
      });
    },
    qrcode(text) {
      let that = this
      let qrcode = new QRCode('code', {
        width: 100,
        height: 100,
        text: text,
      })
    },
    goRecord() {
      this.$router.push({ name: "coinRecord" });
    },
    init() {
      var that = this;
      var clipboard = new Clipboard(".copy");
      clipboard.on("success", function(e) {
        layer.alert(that.$t("set.copysuccess"));
      });
      clipboard.on("error", function(e) {
        alert(that.$t("set.copyfail"));
      });
    },
    //充币
    excharge(index, currency, currency_name, addr, is_daibi, types) {
      this.excharge_address = "";
      this.selectType = 1;
      this.chargeType = [];
      if (this.status == 1) {
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
        // var name=is_daibi==1?'EOSTOKEN':currency_name;
        this.sendData(currency, addr);
        this.getNum(currency, currency_name);
      } else {
        layer.alert(this.$t("asset.noopen"));
      }
    },
    submitRecharge(){
        if(!this.rechargeAddress){
          return layer.msg(this.$t('zdy.enterqbdz'));          
        }
        if(!this.rechargeAmount){
          return layer.msg(this.$t('zdy.enterczsl'));          
        }
        layer.load(1);
        this.$ajax({
          url:"/api/wallet/charge_req",
          method:"post",
          headers: { Authorization: this.token },
          data:{
            amount:this.rechargeAmount,
						account:this.rechargeAddress,
            currency: this.currency,
            user_id: localStorage.getItem("user_id"),
          }
        }).then(res=>{
          layer.closeAll();
          layer.msg(res.data.message);
          if(res.data.type=="ok"){
            this.rechargeAmount='';
            this.rechargeAddress='';
          }
        })
    },
    sendData(currency, addr) {
      var that = this;
      $("#code").html("");
      this.$ajax({
        url: "/api/wallet/get_in_address",
        method:'post',
        headers: { Authorization: this.token },
        data: {
          currency: currency,
          user_id: localStorage.getItem("user_id"),
        }
        // headers: { Authorization: that.token }
      })
        .then(res => {
          console.log("看看返回数据");
          console.log(res);
          that.rechargeAmount='';
          that.rechargeAddress='';
          that.usdtList='';
            $("#code").html('');
          if (res.data.type == 'ok') {
            if(res.data.message && !res.data.message.omni && !res.data.message.erc20){
              console.log(1);
                that.excharge_address=res.data.message;
                this.qrcode(res.data.message)
              //   $("#code").qrcode({
              //   width: 100, //宽度
              //   height: 100, //高度
              //   text: res.data.message
              // });
            }else if(!res.data.message.erc20 && !res.data.message.omni){
              console.log(2);
              that.excharge_address='';
            }else if(res.data.message.erc20 && res.data.message.omni){      
              console.log(3);        
                that.usdtList={
                  'erc20':res.data.message.erc20,
                  'omni':res.data.message.omni
                };
                that.usdtListKey='erc20';
                that.excharge_address=res.data.message.erc20;
                //  $("#code").qrcode({
                //   width: 100, //宽度
                //   height: 100, //高度
                //   text: res.data.message.erc20
                // });
                this.qrcode(res.data.message.erc20)
            }else if(res.data.message.omni){
                console.log(4);      
                that.excharge_address=res.data.message.omni;
              // 生成二维码
              // $("#code").qrcode({
              //   width: 100, //宽度
              //   height: 100, //高度
              //   text: res.data.message.omni
              // });
              this.qrcode(res.data.message.omni)
            }else if(res.data.message.erc20){
              console.log(5);   
                  that.excharge_address=res.data.message.erc20;
                  // 生成二维码
                 /*  $("#code").qrcode({
                    width: 100, //宽度
                    height: 100, //高度
                    text: res.data.message.erc20
                  }); */
                  this.qrcode(res.data.message.erc20)
            }
          } 
        })
        .catch(error => {
          console.log(error);
        });
    },
    //提币
    withdraw(index, currency, name, addr, is_show_memo, types) {
      this.selectType = 2;
      // this.is_show_memo = is_show_memo;
       this.currencyType = '';
      this.chargeType = [];
      this.taginput = '';
      if (this.status == 1) {
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
        this.getNum(currency, name);
      } else {
        layer.alert(this.$t("asset.noopen"));
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
          data: { type: 2, currency: currency, page: 1 },
          headers: { Authorization: this.token }
        }).then(res => {
          if (res.data.type == "ok") {
            this.recData = res.data.message.list;
          }
        });
      }
    },
    getNum(currency, currency_type) {
      var that = this;
      that.labelText = "";
      $.ajax({
        url: "/api/" + "wallet/get_info",
        method: "post",
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
            var coinName = "";
            that.coinname = res.message.name;
            that.balance = res.message.change_balance;
            that.walletData = res.message.wallet_data;
            if(res.message.make_wallet == 2){
              that.is_show_memo = true;
            }else{
              that.is_show_memo = false;
            }
            if (res.message.multi_protocol == 1) {
              that.chargeType = res.message.type_data;
              that.contractAddress = res.message.type_data[0].contract_address;
              that.name = res.message.type_data[0].type;
              that.min_number =
                that.$t("asset.minnum") +
                parseFloat(res.message.type_data[0].min_number).toFixed(2);
              that.minnumber = res.message.type_data[0].min_number;
              that.ratenum = res.message.type_data[0].rate;
              that.reachnum = 0.0;
              that.rate = res.message.type_data[0].rate;
              that.currencyType = res.message.type_data[0].type;
              coinName = res.message.type_data[0].name;
              if (res.message.name == "EOSTOKEN") {
                that.ishowTag = true;
              }
              that.extension_code = res.message.extension_code;
              var ids = res.message.type_data[0].id;
              if (
                res.message.wallet_data &&
                res.message.wallet_data.length > 0
              ) {
                res.message.wallet_data.forEach(item => {
                  if (ids == item.currency) {
                    that.labelText = item.label;
                  }
                });
              }
            } else {
              if (
                res.message.wallet_data &&
                res.message.wallet_data.length > 0
              ) {
                that.labelText = res.message.wallet_data[0].label;
              }

              that.contractAddress = res.message.contract_address;
              that.name = res.message.type;

              that.min_number =
                that.$t("asset.minnum") +
                parseFloat(res.message.min_number).toFixed(2);
              that.minnumber = res.message.min_number;
              that.ratenum = res.message.rate;
              that.reachnum = 0.0;
              that.rate = res.message.rate;
              coinName = res.message.name;
              if (res.message.name == "EOSTOKEN") {
                that.ishowTag = true;
              }
              that.extension_code = res.message.extension_code;
            }
            if (that.selectType == 1) {
              that.sendData(that.currency, that.contractAddress);
            } else {
              // that.getAddress(coinName, that.contractAddress);
            }
          } else {
          }
        }
      });
    },
    // 选择充币类型
    selectCharge(options) {
      var that = this;
      that.contractAddress = options.contract_address;
      that.name = options.type;
      that.min_number =
        that.$t("asset.minnum") + parseFloat(options.min_number).toFixed(2);
      that.minnumber = options.min_number;
      that.ratenum = options.rate;
      that.reachnum = 0.0;
      that.rate = options.rate;
      var ids = options.id;
      if (that.walletData.length > 0) {
        that.walletData.forEach(item => {
          if (ids == item.currency) {
            that.labelText = item.label;
          }
        });
      }
      if (that.selectType == 1) {
        that.sendData(that.currency, that.contractAddress);
      } else {
        // that.getAddress(options.name, that.contractAddress);
      }
    },
    // 提币按钮
    mention() {
      var that = this;
      var currency = this.currency;
      var address = this.address;
      var number = this.number;
      var rate = this.rate;
      var min_number = this.minnumber;
      var password = this.password;
      var taginput = this.taginput;
      if (!address) {
        layer.msg(this.$t("asset.enterAdderses"));
        return;
      }
      if (!number) {
        layer.msg(this.$t("asset.enterNum"));
        return;
      }
      if (number - 0 < min_number) {
        return layer.msg(this.$t("asset.lessMin"));
      }
      if (!password) {
        layer.msg(this.$t("lever.ppwd"));
        return;
      }
      // if(this.coinname=='BAS'){
      //   if(!taginput){
      //     return layer.msg('请输入标签')
      //   }
      // }
      $.ajax({
        type: "POST",
        url: "/api/" + "wallet/out",
        data: {
          type: that.currencyType,
          currency: currency,
          number: number,
          rate: rate,
          address: address,
          pay_password: password,
          memo: taginput
        },
        dataType: "json",
        async: true,
        beforeSend: function beforeSend(request) {
          request.setRequestHeader("Authorization", that.token);
        },
        success: function(res) {
          if (res.type == "ok") {
            layer.msg(res.message);
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          } else if (res.type == "not") {
            layer.msg(res.message);
            setTimeout(() => {
              layer.msg(that.$t("set.yorn"), {
                time: 0, //不自动关闭
                btn: [that.$t("set.yes"), that.$t("set.no")],
                yes: function(index) {
                  layer.closeAll();
                  that.$router.push("/bindmpwd");
                }
              });
            }, 1000);
          } else {
            layer.msg(res.message);
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
        layer.msg(that.$t("set.copysuccess"));
      });
      clipboard.on("error", function(e) {
        that.flags = false;
        layer.msg(that.$t("set.recopy"));
      });
    },
    copy2(e) {
      var that = this;
      var clipboard = new Clipboard(".copy2", {
        text: function() {
          return that.labelText;
        }
      });
      clipboard.on("success", function(e) {
        that.flags = true;
        layer.msg(that.$t("set.copysuccess"));
      });
      clipboard.on("error", function(e) {
        that.flags = false;
        layer.msg(that.$t("set.recopy"));
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
            that.asset_list = res.data.message.change_wallet.balance;
            that.totle = res.data.message.change_wallet.usdt_totle;
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
        data: { type: 2, currency: that.currency, page: that.page },
        headers: { Authorization: this.token }
      }).then(res => {
        if (res.data.type == "ok") {
          var datas = that.asset_list;
          for (let i in datas) {
            if (that.currency == datas[i].currency) {
              that.active02 = i;
              if (res.data.message.list.length > 0) {
                that.recData = that.recData.concat(res.data.message.list);
              } else {
                that.more = that.$t("cuy.nomore");
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
    },
    // getAddress(name, addr) {
    //   var that = this;
    //   that.address = "";
    //    this.$ajax({
    //     url: this.API + "/api/wallet/get_in_address",
    //     method: "post",
    //     data: {
    //       user_id: localStorage.getItem("user_id"),
    //       currency: that.currency,
    //     }
    //   }).then(res => {
    //     if (res.data.type == 'ok') {
    //       if(res.data.message.omni){
    //           that.address=res.data.message.omni;
    //       }else{
    //           that.address=res.data.message;
    //       }          
    //     } else {
    //       that.address = "";
    //       // layer.msg(res.data.errorinfo)
    //       if (res.data.errorinfo == "请先设置提币地址") {
    //         var lang = localStorage.getItem("locale");
    //         if (lang == "jp") {
    //           layer.msg("まずトークンの住所を設定してください");
    //         } else if (lang == "en") {
    //           layer.msg("Please set the withdrawal address first");
    //         } else if (lang == "hk") {
    //           layer.msg("請先設定提幣地址");
    //         } else {
    //           layer.msg(res.data.errorinfo);
    //         }
    //       }
    //     }
    //   });
    //   // this.$ajax({
    //   //   url: this.API + "/wallet/get_in_address",
    //   //   method: "GET",
    //   //   params: {
    //   //     user_id: localStorage.getItem("user_id"),
    //   //     currency: name,
    //   //     contract_address: addr
    //   //   }
    //   // }).then(res => {
    //   //   if (res.data.code == 0) {
    //   //     that.address = res.data.data.address;
    //   //   } else {
    //   //     that.address = "";
    //   //     // layer.msg(res.data.errorinfo)
    //   //     if (res.data.errorinfo == "请先设置提币地址") {
    //   //       var lang = localStorage.getItem("locale");
    //   //       if (lang == "jp") {
    //   //         layer.msg("まずトークンの住所を設定してください");
    //   //       } else if (lang == "en") {
    //   //         layer.msg("Please set the withdrawal address first");
    //   //       } else if (lang == "hk") {
    //   //         layer.msg("請先設定提幣地址");
    //   //       } else {
    //   //         layer.msg(res.data.errorinfo);
    //   //       }
    //   //     }
    //   //   }
    //   // });
    // }
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
.submit-recharge button{
  cursor: pointer;
  color: #fff;
  background: #5697f4;
  width:150px;
  display: block;
  text-align: center;
  padding: 10px 0;
}
.usdtlist span{
    display: inline-block;
    padding: 10px 20px; 
    border: 1px solid #5697f4;
    margin-right: 20px;
}
.usdtList-active{
    padding: 10px 20px;
    background: #5697f4;
    display: inline-block; 
}
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
  // border-bottom: 1px solid #1e2c42;
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
  // border: 1px solid #1e2c42;
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
  // background: #1e2c42;
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
  padding: 15px 20px;
  min-width: 160px;
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
  border: 10px solid #fff;
}
.hide {
  display: none;
}
.rec-box {
  .rec-con {
    margin: 10px;
    padding: 0 20px;
    // background: #171c2b;
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
      // border-top: 1px solid #2e394c;
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
.pb10 {
  padding: 10px;
}
.mb10 {
  margin-bottom: 10px;
}
</style>





// WEBPACK FOOTER //
// src/view/accounts/dealFinance.vue