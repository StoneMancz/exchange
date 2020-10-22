<template>
  <div class="main-wraps">
    <div class="bg-part wrap-wraps plr20">
      <!-- <p class="flex tc ptb10 bdb ft14">
        <span class="flex1">账号</span>
        <span class="flex1">收益</span>
        <span class="flex1">返佣</span>
        <span class="flex1">充币记录</span>
        <span class="flex1">提币记录</span>
      </p> -->
      <div class="ptb30">
        <div class="flex tc radius10 color80 w80 alcenter mauto bd" style="width:60%">
          <div class="flex1 bdf8 ralt10 ptb10" style="border-right:1px solid #2e3753">
            <span>{{$t('team.ztnum')}}</span>
            <div class="mt10 ft16 blue">{{zt_count}}</div>
          </div>
          <div class="flex1 bdf8 rart10 ptb10">
            <span>{{$t('team.activenum')}}</span>
            <div class="mt10 ft16 blue">{{team_count}}</div>
          </div>
        </div>
      </div>
      <ul class="ft14">
        <li class="" v-for="(item,index) in log_list">
          <div class="flex tc ptb10 bdb alcenter">
            <div class="flex1">
              <span>{{$t('login.account')}}</span>
              <p class="flex1 mt5">{{item.account}}</p>
            </div>
            <div class="flex1">
              <span>{{$t('team.profit')}}</span>
              <p class="flex1 mt5">{{item.profit_balance}}</p>
            </div>
            <div class="flex1">
              <span>{{$t('team.back')}}</span>
              <p class="flex1 mt5">{{item.return_commission}}</p>
            </div>
            <div class="flex1">
              <span>活跃用户</span>
              <p class="flex1 mt5">{{item.active_users}}</p>
            </div>
            <div class="flex1 blue">
              <span class="pointer" @click="record(index,item.id,'wallet_in')">{{$t('team.cblog')}}</span>
              <span class="pointer" @click="record(index,item.id,'wallet_out')">{{$t('team.bblog')}}</span>
            </div>
          </div>
          <div class="bgList bd" v-if="current==index">
            <p class="flex plr20 ptb10 ft12 bd" v-if="type=='wallet_in'">
              <span class="flex1">{{$t('td.num')}}</span>
              <span class="flex1 tc">{{$t('login.account')}}</span>
              <span class="flex1 tc">{{$t('ctc.detail')}}</span>
              <span class="flex1 tr">{{$t('td.time')}}</span>
            </p>
            <ul v-if="type=='wallet_in'">
              <li class="flex alcenter plr20 ptb10 ft12 bd" v-for="item in recordList">
                <span class="flex1">{{item.value}}</span>
                <span class="flex1 tc">{{item.balance_type_name}}</span>
                <span class="flex1 tc">{{item.info}}</span>
                <span class="flex1 tr">{{item.created_time}}</span>
              </li>
            </ul>
            <p class="flex plr20 ptb10 ft12 bd" v-if="type=='wallet_out'">
              <span class="flex1">{{$t('cuy.direction')}}</span>
              <span class="flex1 tc">{{$t('cuy.price')}}</span>
              <span class="flex1 tc">{{$t('td.num')}}</span>
              <span class="flex1 tc">{{$t('asset.ratenum')}}</span>
              <span class="flex1 tr">{{$t('td.time')}}</span>
            </p>
            <ul v-if="type=='wallet_out'">
              <li class="flex alcenter plr20 ptb10 ft12 bd" v-for="item in recordList">
                <span :class="['flex1 redColor',{'green':item.type=='in'}]">{{item.type=='in'?'买入':'卖出'}}</span>
                <span class="flex1 tc">{{item.price}}({{item.legal_name}})</span>
                <span class="flex1 tc">{{item.number}}({{item.currency_name}})</span>
                <span class="flex1 tc">{{item.type=='out' ? item.out_fee : item.in_fee}}</span>
                <span class="flex1 tr">{{item.time}}</span>
              </li>
            </ul>
            <div class="ptb30 tc" v-show="recordList.length==0">
              {{$t('td.nodata')}}
            </div>
          </div>
        </li>
      </ul>
       <p class="tc more ptb10 ft12" @click="getMore">{{more}}</p>
    </div>
  </div>
</template>
<script>
export default {
    name:'manageList',
    data(){
        return {
            current:-1,
            more:'加载更多',
            page:1,
            limit:20,
            log_list:[],
            type:'',
            recordList:[],
            zt_count:0,
            team_count:0
        }
    },
    filters: {
    toFixeds: function(value) {
      value = Number(value);
      return value.toFixed(2);
    }
  },
    created(){

    },
    mounted(){
        this.init();
    },
    methods:{
        init(){
            var i = layer.load();
            this.$http({
                url: '/api/'+'user/my_team',
                data:{limit:this.limit,page:this.page},  
                headers: {'Authorization':  localStorage.getItem('token')},    
            }).then(res=>{
                layer.close(i);
                if(res.data.type=="ok"){
                  this.zt_count = res.data.message.zt_count;
                  this.team_count = res.data.message.team_count;
                  this.log_list = this.log_list.concat(res.data.message.team.data);
                  if(res.data.message.team.data.length == 0){
                      this.more = this.$t('td.nodata')
                  }
                  if(res.data.message.team.data.length<this.limit){
                      this.more = this.$t('td.nomore')
                  }else if(res.data.message.team.data.length==this.limit){
                      this.more = this.$t('td.more')
                  }
                }else{
                    layer.msg(res.data.message)
                }
            }).catch(error=>{
                // console.log(error)
            })
        },
        getMore(){
            this.more = '加载中...'
            this.page+=1;
            this.init();
        },
        record(index,id,type){
          if(index==this.current&&type==this.type){
            this.current = -1;
            return;
          }
          if(type!=this.type || index!=this.current){
            this.page = 1;
          }
          this.current = index;
          this.type = type;
          this.getLog(id,type);
        },
        getLog(uid,type){
            var i = layer.load();
            this.$http({
                url: '/api/'+'user/log',
                method:'post',
                data:{limit:this.limit,page:this.page,user_id:uid,type:type},  
                headers: {'Authorization':  localStorage.getItem('token')},    
            }).then(res=>{
                layer.close(i);
                if(res.data.type=="ok"){
                  if(this.page==1){
                    this.recordList = res.data.message.data;
                  }else{
                    this.recordList = this.recordList.concat(res.data.message.data);
                  }
                }else{
                    layer.msg(res.data.message)
                }
            }).catch(error=>{
                // console.log(error)
            })
        },
        
    }
}
</script>
<style scoped>
  .main-wraps{
    padding: 30px 50px;
  }
    .wrap-wraps{
      max-width: 1000px;
      margin: 0 auto;
      min-height: 700px;
    }
    .ptb10{
      padding: 10px 0;
    }
    .mt5{
      margin-top: 5px;
    }
    .plr20{
      padding-left: 20px;
      padding-right: 20px;
    }
    .bgList{
      background: #171c2b;
    }
    .ptb30{
      padding-top: 30px;
      padding-bottom: 30px;
    }
    .green{
      color: #12b886;
    }
</style>




// WEBPACK FOOTER //
// src/view/team.vue