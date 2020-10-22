<template>
    <div class="deal" style="min-width:600px;background:#1a243b">
		<div class="title fColor1">实时成交</div>
        <div class="container fColor1 ft12 scroll">
            <div class="deal-title clear tc">
                <span>时间</span>
                <!-- <span>账户</span> -->
                <span>价格(CNY)</span>
                <span>数量(JNB)</span>
            </div>
            <ul class="list-item">
                <li v-for="(trade,index) in tradeList" class="tc">
                    <span>{{trade.create_time | filterTime}}</span>
                    <!-- <span :class="{'green': trade.type == '买入'}">买入</span> -->
                    <!-- <span class="green">{{trade.account_number}}</span> -->
                    <span>{{trade.price}}</span>
                    <span>{{trade.number}}</span>
                </li>
            </ul>
        </div>
	</div>
</template>

<script>
    export default {
        name: "deal",
        data (){
            return{
                 tradeList:[],
            }
        },
        created(){
            
        },
        methods:{
            init(){
                this.address=localStorage.getItem('address') || ''
                this.$ajax({
                    url:'/api/'+'transaction/deal',
                    method:'post',
                    data:{
                       
                    }
                }).then(res=>{
                    this.tradeList=res.data.message.complete;
                    if(res.data.type=='ok'){

                    }else{
                        // layer.msg(res.data.message)
                    }
                })
            }
        },
        filters:{
            filterTime(val){
                val=val.substring(val.length-8);
                return val
            }
        }
    }
</script>

<style scoped>
.title{height: 48px;line-height: 48px;padding: 0 10px 0 30px;background-color: #1a243b;}
.container{padding: 10px 25px 10px 20px;height: 580px;overflow: auto;}
.deal-title{color: #637085;margin-bottom: 5px;}
.list-item li{line-height: 20px;}
.list-item li span,.deal-title span{width: 33%;display: inline-block;float: left;}
.list-item li span:nth-child(3){color:  #cc4951;}
.list-item li span.green{color: #12b886}
.red{color: #cc4951;}
</style>



// WEBPACK FOOTER //
// src/view/deal.vue