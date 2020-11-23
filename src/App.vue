<template>
  <div id="app">
    <router-view class="view"></router-view>
    <the-navigation :routes="routes" />
  </div>
</template>

<script>
import TheNavigation from '@/components/organisms/TheNavigation';

export default {
  name: 'AudioPlayer',
  components: {
    'the-navigation': TheNavigation
  },
  data() {
    return {
      routes: [
        {
          name: 'Help',
          to: '/',
          img: require('@/assets/nav-icon/help.svg')
        },
        {
          name: 'Music',
          to: '/music',
          img: require('@/assets/nav-icon/music.svg')
        },
        {
          name: 'List',
          to: '/list',
          img: require('@/assets/nav-icon/list.svg')
        },
        {
          name: 'Setting',
          to: '/setting',
          img: require('@/assets/nav-icon/setting.svg')
        }
      ]
    };
  }
};
</script>

<style>
body {
  color: #fff;
  -webkit-app-region: drag;
  -webkit-user-select: none;
  overflow: hidden;
}

.view {
  height: 88vh;
  border: solid 0.5px rgba(0, 0, 0, 0);
}
</style>
