<template>
  <div class="login">
    <indexHeader></indexHeader>
    <div class="contentBK">
      <div class="content-wrap">
        <div class="account">
          <div class="main">
            <p class="main_title">{{$t(login.welcome)}}</p>
            <div class="tab flex" @click="account_number=''">
              <span @click="isMb = true" :class="{now:isMb}">{{$t('login.phoneLogin')}}</span>
              <span @click="isMb = false" :class="{now:!isMb}">{{$t('login.emailLogin')}}</span>
            </div>
            <div class="register-input">
              <span class="register-item">{{$t('login.account')}}</span>
              <div class="country-box  bd">
                <div class="flex">
                  <div class="flex between alcenter bdr plr20" v-if="isMb" >
                    <input class="lf_input pointer input_color" type="text" v-model="areaCode" readonly @click="showCode= !showCode">
                    <i class="iconfont icon-xiala ft12" v-if="!showCode"></i>
                    <i class="iconfont icon-shangla_icon ft12" v-else></i>
                  </div>
                  <input type="text" v-model="account_number" id="account" class="phone flex1 codeinput plr20   input_color" autocomplete="off">
                </div>
                <ul class="curPer input_select scroll bg-part bd" v-if="showCode">
                  <li class="flex between alcenter bdb" v-for="(item,index) in country" @click="getCode(item.area_code)">
                    <p>{{item.name_en}}</p>
                    <p class="tr">{{item.area_code}}</p>
                  </li>
                </ul>   
              </div>
              <!-- <input type="text" class="input-main input-content phone" maxlength="20" v-model="account_number" id="account" :style='{width:isMb?"auto":"520px !important"}'> -->
            </div>
            <div class="register-input">
              <span class="register-item">{{$t('login.psw')}}</span>
              <input type="password" class="input-main input-content input_color bd" maxlength="16" v-model="password" id="pwd" autocomplete="off">
            </div>
            <span class="register-item mt20" v-if="shows">{{$t('set.code')}}</span>
            <div class="code-box bd bg-part" v-if="shows" id="code">
              <input type="text" v-model="code" class="code input_color ">
              <button type="button" class="code-btn curPer bg-part input_color bdl" @click="sendCode">{{$t('set.sendCode')}}</button>
            </div>
            <div style="margin-top: 10px;">
              <span class="register-item"></span>
              <button class="register-button curPer" @click="login">{{$t('login.login')}}</button>
              <div class="have-account">
                <router-link
                  tag="span"
                  class="baseColor"
                  to="/forgetPwd"
                  style="cursor:pointer"
                >{{$t('set.forgetPsw')}}</router-link>
              </div>
            </div>
            <div class="right-tip">
              <p>{{$t('login.nouser')}}</p>
              <p>{{$t('login.goRegister')}}</p>
              <router-link :to="{ name: 'register'}">
                <p class="baseColor mt20">{{$t('login.registerFree')}}</p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <indexFooter></indexFooter> -->
  </div>
</template>

