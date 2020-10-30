<template>
<<<<<<< HEAD
  <div :class="['nav_bar', { nav_bars: homeindex }]" style="line-height: 48px">
    <div class="content clear">
      <div class="fl">
        <router-link to="/" exact style="border: none">
          <img
            src="@/assets/images/logo.png"
            class="navbar-logo"
            style="height: 32px; position: relative; border-radius: 2px"
          />
        </router-link>
      </div>
      <ul class="navbar-item fl mouseDefault ml20">
        <!-- <li  class="base" :class="{active:index==current}"  v-for="(tabs,index) in tabList" :key="index"  @click="goto(index,tabs.page)">{{tabs.title}}</li> -->
        <!-- <li  class="base" ><router-link to="/" exact>首页</li> -->
        <li class="base">
          <router-link to="/allmarket">{{ $t("header.markets") }}</router-link>
        </li>
        <!-- <li  class="base" ><router-link to="/c2c">{{$t('header.c2c')}}</router-link></li> -->
        <li class="base">
          <router-link to="/legalTrade">{{ $t("header.fiat") }}</router-link>
        </li>
        <li class="base">
          <router-link to="/dealCenter">{{
            $t("header.exchange")
          }}</router-link>
        </li>
        <li class="base">
          <router-link to="/leverdealCenter">{{
            $t("header.lever")
          }}</router-link>
        </li>
        <li class="base">
          <router-link to="/secondsOrder">{{ $t("header.micro") }}</router-link>
        </li>
        <!-- <li  class="base"><router-link to="/manage">{{$t('coin.manage')}}</router-link></li> -->
        <li class="base" v-if="isShow">
          <router-link to="/myLegalShops">{{
            $t("header.myshop")
          }}</router-link>
        </li>
        <li class="base" v-if="address.length > 0">
          <router-link to="/dealFinance">{{ $t("header.assets") }}</router-link>
        </li>
        <li class="base">
          <router-link to="/noticeList">{{
            $t("news.helpcenter")
          }}</router-link>
        </li>
=======
	<div :class="['nav_bar',{'nav_bars':homeindex}]" style="line-height: 48px;">
		<div class="content clear">
			<div class="fl">
        <router-link to="/" exact style="border:none">
          <img src="@/assets/images/logo.png" class="navbar-logo" style="height:32px;position:relative;border-radius:2px">
        </router-link>
      </div>
			<ul  class="navbar-item fl mouseDefault ml20">
				<!-- <li  class="base" :class="{active:index==current}"  v-for="(tabs,index) in tabList" :key="index"  @click="goto(index,tabs.page)">{{tabs.title}}</li> -->
				<!-- <li  class="base" ><router-link to="/" exact>首页</li> -->
        <li  class="base"><router-link to="/allmarket">{{$t('header.markets')}}</router-link></li>
				<!-- <li  class="base" ><router-link to="/c2c">{{$t('header.c2c')}}</router-link></li> -->
        <li  class="base"><router-link to="/legalTrade">{{$t('header.fiat')}}</router-link></li>
        <li  class="base"><router-link to="/dealCenter">{{$t('header.exchange')}}</router-link></li>
        <li  class="base"><router-link to="/leverdealCenter">{{$t('header.lever')}}</router-link></li>
         <li  class="base"><router-link to="/secondsOrder">{{$t('header.micro')}}</router-link></li>
        <!-- <li  class="base"><router-link to="/manage">{{$t('coin.manage')}}</router-link></li> -->
        <li  class="base" v-if="isShow"><router-link to="/myLegalShops">{{$t('header.myshop')}}</router-link></li>
        <li  class="base" v-if="address.length>0"><router-link to="/dealFinance">{{$t('header.assets')}}</router-link></li>
         <li  class="base"><router-link to="/noticeList">{{$t('news.helpcenter')}}</router-link></li>
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
        <!-- <li  class="base"><router-link to="/noticeList">{{$t('header.help')}}</router-link></li> -->
        <!-- <li class="base downapp" @click="showapp">APP下载
          <div class="appcode tl" v-show="appshow">
            <span></span>
            <div class="app-left">
              <p class="code"><img src="@/assets/images/qrcode.png" alt=""></p>
              <p class="texts">扫码下载</p>
            </div>
            <div class="app-right">
              <a href="http://www.bitex.ren/download/bitex.exe">
                <b><img src="../assets/images/windows.png" alt=""></b>
                <p class="texts"> <img src="../assets/images/down.png" alt=""> 点击下载</p>
              </a>
            </div>
            
          </div>
        </li> -->
