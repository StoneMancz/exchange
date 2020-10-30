<template>
  <div id="myshops" class="whites">
    <div class="title bgf8">{{$t('fat.myshops')}}</div>
    <div class="list-box bgf8">
      <div class="list-header flex">
        <div>{{$t('fat.name')}}</div>
        <div>{{$t('fat.fiatSub')}}</div>
        <div>{{$t('fat.register_time')}}</div>
        <div>{{$t('fat.shoper_balance')}}</div>
        <div>{{$t('asset.frezz')}}</div>
        <div>{{$t('td.do')}}</div>
      </div>
      <ul class="list">
        <li class="flex bdb" v-for="(item,index) in list" :key="index">
          <div class="flex">
            <span class="icon">{{item.name || '' | strFirst}}</span>
            <span>{{item.name}}</span>
          </div>
          <div>{{item.currency_name}}</div>
          <div>{{item.create_time}}</div>
          <div>{{item.legal_balance || '0.000' | toFixeds}}</div>
          <div>{{item.lock_seller_balance || '0.000' | toFixeds}}</div>
          <div>
            <router-link :to="{path:'/legalShopDetail',query:{id:item.id}}">{{$t('fat.enterShop')}}</router-link>
            <!-- <router-link :to="{path:'/transferstore',query:{id:item.id}}">{{$t('asset.transfer')}}</router-link> -->
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      page: 1
    };
  },
  filters: {
    toFixeds: function(value) {
      value = Number(value);
      return value.toFixed(3);
    },
    strFirst:function(value){
      return value.substr(0, 1)
    },
  },
  created() {
    var token = window.localStorage.getItem("token") || "";
    if (token) {
      this.token = token;
      this.getList();
    }
  },
  methods: {
    getList() {
      this.$ajax({
        url: "/api/my_seller",
        headers: { Authorization: this.token }
      }).then(res => {
        if (res.data.type == "ok") {
          var list = res.data.message.data;
          if (list.length) {
            this.list = list;
          }
        }
      });
    }
  }
};
</script>

<style lang='scss'>
#myshops {
  width: 1200px;
  margin: 30px auto 0;
  > .title {
    margin-bottom: 20px;
    padding: 0 30px;
    // background: #f8f8f8;
    line-height: 50px;
  }
  > .list-box {
    line-height: 30px;
    // background: #f8f8f8;
    padding: 0 30px;
    .list-header,
    li {
      > div {
        width: 19.9%;
        height: 30px;
      }
      > div:last-child {
        // text-align: tig
        text-align: right;
      }
    }
    li {
      padding: 14px 0;
      > div:first-child {
        > span:first-child {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          text-align: center;
          background: #7a98f7;
          color: #fff;
          margin-right: 5px;
          line-height: 30px;
        }
      }
    }
    li > div:last-child a{
      float: right;
      padding: 0 14px;
      border-radius: 2px;
      background: #7a98f7;
      color: #fff;
      cursor: pointer;
      font-size: 14px;
      margin-left: 10px;
    }
    li:nth-child(n + 2) {
      border-bottom: 1px solid #ddd;
    }
  }
}
</style>



// WEBPACK FOOTER //
// src/components/MyLegalShops.vue