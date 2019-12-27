<template>
  <div>
    <div @click="openDialog(index)" class="imgframe" v-for="(itme,index) in list" :key="index">
      <img :src="itme ? itme : defaultimg" alt />
    </div>
    <el-dialog :visible="dialogVisible" @close="closeDialog" title="选择封面图片">
      <img-matter @transmit='uploading'></img-matter>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="closeDialog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      imgsite: '',
      defaultimg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false, // 用来控制弹层的开关
      subscript: -1
    }
  },
  methods: {
    uploading (img) {
      this.dialogVisible = false
      this.$emit('putimg', img, this.subscript)
    },
    openDialog (index) {
      this.subscript = index
      this.dialogVisible = true // 打开弹层
    },
    closeDialog () {
      this.dialogVisible = false // 关闭弹层
    }
  }
}
</script>

<style lang="less" scoped>
.imgframe {
  display: inline-block;
  width: 200px;
  height: 200px;
  border: 1px solid #ccc;
  img {
    height: 100%;
    width: 100%;
  }
}
</style>
