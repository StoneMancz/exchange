<template>
    <div  class="account-main accountEntrust">
        <div class="title ft16">
            <span class="curPer" :class="{active : isActive==index}" v-for="(tab,index) in tabTitle" @click="changeEntrust(index,tab.url)">{{tab.title}}</span>
        </div>
        <div class="content">
            <div class="container" v-if="isActive==0">
                <ul class="list-title fColor2 ft12 clear">
                    <li class="fl w20">时间</li>
                    <li class="fl w12">币种</li>
                    <li class="fl w12">数量</li>
                    <li class="fl w14">价格</li>
                    <li class="fl w20">账户</li>
                    <li class="fl w8 tr">操作</li>
                </ul>
                <ul class="list-item fColor1 ft12">
                    <li v-for="item in outList" class="clear">
                        <span class="fl w20">{{item.create_time}}</span>
                        <span class="fl w12">{{item.legal_name}}/{{item.currency_name}}</span>
                        <span class="fl w12">{{item.number}}</span>
                        <span class="fl w14">{{item.price}}</span>
                        <span class="fl w20">{{(item.account_number)}}</span>
                        <span class="fl w8 tr curPer ceilColor" @click="revoke(item.id,'out')">撤销</span>
                    </li>
                </ul>
                <div class="getmore tc fColor1 ft14 mt10 curPer" @click="getMore" v-if="!loading && outList.length>5">{{more}}</div>
                <div class="tc" v-if="loading">
                    <img src="@/assets/images/loading.gif" alt="" class="lodw20">
                    <p class="ft12 baseColor">加载中...</p>
                </div>
                <div class="no_data tc" v-if="outList.length<=0">
                    <img src="../assets/images/nodata.png" alt="">
                    <p class="fColor2 ft18">暂无数据</p>
                </div>
            </div>
            <div class="container" v-if="isActive==1">
                 <ul class="list-title fColor2 ft12 clear">
                    <li class="fl w20">时间</li>
                    <li class="fl w12">币种</li>
                    <li class="fl w12">数量</li>
                    <li class="fl w14">价格</li>
                    <li class="fl w20">账户</li>
                    <li class="fl w8 tr">操作</li>
                </ul>
                <ul class="list-item fColor1 ft12">
                    <li v-for="item in inList" class="clear">
                        <span class="fl w20">{{item.create_time}}</span>
                        <span class="fl w12">{{item.legal_name}}/{{item.currency_name}}</span>
                        <span class="fl w12">{{item.number}}</span>
                        <span class="fl w14">{{item.price}}</span>
                        <span class="fl w20">{{(item.account_number)}}</span>
                        <span class="fl w8 tr curPer ceilColor" @click="revoke(item.id,'in')">撤销</span>
                    </li>
                </ul>
                <div class="getmore tc fColor1 ft14 mt10 curPer" @click="getMore" v-if="!loading && inList.length>5">{{more}}</div>
                <div class="tc" v-if="loading">
                    <img src="@/assets/images/loading.gif" alt="" class="lodw20">
                    <p class="ft12 baseColor">加载中...</p>
                </div>
                <div class="no_data tc" v-if="inList.length<=0">
                    <img src="../assets/images/nodata.png" alt="">
                    <p class="fColor2 ft18">暂无数据</p>
                </div>
            </div>
            <div class="container" v-if="isActive==2">
                 <ul class="list-title fColor2 ft12 clear">
                    <li class="fl w20">时间</li>
                    <li class="fl w12">币种</li>
                    <li class="fl w12">数量</li>
                    <li class="fl w14">价格</li>
                    <!-- <li class="fl w20">账户</li> -->
                    <li class="fl w8 tr">类型</li>
                </ul>
                <ul class="list-item fColor1 ft12">
                    <li v-for="item in comList" class="clear">
                        <span class="fl w20">{{item.time}}</span>
                        <span class="fl w12">{{item.legal_name}}/{{item.currency_name}}</span>
                        <span class="fl w12">{{item.number}}</span>
                        <span class="fl w14">{{item.price}}</span>
                        <!-- <span class="fl w20">{{(item.account_number)}}</span> -->
                        <span class="fl w8 tr curPer ceilColor" :class="item.type=='out'?'redColor':''">{{item.type=='in'?'买入':'卖出'}}</span>
                    </li>
                </ul>
                <div class="getmore tc fColor1 ft14 mt10 curPer" @click="getMore" v-if="!loading && outList.length>5">{{more}}</div>
                <div class="no_data tc" v-if="comList.length<=0">
                    <img src="../assets/images/nodata.png" alt="">
                    <p class="fColor2 ft18">暂无数据</p>
                </div>
                <div class="tc" v-if="loading">
                    <img src="@/assets/images/loading.gif" alt=""  class="lodw20">
                    <p class="ft12 baseColor">加载中...</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "accountEntrust",
  data (){
        return{
        address:'',
        isActive:0,
        url:"transaction_out",
        page:1,
        more:'加载更多',
        loading:false,
        tabTitle:[{title:"正在卖",url:'transaction_out'},{title:"正在买",url:"transaction_in"},{title:"已完成",url:"transaction_complete"}],
        outList:[],
        inList:[],
        comList:[]
      }
  },
  created(){
      this.token = localStorage.getItem('token') || '';
  },
  methods:{
      changeEntrust(index,url){
        this.isActive=index;
        this.url = url;
        this.page=1;
        this.getData();
      },
      getMore(){
        this.page = ++this.page;
        this.loading=true;
        this.getData();
      },
      revoke(id,type){
        var that =this;
        var id = id;
        layer.open({
            content: '您确定要撤销吗？'
            ,btn: ['确定', '取消']
            ,yes: function(index){
            that.$ajax({
                url: '/api/' + 'transaction_del',
                method:'post',
                data:{
                    id:id,
                    type:type
                },
                headers: {'Authorization':  that.token}
                }).then(res=>{
                console.log(res)
                    if(res.data.type  === 'ok'){
                        // layer.msg(res.data.message)
                        that.getdata();
                    }else{
                        // layer.msg(res.message);
                    }
                }).catch(error=>{
                    console.log(error)
                })
            }
        });
    },
      getData(){
        var that = this;
        var url = this.url;
        var page = this.page;
        that.loading = true;
        this.$ajax({
            url: '/api/' + url,
            method:'post',
            data:{page:page},
            headers: {'Authorization':  that.token}
        }).then(res=>{
            console.log(res)
            that.loading=false;
            console.log(url)
            if(res.data.type  === 'ok'){
                if(url=="transaction_out"){
                    console.log(res.data.message.list)
                    if(this.page==1){
                        that.outList=res.data.message.list;
                    }else{
                        console.log(res.data.message.list.length)
                       if(res.data.message.list.length<=0){
                            that.more='没有更多数据了...';
                            return;
                        }else{
                            that.outList=that.outList.concat(res.data.message.list)
                        }
                    }
                    // console.log(this.outList)
                    // this.getOut();
                    // console.log(this.outList)
                }
                else if(url=="transaction_in"){
                    if(this.page==1){
                        that.inList=res.data.message.list;
                    }else{
                       if(res.data.message.list.length<=0){
                            that.more='没有更多数据了...';
                        }else{
                            that.inList=this.inList.concat(res.data.message.list)
                        }
                    }
                }
                else{
                    that.comList=res.data.message.list;
                }

            }else{
                // layer.msg(res.message);
            }
        }).catch(error=>{
            console.log(error)
        })
      },
    //   getNewData(curList,data){
    //       if(this.page==1){
    //           curList=data;
    //       }
    //       else{
    //           if(data.length<=0){
    //               this.more='没有更多数据了...';
    //           }else{
    //               curList=curList.concat(data)
    //           }
    //       }
    //   },
      getOut(){
          var page = this.page;
          this.$ajax({
            url: '/api/' + 'transaction/entrust',
            method:'post',
            data:{
                address:this.address,
                type:'out',
                page:page
            }
        }).then(res=>{
            res = res.data;
            console.log(res.message.data)
            if(res.type  === 'ok'){
                this.outList=this.outList.concat(res.message.data)
            }else{
                // layer.msg(res.message);
            }
        }).catch(error=>{
            console.log(error)
        })
      }
  },
  mounted(){
    //   this.getData();
  }
};
</script>
<style lang="scss" scoped>
.accountEntrust{
    .title{
        height: 48px;
        line-height: 48px;
        padding: 0 30px;
        background-color: #1a243b;
        color: #cdd6e4;
        span:not(:first-child) {margin-left: 40px;}
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
                    background-color: #2b3648
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
// src/view/accountEntrust.vue