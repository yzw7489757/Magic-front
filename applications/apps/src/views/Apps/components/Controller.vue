<template>
  <div>
    <a-form-model layout="inline" :model="formInfo" @submit="handleSubmit" @submit.native.prevent>
      <a-form-model-item label="App Name" >
        <a-input v-model.trim="formInfo.appName"  placeholder=""/>
      </a-form-model-item>
      <a-form-model-item label="Running Statu">
        <a-select :options="runningList" v-model="formInfo.running"  style="min-width: 120px"/>
      </a-form-model-item>
      <a-form-model-item label="Creator" >
        <a-input v-model.trim="formInfo.creator"  placeholder=""/>
      </a-form-model-item>
      <a-form-model-item label="">
        <a-button type="primary" html-type="submit" style="margin-right: 10px">Search</a-button>
        <a-button type="primary" @click="toggleModal">Register App</a-button>
      </a-form-model-item>
    </a-form-model>

     <y-modal :visible="open"  @hide="toggleModal" defaultWidth="400px">
       <a-form-model ref="appForm" :rules="appRule" :model="appInfo" @submit="triggerToAddNewProject" @submit.native.prevent>
        <a-form-model-item label="App Name" prop="appName">
          <a-input v-model.trim="appInfo.appName"  placeholder=""/>
        </a-form-model-item>
        <a-form-model-item label="Platform" prop="platform" extra="Only Display needs">
          <a-select :options="options" v-model="appInfo.platform"/>
        </a-form-model-item>
        <a-form-model-item label="Running Statu" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
          <a-switch v-model="appInfo.delivery" />
        </a-form-model-item>
        <a-form-model-item label="">
          <a-button type="primary" html-type="submit">Create</a-button>
        </a-form-model-item>
      </a-form-model>
    </y-modal>
  </div>
</template>

<script>
import { addNewApplication } from '@/api/application'
import { getUserInfo } from '@/utils/auth'

export default {
  name: 'project-controller',
  data() {
    return {
      open: false,
      formInfo: {
        appName: '',
        creator: '',
        running: ''
      },
      runningList: [
        { label: 'All', value: '' },
        { label: 'Running', value: '1' },
        { label: 'Closed', value: '0' }
      ],
      options: [
        { label: 'H5', value: 'H5' },
        { label: 'PC', value: 'PC' },
        { label: 'Hybrid', value: 'Hybrid' }
      ],
      appInfo: {
        appName: '', // 项目名称
        platform: '', // 项目运行环境
        running: false
      },
      appRule: {
         appName: [
          { required: true, message: "Please input Application Name", trigger: "blur" },
          { min: 2, max: 15, message: "Length should be 2 to 15", trigger: "blur" },
         ],
         platform: [
           { required: true, message: "Please input Platform", trigger: "blur" },
         ]
      }
    }
  },
  methods: {
    handleSubmit(){
      this.$emit('onSearch', this.formInfo)
    },
    toggleModal() {
      this.open = !this.open
      this.$refs.appForm.resetFields();
      // let i = 0
      // const options = this.options
      // function addNew () {
      //   i++
      //   let r = Math.random()
      //   addNewApplication({
      //     appName: '测试项目' + i + r.toString(36).split('').join('.').substr(4, 7), // 项目名称
      //     running: Number(r > 0.5) ? '0' : '1',
      //     platform: options[(r * 3) | 0].value, // 项目运行环境
      //     createTime: new Date(Date.now() - r * 24 * 3600 * 365 * 1000), // 创建时间
      //     creator: getUserInfo().nickName // 创建者
      //   })
      //   if (i < 10) {
      //     window.requestAnimationFrame(addNew)
      //   }
      // }
      // window.requestAnimationFrame(addNew)
    },
    async triggerToAddNewProject(status) {
      if (!status) {
        return this.toggleModal()
      }
      try {
        const validate = await this.$refs.appForm.validate()
        console.log('validate: ', validate);
        const { code, error } = await addNewApplication({
          ...this.appInfo,
          createTime: new Date(), // 创建时间
          creator: getUserInfo().nickName // 创建者
        })
        this.toggleModal()
        this.$msg.primary('添加成功')
      } catch (e) {
        console.log('e: ', e);
        this.$msg.error(e)
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
