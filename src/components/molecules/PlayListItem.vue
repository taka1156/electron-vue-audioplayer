<template>
  <div>
    <li class="list__item" @click="$emit('change-index', song.index)">
      <base-img
        :img-url="song.picture"
        :img-alt="`${song.title}のアートワーク`"
        class="img--playlist"
      />
      <p class="list__text">
        {{ song.title }}
        <small>artist: {{ song.artist }}</small>
      </p>
    </li>
  </div>
</template>

<script>
import BaseImg from '../atoms/BaseImg';

export default {
  name: 'PlayListItem',
  components: {
    'base-img': BaseImg
  },
  props: {
    song: {
      type: Object,
      default: () => {},
      required: true
    }
  }
};
</script>

<style scoped>
.list__item {
  display: flex;
  justify-content: center;
  cursor: pointer;
  margin: 2px;
  border: solid 0.3px white;
}

.list__text {
  display: flex;
  text-align: center;
  width: 80%;
  flex-direction: column;
  margin: 5% auto;
}
</style>
