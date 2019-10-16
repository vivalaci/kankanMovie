const util = require('./util')

const db = wx.cloud.database({
  env: 'uda-movie-cusln'
})

module.exports = {
  getMovieList() {
    return db.collection('movies').get()
  },
  getMovieDetail(movieId){
    return db.collection('movies').where({ _id:movieId}).get()
  },
  addReview(data) {
    console.log(data)
    return util.isAuthenticated()
      .then(() => {
        //console.log("add successsss!")
        db.collection('review').add({
          data: {
            username: data.username,
            avatar: data.avatar,
            content: data.content,
            id: data.movieId,
            createTime: +new Date(),
            image:data.image,
            name: data.name
          },
        })
      }).catch((err) => {
        console.log(err)
        wx.showToast({
          icon: 'none',
          title: 'Please Login First'
        })
        return {
         }
      })
  },
  getReviewList(movieId){
    return db.collection('review').where({ id: movieId }).get()
  },
  //通过评论ID，电影ID来取数据，以避免和别的用户重复
  getReviewUser(movieId, reviewId){
    return db.collection('review').where({ id: movieId, _id: reviewId}).get()
  },
  //通过电影ID获取收藏评论中的数据，再进行筛选
  getReviewAddUser(movieId,rid){
    return db.collection('reviewAdd').where({ moiveId: movieId,_id:rid}).get()
  },
  //根据电影ID和用户的openid获取用户对当前电影的评论列表
  getUserReviews(movieid ,pid){
    return db.collection('review').where({ id: movieid, _openid: pid}).get()
  },
  getReviews(){
    return db.collection('review').get()

  },
  collectReview(e){
   // console.log(e)
    return db.collection('reviewAdd').add({
      data:{
        moiveId: e.moiveId,
        content: e.content,
        username: e.username,
        avatar: e.avatar,
        image: e.image,
        name: e.name
      }
    })
  },
  getUsers(mid){
    return db.collection('review').where({id:mid}).get()
  },
  //根据用户openid获取该用户的评论
  getReviewsPub(e){
    return db.collection('review').where({ _openid: e }).get()
  },
  //根据用户openid获取该用户收藏的评论
  getCollectPub(e) {

    return db.collection('reviewAdd').where({ _openid: e }).get()
  },
}