<template>
  <div class="login">
      <el-card class="login-card">
          <div class="login-img">
              <img src="../../assets/img/logo_index.png" alt="">
          </div>
          <el-form style="margin-top:20px">
              <el-form-item>
                  <el-input placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-input placeholder="请输入验证码" class="input-two"></el-input>
                  <el-button plain class="login-button">发送验证码</el-button>
              </el-form-item>
              <el-form-item>
                  <el-checkbox>我已阅读并同意用户协议和隐私条款</el-checkbox>
              </el-form-item>
              <el-form-item>
                  <el-button style="width:100%"  type="primary">登录</el-button>
              </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less'>
.login {
    height: 100vh;
    background-image: url("../../assets/img/login_dg.jpg");
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-card{
        width: 440px;
        height: 320px;
        .login-img{
            text-align: center;
            img {
                height: 35px;
            }
        }
        .input-two{
            width: 60%;
        }
        .login-button{
            float: right;
        }
    }
}

</style>
