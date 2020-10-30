<template>
  <div>

	  <div class="swiper-container banner_wrap swiper-container-horizontal">
      <div class="swiper-wrapper">
        <div class="swiper-slide sliders" v-for="(item, index) in swiperImgs">
          <a href="">
            <img :src="item.cover" />
          </a>
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination02"></div>
    </div>
	 <div id="legaltrade-box" class="whites">
    <!-- 轮播 -->
    
    <div class="buy-sell flex">
      <div class="buy-box bod_rc">
        <div class="title">{{ $t("td.buy") }}</div>
        <ul :class="['flex whites', { now: type == 'sell' }]">
          <li
            v-for="(coin, index) in legals"
            :key="index"
            :class="{ current: coin.id == id }"
            @click="changeClassify(coin.id, 1, coin.name)"
          >
            {{ coin.name }}
          </li>
        </ul>
      </div>
      <div class="sell-box">
        <div class="title">{{ $t("td.sell") }}</div>
        <ul :class="['flex whites', { now: type == 'buy' }]">
          <li
            v-for="(coin, index) in legals"
            :key="index"
            :class="{ current: coin.id == id }"
            @click="changeClassify(coin.id, 2, coin.name)"
          >
            {{ coin.name }}
          </li>
        </ul>
      </div>
      <div class="record light_blue" @click="recordList()">
        {{ $t("fat.orderLog") }}
      </div>
    </div>
    <div class="list-box">
      <div class="list-title flex ft14 gray9 tc">
        <div class="tl">{{ $t("fat.shoper") }}</div>
        <div>{{ $t("td.num") }}</div>
        <div>{{ $t("td.limit") }}</div>
        <div>{{ $t("td.price") }}</div>
        <div>{{ $t("td.method") }}</div>
        <div class="tr">{{ $t("td.do") }}</div>
      </div>
      <ul class="list">
        <li
          v-for="(item, index) in list"
          :key="index"
          class="bdb flex bod_bc ft14 tc"
          v-if="item.is_shelves == 1"
        >
          <div class="flex alcenter">
            <div class="head" :style="{ background: item.bgcolor }">
              {{ item.seller_name || "" | strFirst }}
            </div>
            <div class="flex column">
              <span class="light_blue bold">{{ item.seller_name }}</span>
            </div>
          </div>
          <div class="flex alcenter center">
            {{ item.surplus_number || "0.000" | toFixeds }}
            {{ item.currency_name }}
          </div>
          <div class="flex alcenter center">
            {{ item.limitation.min || "0.000" | toFixeds }}
            {{ item.coin_code }} -
            {{ item.limitation.max || "0.000" | toFixeds }} {{ item.coin_code }}
          </div>
          <div class="flex alcenter price ft16 bold center">
            {{ item.price || "0.000" | toFixeds }} {{ item.coin_code }}
          </div>
          <!-- <div class="flex alcenter">{{item.way_name}}</div> -->
          <div class="flex alcenter center">
            <img
              v-if="item.way == 'ali_pay'"
              src="../assets/images/zfb_icon.png"
            />
            <img
              v-if="item.way == 'we_chat'"
              src="../assets/images/wx_icon.png"
            />
            <img
              v-if="item.way == 'bank'"
              src="../assets/images/bank_icon.png"
            />
          </div>
          <div
            class="flex alcenter end"
            @click="
              buySell(
                item.price,
                item.limitation.min,
                item.limitation.max,
                item.id,
                item.type,
                item.surplus_number,
                item.coin_code
              )
            "
          >
            <button class="curPer">{{ classify }}{{ name }}</button>
          </div>
        </li>
      </ul>
      <div
        class="more tc mt20 curPer"
        @click="getMore()"
        v-if="list.length && more"
      >
        {{ $t("td.more") }}
      </div>
      <div class="more tc mt20" v-else>{{ $t("td.nomore") }}</div>
      <!-- 分页 -->
      <!-- <paginate v-show="pages" :page-count="pages" :click-handler="pagesList" :prev-text="'上一页'" :next-text="'下一页'"
			 :container-class="'pages'">
			</paginate> -->
    </div>
    <div class="modal white" v-show="shows">
      <div class="mask" @click="closeBtn()"></div>
      <div class="content">
        <div class="content-list">
          <p class="close tr curPer" @click="close()">X</p>
          <p class="title">{{ classify }}{{ name }}</p>
          <p class="price">
            {{ $t("td.price") }}{{ prices || "0.000" | toFixeds }}
          </p>
          <div class="trade">
            <p
              :class="['trade-name', { active: types == 'trade' }]"
              @click="tabClassify(1)"
            >
              {{ coin }}{{ $t("td.trade") }}
            </p>
            <p
              :class="['trade-num', { active: types == 'num' }]"
              @click="tabClassify(2)"
            >
              {{ classify }}{{ $t("td.num") }}
            </p>
          </div>
          <div class="totals-num">
            <input
              v-if="types == 'trade'"
              class="number"
              type="number"
              :placeholder="$t('td.inwant') + money_type + $t('td.total')"
              v-model="nums"
            />
            <input
              v-else
              class="number"
              type="number"
              :placeholder="$t('td.inwant') + money_type + $t('td.num')"
              v-model="nums"
            />
            <button
              class="all curPer"
              type="button"
              v-if="type == 'sell'"
              @click="allMoney()"
            >
              {{ $t("td.allbuy") }}
            </button>
            <button class="all curPer" type="button" v-else @click="allMoney()">
              {{ $t("td.allsell") }}
            </button>
            <span class="name">{{ name01 }}</span>
          </div>
          <div class="maxnum">
            {{ $t("td.limit") }}{{ minNum || "0.000" | toFixeds }}-{{
              maxNum || "0.000" | toFixeds
            }}
          </div>
          <div class="trade-totals">
            <p class="total-price">{{ $t("td.tradeTotal") }}</p>
            <p class="prices" v-if="types == 'trade'">
              {{ nums || "0.000" | toFixeds }} {{ coin }}
            </p>
            <p class="prices" v-else>
              {{ nums * prices || "0.000" | toFixeds }} {{ coin }}
            </p>
          </div>
          <!-- <p class="tip">请在24小时内联系商家付款，超出24小时将自动取消</p> -->
          <div class="btns">
            <p class="cannel">{{ time }}{{ $t("td.doceil") }}</p>
            <button class="comfirm curPer" type="button" @click="buyOrder()">
              {{ $t("td.place") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
 
</template>

<script>
// import Paginate from 'vuejs-paginate';
import Swiper from "swiper";
export default {
  // components: {
  // 	Paginate
  // },
  data() {
    return {
      legals: [],
      list: [],
      type: "sell",
      id: 0,
      page: 1,
      classify: this.$t("td.buy"),
      name: "CNY",
      pages: 0,
      prices: 0,
      minNum: 0,
      maxNum: 0,
      swiperImgs: [],
      max: 0,
      names: "CNY",
      time: "60",
      shows: false,
      types: "trade",
      nums: "",
      surplus_number: 0,
      totalNums: "0.00",
      ID: "",
      money_type: "",
      name01: "CNY",
      more: true,
      surplus_number: 0,
      user_legal_balance: 0,
      bgcolor: [
        "#5d8cc2",
        "#6d78a8",
        "#a2b240",
        "#61b88e",
        "#e35744",
        "#a16c92",
        "#66756e",
      ],
      interval: function () {},
      password: "",
      coin: "CNY",
    };
  },
  created() {
    let token = window.localStorage.getItem("token") || "";
    // if (token) {
    this.token = token;
    this.getCoins();
    // }
  },
  filters: {
    toFixeds: function (value) {
      value = Number(value);
      return value.toFixed(3);
    },
    strFirst: function (value) {
      // console.log(value)
      return value.substr(0, 1);
    },
  },
  mounted() {
    this.getSwiper();
  },

  methods: {
    close() {
      this.shows = false;
      clearInterval(this.interval); //清除定时器
      this.time = 60;
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
    getCoins() {
      this.$ajax({
        url: "/api/currency/list",
      }).then((res) => {
        if (res.data.type == "ok") {
          var list = res.data.message.legal;
          if (list.length) {
            this.legals = list;
            var id = list[0].id;
            this.name = list[0].name;
            this.getList("sell", id, 1);
          }
        }
      });
    },
    getList(type, id, page) {
      this.type = type;
      this.id = id;
      this.page = page;
      var i = layer.load();
      this.$ajax({
        url: "/api/legal_deal_platform",
        params: {
          type: type,
          page: page,
          currency_id: id,
        },
        headers: {
          Authorization: this.token,
        },
      }).then((res) => {
        if (res.data.type == "ok") {
          layer.close(i);
          let list = res.data.message.data;
          if (list.length > 0) {
            for (var j = 0; j < list.length; j++) {
              list[j].bgcolor = this.bgcolor[
                Math.floor(Math.random() * 6 + 1) - 1
              ];
            }
            this.list = this.list.concat(list);
            this.page = this.page + 1;
            this.more = true;
          } else {
            this.more = false;
          }
          // let total = parseInt(res.data.message.total);
          // if (total > 10) {
          // 	this.pages = Math.ceil(total / 10)

          // }
        }
      });
    },
    // 加载更多
    getMore() {
      this.getList(this.type, this.id, this.page);
    },
    // 点击改变选中分类
    changeClassify(ids, type, names) {
      let _this = this;
      _this.list = [];
      _this.id = ids;
      if (type == 1) {
        _this.type = "sell";
        _this.classify = _this.$t("td.buy");
      } else {
        _this.type = "buy";
        _this.classify = _this.$t("td.sell");
      }
      _this.name = names;
      _this.getList(_this.type, ids, 1);
    },
    // 分页改变
    // pagesList(pageNum) {
    // 	let _this = this;
    // 	_this.getList(_this.type, _this.id, pageNum);
    // },
    // 出售或者购买按钮
    buySell(prices, min, max, id, type, surplus_number, coin) {
      if (type == "sell") {
        this.money_type = this.$t("td.buy");
      } else if (type == "buy") {
        this.money_type = this.$t("td.sell");
      }
      let _this = this;
      (_this.nums = ""), (_this.shows = true);
      _this.ID = id;
      _this.time = 60;
      document.getElementsByTagName("body")[0].className = "body";
      _this.prices = prices;
      _this.minNum = min;
      _this.maxNum = max;
      _this.surplus_number = surplus_number;
      _this.coin = coin;
      _this.name01 = coin;
      _this.interval = setInterval(function () {
        _this.time--;
        if (_this.time <= 0) {
          _this.shows = false;
          document.body.removeAttribute("class", "body");
          clearInterval(_this.interval); //清除定时器
          _this.time = 60;
        }
      }, 1000);
      _this
        .$ajax({
          url: "/api/legal_deal_info",
          method: "get",
          params: { id: id },
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.data.type == "ok") {
            _this.surplus_number = res.data.message.surplus_number;
            _this.user_legal_balance = (
              res.data.message.user_legal_balance - 0
            ).toFixed(3);
          } else {
          }
        });
    },
    // 交易或数量切换
    tabClassify(num) {
      this.nums = "";
      if (num == 1) {
        this.types = "trade";
        this.name01 = this.coin;
      } else {
        this.types = "num";
        this.name01 = this.name;
      }
    },
    // 全部卖出或买入
    allMoney() {
      if (this.type == "buy") {
        //出售
        if (this.types == "trade") {
          //cny交易
          this.nums = (this.user_legal_balance * this.prices).toFixed(3);
        } else {
          this.nums = (this.user_legal_balance - 0).toFixed(3);
        }
      } else {
        if (this.types == "num") {
          this.nums = (this.surplus_number - 0).toFixed(3);
        } else {
          this.nums = (this.maxNum - 0).toFixed(3);
        }
      }
    },
    // 下单
    buyOrder() {
      this.shows = false;
      let _this = this;
      let means = "money";
      let ids = window.localStorage.getItem("user_id");
      let token = window.localStorage.getItem("token") || "";
      layer.prompt(
        {
          title: _this.$t("td.pwd"),
          formType: 1,
          btn: [_this.$t("td.confirm"), _this.$t("td.canceil")],
        },
        function (pass, index) {
          console.log(pass);
          _this.password = pass;
          if (_this.nums) {
            if (_this.types == "trade") {
              means = "money";
            } else {
              means = "number";
            }
            let datas = {
              id: _this.ID,
              means: means,
              value: _this.nums,
              password: _this.password,
            };
            _this.buyHttp("/api/do_legal_deal", datas, function (res) {
              if (res.data.type == "ok") {
                if (res.data.message.data.type == "sell") {
                  layer.msg(res.data.message.msg);
                  setTimeout(function () {
                    _this.$router.push({
                      path: "/legalPay",
                      query: { id: res.data.message.data.id },
                    });
                  }, 500);
                } else {
                  layer.msg(res.data.message.msg);
                  setTimeout(function () {
                    _this.$router.push({
                      path: "/legalPayDetail",
                      query: { id: res.data.message.data.id },
                    });
                  }, 500);
                }
              } else {
                layer.msg(res.data.message);
              }
            });
          } else {
            if (_this.type == "sell") {
              if (_this.types == "trade") {
                layer.msg(_this.$t("td.buytotal"));
              } else {
                layer.msg(_this.$t("td.buyallnum"));
              }
            } else {
              if (_this.types == "trade") {
                layer.msg(_this.$t("td.selltotal"));
              } else {
                layer.msg(_this.$t("td.sellallnum"));
              }
            }
          }
          layer.close(index);
        }
      );
    },
    // 请求
    buyHttp(urls, params, callback) {
      let _this = this;
      _this
        .$ajax({
          url: urls,
          method: "post",
          data: params,
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.data.type == "ok") {
            // layer.msg(res.data.message)
            callback && callback(res);
          } else {
            layer.msg(res.data.message);
            if (res.data.type == "997") {
              setTimeout(() => {
                _this.$router.push("/userSetting");
              }, 1500);
            }
            if (res.data.type == "998") {
              setTimeout(() => {
                _this.$router.push("/authentication");
              }, 1500);
            }
          }
        });
    },
    // 跳转订单记录
    recordList() {
      let _this = this;
      _this.$router.push({ path: "/LegalRecord", query: { id: _this.id } });
    },
  },
};
</script>

<style lang='scss'>
$purple: #638bd4;
.layui-layer {
  background: #171c2b;
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
.body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#legaltrade-box {
  width: 1200px;
  margin: 30px auto;

  > .buy-sell {
    position: relative;
    > .buy-box {
      padding: 20px;
      // border-right: 1px solid #ccc;
    }

    > .sell-box {
      padding: 20px;
    }

    > div {
      width: 50%;
      font-weight: bold;

      ul {
        margin-top: 20px;

        li {
          margin-right: 16px;
          cursor: pointer;
          padding: 2px 6px;
          // color: #fff;
        }
      }

      > .now {
        li {
          // color: #638bd4;
        }
        > .current {
          // color: $purple;
          // border-bottom: 2px solid $purple;
          // background: #638bd4;
          border-bottom: 2px solid #638bd4;
          font-weight: 600;
          color: #638bd4;
          padding: 2px 6px;
        }
      }
    }
    > .record {
      cursor: pointer;
      font-size: 16px;
      position: absolute;
      right: 20px;
      text-align: right;
      top: 30px;
      width: 100px;
    }
  }

  > .list-box {
    margin-top: 20px;

    > .list-title {
      padding: 10px 0;
      border-bottom: 1px solid #1e2c40;
      > div {
        flex: 1;
      }

      > div:last-child {
        text-align: right;
      }
    }

    > .list {
      > li {
        padding: 20px 0;
        border-bottom: 1px solid #1e2c40;
        .price {
          color: #489972;
        }
        > div {
          flex: 1;
          line-height: 36px;

          > .head {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            margin-right: 10px;
            // background: #638BD4;
          }

          > span {
            display: inline-block;
            position: relative;
            top: -10px;
            color: $purple;
          }
        }

        > div:last-child {
          text-align: right;
          justify-content: flex-end;
          > button {
            background-color: #638bd4;
            padding: 0px 10px;
            color: #fff;
            border-radius: 4px;
            line-height: 36px;
            border: none;
          }
        }
      }
    }

    > .pages {
      display: flex;
      justify-content: center;
      margin-top: 30px;

      > li {
        padding: 10px;
        border: 1px solid #e5e5e5;
        margin-right: 10px;
        border-radius: 6px;
      }

      > .active {
        border: 1px solid $purple;
        color: $purple;
      }
    }
  }

  > .modal {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;

    > .mask {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #000;
      opacity: 0.3;
      overflow: hidden;
    }

    > .content {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 100;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;

      > .content-list {
        width: 400px;
        border-radius: 10px;
        margin: auto;
        background-color: #171c2b;
        padding: 15px;

        > .title {
          font-size: 16px;
          line-height: 2;
          text-align: center;
        }

        > .trade {
          font-size: 0;

          > p {
            display: inline-block;
            font-size: 15px;
            margin: 15px;
            margin: 10px 10px 10px 0;
            line-height: 1.5;
            padding-bottom: 5px;
            cursor: pointer;
          }

          .active {
            border-bottom: 1px solid $purple;
            color: $purple;
          }
        }

        > .totals-num {
          width: 100%;
          height: 40px;
          border: 1px solid #555869;
          font-size: 0;

          > input {
            line-height: 38px;
            padding-left: 10px;
            font-size: 15px;
            background: none;
            color: #c7cce6;
          }

          > button {
            background-color: rgba(0, 0, 0, 0);
            float: right;
            font-size: 15px;
            line-height: 20px;
            margin-right: 15px;
            margin-top: 9px;
            padding-left: 20px;
            border: none;
            border-left: 1px solid #555869;
            color: #fff;
          }

          > span {
            font-size: 15px;
            float: right;
            line-height: 38px;
            margin-right: 20px;
          }
        }

        > .maxnum {
          margin-top: 15px;
        }

        > .trade-totals {
          width: 100%;
          font-size: 0;
          height: 40px;
          line-height: 40px;

          > .total-price {
            float: left;
            font-size: 15px;
          }

          > .prices {
            font-size: 15px;
            float: right;
          }
        }

        > .tip {
          color: $purple;
          font-size: 14px;
        }

        > .btns {
          margin-top: 10px;
          font-size: 0;
          height: 40px;

          > .cannel {
            width: 48%;
            height: 40px;
            line-height: 40px;
            background-color: #eee;
            color: #333;
            text-align: center;
            border-radius: 6px;
            float: left;
            font-size: 15px;
          }

          > .comfirm {
            float: right;
            width: 48%;
            height: 40px;
            line-height: 40px;
            background-color: $purple;
            border-radius: 6px;
            font-size: 15px;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>



// WEBPACK FOOTER //
// src/components/LegalTrade.vue