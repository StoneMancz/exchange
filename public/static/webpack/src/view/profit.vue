<template>
    <div class="account-main wrap fColor1">
        <div class="title flex">
            <span>历史盈亏记录</span>
        </div>
        <div class="main-content mt20">
            <div class="ft12 ptb10 tc flex white_gray" style="border-bottom: 1px solid #303b4b;">
                <span style='flex:1'>数量</span>
                <span style='flex:2'>明细</span>
                <span style='flex:1'>时间</span>
            </div>
            <ul>
                <li class="ptb10 listitem flex tc" v-for="(item,index) in relist">
                    <span>{{item.value}}</span>
                    <span style="flex:2">{{item.info}}</span>
                    <span>{{item.created_time}}</span>
                </li>
                <div class="more tc ft14 p10 curPer" @click="getmore" v-if="more">加载更多</div>
            </ul>
            <div class="tc mt60"v-if='relist.length==0'>暂无记录</div>
        </div>
    </div>
</template>
<script>

export default {
    data(){
        return {
            page:1,
            more:false,
            relist:[],
            nodata:false
        }
    },
    filters: {
        toFixeds: function(value) {
            value = Number(value);
            return value.toFixed(2);
        }
  },
    created(){
        this.init();
    },
    mounted(){
        
    },
    methods:{
        init(){
            var that = this;
            this.$http({
                url: '/api/'+'profits/show_profits?page='+that.page,
                method:'get',
                data:{},  
                headers: {'Authorization':  localStorage.getItem('token')},    
            }).then(res=>{
                if(res.data.type=="ok"){
                    var list = res.data.message.data;
                    if(list.length>9){
                        that.more=true
                    }else{
                       that.more=false;
                    }
                    that.relist=that.relist.concat(list)
                }else{
                    
                }
            }).catch(error=>{
                // console.log(error)
            })
        },
        getmore(){
            this.page=this.page+1;
            this.init();
        }
    }
}
</script>
<style scoped >
    .account-main {
        background: #273041;
    }
    .title {
        width: 100%;
        line-height: 60px;
        background: #181b2a;
        border-radius: 4px;
        padding-left: 20px;
    }
    .main-content {
        background: #181b2a;
        min-height: 700px;
        border-radius: 2px;  
    }
    .ptb10{
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .listitem span{
        flex: 1
    }
</style>



// WEBPACK FOOTER //
// src/view/profit.vue