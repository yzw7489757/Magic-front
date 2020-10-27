<template>
  <div class="login-box">
    <a-form-model
      ref="ruleForm"
      class="login-form"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item ref="userName" label="userName" prop="userName">
        <a-input
          v-model="form.userName"
          @blur="
            () => {
              $refs.userName.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item ref="password" label="password" prop="password">
        <a-input
          v-model="form.password"
          type="password"
          @blur="
            () => {
              $refs.password.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="Login"> Login </a-button>
        <a-button style="margin-left: 10px" @click="toRegister">
          Register
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { Login, Register } from "@/api/user";
import { setToken, setUserInfo } from "@/utils/auth";
export default {
  name: "login",
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        userName: "magic",
        password: "123456",
      },
      rules: {
        userName: [
          { required: true, message: "Please input userName", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3-15", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3-15", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      return new Promise((resolve, reject) => {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            resolve();
          } else {
            reject();
            return false;
          }
        });
      });
    },
    toRegister() {
      this.$router.push({ path: '/register'})
    },
    async Login() {
      await this.submitForm();
      const userInfo = await Login(this.form);
      if (userInfo) {
        setToken(userInfo.token);
        setUserInfo(userInfo);
        this.$msg.success(
          {
            text: "登录成功",
            duration: 2000,
          },
          () => {
            if (this.$route.query.from) {
              this.$router.replace({ path: this.$route.query.from });
            } else {
              this.$router.replace({ name: "home" });
            }
          }
        );
      } else {
        this.$msg.error({
          message: '',
          duration: 2000,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login-box{
  margin: 200px auto;
  width: 600px;
}
</style>
