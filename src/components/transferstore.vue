<template>
    <div id="transfer-legal">
       <div class="title">{{$t('asset.transfer')}}</div>
       <div class="types">
           <div class="types-l">
               <div>{{$t('asset.from')}}</div>
               <div>{{$t('asset.to')}}</div>
           </div>
           <div class="types-r">
               <div>
                   <div>{{types[0]}}</div>
                   <div>{{types[1]}}</div>
               </div>
               <img src="../../static/imgs/transfer1.png" alt="" @click="types.reverse();number='';type=type==1?2:1;">
           </div>
       </div>
       <div class="number">
           <input type="number" class="bdb input_color" :placeholder="$t('asset.pNum')" v-model="number">
           <span style="color:#61688a">{{name}}</span>
           <span class="all" @click="all">{{$t('td.all')}}</span>
       </div>
       <div class="balance" style="line-height:60px;margin:20px 0 0 0px">{{$t('fat.busbalance')}}：{{seller_balance}}</div>
       <div class="balance" style="margin:5px 0 30px 0">{{$t('fat.userbalance')}}：{{user_balance}}</div>
       <button type='button' class="transfer" @click="transfer">{{$t('asset.transfer')}}</button>
    </div>
</template>

<script>
export default {
  data() {
    return {
      token: "",
      type:1,
      seller_balance:'',
      user_balance:'',
      storeid:'',
      name:'',
      types:[this.$t('fat.business'),this.$t('fat.user')],
      number:'',
      id:''
    };
  },
  created() {
    this.id = this.$route.query.id || "";
    this.getinfo();
  },
  methods: {
    getinfo() {
      this.token = window.localStorage.getItem("token") || "";
      this.$ajax({
        url: "/api/seller_info",
        params: {
            id:this.id
        },
        method: "get",
        headers: { Authorization: this.token }
      }).then(res => {
        if (res.data.type == "ok") {
            console.log(res)
            this.seller_balance = res.data.message.seller_balance;
			this.user_balance = res.data.message.user_legal_balance;
		    this.name = res.data.message.currency_name;
        }
      });
    },
    all(){
        if(this.type == 1){
            this.number = this.seller_balance
        }else{
            this.number = this.user_balance
        }
    },
    transfer(){
        if(this.number == ''){
            layer.msg(this.$t('asset.pNum'));return;
        } else {
            let data = {};
            data.number = this.number;
            data.type = this.type;
            data.seller_id = this.id;
            
            this.$ajax({
                url:'/api/seller/transfer',
                method:'post',
                data:data,
                headers: { 'Authorization': this.token }
            }).then(res => {
               layer.msg(res.data.message)
               this.number = ''
               this.getinfo()
            })
        }
    }
  }
};
</script>

<style lang='scss' scoped>
#transfer-legal {
  margin: 30px auto;
  color: #c7cce6;
  width: 1000px;
  > .title {
      padding: 20px 0;
    font-size: 24px;
    color: #61688a;
  }
  > .coins {
    display: flex;
    justify-content: center;
    li {
      margin-right: 20px;
      padding: 5px 20px;
    //   color: #fff;
      background: #234165;
    }
    .active {
      background: #7a98f7 !important;
      color: #fff !important;
    }
  }
  >.types{
      margin: 30px 0;
      width: 800px;
      height: 80px;
      display: flex;
      justify-content: space-between;
      line-height: 40px;
      .types-r{
          display: flex;
      }
      img{
          margin: 25px;
          width: 30px;
          height: 30px;
      }
  }
  .number{
      margin: 30px 0 0;
    //   width: 430px;
      line-height: 40px;
      input{
        // border:none;
        // color:#f2f5ff;
        background: none;
        line-height: 40px;
        width: 755px;
        // border-bottom: 2px solid #3a4975;

      }
      .all{
          margin-left: 10px;
          padding-left: 10px;
          border-left: 1px solid #ccc;
      }
  }
  .transfer{
      display: block;
      margin: 0 auto;
      line-height: 40px;
      width: 200px;
      background: #7a98f7;
      color: #fff;
      border: none;
  }
}
</style>



// WEBPACK FOOTER //
// src/components/transferstore.vue