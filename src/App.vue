<template>
  <div id="app">
    <router-view class="view"></router-view>
    <audio-navigation :routes="routes" />
  </div>
</template>

<script>
import AudioNavigation from '@/components/organisms/AudioNavigation';
import 'normalize.css';

export default {
  name: 'AudioPlayer',
  components: {
    'audio-navigation': AudioNavigation
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
  background-color: black;
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
