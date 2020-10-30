<template>
    <div class="box">
        <indexHeader></indexHeader>
        <div class="account">
            <div class="topcontent ft20 fColor1 bg-part">
                <span>{{$t('asset.assets')}}</span>
            </div>
            <div class="leftcontent contentBK">
               <left></left> 
            </div>
            <div class="rightcontent contentBK">
               <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
	import indexHeader from '@/view/indexHeader'
	import left from '@/view/accounts/left_account'
    export default {
        name:'account',
        data(){
            return {
                lang:'',
                currentIndex:0,
            }
        },
        components:{
            indexHeader,
            left,
        },
        mounted(){
           
        }
    }
</script>
<style scoped >
    .box .account{
        width: 1200px;
        margin: 0 auto 82px;
    }
    .topcontent{
        height: 60px;
        line-height: 60px;
        padding: 0 30px;
        margin: 20px 0;
        font-size: 20px;
        border-radius: 3px;
        /* background-color: #1a243b; */
    }
    .leftcontent{
        width: 220px;
		margin-right: 20px;
		height: 350px;
		border-radius: 3px;
		padding: 4px;
        float: left;
    }
    .rightcontent{
        width: 960px;
        margin-left: 240px;
        min-height: 1000px
    }
    
</style>





// WEBPACK FOOTER //
// src/components/new_account.vue