<template>
<el-upload
  class="avatar-uploader"
  action="123"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :on-change="onchange"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
</template>

<script>
export default {
  data () {
    return {
      imageUrl: ''
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 当上传图片后，调用onchange方法，获取图片本地路径
    onchange (file, fileList) {
      var _this = this
      // eslint-disable-next-line no-use-before-define
      var event = event || window.event
      // eslint-disable-next-line no-redeclare
      var file = event.target.files[0]
      var reader = new FileReader()
      // 转base64
      reader.onload = function (e) {
        _this.imageUrl = e.target.result // 将图片路径赋值给src
      }
      reader.readAsDataURL(file)
    }
  }
}
</script>

<style>

</style>
