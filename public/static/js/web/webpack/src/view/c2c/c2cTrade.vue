<template>
  <div id="c2c-box" class="flex">
    <div class="c2c-l">
        <left></left>
    </div>
    <div class="c2c-r ft14">
      <!-- <div class="title-top flex ft20">
        <p v-for="(item,index) in topType" :class="{'active':index==current}" @click='changeType(index,item.type,item.title)'>{{item.title}}</p>
      </div> -->
      <div class="listbox">
        <div class="flex flextitle">
          <span>{{$t('fat.type')}}</span>
          <span class="tc">{{$t('td.num')}}</span>
          <span class="tc">{{$t('td.tradeTotal')}}</span>
          <span class="tc">{{$t('td.method')}}</span>
          <span class="tc">{{$t('td.time')}}</span>
          <span class="tc">{{$t('fat.status')}}</span>
          <span class="tr">{{$t('td.do')}}</span>
        </div>
        <ul>
          <li v-for="(item,index) in list" :key="index" class="flex alcenter curPer">
            <div class="flex alcenter">
              <p :class="['head',{'sell ': item.type =='buy'}]">{{item.type=='sell'?$t('td.sell'):$t('td.buy')}}</p>
              <span class="currencyName ml5 blue">{{item.currency_name}}</span>
            </div>
            <div class="tc">
              <span>{{item.number || '0.00' | tofixed}}</span>
            </div>
            <div class="tc light_green">{{item.deal_money || '0.00' | tofixed}} {{item.coin_code}}</div>
            <div class="tc">
              <img v-if="item.way_name == '支付宝'" src="../../assets/images/zfb_icon.png" />
              <img v-else-if="item.way_name == '微信'" src="../../assets/images/wx_icon.png" />
              <img v-else src="../../assets/images/bank_icon.png" />
            </div>
            <div class="tc">{{item.create_time}}</div>
            <div class="tc">
              <div v-if="item.is_sure==0">{{$t('td.nofinish')}}</div>
              <div v-if="item.is_sure==1">{{$t('td.finished')}}</div>
              <div v-if="item.is_sure==2">{{$t('td.ceiled')}}</div>
              <div v-if="item.is_sure==3">{{$t('td.payed')}}</div>
            </div>
            <div class="tr">
              <button class="btn" @click="getDetail(item.id)">{{$t('ctc.detail')}}</button>
            </div>
          </li>
          <div class="tc ft12 gray mt20 curPer" v-if="list.length>=10&&showmore" @click="getMore()">{{$t('td.more')}}</div>
        </ul>
      </div>
    </div>
    <!-- =========详情弹窗========== -->
    <div class="mask ft14" v-if="showDetail">
      <div class="m-content">
        <div class="title">
          <div>{{$t('ctc.detail')}}</div>
          <div @click="showDetail = false">x</div>
        </div>
        <div>
          <span>{{$t('fat.status')}}:</span>
          <span v-if="detail.is_sure==0">{{$t('td.waitpay')}}</span>
          <span v-if="detail.is_sure==1">{{$t('td.finished')}}</span>
          <span v-if="detail.is_sure==2">{{$t('td.ceiled')}}</span>
          <span v-if="detail.is_sure==3">{{$t('td.payed')}}</span>
        </div>
        <div v-if="detail.type=='sell'">
          <div>
            <span>{{$t('td.seller')}}：</span><span>{{detail.seller_name}}</span>
          </div>
          <div>
            <span>{{$t('ctc.payinfo')}}：</span><span>{{detail.way_name}}</span>
          </div>
          <div v-if="(detail.is_sure==0)&&(detail.way_name=='支付宝'||detail.way_name=='微信')">
            <span>{{$t('ctc.account')}}：</span>
            <span v-if="detail.way_name=='支付宝'">{{detail.sell_cash_info.alipay_account}}</span>
            <span v-if="detail.way_name=='微信'">{{detail.sell_cash_info.wechat_account}}</span>
          </div>
          <div v-if="(detail.is_sure==0)&&(detail.way_name!='支付宝' ||detail.way_name!='微信')">
            <span>开户行：</span><span>{{detail.sell_cash_info.bank_name}}</span>
          </div>
          <div v-if="detail.is_sure==0">
            <span>{{$t('ctc.cardnum')}}：</span><span>{{detail.sell_cash_info.bank_account}}</span>
          </div>
          <div>
            <span>{{$t('ctc.Payee')}}：</span><span>{{detail.hes_realname}}</span>
          </div>
        </div>
        <div>
          <span>{{$t('td.callWay')}}：</span><span>{{detail.seller_phone}}</span>
        </div>
        <div>
          <span>{{$t('td.num')}}：</span><span>{{detail.number || '0.00' | tofixed}}</span>
        </div>
        <div>
          <span>{{$t('td.price')}}：</span><span>{{detail.price || '0.00' | tofixed}} {{detail.coin_code}}</span>
        </div>
        <div v-if="detail.type=='sell'">
          <span>{{$t('lever.rate')}}：</span><span>{{detail.out_fee || '0.00' | tofixed}}</span>
        </div>
        <div>
          <span>{{$t('td.total')}}：</span><span>{{detail.deal_money || '0.00' | tofixed}} {{detail.coin_code}}</span>
        </div>
        <div>
          <span>{{$t('td.placeTime')}}：</span><span>{{detail.create_time}}</span>
        </div>
        <div>
          <span>{{$t('td.renum')}}:</span><span>{{detail.id}}</span>
        </div>
        <!-- btnc -->
        <div class="flex around btnbox mt20" v-if="detail.is_sure==0&&detail.type=='sell'">
          <div class="ceilorder tc" @click="ceilOrder(detail.id)">{{$t('fat.odCeil')}}</div>
          <div class="surepay tc" @click="sureOrder(detail.id)">{{$t('fat.imPay')}}</div>
        </div>
        <div class="mt20 btnbox" v-if="detail.is_sure==3&&detail.type=='buy'">
          <div class="surepay tc" @click="surePayed(detail.id)">{{$t('fat.receivePays')}}</div>
        </div>
      </div>            
    </div>
  </div>
