<template>
  <div class="AudioController">
    <div class="controller">
      <!--ループやシャッフルの制御-->
      <button class="controller__btn" @click="loop">
        <img
          v-show="!isLoop"
          src="@/assets/ui-icon/loop.svg"
          class="controller__icon--sm"
        />
        <img
          v-show="isLoop"
          src="@/assets/ui-icon/loop-true.svg"
          class="controller__icon--sm"
        />
      </button>
      <button class="controller__btn">
        <img src="@/assets/ui-icon/shuffle.svg" class="controller__icon--sm" />
      </button>
      <!--再生位置-->
      <div class="controller__seek">
        <div class="controller__seek--info">
          <ruby>{{ format(seekInfo.now) }}</ruby>
          <ruby>{{ format(seekInfo.end) }}</ruby>
        </div>
        <div class="flame">
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
      <button class="controller__btn" @click="prev">
        <img src="@/assets/ui-icon/prev.svg" class="controller__icon--lg" />
      </button>
      <!--再生-->
      <button v-show="!isPlay" class="controller__btn" @click="play">
        <img src="@/assets/ui-icon/play.svg" class="controller__icon--lg" />
      </button>
      <!--停止-->
      <button v-show="isPlay" class="controller__btn" @click="stop">
        <img src="@/assets/ui-icon/stop.svg" class="controller__icon--lg" />
      </button>
      <!--トラックを進める-->
      <button class="controller__btn" @click="next">
        <img src="@/assets/ui-icon/next.svg" class="controller__icon--lg" />
      </button>
      <!--音量調節-->
      <div class="controller__seek">
        <img src="@/assets/ui-icon/volume.svg" class="controller__seek--icon" />
        <input v-model="volume" type="range" min="0" :max="1" step="0.01" />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-side-effects-in-computed-properties */
import audioPlayer from '@/components/js/AudioPlayer.js';

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

input[type='range'] {
  outline: none;
}

/* オーディオプレイヤーのコントローラー */
.controller {
  text-align: center;
  margin: 10px auto;
  height: 140px;
  border: groove 1px black;
}

.controller__seek {
  text-align: center;
}

/* 時間表示(シークバー) */
.flame input[type='range'] {
  -webkit-appearance: none;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  height: 5px;
  background-color: gray;
  cursor: pointer;
  border-radius: 8px;
}

.flame ::-webkit-slider-runnable-track {
  border-radius: 10px;
}

.flame ::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 5px;
  width: 5px;
  background-color: white;
  border-radius: 100%;
  box-shadow: -100vw 0 0 99vw white;
}

.controller__seek--info {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}

.controller__seek--info ruby {
  line-height: 0px;
  font-size: 13px;
}

.controller__seek--icon {
  width: 15px;
  height: 15px;
}

input[type='range'] {
  width: 70%;
}

.controller__btn {
  background-color: rgba(0, 0, 0, 0);
  border: none;
}

.controller__icon--lg {
  height: 55px;
  width: 55px;
}

.controller__icon--sm {
  height: 15px;
  width: 15px;
}
</style>
