<template>
  <div class="login">
    <!-- 表单 -->
    <el-card class="login-card">
      <!-- 表单内容 -->
      <!-- 头部logo部分 -->
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <!-- 表单 -->
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" style="margin-top:20px">
        <!-- 表单容器 设置prop属性 表示要校验的字段名-->
        <el-form-item prop="mobile">
          <!-- 表单域 -->
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code" >
          <el-input v-model="loginForm.code" style="width:60%" placeholder="请输入验证码"></el-input>
          <!-- 放置一个按钮 -->
          <el-button style="float:right" plain>发送验证码</el-button>
        </el-form-item>
        <!-- 表单域 -->
        <el-form-item prop="checked" >
          <!-- 是否同意被人家坑 -->
          <el-checkbox v-model="loginForm.checked" >我已阅读同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button @click="login" style="width:100%" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 登录表单的数据
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        checked: false // 是否同意用户协议
      },
      // 定义表单的验证规则
      loginRules: {
        mobile: [{ required: 'ture', message: '憨憨你的手机号是空的' }, {
          pattern: /^1[3-9]\d{9}$/, // 正则表达式
          message: '手机号输入有误'
        }], // 手机号的验证规则
        code: [{ required: true, message: '您的验证码不能为空' }, {
          pattern: /^\d{6}$/, // 要求6个数字
          message: '验证码应该是6位数字'
        }],
        // validator自定义校验 因为required并不能校验 true false
        // 成功或失败都会执行callback  失败的话执行这个函数会抛出一个错误
        // rule当前的校验规则 value当前要校验的值 callback是一个回调函数
        checked: [{
          validator: function (rule, value, callback) {
            //  value ? callback() 如果  value是true
            // : callback(new Error('您还未同意')) 如果value是false
            value ? callback() : callback(new Error('您还未同意'))
          }
        }] // 是否勾选的规则
      }
    }
  },
  methods: {
    // ref 可以获取组件对象实例 和原始的dom对象
    login () {
      //    this.$refs.loginForm 获取的就是el-form的对象实例
      // 第一种 回调函数 isOK, fields(没有校验通过的字段)
      // this.$refs.loginForm.validate(function (isOK) {
      //   if (isOK) {
      //     console.log('校验通过')
      //   } else {
      //     console.log('校验未通过')
      //   }
      // }) // 方法
      // 第二种方式 promise
      this.$refs.loginForm.validate().then(() => {
        // 如果成功通过 校验就会到达 then
        // 通过校验之后 应该做什么事 -> 应该调用登录接口 看看手机号是否正常
        //   this.$axios.get/post/delete/put
        this.$axios({
          url: '/authorizations', // 请求地址
          data: this.loginForm,
          // data: { ...this.loginForm, checked: null }, // body请求体参数
          method: 'post'
        }).then(result => {
          // 成功 之后打印结果
          // 把钥匙放在兜里 也就是把token存于 本地缓存
          window.localStorage.setItem('user-token', result.data.token)
          // 跳转到主页
          this.$router.push('/home') // push 和 router-link类似 to属性 可以直接是字符串 也可以是对象
        }).catch(() => {
          // 提示消息
          // 第一种用法
          // this.$message({ message: '用户名或者密码错误', type: 'error' })
          this.$message.error('用户名或者密码错误')
        })
      })
    }
  }

}
</script>

<style lang='less' scoped>
// 加了scoped属性 就只会对当前自己的组件起作用
// 如果需要写less 需要在style标签中 lang='less'
.login {
  background-image: url("../../assets/img/hzw.jpg");
  height: 100vh; // 当前屏幕可视区域分成100份
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    background-color: rgba(0, 0, 0, 0);
    width: 440px;
    height: 340px;
    .title {
      text-align: center;
      img {
        height: 40px;
      }
    }
  }
}
</style>
