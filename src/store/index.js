import Vue from 'vue';
import Vuex from 'vuex';

import AudioPlayerState from './modules/AudioPlayerState';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { audioPlayer: AudioPlayerState }
});
