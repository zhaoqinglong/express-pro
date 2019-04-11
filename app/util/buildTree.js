/**
 * 构建树形数据
 * @param data
 * @param parentId
 * @param pidField
 * @param idField
 * @param nodeOrder
 * @returns {Array}
 */
module.exports.buildTree = function BuildTree (data, parentId, pidField, idField = 'id', nodeOrder) {
  let list = []
  data.forEach((item) => {
    if (item[pidField] === parentId || (!parentId && !item[pidField])) {
      let children = BuildTree(data, item[idField], pidField, idField, nodeOrder)
      if (children.length) {
        if (nodeOrder) {
          children.sort((a, b) => {
            let _a = a[nodeOrder] || 999
            let _b = b[nodeOrder] || 999
            return Number(_a) - Number(_b)
          })
        }
        item.children = children
      }
      list.push(item)
    }
  })
  return list
}
