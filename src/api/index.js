let host = 'http://rap2api.taobao.org/app/mock/121282'

// if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_API === 'rap') {
//   host = 'http://rap2api.taobao.org/app/mock/13801'
// }

const url = {
  getList: '/getList',
  search: '/search',
  getMateriel: '/getMateriel',
  getOrganization: '/getOrganization',
}

Object.keys(url).forEach(key => {
  url[key] = host + url[key]
})

export default url
