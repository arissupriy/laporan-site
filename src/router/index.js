import Vue from 'vue';
import Router from 'vue-router';

import Home from '../components/Home';
import PostIndex from '../components/Post';
import PostDetail from '../components/Post/Detail';
import NotifPage from '../components/Notif';
import NewReport from '../components/Report/New';
import User from '../components/User/User';
import UserPage from '../components/User';
import Login from '../components/User/Login';
import Register from '../components/User/Register';
import Profile from '../components/User/Profile';

import {loginRequired, nonLogin} from '../Auth';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/lapor',
      name: 'Post',
      component: PostIndex
    },
    {
      path: '/lapor/:id',
      name: 'PostDetail',
      component: PostDetail
    },
    {
      path: '/Pemberitahuan',
      name: 'Notif',
      component: NotifPage
    },
    {
      path: '/baru',
      name: 'Report',
      component: NewReport,
      beforeEnter: loginRequired
    },
    {
      path: '/u',
      name: 'UserPage',
      component: UserPage,
      redirect: { name: 'User' },
      children: [
        {
          path: '/user',
          name: 'User',
          component: User,
          beforeEnter: nonLogin
        },
        {
          path: '/login',
          name: 'Login',
          component: Login,
          beforeEnter: nonLogin
        },
        {
          path: '/register',
          name: 'Register',
          component: Register
        },
        {
          path: '/profile',
          name: 'Profile',
          component: Profile,
          beforeEnter: loginRequired
        }
      ]
    },
  ]
})
