<template>
  <div>
      <div class="imgframe" v-for="(itme,index) in list" :key="index">
          <img src="../../assets/img/pic_bg.png" alt="">
      </div>
  </div>
</template>

<script>
export default {
  props: ['list']
}
</script>

<style lang="less" scoped>
.imgframe{
    display: inline-block;
    width: 200px;
    height: 200px;
    border: 1px solid #ccc;
    img{
        height: 100%;
        width: 100%;
    }
}
</style>
