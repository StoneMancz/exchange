<template>
    <div class="account-main">
        <div class="clear mb50">
            <div class="fl">
                <img src="@/assets/images/account_security.png"/>
            </div>
            <div  class="fl ml30">
                 <p class="ft16 white">{{$t('set.uaccont')}}
                    <span  class="ml10">{{lever}}</span>
                </p>
                <div class="bar-bottom">
                    <div  class="bar-top" :style="widthBar"></div>
                </div>
                <p class="fColor2 ft14">
                    {{$t('set.uaccont')}} {{lever}}，{{$t('set.complete')}}
                </p>
            </div>
        </div>
        <ul >
            <li><img src="@/assets/images/success.png" >
                <span class="ml20">{{$t('set.mycode')}}</span>
                <p class="fl">
                    <span class="fColor1">{{extension_code}}</span>
                </p>
                <span class="fr base ml25 mouseDefault"></span>
                <span class="fr base mouseDefault" id="copy" @click="copy(1)">{{$t('set.copycode')}}</span>
            </li>
             <li><img src="@/assets/images/success.png" >
                <span class="ml20">{{$t('set.mycode2')}}</span>
                <p class="fl">
                    <span class="fColor1">{{auth_code}}</span>
                </p>
                <span class="fr base ml25 mouseDefault"></span>
                <span class="fr base mouseDefault" id="copy" @click="copy(2)">{{$t('set.copycode2')}}</span>
            </li>
            <li v-if="account.length>0"><img  :src="psrc" >
                <span  class="ml20">{{$t('set.bindphone')}}</span>
                <p  class="fl">
                    <span class="fColor1">{{account}}</span>
                </p>
                <span  class="fr base ml25 mouseDefault"></span>
                <span  class="fr base mouseDefault"></span>
            </li>
            <li v-if="email.length>0">
                <img  :src="esrc">
                <span  class="ml20">{{$t('set.bindemail')}}</span>
                <p  class="fl">{{email}} </p>
                <span  class="fr base ml25 mouseDefault"></span>
                <span  class="fr base mouseDefault"></span>
                <router-link class="fr base" to="/bindEmail" v-if="email == ''">{{$t('set.bind')}}</router-link>
                <span class="fr base" v-else>{{$t('set.binded')}}</span>
            </li>
            <li><img src="@/assets/images/success.png">
                <span class="ml20">{{$t('set.loginpwd')}}</span>
                <p class="fl">{{$t('set.net')}}</p>
                <span class="fr base ml25 mouseDefault"></span>
                <span class="fr base mouseDefault"  @click="goPwd()">{{$t('set.reset')}}</span>
            </li>
            <li>
                <img :src="msrc">
                <span class="ml20">{{$t('lever.psw')}}</span>
                <p class="fl">{{$t('set.setPsw')}}</p>
                <span class="fr ml25 mouseDefault"></span>
                <router-link class="fr base mouseDefault" to="/bindmpwd">{{$t('set.goSet')}}</router-link>
            </li>
            <!-- <li v-if="type==1"><img :src="bsrc">
                <span class="ml20">{{$t('set.bindAccount')}}</span>
                <p class="fl">{{user_name}}</p>
                <span class="fr base ml25 mouseDefault"></span>
                <span class="fr base mouseDefault"  @click="goBind()">{{isbind}}</span>
            </li> -->
        </ul>
    </div>