</template>
<script>
import left from '@/view/c2c/leftc2c'
import Vue from 'vue'
	Vue.filter('circle', function (value) {
		return value.substring(0,1)
	})
export default {
    components:{left},
    data(){
      return{
        token:'',
        current:0,
        type:'sell',
        page:1,
        list:[],
        legal_id:'',
        classify:this.$t('fat.wantBuy'),
        topType:[{'title':this.$t('fat.wantBuy'),"type":"buy"},{'title':this.$t('td.sell'),"type":"sell"}],
        showDetail:false,
        detail:[],
        showmore:true,
        password:''
      }
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
    created(){
        this.token = window.localStorage.getItem("token") || "";
        if (this.token == "") {
          this.$router.push("/components/login");
        };     
        this.getList();
    },
    methods:{
      changeType(index,type,title){
        this.current=index;
        this.classify=title;
        this.type=type;
        this.list=[];
        this.page=1;
        this.getList(type);
      },
      // 获取买入列表
      getList() {
        let i = layer.load();
        this.$http({
          url: "/api/c2c_user_deal?&page=" + this.page,
          method: "get",
          headers: { Authorization: this.token }
        }).then(res => {
          layer.close(i);
          if (res.data.type == "ok") {
            let listdata = res.data.message.data;
            if (listdata.length != 0) {
              this.list = this.list.concat(listdata);
              this.page += 1;
            }
            if(listdata.length<10){
              this.showmore=false
            }
          }
        });
      },
      // 加载更多
      getMore(){
        this.getList();
      },
      // 详情
      getDetail(id) {
        var i=layer.load();
        var that =this;
        this.$http({
          url: "/api/c2c_deal?id=" + id,
          headers: { Authorization: this.token }
        }).then(res => {
          layer.close(i);
          if (res.data.type == "ok") {
            this.detail=res.data.message;
            this.showDetail = true;
          }
        });
    },
    // 取消订单
    ceilOrder(id){
      var that = this;
      // layer.confirm(that.$t('ctc.ceilConfirm'), {
      //   btn: [that.$t('td.confirm'), that.$t('td.canceil')] 
      // }, function(){
      //   that.orderCeil(id);
      // }, function(){

      // });
      layer.prompt({title: that.$t('td.pwd'), formType: 1,btn:[that.$t('td.confirm'), that.$t('td.canceil')]}, function(pass, index){
        that.password=pass;
        that.orderCeil(id,index)
      
      });
    },
    orderCeil(id,index){
      var that = this;
      var i=layer.load();
      that.$http({
        url: "/api/c2c/user_legal_pay_cancel",
        method: "post",
        data:{id:id,password:that.password},
        headers: { Authorization: that.token }
      }).then(res => {
        layer.close(i);
        if (res.data.type == "ok") {
          layer.msg(res.data.message);
          that.page=1;
          that.list=[];
          that.getList();
          that.showDetail = false;
        }else{
          layer.msg(res.data.message)
        }
        layer.close(index);
      });
    },
    // 确认我已付款
    sureOrder(id){
      var that = this;
      layer.confirm(that.$t('ctc.paySeller'), {
        btn: [that.$t('td.confirm'), that.$t('td.canceil')] //按钮
      }, function(){
        layer.closeAll();
        layer.prompt({title: that.$t('td.pwd'), formType: 1,btn:[that.$t('td.confirm'), that.$t('td.canceil')]}, function(pass, index){
          that.password=pass;
          that.orderSure(id,index);
      });

      }, function(){
        // layer.msg('取消成功');
      });
    },
    orderSure(id,index){
      var that = this;
      var i=layer.load();
      that.$http({
        url: "/api/c2c/user_legal_pay",
        method: "post",
        data:{id:id,password:that.password},
        headers: { Authorization: that.token }
      }).then(res => {
        layer.close(i);
        layer.close(index);
        if (res.data.type == "ok") {
          layer.msg(res.data.message);
          that.page=1;
          that.list=[];
          that.getList();
          that.showDetail = false;
        }else{
          layer.msg(res.data.message);
        }
      });
    },
    // 确认我已收款
    surePayed(id){
      var that = this;
      // layer.confirm(that.$t('ctc.payBuyer'), {
      //   btn: [that.$t('td.confirm'), that.$t('td.canceil')] 
      // }, function(){
      layer.prompt({title: that.$t('td.pwd'), formType: 1,btn:[that.$t('td.confirm'), that.$t('td.canceil')]}, function(pass, index){
        that.password=pass;  
        that.payedSure(id,index);
        
			});
      // }, function(){

      // });
    },
    payedSure(id,index){
      var that = this;
      var i=layer.load();
      that.$http({
        url: "/api/c2c/legal_deal_user_sure",
        method: "post",
        data:{id:id,password:that.password},
        headers: { Authorization: that.token }
      }).then(res => {
        layer.close(i);
        if (res.data.type == "ok") {
          layer.msg(res.data.message);
          that.page=1;
          that.list=[];
          that.getList();
          that.showDetail = false;
          layer.close(index);
        }else{
          layer.msg(res.data.message);
          layer.close(index);
        }
      });
    }
  },
}
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
.layui-layer-dialog .layui-layer-content{
  color: #fff;
}
.layui-layer-loading{
  background-color: transparent;
}
#c2c-box {
  margin: 10px 0 10px;
  color: #c7cce6;
  .ml5{margin-left: 5px}
  .c2c-r{
    .title-top {
      p{
        margin-right: 30px;
        padding: 5px 0;
        cursor: pointer;
      } 
    }
    .coin-select{
      p{
        margin-right: 10px;
        cursor: pointer;
      }
      .select{
        color: #7a98f7;
      }
    }
    .listbox{
      .flextitle{
        padding: 20px 0;
        border-bottom: 1px solid #242840;
        span{
          flex:1;
        }
      }
      li{
        padding: 10px 0;
        >div{
          flex: 1;
          // line-height: 36px;
        }
        .blue{
          color: #3b68bb;
          font-weight: bolder;
        }
        .light_green{
          color: #489972;
          font-weight: 600;
        }
        .head{
          width: 36px;
          height: 36px;
          border-radius: 50%;
          margin-right: 10px;
          background: #5D8CC2;
          color: #fff;
          text-align: center;
          font-size: 14px;
          line-height: 36px;
        }
        .sell{
          background: #e35744;
        }
        .btn{
          border-radius: 3px;
          color: white;
          background-color: #638BD4;
          cursor: pointer;
          min-height: 33px;
          min-width: 80px;
          font-size: 14px;
          font-weight: 600;
          border: none;
        }
      }
      li:nth-child(even){
        background: #242840;
      }
      li:last-child{
        border-bottom: 1px solid #242840;
      }
    } 
  }

  > .c2c-l {
    margin: 0 10px;
    padding: 10px;
    background: #1a243b;
    width: 23%;
    li {
      padding: 0 20px;
      justify-content: space-between;
      cursor: pointer;
      .redColor {
        margin-left: 10px;
      }
      &:hover {
        background: rgb(38, 42, 66);
      }
    }
  }
  > .c2c-r {
    padding: 10px 30px;
    background: #1a243b;
    margin-right: 10px;
    width: 77%;
  }
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    > .m-content {
      border-radius: 4px;
      background: #171c2b;
      position: absolute;
      top:50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 40px 20px 30px;
      max-height: 550px;
      width: 400px;
      > .title {
        position: absolute;
        top: 0;
        left: 0;
        text-align: center;
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        text-align: center;
        font-weight: 600;
        > div:last-child {
          position: absolute;
          top: 0;
          right: 0;
          padding: 0 15px;
          cursor: pointer;
        }
      }
      > div:not(.title) {
        line-height: 32px;
      }
      div {
        span:first-child {
          margin-right: 5px;
          display: inline-block;
          width: 90px;
          color: #7a98f7;

        }
      }
      .btnbox{
        >div{
          padding: 3px 15px;
          background: #689CF1;
          border-radius: 4px;
          color: #fff;
          cursor: pointer;
        }
        .ceilorder{
          background: #9DB5C7;
        }
    }
    }
  }
}

</style>





// WEBPACK FOOTER //
// src/view/c2c/c2cTrade.vue