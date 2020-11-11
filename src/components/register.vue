<template>
  <div id="register-box">
    <indexHeader></indexHeader>
    <div class="reg-content flex">
      <div class="left-box">
        <div class="title whites">{{$t('register.register')}}</div>
        <div class="tab">
          <span :class="['pointer',{'active':isMb}]" @click="setIsMb(true)">{{$t('register.phoneRegister')}}</span>
          <span :class="['pointer',{'active':!isMb}]" @click="setIsMb(false)">{{$t('register.emailRegister')}}</span>
        </div>
        <div class="step-one" v-show="!codeTrue">
          <p class="tip">{{$t('register.country')}}</p>
          <div class="country-box bg-part">
            <div class="flex between alcenter plr20">
              <input class="pointer lf_input input_color bd bg-part" style="width:490px" type="text" v-model="areaCity" readonly @click="showCity= !showCity,showCode=false">
              <i class="iconfont icon-xiala ft12" v-if="!showCity"></i>
              <i class="iconfont icon-shangla_icon ft12" v-else></i>
            </div>
            <ul class="curPer input_select scroll bg-part" v-if="showCity">
              <li class="flex between alcenter bdb" v-for="(item,index) in country" @click="getCity(item.name_en,item.area_code)">
                <p>{{item.name_en}}</p>
                <p class="tr">{{item.name_cn}}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="account-box ">
          <div class="tip" v-if="isMb">{{$t('register.enterPhone')}}</div>
          <div class="tip" v-if="!isMb">{{$t('register.enterEmail')}}</div>
          <div class="country-box bgtrans" v-if="isMb">
            <div class="flex">
              <div class="flex between alcenter bdr plr20 ">
                <input class="lf_input pointer input_color bd bg-part" type="text" v-model="areaCode"  readonly @click="showCode= !showCode,showCity=false">
                <i class="iconfont icon-xiala ft12" v-if="!showCode"></i>
                <i class="iconfont icon-shangla_icon ft12" v-else></i>
              </div>
               
              <!-- <select name="" v-if="isMb" class="chooseTel" v-model="areaCode" ref="select">
                <option :value="index" v-for="(item,index) in country" :key="index">{{item.area_code}} {{item.name_cn}}</option>
              </select> -->
              <input type="number" v-if="isMb" v-model="account" class="phone flex1 codeinput input_color bd bg-part">
            </div>
            <ul class="curPer input_select scroll bg-part" v-if="showCode">
              <li class="flex between alcenter bdb" v-for="(item,index) in country" @click="getCode(item.area_code)">
                <p>{{item.name_en}}</p>
                <p class="tr">{{item.area_code}}</p>
              </li>
            </ul>   
          </div>
          <input type="text" v-if="!isMb" v-model="account" class="input_color bd bg-part">
        </div>
          <!-- <div class="tip" style="margin-bottom:10px">{{$t('set.enterCode')}}</div> -->
          <!-- <div class="code-box flex between">
            <input type="text" v-model="code" class="code input_color bd bg-part">
            <button type='button' class="code-btn curPer bg-part  input_color" @click="sendCode">{{$t('set.sendCode')}}</button>
          </div> -->
          <div class="pwd-box">
            <div class="tip">{{$t('set.enterPsw')}}</div>
            <input type="password" v-model="pwd" class="pwd-input input_color bd bg-part" :placeholder="$t('register.psw16')">
          </div>
          <div class="repwd-box">
            <div class="tip">{{$t('set.enterPswagain')}}</div>
            <input type="password" v-model="repwd" class="repwd-input input_color bd bg-part" :placeholder="$t('set.enterPswagain')">
          </div>
          <div class="invite-box">
            <div class="tip">{{$t('register.inviteCode')}}</div>
            <!-- <input type="text" v-model="invite" class="invite-input" :placeholder="$t('register.sel')"> -->
            <input type="text" readonly v-if="inviteBool"  v-model="invite" class="invite-input input_color bd bg-part" :placeholder="$t('register.inviteCode')">
            <input type="text" v-if="!inviteBool"  v-model="invite" class="invite-input input_color bd bg-part" :placeholder="$t('register.inviteCode')">
          </div>
          <div class="flex alcenter ft12 mt20">
            <input type="checkbox" class="check" v-model="read" @click='readme'>
            <span class="ml5 baseColor">{{$t('register.read')}}</span>
            <router-link to="/policy" class="ml5 baseColor curPer " >{{$t('register.xieyi')}}</router-link>
          </div>
          <button type="button" @click="register" class="reg-btn confirm-btn curPer radius4">{{$t('register.register')}}</button>
        </div>
        <div>
          <div class="right-tip ft12">
            <p>{{$t('register.tips01')}}</p>
            <p>{{$t('register.tips02')}}</p>
            <p>{{$t('register.tips03')}}</p>
            <p>{{$t('register.tips04')}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import country from '../lib/country.js'
import indexHeader from "@/view/indexHeader";
export default {
  components: {
    indexHeader
  },
  data() {
    return {
      codeTrue: false,             //验证码是否正确
      isMb: true,                  //是否为手机注册
      account: "",                //用户名
      pwd: "",                    //密码
      repwd: "",                  //重复密码
      code: "",                   //验证码
      invite: "",                  //邀请码
      inviteBool:false,
      read:true,                 //用户协议
      timer: "",                  //倒计时timer
      country:country,
      areaCity:country[0].name_en,
      areaCode:country[0].area_code,
      showCity:false,
      showCode:false
    };
  },
  created() {
    // console.log(this.country)
    var invite=this.get_all_params().extension_code;
    if(invite){
      this.inviteBool=true;
      this.invite=invite;
    }
    var emreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    var haccount = this.$route.query.haccount;
    if(haccount){
      this.account=haccount;
    }
    if(haccount&&emreg.test(haccount)){
      this.isMb=false;
    }
  },
  methods: {
    get_all_params() {
      var url = location.href;
      var nameValue;
      var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
      var paraObj = {};
      for (var i = 0; nameValue = paraString[i]; i++) {
          var name = nameValue.substring(0, nameValue.indexOf("=")).toLowerCase();
          var value = nameValue.substring(nameValue.indexOf("=") + 1, nameValue.length);
          if (value.indexOf("#") > -1) {
              value = value.split("#")[0];
          }
          paraObj[name] = decodeURI(value);
      }
      return paraObj;
    },
    getCode(code){
      this.areaCode=code;
      this.showCode=false;
    },
    getCity(city,code){
      this.areaCity=city;
      this.areaCode=code;
      this.showCity=false;
    },
    // 切换注册方式
    setIsMb(boo) {
      this.account = "";
      this.pwd = "";
      this.repwd = "";
      this.code = "";
      this.isMb = boo;
      this.codeTrue = false;
      this.showList = false;
      
      clearInterval(this.timer);
      var codeBtn = document.querySelector(".code-btn");
      codeBtn.disabled = false;
      codeBtn.innerHTML = this.$t('set.code');
    },
    // 发送验证码
    sendCode(e) {
      let that = this;
      let isMb = this.isMb;
      let url = "sms_send";
      if (this.account == "") {
        layer.msg(this.$t('set.enterAccount'));
        return;
      } else if (e.target.disabled) {
        return;
      } else if (isMb) {
        var reg = /^1[3456789]\d{9}$/;
        if (!reg.test(this.account)) {
          layer.msg("您输入的手机号不符合规则");
          return;
        }
      } else if (!isMb) {
        var emreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (!emreg.test(this.account)) {
          layer.msg(this.$t('register.emailFalse'));
          return;
        } else {
          url = "sms_mail";
        }
      } else {
      }
      let data = { user_string: this.account };
      if(this.areaCode=="+86"){
        data.area_code_id=1;
      }else{
        data.area_code_id=0; 
      }
      data.area_code=this.areaCode.substr(this.areaCode.indexOf("+")+1);
      data.scene = 'register';
      let loa = layer.load();
      this.$ajax({
        url: "/api/" + url,
        method: "post",
        data: data
      }).then(res => {
        console.log("===查看返回数据===");
        console.log(res);
        layer.close(loa);
        layer.msg(res.data.message);
        if(res.data.type=='ok'){
          var time = 60;
          this.timer = setInterval(function() {
            e.target.innerHTML = time + "s";
            e.target.disabled = true;
            if (time == 0) {
              clearInterval(that.timer);
              console.log(that.$t('set.sendCode'))
              e.target.innerHTML = that.$t('set.sendCode');
              e.target.disabled = false;
              return;
            }
            time--;
          }, 1000);
        }else{
          e.target.disabled = false;
        }
      });
    },
    // 验证验证码
    checkCode() {
      let code = this.code;
      if(this.account == ''){
        layer.msg(this.$t('set.enterAccount'));return;
      }
      else if (this.code == "") {
        layer.msg(this.$t('set.enterCode'));
        return;
      } else {
        let data = {};
        let url = "user/check_email";
        if (this.isMb) {
          data = { mobile_code: this.code };
          url = "user/check_mobile";
        } else {
          data = { email_code: this.code };
        }
       
        this.$ajax({
          url: "/api/" + url,
          method: "post",
          data: data
        }).then(res => {
          layer.msg(res.data.message);

          if (res.data.type == "ok") {
            this.codeTrue = true;
            this.getRegion("", "provinces");
          } else {
          }
        });
      }
    },
    readme(){
      this.read=!this.read;
    },
    // 注册
    register() {
      let code = this.code;
      if(this.invite==''){
         layer.msg(this.$t('register.inviteCode')+this.$t('register.sel'));return;
      }
      if(this.account == ''){
        layer.msg(this.$t('set.enterAccount'));return;
      }else if (this.code == "") {
        layer.msg(this.$t('set.enterCode'));
        return;
      }
      else if (this.pwd == "") {
        layer.msg(this.$t('set.enterPsw'));
        return;
      }else if(this.pwd.length <6 || this.pwd.length >16){
        layer.msg(this.$t('register.psw16'));return;
      }
       else if (this.repwd == "") {
        layer.msg(this.$t('set.enterPswagain'));
        return;
      } else if (this.pwd !== this.repwd) {
        layer.msg(this.$t('set.pswFalse'));
        return;
      } else if(!this.read){
        return;
      }
      var data = {};
      var isMb = this.isMb;
      data.type = isMb ? "mobile" : "email";
      data.user_string = this.account;
      data.code = this.code;
      data.password = this.pwd;
      data.re_password = this.repwd;
      data.extension_code = this.invite;
      data.area_code=this.areaCode.substr(this.areaCode.indexOf("+")+1);
      if(this.areaCode=="+86"){
        data.area_code_id=1;
      }else{
        data.area_code_id=0; 
      }
      data.nationality = this.areaCity;
      if(isMb){
        // var index = this.$refs.select.selectedIndex;
        // data.nationality = this.country[index].name_cn
        // console.log(this.country[index].name_cn)
      }
      var loa = layer.load();
      this.$ajax({
        url: "/api/" + "user/register",
        data: data,
        method: "post"
      }).then(res => {
        layer.close(loa);
        if (res.data.type == "ok") {
          // layer.msg(res.data.message.msg);
          this.$router.push("/components/login?isEmail="+!isMb);
        }else{
          layer.msg(res.data.message);
        }
      });
    }
  }
};
</script>

<style lang='scss'>
#register-box {
  .tip {
    margin: 10px 0;
    color: #61688a;
    font-size: 12px;
  }
  .reg-content {
    padding: 100px 0 100px 100px;
    .left-box{
      width: 525px;
    > div > div{
      margin: 10px 0 15px;
    }

    color: #c7cce6;
    input,.country-box {
      width: 520px;
      height: 46px;
      // border: 1px solid #4e5b85;
      border-radius:0;
      padding: 0 20px;
      // color: #c7cce6;
      font-size: 14px;
      // border-radius: 3px;
      background-color: #1e2235;
      position: relative;
      span{
        min-width: 80px;
      }
      .lf_input{
        width: 80px;
        border: none;
        height: 46px;
        border-radius: 0;
        padding: 0;
      }
      // .bdr{border-right: 1px solid #4e5b85}
    }
    .country-box{
      padding: 0;
      .plr20{
        padding-left: 10px;
        padding-right: 10px;
      }
    }
    .codeinput{
      border: none;
      height: 46px;
    }
    .input_select{
      width: 100%;
      position: absolute;
      z-index: 5;
      left: 0;
      right: 0;
      top: 46px;
      // display: none;
      max-height: 250px;
      overflow-y: auto;
      // box-shadow: 0 2px 6px 0 #000;
      // border-color: #d1d3df;
      // background-color: #171c2b;
      color: #9194a4;
      li{
        padding: 15px;
      }
    }
    .chooseTel{
      height: 46px;
      width: 160px;
      // border-color: #4e5b85;
      padding: 0 10px;
      font-size: 14px;
      // background: #1e2235;
      // color: #fff;
    }
    .phone{
      width: 360px!important;
      border-left: none;
    }
    .check{
      width: auto;
      height: auto;
      min-height: auto;
      padding: 0;
    }
    > .title {
      font-size: 30px;
    }
    > .tab {
      margin: 10px 0 20px;
      span {
        margin: 0 20px;
        padding-bottom: 5px;
      }
    }
    .active {
      color: #7a98f7;
      border-bottom: 2px solid #7a98f7;
    }
    .code-box {
      width: 520px;
      height: 46px;
      // background-color: #1e2235;
      // border: 1px solid #4e5b85;
      input {
        border: none;
        height: 44px;
        min-height: 44px;
        width: 420px;
      }
      
    }
  }
}
button {
    border: none;
    line-height: 43px;
    width: 93px;
    color: #c7cce6;
    // border-left: 1px solid #4e5b85;
    background: #1e2235;
  }
  .right-tip{
    color: #61688a;
    margin-top: 120px;
    margin-left: 100px;
    p{
      margin-top: 20px;
    }
  }
  .reg-btn,
  .confirm-btn {
    line-height: 46px;
    width: 200px;
    margin: 20px 0 0;
    border: none;
    background: #7a98f7;
    color: #fff;
  }
  .area-box {
    position: relative;
    width: 520px;
    line-height: 44px;
    // background-color: #1e2235;
    color: #c7cce6;
    text-align: center;
    height: 46px;
    .light {
      color: #7a98f7;
    }
    // overflow: hidden;
    .area {
      display: flex;
      border: 1px solid #4e5b85;
      > div {
        flex: 1;
      }
      .city {
        border-left: 1px solid #4e5b85;
        border-right: 1px solid #4e5b85;
      }
    }
    .area-list {
      position: absolute;
      width: 520px;
      top: 46px;
      left: 0;
      display: flex;
      z-index: 999;

      > ul {
        flex: 1;
        // background-color: #1e2235;
        height: 265px;
        overflow: scroll;
      }
      > ul::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
</style>