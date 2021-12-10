export const state = () => ({
	alamatUserId: [],
	desaKec: [],
	kecamatanKab: [],
	kabupatens: [],
	alamatId: []
});

export const mutations = {
	SET_ALAMAT_USERID(state, payload) {
		state.alamatUserId = payload
	},
	SET_KABUPATEN_DATA(state, payload) {
		state.kabupatens = payload
	},
	SET_KECAMATAN_KAB(state, payload) {
		state.kecamatanKab = payload
	},
	SET_DESA_KEC(state, payload) {
		state.desaKec = payload
	},
	SET_ALAMAT_ID(state, payload) {
		state.alamatId = payload
	}
}

export const actions = {
	hapusAlamatData({ commit, dispatch }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.delete(`/api/alamat/delete/${payload.id}`)
			.then((res) => {
				dispatch('getAlamatUserId', payload.userId)
				resolve()
			})
			.catch((error)=> {

			})
		})
	},
	tambahAlamatData({ dispatch }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.post('/api/alamat/create', payload)
			.then((res) => {
				dispatch('getAlamatUserId', payload.userId)
				resolve()
			})
			.catch((error)=> {

			})
		})
	},
	getAlamatUserId({ commit }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.get(`/api/alamat/getuserid/${payload}`).then((res) => {
				commit('SET_ALAMAT_USERID', res.data)
				resolve()
			})
		})
	},
	getAlamatId({ commit }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.get(`/api/alamat/getalamatid/${payload}`).then((res) => {
				commit('SET_ALAMAT_ID', res.data)
				resolve()
			})
		})
	},
	getKabupatenData({ commit }) {
		return new Promise((resolve, reject) => {
			this.$axios.get('/api/kabupaten/findall').then((res) => {
				commit('SET_KABUPATEN_DATA', res.data)
				resolve()
			})
		})
	},
	getKecKab({ commit }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.get(`/api/kecamatan/getkab/${payload}`).then((res) => {
				commit('SET_KECAMATAN_KAB', res.data)
				resolve()
			})
		})
	},
	getDesaKec({ commit }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.get(`/api/desa/getkec/${payload}`).then((res) => {
				commit('SET_DESA_KEC', res.data)
				resolve()
			})
		})
	},
}