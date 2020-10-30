<template>
    <div  class="account-main accountEntrust">
       <div class="account-top fColor2">
            <div class="fl">
                <div class="title ft16">
                    <span>区域代理</span>
                </div>
            </div>
       </div>
        <div class="content">
            <div class="container">
                <ul class="list-title fColor2 ft12 clear ">
                    <li class="fl w30">地区</li>
                    <li class="fl w30">联系方式</li>
                    <li class="fl w30 tc">时间</li>
                    <!-- <li class="fl w12">充值费率</li> -->
                    <!-- <li class="fl w12">提现额度</li>
                    <li class="fl w12">提现费率</li>
                    <li class="fl w6 tr">操作</li> -->
                </ul>
                <ul class="list-item fColor1 ft12 ">
                    <li v-for="item in aceiteList" class="clear">
                        <span class="fl w30">{{item.city_name}} {{item.district_name}}</span>
                        <span class="fl w30">{{item.phone}}</span>
                        <span class="fl w30 tc">{{item.time}}</span>
                        <!-- <span class="fl w12">{{item.time}}</span> -->
                        <!-- <span class="fl w12">{{item.cash_amount}}</span>
                        <span class="fl w12">{{item.cash_rate}}</span> -->
                        <!-- <div>
                            <span class="fl w6 tr curPer ceilColor" v-for="(operator,index) in operatorList" @click="goto(item.id,index)">{{operator.name}}</span>
                        </div> -->
                    </li>
                </ul> 
                <div class="more tc ft12" @click="getmore" v-show="aceiteList.length>0">{{more}}</div>
            </div>
            <div class="no_data tc" v-show="isRegion">
                <img src="@/assets/images/nodata.png" alt="">
                <p class="fColor2 ft18">你不是区域代理,无权操作</p> 
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'aceite',
    data(){
        return {
            isRegion:false,
            aceiteList:[],
            more:'加载更多',
            page:1
        }
    },
    created(){
        this.token=localStorage.getItem('token') || '';
    },
    methods:{
        getData(){
            var that=this;
            this.$ajax({
                url: '/api/' + 'user/region_users?page='+ that.page,
                method:'get',
                headers: {'Authorization':  that.token},
                }).then(res=>{
                    if (res.data.type=="ok"){
                        if(res.data.message.data.length>0){
                           that.aceiteList=that.aceiteList.concat(res.data.message.data); 
                        }else{
                           that.more="没有更多数据了..."
                        }
                        
                    }else{

                        that.isRegion=true;
                    }
                }).catch(error=>{
                    console.log(error)
            })
        },
        getmore(){
            this.page++;

            this.getData();

        }
    },
    mounted(){
       this.getData(); 
    },
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
                    height: 30px
                }
                // span:nth-child(3){
                //     color:#cc4951;
                // }
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
.more{
    color: #6b80ae;
    padding: 30px;
    cursor: pointer;
}
</style>





// WEBPACK FOOTER //
// src/view/region.vue