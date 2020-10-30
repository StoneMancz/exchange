<template>
  <div id="legal-pay-detail" class="whites">
    <div class="title bg-part radius4">
      <span v-if="msg.is_sure == 0">{{$t('td.nofinish')}}</span>
      <span v-if="msg.is_sure == 1">{{$t('td.finished')}}</span>
      <span v-if="msg.is_sure == 2">{{$t('td.ceiled')}}</span>
      <span v-if="msg.is_sure == 3">{{$t('td.payed')}}</span>
      <span v-if="msg.is_sure == 4">{{$t('fat.protection')}}</span>
      <div v-if="msg.is_sure == 0">{{$t('fat.pwaitPay')}}</div>
      <div v-if="msg.is_sure == 1">{{$t('fat.odFinish')}}</div>
      <div v-if="msg.is_sure == 2">{{$t('fat.odCeil')}}</div>
      <div v-if="msg.is_sure == 3">{{$t('fat.odPay')}}</div>
      <!-- <div v-if="msg.is_sure == 4">{{$t('fat.protection')}}</div> -->
    </div>
    <div class="info bg-part ft14 radius4">
      <div>
        <span>{{$t('td.tradeTotal')}}：</span>
        <span>{{msg.deal_money || '0.000' | toFixeds}} {{msg.coin_code}}</span>
      </div>
      <div>
        <!-- <span>{{msg.is_seller=='0'?'卖家':'买家'}}：</span> -->
        <span>{{msg.type=='sell'?'卖家':'买家'}}：</span>
        <span>{{msg.seller_name}}</span>
      </div>
      <!-- <div class="curPer">
        <span>商家账户：</span>
        <router-link :to="{path:'/legalSeller',query:{sellerId:msg.seller_id}}" tag="span" >{{msg.seller_name}}</router-link>
      </div> -->
      <div>
        <span>{{$t('td.price')}}：</span>
        <span>{{msg.price || '0.000' | toFixeds}} {{msg.coin_code}}</span>
      </div>
      <div>
        <span>{{$t('td.num')}}：</span>
        <span>{{msg.number || '0.000' | toFixeds}}</span>
      </div>
      <div v-if="msg.type=='buy'">
        <span>{{$t('lever.rate')}}：</span>
        <span>{{msg.out_fee}}</span>
      </div>
      <div>
        <span>{{$t('td.callWay')}}：</span>
        <span>{{msg.seller_phone}}</span>
      </div>
      <div>
        <span>{{$t('td.placeTime')}}：</span>
        <span>{{msg.format_create_time}}</span>
      </div>
       <div v-if="msg.pay_voucher">
        <span>支付凭证：</span>
        <img :src="msg.pay_voucher" alt="" class="curPer" style="width:40px;height:40px" @click="evimgs(msg.pay_voucher)">
      </div> 
      <div>
        <span>{{$t('td.renum')}}：</span>
        <span>{{msg.id}}</span>
      </div>
      <div class="btns">
        <!-- <div class="btn" @click="showCancel = true">取消订单</div>
        <div class="btn" @click="showConfirm = true">我已付款，点击确认</div> -->
        <div class="btn" @click="hasPay = true" v-if="msg.is_sure == 3&&msg.type=='buy'">{{$t('fat.receivePays')}}</div>
        <div class="btn" @click="apply" v-if="(msg.is_sure == 3) && (msg.type =='buy')">{{$t('fat.apply')}}</div>
      </div>
    </div>
    <div class="cancel-box bg-part" v-if="showCancel">
      <div class="content">
        <div>{{$t('fat.tdCeil')}}</div>
        <div class="ft14">{{$t('fat.pCeil')}}</div>
        <!-- <div>
          <input type="checkbox" v-model="hasPay" id="haspay">
          <label for="haspay">我还没有付款给对方</label>
        </div> -->
        <div class="yes-no flex">
          <div @click="showCancel = false">{{$t('td.canceil')}}</div>
          <div @click="cancel">{{$t('td.confirm')}}</div>
        </div>
      </div>
    </div>
    <div class="confirm-box  bg-part" v-if="showConfirm">
      <div class="content">
        <div>{{$t('fat.paySure')}}</div>
        <div class="ft14">{{$t('fat.pdopay')}}</div>
        <div class="ft14">{{$t('fat.badClick')}}</div>
        <div class="yes-no flex">
          <div @click="showConfirm = false">{{$t('td.canceil')}}</div>
          <div @click="confirm">{{$t('td.confirm')}}</div>
        </div>
      </div>
    </div>
    <div class="confirm-box  bg-part" v-if="hasPay">
      <div class="content">
        <div>{{$t('fat.receivePay')}}</div>
        <div class="ft14">{{$t('fat.payReceive')}}</div>
        <div class="ft14">{{$t('fat.badClick')}}</div>
        <div class="yes-no flex">
          <div @click="hasPay = false">{{$t('td.canceil')}}</div>
          <div @click="hadPay">{{$t('td.confirm')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "",
      token:'',
      showConfirm:false,
      showCancel:false,
      hasPay:false,
      id:'',
      msg:{}
    };
  },
  filters: {
			toFixeds: function(value) {
				value = Number(value);
				return value.toFixed(3);
			}
		},
  created() {
    var token = window.localStorage.getItem("token") || "";
      // this.id = this.$route.query.id;
    if (token) {
      this.token = token;
      this.id = this.$route.query.id || '';
      this.getMsg()
    }
  },
  methods: {
     apply() {
      this.$ajax({
        url: "/api/legal/arbitrate",
        method: "post",
        data: { id: this.id},
        headers: { Authorization: this.token }
      }).then(res => {
        layer.msg(res.data.message);
        if (res.data.type == "ok") {
          setTimeout(function() {
            location.reload();
          }, 1000);
        }
      });
    },
    getMsg(){
      var i = layer.load();
      this.$ajax({
        url:'/api/legal_deal',
        params:{id:this.id},
        headers:{Authorization:this.token}
      }).then(res => {
        layer.close(i);
        if(res.data.type == 'ok'){
          this.msg = res.data.message;
        }
      })
    },
    getData() {
      var i = layer.load();
      this.$ajax({
        url: "/api/legal_deal",
        params: {
          id: this.id
        },
        headers: { Authorization: this.token }
      }).then(res => {
        layer.close(i);
        if (res.data.type == "ok") {
          this.msg = res.data.message;
        }
      });
    },
    // 取消交易
    cancel(){
      var that = this;
      that.showCancel = false;
      layer.prompt({title: that.$t('td.pwd'), formType: 1,btn:[that.$t('td.confirm'), that.$t('td.canceil')]}, function(pass, index){
        that.password=pass;
        that.$ajax({
          url:'/api/user_legal_pay_cancel',
          method:'post',
          data:{id:that.id,password:that.password},
          headers:{Authorization:that.token}
        }).then(res => {
          lay.msg(res.data.message);
          setTimeout(function(){
            location.reload();
          },500)
        }).then(() => {
          that.showCancel = false;
        })
        layer.close(index);
			});
    },
    // 确认付款
    confirm(){
      var that = this;
      that.showConfirm = false;
      layer.prompt({title: that.$t('td.pwd'), formType: 1,btn:[that.$t('td.confirm'), that.$t('td.canceil')]}, function(pass, index){
        that.password=pass;
        that.$ajax({
          url:'/api/user_legal_pay',
          method:'post',
          data:{id:that.id,password:that.password},
          headers:{Authorization:that.token}
        }).then(res => {
          layer.msg(res.data.message);
          if(res.data.type=='ok'){
            setTimeout(function(){
              location.reload();
            },500)
          }
        }).then(() => {
          that.showConfirm = false;
        })
        layer.close(index);
			});
    },
    // 确认对方已付款
    hadPay(){
      var that = this;
      that.hasPay = false;
      layer.prompt({title: that.$t('td.pwd'), formType: 1,btn:[that.$t('td.confirm'), that.$t('td.canceil')]}, function(pass, index){
        that.password=pass;
        that.$ajax({
          url:'/api/legal_deal_user_sure',
          method:'post',
          data:{id:that.id,password:that.password},
          headers:{Authorization:that.token}
        }).then(res => {
          layer.msg(res.data.message);
          if(res.data.type=='ok'){
            setTimeout(function(){
              location.reload();
            },500)
          }
          that.hasPay = false;
        })
        layer.close(index);
			});
    },
    evimgs(src){
      return layer.open({
        type: 1 //Page层类型
        ,area: ['375px', '500px']
        ,title: ''
        ,shade: 0.6 //遮罩透明度
        ,anim: 1 //0-6的动画形式，-1不开启
        ,content: "<img src='"+src+"' alt='' class='openimg'>"
        ,btn: ['关闭'],
         yes: function(index){
            layer.close(index);
        }

      });   
    }
  }
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
#legal-pay-detail {
  width: 1200px;
  margin: 50px auto;
  > .title {
    // background: #f8f8f8;
    margin-bottom: 20px;
    padding: 0  0 20px 30px;
    span{
      font-size: 20px;
      line-height: 50px;
      font-weight: bold;
    }
    div{
      font-size: 12px;
    }
  }
  > .info {
    // background: #f8f8f8;
    padding: 0 30px;
    line-height: 40px;
    >div{
      display: flex;
    }
    span:first-child{
      width:140px;
    }
    >.btns{
      padding: 20px 0;
      cursor: pointer;
      >div{
        color: #fff;
        border-radius: 2px;
        padding: 0 16px;
        background: #7a98f7;
        margin-right: 30px;
        font-size: 14px;
      }
      >.cancelBtn{
        background: #ccc;
        color: #333;
      }
    }
  }
  >.cancel-box,>.confirm-box{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.7);
    >.content{
      background: #171c2b;
      margin: 200px auto 0;
      border-radius: 2px;
      width: 360px;
      border-radius: 5px;
      line-height: 40px;
      text-align: center;
      >div:first-child{
        font-weight: 600;
      }
      >.flex{
        margin-top: 10px;
        border-top: 1px solid #1B2A3E;
        cursor: pointer;
        div{
          width: 50%;
        }
        >div:first-child{
          border-right: 1px solid #1B2A3E;
        }
      }
    }
  }
}
.openimg{display: block;margin: 0 auto;max-width: 100%;}
</style>


// WEBPACK FOOTER //
// src/components/LegalPayDetail.vue