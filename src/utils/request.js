// 封装请求工具
// 实际上是对于axios的二次封装
// 配置拦截器 以及其他
import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 配置公共的请求头地址
// 请求拦截器的开发 xios.interceptors.request.use 这里面的参数是两个回调函数
axios.interceptors.request.use(function (config) {
  // 成功时执行第一个  参数会有一个config  是所有axios的请求信息
  // 在第一个函数中 需要将配置进行返回 返回的配置 会作为请求参数作为请求
// 在返回之前 就是我们同意注入token的最佳时间
  const token = localStorage.getItem('user-token') // 从兜里拿出来token
  config.headers.Authorization = `Bearer ${token}` // 统一注入
  return config
}, function (error) {
  // 失败时执行第二个
  return Promise.reject(error)
})
export default axios
