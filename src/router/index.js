import Vue from 'vue'
import VueRouter from 'vue-router'
import bookshelf from '../views/indexPage/bookshelf.vue'
import bookCity from '../views/indexPage/bookCity.vue'
import ranking from '../views/indexPage/ranking.vue'
import crosstalk from '../views/indexPage/crosstalk.vue'
import mine from '../views/indexPage/mine.vue'
import searchPage from '../views/searchPage/searchPage.vue'
import index from '../views/index'
import bookSort from '../views/bookSort/bookSort.vue'
import bookSortList from '../views/bookSortList/bookSortList.vue'
import seeMore from '../views/seeMore/seeMore.vue'
import bookDetail from '../views/bookDetail/bookDetail.vue'
import bookMulu from '../views/bookDetail/bookMulu.vue'
import bookContent from '../views/bookDetail/bookContent.vue'
import talkDetail from '../views/crossTalk/talkDetail.vue'
import play from '../views/crossTalk/play.vue'
import login from '../views/indexPage/login.vue'
import register from '../views/indexPage/register.vue'
import bookHistories from '../views/bookHistories/bookHistories.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/bookCity",
    name: 'index',
    component: index,
    children: [
      { path: 'bookshelf', component: bookshelf },
      { path: 'bookCity', component: bookCity },
      { path: 'ranking', component: ranking },
      { path: 'crosstalk', component: crosstalk },
      { path: 'mine', component: mine },
      { path: 'login',component: login,},
      { path: 'register',component: register,}
    ]
  },
  {
    path: '/searchpage',
    name: 'searchPage',
    component: searchPage,
  },
  {
    path: '/booksort',
    name: 'bookSort',
    component: bookSort
  },
  {
    path: '/booksortlist',
    name: 'bookSortlist',
    component: bookSortList
  },
  {
    path: '/seemore',
    name: 'seeMore',
    component: seeMore
  },
  {
    path: '/bookDetail/:id',
    name: 'bookDetail',
    component: bookDetail
  },
  {
    path: '/bookMulu/:id',
    name: 'bookMulu',
    component: bookMulu
  },
  {
    path: '/bookContent/:bookId/:id',
    name: 'bookContent',
    component: bookContent
  },
  {
    path:'/talkDetail/:albumId',
    name:'talkDetail',
    component:talkDetail,
  },
  {
    path:'/play/:id',
    name:'play',
    component:play,
  },
  {
    path: '/bookHistories',
    name: 'bookHistories',
    component: bookHistories,
  },

]

const router = new VueRouter({
  routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
