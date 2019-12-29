<template>
  <el-container>
    <el-aside :style="variable ? 'width:60px;' : 'width:230px;'"    style="transition:all 0.4s; width:230px; min-height:100vh; background-color: #323745;">
      <homelist :change='variable'></homelist>
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
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      variable: false
    }
  },
  methods: {
    getintro () {
      this.variable = !this.variable
    }
  },
  created () {
    eventBus.$on('transform', () => {
      this.getintro()
    })
  }
}
</script>

<style>
.el-aside{
  border: none;
}
</style>
