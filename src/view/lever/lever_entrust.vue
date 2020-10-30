<template>
    <div class="entrust">
        <div class="title fColor1 topshadow">
            <div class="tab_title">
                <span>{{$t('lever.nowentrust')}}</span>
            </div>
            <div class="tab_title fr ft12">
                <span v-for="(way,index) in wayList" :class="{'active': index == isChoosed}" @click="wayChoose(index,way.url)">{{way.title}}</span>
            </div>
        </div>
        <div class="content">
            <ul class="list-title fColor2 ft12 clear">
                <li class="fl w20">{{$t('td.time')}}</li>
                <li class="fl w10">{{$t('market.symbol')}}</li>
                <li class="fl w8">{{$t('cuy.direction')}}</li>
                <li class="fl w8">{{$t('td.num')}}</li>
                <li class="fl w8">{{$t('cuy.price')}}</li>
                <li class="fl w8">{{$t('lever.dealed')}}</li>
                <li class="fl w8">{{$t('lever.notdeal')}}</li>
                <li class="fl w10">{{$t('lever.entotal')}}</li>
                <li class="fl w8 tr">{{$t('td.do')}}</li>
            </ul>
            <div class="containers scroll" v-if="inList.length>0">
                <ul class="list-item fColor1 ft12">
                    <li v-for="(item,index) in inList" class="clear">
                        <span class="fl w20">{{item.create_time}}</span>
                        <span class="fl w10">{{item.currency_name}}/{{item.legal_name}}</span>
                        <span class="fl w8">{{type=='in'?$t('td.buyin'):$t('td.sellout')}}</span>
                        <span class="fl w8">{{item.total_number}}</span>
                        <span class="fl w8">{{item.price}}</span>
                        <span class="fl w8">{{item.complete_number}}</span>
                        <span class="fl w8">{{item.number}}</span>
                        <span class="fl w10">{{item.total_money}}</span>
                        <span class="fl w8 tr curPer ceilColor" @click="revoke(index,item.id)">{{$t('cuy.revoke')}}</span>
                    </li>
                </ul>
                <div class="getmore tc fColor1 ft14 mt10 curPer pdb20" @click="getMore" v-if="!loading && inList.length>8">{{more}}</div>
                <div class="tc pdb20" v-if="loading">
                    <img src="@/assets/images/loading.gif" alt=""  class="lodw20">
                    <p class="ft12 baseColor">{{$t('lever.loading')}}...</p>
                </div>
            </div>
            <div class="no_data tc" v-if="inList.length<=0 && !loading">
                <img src="@/assets/images/nodata.png" alt="">
                <p class="fColor2 ft18">{{$t('td.nodata')}}</p> 
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name:"entrust",
    data (){
        return{
            isshow:false,
            address:'',
            isChoosed:0,
            isUrl:0,
            page:1,
            url:"transaction_in",
            type:'in',
            more:this.$t('td.more'),
            loading:false,
            urlList:[{title:this.$t('lever.nowentrust')}],
            wayList:[{title:this.$t('td.buyin'),url:"transaction_in"},{title:this.$t('td.sellout'),url:"transaction_out"}],
            inList:[]
        }
    },
    created(){
        this.token = localStorage.getItem('token') || '';
    },
    methods:{
        // 类型切换
        wayChoose(index,url){
            var that=this;
            // if(index ==2){
            //     that.isshow = true; 
            // }else{
            //     that.isshow = false;
            //     that.getData();
            // }
            // console.log(url)
            that.inList='';
            that.page=1;
            that.url = url;
            // console.log(that.url)
            if(url=='transaction_in'){
                that.type="in";
            }else if(url == 'transaction_out'){
                that.type="out";
            }else{
                that.type="all";
            }
            that.getData();
            that.more=this.$t('td.more');
            that.isChoosed=index;
           
        },
        // 加载更多
        getMore(){
            this.page = ++this.page;
            this.getData();
        },
        // 撤销
        revoke(indexs,id){
            var that =this;
            var id = id;
            var indexs = indexs;
            var type = that.type;
            layer.open({
                skin:"confirmCancel",
                content: that.$t('confirmCancel')
                ,btn: [that.$t('confirm'), that.$t('canceil')]
                ,yes: function(index){
                var i=layer.load();
                that.$ajax({
                    url: '/api/' + 'transaction_del',
                    method:'post',
                    data:{
                        id:id,
                        type:type
                    },
                    headers: {'Authorization':  that.token}
                    }).then(res=>{
                    // console.log(res)
                        layer.close(i)
                        if(res.data.type  =='ok'){
                            that.inList.splice(indexs,1);
                            // eventBus.$emit('tocel','celbuy');
                            layer.msg(res.data.message)
                        }else{
                            layer.msg(res.message);
                        }
                    }).catch(error=>{
                        console.log(error)
                    })
                }
            });
        },
        getData(){
            var that = this;
            var url = that.url;
            var page = that.page;
            that.loading = true;
            this.$ajax({
                url: '/api/' + url,
                method:'post',
                data:{page:page},
                headers: {'Authorization':  that.token}
            }).then(res=>{
                // console.log(res)
                that.loading=false;
                // console.log(url)
                if(res.data.type == 'ok'){
                        // console.log(res.data.message.list)
                        var list=res.data.message.list;
                        if(that.page==1){
                            that.inList=list;
                        }else{
                            if(list.length<=0){
                                    that.more=that.$t('cuy.nomore')+'...';
                                    return;
                                }else{
                                    that.inList=that.inList.concat(list)
                                }
                            }
                    }else{
                        // layer.msg(res.message);
                }
            }).catch(error=>{
                console.log(error)
        }) 
      },
     
    },
    mounted(){
        var that = this;
        eventBus.$on('buyTrade', function (data) {
            if(data){
            that.getData();
            }
        });
        that.getData();
    }
    
}
</script>
<style scoped>
.title{height: 48px;line-height: 46px;padding: 0 40px 0 30px;background-color: #1a243b;}
.tab_title{display: inline-block;line-height: 46px;height: 46px;}
.tab_title span{cursor: pointer;}
.tab_title span:not(:last-child) {margin-right: 40px;}
.content{padding: 0 40px 0 30px;height: 300px;}
.list-title{line-height: 40px; border-bottom: 1px solid #303b4b;height: 40px;}
.no_data{padding: 50px 0;}
.containers{height: 260px;overflow: auto;}
.list-item li{line-height: 30px;}
.list-item li span{display: inline-block;float: left;}
.list-item li span:nth-child(3){color:#cc4951;}
.list-item li:hover{background-color: rgba(46,55,83,.4)}
.list-item li span.green{color: #12b886}
.pdb20{padding-bottom: 20px;}
.containers span{
    margin-left: 0;
}
</style>





// WEBPACK FOOTER //
// src/view/lever/lever_entrust.vue