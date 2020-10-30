<template>
  <div id="tv_chart_container" style="width:100%;height: 550px"></div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "market",
  props: {
    symbol: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      widget: null,
      symbolInfo: null,
      feed: null,
      wsEx: null,
      ws: null,
      lists: [],
      newData: "",
      priceScale: 10000,
      histime: "",
      locales: localStorage.getItem("lang") || "zh"
    };
  },
  created: function() {
    let that = this;
  },
  computed: {
    listenState() {
      //监听交易对
      this.createWidget();
      return this.symbol;
    },
    ...mapState(['theme']),
  },
  watch: {
    theme:{
      handler(){
        var t=this.theme;
        // alert(t);
        this.loctheme=t;
        this.createWidget();
      },
      // deep: true,
        immediate: true
      // return this.$store.theme;
    },
    listenState: function(a, b) {
      //监听交易对
      if (a != b && b != "") {
        this.widget.setSymbol(
          a,
          localStorage.getItem("tim"),
          function onReadyCallback() {}
        );
      }
    }
  },
  mounted() {
    var that = this;
    if (that.symbol != "") {
      this.createWidget();
    }
  },
  destroyed() {
    this.removeWidget();
  },
  methods: {
    connect(real) {
      //封装推送数据
      var that = this;
      that.$socket.emit("login", localStorage.getItem("user_id"));
      that.$socket.on("kline", msg => {
        let obj = {};
        let types = localStorage.getItem('type');
        if (that.symbol == msg.symbol&&types == msg.period) {
          obj.open = Number(msg.open);
          obj.low = Number(msg.low);
          obj.high = Number(msg.high);
          obj.close = Number(msg.close);
          obj.volume = Number(msg.volume);
          obj.time = Number(msg.time);
          localStorage.setItem("newPrice", msg.close);
          real(obj);
        }
      });
    },

    createWidget() {
      let _this = this;
      var bgText = "#1a243b";
      // if (localStorage.getItem("skin") == "nights") {
      //   bgText= '#1e2b34';
      // }else{
      //   bgText = "#ffffff";
      // }
      this.$nextTick(function() {
        let cssfile = this.loctheme=='white'?'bundles/new_white.css':'bundles/new.css';
        let widget = (_this.widget = new TradingView.widget({
          symbol: _this.symbol,
          interval: 1,
          debug: true,
          fullscreen: false,
          autosize: true,
          container_id: "tv_chart_container",
          datafeed: _this.createFeed(),
          library_path: "./static/tradeview/charting_library/",
          custom_css_url: cssfile,
          locale: _this.locales,
          width: "100%",
          height: 516,
          drawings_access: {
            type: "black",
            tools: [{ name: "Regression Trend" }]
          },
          disabled_features: [
            //  禁用的功能
            // "left_toolbar",
            "header_saveload",
            "compare_symbol",
            "display_market_status",
            "go_to_date",
            "header_chart_type",
            "header_compare",
            "header_interval_dialog_button",
            "header_resolutions",
            "header_screenshot",
            "header_symbol_search",
            "header_undo_redo",
            "legend_context_menu",
            "show_hide_button_in_legend",
            "show_interval_dialog_on_key_press",
            "snapshot_trading_drawings",
            "symbol_info",
            "timeframes_toolbar",
            "use_localstorage_for_settings",
            "volume_force_overlay",
            "widget_logo"
          ],
          enabled_features: [
            //  启用的功能（备注：disable_resolution_rebuild 功能用于控制当时间范围为1个月时，日期刻度是否都是每个月1号
            "dont_show_boolean_study_arguments",
            "hide_last_na_study_output",
            "move_logo_to_main_pane",
            "same_data_requery",
            "side_toolbar_in_fullscreen_mode",
            "disable_resolution_rebuild"
          ],
          charts_storage_url: "http://saveload.tradingview.com",
          charts_storage_api_version: "1.1",
          toolbar_bg: bgText,
          timezone: "Asia/Shanghai",
          studies_overrides: {
            "volume.precision": "1000"
          },
          overrides: _this.overrides()
        }));

        widget.MAStudies = [];
        widget.selectedIntervalButton = null;
        // widget.setLanguage('en')
        widget.onChartReady(function() {
          //图表方法
          // document.getElementById('trade-view').childNodes[0].setAttribute('style', 'display:block;width:100%;height:100%;');
          //let that =this

          	widget.chart().createStudy('Moving Average', false, false, [15, 'close', 0], null, {
								'Plot.color': '#a039a2'
							},{checkLimit:true});
							widget.chart().createStudy("Moving Average", false, false, [10, 'close', 0], null, {
								'Plot.color': 'green'
							},{checkLimit:true});
							widget.chart().createStudy("Moving Average", false, false, [20, 'close', 0], null, {
								'Plot.color': 'red'
							},{checkLimit:true});
          // widget.chart().createStudy("MA Cross", false, true, [14, 30, "close", 9]);
          let buttonArr = [
            {
              value: "1min",
              period: "1",
              text: _this.$t("kline.text1"),
              chartType: 3,
              type:"1min"
            },
            {
              value: "1",
              period: "1m",
              text: _this.$t("kline.text2"),
              chartType: 1,
              type:"1min"
            },
            {
              value: "5",
              period: "5m",
              text: _this.$t("kline.text3"),
              chartType: 1,
              type:"5min"
              
            },
            {
              value: "15",
              period: "15m",
              text: _this.$t("kline.text4"),
              chartType: 1,
              type:"15min"
            },
            {
              value: "30",
              period: "30m",
              text: _this.$t("kline.text5"),
              chartType: 1,
              type:"30min"
            },
            {
              value: "60",
              period: "60分钟",
              text: _this.$t("kline.text6"),
              chartType: 1,
              type:"60min"
            },
            {
              value: "1D",
              period: "1D",
              text: _this.$t("kline.text7"),
              chartType: 1,
              type:"1day"
            },
            {
              value: "1W",
              period: "1W",
              text: _this.$t("kline.text8"),
              chartType: 1,
              type:"1week"
            },
            {
              value: "1M",
              period: "1M",
              text: _this.$t("kline.text9"),
              chartType: 1,
							type:"1mon"
              
            }
          ];
          let btn = {};
          let nowTime = "";
          buttonArr.forEach((v, i) => {
            let button = widget.createButton();
            button
              .attr("title", v.text)
              .addClass("my2")
              .text(v.text);
            if (v.text == _this.$t("kline.text2")) {
              	if(_this.loctheme=='white'){
								    button.css({"background-color":"#e5ebf5",'color':'#9ca9b5'})
								}else{
								    button.css({"background-color":"#2c3b59",'color':'#c7cce6'})
								}
              // button.css({ "background-color": "##7a98f7", color: "#fff" });
              localStorage.setItem("tim", "1min"); //默认为1分钟
               localStorage.setItem("type", "1min");
            }
            btn = button.on("click", function(e) {
              $(this)
                .parents(".left")
                .children()
                .find(".my2")
                .removeAttr("style"); //去掉1分钟的
              handleClick(e, v.value,v.type);

              widget.chart().setChartType(v.chartType); //改变K线类型
            });
          });
          // if (localStorage.getItem("tim") == "1min") {
          //   widget.chart().setChartType(3);
          // }
          let handleClick = (e, value,type) => {
            _this.setSymbol = function(symbol, value) {
              gh.chart().setSymbol(symbol, value);
            };
            localStorage.setItem("tim", value);
            localStorage.setItem("type", type);
            widget.chart().setResolution(value, function onReadyCallback() {}); //改变分辨率

            $(e.target)
              .addClass("mydate")
              .closest("div.space-single")
              .siblings("div.space-single")
              .find("div.button")
              .removeClass("mydate");
          };
        });

        _this.widget = widget;
      });
    },
    createFeed() {
      let this_vue = this;
      let Datafeed = {};

      Datafeed.DataPulseUpdater = function(datafeed, updateFrequency) {
        this._datafeed = datafeed;
        this._subscribers = {};

        this._requestsPending = 0;
        var that = this;

        var update = function() {
          if (that._requestsPending > 0) {
            return;
          }

          for (var listenerGUID in that._subscribers) {
            var subscriptionRecord = that._subscribers[listenerGUID];
            var resolution = subscriptionRecord.resolution;

            var datesRangeRight = parseInt(new Date().valueOf() / 1000);
            var datesRangeLeft =
              datesRangeRight - that.periodLengthSeconds(resolution, 10);

            that._requestsPending++;

            (function(_subscriptionRecord) {
              that._datafeed.getBars(
                _subscriptionRecord.symbolInfo,
                resolution,
                datesRangeLeft,
                datesRangeRight,
                function(bars) {
                  that._requestsPending--;
                  if (!that._subscribers.hasOwnProperty(listenerGUID)) {
                    return;
                  }

                  if (bars.length === 0) {
                    return;
                  }

                  var lastBar = bars[bars.length - 1];
                  if (
                    !isNaN(_subscriptionRecord.lastBarTime) &&
                    lastBar.time < _subscriptionRecord.lastBarTime
                  ) {
                    return;
                  }

                  var subscribers = _subscriptionRecord.listeners;

                  var isNewBar =
                    !isNaN(_subscriptionRecord.lastBarTime) &&
                    lastBar.time > _subscriptionRecord.lastBarTime;
                  if (isNewBar) {
                    if (bars.length < 2) {
                      throw new Error(
                        "Not enough bars in history for proper pulse update. Need at least 2."
                      );
                    }

                    var previousBar = bars[bars.length - 2];
                    for (var i = 0; i < subscribers.length; ++i) {
                      subscribers[i](previousBar);
                    }
                  }

                  _subscriptionRecord.lastBarTime = lastBar.time;

                  for (var i = 0; i < subscribers.length; ++i) {
                    subscribers[i](lastBar);
                  }
                },

                //	on error
                function() {
                  that._requestsPending--;
                }
              );
            })(subscriptionRecord);
          }
        };

        if (typeof updateFrequency != "undefined" && updateFrequency > 0) {
          setInterval(update, updateFrequency);
        }
      };

      Datafeed.DataPulseUpdater.prototype.periodLengthSeconds = function(
        resolution,
        requiredPeriodsCount
      ) {
        var daysCount = 0;

        if (resolution === "D") {
          daysCount = requiredPeriodsCount;
        } else if (resolution === "M") {
          daysCount = 31 * requiredPeriodsCount;
        } else if (resolution === "W") {
          daysCount = 7 * requiredPeriodsCount;
        } else {
          daysCount = (requiredPeriodsCount * resolution) / (24 * 60);
        }

        return daysCount * 24 * 60 * 60;
      };

      Datafeed.DataPulseUpdater.prototype.subscribeDataListener = function(
        symbolInfo,
        resolution,
        newDataCallback,
        listenerGUID
      ) {
        this._datafeed._logMessage("Subscribing " + listenerGUID);

        if (!this._subscribers.hasOwnProperty(listenerGUID)) {
          this._subscribers[listenerGUID] = {
            symbolInfo: symbolInfo,
            resolution: resolution,
            lastBarTime: NaN,
            listeners: []
          };
        }

        this._subscribers[listenerGUID].listeners.push(newDataCallback);
      };

      Datafeed.DataPulseUpdater.prototype.unsubscribeDataListener = function(
        listenerGUID
      ) {
        this._datafeed._logMessage("Unsubscribing " + listenerGUID);
        delete this._subscribers[listenerGUID];
      };

      Datafeed.Container = function(updateFrequency) {
        this._configuration = {
          supports_search: false,
          supports_group_request: false,
          supported_resolutions: [
            "1",
            "3",
            "5",
            "15",
            "30",
            "60",
            "120",
            "240",
            "360",
            "720",
            "1D",
            "3D",
            "1W",
            "1M"
          ],
          supports_marks: true,
          supports_timescale_marks: true,
          exchanges: ["gh"]
        };

        this._barsPulseUpdater = new Datafeed.DataPulseUpdater(
          this,
          updateFrequency || 10 * 1000
        );

        this._enableLogging = true;
        this._callbacks = {};

        this._initializationFinished = true;
        this._fireEvent("initialized");
        this._fireEvent("configuration_ready");
      };

      Datafeed.Container.prototype._fireEvent = function(event, argument) {
        if (this._callbacks.hasOwnProperty(event)) {
          var callbacksChain = this._callbacks[event];
          for (var i = 0; i < callbacksChain.length; ++i) {
            callbacksChain[i](argument);
          }

          this._callbacks[event] = [];
        }
      };

      Datafeed.Container.prototype._logMessage = function(message) {
        if (this._enableLogging) {
          var now = new Date();
        }
      };

      Datafeed.Container.prototype.on = function(event, callback) {
        if (!this._callbacks.hasOwnProperty(event)) {
          this._callbacks[event] = [];
        }

        this._callbacks[event].push(callback);
        return this;
      };

      Datafeed.Container.prototype.onReady = function(callback) {
        let that = this;
        if (this._configuration) {
          setTimeout(function() {
            callback(that._configuration);
          }, 0);
        } else {
          this.on("configuration_ready", function() {
            callback(that._configuration);
          });
        }
      };

      Datafeed.Container.prototype.resolveSymbol = function(
        symbolName,
        onSymbolResolvedCallback,
        onResolveErrorCallback
      ) {
        this._logMessage("GOWNO :: resolve symbol " + symbolName);
        Promise.resolve().then(() => {
          onSymbolResolvedCallback({
            name: this_vue.symbol,
            timezone: "Asia/Shanghai",
            pricescale: this_vue.priceScale,
            minmov: 1, //minmov(最小波动), pricescale(价格精度), minmove2, fractional(分数)
            minmov2: 0, //这是一个神奇的数字来格式化复杂情况下的价格。
            ticker: this_vue.symbol,
            description: "",
            type: "bitcoin",
            volume_precision: 8,
            // "exchange-traded": "sdt",
            // "exchange-listed": "sdt",
            //现在，这两个字段都为某个交易所的略称。将被显示在图表的图例中，以表示此商品。目前此字段不用于其他目的。
            has_intraday: true,
            has_weekly_and_monthly: true,
            has_no_volume: false, //布尔表示商品是否拥有成交量数据。
            session: "24x7",
            supported_resolutions: [
              "1",
              "3",
              "5",
              "15",
              "30",
              "60",
              "120",
              "240",
              "360",
              "720",
              "1D",
              "3D",
              "1W",
              "1M"
            ]
          });
        });
      };

      //初始化数据
      Datafeed.Container.prototype.getBars = function(
        symbolInfo,
        resolution,
        rangeStartDate,
        rangeEndDate,
        onHistoryCallback,
        onErrorCallback
      ) {
        if (
          resolution.indexOf("D") == -1 &&
          resolution.indexOf("W") == -1 &&
          resolution.indexOf("M") == -1
        ) {
          resolution = resolution + "min";
        } else if (
          resolution.indexOf("W") != -1 ||
          resolution.indexOf("M") != -1
        ) {
          resolution = resolution;
        }
        $.ajax({
          url:
            "/api/currency/new_timeshar?" +
            "from=" +
            rangeStartDate +
            "&to=" +
            rangeEndDate +
            "&symbol=" +
            symbolInfo.name +
            "&period=" +
            resolution,
          type: "get",
          success: function(res) {
            if (res.code == 1 && res.data && res.data.length > 0) {
              res.data.forEach((item, i) => {
                item.open = Number(item.open);
                item.close = Number(item.close);
                item.high = Number(item.high);
                item.low = Number(item.low);
                localStorage.setItem("newPrice", item.close);
              });
              onHistoryCallback(res.data, { noData: false });
              onHistoryCallback([], { noData: true });
            }
            if (!res.data || res.code == -1) {
              onHistoryCallback([], { noData: true });
            }
            if (res.data && res.data.length == 0) {
              onHistoryCallback([], { noData: true });
            }
          }
        });
      };
      //实时数据
      Datafeed.Container.prototype.subscribeBars = function(
        symbolInfo,
        resolution,
        onRealtimeCallback,
        listenerGUID,
        onResetCacheNeededCallback
      ) {
        this_vue.connect(onRealtimeCallback);
      };

      Datafeed.Container.prototype.unsubscribeBars = function(listenerGUID) {
        this._barsPulseUpdater.unsubscribeDataListener(listenerGUID);
      };

      return new Datafeed.Container();
    },
    updateData(data) {
      if (data) {
        this.$emit("real-time", data);
      }
    },

    updateWidget(item) {
      this.symbolInfo = {
        name: item,
        ticker: item,
        description: "",
        session: "24x7",
        supported_resolutions: [
          "1",
          "5",
          "15",
          "30",
          "60",
          "240",
          "1D",
          "3D",
          "1W",
          "1M"
        ],
        has_intraday: true,
        has_daily: true,
        has_weekly_and_monthly: true,
        timezone: "UTC"
      };

      this.removeWidget();
      this.createWidget();
    },
    removeWidget() {
      if (this.widget) {
        this.widget.remove();
        this.widget = null;
      }
    },
    overrides() {
      let style;
				if(this.loctheme == 'white'){
					style = {
						up: "#589065",
						down: "#AE4E54",
						bg: "#ffffff",
						grid: "#f9f9fa",
						cross: "#f9f9fa",
						border: "#b1b7be",
						text: "#61688A",
						areatop: "rgba(122, 152, 247, .1)",
						areadown: "rgba(122, 152, 247, .02)"
					};
				}else{
					style = {
						up: "#589065",
						down: "#AE4E54",
						bg: "#1a243b",
						grid: "#1E2740",
						cross: "#1E2740",
						border: "#4e5b85",
						text: "#61688A",
						areatop: "rgba(122, 152, 247, .1)",
						areadown: "rgba(122, 152, 247, .02)"
					};
				}

      return {
        volumePaneSize: "medium", //large, medium, small, tiny
        "paneProperties.topMargin": "20",
        "scalesProperties.lineColor": style.text,
        "scalesProperties.textColor": style.text,
        "paneProperties.background": style.bg, //改变背景色的重要代码
        "paneProperties.vertGridProperties.color": style.grid,
        "paneProperties.horzGridProperties.color": style.grid,
        "paneProperties.crossHairProperties.color": style.cross,
        "paneProperties.legendProperties.showLegend": true,
        "paneProperties.legendProperties.showStudyArguments": true,
        "paneProperties.legendProperties.showStudyTitles": true,
        "paneProperties.legendProperties.showStudyValues": true,
        "paneProperties.legendProperties.showSeriesTitle": true,
        "paneProperties.legendProperties.showSeriesOHLC": true,
        "mainSeriesProperties.candleStyle.upColor": style.up,
        "mainSeriesProperties.candleStyle.downColor": style.down,
        "mainSeriesProperties.candleStyle.drawWick": true,
        "mainSeriesProperties.candleStyle.drawBorder": true,
        "mainSeriesProperties.candleStyle.borderColor": style.border,
        "mainSeriesProperties.candleStyle.borderUpColor": style.up,
        "mainSeriesProperties.candleStyle.borderDownColor": style.down,
        "mainSeriesProperties.candleStyle.wickUpColor": style.up,
        "mainSeriesProperties.candleStyle.wickDownColor": style.down,
        "mainSeriesProperties.candleStyle.barColorsOnPrevClose": false,
        "mainSeriesProperties.hollowCandleStyle.upColor": style.up,
        "mainSeriesProperties.hollowCandleStyle.downColor": style.down,

        "mainSeriesProperties.hollowCandleStyle.drawWick": true,
        "mainSeriesProperties.hollowCandleStyle.drawBorder": true,
        "mainSeriesProperties.hollowCandleStyle.borderColor": style.border,
        "mainSeriesProperties.hollowCandleStyle.borderUpColor": style.up,
        "mainSeriesProperties.hollowCandleStyle.borderDownColor": style.down,
        "mainSeriesProperties.hollowCandleStyle.wickColor": style.line,
        "mainSeriesProperties.haStyle.upColor": style.up,
        "mainSeriesProperties.haStyle.downColor": style.down,
        "mainSeriesProperties.haStyle.drawWick": true,
        "mainSeriesProperties.haStyle.drawBorder": true,
        "mainSeriesProperties.haStyle.borderColor": style.border,
        "mainSeriesProperties.haStyle.borderUpColor": style.up,
        "mainSeriesProperties.haStyle.borderDownColor": style.down,
        "mainSeriesProperties.haStyle.wickColor": style.border,
        "mainSeriesProperties.haStyle.barColorsOnPrevClose": false,
        "mainSeriesProperties.barStyle.upColor": style.up,
        "mainSeriesProperties.barStyle.downColor": style.down,
        "mainSeriesProperties.barStyle.barColorsOnPrevClose": false,
        "mainSeriesProperties.barStyle.dontDrawOpen": false,
        "mainSeriesProperties.lineStyle.color": style.border,
        "mainSeriesProperties.lineStyle.linewidth": 1,
        "mainSeriesProperties.lineStyle.priceSource": "close",
        "mainSeriesProperties.areaStyle.color1": style.areatop,
        "mainSeriesProperties.areaStyle.color2": style.areadown,
        "mainSeriesProperties.areaStyle.linecolor": "#0094ff",
        "mainSeriesProperties.areaStyle.linewidth": 1,
        "mainSeriesProperties.areaStyle.priceSource": "close"
      };
    },

    chose() {
      this.widget.setLanguage("en"); //设置语言
    }
  }
};
</script>

<style scoped>
</style>



// WEBPACK FOOTER //
// src/view/lever/leverKline.vue