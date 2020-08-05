// pages/article/article.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    article: {},
    articleContent: {},
    isLoading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _ts = this;
    _ts.setData({
      'id': options.id
    });
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
    this.getData(this.data.id)
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
  getData(id) {
    let _ts = this;
    var domain = app.globalData.domain;
    wx.request({
      url: domain + '/vertical-console/api/v1/console/article/' + id,
      success(res) {
        let data = res.data;
        if (data.success) {
          _ts.setData({
            'article': data.data.article,
          });
          let result = app.towxml(data.data.article.articleContent, 'html')
          
          _ts.setData({
            'articleContent': result,
            'isLoading': false
          });
        }
      }
    })
  }
})