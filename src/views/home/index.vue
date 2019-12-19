<template>
  <el-container>
    <el-aside  style="width:230px; min-height:100vh; background-color: #323745;">
      <homelist></homelist>
    </el-aside>
    <el-container>
      <el-header>
        <hometop></hometop>
      </el-header>
      <el-main style="padding:0;margin:0">
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
</script>

<style>
</style>
