<template>
  <Card
    tableName="Application List"
    describe="Operation status of all sub applications"
  >
    <table class="project-list">
      <thead>
        <tr>
          <th>子应用名称</th>
          <th>创建时间</th>
          <th>运行环境</th>
          <th>运行状态</th>
          <th>创建者</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in appList" :key="item.id">
          <td>{{ item.appName }}</td>
          <td>{{ item.createTime | time }}</td>
          <td>{{ item.platform }}</td>
          <td>
            <Bedge
              :text="item.running === '1' ? 'Running' : 'Closed'"
              :running="item.running === '1'"
            />
          </td>
          <td>{{ item.creator }}</td>
          <td>
            <y-swtich
              :value="item.running"
              @onChange="(status) => $emit('onChange', item, status)"
              open-text="enable"
              close-text="disable"
            />
          </td>
          <td>
            <y-button
              @click="
                $router.push({ name: 'app-config', params: { id: item.id } })
              "
              >管理</y-button
            >
          </td>
        </tr>
      </tbody>
    </table>
  </Card>
</template>

<script>
import Card from "@/components/Card/index";
import Bedge from "@/components/Bedge/index.vue";

export default {
  name: 'AppDashboard',
  components: {
    Card,
    Bedge,
  },
  props: {
    appList: {
      type: Array,
      validator: (value) => {
        return Array.isArray(value);
      },
      default: () => [],
    },
  },
};
</script>

<style lang="less" scoped>
.project-list {
  width: 100%;
  overflow-x: auto;
  max-width: 100%;
  margin-bottom: 1rem;
  background-color: transparent;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 300;
  .card-title {
    color: #fff;
  }
  & > thead {
    color: #9c27b0;
    font-size: 16px;
    th {
      text-align: left;
      border-bottom: 1px solid #ddd;
      padding: 12px 8px;
    }
  }
  & > tbody {
    tr {
      position: relative;
      font-size: 14px;
      td {
        line-height: 1.5em;
        box-sizing: content-box;
        padding: 12px 8px;
        vertical-align: middle;
        border-color: #ddd;
        border-top: 1px solid rgba(0, 0, 0, 0.06);
      }
    }
  }
}
</style>
