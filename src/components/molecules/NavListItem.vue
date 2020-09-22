<template>
  <div>
    <li class="nav-item">
      <router-link :to="navItem.to" class="nav-item__link">
        <base-img
          :img-url="navItem.img"
          :img-alt="`${navItem.name}のナビアイコン`"
        />
      </router-link>
    </li>
  </div>
</template>

<script>
import BaseImg from '../atoms/BaseImg';

export default {
  name: 'NavListItem',
  components: {
    'base-img': BaseImg
  },
  props: {
    navItem: {
      type: Object,
      default: () => {},
      required: true
    }
  }
};
</script>

<style scoped>
.nav-item {
  display: block;
  margin: 5px;
  width: 60px;
  border: solid 0.05px white;
}

.nav-item__link {
  display: block;
  height: 100%;
  width: 100%;
  text-decoration: none;
}
</style>
