// pages/add/add.js
const db = require('../../utils/db')
const util = require('../../utils/util')

const recorderManager = wx.getRecorderManager()
const voicePlayer = wx.createInnerAudioContext();
let recordOrNot = true

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tapIndex:0,
    movieId:0,
    movieDetail:{},
    reviewContent:'',
    userInfo:null,
    epDis:true,
    tempFilePath:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      tapIndex:options.id,
      movieId: options.mid
    })
    this.getMovieDetail(this.data.movieId)
    //获取用户授权
   
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo
      })
    }).catch(err => {
      console.log('Not Authenticated yet')
    })
    //console.log(this.data.userInfo)
  },
  getMovieDetail(moiveId) {
    wx.showLoading({
      title: 'Loading...',
    })
    db.getMovieDetail(moiveId).then(result => {
      wx.hideLoading()
      const movieDetail = result.data[0]

      //console.log(movieDetail)
      this.setData({
        movieDetail
      })
    }).catch(err => {
      console.error(err)
      wx.hideLoading()

      setTimeout(() => {
        wx.navigateBack()
      }, 4000)
    })
  },
  onInput(event){
    this.setData({
      reviewContent: event.detail.value.trim()
    })
  },
  addReview(event){
   wx.showLoading({
     title: '请稍等',
   })
    let content = this.data.reviewContent
    let tapIndex = event.currentTarget.dataset.tapindex
    //通过tapindex判断影评的类型，文字=0，录音=1，在不为空的情况下上传
    if (this.data.tempFilePath && tapIndex==1){
      console.log("添加影评录音")
             
      console.log(this.data.movieDetail)
          db.addReview({
            username: this.data.userInfo.nickName,
            avatar: this.data.userInfo.avatarUrl,
            recorde: this.data.tempFilePath,
            movieId: this.data.movieId,
            image: this.data.movieDetail.image,
            name: this.data.movieDetail.name
          }).then(result => {
            wx.hideLoading()
            wx.navigateTo({
              url: '/pages/review/review?id=' + this.data.movieId,
            })
          }).catch(err => {
            console.error(err)
            wx.hideLoading()

            setTimeout(() => {
              wx.navigateBack()
            }, 4000)
          })
        
   
    } else if(content && tapIndex==0){
      console.log("添加影评文字")
      db.addReview({
        username: this.data.userInfo.nickName,
        avatar: this.data.userInfo.avatarUrl,
        content,
        movieId: this.data.movieId,
        image: this.data.movieDetail.image,
        name: this.data.movieDetail.name
      }).then(result => {
        wx.hideLoading()
        wx.navigateTo({
          url: '/pages/review/review?id=' + this.data.movieId,
        })
        return
      }).catch(err => {
        console.error(err)
        wx.hideLoading()

        setTimeout(() => {
          wx.navigateBack()
        }, 4000)
      })
    }else{
      console.log("添加失败")
      wx.hideLoading()
      return
    }
   

    wx.showLoading({
      title: 'Submiting...'
    })
    
     
  },  


  onTapLogin(event) {
    console.log(event)
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              console.log("scope.userInfo!!!!")
            }
          })
        }
      }
    })
    this.setData({
      userInfo: event.detail.userInfo
    })
  },
  reviewDone(){
    let epDis = this.data.epDis
    this.setData({
      epDis:!epDis
    })
   // console.log(this.data.tapIndex)
  },
  
 //录音功能
 recorder(){
   let options={
     duration:30000,
     sampleRate: 16000,//采样率
     numberOfChannels: 1,//录音通道数
     encodeBitRate: 96000,//编码码率
     format: 'mp3',//音频格式，有效值 aac/mp3
   }
   if (recordOrNot){
     recorderManager.start(options);
     recordOrNot =false;
   }else{
     recorderManager.stop()
     recordOrNot=true
   }
   recorderManager.onStop((res) => {
     console.log('recorder stop', res)
    this.setData({
      tempFilePath: res.tempFilePath
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