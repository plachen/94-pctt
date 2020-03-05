<template>
  <!-- 使用面包屑组件  separator=">"这是选项与选项之间的分隔符-->
  <el-breadcrumb separator=">">
    <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
    <!-- 第二个选项是动态的 需要以传值的方式传进来 props 传值 slot插槽 -->
    <el-breadcrumb-item>
      <!-- 内容是动态的 -->
      <!-- 定义一个具名插槽 -->
        <slot name='title'></slot>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {}
</script>

<style>
</style>
