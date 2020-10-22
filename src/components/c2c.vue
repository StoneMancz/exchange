<template>
    <div id="c2c-box" class="flex">
        <div class="c2c-l">
            <left></left>
        </div>
        <div class="c2c-r">
          <div class="top">
            <ul>
              <!-- <li class="flex coin" v-for="(item,index) in currency_list" :key="index" :class="index == active?'bg_active':''"  @click="currency_click(item.id,item.name,index)">
                  <div class="flex pointer">
                      <div>{{item.name}}/CNY</div>
                  </div>
                  <span>></span>
              </li> -->
          </ul>
          <el-select v-model="currency_name" :placeholder='$t("fat.pselect")' @change="currency_click">
            <el-option
              v-for="item in currency_list" :value="item"  :key="item.id">{{item.name}}
            </el-option>
          </el-select>
          <div class="top-title flex">
              <div>
                  <!-- <router-link tag="span" to="/c2c" class="link-span">tether {{currency_name}}</router-link> -->
                  <span class="link-span">tether {{currency_name}}</span>
                  <span>{{$t('ctc.balance')}}：{{balance}}</span>
                  <!-- <span>{{$t('ctc.and')}}</span> -->

              </div>
          </div>
              
          <div class="inp-items flex">
            <div class="inp-item">
                <div class="inp-title flex">
                    <div>{{$t('td.buyin')}}{{currency_name}}</div>
                    
                </div>
                <!-- <div class="how redColor ft14">如何买入?</div> -->
                <div class="three-inp mt20">
                    
                    <div class="inp-box">
                        <span>{{$t('ctc.buynum')}}{{currency_name}}</span>
                        <input type="number" v-model="num">
                    </div>
                    <div class="inp-box">
                        <span>{{$t('td.price')}}</span>
                        <input type="number" v-model="price">
                    </div>
                    <!-- <div class="inp-box">
                        <span>姓名</span>
                        <input type="text" v-model="user_name">
                    </div>
                    <div class="inp-box">
                        <span>详细内容</span>
                        <input type="text" v-model="content">
                    </div> -->
                </div>
                <div class="pay-opts flex">
                    <div>{{$t('td.method')}}</div>
                    <div>
            
                        <label >
                            <input type="radio" name="pay" value="ali_pay" v-model="pay">
                            {{$t('fat.alipay')}}
                        </label>
                    </div>
                    <div>
            
                        <label >
                            <input type="radio" name="pay" value="we_chat" v-model="pay">
                            {{$t('fat.wechat')}}
                        </label>
                    </div>
                    <div>
            
                        <label >
                            <input type="radio" name="pay" value="bank" v-model="pay">
                            {{$t('fat.bank')}}
                        </label>
                    </div>
                    <div class="redColor">({{$t('ctc.payim')}})</div>
                    
                </div>
                <div class="pay-opts flex">
                    <div>{{$t('td.coincode')}}</div>
                    <div>
            
                        <label >
                            <input type="radio" name="coin" value="CNY" v-model="coin">
                            CNY
                        </label>
                    </div>
                    <div>
            
                        <label >
                            <input type="radio" name="coin" value="USD" v-model="coin">
                            USD
                        </label>
                    </div>
                    <div>
            
                        <label >
                            <input type="radio" name="coin" value="JPY" v-model="coin">
                            JPY
                        </label>
                    </div>
                </div>
                <div class="btn-in" @click="bui_in">{{$t('td.buyin')}}（{{currency_name}}）</div>
            </div>
            <div class="inp-item">
                <div class="inp-title flex">
                    <div>
                        <span>{{$t('td.sellout')}}{{currency_name}}</span>
                        <!-- <span class="ft14" style="color:#87a2cd">({{currency_name}}{{$t('ctc.balance')}})</span> -->
                        </div>
                    
                </div>
                <!-- <div class="how redColor ft14">如何卖出?</div> -->
                <div class="three-inp mt20">
                    
                    <div class="inp-box">
                        <span>{{$t('ctc.sellnum')}}{{currency_name}}</span>
                        <input type="number" v-model="num01">
                    </div>
                    <div class="inp-box">
                        <span>{{$t('td.price')}}</span>
                        <input type="number" v-model="price01">
                    </div>
                      <!-- <div class="inp-box">
                        <span>姓名</span>
                        <input type="text" v-model="user_name01">
                    </div>
                    <div class="inp-box">
                        <span>详细内容</span>
                        <input type="text" v-model="content01" />
                    </div> -->
                </div>
                <div class="pay-opts flex">
                    <div>{{$t('td.method')}}</div>
                    <div>
            
                        <label >
                            <input type="radio" name="pay01" value="ali_pay" v-model="pay01">
                            {{$t('fat.alipay')}}
                        </label>
                    </div>
                    <div>
            
                        <label >
                            <input type="radio" name="pay01" value="we_chat" v-model="pay01">
                            {{$t('fat.wechat')}}
                        </label>
                    </div>
                    <div>
            
                        <label >
                            <input type="radio" name="pay01" value="bank" v-model="pay01">
                            {{$t('fat.bank')}}
                        </label>
                    </div>
                    
                    <div class="redColor">（{{$t('ctc.payim')}})</div>
                    <!-- <router-link tag="div" to="/c2c">《交易须知》</router-link> -->
                </div>
                <div class="pay-opts flex">
                    <div>{{$t('td.coincode')}}</div>
                    <div>
                        <label >
                            <input type="radio" name="coin1" value="CNY" v-model="coin1">
                            CNY
                        </label>
                    </div>
                    <div>
                        <label >
                            <input type="radio" name="coin1" value="USD" v-model="coin1">
                            USD
                        </label>
                    </div>
                    <div>
                        <label >
                            <input type="radio" name="coin1" value="JPY" v-model="coin1">
                            JPY
                        </label>
                    </div>
                </div>
                <div class="btn-out" @click="sell_out">{{$t('td.sellout')}}（{{currency_name}}）</div>

            </div>
                
            </div>
        </div>
      </div>
    </div>
