<template>
	<div class="k-line-area bg-1d1d29">
    <tv-top></tv-top>
		<div id="tv_chart_container" style="width:100%;height: 460px"></div>
	</div>
</template>

<script>
  import TvTop from './tvTop.vue'
  import {mapState} from 'vuex'
	// import Datafeeds from "../assets/js/datafeed.js";

	export default {
		name: "tv",
    components:{TvTop},
		data() {
			return {
				widget: null,
				symbolInfo: null,
				feed: null,
				wsEx:null,
				ws:null,
				lists:[],
				newData:'',
				symbol:'',
				priceScale:10000,
				histime:'',
				loctheme:'',
				fnData:''
			}
		},
		created(){
			// this.theme = localStorage.getItem('theme') || 'dark';
			this.symbol=window.localStorage.getItem('symbol');
				// var t=this.$store.theme;
				// alert(t);
			// this.priceScale=window.localStorage.getItem('priceScale');
			this.connect(this.fnData);
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
		computed: {
			listenState() { //监听交易对
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
			listenState:function(a, b) {  //监听交易对
                if(a!=b&&b!=''){
					this.widget.setSymbol(a,localStorage.getItem('tim'),function onReadyCallback(){}) //切换币种
				// this.$store.state.symbol=b
				}
			}
		},
		mounted() {
			localStorage.setItem('type2','1min')  //默认为1分钟
			this.createWidget()
		},
		destroyed() {
			this.removeWidget();
		},
		beforeDestroy(){

		},
    
		methods: {
			connect(real) { //封装推送数据
				var that=this;
				that.$socket.emit("login", localStorage.getItem('user_id'));
				this.$options.sockets.kline=(msg)=>{
					let obj={}
					let type = localStorage.getItem('type2')
					if(that.symbol==msg.symbol && msg.period == type){
						console.log(type)
						obj.open=Number(msg.open)
						obj.low=Number(msg.low)
						obj.high=Number(msg.high)
						obj.close=Number(msg.close)
						obj.volume=Number(msg.volume)
						obj.time=Number(msg.time)
						if(this.fnData!=null && this.fnData!=''){
							this.fnData(obj)
						}
					}
				}
			},

			createWidget() {
				let _this = this;
				this.$nextTick(function () {
					let cssfile = this.loctheme=='white'?'bundles/new_white.css':'bundles/new.css';
					let widget =_this.widget= new TradingView.widget({
						symbol:_this.symbol,
						interval: 1,
						debug: true,
						fullscreen: false,
						autosize: true,
						container_id: "tv_chart_container",
						// datafeed: new Datafeeds.UDFCompatibleDatafeed("http://demo_feed.tradingview.com"),
						datafeed:_this.createFeed(),
						library_path: "./static/tradeview/charting_library/",
						custom_css_url: cssfile,
						locale: "zh",
						width: "100%",
						height: 516,
						drawings_access: { type: 'black', tools: [ { name: "Regression Trend" } ] },
						disabled_features: [  //  禁用的功能
							'left_toolbar', 'header_saveload', 'compare_symbol', 'display_market_status',
							'go_to_date', 'header_chart_type', 'header_compare', 'header_interval_dialog_button',
							'header_resolutions', 'header_screenshot', 'header_symbol_search', 'header_undo_redo',
							'legend_context_menu', 'show_hide_button_in_legend', 'show_interval_dialog_on_key_press',
							'snapshot_trading_drawings', 'symbol_info', 'timeframes_toolbar', 'use_localstorage_for_settings',
							'volume_force_overlay','widget_logo'
						],
						enabled_features: [ //  启用的功能（备注：disable_resolution_rebuild 功能用于控制当时间范围为1个月时，日期刻度是否都是每个月1号
							'dont_show_boolean_study_arguments', 'hide_last_na_study_output', 'move_logo_to_main_pane',
							'same_data_requery', 'side_toolbar_in_fullscreen_mode', 'disable_resolution_rebuild'
						],
						charts_storage_url: 'http://saveload.tradingview.com',
						charts_storage_api_version: "1.1",
						toolbar_bg: "transparent",
						timezone: "Asia/Shanghai",
						studies_overrides: {
							'volume.precision': '1000'
						},
						overrides: _this.overrides()
					});

					widget.MAStudies = [];
					widget.selectedIntervalButton = null;
					// widget.setLanguage('en')
					widget.onChartReady(function() { //图表方法
						// document.getElementById('trade-view').childNodes[0].setAttribute('style', 'display:block;width:100%;height:100%;');
						//let that =this

						widget.chart().createStudy('Moving Average', false, true, [15,'close', 0],null,{'Plot.color':'#e843da'});
						widget.chart().createStudy("MA Cross", false, false, [10, 20]);
						let buttonArr = [
							{
								value: "1min",
								period: "1",
								text: "Time",
								chartType: 3,
								type:"1min"
							},
							{
								value: "1",
								period: "1m",
								text: "1min",
								chartType:1,
								type:"1min"
							},
							{
								value: "5",
								period: "5m",
								text: "5min",
								chartType: 1,
								type:"5min"
							},
							{
								value: "15",
								period: "15m",
								text: "15min",
								chartType: 1,
								type:"15min"
							},
							{
								value: "30",
								period: "30m",
								text: "30min",
								chartType:1,
								type:"30min"
							},
							{
								value: "60",
								period: "60分钟",
								text: "1hour",
								chartType: 1,
								type:"60min"
							},
							{
								value: "1D",
								period: "1D",
								text: "1day",
								chartType: 1,
								type:"1day"
							},
							{
								value: "1W",
								period: "1W",
								text: "1week",
								chartType:1,
								type:"1week"
							}, {
								value: "1M",
								period: "1M",
								text: "1mon",
								chartType: 1,
								type:"1mon"
							}
						];
						let btn = {};
						let nowTime = '';
						buttonArr.forEach((v, i) => {
							// console.log(v)
							let  button=widget.createButton()
							button.attr('title',v.text)
								.addClass("my2")
								.text(v.text)

							if(v.text=='1min'){
								if(_this.loctheme=='white'){
								    button.css({"background-color":"#e5ebf5",'color':'#9ca9b5'})
								}else{
								    button.css({"background-color":"#2c3b59",'color':'#c7cce6'})
								}
								localStorage.setItem('tim','1')  //默认为1分钟
								localStorage.setItem('type2','1min')  //默认为1分钟
							}

							// console.log($(this),'999999')
							btn = button.on("click", function (e) {
								$(this).parents(".left").children().find(".my2").removeAttr("style"); //去掉1分钟的
								handleClick(e, v.value,v.type);

								widget.chart().setChartType(v.chartType); //改变K线类型
							});

						});
						let handleClick = (e, value,type) => {
							_this.setSymbol = function(symbol,value){
								gh.chart().setSymbol(symbol,value);
							};
							localStorage.setItem('tim',value)
							localStorage.setItem('type2',type)
							widget.chart().setResolution(value,function onReadyCallback(){});  //改变分辨率

							$(e.target)
								.addClass("mydate")
								.closest("div.space-single")
								.siblings("div.space-single")
								.find("div.button")
								.removeClass("mydate")
						};

					});


					_this.widget = widget;
				})
			},
			createFeed(){
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

							var datesRangeRight = parseInt((new Date().valueOf()) / 1000);
							

							//	BEWARE: please note we really need 2 bars, not the only last one
							//	see the explanation below. `10` is the `large enough` value to work around holidays
							var datesRangeLeft = datesRangeRight - that.periodLengthSeconds(resolution, 10);

							that._requestsPending++;

							(function(_subscriptionRecord) { // eslint-disable-line
								that._datafeed.getBars(_subscriptionRecord.symbolInfo, resolution, datesRangeLeft, datesRangeRight, function(bars) {
										that._requestsPending--;

										//	means the subscription was cancelled while waiting for data
										if (!that._subscribers.hasOwnProperty(listenerGUID)) {
											return;
										}

										if (bars.length === 0) {
											return;
										}

										var lastBar = bars[bars.length - 1];
										if (!isNaN(_subscriptionRecord.lastBarTime) && lastBar.time < _subscriptionRecord.lastBarTime) {
											return;
										}

										var subscribers = _subscriptionRecord.listeners;

										//	BEWARE: this one isn't working when first update comes and this update makes a new bar. In this case
										//	_subscriptionRecord.lastBarTime = NaN
										var isNewBar = !isNaN(_subscriptionRecord.lastBarTime) && lastBar.time > _subscriptionRecord.lastBarTime;

										//	Pulse updating may miss some trades data (ie, if pulse period = 10 secods and new bar is started 5 seconds later after the last update, the
										//	old bar's last 5 seconds trades will be lost). Thus, at fist we should broadcast old bar updates when it's ready.
										if (isNewBar) {
											if (bars.length < 2) {
												throw new Error('Not enough bars in history for proper pulse update. Need at least 2.');
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
									});
							})(subscriptionRecord);
						}
					};

					if (typeof updateFrequency != 'undefined' && updateFrequency > 0) {
						setInterval(update, updateFrequency);
					}
				};

				Datafeed.DataPulseUpdater.prototype.periodLengthSeconds = function(resolution, requiredPeriodsCount) {
					var daysCount = 0;

					if (resolution === 'D') {
						daysCount = requiredPeriodsCount;
					} else if (resolution === 'M') {
						daysCount = 31 * requiredPeriodsCount;
					} else if (resolution === 'W') {
						daysCount = 7 * requiredPeriodsCount;
					} else {
						daysCount = requiredPeriodsCount * resolution / (24 * 60);
					}

					return daysCount * 24 * 60 * 60;
				};

				Datafeed.DataPulseUpdater.prototype.subscribeDataListener = function(symbolInfo, resolution, newDataCallback, listenerGUID) {
					this._datafeed._logMessage('Subscribing ' + listenerGUID);

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

				Datafeed.DataPulseUpdater.prototype.unsubscribeDataListener = function(listenerGUID) {
					this._datafeed._logMessage('Unsubscribing ' + listenerGUID);
					delete this._subscribers[listenerGUID];
				};

				Datafeed.Container = function(updateFrequency){
					this._configuration = {
						supports_search: false,
						supports_group_request: false,
						supported_resolutions: ['1', '3', '5', '15', '30', '60', '120', '240', '360', '720', '1D', '3D', '1W', '1M'],
						supports_marks: true,
						supports_timescale_marks: true,
						exchanges: ['gh']
					};

					this._barsPulseUpdater = new Datafeed.DataPulseUpdater(this, updateFrequency || 10 * 1000);
					// this._quotesPulseUpdater = new Datafeed.QuotesPulseUpdater(this);

					this._enableLogging = true;
					this._callbacks = {};

					this._initializationFinished = true;
					this._fireEvent('initialized');
					this._fireEvent('configuration_ready');
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
						// console.log("CHART LOGS: "+now.toLocaleTimeString() + '.' + now.getMilliseconds() + '> ' + message);
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
					}
					else {
						this.on('configuration_ready', function() {
							callback(that._configuration);
						});
					}
				};

				Datafeed.Container.prototype.resolveSymbol = function(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
					this._logMessage("GOWNO :: resolve symbol "+ symbolName);
					Promise.resolve().then(() => {
						// console.log(this_vue.priceScale,'12345s313123122adaslast')


						// this._logMessage("GOWNO :: onResultReady inject "+'AAPL');
						// console.log(this_vue.priceScale,'123stf')
						onSymbolResolvedCallback({
							"name": this_vue.symbol,
							"timezone": "Asia/Shanghai",
							"pricescale": this_vue.priceScale,
							"minmov": 1, //minmov(最小波动), pricescale(价格精度), minmove2, fractional(分数)
							"minmov2": 0,//这是一个神奇的数字来格式化复杂情况下的价格。
							"ticker": this_vue.symbol,
							"description": "",
							"type": "bitcoin",
							"volume_precision": 8,
							// "exchange-traded": "sdt",
							// "exchange-listed": "sdt",
							//现在，这两个字段都为某个交易所的略称。将被显示在图表的图例中，以表示此商品。目前此字段不用于其他目的。
							"has_intraday": true,
							"has_weekly_and_monthly": true,
							"has_no_volume": false, //布尔表示商品是否拥有成交量数据。
							'session': '24x7',
							'supported_resolutions': ['1', '3', '5', '15', '30', '60', '120', '240', '360', '720', '1D', '3D', '1W', '1M']

						});
					})
				};


				//初始化数据
				Datafeed.Container.prototype.getBars = function(symbolInfo, resolution, rangeStartDate, rangeEndDate, onHistoryCallback, onErrorCallback) {
					// if (rangeStartDate > 0 && (rangeStartDate + '').length > 10) {
					//   throw new Error(['Got a JS time instead of Unix one.', rangeStartDate, rangeEndDate]);
					// }

					if(resolution.indexOf('D')==-1&&resolution.indexOf('W')==-1&&resolution.indexOf('M')==-1){
						resolution=resolution+'min'
					}else if(resolution.indexOf('W')!=-1||resolution.indexOf('M')!=-1){
						resolution=resolution
					}
					$.ajax({
						url:'/api/currency/new_timeshar?' +
						// url:'http://ice.adminchao.com/api/currency/new_timeshar?' +
						'from='+rangeStartDate+'&to='+rangeEndDate+'&symbol='+symbolInfo.name+'&period='+resolution,
						type:'get',
						success: function(res){
							if(res.code==1&&res.data&&res.data.length>0){
								res.data.forEach((item,i)=>{
									item.open=Number(item.open)
									item.close=Number(item.close)
									item.high=Number(item.high)
									item.low=Number(item.low)
								})
								onHistoryCallback(res.data,{noData:false})
								onHistoryCallback([],{noData:true})
							}
							if(!res.data||res.code==-1){
								onHistoryCallback([],{noData:true})
							}
							if(res.data&&res.data.length==0){
								onHistoryCallback([],{noData:true})
							}

						}
					})

				};
				//实时数据
				Datafeed.Container.prototype.subscribeBars = function(symbolInfo, resolution, onRealtimeCallback, listenerGUID, onResetCacheNeededCallback) {
					this_vue.fnData=onRealtimeCallback;
					this_vue.connect(onRealtimeCallback)
					//this._barsPulseUpdater.subscribeDataListener(symbolInfo, resolution, onRealtimeCallback, listenerGUID, onResetCacheNeededCallback);
				};

				Datafeed.Container.prototype.unsubscribeBars = function(listenerGUID) {

					this._barsPulseUpdater.unsubscribeDataListener(listenerGUID);

				};

				return new Datafeed.Container;
			},
			updateData(data) {
				if (data) {
					this.$emit('real-time', data);
				}
			},

			updateWidget(item) {
				this.symbolInfo = {
					name: item,
					ticker: item,
					description: "",
					session: "24x7",
					supported_resolutions: ['1', '5', '15', '30', '60', '240', '1D', '3D', '1W', '1M'],
					has_intraday: true,
					has_daily: true,
					has_weekly_and_monthly: true,
					timezone: "UTC",
				}

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
				return{
					'volumePaneSize': "medium", //large, medium, small, tiny
					'paneProperties.topMargin':'20',
					"scalesProperties.lineColor": style.text,
					"scalesProperties.textColor": style.text,
					"paneProperties.background": style.bg,//改变背景色的重要代码
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
					"mainSeriesProperties.areaStyle.linecolor": style.border,
					"mainSeriesProperties.areaStyle.linewidth": 1,
					"mainSeriesProperties.areaStyle.priceSource": "close"
				}
				// this.sty2()
			},


			chose(){
				// console.log(this.widget,'000')
				this.widget.setLanguage('en') //设置语言

				// this.$store.commit('symbol','sdt')
				// this.$store.state.symbol='sdt6456' //切换交易对
			}
		},


	}
</script>



// WEBPACK FOOTER //
// src/view/tv.vue