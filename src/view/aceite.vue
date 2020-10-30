<template>
    <div  class="account-main accountEntrust">
       <div class="account-top fColor2">
            <div class="fl">
                <div class="title ft16">
                    <span class="curPer" :class="{active : isActive==index}" v-for="(tab,index) in tabList">{{tab.title}}</span>
                </div>
            </div>
            <div  class="fr mt15 mr60">
                <span  class="baseBtn mr20 mouseDefault"  v-for="(item,index) in tab2List"  @click="goRecord(index)" >{{item.title}}</span>
            </div>
       </div>
        <div class="content">
            <div class="container" v-if="isActive==0">
                <ul class="list-title fColor2 ft12 clear ">
                    <li class="fl w10">id</li>
                    <li class="fl w12">供应商</li>
                    <!-- <li class="fl w12">成交总额</li> -->
                    <li class="fl w12">充值额度</li>
                    <li class="fl w12">充值费率</li>
                    <!-- <li class="fl w12">成交笔数</li> -->
                    <li class="fl w12">提现额度</li>
                    <li class="fl w12">提现费率</li>
                    <li class="fl w6 tr">操作</li>
                </ul>
                <ul class="list-item fColor1 ft12 ">
                    <li v-for="item in aceiteList" class="clear">
                        <span class="fl w10">{{item.user_id}}</span>
                        <span class="fl w12">{{item.name}}</span>
                        <span class="fl w12">{{item.recharge_amount}}</span>
                        <span class="fl w12">{{item.recharge_rate}}</span>
                        <span class="fl w12">{{item.cash_amount}}</span>
                        <span class="fl w12">{{item.cash_rate}}</span>
                        <div>
                            <span class="fl w6 tr curPer ceilColor" v-for="(operator,index) in operatorList" @click="goto(item.id,index)">{{operator.name}}</span>
                            <!-- <span class="fl w6 tr curPer ceilColor" @click="goto(item.id)">提现</span> -->
                        </div>
                    </li>
                </ul> 
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'aceite',
    data(){
        return {
            isActive:0,
            tabList:[{title:'CNY承兑'},{title:'虚拟货币承兑'}],
            tab2List:[{title:'充币记录'},{title:'提币记录'}],
            operatorList:[{name:'充值'},{name:'提现'}],
            aceiteList:[],
        }
    },
    created(){
        this.init();
    },
    mounted(){
        
    },
    methods:{
        init(){
            // var i=layer.load();
            this.address=localStorage.getItem('address') || '';
            if(this.address !=""){
                 this.$ajax({
                    url:'/api/' + 'acceptor/list',
                    method:'get'
                }).then(res=>{
                    layer.close(i)
                    if(res.data.type=='ok'){
                        this.aceiteList=res.data.message
                    }else{
                        // layer.msg(res.message)
                    }
                }).catch(err=>{
                    // layer.msg(err)
                })
            }
           
        },
        goto(id,index){
            this.$router.push({name:'rechargeMoney',query:{id,current:index}})
        },
        goRecord(index){
            this.$router.push({name:'chargeRecord',query:{current:index}})
        }
    }
}
</script>
<style lang="scss" scoped>
.title{
        height: 48px;
        line-height: 48px;
        // padding: 0 30px;
        background-color: #1a243b;
        color: #cdd6e4;
        span:not(:first-child) {margin-left: 40px;}
    }
.content{
    padding: 0 30px;
    .list-title{
        line-height: 40px;
        border-bottom: 1px solid #303b4b;
    }
    
    .container{
        height: 100%;
        overflow: auto;
        .list-item{
            li{
                line-height: 30px;
                span{
                    display: inline-block;
                    float: left;
                }
                span:nth-child(3){
                    color:#cc4951;
                }
                span.green{
                    color: #12b886;
                }
            }
            li:hover{
                background-color: rgba(46,55,83,.4)
            }

        }
    }
    .no_data{
        padding-top: 150px;
    }
}
.account-top{
    background-color: #1a243b;
    height: 120px;
    padding: 26px 30px;
}
.account-top .baseBtn{
    width: 90px;
    line-height: 30px;
    font-size: 14px;
}
</style>





// WEBPACK FOOTER //
// src/view/aceite.vue