<template>
  <div class="AudoDisplay">
    <!--情報の表示-->
    <div class="info">
      <div class="info__music">
        <p class="info__music--text">
          track[{{ trackInfo.now + 1 }}/{{ trackInfo.max }}]
        </p>
        <div v-if="isLoaded">
          <audio-title :audio-title="playedSong.title" />
          <p>{{ playedSong.artist }}</p>
          <img :src="playedSong.picture" class="info__music--artwork" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AudioTitle from './AudioTitle'

export default {
  name: 'AudioDisplay',
  components: {
    'audio-title': AudioTitle
  },
  computed: {
    isLoaded () {
      return this.$store.getters.isLoaded
    },
    trackInfo () {
      return this.$store.getters.trackInfo
    },
    playedSong () {
      return this.$store.getters.playedSong
    }
  }
}
</script>

<style scoped>
/* 再生中の曲に関する情報　*/
.info {
  height: 200px;
  width: 90%;
  margin: 5px auto;
  text-align: center;
}

.info__music {
  margin: 15px auto;
  line-height: 8px;
}

.info__music--artwork {
  height: 50%;
  width: 50%;
}

.info__music--icon {
  height: 15px;
  width: 15px;
}
</style>
