<template>
    <div class="account-main">
        <div class="account-title">
            充币
            <span class="fr base mouseDefault" @click="goRecord">充币记录</span>
        </div>
        <div class="recharge-wrap ft14 fColor2">
            <!-- <div class="clear">
                <div class="left fl tr" style="line-height: 48px;">币种</div>
                <div class="right fl">
                    <div class="positionR" style="width: 360px;">
                        <div class="selected pageBack">USDT</div>
                        <span style="">
                            <img src="@/assets/images/register_icon_down.png" >
                            <img src="@/assets/images/register_icon_up.png" style="display: none;">
                            </span>
                        <ul class="pageBack" style="display: none;">
                            <li >
                                USDT
                            </li>
                            <li >
                                JNB
                            </li>
                            <li >
                                ETH
                            </li>
                        </ul> <input type="hidden" disabled="disabled" value="USDT"></div>
                </div>
            </div> -->
            <div class="mt40 clear">
                <div class="left fl tr">充币地址</div>
                <div class="right fl">
                    <img :src="url" class="qrcode">
                    <p class="ft20 fColor1 mt15">
                        <span id="copy-text">{{addr}}</span>
                        <span id="copy" data-clipboard-action="copy" data-clipboard-target="#copy-text" class="base ml20 f14 mouseDefault">复制</span>
                    </p>
                </div>
            </div>
            <div class="tip">
                <p>温馨提示</p>
                <p>• 请勿向上述地址充值任何非 JNB 资产，否则资产将不可找回。</p>
                <p>• 您充值至上述地址后，需要整个网络节点的确认，6次网络节点确认后到账，到账时间一般是10分钟-60分钟之间。</p>
                <p>• USDT充币仅支持simple send的方法，使用其他方法（send all）的充币暂时无法上账，请您谅解。</p>
                <p>• 您充值至上述地址后，需要整个网络节点的确认，1次网络确认后到账，6次网络确认后可提币。</p>
                <p>• 最小充值金额：，小于最小金额的充值将不会上账且无法退回。 100 USDT小于最小金额的充值将不会上账且无法退回。</p>
                <p>• 您的充值地址不会经常改变，可以重复充值；如有更改，我们会尽量通过网站公告或邮件通知您。</p>
                <p>• 请务必确认电脑及浏览器安全，防止信息被篡改或泄露。</p>
            </div>
            <div class="tip" style="display: none;">
                <p>温馨提示</p>
                <p>• 请勿向上述地址充值任何非USDT资产，否则资产将不可找回。</p>
                <p>• 您充值至上述地址后，需要整个网络节点的确认，15次网络确认后到账，30次网络确认后可提币。</p>
                <p>• 最小充值金额：，小于最小金额的充值将不会上账且无法退回。 0.01 USDT 小于最小金额的充值将不会上账且无法退回。</p>
                <p>• 目前不支持使用智能合约或区块奖励(Coinbase)的转账充值，智能合约或区块奖励的转账将不会上账，请您谅解。</p>
                <p>• 您的充值地址不会经常改变，可以重复充值；如有更改，我们会尽量通过网站公告或邮件通知您。</p>
                <p>• 请务必确认电脑及浏览器安全，防止信息被篡改或泄露。</p>
            </div>
            <div class="tip" style="display: none;">
                <p>温馨提示</p>
                <p>• 请勿向上述地址充值任何非 USDT 资产，否则资产将不可找回。</p>
                <p>• 您充值至上述地址后，需要整个网络节点的确认，1次网络确认后到账，6次网络确认后可提币。</p>
                <p>• 最小充值金额：，小于最小金额的充值将不会上账且无法退回。 0.01 USDT 小于最小金额的充值将不会上账且无法退回。</p>
                <p>• 您的充值地址不会经常改变，可以重复充值；如有更改，我们会尽量通过网站公告或邮件通知您。</p>
                <p>• 为保障资金安全，当您账户安全策略变更、密码修改、使用新地址提币，我们会对提币进行人工审核，请耐心等待工作人员电话或邮件联系。</p>
                <p>• 请务必确认电脑及浏览器安全，防止信息被篡改或泄露。</p>
            </div>
        </div>
    </div>
</template>
<script>
import indexHeader from '@/view/indexHeader'
import left from '@/view/left'
import "@/lib/clipboard.min.js"
export default {
    name:'recharge',
    data(){
        return{
            addr:'',
            url:''
        }
    },
    components:{
        indexHeader,
        left
    },
    methods:{
        goRecord(){
            this.$router.push({name:'coinRecord'})
        },
        init(){
             var clipboard = new Clipboard('#copy')
            clipboard.on('success', function (e) {
                alert('复制成功')
            });
            clipboard.on('error', function (e) {
                alert('复制失败')
            });
        }
    },
    created(){
        this.address=localStorage.getItem('address') || '';
        if(this.address){
            this.$ajax({
                url:'/api/'+'money/rechange?user_id='+this.address,
                type:'GET'
            }).then(res=>{
                this.addr=res.data.message.company_eth_address;
                this.url='http://qr.liantu.com/api.php?&w=300&text='+res.data.message.company_eth_address;
                var content = this.addr;
                var clipboard = new Clipboard('#copy')
            }).catch(error=>{
                return error
            })
        }
    },
    mounted(){
        this.init();
    }
};
</script>
<style scoped lang="scss">
.box{
    background-color: #273041;
}
.box .account{
    width: 1500px;
    padding-top: 30px;
    min-height: 880px;
    margin: 0px auto;
    overflow: hidden;
}
.recharge-wrap {
    padding: 70px 0;
    .left {
      width: 104px;
      margin-right: 26px;
    }
    .right {
      .qrcode {
        width: 142px;
        height: 142px;
      }
    }
    .tip {
      margin-top: 122px;
      padding-left: 50px;
      line-height: 26px;
    }
  }

.selected{
    height: 48px;
    border: 1px solid #2e3753;
    padding: 0 40px 0 18px;
    color: #cdd6e4;
    border-radius: 3px;
    line-height: 48px;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    
}
.positionR img{
    position: absolute;
    right: 15px;
    top: 20px;
}
</style>





// WEBPACK FOOTER //
// src/view/recharge.vue