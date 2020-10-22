<template>
  <div id="c2c-box" class="flex">
    <div class="c2c-l">
        <left></left>
    </div>
    <div class="c2c-r">
      <div class="title-top flex ft20">
        <p v-for="(item,index) in topType" :key="index" :class="{'active':index==current}" @click='changeType(index,item.type,item.title)'>{{item.title}}</p>
      </div>
      <div class="coin-select mt20 flex">
        <p v-for="(item,index) in coinList" :key="index" :class="{'select':index==select}" @click="getnew(index,item.id)">{{item.name}}</p>
      </div>
      
      <div class="listbox">
        <div class="flex flextitle">
          <span>{{$t('fat.shoper')}}</span>
          <span class="tc">{{$t('td.num')}}</span>
          <span class="tc">{{$t('td.price')}}</span>
          <span class="tc">{{$t('td.method')}}</span>
          <span class="tr">{{$t('td.do')}}</span>
        </div>
        <ul>
          <li v-for="(item,index) in list" :key="index" class="flex alcenter curPer">
            <div class="flex alcenter">
              <p class="head" :style="{background:item.bgcolor}">{{item.seller_name | circle}}</p>
              <p class="blue">{{item.seller_name}}</p>
            </div>
            <div class="flex center tc">
              <span class="sellerName">{{item.surplus_number || '0.00' |tofixed}}</span>
              <span class="currencyName ml5">{{item.currency_name}}</span>
            </div>
            <div class="tc light_green ft16">{{item.price || '0.00' |tofixed}} {{item.coin_code}}</div>
            <div class="tc">
              <img v-if="item.way == 'ali_pay'" src="../../assets/images/zfb_icon.png" />
              <img v-if="item.way == 'we_chat'" src="../../assets/images/wx_icon.png" />
              <img v-if="item.way == 'bank'" src="../../assets/images/bank_icon.png" />
            </div>
            <div class="tr">
              <button class="btn" @click="order(item.id)">{{classify}}</button>
            </div>
          </li>
          <div class="tc ft12 gray mt20 curPer" v-if="list.length>=10&&showmore" @click="getMore()">{{$t('td.more')}}</div>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import left from '@/view/c2c/leftc2c'
import Vue from 'vue'
	Vue.filter('circle', function (value) {
		return value.substring(0,1)
	})
export default {
    components:{left},
    data(){
      return{
        token:'',
        current:0,
        select:0,
        type:'sell',
        page:1,
        coinList:[],
        list:[],
        legal_id:'',
        classify:'购买',
        topType:[{'title':this.$t('td.buy'),"type":"sell"},{'title':this.$t('td.sell'),"type":"buy"}],
        bgcolor:['#5d8cc2','#6d78a8','#a2b240','#61b88e','#e35744', '#a16c92','#66756e'],
        showmore:true,
        password:''

      }
    },
    filters: {
    tofixed: function(val) {
      val = Number(val);
      return val.toFixed(2);
    },
    tofixedFour: function(val) {
      val = Number(val);
      return val.toFixed(4);
    }
  },
    created(){
        this.token = window.localStorage.getItem("token") || "";
        if (this.token == "") {
          this.$router.push("/components/login");
        }; 
        this.get_currency();
        
       
    },
    methods:{
      changeType(index,type,title){
        this.current=index;
        this.classify=title;
        this.type=type;
        this.list=[];
        this.page=1;
        this.getList();
      },
      getnew(index,id){
        this.select=index;
        this.legal_id=id;
        this.page = 1;
        this.list=[];
        this.getList();
      },
      // 获取币种列表
      get_currency() {
        this.$ajax({
          url: "/api/currency/list",
          method: "get",
          headers: { Authorization: this.token }
        }).then(res => {
          if (res.data.type == "ok") {
            this.coinList = res.data.message.legal;
            this.legal_id=res.data.message.legal[0].id;
            this.getList('sell');
          }
        });
      },
      // 获取买入列表
      getList() {
        let type = this.type;
        let page = this.page;
        let legal_id =this.legal_id;
        let i = layer.load();
        this.$ajax({
          url: "/api/c2c_deal_platform?type=" + type + "&page=" + page+"&currency_id="+legal_id,
          method: "get",
          headers: { Authorization: this.token }
        }).then(res => {
          layer.close(i);
          if (res.data.type == "ok") {
            let listdata = res.data.message.data;
            if (listdata.length != 0) {
              for(var j=0; j< listdata.length; j++) {
                listdata[j].bgcolor = this.bgcolor[(Math.floor(Math.random() * 6 + 1)-1)];
              }
              this.list = this.list.concat(listdata);
              this.page += 1;
            }
            if(listdata.length<10){
              this.showmore=false
            }
          }
        });
      },
      getMore(){
        this.getList();
      },
      // 下单
      order(id){
        var that = this;
        layer.prompt({title: that.$t('td.pwd'), formType: 1}, function(pass, index){
          that.password=pass;
          that.sureOrder(id);
          layer.close(index);
        });

        // layer.confirm(that.$t('ctc.suerePlace'), {
        //   btn: [that.$t('td.confirm'),that.$t('td.canceil')] 
        // }, function(){
        //   that.sureOrder(id);
        // }, function(){
        // });

      },
      // 下单请求
      sureOrder(id){
        var that = this;
        var i=layer.load();
        that.$ajax({
          url: "/api/c2c/do_legal_deal",
          method: "post",
          data:{id:id,password:that.password},
          headers: { Authorization: that.token }
        }).then(res => {
          layer.close(i);
          if (res.data.type == "ok") {
            layer.msg(res.data.message.msg);
            that.page=1;
            that.list=[];
            that.getList();
          }else{
            layer.msg(res.data.message)
          }
        });
      }
    },
}
</script>

