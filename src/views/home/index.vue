<template>
  <!-- 先在最外层放置一个大容器 因为 小容器只能放到大容器里面 -->
  <el-container>
    <el-aside style="width:230px">
      <!-- 左侧导航组件 -->
      <layout-aside></layout-aside>
    </el-aside>
    <!-- 右侧 再嵌套一个 el-container -->
    <el-container>
      <!-- 再上下布局 -->
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <!-- 主要区域 -->
      <el-main>

        <!-- 这里应该放置 二级路由容器 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 将左侧导航组件引入 注册并使用  用局部注册

export default {

}
</script>

<style>
</style>
