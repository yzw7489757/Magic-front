import Chartist from 'chartist'
var seq = 0
var delays = 80
var durations = 500
var seq2 = 0
var delays2 = 80
var durations2 = 500

export default {
  startAnimationForLineChart: function(chart) {
    chart.on('draw', function(data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        })
      } else if (data.type === 'point') {
        seq++
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        })
      }
    })
    seq = 0
  },
  startAnimationForBarChart: function(chart) {
    chart.on('draw', function(data) {
      if (data.type === 'bar') {
        seq2++
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        })
      }
    })

    seq2 = 0
  }
}
