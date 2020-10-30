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
      <div v-if="msg.is_sure == 3">{{$t('fat.payedWait')}}</div>
     
    </div>
    <div class="info bg-part ft14 radius4">
      <div>
        <span>{{$t('td.tradeTotal')}}：</span>
        <span>{{msg.deal_money || '0.000' | toFixeds}} {{msg.coin_code}}</span>
      </div>
      <div class="column" v-if="msg.is_seller==0">
        <div>
          <span>{{$t('td.seller')}}:</span>
          <span v-if="msg.type=='buy'">{{user.account_number}}</span>
          <span v-else>{{msg.seller_name}}</span>
        </div>
        <div>
          <span>{{$t('fat.bank')}}:</span>
          <span>{{user.bank_name}}:{{user.bank_account}}</span>
        </div>
        <div>
          <span>{{$t('fat.alipay')}}:</span>
          <span>{{user.alipay_account}}</span>
        </div>
        <div>
          <span>{{$t('fat.wechat')}}:</span>
          <span>{{user.wechat_account}}</span>
        </div>
        <div>
          <span>{{$t('fat.realName')}}:</span>
          <span>{{user.real_name}}</span>
        </div>
      </div>
      <div>
        <span>{{$t('td.price')}}：</span>
        <span>{{msg.price || '0.000' | toFixeds}} {{msg.coin_code}}</span>
      </div>
      <div>
        <span>{{$t('td.num')}}：</span>
        <span>{{msg.number || '0.000' | toFixeds}}</span>
      </div>
      <div v-if="msg.type=='sell'">
        <span>{{$t('auth.name')}}：</span>
        <span>{{user.real_name}}</span>
      </div>
      <div v-if="msg.type=='sell'">
        <span>{{$t('lever.rate')}}：</span>
        <span>{{msg.out_fee}}</span>
      </div>
      <div>
        <span>{{$t('td.placeTime')}}：</span>
        <span>{{msg.format_create_time}}</span>
      </div>
      <div>
        <span>{{$t('td.callWay')}}：</span>
        <span>{{msg.type=='sell'?msg.phone:msg.seller_phone}}</span>
      </div>
      <!-- <div v-if="msg.pay_voucher"> 
        <span>支付凭证</span>
        <img :src="msg.pay_voucher" alt="" class="pay_voucher" @click="evimgs(msg.pay_voucher)">
      </div> -->
      <div>
        <span>{{$t('td.renum')}}：</span>
        <span>{{msg.id}}</span>
      </div>
        <div v-if="msg.type=='buy'">
          <div  v-if="msg.way_name=='微信'" class="flex alcenter">
            <span>{{$t('td.paycode')}}：</span>
            <img :src="msg.user_cash_info.wechat_collect" alt="" class="mt10 "  style="width:150px;">
          </div>
          <div  v-if="msg.way_name=='支付宝'" class="flex alcenter">
            <span>{{$t('td.paycode')}}：</span>
            <img :src="msg.user_cash_info.alipay_collect" alt="" class="mt10" style="width:150px;">
          </div>
        </div>
         <div v-if="msg.type=='sell'">
          <div  v-if="msg.way_name=='微信'" class="flex alcenter">
            <span>{{$t('td.paycode')}}：</span>
            <img :src="msg.sell_info.wechat_collect" alt="" class="mt10 "  style="width:150px;">
          </div>
          <div  v-if="msg.way_name=='支付宝'" class="flex alcenter">
            <span>{{$t('td.paycode')}}：</span>
            <img :src="msg.sell_info.alipay_collect" alt="" class="mt10" style="width:150px;">
          </div>
        </div>
      <!-- <div>
        <span>商家账户：</span>
        <router-link :to="{path:'/legalSeller',query:{sellerId:msg.seller_id}}" tag="span" class="light_blue seller">{{msg.seller_name}}</router-link>
      </div> -->
      <div class="ptb10" v-if="msg.is_sure == 0 && msg.type =='buy'">请在 <a href="javascript:;" class="redColor plr5">{{timer}}</a> 内付款</div>
      <div class="ptb10" v-if="msg.is_sure == 3 && msg.type =='sell'">请在 <a href="javascript:;" class="redColor plr5">{{timer}}</a> 内收款</div>

      <div class="btns">
        <div class="btn cancelBtn" @click="showCancel = true" v-if="msg.is_sure == 0 && msg.type =='buy'">{{$t('fat.odCeil')}}</div>
        <div class="btn" @click="showConfirm = true" v-if="(msg.is_sure == 3) && (msg.type =='sell')">{{$t('fat.receivePays')}}</div>
        <div class="btn imgbtn" v-if="(msg.is_sure==0) && (msg.type=='buy')" @click="showPay = true">
          {{$t('fat.imPay')}}
          <!-- <input type="file" id="file" accept="image/*" @change="file" > -->
        </div>
         <div class="btn" @click="apply" v-if="(msg.is_sure == 3) && (msg.type =='sell')" >{{$t('fat.apply')}}</div>
      </div>
    </div>
    <div class="cancel-box white" v-if="showCancel">
      <div class="content">
        <div>{{$t('fat.tdCeil')}}</div>
        <div>{{$t('fat.pCeil')}}</div>
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
    <!-- 确认收款 -->
    <div class="confirm-box" v-if="showConfirm">
      <div class="content">
        <div>{{$t('fat.receivePay')}}</div>
        <div>{{$t('fat.payReceive')}}</div>
        <div>{{$t('fat.badClick')}}</div>
        <div class="yes-no flex">
          <div @click="showConfirm = false">{{$t('td.canceil')}}</div>
          <div @click="confirm">{{$t('td.confirm')}}</div>
        </div>
      </div>
    </div>

    <div class="confirm-box" v-if="showPay">
      <div class="content">
        <div>{{$t('fat.paySure')}}</div>
        <div>{{$t('fat.pdopay')}}</div>
        <div>{{$t('fat.badClick')}}</div>
        <div class="yes-no flex">
          <div @click="showPay = false">{{$t('td.canceil')}}</div>
          <div @click="confirmPay">{{$t('td.confirm')}}</div>
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
      user:'',
      token:'',
      showConfirm:false,
      showCancel:false,
      hasPay:false,
      showPay:false,
      id:'',
      msg:{},
      src:'',
      password:'',
      timer:'--'
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
    checkTime(i){
      if (i<10) {
        i = "0" + i;
      }
      return i;
    },
    downTime(endTime){//倒计时
      let that = this;
      var startTime=(Date.parse(new Date())/1000);//开始时间
      var endTime=endTime; //结束时间
      setInterval(function(){
        var ts =endTime-startTime;//计算剩余的毫秒数
        //var dd = parseInt(ts  / 60 / 60 / 24, 10);//计算剩余的天数
        var hh = parseInt(ts  / 60 / 60 % 24, 10);//计算剩余的小时数
        var mm = parseInt(ts  / 60 % 60, 10);//计算剩余的分钟数
        var ss = parseInt(ts  % 60, 10);//计算剩余的秒数
        //dd = that.checkTime(dd);
        hh = that.checkTime(hh);
        mm = that.checkTime(mm);
        ss = that.checkTime(ss);
        if(ts>0){
          that.timer =  hh + "时" + mm + "分" + ss + "秒";
          startTime++;
        }else if(ts<0){
          that.timer="00:00:00";
        }
      },1000);
    },
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
          this.user= res.data.message.user_cash_info;
          let data = res.data.message;
					var date;
          if(data.type=='buy' && data.is_sure==0){
						let newDate = new Date(data.payment_at.replace(/-/g, '/'));
						date = (newDate.getTime())/1000;
						this.downTime(date);
					}
					if(data.type=='sell' && data.is_sure==3){
						let newDate = new Date(data.comp_at.replace(/-/g, '/'));
						date = (newDate.getTime())/1000;
						this.downTime(date);
					}
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
          layer.msg(res.data.message);
          that.showCancel = false;
          if(res.data.type=='ok'){
            location.reload();
          }
        })
        layer.close(index);
			});
    },
   // 卖家确认付款
    confirm(){
      var that = this;
      that.showConfirm = false;
      layer.prompt({title: that.$t('td.pwd'), formType: 1,btn:[that.$t('td.confirm'), that.$t('td.canceil')]}, function(pass, index){
        that.password=pass;
        that.$ajax({
          url:'/api/legal_deal_sure',
          method:'post',
          data:{id:that.id,password:that.password},
          headers:{Authorization:that.token}
        }).then(res => {
          layer.msg(res.data.message);
          if(res.data.type=='ok'){
            setTimeout(function(){
              location.reload();
            },1000)
          }
          
        }).then(() => {
          that.showConfirm = false;
        })
        layer.close(index);
			});
    },
    file(){
      var that = this;
      var formData = new FormData();
			formData.append("file", $("#file")[0].files[0]);
      var i = layer.load();
			$.ajax({
				url:'/api/upload',
				type: 'post',
				data: formData,
				processData: false,
				contentType: false,
				success: function (msg) {
          layer.close(i);
					if(msg.type == 'ok'){
            that.src=msg.message;
            if(that.src){
                that.showPay = true;
            }else{
              layer.msg('图片上传失败');
            }
					}
				}
			});
    },
    // 买家确认付款
    confirmPay(){
      var that = this;
      that.showPay = false;
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
            },2000)
          }
        }).then(() => {
          that.showPay = false;
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
.plr5{padding-left: 5px;padding-right: 5px;}
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
    .column{
      div{
        display: flex;
        span:first-child{
          width:140px;
        }
      }
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
      margin: 200px auto 0;
      border-radius: 2px;
      width: 360px;
      background: #1a243b;
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
  .seller{
    cursor: pointer;
  }
  .pay_voucher{
    width: 40px;
    height: 40px;
    cursor: pointer;
  }
}
  .openimg{display: block;margin: 0 auto;max-width: 100%;}
  .imgbtn{position: relative;}
  #file{position: absolute;top: 0;left: 0;width: 190px;height: 40px;opacity: 0;z-index: 99;cursor: pointer;}
</style>



// WEBPACK FOOTER //
// src/components/shop_legal_pay_detail.vue