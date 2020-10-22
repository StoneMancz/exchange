<template>
  <div :class="[loctheme=='black'?'flex between tops balck':'flex between tops whites']">
    <div class="widths">
      <div class="flex top-header bg-part">
        <div
          v-for="item in list"
          :key="item.id"
          v-show="item.is_display == 1 && item.open_microtrade == 1"
          :class="[{'active':symbol==item.currency_name+'/'+item.legal_name}]"
          @click="tabs(item.legal_id,item.currency_id)"
        >
          {{item.currency_name}}
          
        </div>
        
      </div>
      <ul class="flex between top-center bg-part"  v-for="item in list"
          :key="item.id" v-if="symbol==item.currency_name+'/'+item.legal_name">
            <li>
              <p>{{item.now_price || '0.00' | toFixed4}}</p>
              <p>{{$t('market.newprice')}}</p>
            </li>
            <li>
              <p :class="item.change <0?'redColor':'greenColor'">{{item.change|| '0.00'}}%</p>
              <p>{{$t('market.change')}}</p>
            </li>
            <li>
              <p>≈{{item.now_price * item.rmb_relation || '0.00' | toFixeds}}CNY</p>
              <p>{{$t('asset.conversion')}}</p>
            </li>
            <li>
              <p>{{item.volume || '0.00' |toFixedss}}</p>
              <p>{{$t('market.vol')}}</p>
            </li>
      </ul>
    </div>
    <!-- <ul class="lists">
      
      <li class="flex between">
        <p class="tl width3">{{$t('fat.name')}}</p>
        <p class="tc width1">{{$t('market.newprice')}}</p>
        <p class="tr width1">{{$t('market.change')}}</p>
      </li>
      <li
        class="flex between curPer listse"
        :class="[{'active':symbol==item.currency_name+'/'+item.legal_name}]"
        v-for="item in list"
        :key="item.id"
        v-show="item.is_display == 1 && item.open_microtrade == 1"
        @click="tabs(item.legal_id,item.currency_id)"
      >
        {{item.type}}
        <div class="flex width3">
          <img :src="item.logo" alt>
          <div class="currency-name">
            <p>
              {{item.currency_name}}
              <span>[{{item.legal_name}}]</span>
            </p>
            <p>{{item.volume || '0.00' |toFixedss}}</p>
          </div>
        </div>
        <div class="width1 tc currency-name">
          <p>{{item.now_price || '0.00' | toFixed4}}</p>
          <p>≈{{item.now_price * item.rmb_relation || '0.00' | toFixeds}}CNY</p>
        </div>
        <div class="width1 tr line48">
          <p :class="item.change <0?'redColor':'greenColor'">{{item.change|| '0.00'}}%</p>
        </div>
      </li>
    </ul>-->
  </div>
</template>

<script>
import Kline from "@/view/lever/leverKline";
import {mapState} from 'vuex'
export default {
  name: "tv",
  components: { Kline },
  props: {
    quotationList: {
      type: Array,
      required: false
    },
    symbol: {
      type: String,
      required: true
    },
    types: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: [],
      secondsType: "",
      skins: localStorage.getItem("skin") || "days",
    };
  },
  filters: {
    toFixeds: function(value) {
      value = Number(value);
      return value.toFixed(2);
    },
    toFixedss: function(value) {
      value = Number(value);
      return value.toFixed(0);
    },
    toFixed4: function(value) {
      value = Number(value);
      return value.toFixed(4);
    }
  },
  watch: {
    theme:{
      handler(){
        var t=this.theme;
        this.loctheme=t;        
      },
      immediate: true
    },
    quotationList: {
      immediate: true, // 这句重要
      handler(val) {
        this.list = val;
      },
      deep: true
    }
  },
  computed: {
    switchStatus: function() {
      return this.list; // 直接监听props里的status状态
    },
    ...mapState(['theme']),
  },
  created() {},
  mounted() {
    // this.list = this.quotationList;
    this.secondsType = this.types;
  },

  destroyed() {},
  beforeDestroy() {},

  methods: {
    tabs(legalId, currencyId) {
      var that = this;
      if (that.secondsType == "seconds") {
        that.$router.push({
          name: "secondsOrder",
          query: { legalId: legalId, currencyId: currencyId }
        });
      } else {
        that.$router.push({
          name: "leverdealCenter",
          query: { legalId: legalId, currencyId: currencyId }
        });
      }
    }
  }
};
</script>
<style scoped>
.tops {
  width: 100%;
  margin-top: 10px;
}
.top-header{
  width: 100%;
  border-bottom: 1px solid #303b4b;
  /* background-color: #fff; */
}
.top-header div{
  margin-left: 25px;
  padding: 10px 0;
  cursor: pointer;
}
.top-header .active{
  border-bottom: 2px solid ##7a98f7;
}
.widths{
  width: 100%;
}
.top-center{
  padding: 10px 0;
  /* background-color: #fff; */
  margin-bottom: 10px;
}
.top-center li{
  width: 25%;
  text-align: center;
  border-right: 1px solid #303b4b;
}
.top-center li:last-child{
  border: 0!important;
}
.top-center li p:last-child{
  margin-top: 3px;
}
.balck .top-header{
  background-color: #1e2b34;
  border-bottom: 1px solid #000;
}
.balck .top-center{
  background-color: #1e2b34;
}
.balck .top-center li{
  border-right: 1px solid #000;
}
</style>




// WEBPACK FOOTER //
// src/view/lever/secondTv.vue