<template>
  <div id="legal-record" class="whites">
    <div class="flex alcenter">
        <div class="title bgf8">{{$t('fat.journal')}}</div>
        <div class="title bgf8 ml25 blue pointer" @click="$router.push({path:'/legalShopDetail',query:{id:id}})">{{$t('fat.myshops')}}</div>
    </div>
    <ul class="bgf8 mt60">
      <li class="bod_bc bdb pdtb5">
        <div class="flex li-b">
          <div class="flex1">
            <div class="tc ft14">{{$t('td.num')}}</div>
          </div>
          <div class="flex1">
            <div class="tc ft14">{{$t('fat.type')}}</div>
          </div>
          <div class="flex1">
            <div class="tc ft14">{{$t('td.time')}}</div>
          </div>
          <div class="flex1">
            <div class="tc ft14">{{$t('fat.sd')}}</div>
          </div>
        </div>
      </li>
      <li v-for="(item,index) in list" :key="index" class="bod_bc bdb pdtb5">
        <div class="flex li-b">
          <div class="flex1">
            <div class="tc">{{item.value || '0.0000' | toFixeds}} {{item.currency_name}}</div>
          </div>
          <div class="flex1">
            <div class="tc">{{item.memo}}</div>
          </div>
          <div class="flex1">
            <div class="tc">{{item.updated_at}}</div>
          </div>
          <div class="flex1">
            <div class="tc" v-if="item.is_lock==1">{{$t('fat.yes')}}</div>
            <div class="tc" v-else>{{$t('fat.no')}}</div>
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
      id: '',
      page: 1,
    };
  },
  filters: {
			toFixeds: function(value) {
				value = Number(value);
				return value.toFixed(4);
			}
	},
  created() {
    var token = window.localStorage.getItem("token") || "";
    if (token) {
      this.token = token;
      this.id = this.$route.query.id || "";
      this.getList();
    }
  },
  methods: {
    
    getList(more = false) {
      var pms = {};
      if (!more) {
        this.page = 1;
      }
      pms.seller_id = this.id;
      pms.page = this.page;
      var i = layer.load();
      this.$ajax({
        url: "/api/seller/balance_log",
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
            this.page+=1;
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
// src/components/balancelog.vue