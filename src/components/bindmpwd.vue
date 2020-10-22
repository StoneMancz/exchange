<template>
<div id="reset-pwd">
    <div class="contentBK">
        <div class="content-wrap">
            <div class="account">
                <div class="main">
                    <p class="main_title">{{$t('set.jsetPsw')}}</p>
                    <!-- <div class="register-input" v-if="old">
                        <span class="register-item">请输入原密码</span>
                        <input type="password" class="input-main input-content" maxlength="20" v-model="oldPwd" id="account">
                    </div> -->
                     <div class="register-input">
                        <span class="register-item">{{$t('set.jenterPsw')}}</span>
                        <input type="password" class="input-main input-content" maxlength="16" v-model="pwd" id="pwd">
                    </div>
                     <div class="register-input">
                        <span class="register-item">{{$t('set.jenterPswagain')}}</span>
                        <input type="password" class="input-main input-content" maxlength="16" v-model="rePwd">
                    </div>
                    <div class="register-input">
                        <span class="register-item">{{$t('set.enterCode')}}</span>
                        <div class="code-box">
                            <input type="text" class="input-main input-content" maxlength="16" v-model="code">
                            <button type="button" class="redBg" @click="sendCode">{{resetSeconds}}</button>
                        </div>
                    </div>
                    <div style="margin-top: 10px;">
                        <span class="register-item"></span>
                        <button type="button" class="register-button curPer" @click="reset" >{{$t('td.confirm')}}</button>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    <!-- <indexFooter></indexFooter> -->
</div>

</template>

<script>
export default {
  data() {
    return {
      old:false,
      oldPwd: "",
      pwd: "",
      rePwd: "",
      code: "",
      areaCode:'',
      areaCodeId:'',
      resetSeconds: this.$t('set.sendCode')
    };
  },
  created(){
    this.$ajax({
      url:"/api/user/info",
      method:"get",
      data:{},
      headers: { Authorization: localStorage.getItem("token") },      
    })
    .then(res => {        
        if(res.data.type=='ok'){
          this.areaCode=res.data.message.area_code;
          this.areaCodeId=res.data.message.area_code_id;
        }
      })
      .catch(error => {});
    // this.mexit();
  },
  methods: {
    mexit(){
      var that = this;
      this.$ajax({
        url: "/api/" + "safe/judge_password",
        method: "post",
        data:{},
        headers: { Authorization: localStorage.getItem("token") }
      })
      .then(res => {
        console.log(res)
        if(res.data.type=='ok'){
          that.old=true
        }
      })
      .catch(error => {});
    },
    sendCode() {
      
      var that = this;
      if (this.resetSeconds != this.$t('set.sendCode')) {
        return;
      }
      let msg = "";
      let oldpassword = this.oldPwd;
      let password = this.pwd;
      let re_password = this.rePwd;
      let user_string = localStorage.getItem('accountNum');
      if (password == "" || re_password == "") {
        return layer.msg(this.$t('set.enterPswTwo'));
      } else if (password != re_password) {
        layer.msg(this.$t('set.pswFalse'));
        return;
      }
      var url = "sms_send";
      var emreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if (emreg.test(user_string)) {
        url = "sms_mail";
      }else{
        url = "sms_send";
      }
      this.$ajax({
        url: "/api/" + url,
        method: "post",
        data: {type: 'forget', user_string: user_string,area_code_id: that.areaCodeId,
									area_code: that.areaCode},
        headers: { Authorization: localStorage.getItem("token") }
      }).then(res => {
        layer.msg(res.data.message);
        if (res.data.type == "ok") {
          let timer = null;
          let time = 31;
          timer = setInterval(function() {
            time--;
            that.resetSeconds = that.$t('set.rest') + time + 's';
            if (time == 0) {
              that.resetSeconds = that.$t('set.sendCode');
              clearInterval(timer);
            }
          }, 1000);
        }
      });
    },
    reset() {
      let that = this;
      let msg = "";
      let oldpassword = this.oldPwd;
      let password = this.pwd;
      let re_password = this.rePwd;
      let login_password_code = this.code;
      if (password == "" || re_password == "") {
        return;
      } else if (password != re_password) {
        layer.msg(this.$t('set.pswFalse'));
        return;
      } else {
        this.$ajax({
          url: "/api/safe/update_password",
          method: "post",
          data: {
            // oldpassword: oldpassword,
            password: password,
            re_password: re_password,
            code: login_password_code
          },
          headers: { Authorization: localStorage.getItem("token") }
        }).then(res => {
          layer.msg(res.data.message);
          this.pwd='';
          this.rePwd='';
          this.code='';
          if(res.data.type == "ok"){
            setTimeout(function(){
              that.$router.push("/accountSet");
            })
          }
        });
      }
    }
  }
};
</script>

<style scoped>
#reset-pwd {
  min-height: 1050px;
}
/* .content-wrap{background: #fff center bottom 316px repeat-x,-webkit-linear-gradient(top,#21263f,#262a42);} */
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
  color: #c7cce6
}
.main_title {
  font-size: 36px;
}
.register-item {
  display: block;
  height: 22px;
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
  font-size: 14px;
  border-radius: 3px;
  color: #c7cce6;
  background-color: #1e2235;
}
.icon {
  width: 48px;
  height: 48px;
  line-height: 48px;
  border-right: 1px solid #52688c;
  position: absolute;
  top: 0;
}
.login-btn {
  width: 420px;
  margin-top: 40px;
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
  border-radius: 4px;
  color: #fff;
  border: none;
  background: #7a98f7;
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
}
.code-box {
  border-radius: 2px;
  /* border: 1px solid #ccc; */
  width: 520px;
}
.code-box input {
  width: 406px;
  /* border: none; */
}
.code-box button {
  padding: 0 20px;
  line-height: 47px;
  width: 107px;
  border-radius: 3px;
  cursor: pointer;
  background: #7a98f7;
  color: #fff
}
</style>



// WEBPACK FOOTER //
// src/components/bindmpwd.vue