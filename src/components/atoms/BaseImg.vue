<template functional>
  <img
    :src="props.imgUrl"
    :alt="props.imgAlt"
    class="img"
    :class="data.staticClass || ''"
  />
</template>

<style scoped>
.img {
  display: block;
  margin: 5px auto;
}
</style>
