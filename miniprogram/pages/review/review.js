// pages/review/review.js
const db = require('../../utils/db')
const util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reviewList:[],
    userReviews:[],
    movieId:0,
    pid:0,
    whichUrl:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    
    this.getReviewList(options.id)
    this.setData({
      movieId: options.id,
      pid:options.openid,
      whichUrl: options.wurl
    })
    let movieid=options.id;
    let pid =options.openid
    this.getUserReviews(movieid, pid)
  },
  getReviewList(id){
    wx.showLoading({
      title: 'Loading...',
    })
    db.getReviewList(id).then(result=>{
      wx.hideLoading();
      let reviews = result.data
      //console.log(reviews)
      this.setData({
        reviewList: reviews
      })
      //如何让评论列表按时间顺序排列？？
      })
  },
  reviewDetail(data){
    
    let user=data.currentTarget.dataset.user
    let time = data.currentTarget.dataset.time
    let reviewId = data.currentTarget.dataset.reviewid
    //console.log(data)
    wx.navigateTo({
      url: '/pages/reviewDetail/reviewDetail?id=' + this.data.movieId + '&reviewId=' + reviewId+'&time='+time,
    })
  },
  addReview() {
    console.log(this.data.movieId)

      wx.showActionSheet({
      itemList: ["文字", "录音"],
      success: (res) => {
        wx.navigateTo({
          url: '/pages/add/add?mid=' + this.data.movieId,
        })
      }
    })
  },
  getUserReviews(movieId, pid){
    wx.showLoading({
      title: 'Loading...',
    })
    db.getUserReviews(movieId,pid).then(result=>{
      wx.hideLoading();
      let reviews = result.data
     // console.log(reviews)
      this.setData({
        userReviews:reviews
      })
    })
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