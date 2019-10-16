// pages/detail/detail.js
const db = require('../../utils/db')
Page({
  data: {
    movieDetail: {},
    moiveId:0
  },
  onLoad: function (options) {
    this.getMovieDetail(options.id)
    //console.log(options.id)
    this.setData({
      moiveId:options.id
    })
  },
  getMovieDetail(moiveId) {
    wx.showLoading({
      title: 'Loading...',
    })
    db.getMovieDetail(moiveId).then(result=>{
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
  review(){
    let moiveId = this.data.moiveId
    wx.navigateTo({
      url: '/pages/review/review?id=' + moiveId,
    })
  },
  addReview(){
    let tapIndex=0
    wx.showActionSheet({
      itemList: ["文字","录音"],
      success:(res)=>{
        
          wx.navigateTo({
            url: '/pages/add/add?id='+ res.tapIndex+'&mid='+this.data.moiveId,
          }) 
        }     
    })
  },
})