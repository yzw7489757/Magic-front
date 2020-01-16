const { hasOwnProperty } = Object.prototype

export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key)
}

export function isVNode(node) {
  return typeof node === 'object' && hasOwn(node, 'componentOptions')
}

export function getAttributeList(el) {
  // 获取当前节点所有属性
  const { attributes } = el
  const attrArr = []
  for (const item of attributes) {
    attrArr.push({
      [item.nodeName]: item.nodeValue
    })
  }
  return attrArr
}
