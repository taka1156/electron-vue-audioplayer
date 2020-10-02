<template>
  <div>
    <div class="ctrl__seek">
      <div class="ctrl__time-info">
        <ruby>{{ format(seekInfo.now) }}</ruby>
        <ruby>{{ format(seekInfo.end) }}</ruby>
      </div>
      <div class="ctrl__time-range">
        <input
          type="range"
          :value="preTime"
          min="0"
          :max="seekInfo.end"
          step="1"
          placeholder="0"
          @change="updateTime"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseTimeRange',
  props: {
    seekInfo: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  data() {
    return {
      preTime: 0,
      isCtrl: false
    };
  },
  watch: {
    seekInfo() {
      if (!this.isCtrl) {
        this.preTime = this.seekInfo.now;
      }
    }
  },
  methods: {
    updateTime(e) {
      this.preTime = e.target.value;
      if (this.preTime !== this.seekInfo.now) {
        this.isCtrl = true;
        this.$emit('update-time', this.preTime);
        this.isCtrl = false;
      }
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
</style>
