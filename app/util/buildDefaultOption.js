/**
 * 构建默认的查询参数，包含分页，排序
 * @param pagination 是否分页 {Boolean}
 * @param pageSize 每页数量 {Number}
 * @param currentPage 当前页 {Number}
 * @param descending 降序{String, Array}
 * @param ascending 升序{String, Array}
 * @returns {{where: {}, order: Array}}
 */
module.exports = function ({ pagination, pageSize = 20, currentPage = 1, descending = 'created_at', ascending }) {
  let result = { where: {}, order: [] }
  descending && result.order.push([].concat(Array.isArray(descending) ? descending : [descending], 'DESC'))
  ascending && result.order.push([].concat(Array.isArray(ascending) ? ascending : [ascending], 'ASC'))
  pagination && (result.limit = pageSize)
  pagination && (result.offset = (currentPage - 1) * pageSize)
  return result
}
