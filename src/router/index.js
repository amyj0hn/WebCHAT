import { createRouter, createWebHistory } from 'vue-router'
import { useCookies } from 'vue3-cookies';
const {cookies} = useCookies()
const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: () => import('@/views/HomeView.vue')
    
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/Login.vue')
  },
  {
    path: '/logout',
    name: 'logout',
    beforeEnter()  {
    cookies.remove('LegitUser')
    router.push({name: 'login'})
  }
},

  {
    path: '/register',
    name: 'SignUp',
    component: () => import('@/components/Register.vue')
  },
  {
    path: '/profile',
    name: 'userProfile',
    component: ()  => import('@/views/userProfile.vue'),
    beforeEnter() {
      if(!cookies.get('LegitUser')){
        router.push({name: 'login'})
      }
    }
    },
    {
      path: '/messages',
      name: 'MessagesView',
      component: () => import('@/views/MessagesView.vue')
      
    },
    {
      path: '/connect',
      name: 'SuggestedUsers',
      component:  () => import('@/views/SuggestedUsers.vue')
    },
    {
      path: '/feedback',
      name: 'FeedBack',
      component: () => import('@/views/FeedBack.vue')
      
    },
    {
      path: '/collaborate',
      name: 'CollaborationView',
      component: () => import('@/views/CollaborationView.vue')
    },
    {
      path: '/singleuser/:id',
      name: 'SingleUser',
      component: () => import('@/views/SingleUserView.vue')
    },
    {
      path: '/singlepost/:id',
      name: 'SinglePost',
      component: () => import('@/views/SinglePost.vue')
    }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
