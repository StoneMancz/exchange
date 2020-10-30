<template>
<div class="forget-box">
    <indexHeader></indexHeader>
    <div class="contentBK ">
        <div class="content-wrap">
            <div class="account">
                <!-- <div class="main" v-if="!showReset">
                    <p class="main_title">{{$t('set.forgetPsw')}}</p>
                    <div class="register-input">
                        <span class="register-item">{{$t('ctc.account')}}</span>
                        <input type="text" class="input-main input-content bg-part bd input_color" maxlength="50" v-model="account_number" id="account">
                    </div>
                     <div class="register-input code-input" >
                        <span class="register-item">{{$t('set.code')}}</span>
                        <div class="code-box">
                          <input type="text" class="input-main input-content bg-part bd input_color" maxlength="16" v-model="phoneCode" id="pwd" >
                          <button type="button" class="pointer"  @click="setTime">{{$t('set.getCode')}}</button>
                        </div>
                    </div>
                    <div style="margin-top: 10px;">
                        <span class="register-item"></span>
                        <button class="register-button curPer" type="button" @click="check">确认</button>
                    </div>
                </div> -->
                <div class="main" >
                    <p class="main_title fColorn"  v-if="!showReset">{{$t('set.forgetPsw')}}</p>
                    <div class="main_title fColorn" v-else>{{$t('set.reset')}} {{$t('login.psw')}}</div>
                    <div class="register-input" v-if="!showReset">
                        <span class="register-item">{{$t('ctc.account')}}</span>
                        <input type="text" class="input-main input-content bg-part bd input_color " v-model="account_number" id="account">
                    </div>
                    <div class="register-input" v-else>
                        <span class="register-item">{{$t('ctc.account')}}</span>
                        <input type="text" class="input-main input-content bg-part bd input_color" disabled v-model="account_number" id="account">
                    </div>
                    <div class="register-input">
                        <span class="register-item">{{$t('set.enterPsw')}}</span>
                        <input type="password" class="input-main input-content bg-part bd input_color"  v-model="password" id="pwd">
                    </div>
                    <div class="register-input">
                        <span class="register-item">{{$t('set.enterPswagain')}}</span>
                        <input type="password" class="input-main input-content bg-part bd input_color"  v-model="re_password" id="repwd">
                    </div>
                     <div class="register-input code-input" >
                        <span class="register-item">{{$t('set.code')}}</span>
                        <div class="code-box bg-part bd">
                          <input type="text" class="input-main input-content bg-part input_color " maxlength="16" v-model="phoneCode" id="pwd" >
                          <button type="button" class="pointer bg-part bdl"  @click="setTime">{{$t('set.getCode')}}</button>
                        </div>
                    </div>
                    <button class="register-button curPer" type="button" @click="resetPass" style="margin-top:20px">{{$t('td.confirm')}}</button>
                </div>
            </div>
        </div>
    </div>
    <!-- <indexFooter></indexFooter> -->
</div>

</template>

