var lastTime = performance.now()
var frame = 0
// var lastFameTime = performance.now()
var loop = function(time) {
  var now = performance.now() // 当前
  var overTime = now - lastTime
  // var fs = (now - lastFameTime) // 距离上次
  // lastFameTime = now
  // var fps = Math.round(1000 / fs)
  frame++
  if (overTime > 1000) {
    var fps = Math.round((frame * 1000) / overTime)
    console.warn('fps: ', fps)
    frame = 0
    lastTime = now
  };
  window.requestAnimationFrame(loop)
}
window.requestAnimationFrame(loop)
