<template>
  <div class="indexBlackes">
    <!-- <indexHeader></indexHeader> -->
    <router-view></router-view>
    <!-- <indexFooter></indexFooter>       -->
  </div>
</template>
<script>
import indexHeader from "@/view/indexHeader";
import homeContent from "@/view/homeContent";
import indexFooter from "@/view/indexFooter";
export default {
  name: "home",
  data() {
    return {};
  },
  methods: {},
  components: { indexHeader, homeContent, indexFooter },
  created() {
    this.$http({
      url: "/api/" + "currency/quotation_new",
      method: "get",
      data: {},
      headers: { Authorization: localStorage.getItem("token") }
    })
      .then(res => {
        if (res.data.type == "ok") {
          this.tabList = res.data.message;
          var msg = res.data.message;
          var arr_quota = [];
          for (var i = 0; i < msg.length; i++) {
            arr_quota[i] = msg[i].quotation;
          }
          if (
            !localStorage.getItem("legal_id") &&
            !localStorage.getItem("currency_id") &&
            !localStorage.getItem("legal_name") &&
            !localStorage.getItem("currency_name")
          ) {
            window.localStorage.setItem(
              "legal_id",
              msg[0].quotation[0].legal_id
            );
            window.localStorage.setItem(
              "currency_id",
              msg[0].quotation[0].currency_id
            );
            window.localStorage.setItem(
              "legal_name",
              msg[0].quotation[0].legal_name
            );
            window.localStorage.setItem(
              "currency_name",
              msg[0].quotation[0].currency_name
            );
            var symbol =
              msg[0].quotation[0].currency_name +
              "/" +
              msg[0].quotation[0].legal_name;
            // var priceScale=Math.pow(10,5);
            var priceScale = 100000;
            window.localStorage.setItem("priceScale", priceScale);
            window.localStorage.setItem("symbol", symbol);
          }
           if (!localStorage.getItem("dealLegalId") &&!localStorage.getItem("dealCurrencyId") &&!localStorage.getItem("dealLegalName") &&!localStorage.getItem("dealCurrencyName")) {
                window.localStorage.setItem("dealLegalId",msg[0].quotation[0].legal_id);
                window.localStorage.setItem("dealCurrencyId",msg[0].quotation[0].currency_id);
                window.localStorage.setItem("dealLegalName",msg[0].quotation[0].legal_name);
                window.localStorage.setItem("dealCurrencyName",msg[0].quotation[0].currency_name);
                var symbol = msg[0].quotation[0].currency_name +"/" +msg[0].quotation[0].legal_name;
                // var priceScale = 100000;
                // window.localStorage.setItem("priceScale", priceScale);
                window.localStorage.setItem("dealSymbol", symbol);
            }
        }
          
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
<style lang="scss" scoped>


</style>


    
    
    







// WEBPACK FOOTER //
// src/components/home.vue