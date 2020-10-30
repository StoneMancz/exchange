<template>
  <div class="main-wraps">
    <div class="bg-part wrap-wraps">
      <p class="flex tc ptb10 bdb ft14">
        <span class="flex1">{{$t('td.num')}}</span>
        <span class="flex1">{{$t('coin.profit')}}</span>
        <span class="flex1">{{$t('coin.cuntime')}}</span>
        <span class="flex1">{{$t('coin.endtine')}}</span>
        <span class="flex1">{{$t('fat.status')}}</span>
      </p>
      <ul>
        <li class="flex tc ptb10 bdb" v-for="item in log_list">
          <span class="flex1">{{item.balance}}</span>
          <span class="flex1">{{item.profit_balance}}</span>
          <span class="flex1">{{item.created_at}}</span>
          <span class="flex1">{{item.end_time}}</span>
          <span :class="['flex1',{'redColor':item.status==1}]">{{item.status_name}}</span>
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
            more:'加载更多',
            page:1,
            limit:20,
            log_list:[]
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
            this.$ajax({
                url: '/api/'+'record/lists',
                method:'post',
                data:{limit:this.limit,page:this.page},  
                headers: {'Authorization':  localStorage.getItem('token')},    
            }).then(res=>{
                layer.close(i);
                if(res.data.type=="ok"){
                    this.log_list = this.log_list.concat(res.data.message.data);
                    if(res.data.message.data.length == 0){
                        this.more = this.$t('td.nodata')
                    }
                    if(res.data.message.data.length<this.limit){
                        this.more = this.$t('td.nomore')
                    }else if(res.data.message.data.length==this.limit){
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
        }
        
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
</style>



// WEBPACK FOOTER //
// src/view/manageList.vue