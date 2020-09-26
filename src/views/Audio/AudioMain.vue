<template>
  <div class="AudioMain">
    <div class="audio" @drop.prevent="fileChange">
      <!--ファイルの登録-->
      <label class="fileinput">
        こちらをクリックまたは、ファイルドラッグで音楽ファイルを入れてください。
        <input type="file" class="fileinput__none" multiple @change="fileChange" />
      </label>
      <div v-if="!isLoaded" class="load">
        <p v-show="playListLen !== 0" class="load__text">
          {{ playListLen + 1 }}曲目を読み込み中...
        </p>
        <div class="load__spinner"></div>
      </div>
      <div v-else>
        <!--再生中の曲の情報-->
        <audio-display />
        <audio-controller />
      </div>
    </div>
  </div>
</template>

<script>
import AudioDisplay from './parts/AudioDisplay';
import AudioController from './parts/AudioController';
import audioPlayer from '@/plugins/AudioPlayer.js';

let isFirstTime = true;

export default {
  name: 'AudioMain',
  components: {
    'audio-display': AudioDisplay,
    'audio-controller': AudioController
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

.load {
  margin: 35vh auto;
}

.load__text {
  font-size: 15px;
  text-align: center;
}

/* 待機時のスピナー表示 */

.load__spinner {
  width: 100px;
  height: 100px;
  margin: 0 auto;
  border-radius: 100%;
  background-color: white;
  animation: spinner-anime 2s infinite;
}

@keyframes spinner-anime {
  from {
    transform: scale(0);
  }

  to {
    transform: scale(1);
    opacity: 0;
  }
}
</style>
