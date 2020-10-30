<template>
    <div class="indexBlackes home-box" id="sw">
        <!-- <div class="swiper-container banner_wrap swiper-container-horizontal">
            <div class="swiper-wrapper">
              <div class="swiper-slide sliders" v-for="(item,index) in swiperImgs">
                  <a href="">
                    <img :src="item.cover" />
                  </a>
              </div>
            </div>
             <div class="swiper-pagination swiper-pagination02"></div>
        </div> -->
        <div class="swiperImg">
          <img :src="swiperImgs[0].cover">
        </div>
        <div class="topusdt">
          <ul class="flex">
            <li v-for="(item,index) in quotation" v-if="item.is_display == 1&& index<6" :key="index">
              <div class="ft14" :data-name='item.currency_name+"/"+item.legal_name'>
              <div class="flex between">
                 <div>
                  <p>{{item.currency_name}}/{{item.legal_name}}</p>
                  <p class="ft18 mt15 now_price mt">{{(item.now_price - 0).toFixed(4)}}</p>
                  <!-- <p class="mt5 color47 now_cny">≈{{(item.now_price*6.9641).toFixed(2)}} CNY</p> -->
                  <!-- <p class="mt15 mt"><span class="color47">{{$t('home.vol')}}</span> <span class="volume">{{(item.volume-0).toFixed(2)}}</span></p> -->
                </div>
                <button :class="[{'downcolor': item.change.substring(0,1) == '-'}]">{{Number(item.change).toFixed(2)|| '0.00'}}%</button>              
              </div>
              <p class="mt15 mt"><span class="color47">{{$t('home.vol')}}</span> <span class="volume">{{(item.volume-0).toFixed(2)}}</span></p>

               
              </div>
              
            </li>
          </ul>
        </div>
        <div class="notice_box">
          <div>
            <span v-for='(item,index) in noticeList' :key="index" @click="goDetail(item.id)">{{item.title}}</span>
          </div>

        </div>
        <div class="feature_wrap">
            <h2>{{$t('home.c01')}}</h2>
            <p>{{$t('home.c02')}}</p>
            <ul class="feature_list slide_ani a-fadeinB clearfix">
              <li class="feature_safe">
                <h3>{{$t('home.c03')}}</h3>
                <p>{{$t('home.c04')}}</p>
                <p>{{$t('home.c05')}}</p>
              </li>
              <li class="feature_eco">
                <h3>{{$t('home.c06')}}</h3>
                <p>{{$t('home.c07')}}</p>
                <p>{{$t('home.c08')}}</p>
              </li>
              <li class="feature_user">
                <h3>{{$t('home.c09')}}</h3>
                <p>{{$t('home.c10')}}</p>
                <p>{{$t('home.c11')}}</p>
              </li>
            </ul>
        </div>
        <div class="client_wrap">
          <div class="wrap_in tc">
            <h2 class="ft28">{{$t('home.c12')}}</h2>
            <p class="nextp">{{$t('home.c13')}}</p>
            <div class="flex" style="margin:70px 10% 0 10%">
              <ul class="">
                <li class="flex alcenter">
                  <p class="p0"></p>
                  <span>IPhone</span>
                  <div class="codebox tc ft12">
                    <img src="../assets/images/iphone.png" alt="">
                    <span>Iphone</span>
                  </div>
                </li>
                <li class="flex alcenter">
                  <p class="p1"></p>
                  <span>{{$t('home.android')}}</span>
                  <div class="codebox tc ft12">
                    <img src="../assets/images/android.png" alt="">
                    <span>{{$t('home.android')}}</span>
                  </div>
                </li>
                <!-- <li class="flex alcenter">
                  <p class="p2"></p>
                  <span>Windows</span>
                </li> -->
              </ul>
              <div class="mon_mind tc">
                <div>
                  <img src="../../static/imgs/pcimg.png" class="pcimg" alt="">
                </div>
                <img src="../../static/imgs/mobimg.png" class="mobimg" alt="">
              </div>
            </div>
          </div>
         
        </div>
        <div class="register_wrap tc flex column center">
          <h2>{{$t('home.atrade')}}</h2>
          <div class="flex alcenter mauto rebox">
            <input type="text" class="input-register" :placeholder="$t('home.pinput')" v-model="haccount">
            <button class="ft16" @click="register">{{$t('lg.register')}}</button>
          </div>
          
        </div>
        <footer>
          <div class="content flex">
            <dl>
              <dt>
                <img src="@/assets/images/logo.png" alt="" style="margin-top:10px; height:50px">
              </dt>
            </dl>
            <dl>
              <dt>{{$t('foo.about')}}</dt>
              <!-- <router-link to="/c2c" tag="dd">c2c交易</router-link>
              <router-link to="/leverdealCenter" tag="dd">合约交易</router-link> -->
              <dd v-for="item in footFrist" @click="goDetail(item.id)" :key="item.id">{{item.title}}</dd>
            </dl>
            <dl>
              <dt>{{$t('foo.support')}}</dt>
              <dd v-for="item in footSecond" @click="goDetail(item.id)" :key="item.id">{{item.title}}</dd>
              <!-- <router-link to="/components/login" tag="dd">登录</router-link>
              <router-link to="/components/register" tag="dd">注册</router-link>
              <router-link to="/forgetPwd" tag="dd">找回密码</router-link> -->
            </dl>
            <dl  class="tl">
              <dt>{{$t('foo.contact')}}</dt>
              <dd class="felx alcenter">
                <div class="flex alcenter center">
                  <img src="../assets/images/email.png" alt="">
