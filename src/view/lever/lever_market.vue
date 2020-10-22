<template>
    <div class="market" >
		<div class="m_title  clear fColor1">
            <span class="fff fl">市场</span>
            <div class="m_search fr">
               <input type="text" class="fColor1">
               <img src="../../assets/images/search.png" alt="">
            </div>
        </div>
        <div class="m_filter">
            <div class="tabtitle fColor1 ft14 curPer flex around">
                <!-- <span class="active">JNB</span> -->

                <!-- <span class="active">USDT</span>
                <span>JNB</span>
                <span>JNB</span> -->
                <span v-for="(tab,index) in tabList " :key="index" :class="index==index1?'active':''"  @click="changeType(index,tab.name,tab.id)">{{tab.name}}</span>
            </div>
        </div>
        <div class="coin-title clear">
            <div>
                <span>币种</span>
                <img src="../../assets/images/select0.png" alt="">
            </div>
            <div>
                <span>最新价</span>
                <img src="../../assets/images/select0.png" alt="">
            </div>
            <div>
                 <span>涨幅</span>
                <img src="../../assets/images/select0.png" alt="">
            </div>
        </div>
        <div class="line"></div>
        <ul class="coin-wrap scroll">
            <!-- <li>
                <span v-for="item in newData">{{item}}</span>
            </li> -->
            <li class="currency_p" v-for="(market,index) in marketList "  :key="index" v-show="index1 == index" >
              <p  v-for="(itm,idx) in market" :key="itm.id" :class="idx==index2?'active_p':''" :data-id='itm.id' :data-index='idx' @click="quota_shift(idx,itm.id,itm.name)">
                <span>{{itm.name}}</span>
                <span :data-name='tabList[index].name+"/"+itm.name'>${{itm.last_price}}</span>
                <span :class="{'green':itm.proportion>=0}">{{itm.proportion>=0?('+'+(itm.proportion-0).toFixed(2)):(itm.proportion-0).toFixed(2)}}%</span>
                </p>
            </li>
            
        </ul>
	</div>
</template>

