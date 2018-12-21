import Vue from 'vue'
import Router from 'vue-router'
import myList from '../components/myList'
import myDetail from '../components/myDetail'

Vue.use(Router)

export default new Router({
  base: '/dist/',
  routes: [
    {
      path: '/',
      name: 'list',
      component: myList,
      meta:{
        index:0
      }
    },
    {
      path: '/list',
      name: 'list',
      component: myList,
      meta:{
        index:0
      }
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: myDetail,
      meta:{
        index:1
      }
    }
  ]
})

