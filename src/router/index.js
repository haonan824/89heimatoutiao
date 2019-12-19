import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/index.vue'
import login from '../views/login/index.vue'
// import login from '../views/login/login.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: login
  }, {
    path: '/home',
    component: Home
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
