<template>
  <el-card>
    <!-- 放置面包屑组件 -->
    <bread-crumb slot="header">
      <!-- 具名插槽 -->
      <template slot="title">素材管理</template>
    </bread-crumb>
    <!-- 放置标签页 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="全部素材" name="all">全部</el-tab-pane>
      <el-tab-pane label="收藏素材" name="collect">收藏</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'collect', // 当前激活的页签
      list: [] // 全部素材的数据
    }
  },
  methods: {
    getMaterial () {
      this.$axios({
        url: 'user/images', // 请求地址
        params: {
          collect: false // false 就是获取全部素材  不是收藏的数据 然后在then中等待请求的结果
        }, // get参数 也就是query参数
        data: {} // data参数 放的是body参数
      }).then(result => {
        // 将返回的数据 赋值到data 中
        this.list = result.data.results
      }) // 写完这个函数请求 要在钩子函数中调用一下
    },
    created () {
    // 实例化之后调用 获取素材的数据
      this.getMaterial()
    }
  }
}
</script>

<style>
</style>
