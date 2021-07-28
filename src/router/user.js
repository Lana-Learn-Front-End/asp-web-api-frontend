import ListProduct from '@/views/user/product/ListProduct.vue';
import User from '@/layouts/User.vue';
import UserDetail from '@/views/user/auth/User.vue';
import Login from '@/views/user/auth/Login.vue';
import SignUp from '@/views/user/auth/SignUp.vue';
import Logout from '@/views/user/auth/Logout.vue';
import ProductDetail from '@/views/user/product/ProductDetail.vue';
import ListNews from '@/views/user/product/ListNews.vue';
import NewsDetail from '@/views/user/product/NewsDetail.vue';
import Cart from '@/views/user/auth/Cart.vue';

export default {
  path: '/',
  component: User,
  children: [
    {
      path: '/',
      redirect: () => ({ name: 'Home' }),
    },
    {
      path: '/products/:category?',
      component: ListProduct,
      name: 'ListProduct',
    },
    {
      path: '/products/:id',
      component: ProductDetail,
      name: 'ProductDetail',
    },
    {
      path: '/news',
      component: ListNews,
      name: 'ListNews',
    },
    {
      path: '/news/:id',
      component: NewsDetail,
      name: 'NewsDetail',
    },
    {
      path: '/login',
      component: Login,
      name: 'Login',
    },
    {
      path: '/signup',
      component: SignUp,
      name: 'SignUp',
    },
    {
      path: '/logout',
      component: Logout,
      name: 'Logout',
    },
    {
      path: '/me',
      component: UserDetail,
      name: 'Me',
    },
    {
      path: '/me/cart',
      component: Cart,
      name: 'Cart',
    },
  ],
};