<<<<<<< HEAD
                  <span class="ml5">2622010581@qq.com</span>
=======
                  <span class="ml5">fabcoinservice@gmail.com</span>
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
                </div>
                <!-- <ul class="concat_ul flex tc end">
                  <li class="wechat-box">
                    <img src="../assets/images/footer/wechat.png" alt="">
                    <img src="../assets/images/footer/weimg.jpg" alt="" class="weimg">
                  </li>
                  <li>
                    <img src="../assets/images/footer/facebook.png" alt="">
                  </li>
                  <li>
                    <img src="../assets/images/footer/twitter.png" alt="">
                  </li>
                  <li>
                    <img src="../assets/images/footer/youtube.png" alt="">
                  </li>
                </ul>
                <ul class="concat_ul flex tc mt10">
                  <li>
                    <img src="../assets/images/footer/telegram.png" alt="">
                  </li>
                  <li>
                    <img src="../assets/images/footer/medium.png" alt="">
                  </li>
                  <li>
                    <img src="../assets/images/footer/ins.png" alt="">
                  </li>
                  <li>
                    @click="linkDownload('https://teambthcoin@gmail.com')"
                    <img src="../assets/images/footer/email.png" alt="">
                  </li>
                </ul> -->

                
               </dd>

            </dl>
          </div>
          <p class="flex column center mt20 tc ft12">
<<<<<<< HEAD
            <span class="white ft20">STAREX</span>
            ©Copyright  2019 STAREX. All rights reserved.
=======
            <span class="white ft20">FABCOIN</span>
            ©Copyright  2019 FABCOIN. All rights reserved.
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
            </p>
        </footer>
    </div>
</template>


