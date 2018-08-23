
const app = getApp()
const Promise = require('../../utils/es6-promise.js');
import WX from '../../utils/promiseWX.js';
Page({
  onReady: function () {
    let sysInfo, userInfo
    WX.getSystemInfo().then(res => {
      sysInfo = res
      return WX.getUserInfo()
    }).then(res => {
      userInfo = res
      return userInfo
    }).then(() => {
      console.log(sysInfo, userInfo)
      let info = {
        sysInfo,
        userInfo
      }
      app.data.globalData = JSON.stringfy(info)
    })
  },
  onShow() {
    if (!app.data.webShowed) {
      wx.navigateTo({
        url: '/pages/nuxt/nuxt'
      })
    } else {
      wx.navigateBack({
        delta: 1
      });
    }
  }  
})
