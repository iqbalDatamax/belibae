export const state = () => ({
	kategoris: [],
	kategoriFood: []
});

export const mutations = {
	SET_KATEGORI_DATA(state, payload) {
		state.kategoris = payload
	},
	SET_KATEGORI_FOOD(state, payload) {
		state.kategoriFood = payload
	}
}

export const actions = {
	getKategoriFoodbae({ commit }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.get(`/api/kategori/findfoodbae${payload}`).then((res) => {
				commit('SET_KATEGORI_DATA', res.data)
				resolve()
			})
		})
	},
}