import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('../views/ProductsView.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue')
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('../views/CheckoutView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () =>  import ('../views/LoginView.vue') 
  },
  {
    path: '/signup',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import ('../views/AdminView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import ('../views/ProfileView.vue')
  },
  {
    path: '/products/:prodID',
    name: 'SingleProductView',
    component: () => import('../views/SingleProductView.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
