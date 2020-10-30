<template>
    <div class="manger">
        <indexHeader></indexHeader>
        <div class="content ft14">
            <div class="topcontent ft20 fColor1">
                <span class="baseColor">合约账户</span>
                <span class="ft12" style="padding:0 10px">></span>
                <span>合约管理</span>
            </div>
            <div class="mainbox">
                <div class="main-left fl">
                    <div class="bar-hd fColor1 pl10">
                        <p class="ft16 bar-title">合约账户</p>
                        <ul class="flex">
                            <li class="active">USDT</li>
                            <li>BTC</li>
                            <li>ETH</li>
                        </ul>
                    </div>
                    <div class="bar-tb ft12">
                        <div class="tb-title flex">
                            <p>币种</p>
                            <p class="tr">风险率</p>
                        </div>
                        <ul class="tb-ul fColor1 scroll">
                            <li class="flex" :class="{select:index==current}" v-for="(item,index) in coinList" @click="coin(index)">
                                <span>{{item.name}}</span>
                                <span class="tr">无风险</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="main-right ft">
                    <div class="ttBk fColor1 blod topshadow mr-title">
                        <span class="ft16 bold">ETH/USDT 合约账户</span>
                        <span class="ml10 fColor4">当风险率≤110%时，账户将触发爆仓以归还借贷资金</span>
                    </div>
                    <div class="mod-bd">
                        <div class="balance_bar">
                            <ul class="flex">
                                <li>
                                   <p class="fColor3 canuse">可用USDT</p>
                                   <p class="fColor1"><span>0.0000000</span><span class="ml10 baseColor">转入</span></p>
                                </li>
                                <li>
                                   <p class="fColor3 canuse">可用btc</p>
                                   <p class="fColor1"><span>0.0000000</span><span class="ml10 baseColor">转入</span></p>
                                </li>
                                <li>
                                   <p class="fColor3 canuse">爆仓价(USDT)</p>
                                   <p class="fColor1"><span>---</span></p>
                                </li>
                                <li>
                                   <p class="fColor3 canuse">风险率</p>
                                   <p class="fColor1 ft12"><span>无风险</span></p>
                                </li>
                            </ul>
                        </div>
                        <div class="pannel clearfix">
                            <div class="pannel-left fl">
                                <div class="pan-title fColor1"><span>USDT</span>借贷</div>
                                <ul class="pannel-ul ft12 flex">
                                    <li>
                                        <p class="fColor3 brow">已借</p>
                                        <p class="fColor1">0.0000000</p>
                                    </li>
                                    <li>
                                        <p class="fColor3 brow">可借</p>
                                        <p class="fColor1">0.00</p>
                                    </li>
                                    <li>
                                        <p class="fColor3 brow">利率</p>
                                        <p class="fColor1">0.1%</p>
                                    </li>
                                </ul>
                                
                            </div>
                            <div class="pannel-right fr">
                                <div class="pan-title fColor1"><span>BTC</span>借贷</div>
                                <ul class="pannel-ul ft12 flex">
                                    <li>
                                        <p class="fColor3 brow">已借</p>
                                        <p class="fColor1">0.0000000</p>
                                    </li>
                                    <li>
                                        <p class="fColor3 brow">可借</p>
                                        <p class="fColor1">0.00</p>
                                    </li>
                                    <li>
                                        <p class="fColor3 brow">利率</p>
                                        <p class="fColor1">0.1%</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="applybox mt20 contentBK">
                <div class="ap-header ft16 fColor1">当前申请</div>
                <div class="ap-list">
                    <ul class="fColor3 flex ft12 ul-title">
                        <li class="w18">申请时间</li>
                        <li class="w15">合约账户</li>
                        <li class="w8">币种</li>
                        <li class="w8 tr">数量</li>
                        <li class="w10 tr">利率</li>
                        <li class="w14 tr">未还利息</li>
                        <li class="w16 tr">未归还数量</li>
                        <li class="w11 tr">操作</li>
                    </ul>
                    <div>
                        <p class="fColor1 mt40 tc">暂无记录</p>
                    </div>
                </div>
            </div>
            <div class="applybox mt20 contentBK">
                <div class="ap-header ft16 fColor1">申请记录</div>
                <div class="ap-list">
                    <ul class="fColor3 flex ft12 ul-title">
                        <li class="w18">申请时间</li>
                        <li class="w15">合约账户</li>
                        <li class="w8">币种</li>
                        <li class="w8 tr">数量</li>
                        <li class="w10 tr">利率</li>
                        <li class="w14 tr">未还利息</li>
                        <li class="w16 tr">未归还数量</li>
                        <li class="w11 tr">操作</li>
                    </ul>
                    <div>
                        <p class="fColor1 mt40 tc">暂无记录</p>
                    </div>
                </div>
            </div>
        </div>
        <indexFooter></indexFooter>
    </div>
