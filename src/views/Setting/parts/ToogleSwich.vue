<template>
  <div class="ToggleSwich">
    <div class="content">
      <!--ラベル-->
      <p class="toggle-label" @click="stateChange">
          <slot></slot>
      </p>
      <!--トグルスイッチ-->
      <div class="switch" :class="{'switch__true': flag}" @click="stateChange">
        <div class="switch__knob" :class="{'switch__knob--true': flag}" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToggleSwich',
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    stateChange () {
      this.$emit('state-change')
    }
  }
}
</script>

<style scoped>
.content {
  display: flex;
  margin: 5px;
  justify-content: space-around;
}

.toggle-label {
  line-height: 20px;
  margin: 3px;
  width: 70%;
  font-size: 12.2px;
}

.switch__none {
  display: none;
}

/* 枠 */
.switch {
  position: relative;
  cursor: pointer;
  display: inline-block;
  margin: 3px auto;
  margin-left: 10%;
  height: 18px;
  width: 30px;
  border-radius: 10px;
  background-color: darkgray;
}

.switch__true {
  background-color: #8ce196;
}

/* ツマミ */
.switch__knob {
  position: absolute;
  top: 1px;
  left: 1px;
  bottom: 1px;
  height: 90%;
  width: 50%;
  border-radius: 100%;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  transition: 0.2s;
}

.switch__knob--true {
  left: 50%;
}
</style>
