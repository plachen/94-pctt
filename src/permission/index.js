// 专门处理路由权限问题
import router from '@/router'
// 注册全局前置守卫
router.beforeEach(function (to, from, next) {
  // next()// 表示放过  next()必须执行 在没有参数的情况下是直接通过
  // 如果next(false) 那么就没法跳转 表示当前的跳转被停止了
  // 首先应该判断 需要拦截哪些页面 弱国页面地址以/home为开头 就需要token的判断
  // 判断你要去的页面是不是以。home为开头
  if (to.path.startsWith('/home')) {
    const token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
