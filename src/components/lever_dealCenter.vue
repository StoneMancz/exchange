<template>
	<div class="home">
		<!-- <div class="main">
			<div class="main-l fl" >
				<div class="sidebar">
          <market></market>
        </div>
				<div class="notice_box" style="margin-top:10px">
        <notice></notice>
      </div>
			</div>
			<div class="main-r">
				<div class="chart_wrap">
         
        </div>
				<div class="parts  flex between" >
					<div class="trade-wrap part-l">
						<trade></trade>
					</div>
					<div class="deadl-wrap part-r">
						<exchange></exchange>
					</div>
				</div>
        <div class="entrust_box" style="background: #1a243b;">
        <leverTransaction></leverTransaction>
        </div>
        
			</div>
		</div> -->
		<div class="main">
      <div class="main-top flex">
        <div class="tv-box bg-part">
          <tv></tv>
        </div>
        <div class="exchange-box bg-part">
          <exchange></exchange>
        </div>
      </div>
      <div class="main-bottom flex">
        <div class="tran-box bg-part">
          <leverTransaction></leverTransaction>
        </div>
        <div class="trade-box bg-part">
          <trade></trade>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
import indexHeader from "@/view/indexHeader";
import notice from "@/view/lever/lever_noticeList";
import deal from "@/view/deal";
import exchange from "@/view/lever/lever_exchange";
import market from "@/view/lever/lever_market";
import trade from "@/view/lever/lever_trade";
import chart from "@/view/chart";
import entrust from "@/view/lever/lever_entrust";
import hisentrust from "@/view/lever/lever_hisentrust";
import detail from "@/view/detail";
import currency from "@/view/currency";
import complete from "@/view/complete";
import leverTransaction from "@/view/lever/lever_transaction";
// import kline from "@/view/lever/lever_kline";
import tv from '../view/tv'
export default {
  name: "dealCenter",
  components: {
    indexHeader,
    load:1,
    notice,
    deal,
    tv,
    exchange,
    market,
    trade,
    chart,
    entrust,
    hisentrust,
    detail,
    currency,
    complete,
    leverTransaction,
    // kline
  },
  data() {
    return {
      isRouterAlive:true
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
  .main{
    >div{
      justify-content: space-between;
      >div{
        // background: #1a243b;
      }
      margin-top: 6px;
      .tv-box{
        width: calc(100% - 406px);
        height: 500px;
      }
      .exchange-box{
        width: 400px;
        height: 500px;
      }
      .tran-box{
        width: calc(100% - 606px);
        height: 650px;
      }
      .trade-box{
        width: 600px;
        height: 650px;
      }
    }
    
  }
}

</style>



// WEBPACK FOOTER //
// src/components/lever_dealCenter.vue