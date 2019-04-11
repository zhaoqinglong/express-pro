module.exports = function (sData = [], tData = []) {
  let sDataHasId = []
  let sDataNoId = []
  let tDataToDel = []
  sData.forEach(v => {
    if (v.id) {
      sDataHasId.push(v)
    } else {
      sDataNoId.push(v)
    }
  })
  tData.forEach(v => {
    if (sDataHasId.findIndex((item) => item.id === v.id) < 0) {
      tDataToDel.push(v)
    }
  })
  return { createArr: sDataNoId, updateArr: sDataHasId, destroyArr: tDataToDel }
}
