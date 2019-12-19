<template>
  <div class="login">
      <el-card class="login-card">
          <div class="login-img">
              <img src="../../assets/img/logo_index.png" alt="">
          </div>
          <el-form ref="myform" :model='loginform' :rules='yanzhengform' style="margin-top:30px">
              <el-form-item prop='sj'>
                  <el-input placeholder="请输入手机号" v-model="loginform.sj"></el-input>
              </el-form-item>
              <el-form-item prop='yz'>
                  <el-input class="login-input" v-model="loginform.yz" placeholder="请输入验证码"></el-input>
                  <el-button style="float:right" plain>发送验证码</el-button>
              </el-form-item>
               <el-form-item prop='nv'>
                  <el-checkbox v-model="loginform.nv">我已阅读并同意用户协议和隐私条款</el-checkbox>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="verify" style="width:100%">登录</el-button>
              </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginform: {
        sj: '',
        yz: '',
        nv: false
      },
      yanzhengform: {
        sj: [{ required: true, message: '手机号不能为空' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号格式错误' }],
        yz: [{ required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }],
        nv: [{ validator: function (rule, value, callback) {
          if (value) {
            callback()
          } else {
            callback(new Error('你必须选择'))
          }
        } }]
      }
    }
  },
  methods: {
    verify () {
      this.$refs.myform.validate(function (isOk) {
        if (isOk) {
          console.log('校验成功，连接接口')
        }
      })
    }
  }
}
</script>

<style lang="less">
.login{
    height: 100vh;
    background-image: url('../../assets/img/login_db.jpg');
    background-size: cover;
    display: flex;
    .login-card{
        margin: auto;
        width: 450px;
        height: 350px;
        .login-img{
            text-align: center;
            img{
                height: 35px;
            }
        }
    }
    .login-input{
        width: 65%;
    }
}
</style>
