<template>
    <div class="account-main wrap fColor1">
        <div class="title flex between">
            <span>我的会员</span>
            <div class="topbox flex ml20">
                <p>我的团队业绩：{{money}}</p>
                <p class="ml20">团队人数(实名)：{{man}}</p>
            </div>
        </div>
        <div class="main-content mt20">
            <div class="white">
                <ul id="demo2"></ul>
            </div>
            <div class="tc" style="padding-top:100px" v-if="nodata">暂无会员</div>
        </div>
    </div>
</template>
<script>
// import "../../static/layui/css/layui.css"
// import "../../static/layui/layui.all.js"
export default {
    data(){
        return {
            userid:'',
            nodata:false,
            money:'--',
            man:'--'
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
            this.$ajax({
                url: '/api/'+'user/info',
                method:'get',
                data:{},  
                headers: {'Authorization':  localStorage.getItem('token')},    
            }).then(res=>{
                if(res.data.type=="ok"){
                    this.userid=res.data.message.id
                    this.tree();
                }else{
                    
                }
            }).catch(error=>{
                // console.log(error)
            })
        },
        tree(){
            var that = this;
            console.log(that.userid)
            layui.use(['tree'], function () {
                var list = {};
                that.$ajax({
                    url:'/api/'+'getNode',
                    method:'post',
                    data:{user_id:that.userid},
                    dataType:'json',
                }).then(res=>{
                    console.log(res);
                    if (res.data.type=='ok'){
                        that.money=res.data.message.show_message.top_upnumber;
                        that.man=res.data.message.show_message.real_teamnumber;
                        var list = res.data.message.results;
                        if(list.length==0){
                            that.nodata=true;
                        }
                        that.list=list;
                        that.render_tree(list);
                    } else{
                        layer.msg(res.data.message);
                    }
                })
            });
        },
        
        reload(data){
            $('#demo2').html('');
            this.render_tree(data);
        },
        render_tree(data) {
            var that = this;
            layui.tree({
                elem: '#demo2'
                , nodes: data
                , click: function (node) {
                    var self=this;
                    that.$ajax({
                        url: "/api/getNode",
                        method: 'post',
                        data: {user_id: node.id},
                    }).then(res=>{
                        //console.log(res);
                        node.children = res.data.message.results;
                        node.spread = true;
                        that.reload(self.nodes);
                    })
                }
            });
        }


    
    }
}
</script>
<style scoped >

    .main-content>>>.layui-tree li i{
        color: #fff!important;
    }
    .account-main {
        background: #273041;
    }
    .title {
        width: 100%;
        line-height: 60px;
        background: #181b2a;
        border-radius: 4px;
        padding:0 20px;
    }
    .main-content {
        background: #181b2a;
        min-height: 700px;
        border-radius: 2px;  
    }
</style>



// WEBPACK FOOTER //
// src/view/tree.vue