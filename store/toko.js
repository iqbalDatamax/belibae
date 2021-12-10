export const state = () => ({
	tokos: [],
	tokoUserId: [],
	tokoId:{}
});

export const getters = {
  idtoko(state) {
  }
}

export const mutations = {
	SET_TOKO_DATA(state, payload) {
		state.tokos = payload
	},
	SET_TOKO_USERID(state, payload) {
		state.tokoUserId = payload
	},
	SET_TOKO_ID(state, payload) {
		state.tokoId = payload
	},
}

export const actions = {
	getTokoId({ commit }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.get(`/api/toko/getid/${payload}`).then((res) => {
				commit('SET_TOKO_ID', res.data)
				resolve()
			})
		})
	},
	tambahTokoData({ dispatch }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.post('/api/toko/create', payload)
			.then((res) => {
				dispatch('getTokoUserId', payload.userId)
				resolve()
			})
			.catch((error)=> {

			})
		})
	},
	getTokoData({ commit }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.get(`/api/toko/findall${payload}`).then((res) => {
				commit('SET_TOKO_DATA', res.data)
				resolve()
			})
		})
	},
	getTokoUserId({ commit }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.get(`/api/toko/getuserid/${payload}`).then((res) => {
				commit('SET_TOKO_USERID', res.data)
				resolve()
			})
		})
	},
	editTokoData({ dispatch }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.put(`/api/toko/update/${payload.userId}`, payload)
			.then((res) => {
				resolve()
			})
			.catch((error)=> {

			})
		})
	}
}