<template>
  <div class="indexBlackes home-box" id="sw" style="margin-top:48px;">
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
    <!-- <div class="swiperImg">
      <img :src="swiperImgs[0].cover" />
    </div> -->
    <!-- 轮播 -->
    <div class="swiper-container banner_wrap swiper-container-horizontal">
        <div class="swiper-wrapper">
          <div class="swiper-slide sliders" v-for="(item,index) in swiperImgs">
              <a href="">
                <img :src="item.cover" />
              </a>
          </div>
        </div>
        <div class="swiper-pagination swiper-pagination02"></div>
    </div>

    <div class="box_m">
				<div class="box_cent">
					<!-- usdt列表 -->
					<div class="topusdt">
          <ul class="flex">
            <li v-for="(item,index) in quotation" v-if="item.is_display == 1&& index<6" :key="index" @click="goExchange">
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
					<!-- usdt列表 -->
					<!-- usdtDatalist -->
					<div class="usdtList">
						<a href="" class="usdtList_active">
							USDT市场
						</a>
					</div>
					
					
					<div class="coinbox ft12 rbom" style="background-color: white;margin-bottom: 30px;">
            <div class="flex classfity txtgray">
              <div :class="['flex alcenter',{'jscenter':index!=0}]" v-for="(item,index) in classtify" @click="sortData(index,item.key)">
                <span style="color:black;font-size: 14px;font-weight: 600;">{{item.text}}</span> 
                <p class="flex column between" v-if="item.key!=''">
                  <span :class="['up',{'sort':(index===sortindex)&&direction}]"></span>
                  <span :class="['down',{'sort':index===sortindex&&!direction}]"></span>
                </p>
              </div>
              <!-- <div></div> -->
            </div>
            <ul v-if="topnow==1">
              
              <li v-for="(market,index) in marketList" v-if="current==index" @click="goExchange">
                <div v-for="(item,idx) in market" class="flex coinlist alcenter curPer" v-if='item.is_display==1'>
                  <p class="flex alcenter">
                    <!-- <span class="iconfont ft14 gray icon-pingjiaxingxing" v-if="!item.added"  @click="addDelete('add',item.id)"></span>
                    <span class="iconfont ft14 blue icon-pingjiaxingxing" v-else  @click="addDelete('del',item.id)"></span> -->
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
                    <!-- <span style="font-size:12px;">≈ {{(item.now_price*item.rmb_relation).toFixed(4)}} CNY</span> -->
                  </p>
                  <p :class="['tl','change','green',{'red':item.change<0}]">
                    <span v-if="item.change>0">
                      {{item.change || '0.00' | toFixeds }}%
                    </span>
                    <span v-else>
                      {{item.change || '0.00' | toFixeds }}%
                    </span>
                  </p>
                  <p>{{item.volume}}</p>
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
          
					
					<!-- usdtDatalist -->
					<!-- 安全可信赖 -->
					<ul class="an_list" style="margin-bottom:30px;">
						<li>
							<span>
								<div class="an_listt">
									<img src="../../static/imgs/icon.png" >
								</div>
								<h4>安全可信赖</h4>
								<p>
									5 年数字资产金融服务经验</br> 专业分布式架构和防 DDOS 攻击系统
								</p>
							</span>
						</li>
						<li>
							<span>
								<div class="an_listt">
									<img src="../../static/imgs/icon2.png" >
								</div>
								<h4>安全可信赖</h4>
								<p>
									5 年数字资产金融服务经验</br> 专业分布式架构和防 DDOS 攻击系统
								</p>
							</span>
						</li>
						<li>
							<span>
								<div class="an_listt">
									<img src="../../static/imgs/icon3.png" >
								</div>
								<h4>安全可信赖</h4>
								<p>
									5 年数字资产金融服务经验</br> 专业分布式架构和防 DDOS 攻击系统
								</p>
							</span>
						</li>
					</ul>
					<!-- 安全可信赖 -->
				</div>
			</div>   
      <div class="footer">
				<div class="footer_m">
					<div class="footer_t">
						<div class="footer_ml">
							<div class="footer_ml_list">
								<h4>{{$t('foo.about')}}</h4>
                <a v-for="item in footFrist" @click="goDetail(item.id)" :key="item.id">{{item.title}}</a>
							</div>
							<div class="footer_ml_list">
								<h4>{{$t('foo.support')}}</h4>
                <a v-for="item in footSecond" @click="goDetail(item.id)" :key="item.id">{{item.title}}</a>
							</div>
							<div class="footer_ml_down">
								<h4>下载APP</h4>
								<a href="">
									<div>
										<img src="../assets/images/ios.png" >
										<p>IOS 下载</p>
									</div>
								</a>
								<a href="">
									<div>
										<img src="../assets/images/az.png" >
										<p>安卓下载</p>
									</div>
								</a>
							</div>
						</div>
<<<<<<< HEAD
=======
						<!-- <div class="footer_mr">
							<h4>02-25700271</h4>
							<h6>fabcoinservice@gmail.com</h6>
						</div> -->
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
					</div>
					<div class="footer_b">
						<div class="footer_bl">
							<span>
								<img src="../assets/images/logo2.png" >
							</span>
						</div>
						<div class="footer_br">
<<<<<<< HEAD
							©Copyright 2019 STAREX. All rights reserved.
