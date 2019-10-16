// pages/mine/mine.js
const db = require('../../utils/db')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    reviews:[],
    collections:[],
    cltShow:true,
    reviewShow:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   console.log(options)
    let openid = options.id
    let reviews, collections
    db.getReviewsPub(openid).then(result => {
      wx.hideLoading()
      reviews = result.data
      //console.log(reviews)
      this.setData({
        reviews: reviews
      })
    })
    db.getCollectPub(openid).then(result=>{
      collections = result.data
      console.log(collections)
      this.setData({
        collections: collections
      })
    })
  },
  openDetail(options){
    console.log(options)
    wx.navigateTo({
      url: '/pages/reviewDetail/reviewDetail?id=' + options.currentTarget.dataset.id + "&reviewId=" + options.currentTarget.dataset.reviewid + "&mid="+ options.currentTarget.dataset.mid
    })
  },
  hideText(){
    let showornot = this.data.cltShow
    this.setData({
      cltShow:!showornot
    })
  },
  hideRview() {
    let showornot = this.data.reviewShow
    this.setData({
      reviewShow: !showornot
    })
  },
  bckToIdx(){
    wx.navigateBack({
      
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
    console.log(options)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    console.log(options)
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

  }
})