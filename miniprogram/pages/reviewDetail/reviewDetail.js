// pages/reviewDetail/reviewDetail.js
const db = require('../../utils/db')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieId:0,
    reviewId:'',
    reviewDetail:{},
    movieDetail:{},
    createTime:0,
    userInfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      movieId:options.id,
      reviewId: options.reviewId
      
    })
   
    if (options.id == "undefined" ){
        
      console.log("由收藏列表进入")
      db.getReviewAddUser(options.mid, options.reviewId).then(result => {
        let reviewDetail = result.data
        console.log(reviewDetail)
        this.setData({
          reviewDetail: reviewDetail[0]
        })
      })
      this.getMovieDetail(options.mid)
   }else{
      console.log("由我的评论列表进入" + options.id)
      this.getMovieDetail(options.id)
      this.getReviewUser(options.id)
   }
   
    

    //打印结果{}，为什么取不到reviewDetail的值
    console.log(this.data.reviewDetail)

  },
  getMovieDetail(moiveId) {
    wx.showLoading({
      title: 'Loading...',
    })
    db.getMovieDetail(moiveId).then(result => {
      wx.hideLoading()
      const movieDetail = result.data[0]
      console.log(result.data)
      this.setData({
        movieDetail: movieDetail
      })
    }).catch(err => {
      console.error(err)
      wx.hideLoading()

      setTimeout(() => {
        wx.navigateBack()
      }, 4000)
    })
  },
  getReviewUser(id){
    wx.showLoading({
      title: 'Loading...',
    })
    db.getReviewUser(id).then(result => {
      wx.hideLoading()
      let reviewDetail = result.data    
      for (let i = 0; i < reviewDetail.length;i++){
        if (reviewDetail[i]._id == this.data.reviewId){
          this.setData({
            reviewDetail: reviewDetail[i]
          })
          console.log(reviewDetail)
        }else{
        }
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()

      setTimeout(() => {
        wx.navigateBack()
      }, 4000)
    })
  },
  reviewClct(){
    wx.showLoading({
      title: 'Loading...',
    })
    let reviewData = {
      moiveId: this.data.reviewDetail.id,
      content: this.data.reviewDetail.content,
      username: this.data.reviewDetail.username,
      avatar: this.data.reviewDetail.avatar,
      image: this.data.movieDetail.image,
      name: this.data.movieDetail.name
    }
   // console.log(this.data.reviewDetail)

    db.collectReview(reviewData).then(result=>{
     console.log(result)
    })
    wx.showToast({
      title: '收藏成功！',
    })
   
  },
  getUsers(){
    let that = this
    wx.getUserInfo({
      success: (res) => {
        let useres = res.userInfo
        that.setData({
          userInfo: useres
        })
        console.log(this.data.userInfo)

      }
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