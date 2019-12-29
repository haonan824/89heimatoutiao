<template>
  <div class="home-list">
    <div class="homeimg">
      <img :src="change ? minimg : maximg" alt />
    </div>
    <el-menu :collapse='change' :style="change?'width:60px' : 'width:230px'"  router background-color='#353b4e' text-color='#adafb5' active-text-color='#ffd04b'>
      <el-menu-item index="/home">
      <i class="el-icon-s-home"></i>
      <span>首页</span>
      </el-menu-item>
      <el-submenu index='1'>
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item index="/home/publish">发布文章</el-menu-item>
        <el-menu-item index="/home/articles">内容列表</el-menu-item>
        <el-menu-item index="/home/comment">评论列表</el-menu-item>
        <el-menu-item index="/home/material">素材管理</el-menu-item>
      </el-submenu>
      <el-submenu  index='2'>
        <template slot="title">
          <i class="el-icon-star-on"></i>
         <span>粉丝管理</span>
          </template>
        <el-menu-item index="/home/picture">图文数据</el-menu-item>
        <el-menu-item index="/home/fansinfo">粉丝画像</el-menu-item>
        <el-menu-item index="/home/fanslife">粉丝概况</el-menu-item>
        <el-menu-item index="/home/fanslist">粉丝列表</el-menu-item>
      </el-submenu>
      <el-menu-item index="/home/account">
        <i class="el-icon-s-custom"></i>
        <span>账户信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
// import eventBus from '../../utils/eventBus'
export default {
  props: ['change'],
  data () {
    return {
      maximg: require('../../assets/img/logo_admin.png'),
      minimg: require('../../assets/img/toutiao.png')
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu{
  border: none;
}
.home-list {
  background-color: #323745;
  overflow: hidden;
  .homeimg {
    background-color: #2e2f32;
    padding-top: 8px;
    text-align: center;
    padding-bottom: 8px;
    img {
      height: 35px;
    }
  }
}
</style>
