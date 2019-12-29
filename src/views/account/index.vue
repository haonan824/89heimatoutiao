<template>
  <el-card class="boss">
    <bread-crumbs slot="header">
      <template slot="title">账号信息</template>
    </bread-crumbs>
    <el-upload action="" :http-request="putimg" :show-file-list="false" class="imgs">
      <img :src="formData.photo ? formData.photo : imgs" alt />
    </el-upload>
    <el-form ref='myform' :model='formData' :rules='rules' >
      <el-form-item label="名称" label-width="80px" prop='name'>
        <el-input style="width:300px" v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="简介" label-width="80px" prop='intro'>
        <el-input style="width:300px" v-model="formData.intro"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" label-width="80px" prop='email'>
        <el-input style="width:300px" v-model="formData.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号" label-width="80px">
        <el-input disabled style="width:300px" v-model="formData.mobile"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="margin-left:100px;" @click='putintro' type="primary">保存信息</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { getphoto, getuser, getusers } from '../../acticles/articles'
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      formData: {
        name: '', // 用户名
        intro: '', // 简介
        photo: '', // 头像
        email: '', // 邮箱
        mobile: '' // 手机号
      },
      imgs: require('../../assets/img/mao.jpg'),
      rules: {
        name: [{ required: true, message: '用户名不能为空' }, {
          min: 1,
          max: 7,
          message: '用户名的长度限制为1到7个字符'
        }],
        intro: [{ required: true, message: '简介不能为空' }],
        email: [{ required: true, message: '邮箱不能为空' }, {
          pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
          message: '邮箱格式不正确'
        }]
      }
    }
  },
  methods: {
    async putimg (img) { // 头像上传
      let data = new FormData()
      data.append('photo', img.file)
      let res = await getphoto(data)
      this.formData.photo = res.data.photo
      this.$message({
        message: '上传成功',
        type: 'success'
      })
      eventBus.$emit('Implementation')
    },
    putintro () { // 更改用户信息
      this.$refs.myform.validate(async (isOk) => {
        if (isOk) {
          await getuser(this.formData)
          this.$message({
            message: '更改成功',
            type: 'success'
          })
          eventBus.$emit('Implementation')
        }
      })
    },
    async getmessage () {
      let res = await getusers()
      this.formData = res.data
    }
  },
  created () {
    this.getmessage()
  }
}
</script>

<style lang='less' scoped>
.imgs {
  position: absolute;
  right: 20%;
  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
}
</style>
