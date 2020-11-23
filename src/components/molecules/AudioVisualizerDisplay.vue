<template>
  <div>
    <!--情報の表示-->
    <div class="audio-display">
      <base-text
        class="base-text--artwork"
        :text="`track[${trackInfo.now + 1}/${trackInfo.max}]`"
      />
      <base-flow-text :flow-text="playedSong.title" />
      <base-text class="base-text--artwork" :text="playedSong.artist" />
      <div id="target" ref="canvasWrapper" />
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import BaseText from '../atoms/Text/BaseText';
import BaseFlowText from '../atoms/Text/BaseFlowText';

export default {
  name: 'AudioDisplay',
  components: {
    'base-flow-text': BaseFlowText,
    'base-text': BaseText
  },
  props: {
    trackInfo: {
      type: Object,
      default: () => {},
      required: true
    },
    playedSong: {
      type: Object,
      default: () => {},
      required: true
    },
    canvasPas: {
      type: Object,
      default: null
    },
    isCanvas: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      audioSpectram: null,
      drawTimer: null
    };
  },
  watch: {
    isCanvas() {
      if (this.isCanvas) {
        this.updateCanvas();
      }
    }
  },
  mounted() {
    if (this.isCanvas) {
      this.updateCanvas();
    }
  },
  methods: {
    updateCanvas() {
      this.destoroyCanvas();
      this.audioSpectram = new PonAudioSpectrum(
        // PonAudioSpectrum.VisualizerType.Block,
        PonAudioSpectrum.VisualizerType.Solid,
        {
          colors: ['#8a99ff', '#87ff9f', '#f8ff96', '#ff5b4f']
        }
      );
      this.audioSpectram.setAudio(this.canvasPas);
      this.$refs.canvasWrapper.appendChild(this.audioSpectram.canvas);
      this.drawTimer = setInterval(() => {
        this.audioSpectram.draw();
      }, 1 / 60);
    },
    destoroyCanvas() {
      if (this.audioSpectram != null) {
        clearInterval(this.drawTimer);
        this.$refs.canvasWrapper.removeChild(this.audioSpectram.canvas);
        this.audioSpectram.destroy();
        this.audioSpectram = null;
      }
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

#target {
  margin: 0 auto;
  height: 180px;
  width: 180px;
  border: 0.5px solid white;
}

/* #target {
  margin: 0 auto;
  height: 160px;
  width: 240px;
  border: 1px solid white;
} */
</style>