<<<<<<< HEAD
      </ul>
      <div class="fr">
        <div class="account-box fl positionR curPer flex">
          <div>{{ account_number }}</div>
          <div class="msg_wrap">
            <div
              class="account_login fColorn fl positionR languagetxt"
              @mouseover="mine_over"
              @mouseout="mine_out"
              v-if="address.length > 0"
            >
=======
			</ul>
			<div class="fr">
				<div class="account-box fl positionR curPer flex">
          <div>{{account_number}}</div>
					<div class="msg_wrap">
            <div class="account_login fColorn fl positionR languagetxt" @mouseover="mine_over" @mouseout="mine_out"  v-if="address.length>0">
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
              <!-- <img class="icon_img" src="@/assets/images/account.png" alt=""> -->
              <i class="iconfont icon-zhanghao topColor hov ft16"></i>
              <!-- <span>{{account_number | hideFour}}</span> -->
              <!-- <img src="@/assets/images/arrow0.png" alt=""> -->
              <!-- <i class="iconfont icon-xiala ft12 topColor hov"></i> -->
<<<<<<< HEAD
              <div
                class="account-choose mine ft14"
                v-show="show3"
                @mouseover="mine_over"
                @mouseout="mine_out"
              >
                <p
                  class="curPer"
                  v-for="(item, index) in accountList"
                  :key="index"
                  @click="goto(null, item.page)">
                  <img :src="item.src1" alt="" />
                  <img :src="item.src2" alt="" />
                  <span>{{ item.title }}</span>
                </p>
                <p class="curPer" @click="loginOut">
                  <img src="@/assets/images/t0.png" alt="" />
                  <img src="@/assets/images/t1.png" alt="" />
                  <span>{{ $t("header.logout") }}</span>
                </p>
              </div>
            </div>

            <div class="fl login mr50" v-if="address.length <= 0">
              <router-link class="links" :to="{ name: 'login' }">
                <i class="iconfont icon-denglu-copy"></i>
                <span>{{ $t("header.login") }}</span>
              </router-link>
              <router-link :to="{ name: 'register' }" class="ml20 links">
                <i class="iconfont icon-zhuce"></i>
                <span>{{ $t("header.sign") }}</span>
              </router-link>
            </div>
          </div>
          <!-- <div class="asset-choose ft14 fColor1" v-if="show1" @mouseover="assets_over" @mouseout="assets_out">
=======
              <div class="account-choose mine ft14" v-show="show3"  @mouseover="mine_over" @mouseout="mine_out"  >
                <p class="curPer" v-for="(item,index) in accountList" :key="index" @click="goto(null,item.page)">
                  <img :src="item.src1" alt="">
                  <img :src="item.src2" alt="">
                  <span>{{item.title}}</span>
                </p>
                <p class="curPer" @click="loginOut">
                  <img src="@/assets/images/t0.png" alt="">
                  <img src="@/assets/images/t1.png" alt="">
                  <span>{{$t('header.logout')}}</span>
                </p>
              </div>
            </div>
           
            <div  class="fl login mr50" v-if="address.length<=0">
              <router-link class="links" :to="{ name: 'login'}">
                <i class="iconfont icon-denglu-copy"></i>
                <span>{{$t('header.login')}}</span>
              </router-link>
              <router-link :to="{ name: 'register'}"  class="ml20 links">
                <i class="iconfont icon-zhuce"></i>
                <span>{{$t('header.sign')}}</span>
              </router-link>
            </div>

					</div>
					<!-- <div class="asset-choose ft14 fColor1" v-if="show1" @mouseover="assets_over" @mouseout="assets_out">
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
						<p class="curPer" v-for="(item,index) in assetstList" :key="index" @click="gotoAccount(index,item.page)">
							<img :src="item.src1" alt="">
							<img :src="item.src2" alt="">
							<span>{{item.title}}</span>
						</p>
						
					</div> -->
<<<<<<< HEAD
          <div
            class="order-choose ft14 fColor1"
            v-if="show2"
            @mouseover="order_over"
            @mouseout="order_out"
          >
            <p
              class="curPer"
              v-for="(item, index) in orderList"
              :key="index"
              @click="goto(null, item.page)"
            >
              <img :src="item.src1" alt="" />
              <img :src="item.src2" alt="" />
              <span>{{ item.title }}</span>
            </p>
          </div>
          <div
            class="helfcenter positionR topColor ml10 mr20 ft14 languagetxt"
            @mouseover="newover"
            @mouseout="newout"
          >
