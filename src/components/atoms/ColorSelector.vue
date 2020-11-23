<template>
  <div>
    <div class="color-selector">
      <label class="color-selector__label" :for="id"> <slot /> </label>
      <select
        :id="id"
        v-model="selectColor"
        class="color-selector__form"
        @change="setColor"
      >
        <option v-for="(color, index) in colors" :key="index" :value="color.name">
          {{ color.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { colors } from '@/constants/index.js';

function colorCodeToName(target) {
  if (target == null) {
    return 'black';
  } else {
    const initColor = colors.find(color => color.value === target);
    return initColor.name;
  }
}

function colorNameToCode(target) {
  const colorCode = colors.find(color => color.name === target);
  return colorCode.value;
}

export default {
  name: 'ColorSelecter',
  props: {
    id: {
      type: String,
      default: '',
      required: true
    },
    initColor: {
      type: String,
      default: 'black',
      required: true
    }
  },
  data() {
    return {
      selectColor: colorCodeToName(this.initColor),
      colors: colors
    };
  },
  methods: {
    setColor() {
      this.$emit('set-color', colorNameToCode(this.selectColor));
    }
  }
};
</script>

<style scoped>
.color-selector {
  display: flex;
  justify-content: space-between;
  margin: 15px;
}

.color-selector__label {
  line-height: 20px;
  margin: 3px;
  width: 70%;
  font-size: 12.2px;
}

.color-selector__form {
  height: 25px;
  font-size: 15px;
}
</style>
