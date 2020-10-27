<template>
  <div class="register-box">
    <a-form-model
      ref="ruleForm"
      class="register-form"
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
      <a-form-model-item ref="nickName" label="nickName" prop="nickName">
        <a-input
          v-model="form.nickName"
          @blur="
            () => {
              $refs.nickName.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item ref="email" label="E-mail" prop="email">
        <a-input
          v-model="form.email"
          addon-after=".com"
          @blur="
            () => {
              $refs.email.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit"> Create </a-button>
        <a-button style="margin-left: 10px" @click="resetForm">
          Reset
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import { Register } from "@/api/user";
export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        userName: "",
        nickName: "",
        password: "",
        email: "",
      },
      rules: {
        userName: [
          {
            required: true,
            message: "Please input user name",
            trigger: "blur",
          },
          {
            pattern: /^([A-Za-z0-9_\-\.])/,
            message: "userName Format error",
            trigger: "blur",
          },
          {
            min: 5,
            max: 13,
            message: "Length should be 5 to 13",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "Please input password", trigger: "blur" },
          {
            pattern: /^([A-Za-z0-9_\-\.])/,
            message: "password Format error",
            trigger: "blur",
          },
          {
            min: 6,
            max: 13,
            message: "Length should be 6 to 13",
            trigger: "blur",
          },
        ],
        nickName: [
          {
            required: true,
            message: "Please input nick name",
            trigger: "blur",
          },
          {
            min: 2,
            max: 8,
            message: "Length should be 2 to 8",
            trigger: "blur",
          },
        ],
        email: [
          {
            pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-])/,
            message: "E-mail Nonstandard",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    async onSubmit() {
      try {
        await this.$refs.ruleForm.validate();
        Register({
          ...this.form,
          email: this.form.email ? `${this.form.email}.com` : "",
        }).then((res = {}) => {
          if (!res.error) {
            this.$msg.success("注册成功", () => {
              this.$router.push({ name: "login" });
            });
          }
        });
      } catch (e) {
        // console.log(e)
      }
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>

<style lang="less">
.register-box {
  width: 600px;
  margin: 200px auto 0 auto;
}
</style>