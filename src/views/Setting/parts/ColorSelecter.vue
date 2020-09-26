<template>
  <div>
    <div class="content">
      <label class="selecter-label"> <slot /> </label>
      <select v-model="selectColor" class="selecter-form" @change="setColor">
        <option v-for="(color, index) in colors" :key="index" :value="color.name">
          {{ color.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ColorSelecter',
  props: {
    colors: {
      type: Array,
      default: () => [],
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
      selectColor: this.initColor
    };
  },
  methods: {
    setColor() {
      this.$emit('set-color', this.selectColor);
    }
  }
};
</script>

<style scoped>
.content {
  display: flex;
  margin: 5px;
  justify-content: space-around;
}

.selecter-label {
  line-height: 20px;
  margin: 3px;
  width: 70%;
  font-size: 12.2px;
}

.selecter-form {
  font-size: 15px;
}
</style>