<script>
import country from '../lib/country.js'
import indexHeader from "@/view/indexHeader";
import indexFooter from "@/view/indexFooter";
export default {
  name: "login",
  components: { indexHeader, indexFooter },
  data() {
    return {
      account_number: "",
      password: "",
      code: "",
      country:country,
      isMb: true,                  //是否为手机注册
      shows: false,
      areaCode:country[0].area_code,
      showCode:false
    };
  },
  created() {
    this.account_number = this.$route.query.account_number || "";
    var type = this.$route.params.type || '';
    // alert(this.$route.query.isEmail);
    if(this.$route.query.isEmail=='true'){
      // alert(123);

     this.isMb=false;

    }
    if(type==1){
      location.reload();
    }
    if (!localStorage.getItem("socketPort")) {
      this.$ajax({
        url: "/api/env.json",
        method: "get",
        data: {}
      }).then(res => {
        this.shows = res.data.login_need_smscode;
        let socketPort = {
          socketnum: res.data.socket_io_port,
          smcode: res.data.login_need_smscode
        };
        socketPort = JSON.stringify(socketPort);
        localStorage.setItem("socketPort", socketPort);
      });
    } else {
      this.shows = JSON.parse(localStorage.getItem("socketPort")).smcode;
    }
  },
  methods: {
    getCode(code){
      this.areaCode=code;
      this.showCode=false;
    },
    getLang(){
      var lang = window.localStorage.getItem("locale") || "en";
      var token = window.localStorage.getItem("token") || "";
      this.$ajax({
        url:'/api/' + 'set/lang',
        method:'post',
        headers: { Authorization: token },
        data:{lang:lang}, 
        }).then(res => {
      })
    },
    userInfo() {
      this.$ajax({
        url: "/api/" + "user/info",
        method: "get",
        data: {},
        headers: { Authorization: localStorage.getItem("token") }
      })
        .then(res => {
          if (res.data.type == "ok") {
            console.log('user-id'+res.data.message.id)
            localStorage.setItem("user_id", res.data.message.id);
            // localStorage.setItem('email',res.data.message.email);
            localStorage.setItem("extension_code",res.data.message.extension_code);
            localStorage.setItem("is_seller", res.data.message.is_seller);
            localStorage.setItem("type", res.data.message.type);
            eventBus.$emit("seller", res.data.message.is_seller);
            eventBus.$emit("type", res.data.message.type);
            setTimeout(()=>{
              this.$router.push("/");
            },500)
          }
        })
        .catch(error => {});
    },
    // 发送验证码
    sendCode(e) {
      var that = this;
      let isMb = this.isMb;
      let url = "sms_send";
      if (this.account_number.length == "") {
<<<<<<< HEAD
        layer.tips(this.$t('set.enterAccount'), "#account");
=======
        this.$layer.tips(this.$t('set.enterAccount'), "#account");
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
        return;
      } else if (e.target.disabled) {
        return;
      }else if (isMb){

      }else if(!isMb){
        url = "sms_mail";
      }else{
        
      }
     
      let data = { user_string: this.account_number, scene: "login" };
      data.country_code = this.areaCode
      this.$ajax({
        url: "/api/" + url,
        method: "post",
        data: data
      }).then(res => {
<<<<<<< HEAD
        layer.msg(res.data.message);
=======
        this.$layer.msg(res.data.message);
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
        if(res.data.type=='ok'){
          // layer.msg()
            var time = 60;

           this.timer = setInterval(function() {
            e.target.innerHTML = time + 's';
            e.target.disabled = true;
            if (time == 0) {
              clearInterval(that.timer);
              e.target.innerHTML = that.$t('set.sendCode');
              e.target.disabled = false;
              return;
            }
            time--;
          }, 1000);
        }
      });
    },
    login() {
      let account_number = this.$utils.trim(this.account_number);
      let password = this.$utils.trim(this.password);
      if (this.account_number.length == "") {
<<<<<<< HEAD
        layer.tips(this.$t('set.enterAccount'), "#account");
        return;
      }
      if (this.password.length < 6) {
        layer.tips(this.$t('login.psw6'), "#pwd");
=======
        this.$layer.tips(this.$t('set.enterAccount'), "#account");
        return;
      }
      if (this.password.length < 6) {
        this.$layer.tips(this.$t('login.psw6'), "#pwd");
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
        return;
      }
      if (this.shows) {
        if (!this.code) {
<<<<<<< HEAD
          layer.tips(this.$t('set.enterCode'), "#code");
=======
          this.$layer.tips(this.$t('set.enterCode'), "#code");
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
          return;
        }
      }
      let areaCode=this.areaCode.substr(this.areaCode.indexOf("+")+1);      
      let areaCodeId=0;
	  if(this.isMb){
		  if(areaCode==86){
			areaCodeId=1;
		  }
	  }
     // var i = this.$layer.load();
      this.$ajax({
        url: "/api/" + "user/login",
        method: "post",
        data: {
          user_string: account_number,
          password: password,
          sms_code: this.code,
          area_code: areaCode,
          area_code_id:areaCodeId,
        }
      })
        .then(res => {
          //this.$layer.close(i);
<<<<<<< HEAD
          console.log("查看登录结果");
          console.log(res);
=======
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
          res = res.data;
          if (res.type === "ok") {
            localStorage.setItem("token", res.message);
            localStorage.setItem("accountNum", account_number);
            localStorage.setItem("user_id", res.id);
            this.$store.commit("setAccountNum");
            this.getLang();
            this.userInfo();
          } else {
<<<<<<< HEAD
            layer.msg(res.message);
=======
            this.$layer.msg(res.message);
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  // beforeRouteEnter(to, from, next) {
  //   if (from.name == "dealCenter") {
  //     window.location.reload();
  //   }
  //   next();
  // }
};
</script>

<style scoped >
.content-wrap {
  background: url(../../static/imgs/bg_login.png) center bottom 316px repeat-x,
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
.tab{
  margin-top: 20px;
  /* width: 230px; */
}
.tab span{
  padding-bottom: 5px;
  margin-right: 40px;
  cursor: pointer;
  color: #c7cce6;
}
.tab .now{
  color: #7a98f7;
  /* font-weight: 600; */
  border-bottom: 2px solid #7a98f7;
}
.chooseTel{
  height: 46px;
  width: 160px;
  border-color: #4e5b85;
  padding: 0 10px;
  font-size: 14px;
  background: #1e2235;
  color: #fff;
  border-radius: 3px;
}
.phone{
  width: 360px!important;
  border-left: none;
}
input{background: transparent}
.input-main,.country-box{
  width: 520px;
  min-height: 46px;
  /* border: 1px solid #4e5b85; */
  padding: 0 20px;
  color: #c7cce6;
  font-size: 14px;
  border-radius: 3px;
  /* background-color: #1e2235; */
  position: relative;
}
input{
  /* color: #c7cce6; */
  /* text-fill-color: #c7cce6; */
  /* -webkit-text-fill-color: #c7cce6; */
}
.lf_input{
  width: 80px;
  border: none;
  height: 44px;
  border-radius: 0;
  padding: 0;
}

.plr20{
    padding-left: 10px;
    padding-right: 10px;
  }
.country-box{
  padding: 0;
}
.codeinput{
  border: none;
  height: 44px;
}
.input_select{
  width: 100%;
  position: absolute;
  z-index: 5;
  left: 0;
  right: 0;
  top: 46px;
  max-height: 250px;
  overflow-y: auto;
  box-shadow: 0 2px 6px 0 #000;
  /* border-color: #d1d3df; */
  /* background-color: #171c2b; */
  color: #9194a4;
}
.input_select li{
  padding: 15px;
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
  height: 46px;
  background-color: #1e2235;
  border: 1px solid #4e5b85;
}
.code-box input {
  border: none;
  height: 44px;
  min-height: 44px;
  width: 420px;
  background-color: rgba(0, 0, 0, 0);
  color: #fff;
  padding-left: 20px;
}
.code-box button {
  border: none;
  line-height: 43px;
  width: 93px;
  color: #c7cce6;
  border-left: 1px solid #4e5b85;
  background: #1e2235;
}
</style>



// WEBPACK FOOTER //
// src/components/login.vue