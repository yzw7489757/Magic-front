import MobileDetect from 'mobile-detect'
import request from '@/utils/request'
import { insertRecord } from '@/api/performance'
import { getToken } from '@/utils/auth'
const instance = new MobileDetect(navigator.userAgent)

const getTimeNode = () => {
  return performance.now ? performance.now() : Date.now()
}

const performanceRecord = []

/* eslint-disable no-plusplus */
window.loadTime = getTimeNode()

function deepTraversal(node) {
  const nodeList = []
  if (node) {
    const stack = []
    stack.push(node)
    while (stack.length !== 0) {
      const childrenItem = stack.pop()
      if (childrenItem.nodeName === 'STYLE' || childrenItem.nodeName === 'SCRIPT' || childrenItem.nodeName === 'META') {
        continue
      }
      nodeList.push(childrenItem)
      const childrenList = childrenItem.children
      for (let i = childrenList.length - 1; i >= 0; i--) {
        stack.push(childrenList[i])
      }
    }
  }
  return nodeList
}

function computedWeight(node) {
  let i = 0
  const body = document.documentElement
  if (node.style.display === 'none') {
    return i
  }
  while (node !== body && ++i) {
    node = node.parentNode
  }
  return i
}

const startTime = window.loadTime

const observer = new MutationObserver((mutations, ob) => {
  mutations.forEach(mutation => {
    if (mutation.addedNodes.length || mutation.removedNodes.length) {
      const deepNodes = deepTraversal(document.documentElement).filter(el => el.children.length === 0)
      let i = -1
      let totalWeight = 0
      const len = deepNodes.length
      while (++i < len) {
        totalWeight += computedWeight(deepNodes[i])
      }
      performanceRecord.push({
        fraction: totalWeight,
        time: (getTimeNode() - startTime) | 0
      })
    }
  })
})
observer.observe(document.documentElement, {
  attributes: false,
  characterData: false,
  childList: true,
  subtree: true,
  attributeOldValue: false,
  characterDataOldValue: false
})

const getNetWork = function() {
  const connection = navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection || { tyep: 'unknown' }
  if (connection.effectiveType) {
    return connection.effectiveType
  }
  const type_text = ['unknown', 'ethernet', 'wifi', '2g', '3g', '4g', 'none']
  if (typeof connection.type === 'number') {
    connection.type_text = type_text[connection.type]
  } else {
    connection.type_text = connection.type
  }
  const bandWidth = connection.bandwidth
  if (typeof bandWidth === 'number') {
    if (bandWidth > 10) {
      connection.type = 'wifi'
    } else if (bandWidth > 2) {
      connection.type = '3g'
    } else if (bandWidth > 0) {
      connection.type = '2g'
    } else if (bandWidth === 0) {
      connection.type = 'none'
    } else {
      connection.type = 'unknown'
    }
  }
  return connection.type
}

window.onload = function() {
  getToken() &&
    insertRecord({
      projectId: 165,
      record: JSON.stringify(performanceRecord),
      createTime: new Date().toLocaleString(),
      platform: instance.os() || navigator.platform,
      broswerVersion: navigator.appVersion,
      phoneModel: instance.phone() || instance.mobile() || navigator.appCodeName,
      network: getNetWork(),
      score: ['A', 'B', 'C'][parseInt(Math.random() * 3)]
    })
      .then(res => {
        // console.log(res);
      })
      .finally(() => {
        observer.disconnect()
      })
}

//   const observer = new PerformanceObserver(list => {
//     list.getEntries().map(({ name, entryType, startTime, duration }) => {
//         const obj = {
//           "Duration": duration,
//           "Entry Type": entryType,
//           "Name": name,
//           "Start Time": startTime
//         };
//         return obj;
//       })
//       // .filter((task) => task.Duration > 10)
//       .forEach(console.log);
//       observer.disconnect();
//   });

// observer.observe({
//   entryTypes: ["resource", "mark", "measure","paint"],
//   buffered: true
// });
