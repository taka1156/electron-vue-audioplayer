<template>
  <div>
    <li
      class="list__item"
      :class="{ 'list__item--play': song.isPlay }"
      @click="$emit('change-index', song.index)"
    >
      <base-img
        :img-url="song.picture"
        :img-alt="`${song.title}のアートワーク`"
        class="img--playlist"
      />
      <div v-if="song.isPlay" class="playing">
        <p>((</p>
        <img src="@/assets/ui-icon/playing.svg" />
        <p>))</p>
      </div>
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

.list__item--play {
  border: 1px solid #28a745;
}

.playing {
  display: flex;
  margin: 5px;
  padding: 0;
  height: 10px;
  width: 10px;
  font-size: 10px;
  color: #28a745;
  animation: playing 2s linear infinite;
}

.playing p,
.playing img {
  margin: 0;
  padding: 0;
}

.list__text {
  display: flex;
  text-align: center;
  width: 80%;
  flex-direction: column;
  margin: 5% auto;
}

/* アニメーション */
@keyframes playing {
  0% {
    transform: translate(0px, 0px);
  }
  25% {
    transform: translate(1px, 1px);
  }
  50% {
    transform: translate(0px, 1px);
  }
  75% {
    transform: translate(1px, 0px);
  }
  100% {
    transform: translate(0px, 0px);
  }
}
</style>
