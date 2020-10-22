<template>
<div id="legaltrade-set">
    <div class="contentBK">
        <div class="content-wrap">
            <div class="account">
                <div class="main">
                    <p class="main_title">法币交易设置</p>
                    <div class="register-input">
                        <span class="register-item">昵称</span>
                        <input type="text" class="input-main input-content" maxlength="20" v-model="nickname" id="account">
                    </div>
                     <div class="register-input">
                        <span class="register-item">法币资金密码（6-20位，由数字与字母组成）</span>
                        <input type="password" class="input-main input-content" maxlength="16" v-model="pwd" id="pwd">
                    </div>
                     <div class="register-input">
                        <span class="register-item">确认法币资金密码（6-20位，由数字与字母组成）</span>
                        <input type="password" class="input-main input-content" maxlength="16" v-model="rePwd">
                    </div>
                     
                    <div style="margin-top: 10px;">
                        <span class="register-item"></span>
                        <button type="button" class="register-button curPer redBg" @click="reset" >确认</button>
                        
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
      nickname: "",
      pwd: "",
      rePwd: ""
    };
  },

  methods: {
    
    reset() {
      let msg = "";
      let nickname = this.nickname;

      let password = this.pwd;
      let re_password = this.rePwd;
      if (
        nickname == "" ||
        password == "" ||
        re_password == ""
      ) {
        return;
      } else if(password.length>20||password.length<6||re_password.length>20||re_password.length<6){
        layer.msg('密码6-20位，由数字与字母组成');return;
      } else if (password != re_password) {
        layer.msg("两次输入的密码不一致");
        return;
      } else {
        this.$http({
          url: "/api/user/setaccount",
          method: "post",
          data: {
            account: nickname,
            password: password,
            repassword: re_password
          },
          headers: { Authorization: localStorage.getItem("token") }
        }).then(res => {
          layer.msg(res.data.message);
          if (res.data.type == "ok") {
            this.$router.go(-1)
          }
        });
      }
    }
  }
};
</script>

<style scoped>
#legaltrade-set {
  min-height: 1050px;
}
/* .content-wrap{background: #fff center bottom 316px repeat-x,-webkit-linear-gradient(top,#21263f,#171c2b);} */
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
  border: 1px solid #ccc;
  padding: 0 20px;
  font-size: 14px;
  border-radius: 3px;
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
  border: 1px solid #ccc;
  width: 520px;
}
.code-box input {
  width: 406px;
  border: none;
}
.code-box button {
  padding: 0 20px;
  line-height: 47px;
  width: 107px;
}
</style>



// WEBPACK FOOTER //
// src/components/LegalTradeSet.vue