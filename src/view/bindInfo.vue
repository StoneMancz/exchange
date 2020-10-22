<template>
<div class="forget-box">
    <indexHeader></indexHeader>
    <div class="contentBK">
        <div class="content-wrap">
            <div class="account">
                <div class="main">
                    <p class="main_title">账号绑定</p>
                    <label style="display:none;"><span></span><input type="text" name="hidden1" ></label>
                    <label style="display:none;"><span></span><input type="password" name="hidden2" ></label>
                    <div class="register-input">
                        <span class="register-item">账号</span>
                        <input type="text" class="input-main input-content" maxlength="20" v-model="account_number" id="account" autocomplete="off">
                    </div>
                    <div class="register-input">
                        <span class="register-item">密码</span>
                        <input type="password" class="input-main input-content" maxlength="20" v-model="password" id="password" autocomplete="off">
                    </div>

                    <div style="margin-top: 10px;">
                        <span class="register-item"></span>
                        <button class="register-button curPer" type="button" @click="submit">确认</button>
                    </div>
                   
                </div>
            </div>
        </div>
    </div>
    <indexFooter></indexFooter>
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
      password:""
    };
  },
  created() {
    this.bindInfo();
  },
  methods: {
    bindInfo(){
        this.$ajax({
            url: '/api/'+'jc/bind',
            method:'get',
            data:{},  
            headers: {'Authorization':  localStorage.getItem('token')},    
        }).then(res=>{
            if(res.data.type == 'ok'){
                this.account_number=res.data.message.user_name;
            }else{

            }
            }).catch(error=>{
                
        })         
    },
    submit() {
      if (this.account_number == "") {
        layer.msg("请输入账号");
        return;
      } 
      if (this.password == "") {
        layer.msg("请输入密码");
        return;
      } 
        let data = {
          user_name: this.account_number,
          password: this.password,
        };
        this.$ajax({
          url: "/api/jc/bind",
          method: "post",
          data: data,
          headers: {'Authorization':  localStorage.getItem('token')},
        }).then(res => {
          if (res.data.type == "ok") {
            layer.msg(res.data.message);
            setTimeout(function(){
                location.reload();
            },1500)
            }else{
                layer.msg(res.data.message);
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
input{
  color: #c7cce6;
  text-fill-color: #c7cce6;
  -webkit-text-fill-color: #c7cce6;
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
// src/view/bindInfo.vue