<script>
// import "@/assets/style/iconfont2.css";
// import "@/assets/style/iconfont.css";
import "@/assets/style/index.css";
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import indexHeader from "@/view/indexHeader";
// var echarts = require("echarts");
export default {
  name: "homeContent",
  components: { indexHeader },
  data() {
    return {
      quotation: [],
      nowCoin: "",
      //   banner_imgs:[
      //       {href:'',img:'../assets/images/bg2.png'},
      //       {href:'',img:'../assets/images/bg2.png'},
      //       {href:'',img:'../assets/images/bg2.png'}
      //   ],
      curSwiper: 0,
      curCoinTab: 0,
      coinTabList: [{ title: "USDT行情" }, { title: "BTC行情" }],
      coinKlineList: [],
      coinKline: {},
      swiperList: [],
      coinList: [],
      coin_list: [],
      noticeList: [],
      swiperImgs: [],
      footFrist:[],
      footSecond:[],
      haccount:''
    };
  },
  created() {
    // this.init(this.initKline);
    this.getQuotation();
  },
  destroyed () {
    // window.removeEventListener('scroll', this.handleScroll)
  },
  mounted() {
    // window.addEventListener('scroll', this.handleScroll)
    this.getSwiper();
    this.connect();
    this.getNews();
    this.aboutUs();
    this.help();
  },
  methods: {
    // handleScroll () {
    //   var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    //   var top = $('.feature_list').offset().top

    //   console.log(top+'/'+scrollTop)
    // },
    
    linkDownload (url) {
      window.open(url,'_blank') // 新窗口打开外链接
    },
    register(){
      this.$router.push({name:'register',query: { haccount: this.haccount}})
    },
    getSwiper() {
      this.$http({
        url: "/api/news/list",
        method: "post",
        data:{
          c_id:5
        }
      })
        .then(res => {
          
          console.log(res);
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
            observeParents: true //修改swiper的父元素时，自动初始化swiper
          });
        });
    },
    connect() {
      var that = this;
      that.$socket.emit("login", localStorage.getItem("user_id"));
      that.$socket.on("daymarket", msg => {
        if (msg.type == 'daymarket') {
          var cname = msg.symbol;
          var change = msg.change;
          var now_price = msg.now_price;
          var volume = msg.volume;
          $("div[data-name='" + cname + "']")
            .find(".now_price")
            .html((now_price -0).toFixed(4));
          $("div[data-name='" + cname + "']")
            .find(".volume")
            .html((volume-0).toFixed(4));
          $("div[data-name='" + cname + "']")
            .find(".now_cny")
            .html((now_price *6.9641).toFixed(4)+' CNY');
           
          $("div[data-name='" + cname + "']")
            .find("button")
            .text(change+'%');
          if(change<0){
             $("li[data-name='" + cname + "']")
            .find("button")
            .addClass('downcolor');
          }else{
            $("li[data-name='" + cname + "']")
            .find("button")
            .removeClass('downcolor')
          }
           
        }
      });
    },
    setPercent(a, b) {
      if (a - b == 0) {
        return "0%";
      } else if (a == 0) {
        return "-100%";
      } else if (b == 0) {
        return "+100%";
      } else {
        var p = ((a - b) / b / 100).toFixed(2);
        if (p > 0) {
          p = "+" + p + "%";
        } else {
          p = p + "%";
        }
        return p;
      }
    },
    getQuotation() {
      this.$http({
        url: "/api/currency/quotation_new",
        method: "get"
      }).then(res => {
        if (res.data.type == "ok" && res.data.message.length != 0) {
          // this.nowCoin = this.quotation[0].name;
          var data = res.data.message;
          this.quotation=data.find((item) => item.name == 'USDT').quotation;
        }
      });
    },
    getCurrent(index) {
      this.curCoinTab = index;
    },
    mouseEnter(index) {
      this.curSwiper = index;
    },
    init(callback) {
      this.$http.post("/api/" + "quotation").then(res => {
        if (res.data.type == "ok") {
          this.coinList = res.data.message.coin_list;
          this.swiperList = res.data.message.coin_list;
          callback && callback();
        } else {
          // layer.msg(res.message);
        }
      });
    },

    timestampToTime(timestamp) {
      var date = new Date(timestamp);
      let Y = date.getFullYear() + "/";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "/";
      let D = date.getDate() + " ";
      return Y + M + D;
    },
    // 公告
    getNews() {
      var that = this;
      this.$http.post("/api/news/list",{"c_id":4}).then(res => {
        if (res.data.type == "ok") {
          var list = res.data.message.list;
          that.noticeList = list;
        } else {
        }
      });
      // this.$http({
      //   url: "/api/news/list?c_id=5",
      //   type:'post'
      // }).then(res => {
      //   console.log(res);
      //   if (res.data.type == "ok") {
      //     var list = res.data.message.list;
      //     if (list.length > 2) {
      //       that.noticeList = list.slice(0, 2);
      //     } else {
      //       that.noticeList = list;
      //     }
      //   }
      // });
    },
    // 公告详情
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
    },
    aboutUs(){
      var that = this;
      this.$http.post("/api/news/list",{"c_id":29}).then(res => {
        if (res.data.type == "ok") {
             var list = res.data.message.list;
             if (list.length > 2) {
            that.footFrist = list;
          } else {
            that.footFrist = list;
          }
        } else {
          // layer.msg(res.message);
        }
      });
    },
    help(){
      var that = this;
      this.$http.post("/api/news/list",{"c_id":30}).then(res => {
        if (res.data.type == "ok") {
             var list = res.data.message.list;
             if (list.length > 2) {
            that.footSecond = list;
          } else {
            that.footSecond = list;
          }
        } else {
          // layer.msg(res.message);
        }
      });
    }
  }
};
</script>
<style lang='scss'>
.swiperImg{
  background: #0a151e;
}
.swiperImg img{
  width:100%;
  height: 100%;
}
#sw{
.topusdt{
  background-color: #0a151e;
  // background-color:#203f46;
  color: #9eb5ca;
  ul{
    width: 100%;
    li{
      width: 20%;
      padding: 14px 0;
      height:120px;
      >div{
        border-right: 1px solid rgba(29,50,66,.7);
        padding: 0 40px;
      }
      .color47{
        color: #477a90;
      }
      .ml5{
        margin-left: 5px;
      }
      button{
        border: none;
        padding: 5px 20px;
        border-radius: 5px;
        height: 30px;
        background: #0d2f32;
        color: #0d8551;
      }
      .downcolor{
        color: #ef4034;
        background: #3b2128;
      }
    }
    li:last-child{
      >div{
        border-right-color: transparent;
      }
    }
    li:hover{
      background: #122331;
      >div{
        border-color: transparent;
      }
    }
    
  }
}
footer{
  width: 100%;
  // background: #111114;
  background: #000;
  padding: 50px 0 0 0;
  text-align: center;
  .content{
    width: 1200px;
    margin: 0 auto;
    justify-content: space-between;
    border-top: 1px solid #42f1eb;
    padding-top: 30px;
    dl{
      width:33%;
      text-align: center;
      dt{
        width:100%;
        font-size: 16px;
        color: #fff;
        margin-bottom: 10px;
        // text-align: left;
      }
      dd{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        color: #a7b7c7;
        line-height: 24px;
        // text-align: left;
        cursor: pointer;
        padding-top: 10px;
        &:hover{
          color: #fff;
        }
      }
    }
  }
  p{
    border-top: 1px solid #303035;
    height: 70px;
    color: #727b92;
  }
}
.concat_ul{
  justify-content: flex-end;
  li{
    width: 32px;
    height: 32px;
    background: #303e63;
    border-radius: 50%;
    margin-right: 10px;
    img{
      width: 20px;
      height: 20px;
      margin-top: 6px;
    }
  }
  li:hover{
    background: #5697f4;
  }
  .wechat-box{
    position: relative;
    .weimg{
      width: 140px;
      height: 140px;
      position: absolute;
      top: -155px;
      left: -60px;
      border: 5px solid #fff;
      display: none;
    }
  }
  .wechat-box:hover .weimg{
      display: block;
  }
}
.md {
  width: 1500px;
  margin: 0 auto;
  > div:first-child {
    margin-top: 90px;
    text-align: center;
    font-size: 40px;
    color: #fff;
    > span:last-child {
      margin-left: 6px;
      color: #33fffb;
    }
    .btn {
      background: linear-gradient(90deg, #33fffb, #44c3d5);
      width: 268px;
      margin: 30px auto 0;
      text-align: center;
      line-height: 56px;
      border-radius: 30px;
      font-size: 18px;
      color: #fff;
    }
    img {
      display: block;
      margin: 0 auto;
      width: 1180px;
      height: 635px;
    }
  }
  > div:nth-child(2) {
    padding-top: 60px;
    background: url("../assets/images/zg.jpg")
      right top/ 832px 432px no-repeat;
    height: 500px;
    > div:first-child {
      font-size: 40px;
      font-weight: bold;
      color: #bec1da;
    }
    > div:nth-child(2) {
      margin-top: 20px;
      color: rgba(139, 137, 200, 0.5);
      line-height: 30px;
      width: 45%;
    }
  }
}
.news {
  margin-top: 100px;
  position: relative;
  > p {
    font-weight: 600;
    font-size: 20px;
    margin: 200px auto 100px;
    color: #fff;
    width: 1500px;
  }
  .line {
    position: absolute;
    width: 100%;
    height: 1px;
    background: rgba(255, 255, 255, 0.05);
    top: 105px;
    z-index: 9;
  }
  > .items {
    width: 1500px;

    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    > .item {
      transition: all 0.3s;
      height: 330px;
      cursor: pointer;
      color: hsla(0, 0%, 100%, 0.9);
      border-radius: 4px;
      width: 33%;
      > .date {
        font-size: 24px;
        padding-bottom: 60px;
        color: #bec1da;
      }
      > p {
        color: #8b89c8;
      }
      .content {
        position: relative;
        transition: all 0.3s;
        max-width: 485px;
        height: 206px;
        padding: 30px;
        border-radius: 6px;
        background-color: rgba(24, 24, 76, 1);
        background-size: 100% !important;
        &::before {
          content: "";
          position: absolute;
          left: 50px;
          top: -10px;
          width: 0;
          border-right: 10px solid transparent;
          border-left: 10px solid transparent;
          border-bottom: 10px solid #2b2b6d;
          opacity: 0;
          -webkit-transition: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          transition: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        img {
          position: absolute;
          border-radius: 6px;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: all 0.5s;
          // z-index: -1;
        }
        .title {
          font-size: 16px;
          color: #bec1da;
          padding-bottom: 30px;
        }
        p {
          font-size: 14px;
          color: #8b89c8;
        }
      }
      > .title {
        font-size: 16px;
        color: #bec1da;
        // font-weight:
      }
      &:hover {
        transition: all 0.5s;

        .content {
           &::before{
             opacity: 1;
           }
          > p,
          > div {
            transform: translateY(16px);
            transition: all 0.5s;
          }
          img {
            transition: all 0.5s;
            opacity: 1;
          }
          // background: rgba(24, 24, 76, 0) url("../assets/images/homehov.jpg");
          // background-size: 100%;
        }
      }
    }
    > .item:nth-child(3) {
      opacity: 1;

      .content {
        &::before{
          opacity: 1;
        }
        div,
        p {
          position: relative;
          z-index: 99;
        }
        img {
          opacity: 1;
        }
      }
    }
  }
}
.notice {
  width: 1500px;
  margin: 0 auto;
  justify-content: space-between;
  > div {
    border-radius: 3px;
    font-size: 12px;
    padding: 30px;
    width: 360px;
    height: 360px;
    color: rgba(139, 137, 200, 0.5);
    background: linear-gradient(to bottom right, #2b2b6d, #18184c);
    cursor: pointer;
    box-shadow: none;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);

    > div:nth-child(2) {
      transition: all 0.3s;
    }
    div:nth-child(3) {
      padding-top: 10px;
    }
    &:hover {
      background: url("../assets/images/homehov.jpg") center center/ 100% 100%
        no-repeat;
      box-shadow: 0 0.05rem 0.45rem rgba(0, 0, 0, 0.2);
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      color: #fff;
      > div:nth-child(2) {
        transform: translateY(-10px);
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      }
      > div:nth-child(3) {
        border-top: 1px solid rgba(139, 137, 200, 0.5);
      }
      .notpic1 {
        background-image: url("../assets/images/hhov2.png") !important;
      }
      .notpic2 {
        background-image: url("../assets/images/hhov4.png") !important;
      }
      .notpic3 {
        background-image: url("../assets/images/hhov5.png") !important;
      }
      .notpic4 {
        background-image: url("../assets/images/hhov8.png") !important;
      }
    }
    > div:first-child {
      width: 80px;
      height: 88.8px;
      margin: 30px auto 0;
      margin-bottom: 20px;
      text-align: center;
    }
    > div:nth-child(2) {
      font-size: 18px;
      margin: 30px 0 20px;
      color: #bec1da;
    }
    > div:last-child {
      line-height: 24px;
    }
  }
  > div:first-child {
    > div:first-child {
      background: url("../assets/images/hhov1.png") center center/ 100% 100%
        no-repeat;
    }
  }
  > div:nth-child(2) {
    > div:first-child {
      background: url("../assets/images/hhov3.png") center center/ 100% 100%
        no-repeat;
    }
  }
  > div:nth-child(3) {
    > div:first-child {
      background: url("../assets/images/hhov6.png") center center/ 100% 100%
        no-repeat;
    }
  }
  > div:nth-child(4) {
    > div:first-child {
      background: url("../assets/images/hhov7.png") center center/ 100% 100%
        no-repeat;
    }
  }
}
.mb {
  position: relative;
  // margin-top: 100px;
  height: 800px;
  padding-left: 800px;
  img {
    position: absolute;
    left: -497px;
    top: 0;
    width: 1770px;
  }
  > div {
    display: flex;
    position: relative;
    z-index: 99;
    height: 800px;
    justify-content: center;
    flex-direction: column;
    > div {
      padding: 100px 0 30px;
      font-size: 36px;
      color: #33fffb;
    }
    p {
      line-height: 30px;
      color: rgba(139, 137, 200, 0.5);
    }
  }
}
.home-box {
  // background: rgb(24, 24, 76);
}
.swiper-container {
  min-height: 300px;
}
div.swiper-container .swiper-pagination {
  // left: initial;
  // right: 10px !important;
  // top: 0;
  // height: 100%;
  // width: 10px;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
}
div.swiper-container .swiper-pagination > span {
  // display: block;
  background: #fff;
  border-radius: 0;
  width: 56px;
  height: 3px;
  // opacity: 0.5;
  // margin: 10px 0;
}
div.swiper-container .swiper-pagination-bullet-active {
  background: transparent;
  border: 2px solid #fff;
}
.up-clr {
  color: #12b886;
}
.down-clr {
  color: #cc4951;
}
/* 币种列表 */
.coins-list {
  margin: 10px auto;
  width: 1500px;
  line-height: 40px;
  text-align: center;
  // border: 1px solid #4e5b85;
  .coin-tab {
    height: 42px;
    color: #c7cce6;
    display: flex;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    > ul {
      display: flex;
      li {
        padding: 0 40px;
        font-size: 14px;
        // box-shadow: 0 0 1px hsla(231, 9%, 54%, 0.2);
        // border-bottom: 1px solid #4e5b85;
        // border-right: 1px solid #4e5b85;
      }
      .activeCoin {
        border-bottom: none;
      }
    }
  }
  .list-title {
    display: flex;
    > span {
      flex: 1;

      text-align: center;
      color: #8b89c8;
      font-size: 14px;
    }
  }
  .list-con {
    // background: rgb(32, 36, 55);
    max-height: 680px;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    li:nth-child(2n) {
      background: rgb(24, 24, 76);
    }
    li:nth-child(2n + 1) {
      background: rgb(34, 31, 97);
    }
    li {
      display: flex;
      // border-bottom: 1px solid #282e44;
      color: #c7cce6;
      &:hover {
        background: rgb(22, 22, 68);
      }
      > div {
        flex: 1;
      }
    }
  }
}
.carousel .swiper-slide:hover {
  background-color: #327add;
}
.nav_left,
.con_left {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.withdraw {
  margin: 0 4px;
}
.carousel .last a:hover {
  cursor: pointer;
}
.sliders {
  width: 100%;
  max-height: 540px;
  overflow: hidden;
  img{width: 100%;display: block;}
  @media screen and (max-width:1560px){
    // height: 465px;
    // img{
    //   width: 100%;
    //   height: 465px;
    // }
  }
}
@media screen and (max-width:1410px){
  // .mt{margin-top:5px;}
}
.swiper-container-horizontal>.swiper-pagination-bullets{
  bottom: 25px;
}
.swiper-pagination-bullet{
  width: 56px!important;
  height: 3px;
  border-radius: 0;
  background: #fff;
}

.notice_ul {
  margin: 0 40px;
  padding: 5px 0;
  // background: #171c2b;
  overflow: hidden;
  word-break: keep-all;
}
.notice_ul > li {
  // flex: 1;
  font-size: 12px;
  padding: 0 15px;
  text-align: center;
  color: #9eb5ca;
  word-break: keep-all;
  position: relative;
}
.notice_ul > li::after {
  content: "/";
  position: absolute;
  left: -0.5em;
  color: #9eb5ca;
}
.notice_ul > li:last-child:after {
  content: "";
  color: #6b80ae;
}
.notice_ul > li:hover {
  color: #6b80ae;
  cursor: pointer;
}
.feature_wrap {
  background-color: #0a151e;
  padding: 90px 0;
  text-align: center;
  color: #fff;
  line-height: 2em;
}
.feature_wrap h2 {
  font-size: 28px;
  margin-bottom: 10px;
  color: #fff;
}
.feature_wrap .feature_list {
  padding-top: 80px;
  width: 70%;
  margin: 0 auto;
}
.feature_wrap .feature_list li {
  float: left;
  width: 33%;
  background: transparent none no-repeat top;
  // padding-top: 140px;
  padding-top: 70px;
}
.feature_wrap .feature_list li.feature_safe {
  // background-image: url(../../static/imgs/feature_safe.8e76904.svg);
  background-image: url(../../static/imgs/ppp0.svg)
}
.feature_wrap .feature_list li.feature_eco {
  // background-image: url(../../static/imgs/feature_eco.4f174e6.svg);
  background-image: url(../../static/imgs/ppp1.svg)

}
.feature_wrap .feature_list li.feature_user {
  // background-image: url(../../static/imgs/feature_user.7002f27.svg);
  background-image: url(../../static/imgs/ppp2.svg)

}
.feature_wrap h3 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #fff;
}
.notice_box{
    width: 100%;
    height: 52px;
    border-top: 1px solid rgba(29,50,66,.7);
    margin-top: -1px;
    
  background: #0a151e;
    position: relative;
    >div{
      margin: 0 30px;
      font-size: 12px;
      line-height: 52px;
      height: 36px;
      overflow: hidden;
      word-break: keep-all;
      text-align: center;
      span{
        display: inline-block;
        position: relative;
        padding: 0 2em 0 1.5em;
        color: #54748f;
        cursor: pointer;
      }
      span:before {
        content: "/";
        position: absolute;
        left: -.5em;
        color: #54748f;
      }
      span:nth-child(1):before{
        content: "";
      }
      span:hover{
        color: #357ce1;
      }
    }
}
.client_wrap{
  width: 100%;
  height: 710px;
  color: #9eb5ca;
  text-align: center;
  background: #171c2b;
  line-height: 2em;
  .wrap_in{
    height:700px;
    padding-top: 100px;
    // background-color: #152940;
    background: url(../../static/imgs/blue.png) no-repeat;
    background-size: cover;

    h2{
      margin-bottom: 24px;
      color: #fff;
      font-weight: 400;
      font-size: 28px;
    }
    .nextp{color:#9eb5ca}
    ul{
      width: 810px;
      margin: 0 auto;
      text-align: left;
      justify-content: space-around;
      li{
        margin: 0 15px;
        color: #9eb5ca;
        padding: 40px 0;
        line-height: 48px;
        position: relative;
        cursor: pointer;
        p{
          height: 48px;
          width: 48px;
          margin: 0 10px 0 0;
          vertical-align: top;
          border-radius: 50%;
          background: rgba(53,124,225,.1) none no-repeat 50%;
          background-image: url(../assets/images/p0.svg)
        }
        .p1{
          background-image: url(../assets/images/p1.svg)
        }
        .p2{
          background-image: url(../assets/images/p2.svg)
        }

        .codebox{
          position: absolute;
          left: 15%;
          top: 100px;
          -webkit-transform: translate(-50%);
          -ms-transform: translate(-50%);
          transform: translate(-50%);
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          width: 120px;
          height: 130px;
          border: 1px solid #357ce1;
          border-radius: 2px;
          background: #fff none no-repeat 12px 12px/96px 96px;
          text-align: center;
          color: #357ce1;
          font-size: 12px;
          line-height: 18px;
          z-index: 6;
          display: none;
          img{
            width: 100px;
            height: 100px;
            margin: 0 auto;
            display:block;
            margin-top: 10px;
          }
        }
      }
      li:hover .codebox{
        display: block;
      }
    }
    .mon_mind{
      width: 518px;
      position: relative;
      margin: 0 auto;
      >div{
        width: 100%;
        .pcimg{
          width: 518px;
          margin: 0 auto;
        }
      }
      .mobimg{
        width: 122px;
        position: absolute;
        right: -60px;
        bottom: -20px;
        width: 122px;
        height: 253px;
        background: #0a151e none no-repeat 50%/cover;
        -webkit-box-shadow: -9px 12px 62px 0 rgba(36,52,69,.3);
        box-shadow: -9px 12px 62px 0 rgba(36,52,69,.3);
        border-radius: 16.47px;
      }
    }
  }
}
.register_wrap{
  height: 240px;
  width: 100%;
  // border-top: 1px solid #cad7e0;
  background: #000;
  h2{
    color: #fff;
    font-size: 22px;
    line-height: 24px;
  }
  .rebox{
    margin: 32px auto 0 auto;
  }
  .input-register{
    width: 400px;
    height: 40px;
    font-size: 12px;
    color: #000;
    border: 1px solid #bdced9;
    border-radius: 2px;
    padding-left: 16px;
  }
  button{
    margin-left: 8px;
    display: inline-block;
    height: 40px;
    padding: 0 44px;
    font-size: 16px;
    min-width: 120px;
    -webkit-appearance: none;
    background-color: #357ce1;
    color: #fff;
    border: none;
    outline: none;
    border-radius: 2px;
    cursor: pointer;
  }
  button:hover{
    opacity: .8;
  }
}
}
</style>





// WEBPACK FOOTER //
// src/view/homeContent.vue