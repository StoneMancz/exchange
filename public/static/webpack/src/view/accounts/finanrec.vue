<template>
    <div class="box">
        <indexHeader></indexHeader>
        <div class="account">
            <div class="topcontent ft20 ">
                <span class="white"><span class="baseColor">交易账户></span> 财务记录</span>
            </div>
            <div class="content">
               <div class="con_box">
                   <div class="account_title ttBk white">
                       最新
                   </div>
                   <div class="contentBK fColor1  pdlr20 pdtb20 ft12">
                       <div class="flex alcenter">
                           <span class="flex1">时间</span>
                           <span class="flex1">币种</span>
                           <span class="flex1">类型</span>
                           <span class="flex1">数量</span>
                           <span class="flex1">状态</span>
                           <span class="flex1">操作</span>
                       </div>
                       <div class="mt10">
                            <div class="flex alcenter">
                                <span class="flex1">2018-01-29 12:23:45</span>
                                <span class="flex1">usdt</span>
                                <span class="flex1">usdt</span>
                                <span class="flex1">245</span>
                                <span class="flex1">已完成</span>
                                <span class="flex1">撤销</span>
                            </div>
                            <div class="none color1 tc">
                                暂无记录
                            </div>
                       </div>
                       
                   </div>
               </div>
               <div class="con_box mt15">
                   <div class="account_title ttBk white flex">
                       <div class="active">充币记录</div>
                       <div class="ml20">提币记录</div>
                       <div class="ml20">划转记录</div>
                       <div class="ml20">其他记录</div>
                   </div>
                   <div class="contentBK fColor1  pdlr20 pdtb20 ft12">
                       <div class="flex alcenter">
                           <span class="flex1">时间</span>
                           <span class="flex1">币种</span>
                           <span class="flex1">类型</span>
                           <span class="flex1">数量</span>
                           <span class="flex1">状态</span>
                           <span class="flex1">操作</span>
                       </div>
                       <div class="mt10">
                            <div class="flex alcenter">
                                <span class="flex1">2018-01-29 12:23:45</span>
                                <span class="flex1">usdt</span>
                                <span class="flex1">usdt</span>
                                <span class="flex1">245</span>
                                <span class="flex1">已完成</span>
                                <span class="flex1">撤销</span>
                            </div>
                            <div class="none color1 tc">
                                暂无记录
                            </div>
                       </div>
                       
                   </div>
               </div>
            </div>
        </div>
    </div>
</template>
<script>
import indexHeader from '@/view/indexHeader'
export default {
    name:'finanrec',
    components:{indexHeader},
    data(){
        return {
            lang:'',
            token:'',
            changeList:[]
        }
    },
    created(){
        this.token= localStorage.getItem('token') || '';
    },
    methods:{
        getdata(){
            $.ajax({
                type: "POST",
                url: '/api/' + 'wallet/legal_log',
                data: {

                    // type:'change'
                },
                dataType: "json",
                async: true,
                beforeSend: function beforeSend(request) {
                    request.setRequestHeader("Authorization", that.token);
                },
                success: function(res){
                    if (res.type=="ok"){
                 
                    }else{
                       
                    }
                }
            })
        }
    },
    mounted(){
        var that = this;
        that.getdata();
    }
    
}
</script>

<style lang="scss" scoped>
    .box .account{
        width: 1200px;
        margin: 0 auto 82px;
        margin-top: 30px;
    }
    .topcontent{
        padding: 22px 30px;
        margin-bottom: 20px;
        background-color: #1a2330;
        border-radius: 5px;
    }
    .account_title{
        padding: 15px 20px;
    }
    .content{

    }
</style>





// WEBPACK FOOTER //
// src/view/accounts/finanrec.vue