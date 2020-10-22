<template>
  <div id="legal-pay" class="whites">
    <div class="title bg-part">
      <span>{{$t('fat.payPlease')}}</span>
      <span>￥{{msg.deal_money || '0.000' | toFixeds}}</span>
    </div>
    <div class="info bg-part">
      <div>
        <span>{{$t('fat.tdPrice')}}：</span>
        <span>{{msg.price || '0.000' | toFixeds}} {{msg.coin_code}}</span>
      </div>
      <div>
        <span>{{$t('fat.tdNum')}}：</span>
        <span>{{msg.number || '0.000' | toFixeds}}{{msg.currency_name}}</span>
      </div>
      <div>
        <span>{{$t('fat.payinfo')}}：</span>
        <span>{{msg.way_name}}</span>
      </div>
      <div>
        <span>{{$t('ctc.account')}}：</span>
        <span>{{msg.hes_account}}</span>
      </div>
      <div>
        <span>{{$t('fat.realName')}}：</span>
        <span>{{msg.hes_realname}}</span>
      </div>
      <div>
        <span>{{$t('td.callWay')}}：</span>
        <span>{{msg.seller_phone}}</span>
      </div>
      <div>
        <span>{{$t('td.renum')}}：</span>
        <span>{{msg.id}}</span>
      </div>
      <div v-if="msg.bank_address">
        <span>{{$t('fat.shoperZname')}}：</span>
        <span>{{msg.bank_address}}</span>
      </div>
      <div>
        <span>{{$t('fat.shoperNum')}}：</span>
        <!-- <span>{{msg.seller_name}}</span> -->
        <router-link :to="{path:'/legalSeller',query:{sellerId:msg.seller_id}}" tag="span" style="color:#638bd4;cursor: pointer;">{{msg.seller_name}}</router-link>
      </div>
      <div >
        <div  v-if="msg.way_name=='微信'" class="flex alcenter">
          <span>{{$t('td.paycode')}}：</span>
          <img :src="msg.sell_info&&msg.sell_info.wechat_collect" alt="" class="mt10 "  style="width:150px;">
        </div>
        <div  v-if="msg.way_name=='支付宝'" class="flex alcenter">
          <span>{{$t('td.paycode')}}：</span>
          <img :src="msg.sell_info&&msg.sell_info.alipay_collect" alt="" class="mt10" style="width:150px;">
        </div>
      </div>
      <div class="btns">
        <div class="btn" @click="showCancel = true">{{$t('fat.odCeil')}}</div>
        <div class="btn" @click="showConfirm = true">{{$t('fat.imPay')}}</div>
         <div class="btn imgbtn">
          我已付款，上传付款凭证
          <input type="file" id="file" accept="image/*" @change="file" >
        </div>
      </div>
    </div>
    <div class="cancel-box" v-if="showCancel">
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
    <div class="confirm-box" v-if="showConfirm">
      <div class="content">
        <div>{{$t('fat.paySure')}}</div>
        <div>{{$t('fat.pdopay')}}</div>
        <div>{{$t('fat.badClick')}}</div>
        <div class="yes-no flex">
          <div @click="showConfirm = false">{{$t('td.canceil')}}</div>
          <div @click="confirm">{{$t('td.confirm')}}</div>
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
      src:'',
      password:''
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
      this.id = this.$route.query.id;
      this.getData();
    }
  },
  methods: {
    getData() {
      var i = layer.load();
      this.$http({
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
      var that=this;
      this.showCancel = false;
      layer.prompt({title: that.$t('td.pwd'), formType: 1,btn:[that.$t('td.confirm'), that.$t('td.canceil')]}, function(pass, index){
        that.password=pass;
        that.$http({
          url:'/api/user_legal_pay_cancel',
          method:'post',
          data:{id:that.id,password:that.password},
          headers:{Authorization:that.token}
        }).then(res => {
          layer.msg(res.data.message);
          if(res.data.type == 'ok'){
            setTimeout(() => {
              that.$router.push('/legalRecord')
            }, 1000);
            
          }
          
        }).then(() => {
          that.showCancel = false;
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
                that.showConfirm = true;
            }else{
              layer.msg('图片上传失败');
            }
					}else{
            layer.msg('图片上传失败');
          }
				}
			});
    },
    confirm(){
      var that = this;
      that.showConfirm = false
      layer.prompt({title: that.$t('td.pwd'), formType: 1,btn:[that.$t('td.confirm'), that.$t('td.canceil')]}, function(pass, index){
      that.password=pass;
      that.$http({
        url:'/api/user_legal_pay',
        method:'post',
        data:{id:that.id,pay_orders_img:that.src,password:that.password},
        headers:{Authorization:that.token}
      }).then(res => {
        layer.msg(res.data.message);
        if(res.data.type == 'ok'){
          setTimeout(() => {
            that.$router.push('/legalRecord')
          }, 1000);
        }
        
      }).then(() => {
        that.showConfirm = false;
      })
        layer.close(index);
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
#legal-pay {
  width: 1200px;
  margin: 50px auto;
  > .title {
    margin-bottom: 20px;
    font-size: 20px;
    line-height: 60px;
    > span {
      padding: 0 30px;
    }
    > span:last-child {
      font-weight: 600;
    }
  }
  > .info {
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
        background: #638bd4;
        margin-right: 30px;
        font-size: 14px;
      }
      >div:first-child{
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
  .imgbtn{position: relative;}
  #file{position: absolute;top: 0;left: 0;width: 190px;height: 40px;opacity: 0;z-index: 99;cursor: pointer;}
}
</style>


// WEBPACK FOOTER //
// src/components/LegalPay.vue