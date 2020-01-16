<template>
  <div>
    <y-form :inline="true" label-width="90px">
      <y-form-item label="项目名称" >
        <y-input v-model.trim="application.projectName"  placeholder=""/>
      </y-form-item>
      <y-form-item label="运行状态" >
        <y-select :options="runningList" v-model="application.running" />
      </y-form-item>
      <y-form-item label="创建者" >
        <y-input v-model.trim="application.creator"  placeholder=""/>
      </y-form-item>
      <y-form-item label=" " >
        <y-button type="primary" @click="$emit('onSearch', application)">查询</y-button>
        <y-button type="primary" @click="toggleModal">新增</y-button>
      </y-form-item>
    </y-form>

     <y-modal :visible="open"  @hide="toggleModal" defaultWidth="400px">
       <y-form :model="projectInfo" :inline="true" label-width="90px" :rules="projectRule" ref="projectInfo" class="project-form">
          <y-form-item label="项目名称"  prop="projectName">
            <y-input v-model.trim="projectInfo.projectName"  placeholder="请输入..."></y-input>
          </y-form-item>
          <y-form-item label="运行环境" prop="platform">
            <y-select
              :options="options"
              v-model="projectInfo.platform">
            </y-select>
          </y-form-item>
          <y-form-item label=" ">
            <y-button type="plain" @click="triggerToAddNewProject(true)">确定</y-button>
            <y-button type="plain" @click="triggerToAddNewProject(false)">取消</y-button>
          </y-form-item>
        </y-form>
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
      application: {
        projectName: '',
        creator: '',
        running: 0
      },
      runningList: [
        { label: '运行中', value: 1 },
        { label: '关闭', value: 0 }
      ],
      options: [
        { label: 'H5', value: 'H5' },
        { label: 'PC', value: 'PC' },
        { label: 'Hybrid', value: 'Hybrid' }
      ],
      projectInfo: {
        projectName: '', // 项目名称
        platform: '' // 项目运行环境
      },

      projectRule: {
        projectName: [
          {
            validator: (rule, value, cb) => {
              if (value === '') {
                cb(new Error('项目名称不能为空'))
              } else {
                cb()
              }
            },
            trigger: 'blur'
          }
        ],

        platform: [
          {
            validator: (rule, value, cb) => {
              if (value === '') {
                cb(new Error('运行环境不能为空'))
              } else {
                cb()
              }
            },
            trigger: 'blur'
          },
          {
            validator: (rule, value, cb) => {
              if (value === '') {
                cb(new Error('运行环境不能为空'))
              } else {
                cb()
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    toggleModal() {
      this.open = !this.open
      this.$refs.projectInfo.resetFields()
    },
    validator() {
      return new Promise((resolve, reject) => {
        this.$refs.projectInfo.validate().then((res) => {
          if (!res) {
            this.$msg.error('请正确填写')
          } else {
            resolve()
          }
        })
      })
    },
    async triggerToAddNewProject(status) {
      if (!status) {
        return this.toggleModal()
      }
      try {
        await this.validator()
        await addNewApplication({
          ...this.projectInfo,
          createTime: new Date(), // 创建时间
          running: false, // 服务状态
          creator: getUserInfo().nickName // 创建者
        })
        this.toggleModal()
        this.$msg.primary('添加成功')
      } catch (e) {
        this.$msg.error(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
