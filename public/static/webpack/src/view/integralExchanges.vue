<template>
    <div class="account-mains wrap fColor1">
        <div class="title flex between alcenter jscenter">
            <span>{{$t('jc.title')}}</span>
            <p class="out tc" @click="out">{{$t('jc.out')}}</p>
        </div>
        <div class="main-content mt20">
            <ul class="flex alcenter center tc topboxs" style="padding-top:20px;">
                    <li>
                        <p>JC{{$t('jc.balance')}}</p>
                        <span>{{number}}</span>
                    </li>
                    <li>
                        <p>{{$t('jc.cannum')}}</p> 
                        <span class="rate">{{canuse}}</span>
                    </li> 
                    <li>
                        <p>BEAU{{$t('jc.new')}}</p> 
                        <span class="rate">${{mkPrice}}</span>
                    </li>
                    <!-- <li>
                        <p>兑换数量</p>
                        <input type="number" placeholder="请输入JC数量" class="numbers" v-model="numbers">
                    </li> -->
                    

                </ul>
            <!-- <div class="inbox flex center">
                
                <div>

       
                   
                </div>
                
            </div> -->
            <div class="mt60 tc flex alcenter between" style="width:60%;margin:0 auto;margin-top:60px;">
                <div class="flex alcenter">
                    <p>{{$t('jc.exnum')}}</p>
                    <input type="number" :placeholder="$t('jc.pnum')" class="numbers" v-model="numbers">
                </div>
                <div class="tc">
                    <span>{{$t('jc.canex')}}</span> 
                    <span class="ml10 red">≈{{dnum}}</span>
                </div>
                <input type="button" :value="$t('jc.exnow')" class="submit" @click="submit">
            </div>
            <div class="mt60">
                <div class="record flex ">
                    <p>{{$t('jc.record')}}</p>
                    <p class="ml20 baseColor">
                        <router-link to="/">{{$t('jc.gotd')}}</router-link>
                    </p>
                </div>
                <div class="mt10 flex tc ft12 plr20">
                    <div class="flex1">{{$t('jc.exnum')}}</div>
                    <div class="flex1">{{$t('jc.usenum')}}</div>
                    <div class="flex1">{{$t('jc.exprice')}}</div>
                    <!-- <div class="flex1">手续费</div>
                    <div class="flex1">费率</div>
                    <div class="flex1">积分价值</div> -->
                    <div class="flex1">{{$t('jc.extime')}}</div>
                </div>
                <ul class="plr20 ulbox scroll ft14">
                    <li class="libg mt10 flex tc" v-for="(item,index) in hislist">
                        <div class="flex1">{{item.exchange_num}}</div>
                        <div class="flex1">{{item.integral}}</div>
                        <div class="flex1">{{item.fact_market_price}}</div>
                        <!-- <div class="flex1">{{item.fee}}</div>
                        <div class="flex1">{{item.fee_ratio}}</div>
                        <div class="flex1">{{item.integral_price}}</div> -->
                        <div class="flex1">{{item.created_at}}</div>
                    </li>
                    <div class="more tc ft12 p10 curPer" @click="getmore" v-if="more">{{$t('td.more')}}</div>
                </ul>
                <div class="tc mt60 ft12"v-if='hislist.length==0'>{{$t('td.nomore')}}</div>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            numbers:'',//输入的积分值
            number:0.00,//积分余额
            rate:0.00,//手续费率
            canuse:0.00,//可用积分余额
            jcPrice:0.00,//积分价值
            mkPrice:0.00,//兑换价格
            difference:0.00,//差值
            //dnum:0.00,//可兑换代币数量
            //ratevol:0.00,//手续费
            difference:0.00,//最小兑换代币数量
            page:1,
            more:false,
            hislist:[],
            password:''
 
        }
    },
    filters: {
        toFixeds: function(value) {
            value = Number(value);
            return value.toFixed(2);
        }
    },
    computed: {
        ratevol: function () {
            return (this.numbers * this.rate).toFixed(2) || 0.00;
        },
        dnum: function (){
            return (this.numbers*this.jcPrice/this.mkPrice).toFixed(2) || 0.00;
        }
    },
    beforeCreate () {
        document.querySelector('html').setAttribute('style', 'background-color:#273041;')
    },
    beforeDestroy () {
        document.querySelector('html').removeAttribute('style')
    },
    created(){
        this.init();
        this.getlist();
    },
    mounted(){
        
    },
    methods:{
        init(){
            var that = this;
            this.$http({
                url: '/api/'+'jc/info',
                method:'get',
                data:{},  
                headers: {'Authorization':  localStorage.getItem('token')},    
            }).then(res=>{
                if(res.data.type=="ok"){
                    this.number=res.data.message.jc_integral-0;
                    this.rate=res.data.message.jc_exchange_fee-0;
                    this.canuse=res.data.message.free_jc_integral-0;
                    this.jcPrice=res.data.message.jc_price-0;
                    this.difference=res.data.message.jc_price_difference-0;
                    this.mkPrice=res.data.message.market_price-0+this.difference;
                    
                }else{
                    layer.msg(res.data.message);
                    setTimeout(function(){
                        that.$router.push('/bindInfo');
                    },1000)
                }
            }).catch(error=>{
                // console.log(error)
            })
        },
        rateSum(){
            // this.ratevol=(this.numbers*this.rate/100).toFixed(2);
        },
        submit(){
            var that = this;
            if(this.numbers==''||this.numbers<=0){
              return layer.msg(this.$t('jc.pnum'));
            }
            // if(this.numbers>this.canuse){
            //   return layer.msg(this.$t('jc.not')); 
            // }
            // layer.prompt({title: that.$t('td.pwd'), formType: 1,btn:[that.$t('td.confirm'), that.$t('td.canceil')]}, function(pass, index){
            //     that.password=pass;
                var i= layer.load();
                that.$http({
                    url: '/api/'+'jc/exchange',
                    method:'post',
                    data:{
                        use_number:that.numbers,
                        // password:that.password
                    },  
                    headers: {'Authorization':  localStorage.getItem('token')},    
                }).then(res=>{
                    layer.close(i);
                    if(res.data.type=="ok"){
                        layer.msg(res.data.message);
                        setTimeout(function(){
                            location.reload();
                        },1500)
                        // this.init();
                        // this.hislist=[];
                        // this.getlist();
                    }else{
                        layer.msg(res.data.message)
                    }
                }).catch(error=>{
                
                })
            // layer.close(index);
        //   });
        },
        getlist(){
            var that = this;
            this.$http({
                url: '/api/'+'jc/exchange',
                method:'GET',
                data:{
                    page:that.page,
                },
                headers: {'Authorization':  localStorage.getItem('token')},    
            }).then(res=>{
                if(res.data.type=="ok"){
                    var list = res.data.message.data;
                    if(list.length>9){
                        that.more=true
                    }else{
                       that.more=false;
                    }
                    that.hislist=that.hislist.concat(list)
                }else{
                    
                }
            }).catch(error=>{
                // console.log(error)
            })
        },
        getmore(){
            this.page=this.page+1;
            this.getlist();
        },
        getnew(index,type){
            this.hislist=[];
            this.page=1;
            this.more=false;
            this.getlist();
        },
        out(){
            this.$http({
                url:'/api/' + 'user/logout',
                method:'post',
                data:{}, 
                headers: { Authorization: window.localStorage.getItem("token")},
            }).then(res => {
                localStorage.clear();
                this.$router.push('/components/loginTransfer');
            })
        }
    }
}
</script>
<style lang='scss'>
    .layui-layer{
        background:#171c2b;
    }
    .layui-layer-title {
        border-bottom: 1px solid #2e3753;
        color: #fff;
        background-color: #171c2b;
    }
    .layui-layer-prompt .layui-layer-input {
        border: 1px solid #555869;
        color: #fff;
        background: none;   
    }
    .layui-layer-dialog .layui-layer-content{
        color: #fff;
    }
    .layui-layer-loading{
        background-color: transparent;
    }
    .out{
        margin-right: 20px;
            background: #5697f4;
            height: 32px;
            line-height: 32px;
            margin-left: 10px;
            width: 80px;
            color: #ffffff;
            cursor: pointer;
            border-radius: 4px;
    }
   .account-mains {
        background: #273041;
        width: 80%;
        min-height: 800px;
        margin: 0 auto;
        margin-top: 20px;
        float: none;
        padding-bottom: 20px;
        .title {
            width: 100%;
            line-height: 60px;
            background: #1a243b;
            border-radius: 4px;
            padding-left: 20px;
        }
        .main-content {
            background: #1a243b;
            min-height: 700px;
            border-radius: 2px;
            .inbox{padding-top: 50px}
            .numbers{
                background: transparent;
                border:1px solid #202731;
                height: 28px;
                margin-left: 10px;
                padding-left: 10px;
                width:140px;
                color: #ffffff;
                font-size: 12px;
            }
            .mt60{margin-top: 60px;}
            .submit{
                background: #5697f4;
                height: 32px;
                margin-left: 10px;
                width: 120px;
                color: #ffffff;
                cursor: pointer;
            }
        }
        .topboxs{
            width: 88%;
            margin: 0 auto;
            li{
                flex: 1;
                height: 75px;
                line-height: 32px;
                border: 1px solid #202731;
                p{
                    padding-bottom: 5px;
                    font-size: 12px;

                }
                span{
                    color: #87a2cd;
                }
                .red{color: #de5151}
            }
        }
        .record{background-color: #1a2330;padding: 10px 20px}
        .ulbox{max-height: 300px;overflow-y: scroll;padding-bottom: 20px;}
        .p20{padding: 20px;}
        .plr20{padding-left: 20px;padding-right: 20px}
        .p10{padding: 10px;}
        .libg{background: #1a2330;padding: 10px;border-radius: 4px;}
        .red{color: #ce3939}
   }
</style>



// WEBPACK FOOTER //
// src/view/integralExchanges.vue