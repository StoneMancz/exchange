<template>
    <div class="lever">
        <div class="lever-head fColor1">
            <span>净资产折合:</span> 
            <span>0.00000000 BTC</span>
            <span class="ft12 mincny">≈0.00 CNY</span>
            <!-- <input type="checkbox" class="ml20">
            <span class="ft14">隐藏小额资产</span>
            <input type="text" class="filter-input ml20"> -->
            <span class="fr baseColor">财务记录</span>
        </div>
        <div class="leverbody contentBK ft12">
            <ul class="titlebox fColor3 clearfix">
                <li class="w16">合约账户</li>
                <li class="w20 tr">可用</li>
                <li class="w20 tr">冻结</li>
                <!-- <li class="w16 tr">已借</li> -->
                <!-- <li class="w11 tr">风险率</li>
                <li class="w5 tr">爆仓价</li> -->
                <li class="w25 tr">操作</li>
            </ul>
            <ul class="contentbox fColor1">
                <li class="clearfix flex" v-for="(item,index) in lever_list">
                    <p class="w16 l40">{{item.currency_name}}</p>
                    <p class="w20 tr">
                        <span>{{item.lever_balance}}</span>
                    </p>
                    <p class="w20 tr">
                        <span>{{item.lock_lever_balance}}</span>
                    </p>
                    <p class="w25 tr baseColor l40 btn">
                        <span @click="current = index;inDialog = true;type = 3">转入</span>
                        <span @click="current = index;outDialog = true;type=4">转出</span>
                        <span @click="$router.push({path:'/leverRecord',query:{id:item.currency}})">记录</span>
                    </p>
                </li>
            </ul>
            <div class="tc ft16 fColor1 mt50" v-if="lever_list.length<=0">暂无数据</div>
        </div>
        <div class="dialog_wrap" v-show="inDialog">
            <div class="dialog">
                <div class="dia-tit clearfix">
                    <span class="fl fColor1">转入本金</span>
                    <span class="fr fColor3 close" @click="close">X</span>
                </div>
                <div class="dia-content fColor1">
                    <div class="dia-container">
                        <div class="flex alcenter frombox">
                            <span class="fColor3 ft12 tc">从</span>
                            <p class="ft14 flex1">交易账户</p>
                        </div>
                        <div class="frombox flex alcenter w10 tc">
                            <img src="@/assets/images/trade.png" alt="" class="coinimg">                      
                        </div>
                        <div class="flex alcenter frombox">
                            <span class="fColor3 ft12 tc">到</span>
                            <p class="ft14 flex1">BTC/{{nowCoin.currency_name}}合约账户</p>
                        </div>
                    </div>
                    <div class="div-input mt20">
                        <p class="ft12 fColor3">币种</p>
                        <!-- <div class="dia-coin flex tc mt10 ft12 fColor3">
                            <p v-for="(item,index) in coins" :class="{select:index==current}" @click="chooseCoin(index)">{{item.coin}}<i></i></p>
                        </div> -->
                    </div>
                    <div class="div-input mt20">
                        <p class="ft12 fColor3 flex between">
                            <span>数量</span>
                            <span>可转 0.00000000 BTC</span>
                        </p>
                        <div class="inputboxs flex between alcenter mt10">
                            <input type="text" v-model="amount">
                            <div class="ft12 fColor3">
                                <span>BTC</span>
                                <span>|</span>
                                <span class="all" @click="amount = nowCoin.lever_balance">全部</span>
                            </div>
                        </div>
                    </div>
                    <div class="btn-box flex ft16 tc">
                        <div @click="close">取消</div>
                        <div class="sure" @click="turn">确定</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="dialog_wrap" v-show="outDialog">
            <div class="dialog">
                <div class="dia-tit clearfix">
                    <span class="fl fColor1">转出本金</span>
                    <span class="fr fColor3 close" @click="close">X</span>
                </div>
                <div class="dia-content fColor1">
                    <div class="dia-container">
                        <div class="flex alcenter frombox">
                            <span class="fColor3 ft12 tc">从</span>
                            <p class="ft14 flex1">BTC/{{nowCoin.currency_name}}合约账户</p>
                        </div>
                        <div class="frombox flex alcenter w10 tc">
                            <img src="@/assets/images/trade.png" alt="" class="coinimg">                      
                        </div>
                        <div class="flex alcenter frombox">
                            <span class="fColor3 ft12 tc">到</span>
                            <p class="ft14 flex1">交易账户</p>
                        </div>
                    </div>
                    <div class="div-input mt20">
                        <p class="ft12 fColor3">币种</p>
                        <!-- <div class="dia-coin flex tc mt10 ft12 fColor3">
                            <p v-for="(item,index) in coins" :class="{select:index==current}" @click="chooseCoin(index)">{{item.coin}}<i></i></p>
                        </div> -->
                    </div>
                    <div class="div-input mt20">
                        <p class="ft12 fColor3 flex between">
                            <span>数量</span>
                            <span>可转 0.00000000 BTC</span>
                        </p>
                        <div class="inputboxs flex between alcenter mt10">
                            <input type="text" v-model="amount">
                            <div class="ft12 fColor3">
                                <span>BTC</span>
                                <span>|</span>
                                <span class="all" @click="amount = nowCoin.lever_balance">全部</span>
                            </div>
                        </div>
                    </div>
                    <div class="btn-box flex ft16 tc">
                        <div @click="close">取消</div>
                        <div class="sure" @click="turn">确定</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import indexHeader from '@/view/indexHeader'