<script>
    export default {
        name: "market",
        data (){
            return{
                ids:0,
                isShow:0,
                tabList:[],
                marketList:[],
                newData:['FABCOIN', "$0.076128",'-1.11%'],
                legal_index:this.$route.params.legal_index,
                currency_index:this.$route.params.currency_index,
                tradeDatas:'',
                index2:0,
                index1:0,
                legal_id:window.localStorage.getItem('legal_id'),
                currency_id:window.localStorage.getItem('currency_id'),
                selectedId:''
            }
        },
        created:function(){
                if(window.localStorage.getItem('index02')&&window.localStorage.getItem('index01')){
                    this.index2= window.localStorage.getItem('index02');
                    this.index1=window.localStorage.getItem('index01')
                }
        },
        mounted(){
            var that =this;
            eventBus.$on('toNew01', function (data) {
               if(data){
                    var newprice=data.newprice;
                    var cname=data.istoken;
                    var newup=data.newup;
                    if(newup>=0){
                        newup="+"+Number(newup*100).toFixed(2)+'%';
                        $("span[data-name='"+cname+"']").next().css('color','#12b886')
                    }else{
                        newup=newup+'%';
                        $("span[data-name='"+cname+"']").next().css('color','#cc4951')
                    }
                    $("span[data-name='"+cname+"']").html('$'+newprice).next().html(newup);
               }
            }); 
           

        },
        methods:{
            changeType(index,currency,currency_id){
                this.index1=index;
                this.index2=null; 
               $('.currency_p p').removeClass('active_p')
               this.isShow=index;
               this.ids = 'a';
               this.currency_name = currency;
               this.currency_id = currency_id;
            },
            getSymbols(callback){
                if(this.address.length<=0){
                    return false;
                }
                this.$ajax({
                    url:'/api/'+'wallet/list?user_id='+this.address||'',
                    type:'GET'
                }).then(res=>{
                    // console.log(res)
                    if(res.data.type=='ok'){
                        this.accountInfo=res.data.message;
                        this.dataList=res.data.message.list;
                        // console.log(this.dataList)
                        callback && callback();
                    }else{
                        // console.log(123)
                        // alert(res.message)
                    }  
                }).catch(error=>{
                    return error
                })
            },
            init(){
                // var index=layer.load();
                this.address = localStorage.getItem('address') || '';
                this.$ajax({
                    url: '/api/'+'quotation_new',
                    method:'post',
                    headers: {'Authorization':  localStorage.getItem('token')}, 
                }).then(res=>{
                    // layer.close(index);
                    // console.log(res)
                     if(res.data.type=="ok"){
                         this.getSymbols(()=>{
                            this.marketList=res.data.message.coin_list;
                            // console.log(res.data.message.coin_list)
                            for(var i in this.dataList){
                                for(var j in this.marketList){
                                    if(this.dataList[i].name == this.marketList[j].symbol){
                                        // console.log(1)
                                        this.marketList[j].type=this.marketList[j].type||1
                                    }else{
                                        this.marketList[j].type=this.marketList[j].type||0
                                    }
                                }
                            }
                         })
                         
                    }else{
                        // layer.msg(res.data.message)
                    }
                    
                }).catch(error=>{
                    console.log(error)
                })
            
            },
            //币种切换
            quota_shift(idx,id,legal_name){
                window.localStorage.setItem('index01',this.index1);
                window.localStorage.setItem('index02',idx);
               this.ids = idx;
               var tradeDatas = {
                   currency_id:this.currency_id,
                   legal_id:id,
                   currency_name:this.currency_name,
                   leg_name:legal_name
               }
               window.localStorage.setItem('lever_legal_id',id);
               window.localStorage.setItem('lever_currency_id',this.currency_id);
               window.localStorage.setItem('lever_legal_name',legal_name);
               window.localStorage.setItem('lever_currency_name',this.currency_name);
               location.reload()
            },
            //socket连接封装
					socket(token) {
						let that = this;
						$.ajax({
							url: _API + "user/info",
							type: "GET",
							dataType: "json",
							async: true,
							beforeSend: function beforeSend(request) {
								request.setRequestHeader("Authorization", token);
							},
							success: function success(data) {
								if (data.type == 'ok') {
									var socket = io(socket_api);
									socket.on('connect', function(datas) {
										socket.emit('login', data.message.id);
										// 后端推送来消息时
										socket.on('daymarket', function(msg) {
											if (msg.type == 'daymarket') {
												if (that.selectId && (that.selectId == msg.legal_id)) {
													// now_price
													let lists = that.detailList.quotation;
													for(i in lists){
														if(lists[i].currency_id == msg.currency_id){
															that.detailList.quotation[i].volume=msg.volume;
															that.detailList.quotation[i].now_price=msg.now_price;
															that.detailList.quotation[i].change=msg.change;
														}
													}
												}
											}
										});
									});
								}
							}
						});
					}
            

        },
        
    }
</script>

<style scoped>
.m_title{height: 55px;padding: 15px 30px;line-height: 25px;position: relative;}
.m_search input{border-radius: 3px;background: transparent;border: 1px solid #2e3753;line-height: 25px;}
/* .m_search{position: absolute;width: 146px;right: 20px;top: -4px;height: 26px;border-radius: 3px;padding: 4px 8px 4px 0;} */
/* .m_search input{position: absolute;left: 0;top: 10px;z-index: 2;width: 100%;padding: 5px 40px 5px 8px;height: 26px;border-radius: 3px;background: transparent;border: 1px solid #2e3753;} */
.m_search img{width: 16px;height: 15px;position: absolute;right: 35px;top: 20px;z-index: 123;}
.m_filter{padding: 10px 0 15px;}
.tabtitle span {text-align: center;padding: 0 10px;}
.coin-title div{width: 33.3%;height: 36px;line-height: 36px;background-color: #1a243b;text-align: center;float: left;color: #637085;font-size:12px;}
.coin-title img{vertical-align: middle;margin-top: -3px;}
.line{width: 90%;margin: 0px auto;border-bottom: 1px solid #2e3753;}
.coin-wrap{height: 395px;overflow: auto;background-color: #1a243b;}
.coin-wrap li{height: 30px;line-height: 30px;cursor: pointer;font-size: 12px;color: #cdd6e4;}
.coin-wrap li span{display: block;width: 33%;float: left;text-align: center;}
.coin-wrap li span:last-child{color: #cc4951;}
.coin-wrap li:nth-child(odd){background-color: #1a243b;}
.coin-wrap li span.green{color: #12b886;}
.coin-wrap li p{
    overflow: hidden;
}
.active_p{
    background-color: rgba(46,55,83,.4);
}
.coin-wrap li p:hover{background-color: rgba(46,55,83,.4);}
</style>



// WEBPACK FOOTER //
// src/view/lever/lever_market.vue