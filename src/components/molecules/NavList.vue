<template>
  <div>
    <ul class="nav-list">
      <nav-list-item v-for="(item, index) in routes" :key="index" :nav-item="item" />
    </ul>
  </div>
</template>

<script>
import NavListItem from './NavListItem';

export default {
  name: 'NavList',
  components: {
    'nav-list-item': NavListItem
  },
  props: {
    routes: {
      type: Array,
      default: () => [],
      required: true
    }
  }
};
</script>

<style scoped>
/* css reset */
ul {
  margin: 0;
  padding: 0;
}

/* css reset */

.nav-list {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100vw;
  margin-bottom: 40px;
}
</style>
