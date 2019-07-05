import db from '@/plugins/firebase'

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
    const authUserData = await this.$axios.$post(`/${userPayload.action}/`, {
      email: userPayload.email,
      password: userPayload.password,
      returnSecureToken: userPayload.returnSecureToken
    })
    let user
    if (userPayload.action === 'register') {
      user = { email: authUserData.email }
      await db
        .collection('users')
        .doc(userPayload.email)
        .set(user)
    } else {
      const loginRef = db.collection('users').doc(userPayload.email)
      const loggedInUser = await loginRef.get()
      user = loggedInUser.data()
    }
    commit('setUser', user)
    commit('setToken', authUserData.idToken)
  }
}

export const getters = {
  isAuthenticated: state => Boolean(state.token),
  // isAdmin: state => (state.token === '9V6ePpwdCmbRdUziBjMZBF5fWSs1' ? true : false)
  user: state => state.user
}
