export const state = () => ({
	userId : '',
	message: []
});

export const mutations = {
	SET_USER_ID (state, payload){
		state.userId = payload
	},
	SET_MESSAGE(state, payload) {
		state.message = payload
	}
}

export const actions = {
	tambahUsersData({ commit, dispatch }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.post('/api/auth/signup', payload)
			.then((res) => {
				resolve()
			})
			.catch((error)=> {
				reject()
			})
		})
	},
	getUsersId({ commit }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.get(`/api/user/getid/${payload}`).then((res) => {
				commit('SET_USER_ID', res.data)
				resolve()
			})
		})
	},
	editUsersData({ dispatch }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.put(`/api/user/update/${payload.id}`, payload)
			.then((res) => {
				resolve()
			})
			.catch((error)=> {

			})
		})
	},
	ubahPassword({ commit }, payload) {
		return new Promise((resolve, reject) => {
			this.$axios.put(`/api/user/ubahpassword/${payload.id}`, payload)
			.then((res) => {
				commit('SET_MESSAGE', res.data)
				resolve()
			})
			.catch((error)=> {
				
			})
		})
	}
}