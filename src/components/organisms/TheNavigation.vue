<template>
  <div>
    <nav>
      <nav-list :routes="routes" />
    </nav>
  </div>
</template>

<script>
import NavList from '../molecules/NavList';

export default {
  name: 'TheNavigation',
  components: {
    'nav-list': NavList
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
