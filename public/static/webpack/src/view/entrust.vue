<template>
    <div class="entrust">
        <div class="title fColor1 topshadow">
            <!-- <div class="tab_title">
                <span>当前委托</span>
            </div> -->
            <div class="tab_title fl ft12">
                <span v-for="(way,index) in wayList" :key="index" :class="{'active': index == isChoosed}" @click="wayChoose(index,way.url)">{{way.title}}</span>
            </div>
        </div>
        <div class="content">
            <ul class="list-title bdb fColor2 ft12 flex">
                <li class="w30 tc">{{$t('td.time')}}</li>
                <li class="w10 tc">{{$t('market.symbol')}}</li>
                <li class="w10 tc">{{$t('cuy.direction')}}</li>
                <li class="w20 tc">{{$t('td.num')}}</li>
                <li class="w20 tc">{{$t('cuy.price')}}</li>
                <!-- <li class="w11">已成交</li>
                <li class="w11">未成交</li> -->
                <!-- <li class="w10">委托总额</li> -->
                <li class="w10 tc">{{$t('td.do')}}</li>
            </ul>
            <div class="containers scroll" v-if="inList.length>0">
                <ul class="list-item fColor1 ft12">
                    <li v-for="(item,index) in inList" :key="index" class="clear">
                        <span class="fl w30 tc">{{item.updated_at}}</span>
                        <span class="fl w10 tc">{{item.symbol}}</span>
                        <span :class="['fl tc','w10',{'green':item.type == 1}]">{{item.type==1?buyin:sellout}}</span>
                        <span class="fl w20 tc">{{item.trade_amount || '0.0000' | tofixedFour}}</span>
                        <span class="fl w20 tc">{{item.target_price || '0.0000' | tofixedFour}}</span>
                        <!-- <span class="fl w11">{{(item.complete_number-0).toFixed(5)}}</span>
                        <span class="fl w11">{{item.number}}</span> -->
                        <!-- <span class="fl w10">{{(item.total_money-0).toFixed(5)}}</span> -->
                        <span class="fl w10 tc curPer ceilColor" @click="revoke(index,item.id)">{{$t('cuy.revoke')}}</span>
                    </li>
                </ul>
                <div class="getmore tc fColor1 ft14 mt10 curPer pdb20" @click="getData('more')" v-if="!loading && inList.length>8">{{more}}</div>
                <div class="tc pdb20" v-if="loading">
                    <img src="@/assets/images/loading.gif" alt=""  class="lodw20">
                    <p class="ft12 baseColor">{{$t('cuy.loading')}}</p>
                </div>
            </div>
            <div class="no_data tc" v-show="inList.length<=0 && !loading">
                <img src="@/assets/images/nodata.png" alt="">
                <p class="fColor2 ft18">{{$t('td.nodata')}}</p> 
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "entrust",
  data() {
    return {
      isshow: false,
      address: "",
      isChoosed: 0,
      isUrl: 0,
      page: 1,
      url: "transaction_in",
      type: "in",
      more: this.$t('td.more'),
      loading: false,
      buyin:this.$t('td.buyin'),
      sellout:this.$t('td.sellout'),
      urlList: [{ title: this.$t('lever.nowentrust') }],
      wayList: [
        { title: this.$t('td.all'), url: "transaction_all" },
        { title: this.$t('td.buyin'), url: "transaction_in" },
        { title: this.$t('td.sellout'), url: "transaction_out" }
      ],
      inList: [],
      set:null
    };
  },
  created() {
    this.token = localStorage.getItem("token") || "";
  },
  filters: {
    tofixed: function(val) {
      val = Number(val);
      return val.toFixed(2);
    },
    tofixedFour: function(val) {
      val = Number(val);
      return val.toFixed(4);
    },
  },
  methods: {
    // 类型切换
    wayChoose(index, url) {
      var that = this;
      // if(index ==2){
      //     that.isshow = true;
      // }else{
      //     that.isshow = false;
      //     that.getData();
      // }
      // console.log(url)
      that.inList = "";
      that.page = 1;
      that.url = url;
      // console.log(that.url)
      if (url == "transaction_in") {
        that.type = "in";
      } else if (url == "transaction_out") {
        that.type = "out";
      } else {
        that.type = "all";
      }
      that.getData();
      that.more = that.$t('td.more');
      that.isChoosed = index;
    },

    // 撤销
    revoke(indexs, id) {
      // console.log(indexs);

      var that = this;
      var id = id;
      var indexs = indexs;
      var type = that.type;
      layer.open({
        skin: 'confirmCancel',
        content: that.$t('cuy.confirmCancel'),
        btn: [that.$t('cuy.confirm'), that.$t('cuy.cancel')],
        yes: function(index) {
          var i = layer.load();
          that.$http({
              url: "/api/" + "coin/trade",
              method: "PUT",
              data: {
                id: id
              },
              headers: { Authorization: that.token }
            })
            .then(res => {
              // console.log(res)
              layer.close(i);
              if (res.data.type == "ok") {
                console.log(indexs);
                that.inList.splice(indexs, 1);
                eventBus.$emit("tocel", "celbuy");
                layer.msg(res.data.message);
              } else {
                layer.msg(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },
    getData(more) {
      var that = this;
      if(that.token == ''){
        return;
      }
      var cur_id = window.localStorage.getItem("legal_id_cur");
      
      if(!more){that.page=1}
      var page = that.page;
      if(that.inList.length > 0){
        that.loading = true;
      }
      var legal=localStorage.getItem('dealLegalId')
      var currency=localStorage.getItem('dealCurrencyId')
      this.$http({
        url: "/api/" + 'coin/list',
        method: "get",
        data: { page: page ,currency:legal},
        headers: { Authorization: that.token }
      })
        .then(res => {
          // console.log(res)
          that.loading = false;
          // console.log(url)
          if (res.data.type == "ok") {
            // console.log(res.data.message.list)
           var data = res.data.message;
            var list=[];
            if(that.type=='all'){
              for(let i=0;i<data.length;i++){
                if(data[i].status==1){
                    list.push(data[i]);
                }
              }
            }
            if(that.type=='in'){
              for(let i=0;i<data.length;i++){
                if(data[i].type==1 && data[i].status==1){
                    list.push(data[i]);
                }
              }
            }
            if(that.type=='out'){
              for(let i=0;i<data.length;i++){
                if(data[i].type==2 && data[i].status==1){
                    list.push(data[i]);
                }
              }
            }
            if (more) {
              if (list.length == 0) {
                that.more = that.$t('cuy.nomre');
              } else {
                that.inList = that.inList.concat(list);
              }
              that.page += 1;
            } else {
              this.inList = list;
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
    eventBus.$on("tocel", function(data) {
      console.log(data);
      if (data) {
        that.getData();
      }
    });
    eventBus.$on("buyTrade", function(data) {
      console.log(data);
      if (data) {
        that.getData();
      }
    });
    that.getData();
    that.set = setInterval(function(){
        that.getData()
    },10000)
  },
  destroyed(){
    let that = this;
    if(that.set){
      clearInterval(that.set)
    }
  }
};
</script>
<style scoped>
.confirmCancel {
  color:#000;
}
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
/* .content{height: 300px;} */
.list-title {
  line-height: 40px;
  /* border-bottom: 1px solid #303b4b; */
  height: 40px;
  width: 100%;
}

.no_data {
  padding: 50px 0;
}
.containers {
  height: 270px;
  overflow: auto;
}
.list-item li {
  line-height: 30px;
}
.list-item li span {
  display: inline-block;
}
.list-item li span:nth-child(3) {
  color: #cc4951;
}
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
// src/view/entrust.vue