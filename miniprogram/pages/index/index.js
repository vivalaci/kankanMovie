//index.js
const db = require('../../utils/db')
Page({
  data: {
    movie:{},
    userInfo:null,
    openid:0,
    user:{},
    avatar:''
  },

  onLoad: function() {
    this.getMovieList()
    //如何在onload中获取用户的openid

    //此处打印值为{},是否因为setdata为异步操作还是因为数据库的操作为异步，但是如何在函数外取得该值呢？
    console.log(this.data.user)
  },
  
  onShow:function(op){
    // console.log(op);
  },
  getMovieList(){
    wx.showLoading({
      title: 'Loading...',
    })
    let that=this
    db.getMovieList().then(result => {
      wx.hideLoading()

      const movieList = result.data
      let i = Math.floor(Math.random() * 2)

      if (movieList.length) {
        that.setData({
          movie: movieList[i]
        })
      }
      //console.log(this.data.movie._id)
      db.getUsers(this.data.movie._id).then(result => {
        //console.log(result)
        let randomResult = result.data[i]
        this.setData({
          user: {
            openid: randomResult._openid,
            avatar: randomResult.avatar,
            name: randomResult.username
          }
        })
        //console.log(this.data.user)
      }).catch(err => {
        console.error(err)
        wx.hideLoading()
      })
    }).catch(err => {
      console.error(err)
      wx.hideLoading()
    })
  },
  openHot(){
    wx.navigateTo({
      url: '../hotshow/hotshow',
    })
  },

  openMine(e){
    console.log(e)
    wx.showLoading({
      title: 'Loading...',
    })
    //根据我的openid提取数据库中我的评论
    let openid=e.currentTarget.dataset.id
    wx.hideLoading()
    //无法获取当前用户的openid，此处根据页面传入的推荐用户openid取数据库
    wx.navigateTo({
      url: '/pages/mine/mine?id=' + openid
    })
    


  },
  useReviews(options){
    console.log(options)
    let movieId = options.currentTarget.dataset.movieid;
    let openid = options.currentTarget.dataset.pid;
    let wurl = options.currentTarget.dataset.url;
    
    wx.navigateTo({
      url: '../review/review?id='+movieId+'&openid='+openid +'&wurl=false',
    })
  },
  onPullDownRefresh() {
    wx.showToast({
      title: '刷新中....',
      icon: 'loading'
    })
    this.getMovieList()
    wx.stopPullDownRefresh()
  },
  getUserInfo(e){
    console.log(e)
  }  

})
