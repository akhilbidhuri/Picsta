import Api from '@/services/API'
export default {
  newPost (formData) {
    console.log("got request")
    return Api().post('/upload', formData, { headers: {
        'Content-Type': 'multipart/form-data'
    }})
  },
  getPost(){
    console.log("got request")
    return Api().post('/get')
  },
  likePost(card){
    return Api().post('/newlikes', card)
  },
  comment(data){
    return Api().post('/newcomment', data)
  },
  getpopular(){
    return Api().post('/getpopular')
  }
}