</template>

<script>
import left from '@/view/c2c/leftc2c'
export default {
  components:{
    left,
  },
  data() {
    return {
      token: "",
      nowList: "listIn",
      active: 0,
      currency_list: [],
      currency_name: "",
      currency_id:'',
      id: "",
      price: "",
      num: "",
      pay: "",
      user_name: "",
      content: "",
      price01: "",
      num01: "",
      pay01: "",
      user_name01: "",
      content01: "",
      showList: true,
      showDetail: false,
      detail: {}, //li详情,
      showTradeBox: false,
      password:'',
      tradeParams: {
        id: "",
        total: "",
        type: ""
        
      },
      buySellNum: "",
      showTradeList: { show: false, index: "none" },
      coin:'',
      coin1:'',
      balance:0.00
    };
  },
  created() {
    this.token = window.localStorage.getItem("token") || "";
    if (this.token == "") {
      this.$router.push("/components/login");
    }
    this.get_currency();
  },
  
  
  methods: {
    fixedInp(n,e){
      if(e.target.value == 0){
        e.target.value == ''
      } else {
        var v = e.target.value + '';
        var index = v.indexOf('.');
        if(index != -1){
          
          if(v.substr(index).length>(n+1)){
            e.target.value = (v-0).toFixed(n);
          }
        }
        
        
        
      }
    },
    // 获取币种列表
    get_currency() {
      this.$ajax({
        url: "/api/currency/list",
        method: "get",
        headers: { Authorization: this.token }
      }).then(res => {
        if (res.data.type == "ok") {
          this.currency_list = res.data.message.legal;
          this.currency_name = res.data.message.legal[0].name;
          this.id = res.data.message.legal[0].id;
          this.get_balance(this.id);
        }
      });
    },
    // 请求币种余额
    get_balance(id){
       this.$ajax({
        url: "/api/wallet/detail",
        method: "post",
        data:{currency:id,type:'legal'},
        headers: { Authorization: this.token }
      }).then(res => {
        if (res.data.type == "ok") {
            this.balance=res.data.message.legal_balance;
        }
      });     
    },
    //选择币种
    currency_click(event) {
      console.log(event)
      this.currency_name = event.name;
      // this.active =event.index;
      this.id = event.id;
    },
    //添加买入
    bui_in() {
      let that = this;
      if(!that.num){
          layer.msg(that.$t('ctc.pbuyNum'));
          return false;
      }
      if(!that.price){
          layer.msg(that.$t('ctc.pprice'));
          return false;
      }
      if(!that.pay){
          layer.msg(that.$t('ctc.payway'));
          return false;
      }
      if(!that.coin){
          layer.msg(that.$t('td.pcoin'));
          return false;
      }
      layer.prompt({title: that.$t('td.pwd'), formType: 1,btn:[that.$t('td.confirm'), that.$t('td.canceil')]}, function(pass, index){
        that.password=pass;
        that.$ajax({
          url: "/api/c2c_send",
          method: "post",
          data: {
            price: that.price,
            total_number: that.num,
            way: that.pay,
            currency_id: that.id,
            type: "buy",
            password:that.password,
            coin_code:that.coin
          },
          headers: { Authorization: that.token }
        }).then(res => {
          if(res.data.type == 'ok'){
            layer.msg(res.data.message);
            setTimeout(function(){
              that.$router.push("/c2cRelease");
            },500)
          }else if(res.data.type == '997'){
            layer.msg(res.data.message);
            setTimeout(function(){
              that.$router.push("/userSetting");
            },500)
          }else if(res.data.type == '998'){
            layer.msg(res.data.message);
            setTimeout(function(){
              that.$router.push("/authentication");
            },500)
         } else if(res.data.type == "not"){
            layer.msg(res.data.message);
            setTimeout(() => {
              layer.msg(that.$t('set.yorn'), {
                time: 0 //不自动关闭
                ,btn: [that.$t('set.yes'),that.$t('set.no')]
                ,yes: function(index){
                  layer.closeAll();
                  that.$router.push("/bindmpwd");
                }
              }); 
            }, 1000);
          }else{
            layer.msg(res.data.message);
            that.price = "";
            that.num = "";
            that.pay = '';
            that.password=''
          }
        })
        .catch(res => {
          layer.msg(res.data.message);
        });
        layer.close(index);
			});
    },
    //添加卖出
    sell_out() {
      let that = this;
      if(!that.num01){
          layer.msg(that.$t('ctc.psellNum'));
          return false;
      }
      if(!that.price01){
          layer.msg(that.$t('ctc.pprice'));
          return false;
      }
      if(!that.pay01){
          layer.msg(that.$t('ctc.payway'));
          return false;
      }
      if(!that.coin1){
          layer.msg(that.$t('td.pcoin'));
          return false;
      }
      layer.prompt({title: that.$t('td.pwd'), formType: 1,btn:[that.$t('td.confirm'), that.$t('td.canceil')]}, function(pass, index){
        that.password=pass;
        that.$ajax({
          url: "/api/c2c_send",
          method: "post",
          data: {
            price: that.price01,
            total_number: that.num01,
            way: that.pay01,
            currency_id: that.id,
            type: "sell",
            password:that.password,
            coin_code:that.coin1
          },
          headers: { Authorization: that.token }
        }).then(res => {
          if(res.data.type == 'ok'){
            layer.msg(res.data.message);
            setTimeout(function(){
                that.$router.push("/c2cRelease");
            },500)
          } else if(res.data.type == "not"){
            layer.msg(res.data.message);
            setTimeout(() => {
              layer.msg(that.$t('set.yorn'), {
                time: 0 //不自动关闭
                ,btn: [that.$t('set.yes'),that.$t('set.no')]
                ,yes: function(index){
                  layer.closeAll();
                  that.$router.push("/bindmpwd");
                }
              }); 
            }, 1000);
          }else{
            layer.msg(res.data.message);
            that.price01 = "";
            that.num01 = "";
            that.pay01 = '';
            that.password=''
          }
        })
        .catch(res => {
          layer.msg(res.data.message);
        });
        layer.close(index);
			});
    }
  }
}
</script>