=======
					<div class="order-choose ft14 fColor1" v-if="show2" @mouseover="order_over" @mouseout="order_out" >
						<p class="curPer" v-for="(item,index) in orderList" :key="index" @click="goto(null,item.page)">
							<img :src="item.src1" alt="">
							<img :src="item.src2" alt="">
							<span>{{item.title}}</span>
						</p>
					</div>
          <div class="helfcenter positionR topColor ml10 mr20 ft14 languagetxt"  @mouseover="newover" @mouseout="newout">
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
            <!-- <router-link to="/noticeList">
              <i class="iconfont icon-laba ft14 hov"></i>
            </router-link> -->
            <div class="noticeBox ft12" v-if="show5">
<<<<<<< HEAD
              <p
                v-for="(item, index) in noticeList"
                v-if="index < 5"
                @click="goDetail(item.id)"
                :key="item.id"
              >
                {{ item.title }}
              </p>
              <p class="tc all" v-if="noticeList.length > 0" @click="goAll()">
                查看全部
              </p>
            </div>
          </div>
          <div
            class="positionR ft12 languagetxt"
            @mouseover="lgover"
            @mouseout="lgout"
          >
            <i class="iconfont icon-yuyan topColor hov ft14"></i>
            <span class="topColor hov">{{ $t("language") }}</span>
=======
              <p v-for="(item,index) in noticeList" v-if="index<5" @click="goDetail(item.id)" :key="item.id">{{item.title}}</p>
              <p class="tc all" v-if="noticeList.length>0" @click="goAll();">查看全部</p>
            </div>
          </div>
          <div class="positionR ft12 languagetxt" @mouseover="lgover" @mouseout="lgout">
            <i class="iconfont icon-yuyan topColor hov ft14"></i>
            <span class="topColor hov">{{$t('language')}}</span>
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
            <i class="iconfont icon-xiala topColor hov ft12" v-if="!show4"></i>
            <i class="iconfont icon-shangla_icon topColor hov ft12" v-else></i>
            <div class="language fColorn" v-show="show4">
              <!-- v-if="show4" -->
              <p class="plr10 flex alcenter" @click="setLang('zh')">
<<<<<<< HEAD
                <img src="@/assets/images/cn.png" alt="" />
                <span>简体中文</span>
              </p>
              <p class="plr10 flex alcenter" @click="setLang('en')">
                <img src="@/assets/images/en.png" alt="" />
                <span>English</span>
              </p>
              <p class="plr10 flex alcenter" @click="setLang('hk')">
                <img src="@/assets/images/hk.png" alt="" />
                <span>繁體中文</span>
              </p>
              <p class="plr10 flex alcenter" @click="setLang('jp')">
                <img src="@/assets/images/jp.png" style="height: 24px" alt="" />
                <span>日本語</span>
              </p>
              <p class="plr10 flex alcenter" @click="setLang('kor')">
                <img
                  src="@/assets/images/kor.jpg"
                  style="height: 24px"
                  alt=""
                />
=======
                <img src="@/assets/images/cn.png" alt="">
                <span>简体中文</span>
              </p>
              <p class="plr10 flex alcenter" @click="setLang('en')">
                <img src="@/assets/images/en.png" alt="">
                <span>English</span>
              </p>
              <p class="plr10 flex alcenter" @click="setLang('hk')">
                <img src="@/assets/images/hk.png" alt="">
                <span>繁體中文</span>
              </p>
              <p class="plr10 flex alcenter" @click="setLang('jp')">
                <img src="@/assets/images/jp.png" style="height:24px" alt="">
                <span>日本語</span>
              </p>
              <p class="plr10 flex alcenter" @click="setLang('kor')">
                <img src="@/assets/images/kor.jpg" style="height:24px" alt="">
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
                <span>韩語</span>
              </p>
            </div>
          </div>

<<<<<<< HEAD
          <!-- <div class="flex white positionR alcenter languagetxt  ml20 ft12 "  @mouseover="lgover2" @mouseout="lgout2">
