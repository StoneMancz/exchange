<template>
  <div id="legal-shop-detail" class="whites">
    <div class="top flex bgf8">
      <div class="top-t flex bod_rc">
        <div class="logo ft18" v-if="info.name">{{(info.name).charAt(0)}}</div>
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
      <div class="submit flex">
        <div @click="fb">{{$t('fat.submit')}}</div>
      </div>
      <div class="submit flex">
        <div @click="$router.push({path:'/balancelog',query:{id:sellerId}})">{{$t('fat.journal')}}</div>
      </div>
    </div>
    <div class="md flex bgf8">
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
        <div class="flex">
          <div>{{$t('fat.type')}}：</div>
          <div>
          <span  :class="{'now':filterPms.type == 'sell'}" @click="filterPms.type = 'sell';getList()">{{$t('fat.mysell')}}</span>
          <span :class="{'now':filterPms.type == 'buy'}" @click="filterPms.type = 'buy';getList()">{{$t('fat.mybuy')}}</span>
          </div>
        </div>
        <div class="flex">
          <div>{{$t('fat.status')}}：</div>
          <div>
            <span  :class="{'now':filterPms.wasDone == 0}" @click="filterPms.wasDone = 0;getList()">{{$t('td.nofinish')}}</span>
          <span :class="{'now':filterPms.wasDone == 1}" @click="filterPms.wasDone = 1;getList()">{{$t('td.finished')}}</span>
          <span :class="{'now':filterPms.wasDone == 2}" @click="filterPms.wasDone = 2;getList()">{{$t('fat.backdone')}}</span>

          </div>
        </div>
      </div>
      <div class="ul-head tc bdb ">
        <div class="w10 tl">{{$t('td.currency')}}</div>
        <div class="w15">{{$t('td.num')}}</div>
        <div class="w25">{{$t('td.limit')}}</div>
        <div class="w15">{{$t('td.price')}}</div>
        <div class="w10">{{$t('td.method')}}</div>
        <div class="tr">{{$t('td.do')}}</div>
      </div>
      <ul :class="[showWhich+'-box']" >
        <li v-for="(item,index) in list" :key="index" :class="[item.type == 'buy'?'buy-item':'sell-item']" class="bod_bc tc bdb">
          <div class="w10 tl">{{item.currency_name}}</div>
          <div class="w15">{{item.surplus_number || '0.000' | toFixeds}}</div>
          <div class="w25">{{item.limitation.min || '0.000' | toFixeds}}-{{item.limitation.max || '0.000' | toFixeds}}</div>
          <div class="w15">{{item.price || '0.000' | toFixeds}} {{item.coin_code}}</div>
          <div class="flex alcenter center w10">
						<img v-if="item.way == 'ali_pay'" src="../assets/images/zfb_icon.png" /> 
						<img v-if="item.way == 'we_chat'" src="../assets/images/wx_icon.png" />
						<img v-if="item.way == 'bank'" src="../assets/images/bank_icon.png" />
					</div>
          <!-- <div class="w10">{{item.way_name}}</div> -->
          <div class="tr">
            <router-link tag="span" :to="{path:'/shopLegalRecord',query:{id:item.id}}">{{$t('fat.seeOrder')}}</router-link>
            <span @click="changeOrder('back_send',item.id)" v-if="item.is_done==0">{{$t('fat.withdraw')}}</span>
            <!-- <span @click="changeOrder('error_send',item.id)" v-if="item.is_done!=1">{{$t('fat.abnormal')}}</span> -->
            <span @click="changeOrder('down_send',item.id)" v-if="item.is_done==0&&item.is_shelves==1">{{$t('fat.lowershelf')}}</span>
          </div>
        </li>
      </ul>
      <div class="more" @click="getList(true)" v-if="list.length">{{$t('td.more')}}</div>
      <div class="more" v-else>{{$t('td.nomore')}}</div>
    </div>
    <div class="submit-box white" v-if="isShow">
      <div class="content">
        <p class="close" @click="close">X</p>
        <div class="tab bdb">
          <div>{{$t('fat.psType')}}：</div>
         <!-- <div :class="{'now':true}">出售</div> -->
         <!-- <div>求购</div> -->
         <div :class="{'now':index==current}" v-for="(item,index) in typeList" @click="changeType(index,item.type)">{{item.name}}</div>
        </div>
        <div class="flex">
          <span>{{$t('td.currency')}}：</span>
          <span>{{info.currency_name}}</span>
        </div>
        <div class="flex">
          <span>{{$t('td.method')}}：</span>
          <select name="coins" id="method" class="flex2 ptb10 plr10 bd" v-model="way">
            <option value="-1">{{$t('fat.pselect')}}</option>
            <option value="ali_pay">{{$t('fat.alipay')}}</option>
            <option value="we_chat">{{$t('fat.wechat')}}</option>
            <option value="bank">{{$t('fat.bank')}}</option>
          </select>
        </div>
        <div class="flex">
          <span>{{$t('td.coincode')}}：</span>
          <select name="ucoins" id="umethod" class="flex2 ptb10 plr10 bd" v-model="coin">
            <option value="-1">{{$t('fat.pselect')}}</option>
            <option value="CNY">CNY</option>
            <option value="USD">USD</option>
            <option value="JPY">JPY</option>
          </select>
        </div>
        <div class="flex">
          <span>{{$t('td.price')}}：</span>
          <input type="text" name="" id="" v-model="price">
        </div>
        <div class="flex">
          <span>{{$t('td.num')}}：</span>
          <input type="text" v-model="total_number">
        </div>
        <div class="flex">
          <span>{{$t('fat.minNum')}}：</span>
          <input type="text" v-model="min_number">
        </div>
        <div class="flex">
          <span>{{$t('fat.maxNum')}}：</span>
          <input type="text" v-model="max_number">
        </div>
        <div class="flex">
          <span>{{$t('lever.psw')}}：</span>
          <input type="password" v-model="password">
        </div>
        <div class="btn curPer" @click="fabu">{{$t('fat.submit')}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current:0,
      token: "",
      sellerId: "",
      info: { lists: { data: [] } },
      showWhich: "none",
      isShow:false,
      showDetail: false,
      detail: { money: "", num: "" },
      timer: "",
      rate:'--',
      filterPms: { id: "", page: 1, wasDone: 0, type: "sell" },
      list: [],
      submitPms:{type:'sell'},
      typeList:[{name:this.$t('td.sell'),type:'sell'},{name:this.$t('fat.wantBuy'),type:'buy'}],
      type:'sell',
      way:-1,
      price:'',
      total_number:'',
      min_number:'',
      max_number:'',
      password:'',
      coin:-1

    };
  },
  filters: {
			toFixeds: function(value) {
				value = Number(value);
				return value.toFixed(3);
			}
		},
  created() {
    this.token = window.localStorage.getItem("token") || "";
    if (this.token) {
      this.sellerId = this.$route.query.id || "";
      this.getSellerInfo();
      this.getList();
    }
  },
  methods: {
    // 切换发布类型
    changeType(index,type){
      this.current=index;
      this.type=type;
      this.way=-1;
      this.price='';
      this.min_number='';
      this.max_number='';
      this.password=''
      this.total_number=''
      this.coin=-1;
    },
    // 获取默认数据
    getSellerInfo(more) {
      this.showWhich = "none";
      if (!more) {
        this.page = 1;
      }
      let i = layer.load();
      this.$ajax({
        url: "/api/seller_info",
        params: {
          id: this.sellerId,
          page: 1
        },
        headers: { Authorization: this.token }
      }).then(res => {
        layer.close(i);
        if (res.data.type == "ok") {
          this.info = Object.assign({}, res.data.message);
          var result=(res.data.message.done/res.data.message.total*100).toFixed(2);
          this.rate=(result=='NaN'?'0.00':result+'%');
          this.currency_id = res.data.message.currency_id;
        }
      });
    },
    getList(more = false) {
      var that = this;
      var pms = {};
      if (!more) {
        this.filterPms.page = 1;
      }
      pms.page = this.filterPms.page;
      if (this.filterPms.type != "none") {
        pms.type = this.filterPms.type;
      }
      // if (this.filterPms.wasDone != "none") {
      //   pms.was_done = this.filterPms.wasDone;
      // }
      pms.is_done = this.filterPms.wasDone;
      pms.id = this.sellerId;
      var i = layer.load();
      this.$ajax({
        url: "/api/seller_trade",
        params: pms,
        headers: { Authorization: this.token }
      }).then(res => {
        layer.close(i);
        if (res.data.type == "ok") {
          var msg = res.data.message;
          if (more) {
            if (msg.data.length) {
              this.list = msg.data.concat(this.list);
              this.filterPms.page += 1;
            } else {
              layer.msg(that.$t('td.nomore'));
            }
          } else {
            this.list = msg.data;
            if (msg.data.length) {
              this.filterPms.page += 1;
            }
          }
        }
      });
    },
    changeOrder(url, id) {
      var that = this;
      var url=url;
      var id=id;
      layer.prompt({title: that.$t('td.pwd'), formType: 1,btn:[that.$t('td.confirm'), that.$t('td.canceil')]}, function(pass, index){
        that.password=pass;
        that.$ajax({
          url: "/api/" + url,
          method: "post",
          data: { id:id,password:that.password },
          headers: { Authorization: that.token }
        }).then(res => {
          if (res.data.type == "ok") {
            layer.msg(res.data.message);
            that.getList();
          }else{
            layer.msg(res.data.message);
          }
        });
      layer.close(index);
			});
    },
    setDetail(item) {
      this.detail = Object.assign({ which: "money", money: "", num: "" }, item);
      this.showDetail = true;
      var time = 60;
      var that = this;
      that.timer = setInterval(function() {
        time--;
        that.$refs.remainTime.innerHTML = time;
        if (time == 0) {
          that.showDetail = false;
          clearInterval(that.timer);
        }
      }, 1000);
    },
    buySell() {
      var that = this;
      // this.detail = Object.assign({which:'money'},item)
      // var value = this.detail.which == 'money'?detail.money:detail.num;
      var value = "";
      if (this.detail.which == "money") {
        value = this.detail.money;
        if (value == "") {
          return;
        } else if (value - 0 - this.detail.limitation.min < 0) {
          layer.msg(that.$t('fat.notlow'));
          return;
        } else if (value - 0 - this.detail.limitation.max > 0) {
          layer.msg(that.$t('fat.nothigh'));
          return;
        }
      } else {
        value = this.detail.num;
        if (value == "") {
          return;
        } else if (value > this.detail.surplus_number) {
          layer.msg(that.$t('fat.notnum'));
          return;
        }
      }
      this.$ajax({
        url: "/api/do_legal_deal",
        method: "post",
        data: { means: this.detail.which, value: value, id: this.detail.id },
        headers: { Authorization: this.token }
      }).then(res => {
        this.showDetail = false;
        if (res.data.type == "ok") {
          var message = res.data.message;
          layer.msg(message.msg);
          if (this.detail.type == "sell") {
            this.$router.push({
              path: "/legalPay",
              query: { id: msg.data.id }
            });
          } else {
            this.$router.push({
              path: "/components/payCannel",
              query: { id: msg.data.id }
            });
          }
        }
      });
    },
    cancel() {
      clearInterval(this.timer);
      this.showDetail = false;
    },
    // 发布弹层
    fb(){
      this.isShow=true;
      this.way=-1;
      this.price='';
      this.min_number='';
      this.max_number='';
      this.password=''
      this.total_number=''
      this.coin=-1;
    },
    // 弹层关闭
    close(){
      this.isShow=false;
    },
    // 发布
    fabu(){
      var that = this;
      var type = this.type;
      var way = this.way;
      var coin = this.coin;
      var price = this.price;
      var total_number = this.total_number;
      var min_number = this.min_number-0;
      var max_number = this.max_number-0;
      var currency_id = this.currency_id;
      var password = this.password;
      if(way<0){
        return layer.msg(that.$t('ctc.payway'))
      }
      if(coin<0){
        return layer.msg(that.$t('td.pcoin'))
      }
      if(!price || price<=0){
        return layer.msg(that.$t('ctc.pprice'))
      }
      if(!total_number||total_number<=0){
        return layer.msg(that.$t('fat.pnums'))
      }
      if(!min_number ||min_number<=0){
        return layer.msg(that.$t('fat.pmin'))
      }
      if(!max_number ||max_number<=0){
        return layer.msg(that.$t('fat.pmax'))
      }
      if(max_number<min_number){
        return layer.msg(that.$t('fat.pnot'))
      }
      if(!password){
        return layer.msg(that.$t('td.pwd'))
      }
      this.$ajax({
        url: "/api/" + 'legal_send',
        method: "post",
        data: { 
          type:this.type,
          way: this.way,
          price :this.price,
          total_number:this.total_number,
          min_number:min_number,
          max_number:max_number,
          currency_id :this.currency_id,
          password:this.password,
          coin_code:coin
         },
        headers: { Authorization: this.token },
      }).then(res => {
        if (res.data.type == "ok") {
          layer.msg(res.data.message);
          this.isShow=false
          this.getSellerInfo();
          this.getList();
        }else{
          layer.msg(res.data.message);
        }
      });
    }
  },
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
#legal-shop-detail {
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
    > .submit {
      align-items: center;
      justify-content: flex-end;
      > div {
        border-radius: 2px;
        margin-left: 30px;
        color: #fff;
        padding: 0 16px;
        font-size: 14px;
        height: 30px;
        line-height: 30px;
        background: #7a98f7;
        cursor: pointer;
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
    padding: 5px 30px 16px;
    > .tab {
      margin: 16px 0;
      > .flex {
        > div:first-child {
          width: 80px;
        }
      }
      span {
        margin-right: 20px;
        cursor: pointer;
      }
      .now {
        color: #7a98f7;
        font-weight: 600;
      }
    }
    > .ul-head {
      height: 50px;
      > div {
        // text-align: center;
        float: left;
      }
      > div:last-child {
        float: right;
      }
    }
    > ul {
      li {
        padding: 16px 0;
        height: 62px;
        // border-bottom: 1px solid #ddd;
        > div {
          float: left;
        }
        > div:last-child {
          float: right;
        }
        // > div:nth-child(3) {
        //   flex: 2;
        // }
        // > div:first-child {
        //   text-align: left;
        //   flex: 0.5;
        // }
        > div:last-child {
          // text-align: right;
          // display: flex;
          height: 30px;
          span {
            float: right;
            background: #7a98f7;
            padding: 0 12px;
            border-radius: 2px;
            color: #fff;
            cursor: pointer;
            font-size: 12px;
            margin-right: 5px;
          }
        }
      }
    }
    > .buy-box > .sell-item,
    .sell-box > .buy-item {
      display: none;
    }
    .more {
      padding: 20px 20px;
      text-align: center;
      cursor: pointer;
    }
  }
  > .submit-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    > .content {
      margin: 70px auto 0;
      border-radius: 4px;
      width: 440px;
      padding: 20px 30px 26px 30px;
      background: #171c2b;
      line-height: 30px;
      position: relative;
      .close{
        position: absolute;
        top: 5px;
        right: 10px;
        cursor: pointer;
      }
      >.tab{
        display: flex;
        >div{
          margin-right: 50px;

        }
        .now{
          font-weight: 600;
          padding-bottom: 3px;
          color: #7a98f7;
          border-bottom: 2px solid #7a98f7;
        }
      }
      >.btn{
        background: #7a98f7;
        color: #fff;
        border-radius: 2px;
        text-align: center;
        line-height: 40px;
      }
      > .flex {
        // display: flex;
        margin-bottom: 20px;
        span{
          width: 130px;
        }
        input,select{
          border-radius: 2px;
          border: 1px solid #1B2A3E;
          padding: 0 16px;
          flex:1;
          background: #1a243b;
          color: #fff;
        }
      }
      > .tab {
        margin: 10px 0 20px;
        span {
          margin-right: 20px;
        }
        cursor: pointer;
        > .selected {
          font-weight: bold;
          color: #7a98f7;
        }
      }
      > .inp {
        display: flex;
        border-radius: 2px;
        justify-content: space-between;
        border: 1px solid #1B2A3E;
        padding: 3px 16px;
        span {
          padding-left: 10px;
          margin-left: 10px;
        }
        .all {
          border-left: 1px solid #1B2A3E;
          font-weight: 600;
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
// src/components/LegalShopDetail.vue