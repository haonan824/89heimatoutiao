<template>
  <div>
    <el-row style="height:60px" type="flex" align="middle" justify="space-between">
      <el-col :span="7">
        <i class="el-icon-s-unfold" style="margin-right:5px"></i>
        <span>江苏传智播客教育科技股份有限公司</span>
      </el-col>
      <el-col :span="4">
        <el-row  type="flex" align="middle">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" class="via"></el-avatar>
            <el-dropdown trigger="click"  style="">
            <span class="el-dropdown-link">
                楠欲上青天
                <i class="el-icon-arrow-down el-icon--right"></i>
             </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人详细</el-dropdown-item>
                <el-dropdown-item>git地址</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  created () {

  }
}
</script>

<style lang="less" scoped>
  .via{
      margin-right: 10px;
  }
</style>