=======
           <!-- <div class="flex white positionR alcenter languagetxt  ml20 ft12 "  @mouseover="lgover2" @mouseout="lgout2">
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
             <span v-if="theme=='dark'">夜间模式</span>
              <img v-if="theme=='dark'" src="@/assets/images/night.png" alt=""  style="width:16px;height:16px;margin-left:5px;">
              <span v-if="theme=='white'">日间模式</span>
              <img v-if="theme=='white'" src="@/assets/images/day.png" alt=""  style="width:16px;height:16px;margin-left:5px;">

              <i class="iconfont icon-xiala topColor hov ft12" v-if="!show6"></i>
            <i class="iconfont icon-shangla_icon topColor hov ft12" v-else></i>
             <div class="language fColorn" v-show="show6">
                <p @click="themeChange('dark')" class="flex alcenter">
                  夜间模式
                  <img src="@/assets/images/night.png" alt="" style="width:16px;height:16px;margin-left:5px;">
                </p>
                <p @click="themeChange('white')" class="flex alcenter">
                  日间模式
                   <img src="@/assets/images/day.png" alt=""  style="width:16px;height:16px;margin-left:5px;">
                </p>
             </div>
            </div> -->
<<<<<<< HEAD
        </div>
      </div>
    </div>
  </div>
=======
				</div>
			</div>
		</div>
	</div>