</template>
<script>
import "@/lib/clipboard.min.js"
export default {
    name:'accountSet',
    data(){
        return {
            routerList:[],
            account:this.$t('set.noBind'),
            email:this.$t('set.noBind'),
            isbind:this.$t('set.binds'),
            extension_code:'',
            user_name:this.$t('set.duihuan'),
            lever:this.$t('set.min'),
            widthBar:'width: 25%',
            bar:25,
            authen:0,
            type:'',
            psrc:require('@/assets/images/icon_error.png'),
            esrc:require('@/assets/images/icon_error.png'),
            bsrc:require('@/assets/images/icon_error.png'),
            msrc:require('@/assets/images/success.png'),
            auth_code:'',
        }
    },
    created(){
        this.type=window.localStorage.getItem("type") || "";
        this.userInfo();
        this.bindInfo();
        this.getAuthcode()
    },
    methods:{
         getAuthcode(){
             this.$ajax({
                url: '/api/'+'user/authorization_code',
                method:'get',
                data:{},  
                headers: {'Authorization':  localStorage.getItem('token')},    
            }).then(res=>{
                 if(res.data.type == 'ok'){
                     this.auth_code=res.data.message;
                 }
            })
        },
        goPwd(){
            this.$router.push({path:'/forgetPwd',query:{fromSet:true}});
        },
        goBind(){
            this.$router.push('/bindInfo');
        },
        userInfo(){
            this.$ajax({
                url: '/api/'+'user/info',
                method:'get',
                data:{},  
                headers: {'Authorization':  localStorage.getItem('token')},    
            }).then(res=>{
                if(res.data.type == 'ok'){
                    if(res.data.message.phone!=null){
                        this.account=res.data.message.phone;
                        this.psrc=require('@/assets/images/success.png');
                        this.bar=this.bar+25;
                    }
                    if(res.data.message.email!=null){
                        this.email=res.data.message.email;
                        this.esrc=require('@/assets/images/success.png');
                        this.bar=this.bar+25;
                    }
                    this.extension_code=res.data.message.extension_code;
                    this.authen=res.data.message.review_status;
                    if(this.authen==2){
                        this.bar=this.bar+25;
                    }
                    if(this.bar==50){
                        this.lever=this.$t('set.middle');
                    }else if(this.bar==75){
                        this.lever=this.$t('set.heigh'); 
                    }else if(this.bar==100){
                        this.lever=this.$t('set.strong');
                    }
                    this.widthBar='width:'+this.bar+'%';
                }
                }).catch(error=>{
                    
            })               
        },
        bindInfo(){
            this.$ajax({
                url: '/api/'+'jc/bind',
                method:'get',
                data:{},  
                headers: {'Authorization':  localStorage.getItem('token')},    
            }).then(res=>{
                if(res.data.type == 'ok'){
                    if(res.data.message.user_name){
                        this.user_name=res.data.message.user_name;
                        this.isbind=this.$t('set.reset');
                        this.bsrc=require('@/assets/images/success.png');
                    }
                   
                }else{

                }
                }).catch(error=>{
                    
            })         
        },
        copy(e){
            if(e==1){
                var that=this;
                var loc= location.origin;
                var clipboard = new Clipboard('#copy',{
                    text:function(){
                        return loc+'/dist/#/components/register?extension_code='+that.extension_code
                    }
                });
                clipboard.on("success", function (e) {
                    that.flags = true;
                    layer.msg(that.$t('set.copysuccess'));       
                });
                clipboard.on("error", function (e) {
                    that.flags = false;
                    layer.msg(that.$t('set.recopy'))
                });
            }else{
                 var that=this;
                var loc= location.origin;
                var clipboard = new Clipboard('#copy',{
                    text:function(){
                        return that.auth_code
                    }
                });
                 clipboard.on("success", function (e) {
                    that.flags = true;
                    layer.msg(that.$t('set.copysuccess'));       
                });
                clipboard.on("error", function (e) {
                    that.flags = false;
                    layer.msg(that.$t('set.recopy'))
                });
            }
            
        },
    }
}
</script>
<style lang="scss" scoped>
$navBack:#1a243b;	
$base:#5697f4;
$line:#303b4b;
$fColor2:#637085;
.account-main {
    padding-left: 34px;
    padding-right: 34px;
    padding-top: 34px;
    .bar-bottom {
      width: 320px;
      height: 8px;
      border-radius: 4px;
      background-color: #254c84;
      margin: 22px 0 12px 0;
      overflow: hidden;
      .bar-top {
        background-color: $base;
        height: 100%;
        border-radius: 4px;
      }
    }
    ul {
      border-top: 1px solid $line;
      color: $fColor2;
      font-size: 14px;
      img {
        width: 16px;
        vertical-align: middle;
      }
      li {
        border-bottom: 1px solid $line;
        line-height: 72px;
        position: relative;
        p {
          position: absolute;
          left: 300px;
          top: 0;
        }
      }
    }
  }
</style>





// WEBPACK FOOTER //
// src/view/accountSet.vue