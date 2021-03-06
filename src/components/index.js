// 需要使用Vue.use的方式去注册
//  install:方法第一个参数是Vue对象
import LayoutHeader from './home/layout-header'
import LayoutAside from './home/layout-aside'
import BreadCrumb from './common/bread-crumb'
export default {
  install: function (Vue) {
    // 注册全局组件 一旦注册
    Vue.component('layout-header', LayoutHeader) // 注册头部组件
    Vue.component('layout-aside', LayoutAside) // 注册左侧导航组件
    Vue.component('bread-crumb', BreadCrumb) // 注册面包屑组件
  }
}
