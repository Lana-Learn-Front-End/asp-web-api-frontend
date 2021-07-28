import ManageUser from '@/views/admin/ManageUser.vue';
import CreateUser from '@/views/admin/CreateUser.vue';
import Admin from '../layouts/Admin.vue';
import ManageProduct from '../views/admin/ManageProduct.vue';
import CreateProduct from '../views/admin/CreateProduct.vue';
import ManageCategory from '../views/admin/ManageCategory.vue';
import CreateCategory from '../views/admin/CreateCategory.vue';
import ManageNews from '../views/admin/ManageNews.vue';
import CreateNews from '../views/admin/CreateNews.vue';

export default {
  path: '/admin',
  component: Admin,
  children: [
    {
      path: '/',
      redirect: () => ({ name: 'ManageProduct' }),
      name: 'Admin',
    },
    {
      path: 'products',
      component: ManageProduct,
      name: 'ManageProduct',
    },
    {
      path: 'products/create',
      component: CreateProduct,
      name: 'CreateProduct',
    },
    {
      path: 'products/:id/edit',
      component: CreateProduct,
      name: 'EditProduct',
      props: true,
    },
    {
      path: 'categories',
      component: ManageCategory,
      name: 'ManageCategory',
    },
    {
      path: 'categories/create',
      component: CreateCategory,
      name: 'CreateCategory',
    },
    {
      path: 'categories/:id/edit',
      component: CreateCategory,
      name: 'EditCategory',
      props: true,
    },
    {
      path: 'news',
      component: ManageNews,
      name: 'ManageNews',
    },
    {
      path: 'news/create',
      component: CreateNews,
      name: 'CreateNews',
    },
    {
      path: 'news/:id/edit',
      component: CreateNews,
      name: 'EditNews',
      props: true,
    },
    {
      path: 'users',
      component: ManageUser,
      name: 'ManageUser',
    },
    {
      path: 'users/create',
      component: CreateUser,
      name: 'CreateUser',
    },
    {
      path: 'users/:id/edit',
      component: CreateUser,
      name: 'EditUser',
      props: true,
    },
  ],
};
