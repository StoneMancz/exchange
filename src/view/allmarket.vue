<template>
  <div class='allmarket'>
    <!-- 轮播 -->
    <div class="swiper-container banner_wrap swiper-container-horizontal">
        <div class="swiper-wrapper">
          <div class="swiper-slide sliders" v-for="(item,index) in swiperImgs">
              <img :src="item.cover"/>
          </div>
        </div>
        <!-- <div class="swiper-pagination swiper-pagination02"></div> -->
    </div>

    <div class='container_nav'>
      <p class='tc white ft16'>{{$t('header.markets')}}</p>
    </div>
    <div class="innerbox">
      <div class="inner_box">
        <div class="nav_top_top flex ft14">
          <p v-for="(item,index) in typeList" :key="index" v-if="index==1" :class="['pointer',{'select':topnow==index}]" @click="changeType(index)">
            <i class="iconfont icon-pingjiaxingxing" style="color:#596a7a" v-if="index==0"></i>
            {{item.type}}
          </p>
        </div>
        <div class="nav_top flex" v-show="topnow==1">
          <p v-for="(item,index) in quoList" :class="['pointer',{'select':current==index}]" @click="changeLegal(index,item.name)">{{item.name}}</p>
          
        </div>
        <div class="coinbox ft12 rbom">
          <div class="flex classfity txtgray">
            <div :class="['flex alcenter',{'jscenter':index!=0}]" v-for="(item,index) in classtify" @click="sortData(index,item.key)">
              <span>{{item.text}}</span> 
              <p class="flex column between" v-if="item.key!=''">
                <span :class="['up',{'sort':(index===sortindex)&&direction}]"></span>
                <span :class="['down',{'sort':index===sortindex&&!direction}]"></span>
              </p>
            </div>
            <!-- <div></div> -->
          </div>
          <ul v-if="topnow==1">
            <li v-for="(market,index) in marketList" v-if="current==index">
              <div v-for="(item,idx) in market" class="flex coinlist alcenter curPer" v-if='item.is_display==1'>
                <p class="flex alcenter">
                  <img src="../assets/images/bitcoin.png" style="width: 25px;" v-if="item.currency_name=='BTC'">
                    <img src="../assets/images/ethereum.png" style="width: 25px;" v-if="item.currency_name=='ETH'">
                    <img src="../assets/images/bitcoin-cash.png" style="width: 25px;" v-if="item.currency_name=='BCH'">
                     <img src="../assets/images/ripple.png" style="width: 25px;" v-if="item.currency_name=='XRP'">
                     <img src="../assets/images/eos.png" style="width: 25px;" v-if="item.currency_name=='EOS'">
                     <img src="../assets/images/ethereum-classic.png" style="width: 25px;" v-if="item.currency_name=='ETC'">
                     <img src="../assets/images/qtum.png" style="width: 25px;" v-if="item.currency_name=='QTUM'">
                     <img src="../assets/images/litecoin.png" style="width: 25px;" v-if="item.currency_name=='LTC'">
                      <img src="../assets/images/iota.png" style="width: 25px;" v-if="item.currency_name=='IOTA'">
                      <img src="../assets/images/neo_72.png" style="width: 25px;" v-if="item.currency_name=='NEO'">
                     <img src="../assets/images/NAS.png" style="width: 25px;" v-if="item.currency_name=='NAS'">
                      <img src="../assets/images/ELA.png" style="width: 25px;" v-if="item.currency_name=='ELA'">
                      <img src="../assets/images/status.png" style="width: 25px;" v-if="item.currency_name=='SNT'">
                     <img src="../assets/images/WICC.png" style="width: 25px;" v-if="item.currency_name=='WICC'">
                      <img src="" style="width: 25px;" v-if="item.currency_name=='GGG'">
                  <span class="ml5">{{item.currency_name}}</span>
                </p>
                <p>
                  <span>{{item.now_price}}</span>
                  <span style="font-size:12px;">≈ {{(item.now_price*item.rmb_relation).toFixed(4)}} CNY</span>
                </p>
                <p :class="['tl','change','green',{'red':item.change<0}]">
                  <span v-if="item.change>0">
                    +{{item.change || '0.00' | toFixeds }}%
                  </span>
                  <span v-else>
                    {{item.change || '0.00' | toFixeds }}%
                  </span>
                </p>
                <p>{{item.high || 0.00}}</p>
                <p>{{item.low || 0.00}}</p>
                <p>{{item.volume}}</p>
                <!-- <p><span class="deal" @click="godeal(idx,item.currency_name,item.currency_id,item.legal_id,item.legal_name,item.change,item.lever_share_num,item.high,item.low,item.volume)">{{$t('jc.gotd')}}</span></p> -->
                <!-- <p>{{item.added}}</p> -->
              </div>
            </li>
          </ul>
          <ul v-else>
            <li v-for="(market,index) in marketList">
              <div v-for="(item,idx) in market" class="flex coinlist alcenter curPer" v-if='item.is_display==1 && item.added'>
                <p class="flex alcenter">
                  <!-- <span class="iconfont ft14 gray icon-pingjiaxingxing" v-if="!item.added"  @click="addDelete('add',item.id)"></span> -->
                  <span class="iconfont ft14 blue icon-pingjiaxingxing" @click="addDelete('del',item.id)"></span>
                  <span class="ml5">{{item.currency_name}}/{{item.legal_name}}</span>
                </p>
                <p>{{item.now_price}}</p>
                <p :class="['tl','change','green',{'red':item.change<0}]">
                  <span>{{item.change || '0.00' | toFixeds}}% </span>
                </p>
                <p>{{item.high || 0.00}}</p>
                <p>{{item.low || 0.00}}</p>
                <p>{{item.volume}}</p>
                <!-- <p>{{item.added}}</p> -->
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name:'allmarket',
  data () {
    return {
      token:'',
      current:0,
      topnow:1,
      sortindex:'',
      direction:true,
      swiperImgs: [],
      quoList:[],
      selectedName:'',
      typeList:[{type:this.$t('market.selfmarket')},{type:this.$t('market.allmarket')}],
      // typeList:[{type:this.$t('market.allmarket')}],
      classtify:[{text:this.$t('market.symbol'),key:'at'},{text:this.$t('market.newprice'),key:'now_price'},{text:this.$t('market.change'),key:'change'},{text:this.$t('market.highprice'),key:''},{text:this.$t('market.lowprice'),key:''},{text:this.$t('market.vol'),key:''}],
      marketList:[],
      myAdd:[],

    };
  },
  filters: {
    toFixeds: function(value) {
      value = Number(value);
      return value.toFixed(2);
    }
  },
  mounted(){
    this.getSwiper();
  },
  created(){
    this.token = window.localStorage.getItem('token') || '';
    if(window.localStorage.getItem('current')){
      this.current=window.localStorage.getItem('current');
    }
    if(this.token){
      this.topnow=1;
      this.getData();
      // this.getMyAdd();
    }else{
      this.topnow=1;
      this.getData();
    }
    this.connect();
  },
  beforeCreate () {
    document.querySelector('html').setAttribute('style', 'background-color:#fff;')
  },
  beforeDestroy () {
    document.querySelector('html').removeAttribute('style')
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
  methods:{
    // 类型切换
    changeType(index){
      this.topnow=index;
    },
    // 法币切换
    changeLegal(index,legalName){
      this.current=index;
      this.selectedName=legalName;
      window.localStorage.setItem('current',this.current);//储存当前法币的下标值(多币种要用到)
      window.localStorage.setItem("selectedName", this.selectedName);
      this.getData()
    },
    godeal(idx,currency_name,currency_id,legal_id,legal_name,change,shareNum,high,low,volume){
        let symbol = currency_name+"/"+legal_name
        window.localStorage.setItem("downUp", change);
        window.localStorage.setItem("legal_id_cur", currency_id);
        window.localStorage.setItem("shareNum", shareNum);
        window.localStorage.setItem('legal_id',legal_id);
        window.localStorage.setItem('currency_id',currency_id);
        window.localStorage.setItem('currency_name',currency_name);
        window.localStorage.setItem('legal_name',legal_name);
        window.localStorage.setItem('index1',this.current);
        window.localStorage.setItem('index2',idx);
        window.localStorage.setItem('symbol',symbol);
   
        window.localStorage.setItem("dealDownUp", change);
        window.localStorage.setItem('dealLegalId',legal_id);
        window.localStorage.setItem('dealCurrencyId',currency_id);
        window.localStorage.setItem('dealCurrencyName',currency_name);
        window.localStorage.setItem('dealLegalName',legal_name);
        window.localStorage.setItem('dealIndex1',this.current);
        window.localStorage.setItem('dealIndex2',idx);
        window.localStorage.setItem('dealSymbol',symbol);
        
        console.log(11)
        console.log(this.current,idx)
        this.$router.push({ path:'/dealCenter'})
    },
     getSwiper() {
      this.$ajax({
        url: "/api/news/list",
        method: "post",
        data: {
          c_id: 5,
        },
      })
        .then((res) => {
          if (res.data.type == "ok") {
            this.swiperImgs = res.data.message.list;
          }
        })
        .then(() => {
          var mySwiper02 = new Swiper(".banner_wrap", {
            // direction: 'vertical',
            loop: true,
            autoplay: 5000,
            // 如果需要分页器
            pagination: ".swiper-pagination02",
            paginationClickable: true,
            autoplayDisableOnInteraction: false,
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true, //修改swiper的父元素时，自动初始化swiper
          });
        });
    },
    // 获取数据
    getData(){
      var that = this;
      this.$ajax.get('/api/currency/quotation_new',{
      }).then(res=>{
        
        console.log(that.current)
        var msg = res.data.message;
        console.log(msg)
        console.log(this.myAdd)

        if(this.myAdd.length){
          // alert(1)
          msg.forEach((item,index) => {
            this.myAdd.forEach((ite,ind) => {
              // console.log(item)
              // console.log(ite)
              if(item.id == ite.legal_id){
                item.quotation.find((c) => {
                  return c.currency_id == ite.currency_id;
                }).added = true
              }
            })
          })
        }
        console.log(msg)
        that.quoList=msg;

        var arr = [];
        for(var i=0;i<msg.length;i++){
          arr[i] = msg[i].quotation
        };
        var arrFrist=arr[0][0];
        that.marketList = arr; 
        console.log(that.marketList)

        if (!window.localStorage.getItem("selectedName")) {
          that.selectedName=arrFrist.legal_name;
          window.localStorage.setItem("selectedName", that.selectedName);//储存默认localStorage的tradeData
        }else{
          that.selectedName=window.localStorage.getItem("selectedName");
        }
      })
      .catch(function(err){
          if(err.response) {
            console.log(err.response)
          }
      })
    },
    // socket时时通讯
    connect(){
      let that = this;
      that.$socket.emit("login",localStorage.getItem("user_id"));
      this.$options.sockets.daymarket=(msg)=>{
        //  console.log(msg)
        if (msg.type == "daymarket") {
          if (that.selectedName && that.selectedName == msg.legal_name){
            that.marketList.forEach(function(item,index){
              var i = item.findIndex(function(ite,inde){
                return ite.currency_id == msg.currency_id&&ite.legal_id == msg.legal_id;
              })
              if(i != -1){
                item[i].now_price = msg.now_price;
                item[i].change = msg.change;
                item[i].high = msg.high;
                item[i].low = msg.low;
              }
            })
          }
        }
      }
    },
    
    // 数组排序
    sortData(index,key){
      this.direction=index===this.sortindex?!this.direction:false;
      this.sortindex=index;
      var k = key;
      var d = this.direction==true?'up':'down';
      this.marketList[this.current].sort(function(a,b){
        if(k == 'at'){
          if(d == 'up'){
            return a.currency_name.charCodeAt() - b.currency_name.charCodeAt()
          } else {
            return b.currency_name.charCodeAt() - a.currency_name.charCodeAt()
          }
        } else {
          if(d == 'up'){
            return a[k] - b[k];
          } else {
            return b[k] - a[k];
          }
        }
      })
    },
    // 自选添加删除
    addDelete(url,id){
      if(this.token){
          this.$ajax({
          url:'/api/user_match/'+url,
          method:'post',
          data:{id:id},
          headers: { Authorization: this.token}
        }).then(res => {
          layer.msg(res.data.message);
          this.getMyAdd()
        })
      } else {
        layer.msg('请先登录')
      }
    },
    // 我的自选
    getMyAdd(){
      if(this.token){
        this.$ajax({
        url:'/api/user_match/list',
        headers: { Authorization: this.token}
      }).then(res => {
        if(res.data.type == 'ok'){
          var list = res.data.message.data;
          this.myAdd = list;
          this.getData();
        }
      })
      } else {
        if(this.$i18n.locale == 'zh'){
          layer.msg('请先登录') 
        } else {
          layer.msg('Please sign in')
        }
      }
    },
  }
}

