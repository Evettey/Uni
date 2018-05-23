//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    navTab: ["智慧曲线", "体脂", "BMI指数"],
    currentNavtab: "0"
  },
  onLoad: function () {

  },
  switchTab: function(e){
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  }
})
