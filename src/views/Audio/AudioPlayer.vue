<template>
  <div>
    <div class="audio" @drop.prevent="fileChange">
      <!--ファイルの登録-->
      <label class="fileinput">
        こちらをクリックまたは、ファイルドラッグで音楽ファイルを入れてください。
        <input type="file" class="fileinput__none" multiple @change="fileChange" />
      </label>
      <div v-if="isLoaded">
        <audio-player />
      </div>
      <div v-else>
        <audio-load :playlist-len="playListLen" />
      </div>
    </div>
  </div>
</template>

<script>
import AudioPlayer from '@/components/organisms/AudioPlayer';
import AudioLoad from '@/components/organisms/AudioLoad';
import audioPlayer from '@/plugins/howlerAudioPlayer.js';
let isFirstTime = true;

export default {
  name: 'AudioPlayer',
  components: {
    'audio-player': AudioPlayer,
    'audio-load': AudioLoad
  },
  computed: {
    isLoaded() {
      return this.$store.getters['audioPlayer/isLoaded'];
    },
    playListLen() {
      return this.$store.getters['audioPlayer/playList'].length;
    }
  },
  mounted() {
    // デフォルトのドラッグの挙動を無効化(ファイルのプレビュー無効化)
    document.ondragover = document.ondrop = function(e) {
      e.preventDefault();
    };
  },
  methods: {
    async fileChange(e) {
      const FILES = e.target.files || e.dataTransfer.files;
      if (!FILES.length) {
        return;
      }
      await this.$store.dispatch('audioPlayer/loadFile', FILES);
      if (isFirstTime) {
        isFirstTime = false;
        audioPlayer.init();
      }
    }
  }
};
</script>

<style scoped>
.audio {
  margin: 0 auto;
  height: 87vh;
  width: 95%;
  border: 1px solid white;
}

/* ファイルの取り込み */
.fileinput {
  display: block;
  margin: 8px auto;
  height: 22px;
  width: 90%;
  background-color: gray;
  font-size: 8px;
}

.fileinput__none {
  display: none;
}
</style>
