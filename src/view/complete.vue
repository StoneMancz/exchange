<template>
    <div class="detail">
        <div class="title fColor1 topshadow bdb">
            <div class="inblock">
                <span>{{$t('cuy.allStation')}}</span>
            </div>
        </div>
        <div class="content">
            <ul class="list-title fColor2 ft12 clear">
                <li class="fl w12">{{$t('td.time')}}</li>
                <!-- <li class="fl w12">交易对</li> -->
                <li class="fl w12">{{$t('cuy.price')}}</li>
                <li class="fl w12">{{$t('lever.tdnum')}}</li>
            </ul>
            <div class="containers scroll" v-if="deList.length>0">
                <ul class="list-item  ft12">
                    <li :class="['clear',[itm.way==1?'green':'red']]"   v-for="(itm,index) in deList" v-if="index<20" :key="itm.id" >
                        
                        <span class="fl w12">{{itm.time | cutDate}}</span>

                        <!-- <span class="fl w12">{{itm.currency_name}} / {{itm.legal_name}}</span> -->
                        <span class="fl w14">{{itm.price || '0.0000' | tofixed8}}</span>
                        <span class="fl">{{itm.number || '0.0000' | tofixedFour}}</span>
                    </li>
                </ul>
            </div>
            <!-- <div class="no_data tc" v-if="deList.length<=0">
                <img src="../assets/images/nodata.png" alt="">
                <p class="fColor2 ft18">暂无数据</p>   
            </div> -->
        </div>
    </div>
</template>
<script>
export default {
  name: "detail",
  data() {
    return {
      address: "",
      isChoosed: 2,
      new: false,
      wayList: ["买入", "卖出", "全部"],
      deList: [],
      legal_id: "",
      currency_id: "",
      legal_name: "",
      currency_name: "",
      set: null,
    };
  },
  created() {
    this.address = localStorage.getItem("address") || "";
    this.connect();
  },
  filters:{
    tofixed: function(val) {
      val = Number(val);
      return val.toFixed(2);
    },
    tofixedFour: function(val) {
      val = Number(val);
      return val.toFixed(4);
    },
    tofixed8: function(val) {
      val = Number(val);
      return val.toFixed(8);
    },
    cutDate(v){
      return v.substr(-8)
    }
  },
   sockets: {
        connect: function () {
            console.log('连接成功')
        },
        customEmit: function (data) {
            console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
        },
        STREAM_STATUS(data) {// 后端按主题名推送的消息数据
            console.log('Page：' + data)
        }
    },

  methods: {
    wayChoosed(index) {
      this.isChoosed = index;
    },
    //全站交易记录
    complete(legals_id, currencys_id) {
      this.$ajax({
        url: "/api/" + "transaction/deal",
        method: "post",
        data: {
          legal_id: legals_id,
          currency_id: currencys_id
        },
        headers: { Authorization: localStorage.getItem("token") }
      })
        .then(res => {
          if (res.data.type == "ok") {
            let comp = res.data.message.complete;
            // console.log(comp);

            this.deList = comp;
            this.connect();
            // this.leftName = comp[0].currency_name;
            // this.rightName = comp[0].legal_name;
          } else {
            // layer.msg(res.data.message)
          }
        })
        .catch(error => {
          // console.log(error)
        });
    },
    timestampToTime(timestamp) {
        var time=''
        if(timestamp.toString().length>11){
          time=timestamp
        }else{
          time=timestamp*1000
        }
        var date = new Date(time); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() > 10 ? date.getDate() + ' ' : ('0' + date.getDate()) + ' ';
        var h = date.getHours() > 10 ? date.getHours() + ':' : ('0' + date.getHours()) + ':';
        var m = date.getMinutes() > 10 ? date.getMinutes() + ':' : ('0' + date.getMinutes()) + ':';
        var s = date.getSeconds() > 10 ? date.getSeconds() : ('0' + date.getSeconds());
        return Y + M + D + h + m + s;
    },
    connect() {
      var that = this;
      that.$socket.emit("login", localStorage.getItem("user_id"));
      this.$options.sockets.match_trade=(msg)=>{
        if (msg.type == "match_trade") {
          // console.log(msg)
          if(that.legal_id ==  msg.legal_id && that.currency_id == msg.currency_id){
            var times = that.timestampToTime(msg.data[0].ts)
            var way;
            msg.data[0].direction == 'buy' ? way=1 : way=2;
            var data ={
              price: msg.data[0].price,
              time: times,
              number: msg.data[0].amount,
              way: way
            }
            that.deList.unshift(data)
            if(that.deList.length >20){
              that.deList.pop()
            }
            // console.log(that.deList)
          }
        }
      }
    }
  },
  mounted() {
    var that = this;
    that.legal_id = localStorage.getItem("dealLegalId");
    that.currency_id = localStorage.getItem("dealCurrencyId");
    that.legal_name = localStorage.getItem("legal_name");
    that.currency_name = localStorage.getItem("currency_name");
    that.complete(that.legal_id, that.currency_id);
    // that.set = setInterval(function(){
    //   that.complete(that.legal_id, that.currency_id);
    // },10000)
  },
  // destroyed(){
  //   let that = this;
  //   if(that.set){
  //     clearInterval(that.set)
  //   }
  // }
};
</script>
<style scoped>
.detail{
  height: 100%;
}
.content{
  height: 100%
}
.title {
  padding: 0px 20px;
  font-size: 14px;
  /* border-bottom: 1px solid #303b4b; */
  height: 40px;
  line-height: 40px;
 
  /* height: 48px;
  line-height: 46px;
  padding: 0 40px 0 30px; */
  /* background-color: #1a243b; */
}
.tab_title {
  display: inline-block;
  line-height: 40px;
  height: 40px;
}
.tab_title span {
  cursor: pointer;
}
.tab_title span:not(:last-child) {
  margin-right: 40px;
}
.containers{
  height: calc(100% - 60px);
  overflow-y: auto;
  overflow-x: hidden;
}
.list-title {
  line-height: 25px;
  /* border-bottom: 1px solid #303b4b; */
  /* height: 35px; */
}
.list-title li {
  width: 33.33%;
  text-align: center;
}
.no_data {
  padding: 50px 0;
}
.containers {
  /* height: 260px; */
  overflow: auto;
}
.list-item li {
  line-height: 26px;
  display: flex;
}
.list-item li span {
  display: inline-block;
  float: left;
  width: 33.3%;
  text-align: center;
}

.list-item li:hover {
  background-color: rgba(46,55,83,.4);
}
.list-item li span.green {
  color: #12b886;
}
.containers .green{
   color: #12b886;
}
.containers .list-item .red{
   color: #cc4951;
}
</style>





// WEBPACK FOOTER //
// src/view/complete.vue