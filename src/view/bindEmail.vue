<template>
<div id="bind-email">
    <!-- <indexHeader></indexHeader> -->
    <div class="contentBK">
        <div class="content-wrap">
            <div class="account">
                <div class="main" >
                    <p class="main_title">绑定邮箱</p>
                    <div class="register-input">
                        <span class="register-item">邮箱</span>
                        <input type="text" class="input-main input-content" maxlength="20" v-model="account_number" id="account">
                    </div>
                     <div class="register-input code-input" >
                        <span class="register-item">验证码</span>
                        <div class="code-box">
                            <input type="text" class="input-main input-content" maxlength="16" v-model="phoneCode" id="pwd" >
                        <button type="button" @click="setTime">获取验证码</button>
                        </div>
                    </div>
                    <div style="margin-top: 10px;">
                        <span class="register-item"></span>
                        <button class="register-button curPer" type="button" @click="check">确认绑定</button>
                        
                    </div>
                   
                </div>
              
            </div>
        </div>
    </div>
    <!-- <indexFooter></indexFooter> -->
</div>

</template>

<script>
import indexHeader from "@/view/indexHeader";
import indexFooter from "@/view/indexFooter";
export default {
  components: { indexHeader, indexFooter },
  data() {
    return {
      account_number: "",
      phoneCode: "",
      showReset: false
    };
  },
  created() {},
  methods: {
    sendCode() {
      this.$ajax({
        url: "/api/sms_mail",
        method: "post",
        data: {
          user_string: this.account_number
        }
      }).then(res => {
        layer.msg(res.data.message);
      });
    },
    setTime(e) {
      if (e.target.disabled) {
        return;
      } else {
        var emreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (this.account_number == "") {
          layer.tips("请输入邮箱", "#account");
          return;
        } else if (!emreg.test(this.account_number)) {
          layer.tips("您输入的邮箱账号不符合规则!", "#account");
          return;
        }

        this.sendCode();
        var time = 60;
        var timer = null;
        timer = setInterval(function() {
          e.target.innerHTML = time + "秒";
          e.target.disabled = true;
          if (time == 0) {
            clearInterval(timer);
            e.target.innerHTML = "验证码";
            e.target.disabled = false;
            return;
          }
          time--;
        }, 1000);
      }
    },
    check() {
      var emreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      let user_string = this.account_number;
      var isEmail = emreg.test(user_string);

      var data = {};

      if (user_string == "") {

        layer.tips("请输入邮箱!", "#account");
        return;
      } else if (this.phoneCode == "") {
        layer.tips("请输入验证码!", "#pwd");
        return;
      } 
      data.code = this.phoneCode;
      data.email = user_string;
      this.$ajax({
        url: "/api/safe/email",
        method: "post",
        data: data,
        headers:{Authorization:window.localStorage.getItem('token')}
      }).then(res => {
        layer.msg(res.data.message);
        if (res.data.type == "ok") {
          this.$router.go(-1)
          // window.location.href = "resetpass.html?user_string=" + names + "&" + "code=" + verify;
          // this.$router.push({path:'/resetPwd',params:{user_string:user_string,code:this.phoneCode}})
        }
      });
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
// src/view/bindEmail.vue