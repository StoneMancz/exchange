<template>
  <div id="legal-record" class="whites">
    <div class="title bgf8">{{$t('fat.orderLog')}}</div>
    <div class="filter-box">
      <!-- <div>
        <span>交易类型：</span>
        <span :class="{'select':filterPms.type == 'sell'}" @click="filterPms.type = 'sell';getList()">购买</span>
        <span :class="{'select':filterPms.type  == 'buy'}" @click="filterPms.type  = 'buy';getList()">出售</span>
      </div> -->
      <div>
        <span>{{$t('fat.odStatus')}}：</span>
        <span :class="{'select':filterPms.isSure == 0}" @click="filterPms.isSure = 0;getList()">{{$t('td.nofinish')}}</span>
        <span :class="{'select':filterPms.isSure == 1}" @click="filterPms.isSure = 1;getList()">{{$t('td.finished')}}</span>
        <span :class="{'select':filterPms.isSure == 2}" @click="filterPms.isSure = 2;getList()">{{$t('td.ceiled')}}</span>
        <span :class="{'select':filterPms.isSure == 3}" @click="filterPms.isSure = 3;getList()">{{$t('td.payed')}}</span>
         <span :class="{'select':filterPms.isSure == 4}" @click="filterPms.isSure = 4;getList()">{{$t('fat.protection')}}</span>
      </div>
    </div>
    
    <ul class="bgf8">
      <li v-for="(item,index) in list" :key="index" class="bod_bc bdb pdtb5">
        <div class="flex li-t pdtb5">
          <div>
            <span v-if="item.type == 'sell'">购买</span>
            <span v-else>出售</span>
            <span>{{item.currency_name}}</span>
          </div>
          <div class="status">
            <router-link :to="{path:'/shopLegalPayDetail',query:{id:item.id}}" v-if="item.is_sure == 0">{{$t('td.nofinish')}} ></router-link>
            <router-link :to="{path:'/shopLegalPayDetail',query:{id:item.id}}" v-else-if="item.is_sure == 1">{{$t('td.finished')}} ></router-link>
            <router-link :to="{path:'/shopLegalPayDetail',query:{id:item.id}}" v-else-if="item.is_sure == 2">{{$t('td.ceiled')}} ></router-link>
            <router-link :to="{path:'/shopLegalPayDetail',query:{id:item.id}}" v-else-if="item.is_sure == 3">{{$t('td.payed')}} ></router-link>
            <router-link :to="{path:'/shopLegalPayDetail',query:{id:item.id}}"  v-else>{{$t('fat.protection')}} ></router-link>
          </div>
        </div>
        <div class="flex li-b">
          <div>
            <div class="tc ft14">{{$t('td.time')}}</div>
            <div class="tc">{{item.create_time}}</div>
          </div>
          <div>
            <div class="tc ft14">{{$t('td.num')}}({{item.currency_name}})</div>
            <div class="tc">{{item.number || '0.000' | toFixeds}}</div>
          </div>
          <div>
            <div class="tc ft14">{{$t('td.tradeTotal')}}({{item.coin_code}})</div>
            <div class="tc">{{item.deal_money || '0.000' | toFixeds}}</div>
          </div>
        </div>
      </li>
      
    </ul>
    <div class="more" @click="getList(true)" v-if="list.length">{{$t('td.more')}}</div>
   
    <div v-else class="nomore">{{$t('td.nomore')}}</div>
     
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      filterPms: { type: "none", id: '', page: 1, isSure: "none" }
    };
  },
  filters: {
			toFixeds: function(value) {
				value = Number(value);
				return value.toFixed(3);
			}
		},
  created() {
    var token = window.localStorage.getItem("token") || "";
    if (token) {
      this.token = token;
      this.filterPms.id = this.$route.query.id || "";
      this.getList();
    }
  },
  methods: {
    
    getList(more = false) {
      var pms = {};
      if (!more) {
        this.filterPms.page = 1;
      }
      pms.id = this.filterPms.id;
    //  pms.id = '55'
      pms.page = this.filterPms.page;
      if (this.filterPms.type != "none") {
        pms.type = this.filterPms.type;
      }
      if (this.filterPms.isSure != "none") {
        pms["is_sure"] = this.filterPms.isSure;
      }
      var i = layer.load();
      this.$ajax({
        url: "/api/legal_send_deal_list",
        params: pms,
        headers: { Authorization: this.token }
      }).then(res => {
        layer.close(i);
        if (res.data.type == "ok") {
          var msg = res.data.message;
          if (more) {
            if (msg.data.length) {
              this.list = this.list.concat(msg.data);
            } else {
              layer.msg(this.$t('td.nomore'));
            }
          } else {
            this.list = msg.data;
          }
          if(msg.data.length){
            this.filterPms.page+=1;
          }
        }
      });
    }
  }
};
</script>

<style lang='scss'>
#legal-record {
  width: 1200px;
  margin: 30px auto;
  > .title {
    margin-bottom: 30px;
    padding: 0 30px;
    line-height: 50px;
    font-size: 20px;
    // background: #f8f8f8;
  }
  > .filter-box {
    line-height: 30px;
    // background: #f8f8f8;
    span {
      margin-left: 16px;
      cursor: pointer;
    }
    span:nth-child(n + 2) {
      font-weight: 600;
    }
    .select {
      color: #563bd1;
    }
  }
  > ul {
    padding: 10px 30px;
    // background: #f8f8f8;
    li {
      > div {
        justify-content: space-between;
        line-height: 30px;
      }
    }
    > li:nth-child(n + 2) {
      // border-top: 1px solid #ccc;
    }
  }

  > .more {
    text-align: center;
    padding: 20px;
    // background: #f8f8f8;
    cursor: pointer;
  }
  >.nomore{
    padding: 16px;
    text-align: center;
  }
}
.log_wrap{
  overflow: auto;
}
</style>



// WEBPACK FOOTER //
// src/components/shop_legal_record.vue