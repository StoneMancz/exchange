<template>
    <div class="account-main">
        <div>
            <div class="back-nav fColor1 ft20">
                充币提币记录
                <span class="fr fColor2 mouseDefault">&lt;&lt;返回</span>
            </div>
            <div class="nav-after"></div>
        </div>
        <div class="account-title mouseDefault" style="padding-left: 30px;">
            <span v-for="(item,index) in wayList" :class="{'active' :index==current}" @click="changeWay(index,item.way)">{{item.title}}</span>
        </div>
         <div class="content">
            <div class="container">
                <ul class="list-title fColor2 ft12 clear">
                    <li class="fl w20">承兑时间</li>
                    <li class="fl w10">交易账号</li>
                    <li class="fl w10">承兑商</li>
                    <li class="fl w15">承兑商交易账号</li>
                    <li class="fl w10">交易方式</li>
                    <li class="fl w15">交易金额</li>
                    <li class="fl w15  tr">状态</li>
                </ul>
                <ul class="list-item fColor1 ft12">
                    <li  class="clear" v-for="(item,index) in coinList">
                        <span class="fl w20">{{item.create_time}}</span>
                        <span class="fl w10">{{item.deal_account}}</span>
                        <span class="fl w10">{{item.acceptor_name}}</span>
                        <span class="fl w15">{{item.hes_account}}</span>
                        <span class="fl w10">{{item.way_name}}</span>
                        <span class="fl w15">{{item.money}}</span>
                        <span class="fl w15 tr curPer">{{item.update_time}}</span>
                    </li>
                </ul>
                <!-- <div class="getmore tc fColor1 ft14 mt10 curPer" @click="getMore" v-if="!loading && enList.length>12">{{more}}</div>
                <div class="tc" v-if="loading">
                    <img src="@/assets/images/loading.gif" alt="" class="lodw20">
                    <p class="ft12 baseColor">加载中...</p>
                </div>
                <div class="no_data tc" v-if="enList.length<=0">
                    <img src="../assets/images/nodata.png" alt="">
                    <p class="fColor2 ft18">暂无数据</p>
                </div> -->
            </div>
        </div>
    </div>
</template>
<script>
import indexHeader from "@/view/indexHeader";
import left from "@/view/left";
export default {
  name: "recharge",
  components: {indexHeader,left},
  data (){
        return{
            address:'',
            current:0,
            way:"buy",
            wayList:[{title:"充币记录",way:"buy"},{title:"提币记录",way:"sell"}],
            coinList:[]
        }
  },
  created(){
    this.address = localStorage.getItem('address') || '';
  },
  methods:{
        changeWay(index,way){
          this.current=index;
          this.way=way
          this.getRecord();
        },
        getRecord(){
            if(this.address !=""){
                var way=this.way;
                var address=this.address;
                this.$http({
                    url: '/api/' + 'acceptor/my_deal?'+'address='+address+'&way='+way,
                    method:'get',
                }).then(res=>{
                    res = res.data;
                    if(res.type  === 'ok'){
                        this.coinList=res.message
                    }else{
                        // layer.msg(res.message);
                    }
                }).catch(error=>{
                    console.log(error)
                })
            }
        }
  },
  mounted(){
      this.getRecord();
  }
};
</script>
<style scoped lang="scss">
.account-main{
    .account-title span:nth-child(2){
       margin-left: 40px;
    }
    .content{
        padding: 0 10px;
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
}
</style>



// WEBPACK FOOTER //
// src/view/coinRecord.vue