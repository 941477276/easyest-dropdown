import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw
} from 'vue-router';
import DefaultLayout from '../layout/DefaultLayout.vue';
import demoRoutes from './docRoutes';

const routes: RouteRecordRaw[] = [
  {
    path: '/component',
    name: 'component',
    component: DefaultLayout,
    redirect: '/component/dropdown-transition',
    children: [
      /* {
        path: '/index',
        name: 'index',
        component: () => import('../views/Index.vue')
      }, */
      ...demoRoutes
    ]
  },
  {
    path: '',
    redirect: '/component'
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { top: 0 };
  }
});

export default router;
