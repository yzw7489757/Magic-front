<template>
  <div>
      <canvas class="login-container" ref="container" />
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="user-ruleForm">
        <el-form-item label="" prop="userName">
          <el-input v-model="ruleForm.userName" placeholder="username..."></el-input>
        </el-form-item>
         <el-form-item label="" prop="password">
            <el-input v-model="ruleForm.password" @keyup.enter="Login" placeholder="password..."></el-input>
          </el-form-item>
         <el-form-item>
          <el-button type="primary" @click="Login">Submit</el-button>
        </el-form-item>
      </el-form>
  </div>

</template>

<script>
import Qarticles from 'Qarticles'
import { Login, Register } from '@/api/user'
import { setToken, setUserInfo } from '@/utils/auth'
import { Message } from 'element-ui'
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
    generatorBackground() {
      var canvas = this.$refs.container
      const speed = 100
      var covColorFuc = function (dot, w, h) {
        return `rgba(${Math.floor(255 * (1 - dot.x / w))}, ${Math.floor(255 * (1 - dot.y / h))},${Math.floor(255 * (dot.speedArr[0] / 100))}, 0.6)`
      }

      var lineColorFuc = function (dot, w, h) {
        return `rgba(${Math.floor(255 * (1 - dot.x / w))}, ${Math.floor(255 * (1 - dot.y / h))},${Math.floor(255 * (dot.speedArr[0] / 100))}, 0.3)`
      }

      var covSpeedFuc = function (speed) {
        return Math.random() * speed * (Math.random() * 10 > 5 ? -1 : 1)
      }

      var options = {
        lineLink: {
          count: 2,
          show: true
        },
        color: {
          dotColorFuc: covColorFuc,
          lineColorFuc: lineColorFuc
        },
        dot: {
          physical: true,
          speed: speed,
          vxFuc: covSpeedFuc,
          vyFuc: covSpeedFuc,
          count: 80,
          size: {
            random: true,
            max: 20,
            min: 0
          }
        }

      }

      var qarticles = new Qarticles(canvas, options)
    },
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
        Message({
          message: '登录成功',
          type: 'success',
          duration: 2000,
          onClose: () => {
            this.$router.push('/')
          }
        })
      } catch (e) {
        Message({
          message: e,
          type: 'error',
          duration: 2000
        })
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  },
  mounted() {
    // this.generatorBackground()
  }
}
</script>

<style lang="scss" scoped>
.login-container{
  position:absolute;
  top:0;
  left:0;
  bottom:0;
  right:0;
}
.user-ruleForm{
  margin: 200px auto;
  width:400px;
}
</style>