<style lang='scss'>
.el-input__inner{
  border: 1px solid #4e5b85;
  background: #1a243b;
  color: #fff
}
.layui-layer{
  background:#171c2b;
}
.layui-layer-title {
  border-bottom: 1px solid #2e3753;
  color: #fff;
  background-color: #171c2b;
}
.layui-layer-prompt .layui-layer-input {
  border: 1px solid #555869;
  color: #fff;
  background: none;
}
#c2c-box {
  margin: 10px 0 10px;
  .btn-green {
    background: #25796a;
    color: #fff;
  }
  .top li:hover {
    color: #357ce1;
  }
  .bg_active {
    color: #357ce1;
    border: none;
  }
  .buy-sell-box {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    > div {
      position: relative;
      margin: 200px auto;
      width: 300px;
      height: 256px;
      top: 50px;

      padding: 0 30px;

      background: #171c2b;
      color: #fff;
      text-align: center;
      border-radius: 2px;
      .title {
        line-height: 50px;
        font-size: 20px;
        color: #6b80ae;
      }
      .close {
        position: absolute;
        top: 0;
        right: 10px;
        font-size: 20px;
        cursor: pointer;
      }
      .total {
        line-height: 35px;
      }
      .inp{
        padding: 6px 0;
        line-height: 35px;
        input {
          line-height: 35px;
          width: 190px;
          padding: 0 10px;
          margin-right: 5px;
        }
      }
      .btn {
        margin: 20px auto 0;
        border-radius: 2px;
        padding: 0 20px;
        line-height: 35px;
        background: #7a98f7;
        cursor: pointer;
      }
    }
  }

  .redColor {
    color: #7a98f7;
  }
  // background: #1a243b;
  color: #c7cce6;
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999;
    color: #333;
    background: rgba(0, 0, 0, 0.7);
    > .m-content {
      border-radius: 4px;
      background: #fff;
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 40px 20px 30px;
      // min-height: 400px;
      max-height: 550px;
      width: 400px;
      > .title {
        position: absolute;
        top: 0;
        left: 0;
        text-align: center;
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        text-align: center;
        font-weight: 600;
        > div:last-child {
          position: absolute;
          top: 0;
          right: 0;
          padding: 0 15px;
          cursor: pointer;
        }
      }
      > div:not(.title) {
        line-height: 32px;
        // border-top: 1px solid #eaecef;
      }
      div {
        span:first-child {
          margin-right: 5px;
          display: inline-block;
          width: 89px;
          color: #7a98f7;
        }
      }
    }
  }
  .more {
    color: #7a98f7;
    text-align: center;
    cursor: pointer;
  }

  font-size: 14px;
  > .c2c-l {
    margin: 0 10px;
    padding: 10px;
    background: #1a243b;
    width: 23%;
    li {
      // padding: 0 10px;
      padding: 0 20px;
      justify-content: space-between;
      cursor: pointer;
      .redColor {
        margin-left: 10px;
      }
      &:hover {
        background: rgb(38, 42, 66);
      }
    }
  }
  > .c2c-r {
    padding: 10px 30px;
    background: #1a243b;

    margin-right: 10px;
    width: 77%;
    > .top {
      // margin: 10px 30px 10px;
      > .top-title {
        font-size: 24px;
        line-height: 2;
        .link-span {
          cursor: pointer;
          &:hover {
            color: #7a98f7;
          }
        }
      }
      .top-price {
        > div {
          margin-right: 20px;
          // line-height: 1.8;
          > span:last-child {
            font-weight: 600;
            font-size: 16px;
          }
        }
      }
      .inp-items {
        > div:first-child {
          margin-right: 30px;
          border-right: 1px dashed #4e5b85;
          padding-right: 30px;
        }
        > .inp-item {
          flex: 1;
          > .inp-title {
            border-bottom: 1px solid #4e5b85;
            font-size: 16px;
            justify-content: space-between;
            line-height: 3;
          }
          > .how {
            line-height: 40px;
            cursor: pointer;
          }
          > .three-inp {
            > .inp-box {
              position: relative;
              height: 42px;
              line-height: 40px;
              padding-left: 112px;
              margin-bottom: 15px;
              > span {
                position: absolute;
                width: 112px;
                // text-align: center;
                top: 0;
                left: 0;
              }
              > div,
              > input {
                color: #c7cce6;
                display: block;
                width: 100%;
                line-height: 40px;
                padding: 0 20px;
                // background: #1e2235;
                border: 1px solid #4e5b85;
                background: none;
              }
              > div {
                color: #7a98f7;
              }
            }
          }
          .pay-opts {
            flex-wrap: wrap;
            > div:nth-child(n + 2) {
              margin-left: 15px;
            }
            > div {
              //   padding-right: 20px;
              line-height: 40px;
              > input {
                vertical-align: middle;
              }
            }
          }
          > .btn-in,
          .btn-out {
            margin-top: 20px;
            line-height: 42px;
            text-align: center;
            cursor: pointer;
            color: #fff;
            background: #4e5b85;
          }
        }
      }
    }
    > .bot {
      color: #6b80ae;
      // margin: 10px 30px;
      // background: #1a243b;
      > .bot-title {
        margin: 30px 0 0;
        // border-bottom: 1px solid #ccc;
        font-size: 16px;
        line-height: 40px;
        justify-content: space-between;
        align-items: center;
        > div:first-child {
          cursor: pointer;
          span {
            font-weight: 600;
            line-height: 40px;
            margin-right: 20px;
          }
          
        }
        > .flex {
          height: 17px;
          line-height: 15px;
          cursor: pointer;
          > div {
            margin-right: 10px;
            border: 1px solid #ccc;
            transition: all 0.3s;
            width: 32px;
            border-radius: 7.5px;
            div {
              width: 15px;
              height: 15px;
              border-radius: 50%;
              background: #fff;
            }
          }
          .switch-on {
            padding-left: 0;
            background: #ccc;
          }
          .switch {
            transition: all 0.3s;
            background: #7a98f7;
            padding-left: 15px;
          }
        }
      }
      > .list-title {
        height: 40px;
        //   justify-content: space-between;
        line-height: 40px;
        font-weight: 600;
      }
      .list-title,
      ul li .content {
        width: 100%;
        color: #c7cce6;
        justify-content: space-between;
        // cursor: pointer;
        text-align: center;
        padding: 8px 5px;
        line-height: 24px;
        > div:first-child {
          width: 6%;
          height: 24px;
          text-align: left;
        }
        > div:nth-child(n + 2) {
          width: 12%;
        }
        > div:last-child {
          // min-width: 19%;
          width: 24%;
        }
        > .last {
          text-align: right;
          height: 24px;
          > div,
          > span {
            float: right;
            margin: 0 5px;
          }
          .btn-last {
            padding: 0 10px;
            min-width: 55px;
            max-width: 80px;
            color: #fff;

            //   margin-left: 70px;
            text-align: center !important;
            cursor: pointer;
          }
        }
      }
      ul li .trade-list {
        background: #171c2b;
        width: 100%;
        padding: 5px 30px 10px;
        margin: 0 auto;
        p {
          font-weight: 600;
          // font-size: 20px;
          // font-size: 16px;
          line-height: 36px;
          span {
            flex: 1;
            text-align: center;
          }
          span:first-child {
            text-align: left;
          }
          span:last-child {
            text-align: right;
          }
        }
        ul {
          li {
            padding: 12px 0;
            border-bottom: 1px solid #303956;
            > div {
              text-align: center;
              width: 25%;
            }
            > div:first-child {
              text-align: left;
            }
            > div:last-child {
              text-align: right;
              div {
                float: right;
                padding: 0 14px;
                margin: 0 6px;
                line-height: 1.6;
                cursor: pointer;
              }
            }
          }
        }
      }
      .ul-out li .content {
        > div:first-child {
          color: #25796a;
        }

        .btn-last {
          background: #25796a;
        }
      }
      .ul-in li .content {
        > div:first-child {
          color: #7a98f7;
        }

        .btn-last {
          background: #7a98f7;
        }
      }
    }
  }
}

.detailit,
.showtrade {
  // float: right;
  margin-right: 20px;
  padding: 0 10px;
  min-width: 55px;
  max-width: 80px;
  color: #fff;
  text-align: center !important;
  cursor: pointer;
  background: #7a98f7;
}
</style>



// WEBPACK FOOTER //
// src/components/c2c.vue