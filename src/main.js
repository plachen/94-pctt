import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 引入模块
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import '../src/styles/index.less'
Vue.config.productionTip = false
Vue.use(ElementUI) // 全局注册 ElementUI框架
// Vue.use 会调用ElenmentUI这个对象里的install方法 并且传入当前的vue对象
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
