<template>
  <el-container>
    <el-aside width='230px'>
      <homelist></homelist>
    </el-aside>
    <el-container>
      <el-header>
        <hometop></hometop>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
</script>

<style>
</style>
