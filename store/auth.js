import db from '@/plugins/firestore'

export const state = () => ({
  token: '',
  user: null
})
export const mutations = {
  setToken(state, token) {
    state.token = token
  },
  setUser(state, user) {
    state.user = user
  }
}
export const actions = {
  async authenticateUser({ commit }, userPayload) {
    const authUserData = await this.$axios.$post('/register/', userPayload)
    const user = { email: authUserData.email }
    await db
      .collection('users')
      .doc(userPayload.email)
      .set(user)
    commit('setUser', user)
    commit('setToken', authUserData.idToken)
  }
}

export const getters = {
  isAuthenticated: state => Boolean(state.token),
  // isAdmin: state => (state.token === '9V6ePpwdCmbRdUziBjMZBF5fWSs1' ? true : false)
  user: state => state.user
}
