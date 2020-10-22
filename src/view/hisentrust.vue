<template>
    <div class="entrust">
        <!-- <div class="title fColor1 topshadow">
            <div class="tab_title">
                <span>历史委托</span>
            </div>
            
        </div> -->
        <div class="content">
            <ul class="list-title fColor2 bdb ft12 clear">
                <li class="fl w20">{{$t('td.time')}}</li>
                <li class="fl w10">{{$t('market.symbol')}}</li>
                <li class="fl w10">{{$t('td.num')}}</li>
                <li class="fl w15">{{$t('cuy.price')}}</li>
                <li class="fl w10">{{$t('lever.entotal')}}</li>
                <li class="fl w14">{{$t('cuy.evelPrice')}}</li>
                <li class="fl w8">{{$t('fat.status')}}</li>
                <li class="fl w5">方向</li>
                <!-- <li class="fl w8 tr">{{$t('asset.ratenum')}}</li> -->
                <!-- <li class="fl w8 tr">{{$t('cuy.direction')}}</li> -->
            </ul>
            <div class="containers scroll" v-if="comList.length>0">
                <ul class="list-item fColor1 ft12">
                    <li v-for="(item,index) in comList" class="clear" :key="index">
                        <span class="fl w20">{{item.updated_at}}</span>
                        <span class="fl w10">{{item.symbol}}</span>
                        <span class="fl w10">{{item.trade_amount}}</span>
                        <span class="fl w15">{{item.target_price}}</span>
                        <span class="fl w10">{{(item.target_price * item.trade_amount) | numFilter}}</span>
                        <span class="fl w14">{{item.trade_price}}</span>
                        <span class="fl w8">{{$t('lever.dealed')}}</span>
                        <span class="fl w5 green" v-if="item.type=='1'">买入</span>
                        <span class="fl w5 redColor" v-else>卖出</span>
                        <!-- <span class="fl tr w8">{{item.type=='in'? item.in_fee:item.out_fee}}</span> -->
                        <!-- <span class="fl w8 tr" :class="item.type=='out'?'redColor':'green'">{{item.type=='in'?'买入':'卖出'}}</span> -->
                    </li>
                </ul>
                <div class="getmore tc fColor1 ft14 mt10 curPer pdb20" @click="getData('more')" v-if="!loading && comList.length>8">{{more}}</div>
                <div class="tc pdb20" v-if="loading">
                    <img src="@/assets/images/loading.gif" alt=""  class="lodw20">
                    <p class="ft12 baseColor">{{$t('cuy.loading')}}</p>
                </div>
            </div>
            <div class="no_data tc" v-if="comList.length<=0 && !loading">
                <img src="@/assets/images/nodata.png" alt="">
                <p class="fColor2 ft18">{{$t('td.nodata')}}</p> 
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "hisentrust",
  data() {
    return {
      address: "",
      isChoosed: 0,
      isUrl: 0,
      page: 1,
      url: "transaction_in",
      type: "in",
      more: this.$t('td.more'),
      loading: false,
      wayList: [
        { title: this.$t('td.buyin'), url: "transaction_in" },
        { title: this.$t('td.sellout'), url: "transaction_out" },
        { title: this.$t('td.all'), url: "transaction_all" }
      ],
      comList: [],
      user_id:'',
    };
  },
  created() {
    this.token = localStorage.getItem("token") || "";
    this.user_id = localStorage.getItem("user_id") || "";
  },
  wacth() {
    eventBus.$on("buyTrade", function(data) {
      if (data) {
        that.getData();
      }
    });
  },
  methods: {
    // 类型切换
    wayChoose(index, url) {
      var that = this;
      that.comList = "";
      that.page = 1;
      that.url = url;
      if (url == "transaction_in") {
        that.type = "in";
      } else {
        that.type = "out";
      }
      that.more = that.$t('td.more');
      that.isChoosed = index;
      that.getData();
    },
    // 加载更多
    getMore() {
      this.page = ++this.page;
      this.getData();
    },
    getData(more) {
      var that = this;
       var legal=localStorage.getItem('dealLegalId')
      var currency=localStorage.getItem('dealCurrencyId')
      if(that.token == ''){
        return;
      }
      if(!more){that.page = 1};
      var page = that.page;
      that.loading = true;
      var cur_id = window.localStorage.getItem("legal_id_cur");
      this.$ajax({
        url: "/api/" + "coin/list",
        method: "get",
        data: { page: page,currency:currency },
        headers: { Authorization: that.token }
      })
        .then(res => {
          // console.log(res)
          that.loading = false;
          if (res.data.type == "ok") {
            // console.log(res.data.message.list)
            var data = res.data.message;
            var list=[];
            for(let i=0;i<data.length;i++){
              if(data[i].status==2){
                  list.push(data[i]);
              }
            }
            if (more) {
              that.page += 1;
              if (list.length) {
                that.comList = that.comList.concat(list);
              } else {
                that.more = that.$t('td.nomore');
              }
            } else {
              console.log(list)
                if(list.length){
                    that.comList = list;
                    console.log(that.comList)
                }
            }

            
          } 
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    var that = this;
    eventBus.$on("buyTrade", function(data) {
      if (data) {
        that.getData();
      }
    });
    that.getData();
    setInterval(function(){
        that.getData()
    },10000)
  }
};
</script>
<style scoped>
.title {
  height: 36px;
  line-height: 36px;
}
.tab_title {
  display: inline-block;
  line-height: 46px;
  height: 46px;
}
.tab_title span {
  cursor: pointer;
}
.tab_title span:not(:last-child) {
  margin-right: 40px;
}
.content {
  height: 300px;
}
.list-title {
  line-height: 40px;
  /* border-bottom: 1px solid #303b4b; */
  height: 40px;
}
.no_data {
  padding: 50px 0;
}
.containers {
  height: 290px;
  overflow: auto;
  width:100%;
}
.list-item li {
  line-height: 30px;
}
.list-item li span {
  display: inline-block;
  float: left;
  height: 30px;
}
/* .list-item li span:nth-child(3){color:#cc4951;} */
.list-item li:hover {
  background-color: rgba(46,55,83,.4);
}
.list-item li span.green {
  color: #12b886;
}
.pdb20 {
  padding-bottom: 20px;
}
.containers span {
  margin-left: 0;
}
</style>





// WEBPACK FOOTER //
// src/view/hisentrust.vue