import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
import zh from './zh'
import en from './en'
import hk from './hk'
import kor from './kor'
import jp from './jp'
let locale = window.localStorage.getItem('locale') || 'en';
if(locale == ''){
  locale = 'hk';
  window.localStorage.setItem('locale','hk');
}
export default new VueI18n({
  locale:locale,
  messages:{
    kor:kor,
    zh:zh,
    en:en,
    hk:hk,
    jp:jp
  }
})


// WEBPACK FOOTER //
// ./src/lang/lang.js