<template>
  <div class="AudioController">
    <div class="ctrl">
      <!--ループやシャッフルの制御-->
      <button class="ctrl__btn" @click="loop">
        <img
          v-show="!isLoop"
          src="@/assets/ui-icon/loop.svg"
          class="ctrl__icon--sm"
        />
        <img
          v-show="isLoop"
          src="@/assets/ui-icon/loop-true.svg"
          class="ctrl__icon--sm"
        />
      </button>
      <button class="ctrl__btn">
        <img src="@/assets/ui-icon/shuffle.svg" class="ctrl__icon--sm" />
      </button>
      <!--再生位置-->
      <div class="ctrl__seek">
        <div class="ctrl__time-info">
          <ruby>{{ format(seekInfo.now) }}</ruby>
          <ruby>{{ format(seekInfo.end) }}</ruby>
        </div>
        <div class="ctrl__time-range">
          <input
            v-model="seekTime"
            type="range"
            min="0"
            :max="seekInfo.end"
            step="1"
          />
        </div>
      </div>
      <!--トラックを戻す-->
      <button class="ctrl__btn" @click="prev">
        <img src="@/assets/ui-icon/prev.svg" class="ctrl__icon--lg" />
      </button>
      <!--再生-->
      <button v-show="!isPlay" class="ctrl__btn" @click="play">
        <img src="@/assets/ui-icon/play.svg" class="ctrl__icon--lg" />
      </button>
      <!--停止-->
      <button v-show="isPlay" class="ctrl__btn" @click="stop">
        <img src="@/assets/ui-icon/stop.svg" class="ctrl__icon--lg" />
      </button>
      <!--トラックを進める-->
      <button class="ctrl__btn" @click="next">
        <img src="@/assets/ui-icon/next.svg" class="ctrl__icon--lg" />
      </button>
      <!--音量調節-->
      <div class="ctrl__seek">
        <span class="ctrl__volume-info">
          <img src="@/assets/ui-icon/volume.svg" class="ctrl__volume-icon" />
          <small class="ctrl__volume-numbar">{{ volume * 100 }}</small>
        </span>
        <span class="ctrl__volume-range">
          <input v-model="volume" type="range" min="0" :max="1" step="0.01" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-side-effects-in-computed-properties */
import audioPlayer from '@/plugins/AudioPlayer.js';

export default {
  name: 'AudioController',
  data() {
    return {
      seekTime: 0, // 現在のシークバーの現在位置(再生位置)
      volume: 1
    };
  },
  computed: {
    isPlay() {
      return this.$store.getters['audioPlayer/isPlay'];
    },
    isLoop() {
      return this.$store.getters['audioPlayer/isLoop'];
    },
    seekInfo() {
      const { now, end } = this.$store.getters['audioPlayer/seekInfo'];
      this.seekTime = now;
      return { now, end };
    }
  },
  watch: {
    seekTime() {
      // ユーザが操作した時のみ適用(再生時間の視覚表示にも使ってるためjs側からの操作を弾く必要がある)
      if (this.seekInfo.now !== this.seekTime) {
        audioPlayer.ctrlSeek(this.seekTime);
      }
    },
    volume() {
      if (this.preVolume !== this.volume) {
        audioPlayer.ctrlVolume(this.volume);
      }
    }
  },
  mounted() {
    this.volume = this.$store.getters['audioPlayer/preVolume'];
  },
  methods: {
    next() {
      audioPlayer.next();
    },
    prev() {
      audioPlayer.prev();
    },
    play() {
      audioPlayer.play();
    },
    stop() {
      audioPlayer.stop();
    },
    loop() {
      audioPlayer.loop();
    },
    format(seconds) {
      const minute = seconds !== 0 ? Math.floor(seconds / 60) : 0;
      const second = seconds !== 0 ? seconds - minute * 60 : 0;
      const formatMinute = minute < 10 ? `0${minute}` : `${minute}`;
      const formatSecond = second < 10 ? `0${second}` : `${second}`;
      return `${formatMinute}:${formatSecond}`;
    }
  }
};
</script>

<style scoped>
/* デフォルトcss無効化 */
button:focus {
  outline: none;
}

/* 共通css */

input[type='range'] {
  appearance: none;
  height: 3px;
  width: 70%;
  background-color: gray;
  cursor: pointer;
  border-radius: 8px;
  outline: none;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  background-color: white;
}

.ctrl {
  text-align: center;
  margin: -5px auto;
  padding: 5px;
  height: 140px;
  width: 90%;
  border-top: 0.1px solid white;
}

.ctrl__seek {
  margin: 0;
  padding: 0;
  text-align: center;
}

/* 共通css */

/* 音量 */

.ctrl__volume-range ::-webkit-slider-thumb {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  overflow: visible;
}

.ctrl__volume-info {
  margin-left: -20px;
  margin-right: 1px;
  width: 80%;
}

.ctrl__volume-numbar {
  font-size: 10px;
}

.ctrl__volume-icon {
  width: 15px;
  height: 15px;
}

/* 時間表示(シークバー) */
.ctrl__time-range input[type='range'] {
  position: relative;
  overflow: hidden;
}

.ctrl__time-range ::-webkit-slider-thumb {
  height: 5px;
  width: 5px;
  border-radius: 100%;
  box-shadow: -100vw 0 0 99vw white;
}

.ctrl__time-info {
  display: flex;
  justify-content: space-between;
  margin: -10px auto;
  width: 90%;
}

.ctrl__time-info ruby {
  font-size: 10px;
}

.ctrl__btn {
  appearance: none;
  line-height: 0;
  margin: 5px;
  padding: 0;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  border-radius: 50%;
}

.ctrl__icon--sm {
  height: 15px;
  width: 15px;
  margin: 0;
  padding: 0;
}

.ctrl__icon--lg {
  height: 45px;
  width: 45px;
  margin: 0;
  padding: 0;
}
</style>
