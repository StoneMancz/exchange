<template>
    <div class="currency">
        <div class="title fColor1">币种资料</div>
        <div class="content f14 fColor1">
            <p class="ft24">{{coin.name}}</p>
            <p class="fColor2 abstract ft14">简介</p>
            <p class="mt15 ft14">
                {{coin.desc}}
            </p>
        </div>
    </div>
</template>
<script>
export default {
    name:"currency",
    data(){
        return {
            currency_id:'',
            coin:{}
        }
    },
    created(){
        this.getData()
    },
    methods:{
        getData(){
            var id = window.localStorage.getItem('legal_id_cur'); 
            if(id != null){

                this.$http({
                    url: '/api/' + 'currency/detail?id='+id,
                }).then(res => {
                    if(res.data.type == 'ok'){
                        this.coin = res.data.message;
                    }
                    
                })
            }
        }
    }
}
</script>
<style scoped>
.currency{background-color: #1a243b;}
.title{height: 48px;line-height: 46px;padding: 0 40px 0 30px;background-color: #1a243b;}
.content{padding: 15px 30px 60px;}
.ft24{font-size: 24px}
.abstract{padding:15px 0;border-bottom: 1px solid #2e3753;}
</style>




// WEBPACK FOOTER //
// src/view/currency.vue