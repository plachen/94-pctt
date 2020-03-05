<template>
  <el-row align="middle" type="flex" class="layou-header">
    <el-col :span="12" class="left">
      <!-- i是图标 -->
      <i class="el-icon-s-fold"></i>
      <span>江苏传智播客</span>
    </el-col>
    <el-col class="right" :span="12">
      <!-- 在放一个row组件 用它的布局 -->
      <el-row type="flex" justify="end" align="middle">
        <img :src="userInfo.photo" alt />
        <el-dropdown trigger="click" @command="clickMenu">
          <span>{{ userInfo.name }}</span>
          <!-- <el-dropdown-menu>专门做下拉菜单的组件 需要有具名插槽dropdown -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="info">个人信息</el-dropdown-item>
            <el-dropdown-item command="git">该学习了</el-dropdown-item>
            <el-dropdown-item command="lgout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {
        // 用户个人信息
      }
    }
  },
  methods: {
    clickMenu (command) {
    //  需要处理三种情况
      if (command === 'info') {
        // 如果点击了个人信息
      } else if (command === 'git') {
        // 如果点击了git
        window.location.href = 'https://www.boxuegu.com/user/login/?refer=https://online.itheima.com/'
      } else {
        // 退出系统 删除token 跳转回登录页面
        localStorage.removeItem('user-token') // 删除缓存
        // 编程式导航
        this.$router.push('/login')
      }
    }
  },
  created () {
    // 获取用户个人信息
    // 应该定义一个对象接收数据
    this.$axios({
      url: '/user/profile' // 请求地址

    }).then(result => {
      // 如果加载成功了 我们把数据赋值给userInfo
      this.userInfo = result.data.data
    }) // .then这是看获取的结果的
  }
}
</script>

<style lang="less" scoped>
.layou-header {
  height: 60px;
  .left {
    i {
      font-size: 20px;
    }
  }
  .right {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 4px;
    }
  }
}
</style>
