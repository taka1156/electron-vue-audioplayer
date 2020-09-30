<template>
  <div>
    <ul v-show="playList.length !== 0" class="list">
      <play-list-item
        v-for="(song, index) in playList"
        :key="index"
        :song="{ index: index, isPlay: index === playIndex, ...song }"
        @change-index="changeIndex"
      />
    </ul>
  </div>
</template>

<script>
import PlayListItem from '../molecules/PlayListItem';

export default {
  name: 'PlayList',
  components: {
    'play-list-item': PlayListItem
  },
  props: {
    playIndex: {
      type: Number,
      default: 0,
      required: true
    },
    playList: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    changeIndex(index) {
      this.$emit('change-index', index);
    }
  }
};
</script>

<style scoped>
/* css reset */
ul {
  display: block;
  margin: 0;
  padding: 0;
}

/* css reset */

.list {
  height: 70vh;
  width: 95%;
  margin: 0 auto;
  overflow-y: scroll;
}
</style>
