import Vue from 'vue'
import axios from 'axios'
Vue.prototype.$http = axios

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import md5 from 'js-md5'
Vue.prototype.$md5 = md5
// 系统常量

// 自定义方法
import '@/libs/plugins'
import { modalSure, modePromptBox, publishWeChat } from '@/libs/public'
Vue.prototype.$modalSure = modalSure
Vue.prototype.$modePromptBox = modePromptBox
Vue.prototype.$publishWeChat = publishWeChat
// 复制文本
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import uploadPicture from '@/components/uploadPicture/uploadFrom'
Vue.use(uploadPicture)

// 导入自定义组件
import '@/components/index'
// 点击图片预览
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.use(Viewer)
Viewer.setDefaults({
  Options: {
    'inline': true,
    'button': true,
    'navbar': true,
    'title': true,
    'toolbar': true,
    'tooltip': true,
    'movable': true,
    'zoomable': true,
    'rotatable': true,
    'scalable': true,
    'transition': true,
    'fullscreen': true,
    'keyboard': true,
    'url': 'data-source'
  }
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
