<template>
  <div>
    <li
      class="play-list-item"
      :class="{ 'play-list-item--play': song.isPlay }"
      @click="$emit('change-index', song.index)"
    >
      <base-img
        :img-url="song.picture"
        :img-alt="`${song.title}のアートワーク`"
        class="img--playlist"
      />
      <div class="play-list-item__text">
        <playing-icon v-if="song.isPlay" />
        <base-wrap-text :wrap-text="song.title" />
        <base-text :text="song.artist" />
      </div>
    </li>
  </div>
</template>

<script>
import BaseImg from '../atoms/BaseImg';
import BaseText from '../atoms/Text/BaseText';
import BaseWrapText from '../atoms/Text/BaseWrapText';
import PlayingIcon from '../atoms/PlayingIcon';

export default {
  name: 'PlayListItem',
  components: {
    'base-img': BaseImg,
    'base-text': BaseText,
    'base-wrap-text': BaseWrapText,
    'playing-icon': PlayingIcon
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
.play-list-item {
  display: flex;
  justify-content: center;
  cursor: pointer;
  margin: 2px;
  border: solid 0.3px white;
}

.play-list-item--play {
  border: 1px solid #28a745;
}

.play-list-item__text {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 10px;
  width: 80%;
  border-left: 1px solid white;
}
</style>
