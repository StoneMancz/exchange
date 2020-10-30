<template>
  <div class="account-main wrap fColor1">
    <div class="title bg-part">{{$t('auth.identity')}}</div>
    <div class="main-content mt20 bg-part">
      <div v-show="review_status==0">
        <div class="main-input">
          <div class="flex alcenter center">
            <span>{{$t('auth.name')}}：</span>
            <input type="text" :placeholder="$t('auth.pname')" id="name" v-model="name" class="bg-part bd input_color">
          </div>
          <div class="flex alcenter center mt20">
            <span>{{$t('auth.idcard')}}：</span>
            <input type="text" :placeholder="$t('auth.pidcard')" id="card" v-model="card_id" class="bg-part bd input_color">
          </div>
        </div>
        <div class="mt40 fColor1 ft14 tc">{{$t('auth.upimg')}}</div>
        <div class="idimg flex center mt40">
          <div>
            <img :src="src1" alt>
            <input type="file" accept="image/*" name="file" @change="file1">
          </div>
          <div>
            <img :src="src2" alt>
            <input type="file" accept="image/*" name="file" @change="file2">
          </div>
          <div>
            <img :src="src3" alt>
            <input type="file" accept="image/*" name="file" @change="file3">
          </div>
        </div>
        <div class="updata tc">
          <input type="button" :value="$t('auth.submit')" @click="updata" class="curPer">
        </div>
      </div>
      <div v-show="review_status==1">
        <div class="tc ft30 au-statue">{{$t('auth.auditing')}}</div>
      </div>
      <div v-show="review_status==2">
        <div class="tc ft30 au-statue">{{$t('auth.certified')}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "authentication",
  data() {
    return {
      name: "",
      card_id: "",
      src1: "./static/imgs/shenfenzhengzhengmian.png",
      src2: "./static/imgs/shenfenzhengfanmian.png",
      src3: "./static/imgs/shouchishenfenzheng.png",
      review_status: 3
    };
  },
  created() {
    this.token = localStorage.getItem("token");
  },
  methods: {
    file1() {
      var that = this;
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = function(e) {
        // that.src1 = e.target.result;
      };
      var formData = new FormData();
      formData.append("file", event.target.files[0]);
      $.ajax({
        url: "/api/" + "upload",
        type: "post",
        data: formData,
        processData: false,
        contentType: false,
        success: function(msg) {
          if(msg.type == 'ok'){
            that.src1 = msg.message;
          }else{
            layer.msg(msg.message)
          }
          
        }
      });
    },
    file2() {
      var that = this;
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = function(e) {
        // that.src2 = e.target.result;
      };
      var formData = new FormData();
      formData.append("file", event.target.files[0]);
      $.ajax({
        url: "/api/" + "upload",
        type: "post",
        data: formData,
        processData: false,
        contentType: false,
        success: function(msg) {
          if(msg.type == 'ok'){
             that.src2 = msg.message;
          }else{
            layer.msg(msg.message)
          }
         
        }
      });
    },
    file3() {
      var that = this;
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = function(e) {
        // that.src3 = e.target.result;
      };
      var formData = new FormData();
      formData.append("file", event.target.files[0]);
      $.ajax({
        url: "/api/" + "upload",
        type: "post",
        data: formData,
        processData: false,
        contentType: false,
        success: function(msg) {
          if(msg.type == 'ok'){
            that.src3 = msg.message;
          }else{
            layer.msg(msg.message)
          }
          
        }
      });
    },
    updata() {
      var that = this;
      let name = this.$utils.trim(that.name);
      let card_id = this.$utils.trim(that.card_id);
      if (this.name.length == "") {
        layer.tips(this.$t('auth.pname'), "#name");
        return;
      }
      if (this.card_id.length == "") {
        layer.tips(this.$t('auth.pidcard'), "#card");
        return;
      }
      
      if (that.src1 == "./static/imgs/shenfenzhengzhengmian.png" || that.src2 == './static/imgs/shenfenzhengfanmian.png' || that.src3 == './static/imgs/shouchishenfenzheng.png') {
        layer.msg(this.$t('auth.pimg'));
        return;
      }
      this.$ajax({
        url: "/api/" + "user/real_name",
        method: "post",
        data: {
          name: name,
          card_id: card_id,
          front_pic: that.src1,
          reverse_pic: that.src2,
          hand_pic: that.src3
        },
        headers: { Authorization: that.token }
      })
        .then(res => {
          layer.msg(res.data.message);
          if(res.data.type=='ok'){
            setTimeout(function(){
              that.$router.push("/");
            },500);
          }
        })
        .catch(error => {});
    },
    Info() {
      var that = this;
      this.$ajax({
        url: "/api/" + "user/center",
        method: "get",
        data: {},
        headers: { Authorization: that.token }
      })
        .then(res => {
          that.review_status = res.data.message.review_status;
        })
        .catch(error => {});
    }
  },
  mounted() {
    this.Info();
  }
};
</script>
<style scoped lang="scss">
.account-main {
  background: #273041;
  .title {
    width: 100%;
    line-height: 60px;
    // background: #1a243b;
    border-radius: 4px;
    padding-left: 20px;
  }
  .main-content {
    // background: #1a243b;
    min-height: 700px;
    border-radius: 2px;
    .main-input {
      margin: 0 auto;
      text-align: center;
      padding-top: 100px;
      span {
        width: 100px;
      }
      input {
        width: 320px;
        min-height: 46px;
        border: 1px solid #4e5b85;
        padding: 0 20px;
        color: #c7cce6;
        font-size: 14px;
        border-radius: 3px;
        background-color: #1e2235;
      }
    }
    .idimg {
      div {
        width: 160px;
        height: 160px;
        overflow: hidden;
        position: relative;
        background-size: 100% 100%;
        border: 1px solid #e2e2e2;
        margin-left: 50px;
        display: flex;
        justify-content: center;
        input {
          position: absolute;
          z-index: 11110;
          opacity: 0;
          width: 100%;
          height: 160px;
          top: 0;
          cursor: pointer;
        }
        img{
            width: 90%;
        }
      }
    }
    .updata {
      input {
        width: 300px;
        height: 45px;
        border-radius: 4px;
        color: #c7cce6;
        font-size: 14px;
        margin: 0 auto;
        margin-left: 100px;
        margin-top: 60px;
        background: #5697f4;
      }
    }
    .au-statue {
      padding-top: 100px;
      font-size: 30px;
    }
  }
}
</style>



// WEBPACK FOOTER //
// src/view/authentication.vue