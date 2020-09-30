<template>
  <div>
    <audio-display :track-info="trackInfo" :played-song="playedSong" />
    <audio-controller
      :is-play="isPlay"
      :is-loop="isLoop"
      :seek-info="seekInfo"
      :volume="volume"
      @update-Time="updateTime"
      @update-volume="updateVolume"
      @next="next"
      @prev="prev"
      @play="play"
      @stop="stop"
      @loop="loop"
    />
  </div>
</template>

<script>
/* eslint-disable vue/no-side-effects-in-computed-properties */
import AudioDisplay from '@/components/molecules/AudioDisplay';
import AudioController from '@/components/molecules/AudioController';
import audioPlayer from '@/plugins/AudioPlayer.js';

export default {
  name: 'AudioPlayer',
  components: {
    'audio-display': AudioDisplay,
    'audio-controller': AudioController
  },
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
      return this.$store.getters['audioPlayer/seekInfo'];
    },
    trackInfo() {
      return this.$store.getters['audioPlayer/trackInfo'];
    },
    playedSong() {
      return this.$store.getters['audioPlayer/playedSong'];
    }
  },
  mounted() {
    this.volume = parseFloat(this.$store.getters['audioPlayer/preVolume']);
  },
  methods: {
    updateTime(time) {
      audioPlayer.ctrlSeek(time);
    },
    updateVolume(vol) {
      audioPlayer.ctrlVolume(vol);
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
    stop() {
      audioPlayer.stop();
    },
    loop() {
      audioPlayer.loop();
    }
  }
};
</script>
