<template>
  <div id="lever-record">
    <div class="title">
      <span class="fl">usdt</span>
      <span class="fr" @click="$router.go(-1)">返回</span>
    </div>
    <div class="list">
      <div class="list-title flex">
        <span>数量</span>
        <span>记录</span>
        <span>时间</span>
      </div>
      <ul>
        <li v-for="(item,index) in log" :key="index">
          <span>{{item.value}}</span>
          <span>{{item.info}}</span>
          <span>{{item.created_time}}</span>
        </li>
      </ul>
    </div>
    <div @click="getLog" class="loadmore">加载更多</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      log: [],
      page: 1
    }
  },
  created() {
    this.getLog();
  },
  methods: {
    getLog:function() {
      var id = this.$route.query.id;
      var token = window.localStorage.getItem("token");
      this.$ajax({
        url: "/api/wallet/legal_log",
        method: "post",
        headers: { Authorization: token },
        data: {
          type: "lever",
          currency: id
        }
      }).then(res => {
        if (res.data.type == "ok") {
          let msg = res.data.message;
          if (msg.list.length) {
            this.log.concat(msg.list);
            this.page += 1;
          } else {
            layer.msg("没有更多了");
          }
        }
      });
    }
  }
};
</script>

<style lang='scss'>
#lever-record {
  width: 1200px;
  margin: 0 auto;
  color: #c7cce6;
  .title {
    height: 60px;
    line-height: 60px;
    padding: 0 30px;
    margin: 20px 0;
    font-size: 20px;
    border-radius: 3px;
    background-color: #1a243b;
    span {
      cursor: pointer;
    }
  }
  .list {
    min-height: 900px;
    padding: 0 30px;
    background: #1a243b;
  }
  .list-title,
  li {
    display: flex;
    line-height: 40px;
    justify-content: space-between;
    span {
      flex: 1;
      text-align: center;
    }
  }
  li {
    border-top: 1px solid #202a4a;
  }
  .loadmore {
    text-align: center;
    padding: 20px;
    cursor: pointer;
  }
}
</style>



// WEBPACK FOOTER //
// src/view/lever/leverRecord.vue