</template>
<script>
import indexHeader from '@/view/indexHeader'
import indexFooter from '@/view/indexFooter'
export default {
    name:"manger",
    components:{indexHeader,indexFooter},
    data(){
        return{
            current:0,
            coinList:[{name:"BTC"},{name:"BTC"},{name:"BTC"},{name:"BTC"},{name:"BTC"},{name:"BTC"},{name:"BTC"},{name:"BTC"},{name:"BTC"},{name:"BTC"},{name:"BTC"},{name:"BTC"}]
        }
    },
    methods:{
        coin(index){
            this.current=index;
        }
    }
}
</script>
<style lang="scss" scoped>
.content{
        width: 1200px;
        margin: 0 auto;
    .topcontent{
        height: 60px;
        line-height: 60px;
        padding: 0 30px;
        margin: 20px 0;
        font-size: 20px;
        border-radius: 3px;
        background-color: #1a243b;
    }
    .mainbox{
        >div{
            background: #1a243b
        }
        .main-left{
            width: 220px;
            height: 512px;
            margin-right: 20px;
            border-radius: 3px;
            .bar-hd{
                padding: 0 0 0 20px;
                border-radius: 3px 3px 0 0;
                box-shadow: 0 3px 6px rgba(0,0,0,.1);
                .bar-title{
                    height: 48px;
                    line-height: 48px;
                    font-weight: 400;
                }
                li{
                    margin-right: 30px;
                    cursor: pointer;
                    line-height: 40px
                }
            }
            .bar-tb{
                .tb-title{
                    height: 40px;
                    line-height: 40px;
                    margin: 0 20px;
                    color: #4e5b85;
                    p{
                        width: 50%;
                    }
                }
                .tb-ul{
                    height: 318px;
                    overflow: auto;
                    li{
                        cursor: pointer;
                        margin: 0 4px;
                        padding: 0 16px;
                        margin-top: -1px;
                        line-height: 31px;
                        height: 31px;
                        border-bottom: 1px solid #1f2943;
                        span{
                            width: 50%
                        }
                    }
                    li:hover{
                       background-color: #171c2b; 
                    }
                    .select{
                        background-color: #171c2b;
                        border-radius: 3px;
                    }
                }
            }
        }
        .main-right{
            min-height: 512px;
            margin-left: 240px;
            border-radius: 3px;
            margin-bottom: 10px;
            transition: height .15s ease-in-out;
            .mr-title{
                height: 48px;
                line-height: 48px;
                padding-left: 30px;
            }
            .mod-bd{
                padding: 0 30px;
                .balance_bar{
                    height: 81px;
                    border-bottom: 1px solid #1f2943;
                    li{
                        width: 25%;
                       .canuse{
                            padding: 13px 0 23px;
                        } 
                    } 
                }
            }
            .pannel{
                >div{
                    width: 430px;
                    padding-top: 30px;
                    min-height:300px;
                    .pan-title{
                        font-size: 24px;
                        height: 50px;
                        font-weight: 400;
                    }
                    .pannel-ul{
                        height: 49px;
                        padding-bottom: 29px;
                        li{
                            width: 33.3%;
                            .brow{
                                height: 30px;
                            }

                        }
                    }
                }
            }
        }
    }
    .applybox{
        .ap-header{
            background: #1b1e2e;
            box-shadow: 0 3px 6px rgba(0,0,0,.1);
            height: 40px;
            line-height: 40px;
            border-radius: 3px 3px 0 0;
            padding: 0 30px;

        }
        .ap-list{
            padding:0 10px;
            min-height:150px;
            .ul-title{
                padding: 0 20px;
                li{
                    height: 40px;
                    line-height: 40px;
                }
            }
        }
    }
}

</style>




// WEBPACK FOOTER //
// src/view/accounts/lever_manger.vue