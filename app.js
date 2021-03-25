//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    let _ts = this
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //发起网络请求
          wx.request({
            url: _ts.globalData.domain + '/forest/wx/user/wxb4fff78a6b878cf7/login',
            data: {
              code: res.code
            },
            success(res) {
              _ts.globalData.unionid = JSON.parse(res.data).unionid
              _ts.globalData.sessionKey = JSON.parse(res.data).sessionKey
            }
          })
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          _ts.getUserInfo()
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    domain: 'https://rymcu.com',
    unionid: '',
    signature: '',
    rawData: '',
    sessionKey: ''
  },
  towxml:require('/towxml/index'),
  getUserInfo: function () {
    let _ts = this;
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        let userInfo = res.userInfo
        userInfo.unionid = _ts.globalData.unionid
        _ts.globalData.userInfo = userInfo
        _ts.globalData.signature = res.signature
        _ts.globalData.rawData = res.rawData
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (_ts.userInfoReadyCallback) {
          _ts.userInfoReadyCallback(res)
        }
      }
    })
  }
})
