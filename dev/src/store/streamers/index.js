import axios from 'axios';

export const streamers = {
  namespaced: true,
  state: {
    streamers: []
  },
  mutations: {
    setStreamers(state, payload) {
      state.streamers = payload;
    }
  },
  actions: {
    async fetchStreamers({
      commit
    }) {
      const res = await axios({
        method: 'GET',
        url: '/user/streamers',
        headers: {
          'x-access-token': localStorage.getItem('access_token')
        }
      }).catch(err => {
        console.error(err)
      });
      if (res) {
        if (res.status === 200) {
          commit('setStreamers', res.data);
        }
      }
    }
  },
  getters: {
    getStreamers(state) {
      return state.streamers;
    }
  }
};
