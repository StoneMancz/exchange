import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import homeContent from '@/view/homeContent'
import dealCenter from '@/components/dealCenter'
import fiatradCenter from '@/components/fiatradCenter'
import payOpts from '@/view/payOpts'
import userSetting from '@/components/userSetting'
import c2c from '@/components/c2c'
import c2cOrder from '@/view/c2c/c2cOrder'
import c2cRelease from '@/view/c2c/c2cRelease'
import c2cTrade from '@/view/c2c/c2cTrade'
import c2cDetail from '@/view/c2c/c2cDetail'
import c2cRecord from '@/view/c2c/c2cRecord'
import leverdealCenter from '@/components/lever_dealCenter'
import secondsOrder from '@/components/secondsOrder'
import login from '@/components/login'
import loginTransfer from '@/components/loginTransfer'
import register from '@/components/register'
import bindmpwd from '@/components/bindmpwd'
import account from '@/components/account'
import accountCenter from '@/view/accountCenter'
import accountEntrust from '@/view/accountEntrust'
import accountSet from '@/view/accountSet'
import authentication from '@/view/authentication'
import accountMessage from '@/view/accountMessage'
import setCash from '@/components/setCash'
import recharge from '@/view/recharge'
import rechargeMoney from '@/view/rechargeMoney'
import coinRecord from '@/view/coinRecord'
import noticeList from '@/components/noticeList'
import noticeDetail from '@/components/noticeDetail'
import policy from '@/components/policy'
import aceite from '@/view/aceite'
import region from '@/view/region'
import chargeRecord from '@/view/chargeRecord'
import new_account from '@/components/new_account'
import finance from '@/view/accounts/finance'
import micro from '@/view/accounts/micro'
import dealFinance from '@/view/accounts/dealFinance'
import transfer from '@/view/accounts/transfer'
import lever from '@/view/accounts/lever'
import finanrec from '@/view/accounts/finanrec'
import manger from '@/view/accounts/lever_manger'
import legal from '@/view/accounts/legal'
import legalAccount from '@/view/accounts/legalAccount'
import dealAccount from '@/view/accounts/dealAccount'
import microAccount from '@/view/accounts/microAccount'
import transferLegal from '@/view/accounts/transferLegal'
import transferLever from '@/view/accounts/transferLever'
import transferMicro from '@/view/accounts/transferMicro'
import transferLog from '@/view/transfer_log'
import tree from '@/view/tree'
import profit from '@/view/profit'
import bindInfo from '@/view/bindInfo'
import integralExchange from '@/view/integralExchange'
import integralExchanges from '@/view/integralExchanges'
import allTransaction from '@/view/all_transaction'
import leverTransactions from '@/view/lever_transactions'
import leverList from '@/view/lever/leverList'
import transferRecord from '@/view/lever/transferRecord'

import ForgetPwd from '@/components/ForgetPwd'  //忘记密码
import ResetPwd from '@/components/ResetPwd'  //重置密码密码
import withdraw_address from '@/view/accounts/withdraw_address'
import leverRecord from '../view/lever/leverRecord.vue'
import bindEmail from '../view/bindEmail.vue'
import manage from '@/view/manage'
import manageList from '@/view/manageList'


