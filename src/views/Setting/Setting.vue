<template>
  <div class="Setting">
    <div class="center">
      <h4 @click="runBrowser">設定</h4>
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
        :colors="colors"
        :init-color="initColor"
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

function colorNameToCode(colors, target) {
  if (target == null) {
    return 'black';
  } else {
    const initColor = colors.find(color => color.value === target);
    return initColor.name;
  }
}

function colorCodeToName(colors, target) {
  const colorCode = colors.find(color => color.name === target);
  return colorCode.value;
}

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
      colors: [
        { name: 'black', value: '#000000' },
        { name: 'tomato', value: '#ff6347' },
        { name: 'forestgreen', value: '#228b22' },
        { name: 'cornflowerblue', value: '#6495ed' },
        { name: 'navy', value: '#000080' },
        { name: 'gold', value: '#ffd700' },
        { name: 'orange', value: '#ffa500' },
        { name: 'purple', value: '#9400d3' },
        { name: 'pink', value: '#ffc0cb' }
      ],
      msg: ''
    };
  },
  computed: {
    initColor() {
      return colorNameToCode(this.colors, this.setting.backgroundColor);
    }
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
      this.setting.backgroundColor = colorCodeToName(this.colors, color);
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
    },
    runBrowser() {
      console.log('browser test');
      window.open(location.href, null, 'top=100,left=100,width=280,height=470');
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
