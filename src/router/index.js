import Vue from 'vue';
import VueRouter from 'vue-router';
import admin from '@/router/admin';
import user from '@/router/user';
import error from '@/router/error';
import home from '@/router/home';

Vue.use(VueRouter);

const routes = [
  admin,
  user,
  error,
  home,
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
