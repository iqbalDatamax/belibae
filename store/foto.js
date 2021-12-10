export const state = () => ({
	fotos: [],
	fotoId: []
});

export const mutations = {
	SET_FOTO_DATA(state, payload) {
		state.fotos = payload.fotos
	},
	SET_FOTO_ID(state, payload) {
		state.fotoId = payload
	},
}

export const actions = {
	getFotoData({ commit }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.get(`/api/foto/findProdukid/${payload}`).then((res) => {
				commit('SET_FOTO_DATA', res.data)
				resolve()
			})
		})
	},
	tambahFotoData({ dispatch }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.post('/api/foto/create', payload)
			.then((res) => {
				// dispatch('getFotoData')
				resolve()
			})
			.catch((error)=> {

			})
		})
	},
	hapusFoto({ commit, dispatch }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.delete(`/api/foto/delete/${payload.id}/${payload.urlfoto}`)
			.then((res) => {
				// dispatch('getFotoData')
				resolve()
			})
			.catch((error)=> {

			})
		})
	},
	editFotoData({ dispatch }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.put(`/api/foto/update/${payload.id}`, payload)
			.then((res) => {
				dispatch('getFotoData')
				resolve()
			})
			.catch((error)=> {

			})
		})
	}
}