<script>
import indexHeader from "@/view/indexHeader";
// import indexFooter from "@/view/indexFooter";
export default {
  components: { indexHeader },
  data() {
    return {
      isMb: true,
      account_number: "",
      area_code:'',
      phoneCode: "",
      showReset: false,
      password: "",
      re_password: "",
      scene:''
    };
  },
  created() {
    // alert(this.$route.query.isset);
    this.showReset= this.$route.query.fromSet;
    if(this.showReset){
      this.userInfo();
    }
  },
  methods: {
     userInfo(){
        this.$ajax({
            url: '/api/user/info',
            method:'get',
            data:{},  
            headers: {'Authorization':  localStorage.getItem('token')},    
        }).then(res=>{
            if(res.data.type == 'ok'){
                // if(res.data.message.phone!=null){
                    this.account_number=res.data.message.account_number;
                    this.area_code=res.data.message.area_code;
                // }
            }
            }).catch(error=>{
        })               
    },
    sendCode(url) {
      this.$ajax({
        url: "/api/" + url,
        method: "post",
        data: {
          user_string: this.account_number,
          type: "forget",
          area_code:this.area_code
        },
         headers: {'Authorization':  localStorage.getItem('token')}
      }).then(res => {
        layer.msg(res.data.message);
      });
    },
    setTime(e) {
      var that=this;
      if (e.target.disabled) {
        return;
      } else {
        var reg = /^1[3456789]\d{9}$/;
        var url = "sms_send";
        var emreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,9}$/;
        if (this.account_number == "") {
          layer.tips(this.$t('set.enterAccount'), "#account");
          return;
        }
        if (emreg.test(this.account_number)) {
          url = "sms_mail";
          this.isMb = false;
        }else{
          url = "sms_send"; 
          this.isMb = true;
        }
        this.sendCode(url);
        var time = 60;
        var timer = null;
        timer = setInterval(function() {
          e.target.innerHTML = time + 's';
          e.target.disabled = true;
          if (time == 0) {
            clearInterval(timer);
            e.target.innerHTML = that.$t('set.sendCode');
            e.target.disabled = false;
            return;
          }
          time--;
        }, 1000);
      }
    },
    check() {
      var reg = /^1[345678]\d{9}$/;
      var emreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,9}$/;
      let user_string = this.account_number;
      var isMobile = reg.test(user_string);
      var isEmail = emreg.test(user_string);
      var url = "user/check_mobile";
      var data = {};

      if (user_string == "") {
        layer.tips(this.$t('set.enterAccount'), "#account");
        return;
      } else if (this.phoneCode == "") {
        layer.tips(this.$t('set.enterCode'), "#pwd");
        return;
      } else if (isEmail) {
        url = "user/check_email";
        data.email_code = this.phoneCode;
      // } else if (isMobile) {
      } else if (!isEmail){
        url = "user/check_mobile";
        data.mobile_code = this.phoneCode;
      } else {
        layer.tips(this.$t('set.accountFalse'), "#account");
        return;
      }

      this.$ajax({
        url: "/api/" + url,
        method: "post",
        data: data
      }).then(res => {
        layer.msg(res.data.message);
        if (res.data.type == "ok") {
          this.showReset = true;
          // window.location.href = "resetpass.html?user_string=" + names + "&" + "code=" + verify;
          // this.$router.push({path:'/resetPwd',params:{user_string:user_string,code:this.phoneCode}})
        }
      });
    },
    resetPass() {
      if (this.password == "") {
        layer.msg(this.$t('set.enterPsw'));
        return;
      } else if (this.re_password == "") {
        layer.msg(this.$t('set.enterPswagain'));
        return;
      } else if (this.password !== this.re_password) {
        layer.msg(this.$t('set.pswFalse'));
        return;
      } else {
        let data = {
          account: this.account_number,
          password: this.password,
          repassword: this.re_password,
          code: this.phoneCode,
          scene:this.scene,
        };
        this.$ajax({
          url: "/api/user/forget",
          method: "post",
          data: data,
         
          headers: {'Authorization':  localStorage.getItem('token')}
        }).then(res => {
          layer.msg(res.data.message);
          if (res.data.type == "ok") {
            this.$router.push("/components/login");
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.content-wrap {
  background: url(../assets/images/bg_login.png) center bottom 316px repeat-x,
    -webkit-linear-gradient(top, #21263f, #171c2b);
}
.account {
  width: 1200px;
  margin: 0 auto;
  padding-top: 93px;
  overflow: hidden;
  min-height: 880px;
}
.main {
  position: relative;
  padding: 0 0 60px 30px;
}
.main_title {
  font-size: 36px;
  color: #c7cce6;
}
.register-item {
  display: block;
  height: 22px;
  color: #61688a;
  font-size: 12px;
}
.register-input {
  position: relative;
  margin-top: 20px;
}
.input-box {
  position: relative;
  margin-top: 40px;
}
.input-main {
  width: 520px;
  min-height: 46px;
  border: 1px solid #4e5b85;
  padding: 0 20px;
  color: #c7cce6;
  font-size: 14px;
  border-radius: 3px;
  background-color: #1e2235;
}
.icon {
  width: 48px;
  height: 48px;
  line-height: 48px;
  border-right: 1px solid #2e3753;
  position: absolute;
  top: 0;
}
.login-btn {
  width: 420px;
  margin-top: 40px;
  background: #5697f4;
  font-size: 16px;
  border-radius: 4px;
  color: #fff;
  line-height: 48px;
  cursor: pointer;
}
.noaccount {
  color: #fff;
}
.register-button {
  width: 200px;
  display: inline-block;
  line-height: 46px;
  background-color: #7a98f7;
  border-radius: 4px;
  color: #fff;
  border: none;
}
.have-account {
  font-size: 14px;
  display: inline-block;
  margin-left: 30px;
}
.right-tip {
  position: absolute;
  left: 620px;
  top: 70px;
  line-height: 24px;
  padding-right: 50px;
  margin-top: 10px;
  font-size: 14px;
  color: #61688a;
}
.code-box {
  width: 520px;
  border: 1px solid #4e5b85;
  background: #1e2235;
}
.code-box .input-main {
  width: 419px;
  border: none;
}
.code-box button {
  border: none;
  border-left: 1px solid #4e5b85;
  line-height: 44px;
  color: #7a98f7;
  background: #1e2235;
  width: 94px;
}
</style>



// WEBPACK FOOTER //
// src/components/ForgetPwd.vue