Vue.use(Router)
export default new Router({
	mode: 'hash',
    base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			// name: 'home',
			component: home,
			children:[
				{
					path:'',
					name:'homeContent',
					component:homeContent
				},
				{
					path:'legalTrade',
					component:() => import ('../components/LegalTrade.vue')
				},
				{
					path:'allmarket',
					component:() => import ('../view/allmarket.vue')
				},
				{
					path:'legalPay',
					component:() => import ('../components/LegalPay.vue')
				},
				{
					path:'legalPayDetail',
					component:() => import ('../components/LegalPayDetail.vue')
				},
				{
					path:'shopLegalPayDetail',
					component:() => import ('../components/shop_legal_pay_detail.vue')
				},
				{
					path:'legalRecord',
					component:() => import ('../components/LegalRecord.vue')
				},
				{
					path:'legalTradeSet',
					component:() => import ('../components/LegalTradeSet.vue')
				},
				{
					path:'legalSeller',
					component:() => import ('../components/LegalSeller.vue')
				},
				{
					path:'myLegalShops',
					component:() => import ('../components/MyLegalShops.vue')
				},
				{
					path:'legalShopDetail',
					component:() => import ('../components/LegalShopDetail.vue')
				},
				{
					path:'shopLegalRecord',
					component:() => import ('../components/shop_legal_record.vue')
				},
				{
					path:'balancelog',
					component:() => import ('../components/balancelog.vue')
				},
				{
					path:'transferstore',
					component:() => import ('../components/transferstore.vue')
				},
				{
					path: 'fiatradCenter',
					name: 'fiatradCenter',
					component: fiatradCenter
				},
				{
					path:'bindmpwd',
					name: 'bindmpwd',
					component: bindmpwd
				},
				{
					path:'userSetting',
					// name:'userSetting',
					component:userSetting,
					children:[
						{
							path:'',
							component:payOpts
						}
					]
				},
				{
					path:'/c2c',
					name:'c2c',
					component:c2c,
					children:[
						
					]
				},
				{
					path:'/c2cOrder',
					name:'c2cOrder',
					component:c2cOrder
				
				},
				{
					path:'/c2cRelease',
					name:'c2cRelease',
					component:c2cRelease
				
				},
				{
					path:'/c2cTrade',
					name:'c2cTrade',
					component:c2cTrade
				
				},
				{
					path:'/c2cDetail',
					name:'c2cDetail',
					component:c2cDetail
				
				},
				{
					path:'/c2cRecord',
					name:'c2cRecord',
					component:c2cRecord
				
				},
				{
					path:'/dealCenter',
					name:'dealCenter',
					component:dealCenter
				},
				{
					path:'/secondsOrder',
					name:'secondsOrder',
					component:secondsOrder
				},
				{
					path:'/leverdealCenter',
					name:'leverdealCenter',
					component:leverdealCenter
				},
				{
					path:'/allTransaction',
					name:'allTransaction',
					component:allTransaction
				},
				{
					path:'/leverRecord',
					component:leverRecord
				},
				{
					path:'/bindEmail',
					component:bindEmail
				},
				{
					path:'/leverTransactions',
					name:'leverTransactions',
					component:leverTransactions
				},
				{
					path:'/leverList',
					name:'leverList',
					component:leverList
				},
				{
					path:'/transferRecord',
					name:'transferRecord',
					component:transferRecord
				},
				{
					path:'/manage',
					name:'manage',
					component:manage,
				
				},
				{
					path:'/manageList',
					name:'manageList',
					component:manageList
				},
				{
					path:'/team',
					component:() => import ('@/view/team.vue')
				},
			]
		},
		{
			path:'/integralExchanges',
			name:'integralExchanges',
			component:integralExchanges
		},
		{
			path:'/dealCenter',
			name:'dealCenter',
			component:dealCenter
		},
		{
			path:'/components/login',
			name: 'login',
			component: login
		},
		{
			path:'/components/loginTransfer',
			name: 'loginTransfer',
			component: loginTransfer
		},
		{
			path:'/forgetPwd',
			name: 'forgetPwd',
			component: ForgetPwd
		},
		{
			path:'/resetPwd',
			name: 'resetPwd',
			component: ResetPwd
		},
		{
			path:'/components/register',
			name: 'register',
			component: register
		},

		{
			path:'/noticeList',
			name:'noticeList',
			component:noticeList
		},
		{
			path:'/components/noticeDetail',
			name:'noticeDetail',
			component:noticeDetail
		},
		{
			path:'/policy',
			name:'policy',
			component:policy
		},
		{
			path:'/bindInfo',
			name:'bindInfo',
			component:bindInfo
		},
		{
			path:'/account',
			name:'account',
			component:account,
			children: [
				{
				  path: '/accountCenter',
				  name: 'accountCenter',
				  component: accountCenter
				},
				{
					path: '/accountEntrust',
				  	name: 'accountEntrust',
				  	component: accountEntrust
				},
				{
					path: '/accountMessage',
				  	name: 'accountMessage',
				  	component: accountMessage
				},
				{
					path: '/accountSet',
				  	name: 'accountSet',
				  	component: accountSet
				},
				{
					path:'/recharge',
					name:'recharge',
					component:recharge
				},
				{
					path:'/coinRecord',
					name:'coinRecord',
					component:coinRecord
				},
				{
					path:'/rechargeMoney',
					name:'rechargeMoney',
					component:rechargeMoney
				},
				{
					path:'/aceite',
					name:'aceite',
					component:aceite
				},
				{
					path:'/region',
					name:'region',
					component:region
				},
				{
					path:'/chargeRecord',
					name:'chargeRecord',
					component:chargeRecord
				},
				{
					path:'/transferLog',
					name:'transferLog',
					component:transferLog
				},
				{
					path:'/authentication',
					name:'authentication',
					component:authentication
				},
				{
					path:'/integralExchange',
					name:'integralExchange',
					component:integralExchange
				},
				{
					path:'/coinExchange',
					name:'coinExchange',
					component:() => import ('../view/coinExchange.vue')
				},
				{
					path:'/tree',
					name:'tree',
					component:tree
				},
				{
					path:'/profit',
					name:'profit',
					component:profit
				},

			]

		},
		{
			path:'/new_account',
			name:'new_account',
			component:new_account,
			children: [
			
				{
					path:'/finance',
					name:'finance',
					component:finance
				},
				{
					path:'/dealFinance',
					name:'dealFinance',
					component:dealFinance
				},
				{
					path:'/transfer',
					name:'transfer',
					component:transfer
				},
				{
					path:'/lever',
					name:'lever',
					component:lever
				},
				{
					path:'/legal',
					name:'legal',
					component:legal
				},
				{
					path:'/micro',
					name:'micro',
					component:micro
				},
				{
					path:'/legalAccount',
					name:'legalAccount',
					component:legalAccount
				},
				{
					path:'/dealAccount',
					name:'dealAccount',
					component:dealAccount
				},
				{
					path:'/microAccount',
					name:'microAccount',
					component:microAccount
				},
				{
					path:'/transferLegal',
					component:transferLegal
				},
				{
					path:'/transferLever',
					component:transferLever
				},
				{
					path:'/transferMicro',
					component:transferMicro
				}
				

			]

		},
	    // 合约管理
		{
			
			path:'/lever_manger',
			name:'manger',
			component:manger,
		},
		// 财务记录
		{
			
			path:'/finanrec',
			name:'finanrec',
			component:finanrec,
		},
		// 地址管理
		{
			
			path:'/withdraw_address',
			name:'withdraw_address',
			component:withdraw_address,
		},
		{
			path:'/setCash',
			name: 'setCash',
			component: setCash
		},
		


	]
})



// WEBPACK FOOTER //
// ./src/router/index.js