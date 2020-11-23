<template>
  <div>
    <div class="center">
      <h4>取り込んだ曲</h4>
      <hr />
      <play-list
        :play-index="index"
        :play-list="playList"
        @change-index="changeIndex"
      />
    </div>
  </div>
</template>

<script>
import PlayList from '@/components/organisms/PlayList';
import audioPlayer from '@/plugins/howlerAudioPlayer.js';

export default {
  name: 'List',
  components: {
    'play-list': PlayList
  },
  computed: {
    index() {
      return this.$store.getters['audioPlayer/trackInfo'].now;
    },
    playList() {
      return this.$store.getters['audioPlayer/playList'];
    }
  },
  methods: {
    changeIndex(index) {
      audioPlayer.changeIndex(index);
      this.$router.push('./music');
    }
  }
};
</script>

<style scoped>
.center {
  margin: 0 auto;
  height: 87vh;
  width: 95%;
  border: solid 1px white;
}

p {
  line-height: 8px;
  font-size: 11.2px;
}
</style>
