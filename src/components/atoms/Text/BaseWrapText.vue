<template functional>
  <p v-if="props.wrapText.length > 14" class="base-wrap-text">
    {{ props.wrapText.substr(0, 14) }}...
  </p>
  <p v-else class="base-wrap-text">
    {{ props.wrapText }}
  </p>
</template>

<style scoped>
.base-wrap-text {
  margin: 0;
  font-size: 13px;
  text-align: left;
}
</style>
