<template>
    <div class="box-account">
        <indexHeader></indexHeader>
        <div class="account">
            <left v-bind:lang="lang" :current="0"></left>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
	import indexHeader from '@/view/indexHeader'
	import left from '@/view/left'
    export default {
        name:'account',
        data(){
            return {
                lang:'',
            }
        },
        components:{
            indexHeader,
            left,
        },
        // mounted(){
        //     this.bus.$on('nav_name',cur=>{
        //         this.array.findIndex()
        //     })
        // }
    }
</script>
<style scoped >
    .box-account{
        background-color: #273041;
    }
    .box-account .account{
        width: 1200px;
        padding-top: 30px;
        min-height: 880px;
        margin: 0px auto;
        overflow: hidden;
    }
   
</style>





// WEBPACK FOOTER //
// src/components/account.vue