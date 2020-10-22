<template>
    <div class="account-main">
        <div>
            <div class="back-nav fColor1 ft20">
                承兑提现
                <span class="fr fColor2 mouseDefault">&lt;&lt;返回</span>
            </div>
            <div class="nav-after"></div>
        </div>
        <div class="content">
            <div class="tabBar fColor1 ft18">
                <span  v-for="(item,index) in tabList" class="ml25" :class="{'active': index == current}"  @click="change(index)">{{item}}</span>
            </div>
            <div class="container fColor1  mt40">
                <div>
                    <span class="main_title">承兑商</span>
                    <span class="inblock ml40">{{aceiteList.name}}</span>
                </div>
                <div class="mt40">
                    <span class="main_title">手机号码</span>
                    <input type="tel" placeholder="请输入你的手机号码" class="main_input" v-model="submitInfo.mobile">
                </div>
                <div class="mt40">
                    <span class="main_title">交易账号</span>
                    <input type="text" placeholder="请输入你的交易账号" class="main_input" v-model="submitInfo.deal_account">
                </div>
                <div class="mt40" v-if="this.current==0">
                    <span class="main_title">充值金额(CNY)</span>
                    <input type="number" placeholder="请输入你的充值金额" class="main_input" v-model="submitInfo.money"> 
                </div>
                <div class="mt40" v-if="this.current==1">
                    <span class="main_title">提现金额(CNY)</span>
                    <input type="number" placeholder="请输入你的提现金额" class="main_input" v-model="submitInfo.money">
                    <span class="fColor2">(账户余额: {{aceiteList.user_balance}} CNY)</span>
                    <div class="attention ft12 mt15">
                        <p>*注意:</p>
                        <span>提现订单提交成功后请关注订单状态,如果兑商标记已转账后20分钟内用户未确认,该订单会自动确认。</span>
                    </div>
                </div>
                <div class="mt40">
                    <span class="main_title">请选择充值方式:</span>
                    <div class="mt40 paycontent">
                       <div class="paybox payimg inblock"  v-for="(info,index) in chargeInfo" >
                            <p>{{info.type}}</p>
                            <p class="mt5">
                                <span>姓名：{{info.name}}</span>
                                <span>账户：{{info.account}}</span>
                            </p>
                            <p class="choose fColor2">
                                <span>选择</span>
                                <input type="radio" name="choose" :value="index" v-model="way">
                            </p>
                       </div>
                       <!-- <div class="paybox inblock">
                            <p>支付宝</p>
                            <p class="mt5">
                                <span>姓名：{{aceiteList.ali_nickname}}</span>
                                <span>账户：{{aceiteList.ali_account}}</span>
                            </p>
                            <p class="choose fColor2">
                                <span>选择</span>
                                <input type="radio" name="choose">
                            </p>
                       </div>
                       <div class="paybox inblock">
                            <p>{{aceiteList.bank_name}}</p>
                            <p class="mt5">
                                <span>账户：{{aceiteList.bank_account}}</span>
                                <span>地址：{{aceiteList.bank_address}}</span>
                            </p>
                            <p class="choose fColor2">
                                <span>选择</span>
                                <input type="radio" name="choose">
                            </p>
                       </div> -->
                    </div>
                </div>
                <div class="mt40">
                    <div class="btn curPer tc ml20" @click="sendData">
                        确认
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import indexHeader from "@/view/indexHeader";
import left from "@/view/left";
export default {
    name: "rechargeMoney",
    components: {indexHeader,left},
    data (){
        return{
            current:0,
            active:0,
            id:'',
            way: 0 ,
            tabList:["充值","提现"],
            chargeInfo:[
                {type:'微信',name:'',account:'',imgurl:'../assets/images/wx.png'},
                {type:'支付宝',name:'',account:'',imgurl:'../assets/images/zhifubao.png'},
                {type:'银行',name:'',account:'',imgurl:'../assets/images/bank.png'},
                ],
            aceiteList:{},
            submitInfo:{mobile:'',deal_account:'',money:''}
        }
    },
    created(){
        var querys=this.$route.query;
        this.current=querys.current;
        this.id=querys.id;
        this.address=localStorage.getItem('address') || ''
        this.init();
    },
    mounted(){

    },
    methods: {
        change(index) {
            this.current=index;
        },
        setType(){
            this.chargeInfo[0].name=this.aceiteList.wechat_nickname;
            this.chargeInfo[0].account=this.aceiteList.wechat_account;
            this.chargeInfo[1].name=this.aceiteList.ali_nickname;
            this.chargeInfo[1].account=this.aceiteList.ali_account;
            this.chargeInfo[2].type=this.aceiteList.bank_name;
            this.chargeInfo[2].name=this.aceiteList.bank_account;
            this.chargeInfo[2].account=this.aceiteList.bank_address
        },
        init(){
            var i=layer.load();
            this.$ajax({
                url:'/api/' + 'acceptor/info?id='+this.id+'&address='+this.address,
                method:'get'
            }).then(res=>{
                layer.close(i)
                if(res.data.type=='ok'){
                    this.aceiteList=res.data.message;
                    this.setType();
                }
            })
        },
        sendData(){
            // Object.assign(o1, o2, o3)
            if(!this.submitInfo.mobile){
                layer.msg('请输入手机号！')
                return;
            }
            if(!this.submitInfo.deal_account){
                layer.msg('请输入账号！')
                return;
            }
            if(!this.submitInfo.money || this.submitInfo.money<=0){
                layer.msg('请输入金额！')
                return;
            }
            if(this.way===''){
                layer.msg('请选择充值方式！')
                return;
            }
            var way=''
            switch(this.way){
                case 0:
                    way='we_chat';
                    break;
                case 1:
                    way="ali_pay";
                    break;
                case 2:
                    way="bank";
                    break;
            }
            var data={acceptor_id:this.id,address:this.address,way:way,type:this.current==0?'buy':'sell'}
            data=Object.assign(data,this.submitInfo)
            this.$ajax({
                url:'/api/'+'acceptor/deal',
                method:'POST',
                data:data
            }).then(res=>{
                if(res.data.type=='ok'){
                    layer.msg(res.data.message)
                    this.$router.push('coinRecord')
                }else{
                    layer.msg(res.message)
                }
            })
        }

    },


};
</script>
<style scoped lang="scss">
.content{
   .tabBar{
       span{
          line-height: 48px;
          display: inline-block;
          cursor: pointer;
        }
    }
    .container{
        padding:20px;
        .main_title{
            display: inline-block;
            width: 120px;
            color:  #637085;
        }
        .main_input{
            width: 360px;
            height: 40px;
            border: 1px solid #2e3753;
            padding: 0 20px;
            color: #cdd6e4;
            font-size: 14px;
            border-radius: 3px;
            background-color: #171c2b;
            margin-left: 20px;
        }
        .btn{
            width: 200px;
            line-height: 48px;
            background-color: #5697f4;
            border-radius: 4px;
            color: #fff;
        }
        .paycontent{
            color: #fff;
            .paybox:not(:first-child){
                margin-left: 25px;
            }
            .paybox{
                background: url(../assets/images/wx.png) no-repeat 0 0 / 100% 100%;
                // background-size: cover;
                width:260px;
                height: 115px;
                padding: 5px 0 5px 15px;
                font-size: 14px;
                position: relative;
                .mt5{
                    margin-top: 5px;
                }
                input{
                    position: relative;
                    top: 2px;
                    width: 15px;
                    height: 15px;
                }
                span{
                    display: block;
                    margin: 5px 0 ;
                }
                .choose{
                    position: absolute;
                    bottom: 5px;
                    left: 15px;
                    span{
                        display: inline;
                    }
                }
            }
            .paybox:nth-child(2){
                background: url(../assets/images/zhifubao.png) no-repeat 0 0 / 100% 100%;
            }
            .paybox:nth-child(3){
                background: url(../assets/images/bank.png) no-repeat 0 0 / 100% 100%;
            }
        }
        .attention {
            margin-left: 145px;
            color: #E4624A;
        }

    }

}
</style>



// WEBPACK FOOTER //
// src/view/rechargeMoney.vue