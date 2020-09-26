<template>
  <div>
    <div class="toggle-switch">
      <!--ラベル-->
      <label class="toggle-switch__label" :for="id" @click="stateChange">
        <slot />
      </label>
      <!--トグルスイッチ-->
      <div
        class="toggle-switch__frame"
        :class="{ 'toggle-switch__frame--true': flag }"
        @click="stateChange"
      >
        <input :id="id" type="checkbox" @change="stateChange" />
        <div
          class="toggle-switch__knob"
          :class="{ 'toggle-switch__knob--true': flag }"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToggleSwich',
  props: {
    id: {
      type: String,
      default: '',
      required: true
    },
    flag: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  methods: {
    stateChange() {
      this.$emit('state-change');
    }
  }
};
</script>

<style scoped>
input[type='checkbox'] {
  display: none;
}

.toggle-switch {
  display: flex;
  justify-content: space-around;
  margin: 15px;
}

.toggle-switch__label {
  line-height: 20px;
  margin: 3px;
  width: 70%;
  font-size: 12.2px;
}

/* 枠 */
.toggle-switch__frame {
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

.toggle-switch__frame--true {
  background-color: #8ce196;
}

/* ツマミ */
.toggle-switch__knob {
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

.toggle-switch__knob--true {
  left: 50%;
}
</style>
