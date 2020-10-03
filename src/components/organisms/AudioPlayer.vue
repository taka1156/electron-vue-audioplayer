<template>
  <div>
    <div v-if="isVisual">
      <audio-Visualizer-Display
        :track-info="trackInfo"
        :played-song="playedSong"
        :canvas-pas="canvasPas"
        :is-canvas="isCanvas"
      />
    </div>
    <div v-else>
      <audio-display :track-info="trackInfo" :played-song="playedSong" />
    </div>
    <audio-controller
      :is-play="isPlay"
      :is-loop="isLoop"
      :is-visual="isVisual"
      :seek-info="seekInfo"
      :volume="volume"
      @update-Time="updateTime"
      @update-volume="updateVolume"
      @next="next"
      @prev="prev"
      @play="play"
      @pause="pause"
      @visual="visual"
      @loop="loop"
    />
  </div>
</template>

<script>
/* eslint-disable vue/no-side-effects-in-computed-properties */
import AudioDisplay from '@/components/molecules/AudioDisplay';
import AudioVisualizerDisplay from '../molecules/AudioVisualizerDisplay';
import AudioController from '@/components/molecules/AudioController';
import audioPlayer from '@/plugins/howlerAudioPlayer.js';

export default {
  name: 'AudioPlayer',
  components: {
    'audio-display': AudioDisplay,
    'audio-Visualizer-Display': AudioVisualizerDisplay,
    'audio-controller': AudioController
  },
  data() {
    return {
      seekTime: 0, // 現在のシークバーの現在位置(再生位置)
      volume: 1,
      isVisual: false
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
      return this.$store.getters['audioPlayer/seekInfo'];
    },
    trackInfo() {
      return this.$store.getters['audioPlayer/trackInfo'];
    },
    playedSong() {
      return this.$store.getters['audioPlayer/playedSong'];
    },
    canvasPas() {
      return this.$store.getters['audioPlayer/canvas'];
    },
    isCanvas() {
      return this.$store.getters['audioPlayer/isCanvas'];
    }
  },
  mounted() {
    this.volume = parseFloat(this.$store.getters['audioPlayer/preVolume']);
  },
  methods: {
    updateTime(time) {
      audioPlayer.updateTime(time);
    },
    updateVolume(vol) {
      audioPlayer.updateVolume(vol);
    },
    next() {
      audioPlayer.next();
    },
    prev() {
      audioPlayer.prev();
    },
    play() {
      audioPlayer.play();
    },
    pause() {
      audioPlayer.pause();
    },
    loop() {
      audioPlayer.loop();
    },
    visual() {
      this.isVisual = !this.isVisual;
      audioPlayer.visual();
    }
  }
};
</script>
