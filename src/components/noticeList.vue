<template>
    <div class="notice">
        <indexHeader></indexHeader>
        <div class="account-wrap">
            <div class="account">
                <div>
                    <div class="back-nav fColor1 ft20 clear" style="padding:10px 20px 0"> {{$t('news.helpcenter')}}
                        
                    </div>
                    
                </div>
                <div class="account-content">
                    <div class="tc hide" style="padding-top: 150px;">
                        <img src="../assets/images/nodata.png" alt=""> 
                        <p class="fColor2 ft18">{{$t('td.nodata')}}</p>
                    </div>
                    <div>
                        <ul class="noticeList">
                            <li class="clear curPer" v-for="item in newList" :key="item.id">
                                <div class=""  @click="goDetail(item.id)">
                                        <div class="">{{item.title}}</div>
                                        <span class="fr">{{item.update_time}}</span>
                                    
                                </div>
                            </li>
                        </ul> 
                    </div>
                    <div class="tc" style="padding:15px">
                        <!-- <div class="fColor1 ft14 mt10" @click="getMore">{{more}}</div> -->
                        <!-- <div>
                            <img src="@/assets/images/loading.gif" alt=""  class="lodw20">
                            <p class="ft12 baseColor">加载中...</p>
                        </div> -->
                    </div>
                </div>
             </div>
        </div>
    </div>
</template>
<script>
import indexHeader from "@/view/indexHeader";
export default {
  name: "noticeList",
  components: { indexHeader },
  data() {
    return {
      more: this.$t('td.more'),
      newList: []
    };
  },
  created() {
  },
  methods: {
    getNotice(){
      this.$ajax({
        url:'/api/' + 'news/list',
        method:'post',
        data:{c_id:'4'}, 
      }).then(res => {
        console.log("公告接口");
        console.log(res);
        this.newList=res.data.message.list
        
      })
    },
    goBefore() {
      this.$router.back(-1);
    },
    getMore() {
    },
    goDetail(id) {
      var id = id;
      this.$router.push({
        name: "noticeDetail",
        query: { id: id }
      });
      // let routeUrl = this.$router.resolve({
      //   name: "noticeDetail",
      //   query: { id: id }
      // });
      // window.open(routeUrl .href, '_blank');
    }
  },
  mounted(){
      var that = this;
      that.getNotice();
    }
};
</script>
<style lang="scss" scoped>
.notice {
  .account-wrap {
    .account {
      // width: 1500px;
      margin: 40px auto;
      // padding-top: 30px;
      overflow: hidden;
      // min-height: 880px;
      padding-top: 0;
      .back-nav {
        height: 40px;
        font-size: 16px;
        line-height: 40px;
      }
      .nav-after {
        display: block;
        height: 10px;
        background-color: #171c2b;
      }
      .account-content {
        width: 100%;
        min-height: 450px;
        // background-color: #1a243b;
        ul {
          padding: 0 20px;
          font-size: 14px;
          li {
            border-bottom: 1px dashed #303b4b;
            height: 72px;
            padding: 10px 0 7px;
            color: #cdd6e4;
                font-size: 12px;
            > div {
              > div {
                height: 36px;
                line-height: 36px;
              }
              span{
                  color: #61688a;
              }
            }
          }
        }
      }
    }
  }
}
</style>




// WEBPACK FOOTER //
// src/components/noticeList.vue