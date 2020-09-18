import { loadSong } from '@/components/js/GenSong.js'

const state = {
  isLoaded: false, // 読み込み状態
  isPlay: false, // 再生状態の確認
  isLoop: false, // ループの状態
  playList: [], // 登録したファイル一覧
  index: 0, // プレイリストの添字
  preSeekTime: 0, // 現在のシークバーの現在位置(再生位置)
  seekEndTime: 0, // シークバーの最大値
  preVolume: 1
}

const getters = {
  isLoaded (state) {
    return state.isLoaded
  },
  playList (state) {
    return state.playList
  },
  playedSong (state) {
    return state.playList[state.index]
  },
  // オーディオの状態
  isPlay (state) {
    return state.isPlay
  },
  isLoop (state) {
    return state.isLoop
  },
  preVolume (state) {
    return state.preVolume
  },
  // 再生時間の情報
  seekInfo (state) {
    return {
      now: Math.floor(state.preSeekTime), // 現在の再生時間
      end: Math.floor(state.seekEndTime) // 終わりの再生時間
    }
  },
  // トラックの情報
  trackInfo (state) {
    return {
      now: state.index, // 現在のトラック
      max: state.playList.length // 最大のトラック
    }
  }
}

const mutations = {
  // 曲の追加
  addSong (state, song) {
    state.playList.push(song)
  },
  stateChangeLoad (state) {
    state.isLoaded = true
  },
  // 再生、停止
  stateChangePlay (state) {
    state.isPlay = !state.isPlay
  },
  // 現在のシーク位置
  setPreSeekTime (state, preSeekTime) {
    state.preSeekTime = preSeekTime
  },
  // 終わりのシーク位置
  setSeekEndTime (state, seekEndTime) {
    state.seekEndTime = seekEndTime
  },
  // 添字を進める
  nextIndex (state) {
    const INDEX = Math.min(state.index + 1, state.playList.length)
    state.index = INDEX === state.playList.length ? 0 : INDEX
  },
  // 添字を戻す
  prevIndex (state) {
    const INDEX = Math.max(state.index - 1, -1)
    state.index = INDEX === -1 ? state.playList.length - 1 : INDEX
  },
  // 添字を直接変える
  setIndex (state, index) {
    state.index = index
  },
  // ループ制御
  stateChangeLoop (state) {
    state.isLoop = !state.isLoop
  },
  // ボリューム
  setPreVolume (state, vol) {
    state.preVolume = vol
  }
}

const actions = {
  async loadFile (context, files) {
    for (let i = 0; i < files.length; i++) {
      const SONG = await loadSong(files[i])
      console.log(SONG)
      context.commit('addSong', SONG)
    }
    context.commit('stateChangeLoad')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
