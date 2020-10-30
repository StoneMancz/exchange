<template>
    <div class="detail">
        <div class="title fColor1 topshadow">
            <div class="inblock">
                <span>{{$t('lever.nowentrust')}}</span>
            </div>
            <div class="inblock fr">
                <span class="all" @click="links">{{$t('lever.lvchi')}}</span>
                <!-- <span class="all" @click="all">{{$t('lever.all')}}</span> -->
                <span class="all" @click="recordList">{{$t('lever.tdrecord')}}</span>
            </div>
        </div>
        <div class="content">
            <ul class="list-title fColor2 ft12 bdb clear">
                <li class="fl w12">{{$t('td.time')}}</li>
                <li class="fl w12">{{$t('lever.type')}}</li>             
                <li class="fl w12">{{$t('cuy.price')}}</li>
                <li class="fl w8">{{$t('lever.tdnum')}}</li>
                <li class="fl w8">{{$t('lever.loss')}}</li>
                <li class="fl w8">{{$t('lever.styPrice')}}</li>
                <li class="fl w8">{{$t('lever.stsPrice')}}</li>
                <li class="fl w8">{{$t('td.do')}}</li>
            </ul>
            <div class="containers scroll" v-if="deList.length>0">
                <ul v-for="(itm,index) in deList" :key="index" class="list-item fColor1 ft12">
                    <li class="clear">
                        <span class="fl w12">{{itm.time}}</span>
                        <span class="f1 w12">{{itm.type == 1? $t('td.buyin'):$t('td.sellout')}} </span>                     
                        <span class="fl w12">{{itm.price | tofixedFour}}</span>
                        
                        <span class="fl w8">{{itm.number | tofixed}}</span>
                        <span :class="['red','width1',{'green':itm.profits > 0}]"
                            >{{itm.profits || '0.00' | tofixedFour}}</span>
                            <span class="width1">{{itm.target_profit_price || '0.00' | tofixedFour}}</span>
                        <span class="width1">{{itm.stop_loss_price || '0.00' | tofixedFour}}</span>
                        <button type="button" v-if="itm.status == 0" @click="cannelOrder(index,itm.id)">{{$t('lever.revoke')}}</button>
                        <button type="button" v-if="itm.status == 1" @click="closePosition(index,itm.id)">{{$t('lever.ping')}}</button>
                    </li>
                </ul>
            </div>
            <div class="no_data tc" v-if="deList.length<=0">
                <img src="../../assets/images/nodata.png" alt="">
                <p class="fColor2 ft18">{{$t('td.nodata')}}</p>   
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"detail",
    data (){
        return{
            address:'',
            isChoosed:2,
            new:false,
            wayList:[this.$t('td.buyin'),this.$t('td.sellout'),this.$t('td.all')],
            deList:[],
            legal_id:'',
            currency_id:'',
			setInterVar:null,
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
    },
  },
  destroyed(){
      clearInterval(this.setInterVar);
  },
    created(){
        this.address = localStorage.getItem('address') || '';
        this.legal_id=localStorage.getItem('legal_id');
        this.currency_id=localStorage.getItem('currency_id');
        var that = this;
		that.setInterVar=setInterval(()=>{
            that.complete(that.legal_id,that.currency_id);
        },3000) 
        that.complete(this.legal_id,this.currency_id);
        eventBus.$on('to_leverExchange',function(data){
            if(data){
                that.complete(localStorage.getItem('legal_id'),localStorage.getItem('currency_id'));
            }
        })
    },
    methods:{
        wayChoosed(index){
            this.isChoosed=index;
        },
         //我的交易记录
        complete(legals_id,currencys_id){
            this.$http({
                        url: '/api/'+'lever/deal',
                        method:'post',
                        data:{
                            legal_id:legals_id,
                            currency_id:currencys_id
                        },  
                        headers: {'Authorization':  localStorage.getItem('token')},    
                    }).then(res=>{
                        // layer.close(i);
                        if(res.data.type == "ok"){
                           this.deList = res.data.message.my_transaction;
                        //    this.connect();
                        }else{
                            // layer.msg(res.data.message)
                        }
                    }).catch(error=>{
                        // console.log(error)
                    })
        },
        // connect(){
        //     var that = this;
        //      that.$socket.emit("login", localStorage.getItem('user_id'));
        //     that.$socket.on('deal_list',function(msg){
        //         if(msg.type == 'deal_list'){
        //             var complete = JSON.parse(msg.complete);
        //             console.log(complete);
        //             that.deList = complete;
        //         }
        //         console.log(msg);
        //     })
        // },
        all(){
            this.$router.push({name:'allTransaction'})
        },
        // 杠杆持仓
        links(){
            this.$router.push({name:'leverTransactions'})
        },
        // 跳转交易记录
        recordList(){
           this.$router.push({name:'leverList'}) 
        },
        // 平仓
        closePosition(index,ids) {
        let that = this;
        layer.confirm(that.$t('lever.sureping'),{skin:'confirmCancel'}, function() {
            var i = layer.load();
            that
            .$http({
                url: "/api/" + "lever/close",
                method: "post",
                data: {
                id: ids
                },
                headers: { Authorization: localStorage.getItem("token") }
            })
            .then(res => {
                layer.close(i);
                if (res.data.type == "ok") {
                layer.msg(res.data.message);
                that.deList.splice(index,1);
                } else {
                layer.msg(res.data.message);
                }
            })
            .catch(error => {
                layer.close(i);
                console.log(error);
            });
        });
        },
        // 撤单
        cannelOrder(index,ids) {
        let that = this;
        layer.confirm(that.$t('lever.revokeOrder'), {skin:'confirmCancel'}, function() {
            var i = layer.load();
            that
            .$http({
                url: "/api/" + "lever/cancel",
                method: "post",
                data: {
                id: ids
                },
                headers: { Authorization: localStorage.getItem("token") }
            })
            .then(res => {
                layer.close(i);
                if (res.data.type == "ok") {
                layer.msg(res.data.message);
                that.deList.splice(index,1);
                } else {
                layer.msg(res.data.message);
                }
            })
            .catch(error => {
                layer.close(i);
                console.log(error);
            });
        });
        }
      },
    mounted(){
        var that = this;
        
        
        // this.currency_id=localStorage.getItem('currency_id');
        //   eventBus.$on('toTrade0', function (data0) {
        //         that.currency_id=data0.currency_id
        //         that.legal_id=data0.legal_id
        //         that.complete(data0.legal_id,data0.currency_id)
        //   });
        //    eventBus.$on('toTrade', function (data0) {
        //         that.currency_id=data0.currency_id
        //         that.legal_id=data0.legal_id
        //         that.complete(data0.legal_id,data0.currency_id)
        //   })
        eventBus.$on('buyTrade', function (data) {
            // that.connect();
        });
       
    }

    
}
</script>
<style scoped>
.red{
    color: #cc4951;
    cursor: pointer;
}
.title{height: 48px;line-height: 46px;padding: 0 40px 0 30px;}
.tab_title{display: inline-block;line-height: 46px;height: 46px;}
.tab_title span{cursor: pointer;}
.tab_title span:not(:last-child) {margin-right: 40px;}
.content{padding: 0 40px 0 30px;height: 330px;}
.list-title{line-height: 40px;height: 40px;
    display: flex;
    flex-direction: row;
    white-space: nowrap;
    overflow: hidden;}
.list-title li{
    width: 12.5%;
    /* width: 23.3%; */
    text-align: center;
    
}

.no_data{padding: 50px 0;}
.containers{height: 260px;overflow: auto;}
.list-item li{line-height: 45px; display: flex;}
.list-item li span{display: block; float: left;width: 12.5%; /*width: 23.3%;*/text-align: center;}
.list-item li button{
    border-radius: 3px;
    color: white;
    background-color: #638bd4;
    cursor: pointer;
    min-height: 33px;
    min-width: 80px;
    font-size: 14px;
    border: none;
    padding: 0 5px;
    line-height: 33px;
    text-align: center;
    margin-top: 10px;
    height: 20px;
    line-height: 20px;    
}
.list-item li:hover{background-color: rgba(46,55,83,.4)}
.list-item li span.green{color: #12b886}
.all{
    cursor: pointer;
    color: #7a98f7;
    margin-left: 10px;
}
</style>





// WEBPACK FOOTER //
// src/view/lever/lever_transaction.vue