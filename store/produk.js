export const state = () => ({
	produkFavorit: [],
	produks: [],
	idProduk: ''
});

export const mutations = {
	SET_PRODUK_FAVORIT(state, payload) {
		state.produkFavorit = payload
	},
	SET_PRODUK_DATA(state, payload) {
		state.produks = payload
	},
	SET_PRODUK_ID(state, payload) {
		state.produkId = payload
	},
	SET_ID_PRODUK(state, payload){
		state.idProduk = payload.produkId
	}
}

export const actions = {
	getProdukData({ commit }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.get(`/api/produk/findall${payload}`).then((res) => {
				commit('SET_PRODUK_DATA', res.data)
				resolve()
			})
		})
	},
	getProdukPublish({ commit }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.get(`/api/produk/findpublish${payload}`).then((res) => {
				commit('SET_PRODUK_DATA', res.data)
				resolve()
			})
		})
	},
	tambahProdukData({ commit, dispatch }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.post('/api/produk/create', payload)
			.then((res) => {
				let dt = {
					id : payload.tokoId,
					namaproduk : ''
				}
				commit('SET_ID_PRODUK', res.data)
				dispatch('getProdukTokoId' , dt)
				resolve()
			})
			.catch((error)=> {

			})
		})
	},
	getProdukId({ commit }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.get(`/api/produk/getprodukid/${payload}`).then((res) => {
				commit('SET_PRODUK_ID', res.data)
				resolve()
			})
		})
	},
	getProdukFavorit({ commit }) {
		return new Promise((resolve, reject) => {
			this.$axios.get('/api/produk/findfavorit').then((res) => {
				commit('SET_PRODUK_FAVORIT', res.data)
				resolve()
			})
		})
	},
	getProdukKategoriId({ commit }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.get(`/api/produk/findidkategori/${payload.id}${payload.query}`).then((res) => {
				commit('SET_PRODUK_DATA', res.data)
				resolve()
			})
		})
	},
	getProdukTokoId({ commit }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.get(`/api/produk/findidtoko/${payload.id}${payload.query}`).then((res) => {
				commit('SET_PRODUK_DATA', res.data)
				resolve()
			})
		})
	},
	editProduksData({ dispatch }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.put(`/api/produk/update/${payload.uuid}`, payload)
			.then((res) => {
				dispatch('getProdukData')
				resolve()
			})
			.catch((error)=> {

			})
		})
	},
	hapusProdukStatus({ commit, dispatch }, payload) {
		let dt = {
	      id : payload.tokoid,
	      query : `?page=0&size=10`
	    }
		return new Promise((resolve, reject) => {
			this.$axios.put(`/api/produk/updatestatus/${payload.uuid}`)
			.then((res) => {
				dispatch('getProdukTokoId', dt)
				resolve()
			})
			.catch((error)=> {

			})
		})
	},
}