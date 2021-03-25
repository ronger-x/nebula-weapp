// pages/me/me.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    avatarUrl: '../index/user-unlogin.png',
    userInfo: {},
    features: [
      {
        title: '我的文章',
        icon: 'newspaper-o',
        info: '',
        url: ''
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _ts = this;
    if (app.globalData.userInfo) {
      this.setData({
        avatarUrl: app.globalData.userInfo.avatarUrl,
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回

      // 校验登录状态
      _ts.checkSession()

      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log('me-ready', res)
        let userInfo = res.userInfo
        userInfo.unionid = app.globalData.unionid
        _ts.setData({
          avatarUrl: userInfo.avatarUrl,
          userInfo: userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      // 校验登录状态
      _ts.checkSession()

      // 获取用户信息
      wx.getUserInfo({
        success: res => {
          let userInfo = res.userInfo
          userInfo.unionid = app.globalData.unionid
          app.globalData.userInfo = userInfo
          _ts.setData({
            avatarUrl: userInfo.avatarUrl,
            userInfo: userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        active: 1
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getUserInfo: function (e) {
    let _ts = this

    // 校验登录状态
    _ts.checkSession()

    wx.request({
      url: app.globalData.domain + '/forest/wx/user/wxb4fff78a6b878cf7/info',
      data: {
        sessionKey: app.globalData.sessionKey,
        signature: e.detail.signature,
        rawData: e.detail.rawData,
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv
      },
      success(res) {
        console.log(res)
      }
    })
    let userInfo = e.detail.userInfo
    userInfo.unionid = app.globalData.unionid
    app.globalData.userInfo = userInfo
    app.globalData.signature = e.detail.signature
    app.globalData.rawData = e.detail.rawData
    _ts.setData({
      avatarUrl: userInfo.avatarUrl,
      userInfo: userInfo,
      hasUserInfo: true
    })
  },
  getPhoneNumber:  function (e) {
    let _ts = this;
    wx.request({
      url: app.globalData.domain + '/forest/wx/user/wxb4fff78a6b878cf7/phone',
      data: {
        sessionKey: app.globalData.sessionKey,
        signature: app.globalData.signature,
        rawData: app.globalData.rawData,
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv
      },
      success(res) {
        _ts.setData({
          phone: JSON.parse(res.data).phoneNumber
        })
      }
    })
  },
  checkSession: function () {
    wx.checkSession({
      success () {
        //session_key 未过期，并且在本生命周期一直有效
      },
      fail () {
        // session_key 已经失效，需要重新执行登录流程
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            if (res.code) {
              //发起网络请求
              wx.request({
                url: app.globalData.domain + '/forest/wx/user/wxb4fff78a6b878cf7/login',
                data: {
                  code: res.code
                },
                success(res) {
                  app.globalData.unionid = JSON.parse(res.data).unionid
                  app.globalData.sessionKey = JSON.parse(res.data).sessionKey
                }
              })
            }
          }
        })
      }
    })
  }
})
