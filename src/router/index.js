import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('../views/Blog.vue')
  },
  {
    path: '/elementTest',
    name: 'elementTest',
    component: () => import('../views/elementTest')
  },
  {
    path: '/createProduct',
    name: 'createProduct',
    component: () => import('../views/createProduct')
  },
  {
    path: '/productDetail',
    name: 'productDetail',
    component: () => import('../views/productDetail')
  },
  {
    path: '/setLocation',
    name: 'setLocation',
    component: () => import('../views/setLocation')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
