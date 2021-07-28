import User from '@/layouts/User.vue';
import Home from '@/views/user/Home.vue';
import ListNews from '@/views/user/product/ListNews.vue';

export default {
  path: '/home',
  component: User,
  children: [
    {
      path: '/',
      component: Home,
      name: 'Home',
    },
    {
      path: 'news',
      component: ListNews,
      name: 'News',
    },
  ],
};
