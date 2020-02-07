<template>
  <div class="home-content">
    <div class="col-8 chart-item">
      <div class="card">
        <div class="card-header card-chart card-chart-success">
          <div class="ct-chart" id="dailySalesChart"></div>
        </div>
        <div class="card-content">
          <h4 class="title">Daily Sales</h4>
          <p class="category"><span class="text-success"><svg-icon iconClass="true" /> 55%  </span> increase in today sales.</p>
        </div>
        <div class="card-footer">
          <div class="stats">
            <svg-icon iconClass="true" /> updated 4 minutes ago
          </div>
        </div>
      </div>
    </div>
    <div class="col-8 chart-item">
      <div class="card">
        <div class="card-header card-chart card-chart-warning">
          <div class="ct-chart" id="completedTasksChart"></div>
        </div>
        <div class="card-content">
          <h4 class="title">Daily Sales</h4>
          <p class="category"><span class="text-success"><svg-icon iconClass="true" /> 55%  </span> increase in today sales.</p>
        </div>
        <div class="card-footer">
          <div class="stats">
            <svg-icon iconClass="true" /> updated 4 minutes ago
          </div>
        </div>
      </div>
    </div>
    <div class="col-8 chart-item">
      <div class="card">
        <div class="card-header card-chart card-chart-danger">
          <div class="ct-chart" id="emailsSubscriptionChart"></div>
        </div>
        <div class="card-content">
          <h4 class="title">Daily Sales</h4>
          <p class="category"><span class="text-success"><svg-icon iconClass="true" /> 55%  </span> increase in today sales.</p>
        </div>
        <div class="card-footer">
          <div class="stats">
            <svg-icon iconClass="true" /> updated 4 minutes ago
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chartist from 'chartist'
import md from '@/utils/chartAnimation'
export default {
  name: 'HomeContent',
  methods: {
    initCharts1: function() {
      /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

      var dataDailySalesChart = {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        series: [
          [12, 17, 7, 17, 23, 18, 38]
        ]
      }

      var optionsDailySalesChart = {
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
        }),
        low: 0,
        high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      }

      var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart)

      md.startAnimationForLineChart(dailySalesChart)
    },
    initCharts2: function() {
      /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

      var dataCompletedTasksChart = {
        labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
        series: [
          [230, 750, 450, 300, 280, 240, 200, 190]
        ]
      }

      var optionsCompletedTasksChart = {
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
        }),
        low: 0,
        high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      }

      var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart)

      // start animation for the Completed Tasks Chart - Line Chart
      md.startAnimationForLineChart(completedTasksChart)
    },
    initCharts3: function() {
      /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

      var dataEmailsSubscriptionChart = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: [
          [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

        ]
      }
      var optionsEmailsSubscriptionChart = {
        axisX: {
          showGrid: false
        },
        low: 0,
        high: 1000,
        chartPadding: {
          top: 0,
          right: 5,
          bottom: 0,
          left: 0
        }
      }
      var responsiveOptions = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function(value) {
              return value[0]
            }
          }
        }]
      ]
      var emailsSubscriptionChart = Chartist.Bar('#emailsSubscriptionChart', dataEmailsSubscriptionChart, optionsEmailsSubscriptionChart, responsiveOptions)

      // start animation for the Emails Subscription Chart
      md.startAnimationForBarChart(emailsSubscriptionChart)
    }
  },
  mounted () {
    this.initCharts1()
    this.initCharts2()
    this.initCharts3()
  }
}
</script>

<style lang="scss" scoped>
@import "~@/style/mixin.scss";

.home-content {
  width:100%;
  overflow: hidden;
}
.chart-item{
  padding: 0 10px;
}
.card{
  display: inline-block;
  position: relative;
  width: 100%;
  margin: 25px 0;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
  border-radius: 3px;
  color: rgba(0, 0, 0, 0.87);
  background: #fff;
  &-header{
    box-shadow: 0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
    margin: -20px 15px 0;
    border-radius: 3px;
    padding: 15px;
    background-color: #999999;
  }
  &-chart{
    min-height: 160px;
    color: #fff;
    &-success {
      background: linear-gradient(60deg,#66bb6a,#43a047);
      box-shadow: 0 4px 20px 0 rgba(0,0,0,.14), 0 7px 10px -5px rgba(76,175,80,.4);
    }
    &-warning {
      background: linear-gradient(60deg, #ffa726, #fb8c00);
      box-shadow: 0 12px 20px -10px rgba(255, 152, 0, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12)
    }
    &-danger {
      background:linear-gradient(60deg,#ef5350,#e53935);
      box-shadow: 0 4px 20px 0 rgba(0,0,0,.14), 0 7px 10px -5px rgba(244,67,54,.4);
    }
  }
  &-content{
    padding: 15px 20px;
    .title{
      @include title(1.3em, 1.5em, inherit, 500,'"Roboto", "Helvetica", "Arial", sans-serif')
      min-height: 32px;
      margin-top: 0;
      margin-bottom: 5px;
    }
    .category{
      @include text(16px, 1.6em, #999)
    }
  }
  &-footer{
    margin: 0 20px 10px;
    padding-top: 10px;
    border-top: 1px solid #eeeeee;
    .stats{
      @include text(12px, 22px, #999)
      display: inline-block;
    }
  }
}
</style>
