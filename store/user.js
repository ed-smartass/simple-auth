export const state = () => ({
    profile: {},
    token: null
})

export const getters = {
    profile: state => state.profile,
    token: state => state.token,
    isLogged: state => !!state.token,
    isGuest: state => !state.token,
}

export const mutations = {
    SET_PROFILE: (state, profile) => state.profile = profile,
    SET_TOKEN: (state, token) => state.token = token
}

export const actions = {
    async init({ dispatch }) {
        const token = this.$cookies.get('token')

        if (token) {
            await dispatch('setToken', token)
        }
    },
    async setToken({ commit, dispatch }, token) {
        this.$cookies.set('token', token, { path: '/', maxAge: 2147483646 })
        this.$axios.setToken(token)
        await commit('SET_TOKEN', token)
        await dispatch('fetchProfile')
    },
    async fetchProfile({ commit, dispatch }) {
        try {
            await commit('SET_PROFILE', await this.$axios.$get('/api/user/profile', {}, { progress: false }))
        } catch (error) {
            await dispatch('logout')
        }
    },
    async login({ dispatch }, { login, password }) {
        const response = await this.$axios.$post('/api/user/login', { login, password })
        await dispatch('setToken', response.token)
    },
    async logout({ commit }) {
        await commit('SET_PROFILE', {})
        await commit('SET_TOKEN', null)
        this.$axios.setToken(false)
        this.$cookies.remove('token')
        this.$router.go()
    },
}