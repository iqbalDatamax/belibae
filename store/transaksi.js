export const state = () => ({
	transaksiUser: [],
	transaksiToko : [],
	transaksiId: [],
	sukaku:[],
	jumlahTerima: 0,
	jumlahKirim: 0,
	jumlahKemas: 0, 
	jumlahKirimuser: 0,
	jumlahKeranjang: 0,
	jumlahKeranjangFoodbae: 0
});

export const mutations = {
	SET_TRANSAKSI_DATA (state, payload){
		state.transaksiToko = payload
	},
	SET_TRANSAKSI_USER (state, payload){
		state.transaksiUser = payload
	},
	SET_TRANSAKSI_ID (state, payload){
		state.transaksiId = payload
	},
	SET_SUKAKU (state, payload){
		state.sukaku = payload
	},
	SET_KEMAS (state, payload){
		state.jumlahKemas = payload
	},
	SET_KIRIM (state, payload){
		state.jumlahKirim = payload
	},
	SET_TERIMA (state, payload){
		state.jumlahTerima = payload
	},
	SET_KIRIM_USER (state, payload){
		state.jumlahKirimuser = payload
	},
	SET_KERANJANG (state, payload){
		state.jumlahKeranjang = payload
	},
	SET_KERANJANG_FOODBAE (state, payload){
		state.jumlahKeranjangFoodbae = payload
	}

}

export const getters = {
  countKeranjang(state) {
    return state.jumlahKeranjang
  },
  countKeranjangFoodbae(state) {
    return state.jumlahKeranjangFoodbae
  },
  countKemas(state) {
    return state.jumlahKemas
  },
  countKirim(state) {
    return state.jumlahKirim
  },
  countTerima(state) {
    return state.jumlahTerima
  },
  countKirimUser(state) {
    return state.jumlahKirimuser
  },
}

export const actions = {
	getTransaksiData({ commit }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.get(`/api/transaksi/findstatus${payload}`).then((res) => {
				commit('SET_TRANSAKSI_DATA', res.data)
				resolve()
			})
		})
	},
	tambahTransaksiData({ commit, dispatch }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.post('/api/transaksi/create', payload)
			.then((res) => {
				if(payload.status == 1){
					dispatch('getTransaksiUser', payload)
					resolve()
				}else{
					dispatch('getSukaku', payload)
					resolve()
				}
			})
			.catch((error)=> {

			})
		})
	},
	getTransaksiUser({ commit }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.get(`/api/transaksi/finduserstatus/${payload.userId}/${payload.status}${payload.foodbae}`).then((res) => {
				commit('SET_TRANSAKSI_USER', res.data)
				resolve()
			})
		})
	},

	getSukaku({ commit }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.get(`/api/transaksi/finduserstatus/${payload.userId}/${payload.status}`).then((res) => {
				commit('SET_SUKAKU', res.data)
				resolve()
			})
		})
	},
	
	// getUserTransaksi({ commit }, payload) {
	// 	return new Promise((resolve, reject) => {
	// 		this.$axios.get(`/api/transaksi/finduserstatus/${payload.userId}/${payload.status}`).then((res) => {
	// 			commit('SET_USER_TRANSAKSI', res.data)
	// 			resolve()
	// 		})
	// 	})
	// },

	getTransaksiToko({ commit }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.get(`/api/transaksi/findtokostatus/${payload.tokoId}/${payload.status}`).then((res) => {
				commit('SET_USER_TRANSAKSI', res.data)
				resolve()
			})
		})
	},
	hapusTransaksiData({ commit, dispatch }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.delete(`/api/transaksi/delete/${payload.uuid}/${payload.status}`)
			.then((res) => {
				if(payload.status == 1){
					dispatch('getTransaksiUser', payload)
					resolve()
				}else{
					dispatch('getSukaku', payload)
					resolve()
				}
			})
			.catch((error)=> {

			})
		})
	},
	editQtyData({ dispatch }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.put(`/api/transaksi/update/${payload.uuid}`, payload)
			.then((res) => {
				dispatch('getTransaksiUser', payload)
				resolve()
			})
			.catch((error)=> {

			})
		})
	},
	tambahAlamatPengiriman({dispatch}, payload){
		return new Promise((resolve, reject) => {
			this.$axios.put(`/api/transaksi/updatealamatpengiriman/${payload.uuid}`, payload)
			.then((res) => {
				dispatch('getTransaksiUser', payload)
				resolve()
			})
		})
	},
	getTransaksiId({ commit }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.get(`/api/transaksi/getid/${payload}`).then((res) => {
				commit('SET_TRANSAKSI_ID', res.data)
				resolve()
			})
		})
	},
	updateStatus({ dispatch }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.put(`/api/transaksi/updatestatus/${payload.uuid}`, payload)
			.then((res) => {
				// dispatch('getTransaksiUser', dt)
				resolve()
			})
			.catch((error)=> {

			})
		})
	},
	checkoutData({ dispatch }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.put(`/api/transaksi/checkout/${payload.userId}`, payload)
			.then((res) => {
				dispatch('getTransaksiUser', payload)
				resolve()
			})
			.catch((error)=> {

			})
		})
	},

	updateongkir({ dispatch }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.put(`/api/transaksi/updateongkir/${payload.uuid}`, payload)
			.then((res) => {
				dispatch('getTransaksiUser', payload)
				resolve()
			})
			.catch((error)=> {

			})
		})
	},

	getJumlahKemas({ commit, dispatch }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.get(`/api/transaksi/jumlahkemas/${payload.id}`)
			.then((res) => {
				commit('SET_KEMAS', res.data.count)
				resolve()
			})
			.catch((error)=> {

			})
		})
	},
	getJumlahKirim({ commit, dispatch }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.get(`/api/transaksi/jumlahkirim/${payload.id}`)
			.then((res) => {
				commit('SET_KIRIM', res.data.count)
				resolve()
			})
			.catch((error)=> {

			})
		})
	},
	getJumlahTerima({ commit, dispatch }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.get(`/api/transaksi/jumlahterima/${payload.id}`)
			.then((res) => {
				commit('SET_TERIMA', res.data.count)
				resolve()
			})
			.catch((error)=> {

			})
		})
	},
	getJumlahKirimUser({ commit, dispatch }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.get(`/api/transaksi/jumlahkirimuser/${payload.userId}`)
			.then((res) => {
				commit('SET_KIRIM_USER', res.data.count)
				resolve()
			})
			.catch((error)=> {

			})
		})
	},
	getJumlahKeranjang({ commit, dispatch }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.get(`/api/transaksi/jumlahKeranjang/${payload.userId}`)
			.then((res) => {
				commit('SET_KERANJANG', res.data.count)
				resolve()
			})
			.catch((error)=> {

			})
		})
	},
	getJumlahKeranjangFoodbae({ commit, dispatch }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.get(`/api/transaksi/jumlahKeranjangfoodbae/${payload.userId}`)
			.then((res) => {
				commit('SET_KERANJANG_FOODBAE', res.data.count)
				resolve()
			})
			.catch((error)=> {

			})
		})
	},

}