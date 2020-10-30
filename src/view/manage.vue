<template>
  <div class="box">
    <div class="account">
      <div class="topcontent ft20 bg-part flex between">
        <span class="whites">
          {{$t('coin.bao')}}
        </span>
        <div class="flex alcenter">
          <p class="plr10 yellow ft14 pointer" @click="goDetail(139)">存币规则</p>
          <router-link :to="{ name: 'manageList'}"  class="ft14 blue">{{$t('coin.mybao')}}</router-link> 
        </div>
      </div>
      <div class="content">
        <div class="con_box">
          <div class="contentBK fColor1 pdlr20 pdtb20 ft12" style="height:700px">
            <div class="mt10 mauto" style="width:60%;">
                <div class="flex alcenter between mt30">
                    <span class="w10 mr20 wt150 ft16">{{$t('asset.currency')}}：</span>
                    <!-- <select name id class="w10 flex1 bd input_color pointer" v-model="addId" @change="setCoin($event)">
                        <option
                            :value="item.currency"
                            v-for="(item,index) in list"
                            :key="index"
                        >{{item.currency_name}}</option>
                    </select> -->
                    <div class="flex1 bd input_color ptb10 plr10 ft18" v-if="list[index]">{{list[index].currency_name}}</div>

                </div>
                <div class="flex alcenter between mt30">
                    <span class="w10 mr20 wt150 ft16">天数：</span>
                    <select name id class="w10 flex1 bd input_color pointer" v-model="dayid" @change="setDay($event)">
                        <option
                            :value="item.id"
                            v-for="(item,index) in daylist"
                            :key="index"
                        >{{item.day}}</option>
                    </select>
                </div>
                <div class="flex alcenter between mt30">
                    <span class="wt150 mr20 ft16">{{$t('td.num')}}：</span>
                    <input type="text" class="flex1 bd input_color" :placeholder="$t('fat.pnums')" v-model="number" />
                </div>
               <div class="flex alcenter between mt30">
                    <span class="wt150 mr20 ft16">{{$t('lever.psw')}}：</span>
                    <input type="password" class="flex1 bd input_color" :placeholder="$t('lever.ppwd')" v-model="password" />
                </div>
                <div class="flex alcenter mt30">
                    <span class="wt150 mr20 ft16">{{$t('coin.total')}}：</span>
                    <span>{{total}} {{code}}</span>
                </div>
                <div class="flex alcenter mt30">
                    <span class="wt150 mr20 ft16">收益率：</span>
                    <span>{{(rate-0)*100}} %</span>
                </div>
                <div class="add tc mt40">
                <div class="baseBtn pointer" @click="confirm">{{$t('td.confirm')}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "manage",
  data() {
    return {
      index:0,
      token: "",
      list: [],
      addId:'',
      number:'',
      password:'',
      total:0,
      code:'',
      daylist:[],
      dayid:'',
      current:'',
      rate:0
    };
  },
  components: {
  },
  created() {
    this.getCoins();
    this.getDays();
  },
  methods: {
    // 公告详情
    goDetail(id) {
      var id = id;
      this.$router.push({
        name: "noticeDetail",
        query: { id: id }
      });
    },
    getCoins() {
      this.token = localStorage.getItem("token") || "";
      this.$ajax({
        url: "/api/wallet/depositlist",
        method: "POST",
        headers: { Authorization: this.token }
      }).then(res => {
        if (res.data.type == "ok") {
          this.list = res.data.message.deposit_wallet.balance;
          console.log(this.list)
          this.addId = this.list[0].currency;
          this.total = this.list[0].deposit_balance;
          this.code = this.list[0].currency_name;
        }
      });
    },
    getDays() {
      this.token = localStorage.getItem("token") || "";
      this.$ajax({
        url: "/api/wallet/deposit_setup",
        headers: { Authorization: this.token }
      }).then(res => {
        if (res.data.type == "ok") {
          this.daylist = res.data.message;
          this.dayid = this.daylist[0].id;
          this.rate = this.daylist[0].rate;
        }
      });
    },
    setCoin(e) {
      var that = this;
      let id = e.target.value;
      this.list.map((item,index)=>{
          if(item.currency==id){
            that.total = that.list[index].deposit_balance;
            that.code = that.list[index].currency_name;
          }
      })
    },
    setDay(e) {
      var that = this;
      let id = e.target.value;
      this.daylist.map((item,index)=>{
          if(item.id==id){
            that.rate = that.daylist[index].rate;
          }
      })
    },
    confirm() {
        var that = this;
        if(!that.number){
            return layer.msg('请输入数量')
        }
        if(!that.password){
            return layer.msg('请输入交易密码')
        }
        this.$ajax({
            url: "/api/record/submit",
            method: "POST",
            data:{
              set_id:that.dayid,
              currency_id:that.addId,
              balance:that.number,
              password:that.password
            },
            headers: { Authorization: this.token }
        }).then(res => {
            layer.msg(res.data.message);
            if (res.data.type == "ok") {
              that.index = 0;
              that.number='';
              that.password='';
              that.getCoins();
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
    //     this.$ajax({
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
.ptb10{
  padding-top: 10px;
  padding-bottom: 10px;
}
.plr10{
  padding-left: 10px;
  padding-right: 10px;
}
</style>





// WEBPACK FOOTER //
// src/view/manage.vue