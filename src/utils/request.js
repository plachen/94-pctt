// 封装请求工具
// 实际上是对于axios的二次封装
// 配置拦截器 以及其他
import axios from 'axios'
import router from '@/router' // 路由实例对象
import JSONBig from 'json-bigint' // 引入第三方处理大数字的包
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 配置公共的请求头地址
// 对axios的返回数据进行自定义处理 用json-bigint （第三方包）替代原来的json
axios.defaults.transformResponse = [function (data) {
// 这里要判断 data是不是空
  // 这里主要处理id超过大数字的时候 转化不正确的问题
  return data ? JSONBig.parse(data) : {}
}]
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

// 响应拦截器的开发axios.interceptors.response.ues()  参数跟上面一样 第一个成功时执行 第二个失败时执行
axios.interceptors.response.use(function (response) {
  // 第一个参数时响应体
// 在拦截器中 需要将数据返回 将数据进行解构
  return response.data ? response.data : {}// 有的接口没有任何的响应数据
}, function (error) {
  // 是错误对象 里面包含的错误的状态码
// 401状态码 表示用户认证失败 用户身份不对
// 401出现的时候表示钥匙不对 钥匙过期 钥匙没拿 钥匙名不对 钥匙格式不对
// 之前的导航守卫 校验了token有没有 检查了钥匙有欸有
// 应该换一把新钥匙 项目一是粗暴的换 项目二是温柔的换
// 粗暴的换 回登录页面 重新登录换一把新的 重来
// 回登录页之前应该把旧钥匙清除
  if (error.response.status === 401) {
    localStorage.removeItem('user-token') // 删除钥匙
    router.push('/login') // 直接导入路由实例对象 使用跳转方式 和组件中的this.$router 是一样的
    // 这里用this.$router是错误的 它并不是组件实例 需要导入
  }
  // 进行错误的处理
  return Promise.reject(error)
  // 所有的axios调用 依然可以在catch中得到错误
})
export default axios
