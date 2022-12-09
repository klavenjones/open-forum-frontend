const state = () => ({
  loginApiStatus: '',
});

const getters = {};

const actions = {
  async loginApi({ commit }, payload) {
    const response = await axios
      .post('http://localhost:3000/auth/login', payload, { withCredentials: true, credentials: 'include' })
      .catch(err => {
        console.log(err);
      });

    if (response && response.data) {
      commit('setLoginApiStatus', 'success');
    } else {
      commit('setLoginApiStatus', 'failed');
    }
  },
};

const mutations = {
  setLoginApiStatus(state: { loginApiStatus: any }, data: any) {
    state.loginApiStatus = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
