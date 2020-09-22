<template>
  <div class="Setting">
    <div class="center">
      <h4 @click="runBrowser">設定</h4>
      <hr />
      <!--設定の操作UI-->
      <toggle-swich :flag="isFronted" @state-change="isFronted = !isFronted">
        ウィンドウを最前面に固定
      </toggle-swich>
      <toggle-swich :flag="isDisable" @state-change="isDisable = !isDisable">
        コントローラーのみ表示
      </toggle-swich>
      <toggle-swich :flag="isAutoPlay" @state-change="isAutoPlay = !isAutoPlay">
        オートプレイ
      </toggle-swich>
      <toggle-swich :flag="isFile" @state-change="isFile = !isFile">
        ファイルの保存
      </toggle-swich>
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
import ToogleSwich from './parts/ToogleSwich';

export default {
  name: 'Setting',
  components: {
    'toggle-swich': ToogleSwich
  },
  data() {
    return {
      isFronted: false,
      isDisable: false,
      isAutoPlay: false,
      isFile: false,
      msg: ''
    };
  },
  created() {
    const LOCAL_DATA = localStorage.getItem('AudioSetting');
    if (LOCAL_DATA) {
      const SETTING = JSON.parse(LOCAL_DATA);
      // 初期値を代入
      this.isFronted = SETTING.isFronted;
      this.isDisable = SETTING.isDisable;
      this.isAutoPlay = SETTING.isAutoPlay;
      this.isFile = SETTING.isFile;
    }
  },
  methods: {
    saveSetting(msg) {
      const SETTING = {
        isFronted: this.isFronted,
        isDisable: this.isDisable,
        isAutoPlay: this.isAutoPlay,
        isFile: this.isFile
      };
      localStorage.setItem('AudioSetting', JSON.stringify(SETTING));
      this.setMsg(msg);
    },
    resetSetting() {
      this.isFronted = this.isDisable = this.isAutoPlay = this.isFile = false;
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
