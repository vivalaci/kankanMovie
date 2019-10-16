const db = require('../../utils/db')
Page({
  data: {
    movieList: []
  },
  onLoad: function () {
    this.getMovieList()
  },
  getMovieList() {
    wx.showLoading({
      title: 'Loading...',
    })

    db.getMovieList().then(result => {
      wx.hideLoading()

      let movieList = result.data
      
      if (movieList.length) {
    
        this.setData({
          movieList: movieList
        })
        //console.log(movieList)
      }

    }).catch(err => {
      console.error(err)
      wx.hideLoading()
    })
  },

})