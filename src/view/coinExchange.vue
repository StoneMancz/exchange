<template>
    <div class="account-main wrap fColor1">
        <div class="title flex">
            <span>币币兑换</span>
        </div>
        <div class="main-content mt20">
            <div class="mauto" style="width:80%">
                <div class="flex alcenter exbox">
                    <div>
                        <el-select v-model="currency_name" :placeholder='$t("fat.pselect")' @change="currency_click">
                            <el-option
                            v-for="item in currency_list" :value="item"  :key="item.id">{{item.currency_name}}
                            </el-option>
                        </el-select>
                    </div>
                    <div>
                        <input type="number" name="" id="" class="number-input" placeholder="兑换数量" v-model="number">
                    </div>
                    <div class="tc btn-btn white bgBlue radius4 pointer" @click="submit">兑换</div>
                </div>
                <div class="mt10 ft14">兑换比例：1{{currency_name}} 兑换 {{rate}}USDT</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
           currency_list:[],
           currency_name:'',
           id:'',
           rate:'',
           number:''
 
        }
    },
    filters: {
        toFixeds: function(value) {
            value = Number(value);
            return value.toFixed(2);
        }
    },
    computed: {
       
    },
    created(){
        this.getlist();
    },
    mounted(){
        
    },
    methods:{
        //选择币种
        currency_click(event) {
            this.currency_name = event.currency_name;
            this.id = event.id;
            this.rate= event.number;
        },
        getlist(){
            var that = this;
            this.$ajax({
                url: '/api/exchange/list',
                method:'GET',
                headers: {'Authorization':  localStorage.getItem('token')},
            }).then(res=>{
                if(res.data.type=="ok"){
                    let list = res.data.message;
                    that.currency_list = list;
                    this.currency_name = list[0].currency_name;
                    this.id = list[0].id;
                    this.rate = list[0].number;
                }
            }).catch(error=>{
               
            })
        },
        submit(){
            let that = this;
            if(!that.number || that.number<0){
                return layer.msg('请输入数量');
            }
            let loa = layer.load();
            this.$ajax({
                url: '/api/exchange/exchange',
                method:'POST',
                data:{
                    number:that.number,
                    id:that.id
                },
                headers: {'Authorization':  localStorage.getItem('token')},
            }).then(res=>{
                layer.close(loa);
                layer.msg(res.data.message);
                if(res.data.type=="ok"){
                    console.log(res.data)
                    that.number='';
                }
            }).catch(error=>{
               
            })
        }
    }
}
</script>
<style lang='scss'>
    .exbox{
        padding-top: 60px;
    }
    .btn-btn{
        line-height: 38px;
        padding: 0 30px;
        background: #5697f4;
        margin-left: 20px;
    }
    .number-input{
        color: #c7cce6;
        display: block;
        width: 100%;
        line-height: 38px;
        padding: 0 20px;
        border: 1px solid #4e5b85;
        background: none;
        margin-left: 10px;
    }
    .el-input__inner {
        border: 1px solid #4e5b85;
        background: #1a243b;
        color: #fff;
    }
    .layui-layer{
    background:#171c2b;
    }
    .layui-layer-title {
    border-bottom: 1px solid #2e3753;
    color: #fff;
    background-color: #171c2b;
    }
    .layui-layer-prompt .layui-layer-input {
    border: 1px solid #555869;
    color: #fff;
    background: none;
    }
    .layui-layer-dialog .layui-layer-content{
    color: #fff;
    }
    .layui-layer-loading{
    background-color: transparent;
    }
   .account-main {
        background: #273041;
        .title {
            width: 100%;
            line-height: 60px;
            background: #1a243b;
            border-radius: 4px;
            padding-left: 20px;
        }
        .main-content {
            background: #1a243b;
            min-height: 700px;
            border-radius: 2px;
            .inbox{padding-top: 50px}
            .numbers{
                background: transparent;
                border:1px solid #202731;
                height: 28px;
                margin-left: 10px;
                padding-left: 10px;
                width:140px;
                color: #ffffff;
                font-size: 12px;
            }
            .mt60{margin-top: 60px;}
            .submit{
                background: #5697f4;
                height: 32px;
                margin-left: 10px;
                width: 120px;
                color: #ffffff;
                cursor: pointer;
            }
        }
        .topboxs{
            width: 88%;
            margin: 0 auto;
            li{
                flex: 1;
                height: 75px;
                line-height: 32px;
                border: 1px solid #202731;
                p{
                    padding-bottom: 5px;
                    font-size: 12px;

                }
                span{
                    color: #87a2cd;
                }
                .red{color: #de5151}
            }
        }
        .record{background-color: #1a2330;padding: 10px 20px}
        .ulbox{max-height: 300px;overflow-y: scroll;padding-bottom: 20px;}
        .p20{padding: 20px;}
        .plr20{padding-left: 20px;padding-right: 20px}
        .p10{padding: 10px;}
        .libg{background: #1a2330;padding: 10px;border-radius: 4px;}
        .red{color: #ce3939}
   }
</style>



// WEBPACK FOOTER //
// src/view/coinExchange.vue