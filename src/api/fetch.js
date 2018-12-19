import axios from 'axios'
import url from './index.js'

function fetch (api, data) {
  return new Promise((resolve, reject) => {
    axios.post(url[api], data).then(res => {
      resolve(res.data)
    }).catch(err => {
      if (process.env.NODE_ENV === 'production') {
        reject(err)
      } else {
        let mock = require('./home.js')
        resolve(mock[api])
      }
    })
  })
}

export default fetch
