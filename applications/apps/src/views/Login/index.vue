<template>
  <div>
      <canvas class="login-container" ref="container" />
      <y-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="user-ruleForm">
        <y-form-item label="" prop="userName" :identification="false">
          <y-input v-model="ruleForm.userName" placeholder="username..."></y-input>
        </y-form-item>
         <y-form-item label="" prop="password" :identification="false">
            <y-input v-model="ruleForm.password" @keyup.enter="Login" placeholder="password..."></y-input>
          </y-form-item>
         <y-form-item>
          <y-button type="primary" @click="Login">Submit</y-button>
        </y-form-item>
      </y-form>
  </div>

</template>

<script>
import { Login, Register } from '@/api/user'
import { setToken, setUserInfo } from '@/utils/auth'
export default {
  name: 'login',
  data() {
    return {
      ruleForm: {
        userName: 'yzw',
        password: '123456'
      },
      rules: {
        userName: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3-15', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3-15', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      return new Promise((resolve, reject) => {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            resolve()
          } else {
            reject()
            return false
          }
        })
      })
    },
    async Login() {
      try {
        await this.submitForm()
        const userInfo = await Login(this.ruleForm)
        setToken(userInfo.token)
        setUserInfo(userInfo)
        this.$msg.success({
          text: '登录成功',
          duration: 2000
        }, () => {
          this.$router.replace({ path:this.$route.query.from })
        })
      } catch (e) {
        this.$msg.error({
          message: e,
          duration: 2000
        })
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  },
  mounted() {
    // this.$msg.info('aaa')
  }
}
</script>

<style lang="scss" scoped>
.user-ruleForm{
  margin: 200px auto;
  width:400px;
  text-align:center;
}
</style>