=======
							©Copyright 2019 FABCOIN. All rights reserved.
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
						</div>
					</div>
				</div>
			</div>
  </div>
</template>


<script>
// import "@/assets/style/iconfont2.css";
// import "@/assets/style/iconfont.css";
// import "@/assets/style/index.css";
import Swiper from "swiper";
// import "swiper/dist/css/swiper.min.css";
import indexHeader from "@/view/indexHeader";
// var echarts = require("echarts");
export default {
  name: "homeContent",
  components: { indexHeader },
  data() {
    return {
      quotation: [],
      marketList: [],
      classtify: [
        { text: this.$t("market.symbol"), key: "at" },
        { text: this.$t("market.newprice"), key: "now_price" },
        { text: this.$t("market.change"), key: "change" },
        { text: this.$t("market.vol"), key: "" },
      ],
      nowCoin: "",
      banner_imgs: [
        { href: "", img: "../assets/images/bg2.png" },
        { href: "", img: "../assets/images/bg2.png" },
        { href: "", img: "../assets/images/bg2.png" },
      ],
      curSwiper: 0,
      curCoinTab: 0,
      current: 0,
      coinTabList: [{ title: "USDT行情" }, { title: "BTC行情" }],
      coinKlineList: [],
      coinKline: {},
      swiperList: [],
      coinList: [],
      coin_list: [],
      noticeList: [],
      swiperImgs: [],
      footFrist: [],
      footSecond: [],
      haccount: "",
      sortindex: "",
      topnow: 1,
      myAdd: [],
    };
  },
  created() {
    this.token = window.localStorage.getItem("token") || "";
    if (window.localStorage.getItem("current")) {
      this.current = window.localStorage.getItem("current");
    }
    this.getQuotation();
    this.getData();
    this.connect();
  },
  filters: {
    toFixeds: function (value) {
      value = Number(value);
      return value.toFixed(2);
    },
  },
  destroyed() {
    // window.removeEventListener('scroll', this.handleScroll)
  },
  mounted() {
    // window.addEventListener('scroll', this.handleScroll)
    this.getSwiper();
    this.getNews();
    this.aboutUs();
    this.help();
  },
  sockets: {
    connect: function () {
      console.log("连接成功");
    },
    customEmit: function (data) {
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)'
      );
    },
    STREAM_STATUS(data) {
      // 后端按主题名推送的消息数据
      console.log("Page：" + data);
    },
  },
  methods: {
    // handleScroll () {
    //   var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    //   var top = $('.feature_list').offset().top

    //   console.log(top+'/'+scrollTop)
    // },
    goExchange(){
      this.$router.push('/dealCenter');
    },
    linkDownload(url) {
      window.open(url, "_blank"); // 新窗口打开外链接
    },
    // 获取数据
    getData() {
      var that = this;
      this.$ajax
        .get("/api/currency/quotation_new", {})
        .then((res) => {
          var msg = res.data.message;

          msg.forEach((item, index) => {
            this.myAdd.forEach((ite, ind) => {
              // console.log(item)
              // console.log(ite)
              if (item.id == ite.legal_id) {
                item.quotation.find((c) => {
                  return c.currency_id == ite.currency_id;
                }).added = true;
              }
            });
          });
          that.quoList = msg;

          var arr = [];
          for (var i = 0; i < msg.length; i++) {
            arr[i] = msg[i].quotation;
          }
          var arrFrist = arr[0][0];
          that.marketList = arr;

          if (!window.localStorage.getItem("selectedName")) {
            that.selectedName = arrFrist.legal_name;
            window.localStorage.setItem("selectedName", that.selectedName); //储存默认localStorage的tradeData
          } else {
            that.selectedName = window.localStorage.getItem("selectedName");
          }
        })
        .catch(function (err) {
          if (err.response) {
            console.log(err.response);
          }
        });
    },
    // 数组排序
    sortData(index, key) {
      this.direction = index === this.sortindex ? !this.direction : false;
      this.sortindex = index;
      var k = key;
      var d = this.direction == true ? "up" : "down";
      this.marketList[this.current].sort(function (a, b) {
        if (k == "at") {
          if (d == "up") {
            return a.currency_name.charCodeAt() - b.currency_name.charCodeAt();
          } else {
            return b.currency_name.charCodeAt() - a.currency_name.charCodeAt();
          }
        } else {
          if (d == "up") {
            return a[k] - b[k];
          } else {
            return b[k] - a[k];
          }
        }
      });
    },
    register() {
      this.$router.push({
        name: "register",
        query: { haccount: this.haccount },
      });
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
    connect() {
      var that = this;
      that.$socket.emit("login", localStorage.getItem("user_id"));
      this.$options.sockets.daymarket = (msg) => {
        if (msg.type == "daymarket") {
          var cname = msg.symbol;
          var change = msg.change;
          var now_price = msg.now_price;
          var volume = msg.volume;
          $("div[data-name='" + cname + "']")
            .find(".now_price")
            .html((now_price - 0).toFixed(4));
          $("div[data-name='" + cname + "']")
            .find(".volume")
            .html((volume - 0).toFixed(4));
          $("div[data-name='" + cname + "']")
            .find(".now_cny")
            .html((now_price * 6.9641).toFixed(4) + " CNY");

          $("div[data-name='" + cname + "']")
            .find("button")
            .text(change + "%");
          if (change < 0) {
            $("li[data-name='" + cname + "']")
              .find("button")
              .addClass("downcolor");
          } else {
            $("li[data-name='" + cname + "']")
              .find("button")
              .removeClass("downcolor");
          }
        }

        if (that.selectedName && that.selectedName == msg.legal_name) {
          that.marketList.forEach(function (item, index) {
            var i = item.findIndex(function (ite, inde) {
              return (
                ite.currency_id == msg.currency_id &&
                ite.legal_id == msg.legal_id
              );
            });
            if (i != -1) {
              item[i].now_price = msg.now_price;
              item[i].change = msg.change;
              item[i].high = msg.high;
              item[i].low = msg.low;
            }
          });
        }
      };
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
      this.$ajax({
        url: "/api/currency/quotation_new",
        method: "get",
      }).then((res) => {
        if (res.data.type == "ok" && res.data.message.length != 0) {
          // this.nowCoin = this.quotation[0].name;
          var data = res.data.message;
          this.quotation = data.find((item) => item.name == "USDT").quotation;
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
      this.$ajax.post("/api/" + "quotation").then((res) => {
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
      this.$ajax.post("/api/news/list", { c_id: 4 }).then((res) => {
        if (res.data.type == "ok") {
          var list = res.data.message.list;
          that.noticeList = list;
        } else {
        }
      });
      // this.$ajax({
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
        query: { id: id },
      });
      // let routeUrl = this.$router.resolve({
      //   name: "noticeDetail",
      //   query: { id: id }
      // });
      // window.open(routeUrl .href, '_blank');
    },
    aboutUs() {
      var that = this;
      this.$ajax.post("/api/news/list", { c_id: 29 }).then((res) => {
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
    help() {
      var that = this;
      this.$ajax.post("/api/news/list", { c_id: 30 }).then((res) => {
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
    },
  },
};
</script>
<style lang='scss'>
.coinbox {
  padding: 0 20px;
  -webkit-box-shadow: 0 2px 4px rgba(28, 36, 44, 0.05);
  box-shadow: 0 2px 4px rgba(28, 36, 44, 0.05);
  .classfity {
    padding: 0 10px;
    height: 40px;
    line-height: 40px;
    color: #9ca9b5;
    > div {
      flex: 1;
      cursor: pointer;
      p {
        height: 25px;
        span {
          width: 0;
          height: 0;
          border-width: 5px;
          border-style: solid;
          margin-left: 10px;
        }
        .up {
          border-color: transparent transparent #9ca9b5 transparent;
        }
        .down {
          border-color: #9ca9b5 transparent transparent transparent;
        }
        .up.sort {
          border-color: transparent transparent #4e5b85 transparent;
        }
        .down.sort {
          border-color: #4e5b85 transparent transparent transparent;
        }
      }
    }
    > div:nth-child(1),
    div:nth-child(4) {
      width: 20%;
      flex: none;
    }
  }
  ul {
    li {
      div {
        height: 56px;
        font-size: 16px;
        line-height: 56px;
        border-bottom: 1px solid #e6ecf2;
        color: #1c242c;
        p {
          flex: 1;
        }
        > p:nth-child(1),
        p:nth-child(4) {
          width: 20%;
          flex: none;
        }
        .change span {
          width: 80px;
          display: block;
          height: 30px;
          line-height: 30px;
          text-align: center;
        }
        .green {
          span {
            color: #0da88b;
            background-color: rgba(13, 168, 139, 0.1);
          }
        }
        .red {
          span {
            color: #ef5656;
            background-color: rgba(239, 86, 86, 0.1);
          }
        }
      }
      div:hover {
        background: #f2f6fa;
      }
      .deal {
        padding: 5px 20px;
        font-size: 14px;
        color: #ef5656;
        border-radius: 5px;
        border: 1px solid #ef5656;
      }
    }
  }
}
.swiperImg {
  background: #0a151e;
}
.swiperImg img {
  width: 100%;
  height: 100%;
}
#sw {
  .topusdt {
    background-color: #0a151e;
    // background-color:#203f46;
    color: #9eb5ca;
    ul {
      width: 100%;
      li {
        width: 20%;
        padding: 14px 0;
        height: 120px;
        > div {
          border-right: 1px solid rgba(29, 50, 66, 0.7);
          padding: 0 40px;
        }
        .color47 {
          color: #477a90;
        }
        .ml5 {
          margin-left: 5px;
        }
        button {
          border: none;
          padding: 5px 20px;
          border-radius: 5px;
          height: 30px;
          background: #0d2f32;
          color: #0d8551;
        }
        .downcolor {
          color: #ef4034;
          background: #3b2128;
        }
      }
      li:last-child {
        > div {
          border-right-color: transparent;
        }
      }
      li:hover {
        background: #122331;
        > div {
          border-color: transparent;
        }
      }
    }
  }

  footer {
    width: 100%;
    // background: #111114;
    background: #000;
    padding: 50px 0 0 0;
    text-align: center;
    .content {
      width: 1200px;
      margin: 0 auto;
      justify-content: space-between;
      border-top: 1px solid #42f1eb;
      padding-top: 30px;
      dl {
        width: 33%;
        text-align: center;
        dt {
          width: 100%;
          font-size: 16px;
          color: #fff;
          margin-bottom: 10px;
          // text-align: left;
        }
        dd {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 14px;
          color: #a7b7c7;
          line-height: 24px;
          // text-align: left;
          cursor: pointer;
          padding-top: 10px;
          &:hover {
            color: #fff;
          }
        }
      }
    }
    p {
      border-top: 1px solid #303035;
      height: 70px;
      color: #727b92;
    }
  }
  .concat_ul {
    justify-content: flex-end;
    li {
      width: 32px;
      height: 32px;
      background: #303e63;
      border-radius: 50%;
      margin-right: 10px;
      img {
        width: 20px;
        height: 20px;
        margin-top: 6px;
      }
    }
    li:hover {
      background: #5697f4;
    }
    .wechat-box {
      position: relative;
      .weimg {
        width: 140px;
        height: 140px;
        position: absolute;
        top: -155px;
        left: -60px;
        border: 5px solid #fff;
        display: none;
      }
    }
    .wechat-box:hover .weimg {
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
      background: url("../assets/images/zg.jpg") right top/ 832px 432px
        no-repeat;
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
            &::before {
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
          &::before {
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
        // background: url("../assets/images/homehov.jpg") center center/ 100% 100%
        //   no-repeat;
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
          // background-image: url("../assets/images/hhov2.png") !important;
        }
        .notpic2 {
          // background-image: url("../assets/images/hhov4.png") !important;
        }
        .notpic3 {
          // background-image: url("../assets/images/hhov5.png") !important;
        }
        .notpic4 {
          // background-image: url("../assets/images/hhov8.png") !important;
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
        // background: url("../assets/images/hhov1.png") center center/ 100% 100%
        //   no-repeat;
      }
    }
    > div:nth-child(2) {
      > div:first-child {
        // background: url("../assets/images/hhov3.png") center center/ 100% 100%
        //   no-repeat;
      }
    }
    > div:nth-child(3) {
      > div:first-child {
        // background: url("../assets/images/hhov6.png") center center/ 100% 100%
        //   no-repeat;
      }
    }
    > div:nth-child(4) {
      > div:first-child {
        // background: url("../assets/images/hhov7.png") center center/ 100% 100%
        //   no-repeat;
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
  // .swiper-container {
  //   min-height: 300px;
  // }
  // div.swiper-container .swiper-pagination {
  //   // left: initial;
  //   // right: 10px !important;
  //   // top: 0;
  //   // height: 100%;
  //   // width: 10px;
  //   // display: flex;
  //   // flex-direction: column;
  //   // justify-content: center;
  // }
  // div.swiper-container .swiper-pagination > span {
  //   // display: block;
  //   background: #fff;
  //   border-radius: 0;
  //   width: 56px;
  //   height: 3px;
  //   // opacity: 0.5;
  //   // margin: 10px 0;
  // }
  // div.swiper-container .swiper-pagination-bullet-active {
  //   background: transparent;
  //   border: 2px solid #fff;
  // }
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
    img {
      display: block;
    }
    @media screen and (max-width: 1560px) {
      // height: 465px;
      // img{
      //   width: 100%;
      //   height: 465px;
      // }
    }
  }
  @media screen and (max-width: 1410px) {
    // .mt{margin-top:5px;}
  }
  .swiper-container-horizontal > .swiper-pagination-bullets {
    bottom: 25px;
  }
  .swiper-pagination-bullet {
    width: 56px !important;
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
    background-image: url(../../static/imgs/ppp0.svg);
  }
  .feature_wrap .feature_list li.feature_eco {
    // background-image: url(../../static/imgs/feature_eco.4f174e6.svg);
    background-image: url(../../static/imgs/ppp1.svg);
  }
  .feature_wrap .feature_list li.feature_user {
    // background-image: url(../../static/imgs/feature_user.7002f27.svg);
    background-image: url(../../static/imgs/ppp2.svg);
  }
  .feature_wrap h3 {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 10px;
    color: #fff;
  }
  .notice_box {
    width: 100%;
    height: 52px;
    border-top: 1px solid rgba(29, 50, 66, 0.7);
    margin-top: -1px;

    background: #0a151e;
    position: relative;
    > div {
      margin: 0 30px;
      font-size: 12px;
      line-height: 52px;
      height: 36px;
      overflow: hidden;
      word-break: keep-all;
      text-align: center;
      span {
        display: inline-block;
        position: relative;
        padding: 0 2em 0 1.5em;
        color: #54748f;
        cursor: pointer;
      }
      span:before {
        content: "/";
        position: absolute;
        left: -0.5em;
        color: #54748f;
      }
      span:nth-child(1):before {
        content: "";
      }
      span:hover {
        color: #357ce1;
      }
    }
  }
  .client_wrap {
    width: 100%;
    height: 710px;
    color: #9eb5ca;
    text-align: center;
    background: #171c2b;
    line-height: 2em;
    .wrap_in {
      height: 700px;
      padding-top: 100px;
      // background-color: #152940;
      background: url(../../static/imgs/blue.png) no-repeat;
      background-size: cover;

      h2 {
        margin-bottom: 24px;
        color: #fff;
        font-weight: 400;
        font-size: 28px;
      }
      .nextp {
        color: #9eb5ca;
      }
      ul {
        width: 810px;
        margin: 0 auto;
        text-align: left;
        justify-content: space-around;
        li {
          margin: 0 15px;
          color: #9eb5ca;
          padding: 40px 0;
          line-height: 48px;
          position: relative;
          cursor: pointer;
          p {
            height: 48px;
            width: 48px;
            margin: 0 10px 0 0;
            vertical-align: top;
            border-radius: 50%;
            background: rgba(53, 124, 225, 0.1) none no-repeat 50%;
            background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgd2lkdGg9IjIwcHgiIGhlaWdodD0iMjVweCIgdmlld0JveD0iMCAwIDIwIDI1IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPg0KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggNTEuMyAoNTc1NDQpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPg0KICAgIDx0aXRsZT5TaGFwZTwvdGl0bGU+DQogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+DQogICAgPGRlZnM+PC9kZWZzPg0KICAgIDxnIGlkPSLpppbpobUiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPg0KICAgICAgICA8ZyBpZD0i5YaF5a65MTIwMC0iIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMjUuMDAwMDAwLCAtMTYzNy4wMDAwMDApIiBmaWxsPSIjMzU3Q0UxIj4NCiAgICAgICAgICAgIDxnIGlkPSJHcm91cC05MCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsIDE0MDkuMDAwMDAwKSI+DQogICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTYwLUNvcHkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE5Ni4wMDAwMDAsIDE5MC4wMDAwMDApIj4NCiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTUwIj4NCiAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cC00NCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTUuMDAwMDAwLCAyNy4wMDAwMDApIj4NCiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMjcuMDgzOTIwNiwxNC43MjU2MzcxIEMyOC40NDk0OTQsMTMuMDMzODc3NyAyOC4xMzQzNjE3LDExLjE4ODMyMiAyOC4wMjkzMTc2LDExLjAzNDUyNTcgQzI3Ljg3MTc1MTQsMTAuODgwNzI5NCAyNS44MjMzOTEzLDExLjE4ODMyMiAyNC40MDUyOTU4LDEzLjAzMzg3NzcgQzIzLjE0NDc2NjUsMTQuNzI1NjM3MSAyMy4xNDQ3NjY1LDE2LjU3MTE5MjggMjMuMzAyMzMyNywxNi43MjQ5ODkxIEMyMy40NTk4OTg4LDE2Ljg3ODc4NTQgMjUuNTA4MjU5LDE2LjcyNDk4OTEgMjcuMDgzOTIwNiwxNC43MjU2MzcxIFogTTMwLjQ0ODkzNDMsMjMuOTM1MDg2NiBDMzAuMjk2NzQ1OCwyMS40NzE3MDAxIDMyLjU3OTU3MzcsMTkuOTMyMDgzNSAzMy4wMzYxMzkzLDE5LjYyNDE2MDIgTDMzLjAzNjEzOTMsMTkuNDcwMTk4NiBDMzMuMDM2MTM5MywxOS40NzAxOTg2IDMxLjA1NzY4ODUsMTcuMDA2ODEyMSAyOC4xNjYxMDY0LDE3LjE2MDc3MzcgQzI2LjMzOTg0NDEsMTcuMzE0NzM1NCAyNS40MjY3MTI5LDE4LjIzODUwNTMgMjQuMjA5MjA0NywxOC4yMzg1MDUzIEMyMi42ODczMTk0LDE4LjIzODUwNTMgMjEuMzE3NjIyNywxNy4xNjA3NzM3IDE5LjY0MzU0ODksMTcuMTYwNzczNyBDMTguMjczODUyMiwxNy4xNjA3NzM3IDE0LjMxNjk1MDUsMTguMzkyNDY3IDE0LjAxMjU3MzQsMjMuNjI3MTYzMyBDMTMuNzU4OTI1OSwyOC44NjE4NTk2IDE3LjQxMTQ1MDUsMzMuNzM3MzEyIDE4Ljc4MTE0NzMsMzQuNjYxMDgyIEMyMC4xNTA4NDQsMzUuNTg0ODUxOSAyMS4wNjM5NzUyLDM1LjI3NjkyODYgMjIuNTg1ODYwNSwzNC41MDcxMjAzIEMyMy4zNDY4MDMxLDM0LjA0NTIzNTMgMjUuNzgxODE5NSwzMy44OTEyNzM3IDI3LjE1MTUxNjMsMzQuODE1MDQzNiBDMjguODI1NTkwMSwzNS40MzA4OTAzIDMxLjI2MDYwNjUsMzQuOTY5MDA1MyAzNCwyOC44MTA1MzkxIEMzMy42NDQ4OTM0LDI4Ljg2MTg1OTYgMzAuNjAxMTIyOSwyOC4wOTIwNTEzIDMwLjQ0ODkzNDMsMjMuOTM1MDg2NiBaIiBpZD0iU2hhcGUiPjwvcGF0aD4NCiAgICAgICAgICAgICAgICAgICAgICAgIDwvZz4NCiAgICAgICAgICAgICAgICAgICAgPC9nPg0KICAgICAgICAgICAgICAgIDwvZz4NCiAgICAgICAgICAgIDwvZz4NCiAgICAgICAgPC9nPg0KICAgIDwvZz4NCjwvc3ZnPg==);
          }
          .p1 {
            background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgd2lkdGg9IjIwcHgiIGhlaWdodD0iMjVweCIgdmlld0JveD0iMCAwIDIwIDI1IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPg0KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggNTEuMyAoNTc1NDQpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPg0KICAgIDx0aXRsZT5TaGFwZTwvdGl0bGU+DQogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+DQogICAgPGRlZnM+PC9kZWZzPg0KICAgIDxnIGlkPSLpppbpobUiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPg0KICAgICAgICA8ZyBpZD0i5YaF5a65MTIwMC0iIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00MzUuMDAwMDAwLCAtMTYzNS4wMDAwMDApIiBmaWxsPSIjMzU3Q0UxIj4NCiAgICAgICAgICAgIDxnIGlkPSJHcm91cC05MCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsIDE0MDkuMDAwMDAwKSI+DQogICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTYwLUNvcHkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE5Ni4wMDAwMDAsIDE5MC4wMDAwMDApIj4NCiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTUxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMTAuMDAwMDAwLCAwLjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTQ1IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNS4wMDAwMDAsIDI1LjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yNi44NjM1NDI0LDE2LjI5MDY5NTIgTDI2Ljg2MzU0MjQsMTUuMjM2MjUyMSBMMjUuODYxNTA2LDE1LjIzNjI1MjEgTDI1Ljg2MTUwNiwxNi4yOTA2OTUyIEwyNi44NjM1NDI0LDE2LjI5MDY5NTIgWiBNMjEuNzgwMDM5OSwxNi4yOTA2OTUyIEwyMS43ODAwMzk5LDE1LjIzNjI1MjEgTDIwLjc3ODAwMzQsMTUuMjM2MjUyMSBMMjAuNzc4MDAzNCwxNi4yOTA2OTUyIEwyMS43ODAwMzk5LDE2LjI5MDY5NTIgWiBNMjcuOTI2Njc3OCwxMy4yMjk1NjkzIEMyOS42MTMwMzE4LDE0LjQ0MzkwMDQgMzAuNDU2MjA4OCwxNi4wODk4MjcxIDMwLjQ1NjIwODgsMTguMTY3MzQ5MyBMMTguMjM2MjUyMSwxOC4xNjczNDkzIEMxOC4yMzYyNTIxLDE2LjA1Nzc4MTMgMTkuMDYzODE0OCwxNC40MTE4NTQ2IDIwLjcxODk0LDEzLjIyOTU2OTMgTDE5LjM4MTg3MzEsMTEuODg2NzE0IEMxOS4xMjcyOTA2LDExLjYzMTAyOTUgMTkuMTI3MjkwNiwxMS4zOTEzNjc4IDE5LjM4MTg3MzEsMTEuMTY3NzI5MSBDMTkuNjM2NDU1NSwxMC45NDQwOTAzIDE5Ljg3NTA4NDEsMTAuOTQ0MDkwMyAyMC4wOTc3NTg5LDExLjE2NzcyOTEgTDIxLjYyNTI1MzUsMTIuNzAxODM2NCBDMjIuNDUyODE2MSwxMi4yNTQ1NTg5IDIzLjM1OTgwODQsMTIuMDMwOTIwMSAyNC4zNDYyMzA1LDEyLjAzMDkyMDEgQzI1LjMwMDc0NDksMTIuMDMwOTIwMSAyNi4xOTE3ODM0LDEyLjI1NDU1ODkgMjcuMDE5MzQ2LDEyLjcwMTgzNjQgTDI4LjU0Njg0MDYsMTEuMTY3NzI5MSBDMjguODAxNDIzLDEwLjk0NDA5MDMgMjkuMDQwMDUxNiwxMC45NDQwOTAzIDI5LjI2MjcyNjQsMTEuMTY3NzI5MSBDMjkuNDg1NDAxMiwxMS4zOTEzNjc4IDI5LjQ4NTQwMTIsMTEuNjMxMDI5NSAyOS4yNjI3MjY0LDExLjg4NjcxNCBMMjcuOTI2Njc3OCwxMy4yMjk1NjkzIFogTTMyLjQ3MjUwMzEsMTkuNDcyNTA2NiBDMzIuODg1OTQ1LDE5LjQ3MjUwNjYgMzMuMjQ0MDU3NiwxOS42MjQyMTI3IDMzLjU0Njg0MSwxOS45Mjc2MjUxIEMzMy44NDk2MjQ0LDIwLjIzMTAzNzQgMzQuMDAwNjc2NiwyMC41OTA3MDAzIDMzLjk5OTk5NzcsMjEuMDA2NjEzOSBMMzMuOTk5OTk3NywyOC4xNDk0MTc0IEMzMy45OTk5OTc3LDI4LjU5NjY5NDkgMzMuODQ4OTQ1NSwyOC45NjQxOTg4IDMzLjU0Njg0MSwyOS4yNTE5MjkyIEMzMy4yNDQ3MzY1LDI5LjUzOTY1OTUgMzIuODg2NjIzOSwyOS42ODM1MjQ3IDMyLjQ3MjUwMzEsMjkuNjgzNTI0NyBDMzIuMDU4MzgyNCwyOS42ODM1MjQ3IDMxLjcwMDI2OTgsMjkuNTM5NjU5NSAzMS4zOTgxNjUzLDI5LjI1MTkyOTIgQzMxLjA5NjA2MDgsMjguOTY0MTk4OCAzMC45NDUwMDg1LDI4LjU5NjY5NDkgMzAuOTQ1MDA4NSwyOC4xNDk0MTc0IEwzMC45NDUwMDg1LDIxLjAwNjYxMzkgQzMwLjk0NTAwODUsMjAuNTkxMzgyMSAzMS4wOTYwNjA4LDIwLjIzMTcxOTIgMzEuMzk4MTY1MywxOS45Mjc2MjUxIEMzMS43MDAyNjk4LDE5LjYyMzUzMDkgMzIuMDU4MzgyNCwxOS40NzE4MjQ3IDMyLjQ3MjUwMzEsMTkuNDcyNTA2NiBaIE0xNS41Mjc0OTQ2LDE5LjQ3MjUwNjYgQzE1Ljk0MDkzNjUsMTkuNDcyNTA2NiAxNi4yOTkwNDkxLDE5LjYyNDIxMjcgMTYuNjAxODMyNSwxOS45Mjc2MjUxIEMxNi45MDQ2MTU4LDIwLjIzMTAzNzQgMTcuMDU1NjY4MSwyMC41OTA3MDAzIDE3LjA1NDk4OTIsMjEuMDA2NjEzOSBMMTcuMDU0OTg5MiwyOC4xNDk0MTc0IEMxNy4wNTQ5ODkyLDI4LjU5NjY5NDkgMTYuOTAzOTM2OSwyOC45NjQxOTg4IDE2LjYwMTgzMjUsMjkuMjUxOTI5MiBDMTYuMjk5NzI4LDI5LjUzOTY1OTUgMTUuOTQxNjE1MywyOS42ODM1MjQ3IDE1LjUyNzQ5NDYsMjkuNjgzNTI0NyBDMTUuMTEzMzczOCwyOS42ODM1MjQ3IDE0Ljc1NTI2MTIsMjkuNTM5NjU5NSAxNC40NTMxNTY3LDI5LjI1MTkyOTIgQzE0LjE1MTA1MjIsMjguOTY0MTk4OCAxNCwyOC41OTY2OTQ5IDE0LDI4LjE0OTQxNzQgTDE0LDIxLjAwNjYxMzkgQzE0LDIwLjU5MTM4MjEgMTQuMTUxMDUyMiwyMC4yMzE3MTkyIDE0LjQ1MzE1NjcsMTkuOTI3NjI1MSBDMTQuNzU1MjYxMiwxOS42MjM1MzA5IDE1LjExMzM3MzgsMTkuNDcxODI0NyAxNS41Mjc0OTQ2LDE5LjQ3MjUwNjYgWiBNMTguMjM2MjUyMSwyOS42ODM1MjI0IEwxOC4yMzYyNTIxLDE5LjQ3MjUwNDMgTDMwLjQ1NjIwODgsMTkuNDcyNTA0MyBMMzAuNDU2MjA4OCwyOS42ODM1MjI0IEMzMC40NTYyMDg4LDI5Ljk3MTI1MjggMzAuMzYwODI1MywzMC4yMTA5MTQ0IDMwLjE3MDA1ODIsMzAuNDAyNTA3NCBDMjkuOTc5MjkxMSwzMC41OTQxMDAzIDI5Ljc0MDY2MjUsMzAuNjg5ODk2OCAyOS40NTQxNzI0LDMwLjY4OTg5NjggTDI4LjQwNDI3NDQsMzAuNjg5ODk2OCBMMjguNDA0Mjc0NCwzNC4yODU4NDQzIEMyOC40MDQyNzQ0LDM0LjczMzEyMTggMjguMjUzMjIyMiwzNS4xMDA2MjU3IDI3Ljk1MTExNzcsMzUuMzg4MzU2MSBDMjcuNjQ5MDEzMiwzNS42NzYwODY0IDI3LjI5MDkwMDYsMzUuODE5OTUxNiAyNi44NzY3Nzk4LDM1LjgxOTk1MTYgQzI2LjQ2MjY1OTEsMzUuODE5OTUxNiAyNi4xMDQ1NDY1LDM1LjY3NjA4NjQgMjUuODAyNDQyLDM1LjM4ODM1NjEgQzI1LjUwMDMzNzUsMzUuMTAwNjI1NyAyNS4zNDkyODUyLDM0LjczMzEyMTggMjUuMzQ5Mjg1MiwzNC4yODU4NDQzIEwyNS4zNDkyODUyLDMwLjY4OTg5NjggTDIzLjM0NDE5NCwzMC42ODk4OTY4IEwyMy4zNDQxOTQsMzQuMjg1ODQ0MyBDMjMuMzQ0MTk0LDM0LjczMzEyMTggMjMuMTkzMTQxOCwzNS4xMDA2MjU3IDIyLjg5MTAzNzMsMzUuMzg4MzU2MSBDMjIuNTg4OTMyOCwzNS42NzYwODY0IDIyLjIzMDgyMDIsMzUuODE5OTUxNiAyMS44MTY2OTk0LDM1LjgxOTk1MTYgQzIxLjQwMjU3ODcsMzUuODE5OTUxNiAyMS4wNDQ0NjYxLDM1LjY3NjA4NjQgMjAuNzQyMzYxNiwzNS4zODgzNTYxIEMyMC40NDAyNTcxLDM1LjEwMDYyNTcgMjAuMjg5MjA0OCwzNC43MzMxMjE4IDIwLjI4OTIwNDgsMzQuMjg1ODQ0MyBMMjAuMjg5MjA0OCwzMC42ODk4OTY4IEwxOS4yMzkzMDY5LDMwLjY4OTg5NjggQzE4Ljk1MjgxNjgsMzAuNjg5ODk2OCAxOC43MTQxODgyLDMwLjU5NDEwMDMgMTguNTIzNDIxMSwzMC40MDI1MDc0IEMxOC4zMzI2NTQsMzAuMjEwOTE0NCAxOC4yMzcyNzA0LDI5Ljk3MTI1MjggMTguMjM3MjcwNCwyOS42ODM1MjI0IEwxOC4yMzYyNTIxLDI5LjY4MzUyMjQgWiIgaWQ9IlNoYXBlIj48L3BhdGg+DQogICAgICAgICAgICAgICAgICAgICAgICA8L2c+DQogICAgICAgICAgICAgICAgICAgIDwvZz4NCiAgICAgICAgICAgICAgICA8L2c+DQogICAgICAgICAgICA8L2c+DQogICAgICAgIDwvZz4NCiAgICA8L2c+DQo8L3N2Zz4=);
          }
          .p2 {
            background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgd2lkdGg9IjIwcHgiIGhlaWdodD0iMjBweCIgdmlld0JveD0iMCAwIDIwIDIwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPg0KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggNTEuMyAoNTc1NDQpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPg0KICAgIDx0aXRsZT5TaGFwZTwvdGl0bGU+DQogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+DQogICAgPGRlZnM+PC9kZWZzPg0KICAgIDxnIGlkPSLpppbpobUiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPg0KICAgICAgICA8ZyBpZD0i5YaF5a65MTIwMC0iIHRyYW5zZm9ybT0idHJhbnNsYXRlKC02NDQuMDAwMDAwLCAtMTYzOS4wMDAwMDApIiBmaWxsPSIjMzU3Q0UxIj4NCiAgICAgICAgICAgIDxnIGlkPSJHcm91cC05MCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsIDE0MDkuMDAwMDAwKSI+DQogICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTYwLUNvcHkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE5Ni4wMDAwMDAsIDE5MC4wMDAwMDApIj4NCiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTUzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0MjAuMDAwMDAwLCAwLjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTQ2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNS4wMDAwMDAsIDI2LjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yMS4zMDMzOTMyLDI0LjYxODc2MjUgTDIxLjMwMzM5MzIsMzIuNDAzMTkzNiBMMTMsMzEuMjc5MTc0NCBMMTMsMjQuNjE4NzYyNSBMMjEuMzAzMzkzMiwyNC42MTg3NjI1IFogTTIxLjMwMzM5MzIsMTUuNTE2OTY2MSBMMjEuMzAzMzkzMiwyMy4zMDEzOTcyIEwxMywyMy4zMDEzOTcyIEwxMywxNi42MjczNDAyIEwyMS4zMDMzOTMyLDE1LjUxNjk2NjEgWiBNMzMsMjQuNjE4NzYyNSBMMzMsMzMuOTYwMDc5OCBMMjIuMTAxNzk2NCwzMi40NzQ1MDE0IEwyMi4xMDE3OTY0LDI0LjYxODc2MjUgTDMzLDI0LjYxODc2MjUgWiBNMzMsMTQgTDMzLDIzLjM0MTMxNzQgTDIyLjEwMTc5NjQsMjMuMzQxMzE3NCBMMjIuMTAxNzk2NCwxNS40NzA2MTA0IEwzMywxNCBaIiBpZD0iU2hhcGUiPjwvcGF0aD4NCiAgICAgICAgICAgICAgICAgICAgICAgIDwvZz4NCiAgICAgICAgICAgICAgICAgICAgPC9nPg0KICAgICAgICAgICAgICAgIDwvZz4NCiAgICAgICAgICAgIDwvZz4NCiAgICAgICAgPC9nPg0KICAgIDwvZz4NCjwvc3ZnPg==);
          }

          .codebox {
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
            img {
              width: 100px;
              height: 100px;
              margin: 0 auto;
              display: block;
              margin-top: 10px;
            }
          }
        }
        li:hover .codebox {
          display: block;
        }
      }
      .mon_mind {
        width: 518px;
        position: relative;
        margin: 0 auto;
        > div {
          width: 100%;
          .pcimg {
            width: 518px;
            margin: 0 auto;
          }
        }
        .mobimg {
          width: 122px;
          position: absolute;
          right: -60px;
          bottom: -20px;
          width: 122px;
          height: 253px;
          background: #0a151e none no-repeat 50% / cover;
          -webkit-box-shadow: -9px 12px 62px 0 rgba(36, 52, 69, 0.3);
          box-shadow: -9px 12px 62px 0 rgba(36, 52, 69, 0.3);
          border-radius: 16.47px;
        }
      }
    }
  }
  .register_wrap {
    height: 240px;
    width: 100%;
    // border-top: 1px solid #cad7e0;
    background: #000;
    h2 {
      color: #fff;
      font-size: 22px;
      line-height: 24px;
    }
    .rebox {
      margin: 32px auto 0 auto;
    }
    .input-register {
      width: 400px;
      height: 40px;
      font-size: 12px;
      color: #000;
      border: 1px solid #bdced9;
      border-radius: 2px;
      padding-left: 16px;
    }
    button {
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
    button:hover {
      opacity: 0.8;
    }
  }
}
</style>