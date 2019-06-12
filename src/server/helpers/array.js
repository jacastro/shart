/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
module.exports.groupBy = function (xs, key) {
  return xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
