<template>
  <div class="AudoDisplay">
    <!--情報の表示-->
    <div class="audio-display">
      <p class="audio-display__track">
        track[{{ trackInfo.now + 1 }}/{{ trackInfo.max }}]
      </p>
      <div v-if="isLoaded">
        <audio-title :audio-title="playedSong.title" />
        <p class="audio-display__artist">{{ playedSong.artist }}</p>
        <img :src="playedSong.picture" class="audio-display__artwork" />
      </div>
    </div>
  </div>
</template>

<script>
import AudioTitle from './AudioTitle';

export default {
  name: 'AudioDisplay',
  components: {
    'audio-title': AudioTitle
  },
  computed: {
    isLoaded() {
      return this.$store.getters['audioPlayer/isLoaded'];
    },
    trackInfo() {
      return this.$store.getters['audioPlayer/trackInfo'];
    },
    playedSong() {
      return this.$store.getters['audioPlayer/playedSong'];
    }
  }
};
</script>

<style scoped>
/* 再生中の曲に関する情報 */
.audio-display {
  height: 200px;
  width: 90%;
  margin: 0 auto;
  text-align: center;
}

.audio-display__track {
  margin: 10px auto;
  font-size: 10px;
}

.audio-display__artist {
  margin: 10px auto;
  font-size: 12px;
}

.audio-display__artwork {
  height: 50%;
  width: 50%;
}
</style>
