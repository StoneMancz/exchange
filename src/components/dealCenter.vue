<template>
	<div class="home flex">
		<div class="home-l">
      <div class="home-l-t">
        <div class="left-box bg-part">
          <market></market>
        </div>
        <div class="tv-box bg-part">
          <tv-top></tv-top>
          <deal-tv></deal-tv>
          <!-- <market></market> -->
        </div>
      </div>
      <div class="entrusts bg-part">
        <div class="tab-entrust whites">
          <span :class="['curPer',{active:whichEntrust == 'entrust'}]" @click="whichEntrust = 'entrust'">{{$t('lever.nowentrust')}}</span>
          <span :class="['curPer',{active:whichEntrust == 'hisentrust'}]" @click="whichEntrust = 'hisentrust'">{{$t('lever.hisentrust')}}</span>
        </div>
        <div class="scroll">
          <div class="entrust-box" v-if="whichEntrust == 'entrust'">
            <entrust ></entrust>
          </div>
          <div class="histentrust-box" v-if="whichEntrust == 'hisentrust'">
            <hisentrust></hisentrust>
          </div>
        </div>
      </div>
    </div>
    <div class="home-r">
      <div class="home-r-t flex">
        <div class="exchage-box bg-part">
          <exchange></exchange>
        </div>
        <div class="complete-box bg-part">
          <complete></complete>
        </div>
      </div>
      <div class="home-r-b bg-part">
        <trade></trade>
      </div>
    </div>
	</div>
</template>

<script>
import indexHeader from "@/view/indexHeader";
import notice from "@/components/noticeList";
import deal from "@/view/deal";
import exchange from "@/view/exchange";
import market from "@/view/dealMarket";
import trade from "@/view/trade";
import chart from "@/view/chart";
import entrust from "@/view/entrust";
import hisentrust from "@/view/hisentrust";
// import detail from "@/view/detail";
import currency from "@/view/currency";
import complete from "@/view/complete";
// import kline from "@/view/kline";
import dealTv from "@/view/dealTv";
// import TvTop from '../view/tvTop'
export default {
  name: "dealCenter",
  components: {
    indexHeader,
    load:1,
    notice,
    deal,
    exchange,
    market,
    trade,
    chart,
    entrust,
    hisentrust,
    // detail,
    currency,
    complete,
    // TvTop,
    // kline,
    dealTv
  },
  data() {
    return {
      isRouterAlive:true,
      whichEntrust:'entrust'
    };
  },
  created() {
    this.address = localStorage.getItem("address") || "";
  },
  methods:{
    
  },
  mounted(){
    
   
  }
};
</script>

<style scoped lang="scss">
.home{
  margin-top: 3px;
  justify-content: space-between;
  height: 100%;
  min-width: 1280px;
  width: 100%;
  >.home-l{
    width: calc(100% - 553px);
    .home-l-t{
      height: 585px;
      display: flex;
      .left-box{
        width: 260px;
        box-sizing: border-box;
        padding:15px 0;
      }
      .tv-box{
        min-width: 510px;
        width: calc(100% - 260px);
        margin-left: 4px;
      }
    }
    >.entrusts{
      margin-top: 4px;
      padding: 0 15px;
      height: 385px;
      min-width: 560px;
      >.tab-entrust{
        // color: rgba(255,255,255,.8);
        font-size: 14px;
        line-height: 1.6;
        height: 30px;
        span{
          margin-right: 14px;
          line-height: 30px;
          
        }
      }
    }
  }
  >.home-r{
    
    width: 550px;
    >.home-r-t{
      justify-content: space-between;
      min-height: 220px;
      max-height: calc(100% - 360px);
      >div{
        width: 273px;
      }
    }
    >.home-r-b{
      margin-top: 3px;
      height: 385px;
    }
  }
}
</style>



// WEBPACK FOOTER //
// src/components/dealCenter.vue