<style lang='scss'>
.layui-layer{
  background:#171c2b;
}
.layui-layer-title {
  border-bottom: 1px solid #2e3753;
  color: #fff;
  background-color: #171c2b;
}
.layui-layer-prompt .layui-layer-input {
  border: 1px solid #555869;
  color: #fff;
  background: none;
}
.layui-layer-loading{
  background-color: transparent;
}
#c2c-box {
  margin: 10px 0 10px;
  color: #c7cce6;
  .ml5{margin-left: 5px}
  .c2c-r{
    .title-top {
      p{
        margin-right: 30px;
        padding: 5px 0;
        cursor: pointer;
      } 
    }
    .coin-select{
      p{
        margin-right: 20px;
        cursor: pointer;
      }
      .select{
        color: #7a98f7;
      }
    }
    .listbox{
      .flextitle{
        padding: 20px 0;
        border-bottom: 1px solid #242840;
        span{
          flex:1;
        }
      }
      li{
        padding: 10px 0;
        >div{
          flex: 1;
          // line-height: 36px;
        }
        .blue{
          color: #3b68bb;
          font-weight: bolder;
        }
        .light_green{
          color: #489972;
          font-weight: 600;
        }
        .head{
          width: 36px;
          height: 36px;
          line-height: 36px;
          border-radius: 50%;
          margin-right: 10px;
          background: #5D8CC2;
          color: #171c2b;
          text-align: center;
          font-size: 14px;
          color: #fff;
        }
        .btn{
          border-radius: 3px;
          color: white;
          background-color: #638BD4;
          cursor: pointer;
          min-height: 33px;
          min-width: 80px;
          font-size: 14px;
          font-weight: 600;
          border: none;
        }
      }
      li:nth-child(even){
        background: #242840;
      }
      li:last-child{
        border-bottom: 1px solid #242840;
      }
    }
    
  }












  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999;
    color: #333;
    background: rgba(0, 0, 0, 0.7);
    > .m-content {
      border-radius: 4px;
      background: #171c2b;
      color: #fff;
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 40px 20px 30px;
      // min-height: 400px;
      max-height: 550px;
      width: 400px;
      > .title {
        position: absolute;
        top: 0;
        left: 0;
        text-align: center;
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        text-align: center;
        font-weight: 600;
        > div:last-child {
          position: absolute;
          top: 0;
          right: 0;
          padding: 0 15px;
          cursor: pointer;
        }
      }
      > div:not(.title) {
        line-height: 32px;
        // border-top: 1px solid #eaecef;
      }
      div {
        span:first-child {
          margin-right: 5px;
          display: inline-block;
          width: 89px;
          color: #7a98f7;
        }
      }
    }
  }
  .more {
    color: #7a98f7;
    text-align: center;
    cursor: pointer;
  }

  font-size: 14px;
  > .c2c-l {
    margin: 0 10px;
    padding: 10px;
    background: #1a243b;
    width: 23%;
    li {
      // padding: 0 10px;
      padding: 0 20px;
      justify-content: space-between;
      cursor: pointer;

      line-height: 40px;

      .redColor {
        margin-left: 10px;
      }
      &:hover {
        background: rgb(38, 42, 66);
      }
    }
  }
  > .c2c-r {
    padding: 10px 30px;
    background: #1a243b;

    margin-right: 10px;
    width: 77%;
    > .top {
      // margin: 10px 30px 10px;
      > .top-title {
        font-size: 24px;
        line-height: 2;
        .link-span {
          cursor: pointer;
          &:hover {
            color: #7a98f7;
          }
        }
      }
      .top-price {
        > div {
          margin-right: 20px;
          // line-height: 1.8;
          > span:last-child {
            font-weight: 600;
            font-size: 16px;
          }
        }
      }
      .inp-items {
        > div:first-child {
          margin-right: 30px;
          border-right: 1px dashed #4e5b85;
          padding-right: 30px;
        }
        > .inp-item {
          flex: 1;
          > .inp-title {
            border-bottom: 1px solid #4e5b85;
            font-size: 16px;
            justify-content: space-between;
            line-height: 3;
          }
          > .how {
            line-height: 40px;
            cursor: pointer;
          }
          > .three-inp {
            > .inp-box {
              position: relative;
              height: 42px;
              line-height: 40px;
              padding-left: 112px;
              margin-bottom: 15px;
              > span {
                position: absolute;
                width: 112px;
                // text-align: center;
                top: 0;
                left: 0;
              }
              > div,
              > input {
                color: #c7cce6;
                display: block;
                width: 100%;
                line-height: 40px;
                padding: 0 20px;
                // background: #1e2235;
                border: 1px solid #4e5b85;
                background: none;
              }
              > div {
                color: #7a98f7;
              }
            }
          }
          .pay-opts {
            flex-wrap: wrap;
            > div:nth-child(n + 2) {
              margin-left: 15px;
            }
            > div {
              //   padding-right: 20px;
              line-height: 40px;
              > input {
                vertical-align: middle;
              }
            }
          }
          > .btn-in,
          .btn-out {
            margin-top: 20px;
            line-height: 42px;
            text-align: center;
            cursor: pointer;
            color: #fff;
            background: #4e5b85;
          }
        }
      }
    }
    > .bot {
      color: #6b80ae;
      // margin: 10px 30px;
      // background: #1a243b;
      > .bot-title {
        margin: 30px 0 0;
        // border-bottom: 1px solid #ccc;
        font-size: 16px;
        line-height: 40px;
        justify-content: space-between;
        align-items: center;
        > div:first-child {
          cursor: pointer;
          span {
            font-weight: 600;
            line-height: 40px;
            margin-right: 20px;
          }
          .active {
            color: #7a98f7;
            border: none;
          }
        }
        > .flex {
          height: 17px;
          line-height: 15px;
          cursor: pointer;
          > div {
            margin-right: 10px;
            border: 1px solid #ccc;
            transition: all 0.3s;
            width: 32px;
            border-radius: 7.5px;
            div {
              width: 15px;
              height: 15px;
              border-radius: 50%;
              background: #fff;
            }
          }
          .switch-on {
            padding-left: 0;
            background: #ccc;
          }
          .switch {
            transition: all 0.3s;
            background: #7a98f7;
            padding-left: 15px;
          }
        }
      }
      > .list-title {
        height: 40px;
        //   justify-content: space-between;
        line-height: 40px;
        font-weight: 600;
      }
      .list-title,
      ul li .content {
        width: 100%;
        color: #c7cce6;
        justify-content: space-between;
        // cursor: pointer;
        text-align: center;
        padding: 8px 5px;
        line-height: 24px;
        > div:first-child {
          width: 6%;
          height: 24px;
          text-align: left;
        }
        > div:nth-child(n + 2) {
          width: 12%;
        }
        > div:last-child {
          // min-width: 19%;
          width: 24%;
        }
        > .last {
          text-align: right;
          height: 24px;
          > div,
          > span {
            float: right;
            margin: 0 5px;
          }
          .btn-last {
            padding: 0 10px;
            min-width: 55px;
            max-width: 80px;
            color: #fff;

            //   margin-left: 70px;
            text-align: center !important;
            cursor: pointer;
          }
        }
      }
      ul li .trade-list {
        background: #171c2b;
        width: 100%;
        padding: 5px 30px 10px;
        margin: 0 auto;
        p {
          font-weight: 600;
          // font-size: 20px;
          // font-size: 16px;
          line-height: 36px;
          span {
            flex: 1;
            text-align: center;
          }
          span:first-child {
            text-align: left;
          }
          span:last-child {
            text-align: right;
          }
        }
        ul {
          li {
            padding: 12px 0;
            border-bottom: 1px solid #303956;
            > div {
              text-align: center;
              width: 25%;
            }
            > div:first-child {
              text-align: left;
            }
            > div:last-child {
              text-align: right;
              div {
                float: right;
                padding: 0 14px;
                margin: 0 6px;
                line-height: 1.6;
                cursor: pointer;
              }
            }
          }
        }
      }
      .ul-out li .content {
        > div:first-child {
          color: #25796a;
        }

        .btn-last {
          background: #25796a;
        }
      }
      .ul-in li .content {
        > div:first-child {
          color: #7a98f7;
        }

        .btn-last {
          background: #7a98f7;
        }
      }
    }
  }
}

.detailit,
.showtrade {
  // float: right;
  margin-right: 20px;
  padding: 0 10px;
  min-width: 55px;
  max-width: 80px;
  color: #fff;
  text-align: center !important;
  cursor: pointer;
  background: #7a98f7;
}
</style>





// WEBPACK FOOTER //
// src/view/c2c/c2cOrder.vue