>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
</template>
<script>
// import moduleName from '';
export default {
  name: "indexHeader",
  data() {
    return {
<<<<<<< HEAD
      appshow: false,
=======
      appshow:false,
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
      address: "",
      account_number: "",
      assets: "资产",
      orders: "订单",
<<<<<<< HEAD
      isShow: false,
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      show6: false,
      current: 0,
      type: "",
      extension_code: "",
      homeindex: true,
      tabList: [],
      noticeList: [],
=======
      isShow:false,
      show1: false,
      show2: false,
      show3: false,
      show4:false,
      show5:false,
      show6:false,
      current: 0,
      type:'',
      extension_code: "",
      homeindex:true,
      tabList: [],
      noticeList:[],
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
      accountList: [
        {
          src1: require("@/assets/images/z0.png"),
          src2: require("@/assets/images/z1.png"),
<<<<<<< HEAD
          title: this.$t("header.accountSet"),
          page: "accountSet",
        },
        // {
        //   src1: require("@/assets/images/icon_news.png"),
        // 	src2: require("@/assets/images/icon_news_s.png"),
=======
          title: this.$t('header.accountSet'),
          page: "accountSet"
        },
        // {
        //   src1: require("@/assets/images/icon_news.png"),
				// 	src2: require("@/assets/images/icon_news_s.png"),
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
        //   title: this.$t('header.tradeLog'),
        //   page: "transferLog"
        // },
        // {
        //   src1: require("@/assets/images/z0.png"),
        //   src2: require("@/assets/images/z1.png"),
        //   title: this.$t('header.receiveSet'),
        //   page:'userSetting',
        // },
        {
          src1: require("@/assets/images/icon_mine.png"),
          src2: require("@/assets/images/icon_mine_s.png"),
<<<<<<< HEAD
          title: this.$t("header.identify"),
          page: "authentication",
=======
          title: this.$t('header.identify'),
          page:'authentication',
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
        },
        //  {
        //   src1: require("@/assets/images/z0.png"),
        //   src2: require("@/assets/images/z1.png"),
        //   title:  this.$t('team.myteam'),
        //   page:'team',
        // },
        // {
        //   src1: require("@/assets/images/icon_ji.png"),
        //   src2: require("@/assets/images/icon_ji_s.png"),
        //   title: '历史盈亏',
        //   page:'profit',
        // },
        // {
        //   src1: require("@/assets/images/icon_delegate.png"),
        //   src2: require("@/assets/images/icon_delegate_s.png"),
        //   title: '我的会员',
        //   page:'tree',
        // },
        // {
        //   src1: require("@/assets/images/converbility.png"),
        //   src2: require("@/assets/images/convertibility-s.png"),
        //   title: this.$t('header.jchange'),
        //   page:'coinExchange',
        // },
      ],
<<<<<<< HEAD
      theme: "",
=======
      theme:'',
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
    };
  },
  watch: {
    $route(to, from) {
<<<<<<< HEAD
      if (this.$route.path !== "/") {
        this.homeindex = false;
      } else {
        this.homeindex = true;
      }
    },
  },

  filters: {
    hideFour: function (value) {
      value = value.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
      return value;
    },
  },
  created() {
    if (this.$route.path !== "/") {
      this.homeindex = false;
    } else {
      this.homeindex = true;
    }
    this.address = localStorage.getItem("token") || "";
    if (localStorage.getItem("locale")) {
      this.setLang(localStorage.getItem("locale"));
=======
      if(this.$route.path!=='/'){
        this.homeindex=false;
      }else{
        this.homeindex=true;
      }
    }
  },

  filters: {
    hideFour: function(value) {
      value = value.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
      return value;
    }
  },
  created() {
    if(this.$route.path!=='/'){
      this.homeindex=false;
    }else{
      this.homeindex=true;
    };
    this.address = localStorage.getItem("token") || "";    
    if(localStorage.getItem('locale')){
      this.setLang(localStorage.getItem('locale'));
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
    }
  },
  mounted() {
    // this.$http({
    //     url:'/api/' + 'lang/get',
    //     method:'post',
<<<<<<< HEAD
    //     data:{lang:'zh'},
    //   }).then(res => {
    //     // window.location.reload();
    //   })
    var that = this;
    that.theme = localStorage.getItem("theme");
    that.account_number = localStorage.getItem("accountNum") || "";
    that.extension_code = localStorage.getItem("extension_code") || "";
    that.is_seller = window.localStorage.getItem("is_seller") || "";
    that.type = window.localStorage.getItem("type") || "";
    that.getNotice();
    if (that.is_seller == 1) {
      that.isShow = true;
    }
    console.log(that.type);
=======
    //     data:{lang:'zh'}, 
    //   }).then(res => {
    //     // window.location.reload();
    //   }) 
    var that =this;
    that.theme=localStorage.getItem('theme');
    that.account_number = localStorage.getItem('accountNum') || '';
    that.extension_code = localStorage.getItem('extension_code') || '';
    that.is_seller = window.localStorage.getItem("is_seller") || "";
    that.type=window.localStorage.getItem("type") || "";
    that.getNotice();
    if(that.is_seller == 1){
      that.isShow = true;
    }
console.log(that.type)
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
    // if(that.type&&that.type =='0'){
    //      console.log(this.type)
    //   that.accountList.splice(4,1);
    // }
<<<<<<< HEAD
    eventBus.$on("seller", (msg) => {
      if (msg) {
        that.is_seller = window.localStorage.getItem("is_seller") || "";
        if (that.is_seller == 1) {
          that.isShow = true;
        }
=======
    eventBus.$on("seller", msg => {
      if(msg){
          that.is_seller = window.localStorage.getItem("is_seller") || "";
          if(that.is_seller == 1){
            that.isShow = true;
          }
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
      }
    });
    // eventBus.$on("type", msg => {
    //   if(msg){
<<<<<<< HEAD

=======
           
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
    //       if(msg !=1){
    //         console.log(msg)
    //         that.accountList.splice(4,1);
    //       }
    //   }
    // });
<<<<<<< HEAD
    that.bus.$on("nav_name", (name) => {
      that.current = that.tabList.findIndex(
        (val) =>
=======
    that.bus.$on("nav_name", name => {
      that.current = that.tabList.findIndex(
        val =>
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
          val.page === name || (val.children && val.children.includes(name))
      );
      // console.log(this.current);
    });
  },
  methods: {
<<<<<<< HEAD
    themeChange(type) {
      this.$utils.theme(type, true);
      this.theme = type;
      this.$store.commit("changeTheme", type);
    },
    getNotice() {
      this.$ajax({
        url: "/api/" + "news/list",
        method: "post",
        data: { c_id: "11" },
      }).then((res) => {
        this.noticeList = res.data.message.list;
      });
    },
    goAll() {
=======
    themeChange(type){
      this.$utils.theme(type,true);
      this.theme=type;
      this.$store.commit('changeTheme',type);
    },
    getNotice(){
      this.$ajax({
        url:'/api/' + 'news/list',
        method:'post',
        data:{c_id:'11'}, 
      }).then(res => {
        this.noticeList=res.data.message.list
      })
    },
    goAll(){
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
      this.$router.push({
        name: "noticeList",
      });
    },
    goDetail(id) {
      var id = id;
      this.$router.push({
        name: "noticeDetail",
<<<<<<< HEAD
        query: { id: id },
=======
        query: { id: id }
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
      });
      // let routeUrl = this.$router.resolve({
      //   name: "noticeDetail",
      //   query: { id: id }
      // });
      // window.open(routeUrl .href, '_blank');
    },
<<<<<<< HEAD
    showapp() {
      this.appshow = !this.appshow;
=======
    showapp(){
      this.appshow=!this.appshow
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
    },
    goto(index, name) {
      this.current = index;
      // console.log(index, name);
<<<<<<< HEAD
      console.log("index", index);
      console.log("name", name);
      this.bus.$emit("nav_name", name);
      if (name == "userSetting") {
        this.$router.push("/userSetting");
      } else if (name == "team") {
        this.$router.push("/team");
=======
      console.log("index",index);
      console.log("name",name);
      this.bus.$emit('nav_name',name);
      if(name == 'userSetting'){
        this.$router.push('/userSetting')
      }else if(name == 'team'){
        this.$router.push('/team')
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
      } else {
        this.$router.push({ name: name });
      }
    },
<<<<<<< HEAD
    gotoAccount(index, name) {
      // this.current = index;
      // console.log(index, name);
      this.bus.$emit("nav_name", name);
=======
    gotoAccount(index,name){
      // this.current = index;
      // console.log(index, name);
      this.bus.$emit('nav_name',name);
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
      this.$router.push({ name: name });
    },
    loginOut() {
      this.$ajax({
<<<<<<< HEAD
        url: "/api/" + "user/logout",
        method: "get",
        data: {},
        headers: { Authorization: window.localStorage.getItem("token") },
      }).then((res) => {
        var lg = window.localStorage.getItem("locale") || "en";
        localStorage.clear();
        window.localStorage.setItem("locale", lg);
        this.$router.push({
          name: "login",
          params: { type: 1 },
        });
      });
=======
        url:'/api/' + 'user/logout',
        method:'get',
        data:{}, 
        headers: { Authorization: window.localStorage.getItem("token")},
      }).then(res => {
	      var lg=window.localStorage.getItem('locale') || 'en';
        localStorage.clear();
        window.localStorage.setItem('locale',lg)
        this.$router.push({
          name: "login",
          params: { type: 1 }
        });
      })
      
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
    },
    assets_over() {
      this.show1 = true;
    },
    assets_out() {
      this.show1 = false;
    },
    order_over() {
      this.show2 = true;
    },
    order_out() {
      this.show2 = false;
    },
    mine_over() {
      this.show3 = true;
    },
    mine_out() {
      this.show3 = false;
    },
<<<<<<< HEAD
    lgover() {
      this.show4 = true;
    },
    lgout() {
      this.show4 = false;
    },
    lgover2() {
      this.show6 = true;
    },
    lgout2() {
      this.show6 = false;
    },
    newover() {
      this.show5 = true;
    },
    newout() {
=======
    lgover(){
      this.show4 = true;
    },
    lgout(){
      this.show4 = false;
    },
     lgover2(){
      this.show6 = true;
    },
    lgout2(){
      this.show6= false;
    },
    newover(){
      this.show5 = true;
    },
    newout(){
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
      this.show5 = false;
    },
    setLang(lang) {
      var l = window.localStorage.getItem("locale") || "en";
      if (l == lang) {
        return;
      } else {
<<<<<<< HEAD
        window.localStorage.setItem("locale", lang);
        this.$i18n.locale = lang;
        this.$ajax({
          url: "/api/" + "set/lang",
          method: "post",
          data: { lang: lang },
        }).then((res) => {
          window.location.reload();
        });
      }
    },
  },
=======
          window.localStorage.setItem('locale',lang);
          this.$i18n.locale = lang;
          this.$ajax({
            url:'/api/' + 'set/lang',
            method:'post',
            data:{lang:lang}, 
          }).then(res => {
            window.location.reload();
          }) 
      }
    },
  }
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
};
</script>

<style scoped lang='scss'>
.nav_bar {
  width: 100%;
  min-width: 1200px;
  padding: 0 30px;
  background: #1b2945;
  .content {
    // width: 1200px;
    margin: 0 auto;
  }
  .router-link-active {
    color: #fff;
    border-bottom: 2px solid #357ce1;
    height: 48px;
    display: inline-block;
  }
<<<<<<< HEAD
  .fr {
=======
  .fr{
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
    .router-link-active {
      border-bottom: 2px solid transparent;
    }
  }
  .msg_wrap {
    display: flex;
    align-items: center;
<<<<<<< HEAD
    > div {
=======
    >div{
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
      margin: 0 10px;
    }
  }
  .icon_img {
    width: 15px;
  }
  .assets_icon_img,
  .order_icon_img {
    width: 20px;
    height: 20px;
  }
  .sp {
    line-height: normal;
    margin: 0 4px;
  }

  .navbar-logo {
    vertical-align: middle;
  }
  .account_login,
  .assets_item,
  .order_item {
    // width: 100px;
    font-size: 14px;
  }
  .assets_item,
  .order_item {
    height: 60px;
    display: flex;
    align-items: center;
  }
  .account-choose {
    // display: none;
    cursor: default;
    position: absolute;
    top: 48px;
    right: -60px;
    z-index: 999;
    width: 160px;
    line-height: 40px;
    background-color: #fff;
    z-index: 5000;
    border-radius: 3px;
    // box-shadow: 0 0 2px 4px rgba(0, 0, 0, 0.2);
    p {
      padding-left: 20px;
      img {
        width: 14px;
        vertical-align: middle;
        margin-right: 8px;
        display: inline-block;
      }
      img:nth-child(2) {
        display: none;
      }
    }
    p:hover {
      color: #5697f4;
      // background-color: #1a243b;
    }
    p:hover img:nth-child(2) {
      display: inline-block;
    }
    p:hover img:nth-child(1) {
      display: none;
    }
  }
<<<<<<< HEAD
  .languagetxt:hover .hov {
    color: #fff !important;
  }
  .language {
=======
  .languagetxt:hover .hov{
    color: #fff !important;
  }
  .language{
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
    cursor: default;
    position: absolute;
    top: 48px;
    right: -30px;
    z-index: 999;
    width: 120px;
    line-height: 40px;
    background-color: #fff;
    z-index: 5000;
    border-radius: 6px;
<<<<<<< HEAD
    box-shadow: 0 5px 24px 0 rgba(117, 175, 238, 0.5);
    p {
=======
    box-shadow: 0 5px 24px 0 rgba(117,175,238,.5);
    p{
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
      text-align: center;
      cursor: pointer;
      // background: #7a98f7;
      padding: 0 10px;
      height: 50px;
      color: #333;
      border-radius: 6px;
<<<<<<< HEAD
      img {
        width: 24px;
        height: 16px;
      }
      span {
        padding-left: 10px;
      }
    }
    p:hover {
=======
      img{
        width: 24px;
        height: 16px;
      }
      span{padding-left: 10px;}
    }
    p:hover{
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
      background: #d3e6fb;
      // color: #7a98f7;
    }
  }
<<<<<<< HEAD
  .noticeBox {
=======
  .noticeBox{
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
    cursor: default;
    position: absolute;
    top: 48px;
    right: -120px;
    z-index: 999;
    width: 240px;
    max-height: 240px;
    line-height: 40px;
    background-color: #fff;
    border-radius: 3px;
    z-index: 5000;
<<<<<<< HEAD
    box-shadow: 0 0 20px rgba(69, 97, 137, 0.2);
    p {
=======
    box-shadow: 0 0 20px rgba(69,97,137,.2);
    p{
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
      height: 40px;
      line-height: 40px;
      padding: 0 15px;
      border-bottom: 1px solid #eff4f7;
      color: #2b3d4a;
      overflow: hidden;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
    }
<<<<<<< HEAD
    .all {
=======
    .all{
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
      color: #357ce1;
      background: #f2f6fa;
      height: 33px;
      line-height: 33px;
      border-bottom: none;
    }
<<<<<<< HEAD
    p:hover {
=======
    p:hover{
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
      color: #357ce1;
      background: #f2f6fa;
    }
  }
  .asset-choose {
    // display: none;
    cursor: default;
    position: absolute;
    top: 48px;
    right: 156px;
    width: 188px;
    line-height: 40px;
    background-color: #171c2b;
    z-index: 5000;
    border-radius: 3px;
<<<<<<< HEAD
    box-shadow: 0 0 20px rgba(69, 97, 137, 0.2);
=======
    box-shadow: 0 0 20px rgba(69,97,137,.2);
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
    p {
      padding-left: 20px;
      img {
        width: 14px;
        vertical-align: middle;
        margin-right: 8px;
        display: inline-block;
      }
      img:nth-child(2) {
        display: none;
      }
    }
    p:hover {
      color: #5697f4;
      background-color: #1a243b;
    }
    p:hover img:nth-child(2) {
      display: inline-block;
    }
    p:hover img:nth-child(1) {
      display: none;
    }
  }
  .order-choose {
    // display: none;
    cursor: default;
    position: absolute;
    top: 48px;
    right: 56px;
    width: 188px;
    line-height: 40px;
    background-color: #171c2b;
    z-index: 5000;
    border-radius: 3px;
    box-shadow: 0 0 2px 4px rgba(0, 0, 0, 0.2);
    p {
      padding-left: 20px;
      img {
        width: 14px;
        vertical-align: middle;
        margin-right: 8px;
        display: inline-block;
      }
      img:nth-child(2) {
        display: none;
      }
    }
    p:hover {
      color: #5697f4;
      background-color: #1a243b;
    }
    p:hover img:nth-child(2) {
      display: inline-block;
    }
    p:hover img:nth-child(1) {
      display: none;
    }
  }
  .navbar-item {
    color: #cdd6e4;
    li {
      float: left;
      height: 48px;
      line-height: 48px;
      padding: 0 11px;
      display: block;
      text-align: center;
      font-size: 14px;
      cursor: pointer;
<<<<<<< HEAD
      color: #87a2cd;
      a {
        display: inline-block;
      }

      &.active {
        color: #fff;
      }
    }
    li:hover a {
=======
      color:#87a2cd;
      a{
        display:inline-block;
      }
      
      &.active {
        color:#fff;
      }
    }
    li:hover a{
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
      color: #fff;
      border-bottom: 2px solid #357ce1;
    }
  }
  .login {
    color: #87a2cd;
    margin-right: 50px;
    font-size: 14px;
    span {
      cursor: pointer;
    }
<<<<<<< HEAD
    a:hover {
      color: #fff;
    }
=======
    a:hover{color: #fff;}
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
    .ml20 {
      margin-left: 20px;
    }
  }
}
<<<<<<< HEAD
.nav_bars {
  background-color: rgba(0, 0, 0, 0.15);
=======
.nav_bars{
  background-color: rgba(0,0,0,.15);
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
}
<<<<<<< HEAD
.downapp {
  position: relative;
  .appcode {
=======
.downapp{
  position: relative;
  .appcode{
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
    position: absolute;
    top: 50px;
    z-index: 10;
    left: -80px;
    width: 260px;
    background-color: #fff;
    height: 140px;
    border-radius: 4px;
<<<<<<< HEAD
    span {
      position: absolute;
      top: -20px;
      left: 130px;
      display: inline-block;
      width: 0;
      height: 0;
      border-width: 10px;
      border-style: solid;
      border-color: transparent transparent #fff transparent;
    }
    .app-left {
=======
    span{
        position: absolute;
        top: -20px;
        left: 130px;
        display: inline-block;
        width: 0;
        height: 0;
        border-width: 10px;
        border-style: solid;
        border-color:  transparent transparent #fff  transparent ;
    }
    .app-left{
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
      width: 110px;
      float: left;
      text-align: center;
      position: relative;
<<<<<<< HEAD
      .code {
        position: relative;
        top: 5px;
        left: 10px;
        img {
          width: 100px;
          height: 100px;
        }
        p:last-child {
=======
      .code{
        position: relative;
        top: 5px;
        left: 10px;
        img{
          width: 100px;
          height: 100px;
        }
        p:last-child{
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
          position: absolute;
          bottom: 0;
        }
      }
    }
<<<<<<< HEAD
    .app-right {
=======
    .app-right{
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
      float: right;
      width: 110px;
      text-align: center;
      margin-right: 10px;
      padding-right: 10px;
<<<<<<< HEAD
      margin-top: 5px;
      p {
        top: -10px;
        img {
=======
      margin-top:5px;
      p{
        top: -10px;
        img{
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
          width: 20px;
          position: relative;
          top: 4px;
          margin-top: 0;
        }
      }
<<<<<<< HEAD
      img {
        width: 40px;
        margin-top: 30px;
      }
      b {
=======
      img{
        width: 40px;
        margin-top: 30px;
      }
      b{
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
        display: block;
        width: 100px;
        height: 100px;
        border: 1px solid #f7f6f6;
        text-align: center;
        top: 0;
        border-radius: 4px;
      }
    }
<<<<<<< HEAD
    .texts {
=======
    .texts{
>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
      position: relative;
      top: -30px;
      color: #333;
    }
  }
}
<<<<<<< HEAD
=======

>>>>>>> e2087b23b453b154ceca93f8e75b41ebce2b2e26
</style>



// WEBPACK FOOTER //
// src/view/indexHeader.vue