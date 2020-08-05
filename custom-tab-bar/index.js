// components/custom-tab-bar/custom-tab-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    active: 'index',
    list: [
      {
        pagePath: "pages/index/index",
        icon: "shop",
        text: "首页"
      },
      {
        pagePath: "pages/me/me",
        icon: "manager-o",
        text: "个人中心"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      const data = e.detail
      let url = '';
      switch (data) {
        case 0:
          url = '/pages/index/index'
          break
        case 1:
          url = '/pages/me/me'
          break
      }
      wx.switchTab({ url })
      this.setData({
        active: data
      })
    }
  }
})
