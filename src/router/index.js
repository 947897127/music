import Vue from 'vue'
import Router from 'vue-router'
import rank from '../components/rank/rank.vue'
import recommend from '../components/recommend/recommend.vue'
import search from '../components/search/search.vue'
import singer from '../components/singer/singer.vue'
import singerDetail from '../components/singer-detail/singer-detail.vue'
import disc from '../components/disc/disc.vue'

Vue.use(Router)

export default new Router({
  linkActiveClass:"active",
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: recommend,
      children: [
        {
          path: ':id',
          component: disc
        }
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: search      
    },
    {
      path: '/singer',
      name: 'singer',
      component: singer,
      children: [
        {
          path: ':id',
          component: singerDetail
        }
      ]
    }
  ]
})
