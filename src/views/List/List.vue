<template>
  <div class="List">
    <div class="center">
      <h4>取り込んだ曲</h4>
      <div class="border" />
      <div v-show="playList.length !== 0" class="list">
        <div v-for="(song, index) in playList" :key="index">
          <div class="list__item" @click="changeIndex(index)">
            <img :src="song.picture" class="list__img" alt="イメージ画像" />
            <p class="list__text">
              {{ song.title }}
              <small>artist: {{ song.artist }}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import audioPlayer from '@/plugins/AudioPlayer.js';

export default {
  name: 'List',
  computed: {
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
  width: 100%;
  border: solid 1px white;
}

.border {
  width: 100%;
  border: solid 0.4px white;
}

.search {
  display: flex;
  justify-content: center;
  margin: 5vh auto;
}

.search__text {
  height: 10%;
  width: 70%;
  margin: 0 auto;
}

.search__btn {
  height: 22px;
  margin: 0 auto;
}

.list {
  height: 82%;
  width: 98%;
  margin: 0 auto;
  overflow-y: scroll;
}

.list__item {
  display: flex;
  cursor: pointer;
  margin: 2px auto;
  border: solid 0.3px gray;
}

.list__text {
  display: flex;
  width: 80%;
  flex-direction: column;
  margin: 5% auto;
}

.list__img {
  height: 50px;
  width: 20%;
  margin: 5%;
}
</style>
