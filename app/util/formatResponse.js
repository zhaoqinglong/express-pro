/**
 * @param res
 * @returns {Function}
 */
module.exports = function (res) {
  return function (err, result) {
    res.send({
      success: !err,
      result: !err ? result : err.message
    })
  }
}
