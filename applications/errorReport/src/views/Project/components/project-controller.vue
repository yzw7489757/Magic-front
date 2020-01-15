<template>
  <div>
    <y-button type="primary" @click="triggerToOpenModal">新增</y-button>
     <y-modal :visible="open" @hide="hideModal" defaultWidth="400px">
       <y-form :model="projectInfo" label-width="90px" :rules="projectRule" ref="projectInfo" class="project-form">
          <y-form-item label="项目名称"  prop="projectName">
            <y-input v-model.trim="projectInfo.projectName"  placeholder="请输入..."></y-input>
          </y-form-item>
          <y-form-item label="运行环境"  prop="platform">
            <y-input v-model="projectInfo.platform" placeholder="请输入"></y-input>
          </y-form-item>
          <y-form-item label="   ">
            <y-button type="plain" @click="triggerToAddNewProject(true)">确定</y-button>
            <y-button type="plain" @click="triggerToAddNewProject(false)">取消</y-button>
          </y-form-item>
        </y-form>
        <!-- <y-select
          :options="options"
          v-model="selected"
          @onChange="methodToRunOnSelect">
        </y-select>
         <y-select
          :options="options"
          v-model="selected"
          @onChange="methodToRunOnSelect">
        </y-select> -->

    </y-modal>
  </div>
</template>

<script>
export default {
  name: 'project-controller',
  data() {
    return {
      open: false,
      options: [
        { label: 'H5', value: 'H5' },
        { label: 'PC', value: 'PC' },
        { label: 'Hybrid', value: 'Hybrid' }
      ],
      selected: "H5",
      projectInfo: {
        projectName: '', // 项目名称
        // createTime: Date.now(), // 创建时间
        platform: '' // 项目运行环境
        // running: true, // 服务状态
        // creator: '' // 创建者
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
          }
        ]
      }
    }
  },
  methods: {
    methodToRunOnSelect(payload) {
      this.selected = payload
    },
    hideModal() {
      this.open = false
      this.$refs.projectInfo.resetFields()
    },
    triggerToAddNewProject(status) {
      if (!status) {
        return this.hideModal()
      }
      this.$refs.projectInfo.validate().then((res) => {
        if (!res) {
          this.$msg.error('请正确填写')
        } else {
          console.log(111)
        }
      })
    },
    triggerToOpenModal() {
      this.open = true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
