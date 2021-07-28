import Error from '@/layouts/Error.vue';
import NotFound from '@/views/error/NotFound.vue';
import Unauthorized from '@/views/error/Unauthorized.vue';

export default {
  path: '/errors',
  component: Error,
  children: [
    {
      path: '/404',
      component: NotFound,
      name: '404',
    },
    {
      path: '/401',
      component: Unauthorized,
      name: '401',
    },
  ],
};