export default {
    name:'lever',
    components:{indexHeader},
    data(){
        return{
            current:0,
            inDialog:false,
            outDialog:false,
            lever_list:[],
            amount:'',
            type:3,
            coins:[{coin:"ETC"},{coin:"USDT"}]
        }
    },
    methods:{
        
        close(){
            
            this.inDialog=false
            this.outDialog=false;
            this.amount = '';
        },
        golever(){
            this.$router.push({name:'manger'})
        },
        getdata(){
            var that = this;
            this.$ajax({
                url: '/api/' + 'wallet/list',
                method:'post',
                data:{},
                headers: {'Authorization':  that.token},
                }).then(res=>{
                    that.lever_list=res.data.message.lever_wallet.balance;
                }).catch(error=>{
                    console.log(error)
            })
        },
        turn(){
            this.$ajax({
                url:'/api/wallet/change',
                method:'post',
                data:{
                    type:this.type,
                    number:this.amount,
                    currency_id:this.nowCoin.currency
                },
                headers: {'Authorization':  this.token},
            }).then(res => {
                layer.msg(res.data.message);
                if(res.data.type == 'ok'){
                    this.close()
                }
            })
        }

    },
    created(){
         this.token= localStorage.getItem('token') || '';
    },
    mounted(){
        // this.init();
        this.getdata();
    },
    computed:{
        nowCoin:function(){
            var l = this.lever_list;
            if(l.length){
                
                
                return l[this.current]
            } else {
                return {}
            }
        }
    }
};
</script>
<style scoped lang="scss">
.lever{
    .lever-head{
        background-color: #1b1e2e;
        padding: 0 30px;
        height: 48px;
        line-height: 48px;
        font-size: 16px;
        color: #c7cce6;
        .mincny{
            color: #61688a;
        }
        .filter-input{
                display: inline-block;
                width: 125px;
                height: 28px;
                padding: 0 30px 0 10px;
                background: none;
                border-radius: 3px;
                border: 1px solid #4e5b85;
        }
    }
    .leverbody{
        padding: 0 20px;
        .titlebox{
            height: 40px;
            line-height: 40px;
            li{
                float: left;
            }
        }
        .contentbox{
            li{
                height: 60px;
                padding:10px;
                border-bottom: 1px solid #1f2943;
                >p{
                    float: left;
                    height: 40px;
                    line-height: 40px;
                }
                .l40{
                    line-height: 40px
                }
                .btn{
                    span{
                        margin-left: 20px;
                        cursor: pointer;
                    }
                    span:hover{
                        color: #61688a
                    }
                }
            }
        }
    }
    .dialog_wrap {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 9;
        text-align: center;
        background: rgba(0,0,0,.4);
        .dialog {
            margin-top: 220px;
            display: inline-block;
            width: 560px;
            padding-top: 30px;
            box-sizing: border-box;
            border-radius: 3px;
            text-align: left;
            vertical-align: middle;
            background-color: #171c2b;
            .dia-tit{
                padding: 0 40px 30px;
                font-size: 24px;
                line-height: 24px;
                .close{
                    cursor: pointer;
                }
                .close:hover{
                    color: #fff
                }
            }
            .dia-content{
                padding: 0 40px;
                margin-bottom: 20px;
                .frombox{
                    height: 48px;
                    line-height: 48px;
                    span{width: 10%}
                    p{
                        height: 48px;
                        padding-left: 20px;
                        line-height: 48px;
                        border-radius: 3px;
                        background-color: #202437;
                    }
                    .coinimg{
                        width: 28px;
                        margin: 0 auto
                    }
                }
                .dia-coin{
                    background-color: #202437;
                    p{
                        width: 50%;
                        width: 50%;
                        height: 48px;
                        line-height: 48px;
                        cursor: pointer;
                        position: relative;
                        i{
                            display: none;
                            position: absolute;
                            bottom: 4px;
                            right: 4px;
                            width: 0;
                            height: 0;
                            border: 6px solid transparent;
                            border-right: 6px solid #fff;
                            border-bottom: 6px solid #fff;
                        }
                    }
                    .select{
                        color: #fff;
                        background-color: #7a98f7;
                        i{
                            display: block
                        }
                    }
                    p:first-child{
                        border-radius: 3px 0 0 3px;
                    }
                    p:last-child{
                        border-radius: 0 0px 3px 0;
                    }
                } 
                .inputboxs{
                    width: 100%;
                    border-radius: 3px;
                    background-color: #1e2235;
                    border: 1px solid #4e5b85;
                    padding: 0 20px;
                    input{
                        background: transparent;
                        height: 46px;
                        color: #fff

                    }
                    span{
                        margin-left: 15px
                    }
                    .all{
                        color: #ff7519;
                        cursor: pointer;
                    }
                }
                .btn-box{
                    margin: 50px 0;
                    div{
                        width: 50%;
                        height: 48px;
                        line-height: 48px;
                        margin: 0 10px;
                        border-radius: 3px;
                        cursor: pointer;
                    }
                    .sure{
                        color: #fff;
                        background: #7a98f7;
                    }
                }
                
            }
        }
            
    }
}
</style>





// WEBPACK FOOTER //
// src/view/accounts/lever.vue