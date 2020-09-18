<template>
  <div id="app">
    <router-view class="view"></router-view>
    <nav-bar />
  </div>
</template>

<script>
import NavBar from '@/components/Nav/NavBar';

export default {
  name: 'AudioPlayer',
  components: {
    'nav-bar': NavBar
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
