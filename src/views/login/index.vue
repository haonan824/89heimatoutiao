<template>
  <div class="login">
    <el-card class="login-card">
      <div class="login-img">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <el-form ref='myform' style="margin-top:20px" :model="loginForm" :rules='loginVerify'>
        <el-form-item  prop='phone'>
          <el-input v-model="loginForm.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop='auth'>
          <el-input v-model="loginForm.auth" placeholder="请输入验证码" class="input-two"></el-input>
          <el-button plain class="login-button">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop='agree'>
          <el-checkbox v-model="loginForm.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary" @click="submitlogin">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        phone: '',
        auth: '',
        agree: false
      },
      loginVerify: {
        phone: [{ required: true, message: '手机号不能为空' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入合法的手机号' }],
        auth: [{ required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }],
        agree: [{ validator: function (rule, value, callback) {
          if (value) {
            callback()
          } else {
            callback(new Error('你必须无条件同意'))
          }
        } }]
      }
    }
  },
  methods: {
    submitlogin () {
      this.$refs.myform.validate((isOk) => {
        if (isOk) {
          this.$axios.post('/authorizations', { mobile: this.loginForm.phone, code: this.loginForm.auth }).then(res => {
            window.localStorage.setItem('user-token', res.data.token)
            this.$router.push('/home')
          })
        }
      })
    }
  }
}
</script>

<style lang='less'>
.login {
  height: 100vh;
  background-image: url("../../assets/img/login_dg.jpg");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    width: 440px;
    height: 320px;
    .login-img {
      text-align: center;
      img {
        height: 35px;
      }
    }
    .input-two {
      width: 60%;
    }
    .login-button {
      float: right;
    }
  }
}
</style>
