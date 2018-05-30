// pages/intell/intell.js
var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var lineChart = null;
var startPos = null;
Page({
  data: {
  },
  touchHandler: function (e) {
    lineChart.scrollStart(e);
  },
  moveHandler: function (e) {
    lineChart.scroll(e);
  },
  touchEndHandler: function (e) {
    lineChart.scrollEnd(e);
    lineChart.showToolTip(e, {
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },
  createSimulationData: function () {
    var categories = [];
    var data = [];
    for (var i = 0; i < 10; i++) {
      categories.push('2018.5.' + (i + 1));
      data.push(Math.random() * (80 - 100) + 100);
    }
    return {
      categories: categories,
      data: data
    }
  },
  onLoad: function (e) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    var simulationData = this.createSimulationData();
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: simulationData.categories,
      animation: false,
      series: [{
        name: '智能指数',
        data: simulationData.data,
        format: function (val, name) {
          return val.toFixed(2) ;
        }
      }],
      xAxis: {
        disableGrid: false
      },
      yAxis: {
        title: '智能指数 (满分100)',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 0
      },
      width: windowWidth,
      height: 200,
      dataLabel: true,
      dataPointShape: true,
      enableScroll: true,
      extra: {
        lineStyle: 'curve'
      }
    });
  }
});
