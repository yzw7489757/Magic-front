<template>
  <div class="home-header">
    <div class="col-6">
        <dash-card
        theme="warn"
        category="new"
        headIcon="add"
        footerIcon="hot"
        value="13"
        footerContent="今日新增"
        />
      </div>
      <div class="col-6">
        <dash-card
        theme="success"
        category="running"
        value="171/233"
        unit="台"
        headIcon="running"
        footerIcon="connect"
        footerContent="运行中..."
        />
      </div>
      <div class="col-6">
        <dash-card
        theme="danger"
        category="Success rate"
        value="94"
        headIcon="proportion"
        unit="%"
        footerIcon="getup"
        footerContent="业务调用成功率"
        />
      </div>
      <div class="col-6">
        <dash-card
        theme="info"
        category="Health degree"
        value="90"
        unit="℃"
        headIcon="healthy"
        footerIcon="queenmirror"
        footerContent="整体健康度"
        />
      </div>
  </div>
</template>

<script>
export default {
  name: 'HomeHead',
  components: {
    DashCard: () => import('@/components/DashCard/index.vue')
  }
}
</script>

<style lang="scss" scoped>
.home-header{
  &>div{
    padding:0 10px;
  }
}
</style>
