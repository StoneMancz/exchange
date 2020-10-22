<template>
    <div class="noticeDetail">
        <indexHeader></indexHeader>
        <div class="account-wrap">
            <div class="account">
                <div>
                    <div class="back-nav fColor1 ft20"> 
                        <span class="fr fColor2 curPer" @click="goBefore">&lt;&lt; {{$t('news.back')}}</span>
                    </div>
                    <div class="nav-after"></div>
                </div>
                <div class="account-content">
                    <div class="detailBig">
                        <div class="mb30 clear">
                            <span class="fColor1 w90 fl tc">{{title}}</span>
                        </div>
                        <div class="detailContent fColor2">
                            <p v-html="content" ref="con"></p>
                        </div> 
                        <!-- <div class="fColor2 mt40">
                            <p class="tr">{{abstract}}</p>
                            <p class="tr mt5">{{update_time}}</p>
                        </div> -->
                    </div>
                </div>
             </div>
        </div>
    </div>
</template>
<script>
import indexHeader from '@/view/indexHeader'
export default {
    name:'noticeDetail',
    components:{indexHeader},
    data (){
        return{
            title:'',
            content:'',
            abstract:'',
            update_time:'',
            id:''

        }
    },
    created(){
        this.address = localStorage.getItem('token') || '';
        // this.id = this.$route.query.id;
        // var id = this.id;
        this.getData();
       
       
        

    },
    mounted(){
       
    },
    methods:{
        goBefore(){
            this.$router.back(-1);
        },
        getData(){
            var that = this;
            this.$ajax({
            url: '/api/' + 'news/list',
            method:'post',
            data:{c_id:10},
        }).then(res=>{
            console.log(res)
            if(res.data.type  === 'ok'){
                this.id=res.data.message.list[0].id;
                this.getDetail();
                // console.log(this.id)
            }else{
                // layer.msg(res.message);
            }
            }).catch(error=>{
                console.log(error)
            })
        },
        getDetail(){
            this.$ajax({
                url: '/api/' + 'news/detail',
                method:'post',
                data:{id:this.id},
            }).then(res=>{
                res = res.data;
                if(res.type  === 'ok'){
                    this.title=res.message.title;
                    this.content=res.message.content;
                }else{
                    // layer.msg(res.message);
                }
            }).catch(error=>{
                console.log(error)
            })
        },
        setProperty(){
            var tags=document.getElementsByTagName('p');
            HTMLCollection.prototype.forEach=function(callback){
                    [].slice.call(this).forEach(callback);
            };
            tags.forEach(function(e, i){
                    e.style.backgroundColor='#666 !important'
            });
        
       }
    }
}
</script>
<style lang="scss" scoped>
.noticeDetail{
    .account-wrap{
        background: url(../assets/images/account_center_bg.jpg) no-repeat;
        background-size: cover;
        .account {
            width: 1200px;
            margin: 0 auto;
            padding-top: 30px;
            overflow: hidden;
            min-height: 880px;
            .nav-after{
                display: block;
                height: 10px;
                background-color: transparent;
            }
            .account-content {
                width: 100%;
                min-height: 750px;
                background-color: #1a243b;
                .detailBig{
                    padding: 48px 46px 20px;
                    .mb30{
                        margin-bottom: 30px;
                    }
                    .detailContent{
                        line-height: 26px;
                        p{
                          &>*{
                            background-color: #1a243b!important;
                           }  
                        }
                       
                    }
                    .mt5{
                        margin-top: 5px;
                    }
                }

            }

        }
    }
}
</style>






// WEBPACK FOOTER //
// src/components/policy.vue