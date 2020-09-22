import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'help',
      component: require('@/views/Help/Help').default
    },
    {
      path: '/music',
      name: 'music',
      component: require('@/views/Audio/AudioMain').default
    },
    {
      path: '/list',
      name: 'list',
      component: require('@/views/List/List').default
    },
    {
      path: '/setting',
      name: 'setting',
      component: require('@/views/Setting/Setting').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});
