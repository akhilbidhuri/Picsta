import Api from '@/services/API'

export default {
  register (credentials) {
    return Api().post('/register', credentials)
  },
  login (credentials) {
    return Api().post('/login', credentials)
  },
  all () {
    return Api().post('/all')
  },
  follow (data) {
    return Api().post('/follow', data)
  },
  search (data) {
    return Api().post('/search', data)
  },
  getuser(email){
    return Api().post('/getuser', email)
  }

}