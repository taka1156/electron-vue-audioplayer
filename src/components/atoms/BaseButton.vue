<template functional>
  <button class="base-button" @click="listeners.click">
    <img
      :src="props.imgUrl"
      class="base-button--sm"
      :class="data.staticClass || ''"
    />
  </button>
</template>

<style scoped>
/* デフォルトcss無効化 */
button:focus {
  outline: none;
}

.base-button {
  appearance: none;
  line-height: 0;
  margin: 10px;
  padding: 0;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  border-radius: 50%;
}

.base-button--sm {
  height: 16px;
  width: 16px;
  margin: 0;
  padding: 0;
}

.base-button--lg {
  height: 45px;
  width: 45px;
  margin: 0;
  padding: 0;
}
</style>
