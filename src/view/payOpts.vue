<template>
    <div id="pay-opts">
        <div class="inp-item">
            <div>{{$t('seting.truename')}}：</div>
            <input type="text" :placeholder="$t('seting.pname')" v-model="name">
        </div>
        <div class="inp-item">
            <div>{{$t('seting.opening')}}：</div>
            <input type="text" :placeholder="$t('seting.popen')" v-model="bankName">
        </div>
        <div class="inp-item">
            <div>{{$t('seting.bank')}}：</div>
            <input type="number" :placeholder="$t('seting.pcard')" v-model="bankNum">
        </div>
        <div class="inp-item">
            <div>{{$t('seting.alipay')}}：</div>
            <input type="text" :placeholder="$t('seting.palipay')" v-model="ali">
        </div>
        <div class="inp-item">
            <div>{{$t('seting.wename')}}：</div>
            <input type="text" :placeholder="$t('seting.pwname')" v-model="weChatName">
        </div>
        <div class="inp-item">
            <div>{{$t('seting.wechat')}}：</div>
            <input type="text" :placeholder="$t('seting.pwaccount')" v-model="weChatAccount">
        </div>
        <div class="idimg flex between mt40  ml20">
          <div class="imgs flex column alcenter">
            <div>
              <img :src="src1" alt>
              <input type="file" accept="image/*" name="file" @change="file1">
            </div>
            <p class="mt10">{{$t('seting.pimg1')}}</p>
          </div>
          <div class="imgs flex column alcenter">
            <div>
              <img :src="src2" alt>
              <input type="file" accept="image/*" name="file" @change="file2">
            </div>
            <p class="mt10">{{$t('seting.pimg2')}}</p>
          </div>
        </div>
        <div class="btn bgRed" @click="add">
           {{$t('td.confirm')}}
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      token: "",
      name: "",
      bankName: "",
      bankNum: "",
      ali: "",
      weChatAccount: "",
      weChatName: "",
      src1: "./static/imgs/addimg.png",
      src2: "./static/imgs/addimg.png",
      img1:'',
      img2:''
    };
  },
  created() {
    this.token = window.localStorage.getItem("token") || "";
    if(this.token == ''){
      this.$router.push('/components/login');
    }
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.$ajax({
        url: "/api/user/cash_info",
        method: "post",
        headers: { 'Authorization': this.token }
      }).then(res => {
        if ((res.data.type == "ok")) {
            if(res.data.message != null){
                let data = res.data.message;
                this.name = data.real_name;
                this.bankName = data.bank_name;
                this.bankNum = data.bank_account;
                this.ali = data.alipay_account;
                this.weChatAccount = data.wechat_account;
                this.weChatName = data.wechat_nickname;
                if(data.wechat_collect != ""){
                  this.src1 = data.wechat_collect;
                  this.img1 = data.wechat_collect;
                }
                if(data.alipay_collect != ""){
                  this.src2 = data.alipay_collect;
                  this.img2 = data.alipay_collect;
                }
            }

        }
      });
    },
      file1() {
      var that = this;
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = function(e) {
        // that.src1 = e.target.result;
      };
      var formData = new FormData();
      formData.append("file", event.target.files[0]);
      $.ajax({
        url: "/api/" + "upload",
        type: "post",
        data: formData,
        processData: false,
        contentType: false,
        success: function(msg) {
          if(msg.type == 'ok'){
            that.src1 = msg.message;
            that.img1 = msg.message;
          }else{
            layer.msg(msg.message)
          }
          
        }
      });
    },
    file2() {
      var that = this;
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = function(e) {
        // that.src2 = e.target.result;
      };
      var formData = new FormData();
      formData.append("file", event.target.files[0]);
      $.ajax({
        url: "/api/" + "upload",
        type: "post",
        data: formData,
        processData: false,
        contentType: false,
        success: function(msg) {
          if(msg.type == 'ok'){
             that.src2 = msg.message;
             that.img2 = msg.message;
          }else{
            layer.msg(msg.message)
          }
         
        }
      });
    },
    add() {
      if(this.name == ''){
        layer.msg('请输入真实姓名');return;
      }
      if(this.bankName == ''){
        layer.msg('请输入开户行名称');return;
      }
      if(this.bankNum == ''){
        layer.msg('请输入银行卡号');return;
      }
      if(this.ali == ''){
        layer.msg('请输入支付宝账号');return;
      }
      if(this.weChatAccount == ''){
        layer.msg('请输入微信昵称');return;
      }
      if(this.weChatName == ''){
        layer.msg('请输入微信账号');return;
      }
      if (this.img1 == "") {
        layer.msg(this.$t('seting.pimg1'));
        return;
      }
      if (this.img2 == '') {
        layer.msg(this.$t('seting.pimg2'));
        return;
      }
      this.$ajax({
        url: "/api/user/cash_save",
        method: "post",
        data: {
          real_name: this.name,
          bank_name: this.bankName,
          bank_account: this.bankNum,
          alipay_account: this.ali,
          wechat_nickname: this.weChatName,
          wechat_account: this.weChatAccount,
          wechat_collect: this.src1,
          alipay_collect: this.src2,
        },
        headers: { 'Authorization': this.token }
      }).then(res => {
          layer.msg(res.data.message)
      })
    }
  }
};
</script>

<style lang='scss'>
#pay-opts {
  width: 600px;
  color: #c7cce6;
  > .inp-item {
    position: relative;
    margin-bottom: 20px;
    background: none;
    padding-left: 120px;
    height: 42px;
    > div {
      position: absolute;
      top: 0;
      left: 0;
      
      width: 120px;
      height: 40px;
      line-height: 40px;
      // text-align: center;
      
    }
    > input {
      display: block;
      padding: 0 20px;
      width: 100%;
      line-height: 40px;
      border: 1px solid #4e5b85;
      color: #c7cce6;
      background: none;
    }
  }
  .btn {
    margin: 30px 0 0 120px;
    width: 480px;
    line-height: 40px;
    text-align: center;
    background: #4e5b85;
    color: #fff;
    cursor: pointer;
  }
    .idimg {
      padding: 0 80px;
      .imgs{
            div {
          width: 160px;
          height: 160px;
          overflow: hidden;
          position: relative;
          background-size: 100% 100%;
          border: 1px solid #999;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #2d323a;
          input {
            position: absolute;
            z-index: 11110;
            opacity: 0;
            width: 100%;
            height: 160px;
            top: 0;
            cursor: pointer;
            
          }
          img{
              width: 80%;
              height: 80%;
          }
        }
      }
    }
}
</style>



// WEBPACK FOOTER //
// src/view/payOpts.vue