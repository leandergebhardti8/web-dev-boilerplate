import axios from 'axios'

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error)
})

const state = {
    user: null,
    fullUser: null,
    token: null,
    tokenNotValid: false,
    projects: null,
    project: null,
};

const getters = {
    isAuthenticated: (state) => !!state.user,
    StateUser: (state) => state.user,
    StateFullUser: (state) => state.fullUser,
    StateToken: (state) => state.token,
    StateTokenNotValid: (state) => state.tokenNotValid,
};

const actions = {
    async Register({dispatch}, form) {
        await axios.post('register', form)
        await dispatch('LogIn', form)
    },
    async LogIn({commit}, user) {
        const res = await axios.post('login', user)
        if(res.status === 404)
            throw Error
        await commit('setUser', user.username)
        await commit('setToken', res.data.JWT)
        await commit('setTokenValid')
    },
    async LogOut({commit}) {
        let user = null
        commit('logOut', user)
    },
    async GetUser({commit}, username) {
        let response = await axios.get(`user/${username}`);
        commit('setFullUser', response.data);
    },
    async UpdateUser({dispatch}, user) {
        let res = await axios.put(`user/${user.username}`, user)
        if(res.status === 404)
            throw Error
        await dispatch('setFullUser', res.data)
    },
    async DeleteUser({commit, state}, userid) {
        await axios.delete(`user/${userid}`, {
            headers: {
                token: state.token
            }
        })
        await commit('logOut', null)
    },
};

const mutations = {
    setUser(state, username) {
        state.user = username
    },
    setFullUser(state, user) {
        state.fullUser = user
    },
    logOut(state) {
        state.user = null
        state.projects = null
    },
    setToken(state, token) {
        state.token = token
    },
    setTokenNotValid(state) {
        state.tokenNotValid = true
    },
    setTokenValid(state) {
        state.tokenNotValid = false
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};