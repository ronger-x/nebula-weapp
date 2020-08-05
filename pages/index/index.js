//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    articles: [],
    pagination: {
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  onLoad: function () {
  },
  onShow: function () {
    this.getData(this.data.pagination.currentPage);
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        active: 0
      })
    }
  },
  
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    const _ts = this;
    _ts.getData(1);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getData(this.data.pagination.currentPage + 1);
  },
  articleDetial(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/article/article?id=' + id,
    })
  },
  getData(page) {
    let _ts = this;
    let pagination = _ts.data.pagination;
    if (pagination.total && pagination.total > 0) {
      if (page > pagination.total/pagination.pageSize) {
        return;
      }
    }
    let articles = _ts.data.articles;
    var domain = app.globalData.domain;
    wx.request({
      url: domain + '/vertical-console/api/v1/console/articles',
      data: {
        page: page
      },
      success(res) {
        let data = res.data;
        if (data.success) {
          if (page == 1) {
            articles = data.data.articles
          } else {
            articles = articles.concat(data.data.articles)
          }
          _ts.setData({
            'articles': articles,
            'pagination': data.data.pagination,
          });
          
        }
      }
    })
  }
})
