<template>
  <div class="login-main">
    <div class="login-box">
      <div class="login-img"></div>
      <div class="login-form">
        <h1>酒店管理系统</h1>
        <Form class="lz-form" ref="loginForm" :model="loginForm" :rules="ruleInline">
          <FormItem prop="account">
            <div class="lz-form-row">
              <div class="lz-col-1 lz-form-item">
                <label class="lz-form-item-label">账号</label>
                <input
                  class="lz-form-item-input"
                  type="text"
                  autocomplete="off"
                  v-model="loginForm.account"
                />
                <span class="lz-form-item-help"></span>
              </div>
            </div>
          </FormItem>
          <FormItem prop="password">
            <div class="lz-form-row">
              <div class="lz-col-1 lz-form-item">
                <label class="lz-form-item-label">密码</label>
                <input
                  class="lz-form-item-input"
                  type="password"
                  autocomplete="off"
                  v-model="loginForm.password"
                />
                <span class="lz-form-item-help"></span>
              </div>
            </div>
          </FormItem>
          <FormItem>
            <div class="lz-form-row login-btn">
              <button
                type="button"
                class="lz-btn lz-btn-primary"
                v-on:click="handleLogin('loginForm')"
              >
                登录
              </button>
            </div>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import {login} from '../network/login.js'
export default {
  data() {
    return {
        loginForm:{
            account: '',
            password: ''
        },
        ruleInline: {
            account: [
                { required: true, message: '账号不能为空！', trigger: 'blur' }
            ],
            password: [
                { required: true, message: '密码不能为空！', trigger: 'blur' }
            ]
        }
    };
  },
  methods: {
    handleLogin(formName) {
        this.$refs[formName].validate((valid) => {
           if (valid) {
               this.login(this.loginForm.account,this.loginForm.password);
           }
        });
    },
    login(account, password){
        login(account, password).then(res => {
            if(res.status === 200){
                //如果登录成功
                //提示登录成功信息
                this.$Message.info("登陆成功！");
                //将accessToken保存到sessionStorage
                window.localStorage.setItem("accessToken", res.data.token);
                console.log(window.localStorage.getItem('accessToken'));
                this.$router.push('/index')
            }else {
                this.$Message.error("用户名不存在或密码错误！登陆失败！");
            }
        })
     }
  }
};
</script>

<style scoped>
.login-main {
  width: 100%;
  height: 100%;
  background-color: #515a6e;
  background-size: 100% 100%;
}

.login-box {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 900px;
  height: 450px;
  background: #fff;
  box-shadow: 0 20px 80px 0 rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  display: flex;
}

.login-img {
  width: 100%;
  height: 100%;
  flex: 1;
  background: url("../../static/login-back.jpg");
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  min-width: 450px;
  background-size: cover;
}
.login-form {
  flex: 1;
  padding: 0 80px;
  padding-top: 60px;
}

.login-form .lz-form-row {
  margin-bottom: 10px;
}

.login-form h1 {
  padding: 30px 0;
  margin-bottom: 20px;
}

.login-btn {
  margin-top: 20px;
}

.login-btn button {
  width: 100%;
  border-radius: 20px;
}

.register {
  padding: 20px;
  text-align: center;
}

.register a {
  color: #515a6e;
  cursor: pointer;
  font-size: 15px;
}
</style>
