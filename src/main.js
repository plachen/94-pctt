import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios' // 引入axios
import ElementUI from 'element-ui' // 引入模块
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import '../src/styles/index.less'
import '@/permission'
import Componentes from '@/components/index.js'
Vue.config.productionTip = false

Vue.use(ElementUI) // 全局注册 ElementUI框架
Vue.use(Componentes) // 注册开发的自定义组件
// Vue.use 会调用ElenmentUI这个对象里的install方法 并且传入当前的vue对象
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 配置公共的请求头地址
Vue.prototype.$axios = axios // 将axios赋值给 Vue对象的原型属性
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
