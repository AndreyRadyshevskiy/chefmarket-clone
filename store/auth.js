import { auth, db } from '@/plugins/firebase'
import Cookies from 'js-cookie'

export const state = () => ({
  uid: null,
  user: null
})

export const mutations = {
  saveUID(state, uid) {
    state.uid = uid
  },
  setUSER(state, user) {
    state.user = user
  }
}

export const actions = {
  async signUp({ dispatch, state }, userData) {
    const { user } = await auth.createUserWithEmailAndPassword(
      userData.email,
      userData.password
    )
    await auth.currentUser.updateProfile({
      displayName: userData.displayName
    })
    await db
      .collection('users')
      .doc(user.email)
      .set({ name: userData.displayName, email: userData.email })

    const token = await auth.currentUser.getIdToken(true)
    const userInfo = {
      name: user.displayName,
      email: user.email,
      uid: user.uid
    }

    Cookies.set('access_token', token)
    await dispatch('setUSER', userInfo)
    await dispatch('saveUID', userInfo.uid)
  },
  async signIn({ dispatch }, userData) {
    const { user } = await auth.signInWithEmailAndPassword(
      userData.email,
      userData.password
    )

    const token = await auth.currentUser.getIdToken(true)
    const userInfo = {
      name: user.displayName,
      email: user.email,
      avatar: user.photoURL,
      uid: user.uid
    }

    Cookies.set('access_token', token) // saving token in cookie for server rendering
    await dispatch('setUSER', userInfo)
    await dispatch('saveUID', userInfo.uid)
  },
  async signOut({ commit }) {
    await auth.signOut()

    Cookies.remove('access_token')
    commit('setUSER', null)
    commit('saveUID', null)
  },
  saveUID({ commit }, uid) {
    commit('saveUID', uid)
  },
  setUSER({ commit }, user) {
    commit('setUSER', user)
  }
}

export const getters = {
  uid(state) {
    if (state.user && state.user.uid) return state.user.uid
    else return null
  },

  user(state) {
    return state.user
  },

  isAuthenticated(state) {
    return !!state.user && !!state.user.uid
  }
}
