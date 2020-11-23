<template>
  <div>
    <div class="center">
      <h4>設定</h4>
      <hr />
      <!--設定の操作UI-->
      <toggle-switch
        :id="'window-fixed'"
        :flag="setting.alwaysOnTop"
        @state-change="setting.alwaysOnTop = !setting.alwaysOnTop"
      >
        ウィンドウを最前面に固定
      </toggle-switch>
      <color-selecter
        :id="'window-color'"
        :init-color="setting.backgroundColor"
        @set-color="setColor"
      >
        色変更
      </color-selecter>
      <!--設定の反映、初期化-->
      <div class="setting">
        <button @click="saveSetting('保存しました。')">保存</button>
        <button @click="resetSetting">リセット</button>
      </div>
      <!--保存状態の表示-->
      <transition name="msg-fade">
        <p v-if="msg !== ''" class="msg">{{ msg }}</p>
      </transition>
    </div>
  </div>
</template>

<script>
import ToggleSwitch from '@/components/atoms/ToggleSwitch';
import ColorSelecter from '@/components/atoms/ColorSelector';
import { updateWindowSetting } from '@/plugins/ElectronRemote.js';

export default {
  name: 'Setting',
  components: {
    'toggle-switch': ToggleSwitch,
    'color-selecter': ColorSelecter
  },
  data() {
    return {
      setting: {
        alwaysOnTop: false,
        backgroundColor: '#000000'
      },
      msg: ''
    };
  },
  created() {
    const LOCAL_DATA = localStorage.getItem('AudioSetting');
    if (LOCAL_DATA) {
      const SETTING = JSON.parse(LOCAL_DATA);
      // 初期値を代入
      this.setting.alwaysOnTop = SETTING.alwaysOnTop;
      this.setting.backgroundColor = SETTING.backgroundColor;
    }
  },
  methods: {
    setColor(color) {
      this.setting.backgroundColor = color;
    },
    saveSetting(msg) {
      localStorage.setItem('AudioSetting', JSON.stringify(this.setting));
      updateWindowSetting(this.setting);
      this.setMsg(msg);
    },
    resetSetting() {
      this.setting.alwaysOnTop = false;
      this.setting.backgroundColor = '#000000';
      this.saveSetting('初期化しました。');
    },
    setMsg(msg) {
      this.msg = msg;
      const init = setTimeout(() => {
        this.msg = '';
        clearTimeout(init);
      }, 1000);
    }
  }
};
</script>

<style scoped>
.center {
  margin: 0 auto;
  height: 87vh;
  width: 95%;
  border: solid 1px white;
}

p {
  line-height: 8px;
  font-size: 11.2px;
}

.setting {
  margin: 0 auto;
  width: 60%;
  display: flex;
  justify-content: space-around;
}

.msg {
  text-align: center;
}

/* msgのアニメーション */
.msg-fade-enter,
.msg-fade-leave-to {
  opacity: 0;
}

.msg-fade-enter-to,
.msg-fade-leave {
  opacity: 1;
}

.msg-fade-enter-active,
.msg-fade-leave-active {
  transition: opacity 0.6s ease;
}
</style>