</script>
<style lang='scss' scoped>
 .container_nav {
    height: 60px;
    padding-bottom: 20px;
    background-color: #1c242c;
    p{
      width: 130px;
      line-height: 40px;
    }
}
.innerbox{
  height: 100%;
  position: relative;
  margin: -20px 8px 0;
  padding-bottom: 40px;
  background:#fff;
  .inner_box{
    width: 100%;
    height: 100%;
    background-color: #fff;
    .nav_top_top{
      background-color: #f2f6fa;
      height: 40px;
      line-height: 40px;
      .select{
        color: #1c242c!important;
        border-color: #357ce1;
        background-color: #fff;
      }
      p{
        color: #596a7a;
        height: 40px;
        padding: 0 15px;
        line-height: 36px;
        text-align: center;
        border-top: 2px solid transparent;
      }
      p:hover{

      }
    }
    .nav_top {
      width: 100%;
      height: 60px;
      position: relative;
      overflow: hidden;
      padding:15px 10px;
      border-bottom: 1px solid #e6ecf2;
      p{
        margin:0 10px;
        height:30px;
        line-height:30px;
        color:#596a7a;
        padding:0 10px;
        border-radius:2px;
        font-size:14px;
        cursor:pointer;
      }
      .select{
        color: #fff;
        background-color: #357ce1;
      }
    }
  }
  .coinbox{
    padding:0 20px;
    -webkit-box-shadow: 0 2px 4px rgba(28,36,44,.05);
    box-shadow: 0 2px 4px rgba(28,36,44,.05);
    .classfity{
      padding: 0 10px;
      height:40px;
      line-height:40px;
      color:#9ca9b5;
      >div{
        flex: 1;
        cursor: pointer;
        p{
          height: 25px;
          span{
            width: 0;
            height: 0;
            border-width: 5px;
            border-style: solid;
            margin-left: 10px;
          }
          .up{
            border-color: transparent transparent #9ca9b5 transparent;
          }
          .down{
            border-color: #9ca9b5 transparent transparent transparent;
          }
          .up.sort{
            border-color: transparent transparent #4e5b85 transparent;
          }
          .down.sort{
            border-color: #4e5b85 transparent transparent transparent;
          }
        }
      }
      >div:nth-child(1),div:nth-child(4){
        width: 10%;
        flex: none;
      }
      
    }
    ul{
      li{
        div{
          height: 56px;
          font-size: 16px;
          line-height: 56px;
          border-bottom: 1px solid #e6ecf2;
          color: #1c242c;
          p{
            flex:1;
          }
          >p:nth-child(1),p:nth-child(4){
            width: 10%;
            flex: none;
          }
          .change span{
            width: 80px;
            display: block;
            height: 30px;
            line-height: 30px;
            text-align: center;
          }
          .green{
            span{
              color: #0da88b;
              background-color: rgba(13,168,139,.1);
            }
          }
          .red{
            span{
              color: #ef5656;
              background-color: rgba(239,86,86,.1);
            }
          }
        }
        div:hover{
          background: #f2f6fa;
        }
        .deal{
          padding: 5px 20px;
          font-size: 14px;
          color: #ef5656;
          border-radius: 5px;
          border: 1px solid #ef5656;
        }
      }
    }
  } 
} 
</style>



// WEBPACK FOOTER //
// src/view/allmarket.vue