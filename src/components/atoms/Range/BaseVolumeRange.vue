<template>
  <div>
    <div class="base-volume-range">
      <div class="base-volume-range__range">
        <input
          v-model="preVolume"
          type="range"
          min="0"
          :max="1"
          step="0.01"
          placeholder="0.5"
          @change="updateVolume"
        />
      </div>
      <div class="base-volume-range__info">
        <img src="@/assets/ui-icon/volume.svg" class="base-volume-range__icon" />
        <small class="base-volume-range__numbar">
          {{ Math.ceil(preVolume * 100) }}
        </small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseVolumeRange',
  props: {
    volume: {
      type: Number,
      default: 0,
      required: true
    }
  },
  data() {
    return {
      preVolume: 1
    };
  },
  watch: {
    volume() {
      this.preVolume = this.volume;
    }
  },
  methods: {
    updateVolume() {
      this.$emit('update-volume', this.preVolume);
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

/* 音量(シークバー) */
.base-volume-range {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}

.base-volume-range__range {
  display: block;
  margin: 0;
  padding: 0;
}

.base-volume-range__range ::-webkit-slider-thumb {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  overflow: visible;
}

.base-volume-range__info {
  display: flex;
  margin-left: 20px;
  padding: 0;
  width: 15%;
}

.base-volume-range__numbar {
  display: block;
  font-size: 10px;
}

.base-volume-range__icon {
  display: block;
  width: 15px;
  height: 15px;
}
</style>
